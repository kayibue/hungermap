import { useContext } from "react";
import { HazardContext } from "../context/HazardContext";

//custom hook to access the map context
const useHazardContext = () => {
  const context = useContext(HazardContext);

  if (!context) {
    throw new Error("useHazardContext must be used within an HazardProvider");
  }

  return context;
};

export { useHazardContext };
