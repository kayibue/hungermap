import React, { createContext, useEffect, useState } from "react";
import { countryInfoService } from "../services/country.services";

const CountryContext = createContext();

const CountryProvider = ({ children }) => {
  const [countryData, setCountryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await countryInfoService.fetchCountryData();
        setCountryData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <CountryContext.Provider value={{ countryData, loading, error }}>
      {children}
    </CountryContext.Provider>
  );
};

export { CountryContext, CountryProvider };
