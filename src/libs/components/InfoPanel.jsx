import React from "react";
import { useMapContext } from "@features/map/hooks/useMapContext";

function InfoPanel() {
  const { selectedCountry } = useMapContext();

  return selectedCountry ? (
    <div
      data-aos="fade-right"
      className="p-4 bg-black bg-opacity-40 shadow-lg text-gray-300"
    >
      <h2 className="text-xl font-bold">{selectedCountry.properties.name}</h2>
      <p>
        <strong>ISO3:</strong> {selectedCountry.properties.iso3}
      </p>
      <p>
        <strong>Population:</strong> {selectedCountry.properties.number} (Year:
        {selectedCountry.properties.year}, Source:{" "}
        {selectedCountry.properties.source})
      </p>
      <p>
        <strong>Income Group:</strong> {selectedCountry.properties.level}
      </p>
      <p>
        <strong>Chronic Hunger:</strong>
        {selectedCountry.properties.chronic_hunger ?? "Data not available"}
      </p>
      <p>
        <strong>Malnutrition:</strong>
        {selectedCountry.properties.malnutrition ?? "Data not available"}
      </p>
    </div>
  ) : (
    <></>
  );
}

export default InfoPanel;
