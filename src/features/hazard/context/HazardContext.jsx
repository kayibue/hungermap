import React, { createContext, useEffect, useState } from "react";
import { useMapContext } from "@features/map/hooks/useMapContext";
import { hazardInfoService } from "../services/hazard.service";
import mapboxgl from "mapbox-gl";

const HazardContext = createContext();

const HazardProvider = ({ children }) => {
  const { mapRef } = useMapContext();
  const [hazards, setHazards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await hazardInfoService.fetchHazardsData();
        setHazards(data.data.body.hazards);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const applyHazardLayer = () => {
    if (mapRef.current) {
      // Clear existing markers
      removeHazardLayer();

      hazards.forEach((hazard) => {
        const { type, latitude, longitude } = hazard;

        const iconUrl = getIconUrl(type);
        new mapboxgl.Marker({ element: createMarkerElement(iconUrl) })
          .setLngLat([longitude, latitude])
          .addTo(mapRef.current);
      });
    }
  };

  const removeHazardLayer = () => {
    if (mapRef.current) {
      // Remove all markers
      const markers = document.getElementsByClassName("mapboxgl-marker");
      while (markers.length > 0) {
        markers[0].remove();
      }
    }
  };

  const getIconUrl = (type) => {
    switch (type) {
      case "FLOOD":
        return "src/assets/markers/flood.png";
      case "CYCLONE":
        return "src/assets/markers/tornado.png";
      case "VOLCANO":
        return "src/assets/markers/volcano.png";
      case "WILDFIRE":
        return "src/assets/markers/wildfire.png";
      case "EXTREMETEMPERATURE":
        return "src/assets/markers/extreme_temperature.png";
      case "DROUGHT":
        return "src/assets/markers/drought.png";
      default:
        return "src/assets/markers/hazard.png";
    }
  };

  const createMarkerElement = (iconUrl) => {
    const markerElement = document.createElement("div");
    markerElement.style.backgroundImage = `url(${iconUrl})`;
    markerElement.style.width = "20px";
    markerElement.style.height = "20px";
    markerElement.style.backgroundSize = "cover";
    return markerElement;
  };

  return (
    <HazardContext.Provider
      value={{
        hazards,
        loading,
        error,
        applyHazardLayer,
        removeHazardLayer,
        active,
        setActive,
      }}
    >
      {children}
    </HazardContext.Provider>
  );
};

export { HazardContext, HazardProvider };
