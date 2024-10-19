import { useContext } from "react";
import { CountryContext } from "../context/CountryContext";

const useCountryContext = () => {
  const context = useContext(CountryContext);

  if (!context) {
    throw new Error("useCountryContext must be used within an CountryProvider");
  }

  return context;
};

export { useCountryContext };
