import React, { createContext, useContext, useEffect, useState } from "react";
import { climateService } from "../services/climate.services";

const ClimateContext = createContext();

const ClimateProvider = ({ children }) => {
  const [climateData, setClimateData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await climateService.fetchClimateData();
        setClimateData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ClimateContext.Provider value={{ climateData, loading, error }}>
      {children}
    </ClimateContext.Provider>
  );
};

export { ClimateContext, ClimateProvider };
