import React, { createContext, useContext, useEffect, useState } from "react";
import { fcsService } from "../services/fcs.services";
import { useMapContext } from "../../map/hooks/useMapContext";
import toast from "react-hot-toast";

const FCSContext = createContext();

const FCSProvider = ({ children }) => {
  const [fcsData, setFCSData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { selectedCountry } = useMapContext();

  const fetchData = async (is_03_code) => {
    try {
      setLoading(true);
      const data = await fcsService.fetchFCSData(is_03_code);
      setFCSData(data.data.body);
    } catch (err) {
      toast.error(`IPC API: ${err.response?.data?.message}`, {
        position: "top-right",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCountry) {
      fetchData(selectedCountry.properties["iso-a3"]);
    }
  }, [selectedCountry]);

  return (
    <FCSContext.Provider value={{ fcsData, loading, fetchData }}>
      {children}
    </FCSContext.Provider>
  );
};

export { FCSContext, FCSProvider };
