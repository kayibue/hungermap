import "mapbox-gl/dist/mapbox-gl.css";
import { useMapContext } from "../hooks/useMapContext";

const MapComponent = () => {
  const { mapContainerRef } = useMapContext();

  return <div ref={mapContainerRef} className="h-full w-full" />;
};

export default MapComponent;
