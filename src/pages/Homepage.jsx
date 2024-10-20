import MapComponent from "@features/map/components/MapComponent";
import CountryDropdown from "@features/country/components/CountryDropdown";
import InfoPanel from "@libs/components/InfoPanel";
import ToggleMenu from "@libs/components/ToggleMenu";
import Legend from "@libs/components/Legend";
import { useEffect } from "react";
import { useMapContext } from "@features/map/hooks/useMapContext";
import { useIPCContext } from "@features/ipc/hooks/useIPCContext";
import IPCLegend from "@features/ipc/components/IPCLegend";

const HomePage = () => {
  const { activeLayer } = useMapContext();
  const { applyIPCLayer } = useIPCContext();

  useEffect(() => {
    if (activeLayer === "ipc") {
      applyIPCLayer();
    } else if (activeLayer === "rain") {
    } else if (activeLayer === "vegetation") {
    }
  }, [activeLayer]);

  return (
    <div className="h-screen relative">
      {/* Background Map */}
      <MapComponent />

      {/* Dropdown Menu at Top Center */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <CountryDropdown />
      </div>

      {/* Quick Info Panel on Far Left */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 shadow-lg p-4 z-10">
        <InfoPanel />
      </div>

      {/* Toggle Menu on Far Right */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 shadow-lg p-3 z-10 rounded-2xl">
        <ToggleMenu />
      </div>

      {/* Legend on the Bottom */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-full md:-translate-x-1/2 shadow-lg p-4 z-10">
        <Legend />
      </div>
    </div>
  );
};

export default HomePage;
