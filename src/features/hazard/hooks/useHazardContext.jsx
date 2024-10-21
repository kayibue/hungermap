import { useContext } from "react";
import { HazardContext } from "../context/HazardContext";

const useHazardContext = () => {
  const context = useContext(HazardContext);

  if (!context) {
    throw new Error("useHazardContext must be used within an HazardProvider");
  }

  return context;
};

export { useHazardContext };
