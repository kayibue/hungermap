import { useContext } from "react";
import { FCSContext } from "../context/FCSContext";

const useFCSContext = () => {
  const context = useContext(FCSContext);

  if (!context) {
    throw new Error("useFCSContext must be used within an FCSProvider");
  }

  return context;
};

export { useFCSContext };
