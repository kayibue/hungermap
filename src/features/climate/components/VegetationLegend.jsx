import React from "react";

const VegetationLegend = () => {
  const legendItems = [
    { range: "< 50%", color: "#1a9850" }, // Very green (low dry prevalence)
    { range: "50 - 70%", color: "#d9ef8b" }, // Slightly green
    { range: "70 - 80%", color: "#fee08b" }, // Slightly dry
    { range: "80 - 90%", color: "#fc8d59" }, // Moderately dry
    { range: "> 90%", color: "#d73027" }, // Very dry (high dry prevalence)
    { range: "Above Average", color: "#3d3d3d" }, // Default/Above Average
  ];

  return (
    <div
      className="bg-white bg-opacity-40 p-2 rounded shadow w-max"
      data-aos="fade-up"
    >
      <h3 className="text-sm font-semibold mb-2">
        Vegetation Prevalence (Dryness)
      </h3>
      <ul className="flex flex-col lg:flex-row justify-center space-x-4 w-max">
        {legendItems.map((item, index) => (
          <li key={index} className="flex flex-col items-center mb-2">
            <span className="text-xs mb-1 text-center">{item.range}</span>
            <span
              className="h-1 w-20"
              style={{ backgroundColor: item.color }}
            ></span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VegetationLegend;
