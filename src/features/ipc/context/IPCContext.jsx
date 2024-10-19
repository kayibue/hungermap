import React, { createContext, useEffect, useState } from "react";
import { ipcService } from "../services/ipc.services";

const IPCContext = createContext();

const IPCProvider = ({ children }) => {
  const [ipcData, setIPCData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ipcService.fetchIPCData();
        setIPCData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <IPCContext.Provider value={{ ipcData, loading, error }}>
      {children}
    </IPCContext.Provider>
  );
};

export { IPCContext, IPCProvider };
