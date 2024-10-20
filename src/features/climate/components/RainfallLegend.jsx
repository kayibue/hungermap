import React from "react";

const RainfallLegend = () => {
  const legendItems = [
    { range: "< 40%", color: "#f7fbff" },
    { range: "40 - 60%", color: "#deebf7" },
    { range: "60 - 80%", color: "#9ecae1" },
    { range: "80 - 90%", color: "#3182bd" },
    { range: "90 - 110%", color: "#6baed6" },
    { range: "110 - 120%", color: "#4292c6" },
    { range: "120 - 140%", color: "#2171b5" },
    { range: "140 - 180%", color: "#08519c" },
    { range: "> 180%", color: "#08306b" },
    { range: "Above Average", color: "#3d3d3d" },
  ];

  return (
    <div
      className="bg-white bg-opacity-40 p-2 rounded shadow w-max"
      data-aos="fade-up"
    >
      <h3 className="text-sm font-semibold mb-2">Rainfall Prevalence</h3>
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

export default RainfallLegend;
