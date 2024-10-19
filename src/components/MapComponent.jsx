// src/components/Map.js
import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = mapboxgl.accessToken =
  import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const MapComponent = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [0, 0],
      zoom: 2,
    });

    // Clean up on unmount
    return () => map.remove();
  }, []);

  return <div className="w-full h-full" ref={mapContainerRef} />;
};

export default MapComponent;
