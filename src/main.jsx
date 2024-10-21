import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { MapProvider } from "@features/map/context/MapContext.jsx";
import { CountryProvider } from "@features/country/context/CountryContext.jsx";
import { ClimateProvider } from "@features/climate/context/ClimateContext.jsx";
import { FCSProvider } from "@features/fcs/context/FCSContext.jsx";
import { IPCProvider } from "@features/ipc/context/IPCContext.jsx";
import { HazardProvider } from "@features/hazard/context/HazardContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MapProvider>
      <CountryProvider>
        <ClimateProvider>
          <FCSProvider>
            <IPCProvider>
              <HazardProvider>
                <App />
              </HazardProvider>
            </IPCProvider>
          </FCSProvider>
        </ClimateProvider>
      </CountryProvider>
    </MapProvider>
  </StrictMode>
);
