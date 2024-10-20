import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import africaGeoJson from "@assets/map/africa_shape.json"; // Import the GeoJSON directly
import { useMapContext } from "../hooks/useMapContext";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const MapComponent = () => {
  const mapContainerRef = useRef(null);
  const { setSelectedCountry, mapRef } = useMapContext();

  useEffect(() => {
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

    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    const initializeMap = () => {
      map.addSource("africa", {
        type: "geojson",
        data: africaGeoJson,
      });

      map.addLayer({
        id: "africa-countries",
        type: "fill",
        source: "africa",
        paint: {
          "fill-color": "#FF0000", // Red color
          "fill-opacity": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            0.5,
            0,
          ],
        },
      });

      map.addLayer({
        id: "africa-borders",
        type: "line",
        source: "africa",
        paint: {
          "line-color": "#FF0000", // Red borders
          "line-width": 1,
        },
      });
    };

    const resetHoverState = () => {
      map
        .queryRenderedFeatures({ layers: ["africa-countries"] })
        .forEach((feature) => {
          map.setFeatureState(
            { source: "africa", id: feature.id },
            { hover: false }
          );
        });
    };

    const africaPopup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
    });

    const handleMouseMove = (e) => {
      if (e.features.length > 0) {
        const country = e.features[0];
        resetHoverState();

        map.setFeatureState(
          { source: "africa", id: country.id },
          { hover: true }
        );

        // Set popup content and position
        africaPopup
          .setLngLat(e.lngLat)
          .setHTML(`<strong>${country.properties.name}</strong>`)
          .addTo(map);
      } else {
        africaPopup.remove();
        resetHoverState();
      }
    };

    const handleCountryClick = (e) => {
      const country = e.features[0];
      const [lng, lat] = country.geometry.coordinates[0][0];
      map.flyTo({ center: [lng, lat], zoom: 5 });
      setSelectedCountry(country.properties.name);
    };

    const handleMouseLeave = () => {
      africaPopup.remove();
      resetHoverState();
    };

    map.on("load", initializeMap);
    map.on("mousemove", "africa-countries", handleMouseMove);
    map.on("mouseleave", "africa-countries", handleMouseLeave);
    map.on("click", "africa-countries", handleCountryClick);
    map.on("style.load", () => {
      map.setLayoutProperty("country-label", "visibility", "none");
    });

    const handleResize = () => map.resize();
    window.addEventListener("resize", handleResize);

    mapRef.current = map;

    return () => {
      map.remove();
      window.removeEventListener("resize", handleResize);
    };
  }, [setSelectedCountry]);

  return <div ref={mapContainerRef} className="h-full w-full" />;
};

export default MapComponent;
