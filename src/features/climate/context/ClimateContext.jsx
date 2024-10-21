import React, { createContext, useContext, useEffect, useState } from "react";
import { climateService } from "../services/climate.services";
import { useMapContext } from "@features/map/hooks/useMapContext";

const ClimateContext = createContext();

const ClimateProvider = ({ children }) => {
  const [climateData, setClimateData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { mapRef, customPopup, removeLayers } = useMapContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await climateService.fetchClimateData();
        setClimateData(response.data.body.countries);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleHoverEvents = (layerId, dataLookup, description) => {
    let hoveredStateId = null;

    const handleMouseMove = (e) => {
      if (e.features.length > 0) {
        const feature = e.features[0];
        const countryCode = feature.properties["iso-a3"];
        const prevalenceValue = dataLookup[countryCode];

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

        if (prevalenceValue !== undefined) {
          customPopup.current
            .setLngLat(e.lngLat)
            .setHTML(
              `<h3>${feature.properties.name}</h3><p>${description}: ${
                prevalenceValue * 100
              }%</p>`
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
      customPopup.current.remove();
      hoveredStateId = null;
    };

    mapRef.current.on("mousemove", layerId, handleMouseMove);
    mapRef.current.on("mouseleave", layerId, handleMouseLeave);
  };

  const addMapLayer = (layerId, dataLookup, colorScale) => {
    mapRef.current.addLayer({
      id: layerId,
      type: "fill",
      source: "africa",
      paint: {
        "fill-color": [
          "case",
          ["has", ["get", "iso-a3"], ["literal", dataLookup]],
          [
            "interpolate",
            ["linear"],
            ["get", ["get", "iso-a3"], ["literal", dataLookup]],
            ...colorScale,
          ],
          "#3d3d3d", // Fallback color for undefined countries
        ],
        "fill-opacity": 0.8,
        "fill-outline-color": "#000",
      },
    });
  };

  const applyRainLayer = () => {
    if (mapRef.current && climateData.length > 0) {
      const rainLookup = {};
      climateData.forEach((item) => {
        rainLookup[item.country.iso3] =
          item.dataPoints[0].rainfall.prevalenceWet;
      });

      removeLayers([
        "ipc-layer",
        "ipc-hover",
        "rain-layer",
        "vegetation-layer",
        "hazard-layer",
        "africa-borders",
      ]);

      const rainColorScale = [
        0,
        "#f7fbff",
        0.4,
        "#deebf7",
        0.6,
        "#9ecae1",
        0.8,
        "#3182bd",
        1.0,
        "#6baed6",
        1.2,
        "#4292c6",
        1.4,
        "#2171b5",
        1.8,
        "#08519c",
        2.0,
        "#08306b",
      ];

      addMapLayer("rain-layer", rainLookup, rainColorScale);
      handleHoverEvents("rain-layer", rainLookup, "Rainfall Prevalence");
    }
  };

  const applyVegetationLayer = () => {
    if (mapRef.current && climateData.length > 0) {
      const vegetationLookup = {};
      climateData.forEach((item) => {
        vegetationLookup[item.country.iso3] =
          item.dataPoints[0].ndvi.prevalenceDry;
      });

      removeLayers([
        "ipc-layer",
        "ipc-hover",
        "rain-layer",
        "vegetation-layer",
        "hazard-layer",
      ]);

      const vegetationColorScale = [
        0,
        "#1a9850", // Very green (low dry prevalence)
        0.5,
        "#d9ef8b", // Slightly green
        0.6,
        "#fee08b", // Slightly dry
        0.8,
        "#fc8d59", // Moderately dry
        1.0,
        "#d73027", // Very dry (high dry prevalence)
      ];

      addMapLayer("vegetation-layer", vegetationLookup, vegetationColorScale);
      handleHoverEvents(
        "vegetation-layer",
        vegetationLookup,
        "NDVI Prevalence"
      );
    }
  };

  return (
    <ClimateContext.Provider
      value={{
        climateData,
        loading,
        error,
        applyRainLayer,
        applyVegetationLayer,
      }}
    >
      {children}
    </ClimateContext.Provider>
  );
};

export { ClimateContext, ClimateProvider };
