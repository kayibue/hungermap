import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import africaGeoJson from "@assets/map/africa_shape.json"; // Import the GeoJSON directly
import { useMapContext } from "../hooks/useMapContext";
import { useIPCContext } from "@features/ipc/hooks/useIPCContext";

const MapComponent = () => {
  const { mapContainerRef, activeLayer } = useMapContext();
  const { applyIPCLayer } = useIPCContext();

  useEffect(() => {
    if (activeLayer === "ipc") {
      applyIPCLayer();
    } else if (activeLayer === "rain") {
    } else if (activeLayer === "vegetation") {
    }
  }, [activeLayer]);

  return <div ref={mapContainerRef} className="h-full w-full" />;
};

export default MapComponent;
