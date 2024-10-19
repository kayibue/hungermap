import { useContext } from "react";
import { ClimateContext } from "../context/ClimateContext";

const useClimateContext = () => {
  const context = useContext(ClimateContext);

  if (!context) {
    throw new Error("useClimateContext must be used within an ClimateProvider");
  }

  return context;
};

export { useClimateContext };
