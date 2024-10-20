import React from "react";

const IPCLegend = () => {
  const legendItems = [
    { range: "0 - 0.099 million", color: "#fee5d9" },
    { range: "0.1 - 0.49 million", color: "#fcbba1" },
    { range: "0.5 - 0.99 million", color: "#fc9272" },
    { range: "1.0 - 2.99 million", color: "#fb6a4a" },
    { range: "3.0 - 4.99 million", color: "#ef3b2c" },
    { range: "5.0 - 9.99 million", color: "#cb181d" },
    { range: "> 10 million", color: "#99000d" },
    { range: "Not Analyzed", color: "#ccc" },
  ];

  return (
    <div className=" bg-white bg-opacity-40 p-2 rounded shadow w-max">
      <h3 className="text-sm font-semibold mb-2">IPC Phase 3+ Population</h3>
      <ul className="flex flex-col lg:flex-row justify-center space-x-4 w-max">
        {legendItems.map((item, index) => (
          <li key={index} className="flex flex-col items-center mb-2">
            <span className="text-xs mb-1 text-center">{item.range}</span>
            <span
              className={`h-1 w-20`}
              style={{ backgroundColor: item.color }}
            ></span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IPCLegend;
