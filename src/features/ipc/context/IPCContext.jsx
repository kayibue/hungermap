// import React, { createContext, useEffect, useState } from "react";
// import { ipcService } from "../services/ipc.services";
// import { useMapContext } from "../../map/hooks/useMapContext";

// const IPCContext = createContext();

// const IPCProvider = ({ children }) => {
//   const [ipcData, setIPCData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { mapRef } = useMapContext();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await ipcService.fetchIPCData();
//         setIPCData(data?.data?.body?.ipc_peaks);
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const applyIPCLayer = () => {
//     console.log(ipcData);

//     if (mapRef.current && ipcData.length > 0) {
//       ipcData.forEach((ipcCountry) => {
//         const countryIso3 = ipcCountry.iso3;

//         console.log(mapRef.current.getStyle().layers);

//         const countryFeature = mapRef.current.querySourceFeatures("africa", {
//           sourceLayer: "africa-countries",
//           filter: ["==", "iso3", countryIso3],
//         })[0];

//         console.log(countryFeature);

//         if (countryFeature) {
//           const phaseSeverity = ipcCountry.phase_3_plus_number;

//           let fillColor = "#FFFFFF";
//           if (phaseSeverity > 1000000) {
//             fillColor = "#FF0000";
//           } else if (phaseSeverity > 500000) {
//             fillColor = "#FFA500";
//           } else {
//             fillColor = "#FFFF00";
//           }

//           mapRef.current.setPaintProperty("country-boundaries", "fill-color", [
//             "match",
//             ["get", "iso3"],
//             countryIso3,
//             fillColor,
//             "#FFFFFF",
//           ]);
//         }
//       });
//     }
//   };

//   return (
//     <IPCContext.Provider value={{ loading, error, applyIPCLayer }}>
//       {children}
//     </IPCContext.Provider>
//   );
// };

// export { IPCContext, IPCProvider };
import React, { createContext, useEffect, useState } from "react";
import { ipcService } from "../services/ipc.services";
import { useMapContext } from "../../map/hooks/useMapContext";

const IPCContext = createContext();

const IPCProvider = ({ children }) => {
  const [ipcData, setIPCData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { mapRef, activeLayer } = useMapContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ipcService.fetchIPCData();
        setIPCData(data?.data?.body?.ipc_peaks);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const applyIPCLayer = () => {
    if (mapRef.current && ipcData.length > 0) {
      // Create a data lookup object
      const phase3Lookup = {};
      ipcData.forEach((item) => {
        phase3Lookup[item.iso3] = item.phase_3_plus_number;
      });

      if (activeLayer === "ipc") {
        mapRef.current.removeLayer("ipc-layer");
      }

      mapRef.current.addLayer({
        id: "ipc-layer",
        type: "fill",
        source: "africa",
        paint: {
          "fill-color": [
            "case",
            ["has", ["get", "iso-a3"], ["literal", phase3Lookup]],
            [
              "interpolate",
              ["linear"],
              ["get", ["get", "iso-a3"], ["literal", phase3Lookup]],
              0,
              "#fee5d9",
              20,
              "#fcae91",
              40,
              "#fb6a4a",
              500000,
              "#de2d26",
              1000000,
              "#a50f15",
            ],
            "#ccc", // Default color for countries without data
          ],
          "fill-opacity": 0.7,
          "fill-outline-color": "#000",
        },
      });
    }
  };

  return (
    <IPCContext.Provider value={{ loading, error, applyIPCLayer }}>
      {children}
    </IPCContext.Provider>
  );
};

export { IPCContext, IPCProvider };
