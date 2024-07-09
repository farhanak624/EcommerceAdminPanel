import React, { useEffect } from "react";
import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";
import { selledcountry, colorScale2, colorScale1 } from "./map-data/data";
import { countryAlpha2List } from "./map-data/CountryCodes";

const CustomerGraph = () => {
  // Create a copy of the original color scale
  useEffect(() => {}, []);

  //   const colorScale1 = ["#002654"];
  //   const colorScale2 = ["#BE0A33"];
  const countryCodeMap = countryAlpha2List?.reduce((acc, country) => {
    acc[country.name] = country.code;
    return acc;
  }, {});

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ width: "100%", height: "350px" }}
    >
      <VectorMap
        map={worldMill}
        backgroundColor="rgba(240, 244, 255, 1)"
        zoomOnScroll={false}
        containerStyle={{ width: "100%", height: "100%" }}
        containerClassName="map"
        series={{
          regions: [
            {
              scale: colorScale1, // Assign the first color in colorScale to viewed data
              // Assign the second color in colorScale to selled da
              values: viewedCountry,
              attribute: "fill",
            },
            {
              scale: colorScale2, // Assign the first color in colorScale to viewed data
              // Assign the second color in colorScale to selled data

              // values: selledCountry,
              attribute: "fill",
            }, // Additional region for default gray color
          ],
        }}
        regionStyle={{
          initial: {
            fill: "#CCCCCC", // Set default fill color to gray
          },
        }}
      />
    </div>
  );
};

export default CustomerGraph;
