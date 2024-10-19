import { useContext } from "react";
import { IPCContext } from "../context/IPCContext";

const useIPCContext = () => {
  const context = useContext(IPCContext);

  if (!context) {
    throw new Error("useIPCContext must be used within an IPCProvider");
  }

  return context;
};

export { useIPCContext };
