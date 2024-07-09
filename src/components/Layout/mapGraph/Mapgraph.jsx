import React from "react";
import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";
import { selledcountry, colorScale2, colorScale1 } from "./map-data/data";
import { countryAlpha2List } from "./map-data/CountryCodes";

const MyVectorMap = ({ topViewedCountry, topSelledCountry }) => {
  // Create a copy of the original color scale
 
  const colorScale1 = ["#002654"];
  const colorScale2 = ["#BE0A33"];
  const countryCodeMap = countryAlpha2List?.reduce((acc, country) => {
    acc[country.name] = country.code;
    return acc;
  }, {});

  const viewedCountry = topViewedCountry?.reduce((acc, item) => {
    const countryCode = countryCodeMap[item.country];

    if (countryCode) {
      acc[countryCode] = item.viewCount;
    } else {
      console.warn(`No code found for country: ${item.country}`); // Warning if code is not found
    }
    return acc;
  }, {});
console.log("viewedCountry", viewedCountry);
  const selledCountry = topSelledCountry?.reduce((acc, item) => {
    console.log("hi", item);
    const countryCode = countryCodeMap[item.country];
    console.log(
      "Processing country:",
      item.country,
      "Found code:",
      countryCode
    ); // Debug log
    if (countryCode) {
      acc[countryCode] = item.count;
    } else {
      console.warn(`No code found for country: ${item.country}`); // Warning if code is not found
    }
    return acc;
  }, {});
console.log("selledCountry", selledCountry);
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

              values: selledCountry,
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

export default MyVectorMap;
