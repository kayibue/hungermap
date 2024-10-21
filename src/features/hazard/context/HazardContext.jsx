import React, { createContext, useEffect, useState } from "react";
import { useMapContext } from "@features/map/hooks/useMapContext";
import { hazardInfoService } from "../services/hazard.service";
import mapboxgl from "mapbox-gl";

// Importing hazard icons
import floodIcon from "@assets/markers/flood.png";
import cycloneIcon from "@assets/markers/tornado.png";
import volcanoIcon from "@assets/markers/volcano.png";
import wildfireIcon from "@assets/markers/wildfire.png";
import extremeTemperatureIcon from "@assets/markers/extreme_temperature.png";
import droughtIcon from "@assets/markers/drought.png";
import hazardIcon from "@assets/markers/hazard.png";

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
        return floodIcon;
      case "CYCLONE":
        return cycloneIcon;
      case "VOLCANO":
        return volcanoIcon;
      case "WILDFIRE":
        return wildfireIcon;
      case "EXTREMETEMPERATURE":
        return extremeTemperatureIcon;
      case "DROUGHT":
        return droughtIcon;
      default:
        return hazardIcon;
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
