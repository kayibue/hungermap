import React from "react";
import Lottie from "react-lottie";
// import foodIcon from "@assets/icons/food.json";
import forestIcon from "@assets/icons/forest.json";
import rainIcon from "@assets/icons/rain.json";
import chartIcon from "@assets/icons/chart.json";
import { useMapContext } from "../../features/map/hooks/useMapContext";
import { useIPCContext } from "../../features/ipc/hooks/useIPCContext";
import { useEffect } from "react";

const iconData = [
  // { id: "food", animationData: foodIcon, label: "Food", layer: "fcs" },
  {
    id: "chart",
    animationData: chartIcon,
    label: "Charts",
    layer: "ipc",
  },
  { id: "rain", animationData: rainIcon, label: "Rain", layer: "rain" },
  {
    id: "forest",
    animationData: forestIcon,
    label: "Vegetation",
    layer: "vegetation",
  },
];

export default function ToggleMenu() {
  const { activeLayer, setActiveLayer } = useMapContext();
  const { applyIPCLayer } = useIPCContext();

  const handleLayerChange = (layer) => {
    setActiveLayer(layer);
  };

  useEffect(() => {
    if (activeLayer === "ipc") {
      applyIPCLayer();
    } else if (activeLayer === "rain") {
    } else if (activeLayer === "vegetation") {
    }
  }, [activeLayer]);

  return (
    <div className=" text-white flex flex-col items-center space-y-6">
      {iconData.map(({ id, animationData, layer }) => (
        <div key={id} className="flex flex-col items-center">
          <button
            onClick={() => handleLayerChange(layer)}
            className={`flex flex-col items-center transition-transform duration-300 rounded-2xl text-black ${
              activeLayer === layer ? "scale-110 bg-white" : ""
            }`}
          >
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: animationData,
                rendererSettings: {
                  preserveAspectRatio: "xMidYMid slice",
                },
              }}
              height={90}
              width={90}
              style={{
                padding: "20px",
                margin: "-20px",
              }}
            />
            {/* <span className="text-xs">{label}</span> */}
          </button>
        </div>
      ))}
    </div>
  );
}
