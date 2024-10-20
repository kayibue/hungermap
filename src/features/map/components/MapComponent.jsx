import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import africaGeoJson from "@assets/map/africa_shape.json"; // Import the GeoJSON directly
import { useMapContext } from "../hooks/useMapContext";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const MapComponent = () => {
  const mapContainerRef = useRef(null);
  const tooltipRef = useRef(null);
  const { setSelectedCountry, mapRef, activeLayer } = useMapContext();

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

    const handleMouseMove = (e) => {
      if (e.features.length > 0) {
        const country = e.features[0];
        showTooltip(e, country.properties.name);
        resetHoverState();

        map.setFeatureState(
          { source: "africa", id: country.id },
          { hover: true }
        );
      } else {
        hideTooltip();
        resetHoverState();
      }
    };

    const showTooltip = (e, countryName) => {
      tooltipRef.current.style.display = "block";
      tooltipRef.current.innerHTML = countryName;
      tooltipRef.current.style.left = `${e.originalEvent.pageX}px`;
      tooltipRef.current.style.top = `${e.originalEvent.pageY}px`;
    };

    const hideTooltip = () => {
      tooltipRef.current.style.display = "none";
    };

    const handleCountryClick = (e) => {
      const country = e.features[0];
      const [lng, lat] = country.geometry.coordinates[0][0];
      map.flyTo({ center: [lng, lat], zoom: 5 });
      setSelectedCountry(country.properties.name);
    };

    const handleMouseLeave = () => {
      hideTooltip();
      resetHoverState(); // Ensure hover state is reset on mouse leave
    };

    map.on("load", initializeMap);
    map.on("mousemove", "africa-countries", handleMouseMove);
    map.on("mouseleave", "africa-countries", handleMouseLeave); // Add this handler
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

  return (
    <>
      <div ref={mapContainerRef} className="h-full w-full" />
      <div
        ref={tooltipRef}
        style={{
          display: "none",
          position: "absolute",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "4px 8px",
          borderRadius: "4px",
          pointerEvents: "none",
          zIndex: 10,
          transition: "all 0.3s ease",
        }}
      />
    </>
  );
};

export default MapComponent;
