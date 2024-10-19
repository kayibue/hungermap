import { useContext } from "react";
import { MapContext } from "../context/MapContext";

//custom hook to access the map context
const useMapContext = () => {
  const context = useContext(MapContext);

  if (!context) {
    throw new Error("useMapContext must be used within an MapProvider");
  }

  return context;
};

export { useMapContext };
