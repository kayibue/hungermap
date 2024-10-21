import React from "react";
import { useMapContext } from "@features/map/hooks/useMapContext";
import IPCLegend from "@features/ipc/components/IPCLegend";
import RainfallLegend from "@features/climate/components/RainfallLegend";
import VegetationLegend from "@features/climate/components/VegetationLegend";
import { useHazardContext } from "@features/hazard/hooks/useHazardContext";
import HazardLegend from "@features/hazard/components/HazardLegend";

function Legend() {
  const { activeLayer } = useMapContext();
  const { active } = useHazardContext();

  return (
    <div>
      {activeLayer && activeLayer === "ipc" && <IPCLegend />}
      {activeLayer && activeLayer === "rain" && <RainfallLegend />}
      {activeLayer && activeLayer === "vegetation" && <VegetationLegend />}
      {active && <HazardLegend />}
    </div>
  );
}

export default Legend;
