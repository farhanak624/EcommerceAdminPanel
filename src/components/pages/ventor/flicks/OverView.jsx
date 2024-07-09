import React, { useEffect, useState } from "react";
import OverViewCards from "./OverViewCards";
import ChartComponent from "../../../Lineareachart/LineAreaChart";
import MyVectorMap from "../../../Layout/mapGraph/Mapgraph";
import { useSelector } from "react-redux";
import { flickOverView } from "../../../../Api/ApiCall";
import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";
import { colorScale2 } from "../dasbord/Graph/map-data/data";

function OverView() {
  const [flick, setflick] = useState();
  const [totalViewed, setTotalViewed] = useState(0);
  const [totalsaved, setTotalsaved] = useState(0);
  const [CountryData, setCountryData] = useState()
  const { flickId } = useSelector((state) => {
    return state.navbar;
  });
  useEffect(() => {
    console.log(flickId, "flickId");
    getFlickDetails(flickId);
  }, [flickId]);
  const getFlickDetails = (flickId) => {
    flickOverView(flickId)
      .then((data) => {
        console.log("dataasa", data?.data);
        setflick(data?.data?.flick);
        console.log(data?.data?.flicks);
        setTotalsaved(data?.data?.totalSaved);
        setTotalViewed(data?.data?.totalVisitors);
        setCountryData(data?.data?.countriesWithCount)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <div className="bg-containerWhite flex justify-between w-full h-16 shadow-md rounded-lg ">
        <div className="flex max-h-16 items-center rounded-lg overflow-hidden gap-2">
          <img src={flick?.banner} className="w-16 h-full rounded-lg" alt="" />
          <div className="p-2 text-xs">
            <p>{flick?.name}</p>
            <p>{flick?.releasedYear}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-2">
          {flick?.rating != 0 ? (
            <div>
              <p>{flick?.rating}</p>
              <img src="/star.png" className="w-4" alt="" />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {/* cardsection */}
      <section>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-5 gap-5">
          <OverViewCards
            data={totalViewed}
            img={"/eye.png"}
            text={"Total Visitors"}
          />
          {/* <OverViewCards
            data={data2}
            img={"/flover.png"}
            text={"Total Income"}
          /> */}
          <OverViewCards
            data={totalsaved}
            img={"/imagee.png"}
            text={"Total  Saved"}
          />
          {/* <OverViewCards
            data={data1}
            img={"/download.png"}
            text={"Total Shared"}
          /> */}
        </div>
      </section>
      {/* cardsection */}
      {/* graphsection */}
      <div className="flex md:flex-row flex-col gap-4 mt-5">
        {/* <div className="w-full md:w-[65%] bg-containerWhite p-3 rounded-lg max-h-[550px] shadow-md">
          <ChartComponent />
        </div> */}
        {/* Mapgraph */}
        <div
          className="w-full md:w-[100%] bg-containerWhite shadow-md p-2 rounded-lg max-h-[550px] overflow-hidden overflow-y-auto"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="mt-3 mb-3">
            <h1 className="font-bold">Customers Demographic</h1>
            <p className="text-gray-500 text-sm">Active Users World Map</p>
          </div>
          <VectorMap
            map={worldMill}
            backgroundColor="rgba(240, 244, 255, 1)"
            zoomOnScroll={false}
            containerStyle={{ width: "100%", height: "100%" }}
            containerClassName="map"
            series={{
              regions: [
                {
                  scale: colorScale2, // Assign the first color in colorScale to viewed data
                  // Assign the second color in colorScale to selled data

                  values: CountryData,
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

          <div className="mt-4">
            <h1 className="text-md ">Most Viewed Country</h1>
            <div className="flex justify-between items-center mt-2">
              <div className="flex gap-2 items-center">
                <div className="rounded-full w-16 h-16 overflow-x-hidden">
                  <img
                    src="/franceflag.png"
                    className="w-full h-full rounded-full"
                    alt=""
                  />
                </div>
                <div className="text-sm">
                  <h1>France</h1>
                  <p className="text-gray-500 text-sm">10677 Product Sells</p>
                </div>
              </div>
              <div
                className="rounded-lg w-7 h-7"
                style={{ backgroundColor: "#002654" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverView;
