import React from "react";
import Lottie from "react-lottie";
import forestIcon from "@assets/icons/forest.json";
import rainIcon from "@assets/icons/rain.json";
import chartIcon from "@assets/icons/chart.json";
import hazardIcon from "@assets/icons/hazard.json";
import { useMapContext } from "@features/map/hooks/useMapContext";
import { useHazardContext } from "@features/hazard/hooks/useHazardContext";

const iconData = [
  {
    id: "chart",
    animationData: chartIcon,
    label: "Charts",
    layer: "ipc",
  },
  {
    id: "hazard",
    animationData: hazardIcon,
    label: "Hazards",
    layer: "hazard",
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
  const { setActive } = useHazardContext();

  const handleLayerChange = (layer) => {
    if (layer === "hazard") {
      setActive((prev) => !prev);
    } else {
      setActiveLayer(layer);
    }
  };

  return (
    <div
      className=" text-white flex flex-col items-center space-y-6"
      data-aos="fade-left"
    >
      {iconData.map(({ id, animationData, layer }) => (
        <div key={id} className="flex flex-col items-center">
          <button
            onClick={() => handleLayerChange(layer)}
            className={`flex flex-col items-center transition-transform duration-300 rounded-2xl text-black shadow-2xl${
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
          </button>
        </div>
      ))}
    </div>
  );
}
