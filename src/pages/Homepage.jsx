import MapComponent from "@features/map/components/MapComponent";
import CountryDropdown from "@features/country/components/CountryDropdown";
import InfoPanel from "@libs/components/InfoPanel";
import ToggleMenu from "@libs/components/ToggleMenu";
import Legend from "@libs/components/Legend";
import { useEffect } from "react";
import { useMapContext } from "@features/map/hooks/useMapContext";
import { useIPCContext } from "@features/ipc/hooks/useIPCContext";
import { useClimateContext } from "@features/climate/hooks/useClimateContext";
import { useHazardContext } from "@features/hazard/hooks/useHazardContext";

const HomePage = () => {
  const { activeLayer } = useMapContext();
  const { applyIPCLayer } = useIPCContext();
  const { applyRainLayer, applyVegetationLayer } = useClimateContext();
  const { applyHazardLayer, active, removeHazardLayer } = useHazardContext();

  useEffect(() => {
    if (activeLayer === "ipc") {
      applyIPCLayer();
    } else if (activeLayer === "rain") {
      applyRainLayer();
    } else if (activeLayer === "vegetation") {
      applyVegetationLayer();
    }

    if (active) {
      applyHazardLayer();
    } else {
      removeHazardLayer();
    }
  }, [activeLayer, active]);

  return (
    <div className="h-screen relative">
      {/* Background Map */}
      <MapComponent />

      {/* Dropdown Menu at Top Center */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <CountryDropdown />
      </div>

      {/* Quick Info Panel on Far Left */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
        <InfoPanel />
      </div>

      {/* Toggle Menu on Far Right */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 shadow-lg p-3 z-10 rounded-2xl">
        <ToggleMenu />
      </div>

      {/* Legend on the Bottom */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-full md:-translate-x-1/2 shadow-lg px-4 py-1 z-10">
        <Legend />
      </div>
    </div>
  );
};

export default HomePage;
