import React from "react";
import floodIcon from "@assets/markers/flood.png";
import cycloneIcon from "@assets/markers/tornado.png";
import volcanoIcon from "@assets/markers/volcano.png";
import wildfireIcon from "@assets/markers/wildfire.png";
import extremeTemperatureIcon from "@assets/markers/extreme_temperature.png";
import droughtIcon from "@assets/markers/drought.png";
import hazardIcon from "@assets/markers/hazard.png";

const hazardTypes = [
  { name: "Flood", icon: floodIcon },
  { name: "Cyclone", icon: cycloneIcon },
  { name: "Volcano", icon: volcanoIcon },
  { name: "Wildfire", icon: wildfireIcon },
  { name: "Extreme Temperature", icon: extremeTemperatureIcon },
  { name: "Drought", icon: droughtIcon },
  { name: "Other Hazard", icon: hazardIcon },
];

const HazardLegend = () => {
  return (
    <div
      className="bg-white bg-opacity-40 p-2 rounded shadow w-max text-xs mt-2"
      data-aos="fade-up"
    >
      <h3 className="text-sm font-semibold mb-2">Hazard Legend</h3>
      <ul className="flex justify-center space-x-4 w-max">
        {hazardTypes.map((hazard) => (
          <li key={hazard.name} className="flex items-center">
            <img src={hazard.icon} alt={hazard.name} className="w-6 h-6 mr-2" />
            <span className="text-xs">{hazard.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HazardLegend;
