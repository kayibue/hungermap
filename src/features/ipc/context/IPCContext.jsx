import React, { createContext, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { ipcService } from "../services/ipc.services";
import { useMapContext } from "../../map/hooks/useMapContext";
import toast from "react-hot-toast";

const IPCContext = createContext();

const IPCProvider = ({ children }) => {
  const [ipcData, setIPCData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { mapRef, customPopup, removeLayers } = useMapContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ipcService.fetchIPCData();
        setIPCData(data?.data?.body?.ipc_peaks);
      } catch (err) {
        toast.error(`IPC API: ${err.response.data.message}`, {
          position: "top-right",
          duration: 5000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const applyIPCLayer = () => {
    if (mapRef.current && ipcData) {
      const phase3Lookup = {};
      ipcData.forEach((item) => {
        phase3Lookup[item.iso3] = item.phase_3_plus_number / 1000000;
      });

      removeLayers([
        "ipc-layer",
        "ipc-hover",
        "rain-layer",
        "vegetation-layer",
        "hazard-layer",
      ]);

      mapRef.current.addLayer({
        id: "ipc-layer",
        type: "fill",
        source: "africa",
        paint: {
          "fill-color": [
            "case",
            ["has", ["get", "iso-a3"], ["literal", phase3Lookup]],
            [
              "interpolate",
              ["linear"],
              ["get", ["get", "iso-a3"], ["literal", phase3Lookup]],
              0,
              "#fee5d9",
              0.1,
              "#fcbba1",
              0.5,
              "#fc9272",
              1.0,
              "#fb6a4a",
              3.0,
              "#ef3b2c",
              5.0,
              "#cb181d",
              10.0,
              "#99000d",
            ],
            "#3d3d3d",
          ],
          "fill-opacity": 0.8,
          "fill-outline-color": "#000",
        },
      });

      mapRef.current.addLayer({
        id: "ipc-hover",
        type: "line",
        source: "africa",
        paint: {
          "line-color": "#ccc",
          "line-width": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            2,
            0,
          ],
        },
      });

      // Handle overlaying the popup
      let hoveredStateId = null;

      const handleMouseMove = (e) => {
        if (e.features.length > 0) {
          const feature = e.features[0];

          if (hoveredStateId !== null) {
            mapRef.current.setFeatureState(
              { source: "africa", id: hoveredStateId },
              { hover: false }
            );
          }

          hoveredStateId = feature.id;

          mapRef.current.setFeatureState(
            { source: "africa", id: hoveredStateId },
            { hover: true }
          );

          const countryCode = feature.properties["iso-a3"];
          const phase3Value = ipcData.find(
            (item) => item.iso3 === countryCode
          )?.phase_3_number;

          if (phase3Value !== undefined) {
            customPopup.current.remove();

            // Create a new popup and set it to the current hover
            customPopup.current
              .setLngLat(e.lngLat)
              .setHTML(
                `
              <h3>${feature.properties.name}</h3>
              <p>Phase 3: ${phase3Value / 1000000} million</p>
            `
              )
              .addTo(mapRef.current);
          }
        }
      };

      const handleMouseLeave = () => {
        if (hoveredStateId !== null) {
          mapRef.current.setFeatureState(
            { source: "africa", id: hoveredStateId },
            { hover: false }
          );
        }

        // Remove the popup when leaving the feature
        customPopup.current.remove();
        hoveredStateId = null;
      };

      mapRef.current.on("mousemove", "ipc-layer", handleMouseMove);
      mapRef.current.on("mouseleave", "ipc-layer", handleMouseLeave);
    }
  };

  return (
    <IPCContext.Provider value={{ loading, applyIPCLayer }}>
      {children}
    </IPCContext.Provider>
  );
};

export { IPCContext, IPCProvider };
