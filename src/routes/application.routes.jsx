import { Navigate } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Layout from "@libs/components/Layout";

const ApplicationRoutes = {
  path: "/",
  element: <Layout />,
  children: [
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ],
};

export default ApplicationRoutes;
