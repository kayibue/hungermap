import React from "react";
import { useMapContext } from "@features/map/hooks/useMapContext";
import IPCLegend from "@features/ipc/components/IPCLegend";
import RainfallLegend from "@features/climate/components/RainfallLegend";
import VegetationLegend from "@features/climate/components/VegetationLegend";

function Legend() {
  const { activeLayer } = useMapContext();

  return (
    <div>
      {activeLayer && activeLayer === "ipc" && <IPCLegend />} <></>
      {activeLayer && activeLayer === "rain" && <RainfallLegend />} <></>
      {activeLayer && activeLayer === "vegetation" && <VegetationLegend />}{" "}
      <></>
    </div>
  );
}

export default Legend;
