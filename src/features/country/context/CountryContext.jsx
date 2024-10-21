import React, { createContext, useEffect, useState } from "react";
import { countryInfoService } from "../services/country.services";
import toast from "react-hot-toast";

const CountryContext = createContext();

const CountryProvider = ({ children }) => {
  const [countryData, setCountryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await countryInfoService.fetchCountryData();
        setCountryData(data.data.body.countries);
      } catch (err) {
        toast.error(`IPC API: ${err.response?.data?.message}`, {
          position: "top-right",
          duration: 5000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <CountryContext.Provider value={{ countryData, loading }}>
      {children}
    </CountryContext.Provider>
  );
};

export { CountryContext, CountryProvider };
