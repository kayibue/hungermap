import { useRef } from "react";
import { createContext, useState } from "react";

const MapContext = createContext();

const MapProvider = ({ children }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [activeLayer, setActiveLayer] = useState("fcs");
  const mapRef = useRef(null);

  return (
    <MapContext.Provider
      value={{
        selectedCountry,
        setSelectedCountry,
        activeLayer,
        setActiveLayer,
        mapRef,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export { MapContext, MapProvider };
