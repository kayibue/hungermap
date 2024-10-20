import React, { useMemo } from "react";
import { useMapContext } from "@features/map/hooks/useMapContext";
import Lottie from "react-lottie";
import peopleIcon from "@assets/icons/population.json";
import foodIcon from "@assets/icons/food.json";
import countryAcuteMalnutrition from "@assets/icons/country_acute_malnutrition.png";
import countryChronicMalnutrition from "@assets/icons/country_chronic_malnutrition.png";
import { useFCSContext } from "@features/fcs/hooks/useFCSContext";
import { useCountryContext } from "@features/country/hooks/useCountryContext";

function InfoPanel() {
  const { selectedCountry } = useMapContext();
  const { fcsData, loading } = useFCSContext();
  const { countryData } = useCountryContext();

  const matchedCountry = useMemo(() => {
    return countryData.find(
      (country) => country?.country?.iso3 === fcsData?.country?.iso3
    );
  }, [countryData, fcsData]);

  return selectedCountry ? (
    <div
      data-aos="fade-right"
      className="p-4 bg-black bg-opacity-40 shadow-lg text-gray-300 w-[75%] text-sm"
    >
      <h2 className="space-x-3">
        <span className="text-xl font-bold">
          {selectedCountry.properties.name}
        </span>

        <span>-</span>

        <span className="text-xs">{fcsData?.dataType}</span>
      </h2>

      <div className="mt-3">
        {/* food security & population */}
        <div className="flex flex-col">
          <h6 className="text-sm font-bold">Food Security</h6>
          <div className="border border-b-[1px] w-full my-1"></div>

          {/* content */}
          <div>
            {/* population */}
            <div className="flex items-center justify-start space-x-8">
              {/* icon */}
              <div>
                <Lottie
                  options={{
                    loop: true,
                    autoplay: true,
                    animationData: peopleIcon,
                    rendererSettings: {
                      preserveAspectRatio: "xMidYMid slice",
                    },
                  }}
                  height={50}
                  width={50}
                />
              </div>

              {/* data */}
              <div className="flex flex-col">
                <p className="text-xs">Population</p>
                <span className="text-lg font-bold">
                  {!loading &&
                    `${matchedCountry?.population?.number / 1000000}`.slice(
                      0,
                      4
                    )}
                  M
                </span>
              </div>
            </div>

            {/* Hunger */}
            <div className="flex items-center justify-start space-x-8 mt-3">
              {/* icon */}
              <div>
                <Lottie
                  options={{
                    loop: true,
                    autoplay: true,
                    animationData: foodIcon,
                    rendererSettings: {
                      preserveAspectRatio: "xMidYMid slice",
                    },
                  }}
                  height={50}
                  width={50}
                />
              </div>

              {/* data */}
              <div className="flex flex-col">
                <p className="text-xs">
                  People with insufficient food consumption
                </p>
                <span className="text-lg font-bold">
                  {!loading &&
                    `${fcsData?.metrics?.fcs?.people / 1000000}`.slice(0, 4)}
                  M
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Nutrition */}
        <div className="mt-3">
          <div className="flex flex-col">
            <h6 className="text-sm font-bold">Nutrition</h6>
            <div className="border border-b-[1px] w-full my-1"></div>

            {/* content */}
            <div className="mt-1">
              {/* Acute malnutrition */}
              <div className="flex items-center justify-start space-x-8">
                {/* icon */}
                <div>
                  <img
                    src={countryAcuteMalnutrition}
                    alt="acute malnutrition image"
                    width={50}
                    height={50}
                    className="bg-white rounded-xl p-[2px]"
                  />
                </div>

                {/* data */}
                <div className="flex flex-col">
                  <p className="text-xs">Acute Malnutrition</p>
                  <span className="text-lg font-bold">
                    {matchedCountry?.malnutrition
                      ? `${
                          matchedCountry?.malnutrition.acute_percent * 100
                        }`.slice(0, 5)
                      : "No Data"}
                    %
                  </span>
                </div>
              </div>

              {/* chronic mal */}
              <div className="flex items-center justify-start space-x-8 mt-4">
                {/* icon */}
                <div>
                  <img
                    src={countryChronicMalnutrition}
                    alt="acute malnutrition image"
                    width={50}
                    height={50}
                    className="bg-white rounded-xl p-[2px]"
                  />
                </div>

                {/* data */}
                <div className="flex flex-col">
                  <p className="text-xs">Chronic Malnutrition</p>
                  <span className="text-lg font-bold">
                    {matchedCountry?.malnutrition
                      ? `${
                          matchedCountry?.malnutrition.chronic_percent * 100
                        }`.slice(0, 5)
                      : "No Data"}
                    %
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default InfoPanel;
