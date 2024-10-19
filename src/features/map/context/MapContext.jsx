import { createContext, useState } from "react";

const MapContext = createContext();

export const MapProvider = ({ children }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [activeLayer, setActiveLayer] = useState("ipc");

  return (
    <MapContext.Provider
      value={{
        selectedCountry,
        setSelectedCountry,
        activeLayer,
        setActiveLayer,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export { MapContext, MapProvider };
