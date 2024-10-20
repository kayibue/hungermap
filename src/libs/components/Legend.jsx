import React from "react";
import { useMapContext } from "@features/map/hooks/useMapContext";
import IPCLegend from "@features/ipc/components/IPCLegend";

function Legend() {
  const { activeLayer } = useMapContext();

  return (
    <div>
      {activeLayer && activeLayer === "ipc" && <IPCLegend />} <></>
    </div>
  );
}

export default Legend;
