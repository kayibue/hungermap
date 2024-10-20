import React, { createContext, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import africaGeoJson from "@assets/map/africa_shape.json";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const MapContext = createContext();

const MapProvider = ({ children }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [activeLayer, setActiveLayer] = useState("");

  const customPopup = useRef(
    new mapboxgl.Popup({ closeButton: false, closeOnClick: false })
  );

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [20, 10],
      zoom: 2.5,
      projection: "equirectangular",
      maxBounds: [
        [-91.40625, -53.014783],
        [136.40625, 46.437857],
      ],
    });

    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    map.on("load", () => {
      map.addSource("africa", {
        type: "geojson",
        data: africaGeoJson,
      });

      map.addLayer({
        id: "africa-countries",
        type: "fill",
        source: "africa",
        paint: {
          "fill-color": "#FF0000",
          "fill-opacity": 0,
        },
      });

      map.addLayer({
        id: "africa-borders",
        type: "line",
        source: "africa",
        paint: {
          "line-color": "#FF0000",
          "line-width": 1,
        },
      });

      const handleCountryClick = (e) => {
        const country = e.features[0];
        setSelectedCountry(country);
        const [lng, lat] = country.geometry.coordinates[0][0];
        map.flyTo({ center: [lng, lat], zoom: 5 });
      };

      map.on("click", "africa-countries", handleCountryClick);

      mapRef.current = map; // Store the map reference

      setActiveLayer("ipc");
    });

    const handleResize = () => map.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      map.remove();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <MapContext.Provider
      value={{
        mapRef,
        selectedCountry,
        setSelectedCountry,
        mapContainerRef,
        setActiveLayer,
        activeLayer,
        customPopup,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export { MapContext, MapProvider };
