import { useRoutes } from "react-router-dom";
import ApplicationRoutes from "./application.routes";

// ==============================|| ROUTING RENDER ||============================== //

export default function Routes() {
  return useRoutes([ApplicationRoutes]);
}
