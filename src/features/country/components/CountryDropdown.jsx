import React, { useMemo, useEffect, useState } from "react";
import { useMapContext } from "../../map/hooks/useMapContext";

function CountryDropdown() {
  const { mapRef, setSelectedCountry } = useMapContext();
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    if (mapRef.current) {
      const source = mapRef.current.getSource("africa");

      if (source && source._data) {
        const allCountries = source._data.features;

        // Filter out countries with empty names
        const filteredCountries = allCountries
          .map((country) => ({
            name: country.properties.name,
            isoCode: country.properties["iso-a3"],
            coordinates: country?.geometry?.coordinates[0][0],
            properties: {
              name: country.properties.name,
              "iso-a3": country.properties["iso-a3"],
            },
          }))
          .filter((country) => country.name)
          .sort((a, b) => a.name.localeCompare(b.name));

        setCountries(filteredCountries);
      }
    }
  }, [mapRef.current]);

  const handleCountrySelect = (event) => {
    const selectedCountry = countries.find(
      (country) => country.isoCode === event.target.value
    );

    if (selectedCountry && mapRef.current) {
      const [lng, lat] = selectedCountry.coordinates;

      setSelectedCountry(selectedCountry);

      // Fly to the selected country using its lat, lng
      mapRef.current.flyTo({
        center: [lng, lat],
        zoom: 5,
      });
    }
  };

  return (
    <div className="w-52">
      <select
        name="countries"
        id="country-dropdown"
        className="w-full text-white p-2 bg-black bg-opacity-40 rounded-md outline-none"
        onChange={handleCountrySelect}
      >
        <option value="">Select a country</option>
        {countries.map((country) => (
          <option key={country.isoCode} value={country.isoCode}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CountryDropdown;
