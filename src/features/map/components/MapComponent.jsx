import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import africaGeoJson from "@assets/map/africa_shape.json"; // Import the GeoJSON directly
import { useMapContext } from "../hooks/useMapContext";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const MapComponent = () => {
  const mapContainerRef = useRef(null);
  const { selectedCountry, setSelectedCountry, mapRef } = useMapContext();

  useEffect(() => {
    // Initialize the map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [20, 10], // Center on Africa
      zoom: 2.5,
      projection: "equirectangular",
      maxBounds: [
        [-91.40625, -53.014783],
        [136.40625, 46.437857],
      ],
    });

    // zoom and rotation controls
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
    mapRef.current = map;

    // Load GeoJSON data and set layers
    map.on("load", () => {
      map.addSource("africa", {
        type: "geojson",
        data: africaGeoJson,
      });

      // Layer for country fill
      map.addLayer({
        id: "africa-countries",
        type: "fill",
        source: "africa",
        paint: {
          "fill-color": "#FF0000",
          "fill-opacity": 0.0,
        },
      });

      // Layer for country borders
      map.addLayer({
        id: "africa-borders",
        type: "line",
        source: "africa",
        paint: {
          "line-color": "#FF0000", // Black borders
          "line-width": 1,
        },
      });
    });

    // Handle country hover
    const handleMouseMove = (e) => {
      // map.getCanvas().style.cursor = "pointer"; // Change cursor to pointer
      const country = e.features[0]; 
      console.log(`Hovered over: ${country.properties.name}`); 
    };

    // Handle country click
    const handleCountryClick = (e) => {
      const country = e.features[0];
      const [lng, lat] = country.geometry.coordinates[0][0];

      map.flyTo({ center: [lng, lat], zoom: 5 }); // Fly to clicked country
      setSelectedCountry(country.properties.name);
      console.log(`Clicked on: ${country.properties.name}`);
    };

    map.on("mousemove", "africa-countries", handleMouseMove);
    map.on("click", "africa-countries", handleCountryClick);

    // Resize map on window resize
    const handleResize = () => map.resize();
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      map.remove();
      window.removeEventListener("resize", handleResize);
    };
  }, [setSelectedCountry]);

  return <div ref={mapContainerRef} className="h-full w-full" />;
};

export default MapComponent;
