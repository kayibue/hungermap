import React, { createContext, useContext, useEffect, useState } from "react";
import { fcsService } from "../services/fcs.services";

const FCSContext = createContext();

const FCSProvider = ({ children }) => {
  const [fcsData, setFCSData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (is_03_code) => {
    try {
      const data = await fcsService.fetchFCSData(is_03_code);
      setFCSData(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FCSContext.Provider value={{ fcsData, loading, error, fetchData }}>
      {children}
    </FCSContext.Provider>
  );
};

export { FCSContext, FCSProvider };
