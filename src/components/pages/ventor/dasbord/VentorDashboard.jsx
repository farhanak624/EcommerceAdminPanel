import React, { useState, useEffect } from "react";
import Card from "./Card";
import ChartComponent from "../../../Lineareachart/LineAreaChart";
import CustomSpeedometer from "../../../speedometer/Speedomete";
import {
  getVendorStats,
  getvendorTopSellingProducts,
  vendorCostomersDemoGraph,
} from "../../../../Api/ApiCall";
import Datepicker from "../../../Lineareachart/Datepicker";
import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";
import { colorScale1 } from "./Graph/map-data/data";
import { colorScale2 } from "../../../Layout/mapGraph/map-data/data";
import { countryAlpha2List } from "./Graph/map-data/CountryCodes";
import ReactCountryFlag from "react-country-flag";
import { useDispatch, useSelector } from "react-redux";
import {
  loadSpinner,
  setCurrencyData,
} from "../../../../Redux/Features/NavbarSlice";

const VentorDashboard = () => {
  const dispatch = useDispatch();
  const [data5, setData] = useState({});
  const [vendorTable, setVendorTable] = useState([]);
  const [Currency, setCurrency] = useState();
  const [viewed, setViewed] = useState([]);
  const [Selled, setSelled] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    vendorStats();
    vendorTableData(new Date().toISOString());
    customerData();
  }, []);
  const customerData = async () => {
    try {
      dispatch(loadSpinner());
      const res = await vendorCostomersDemoGraph();
      setViewed(res?.data?.topViewedCountries);
      setSelled(res?.data?.topSalesCountries);
      
      dispatch(setCurrencyData(res?.data?.currency));
      dispatch(loadSpinner());
    } catch (error) {
      console.log(error);
      dispatch(loadSpinner());
    }
  };
  const countryCodeMap = countryAlpha2List?.reduce((acc, country) => {
    acc[country.name] = country.code;
    return acc;
  }, {});

  const customerViewed = viewed?.reduce((acc, item) => {
    const countryCode = countryCodeMap[item.country];
    console.log("countryCode", countryCode, item.country);
    if (countryCode) {
      acc[countryCode] = item.views;
    } else {
      console.warn(`No code found for country: ${item.country}`);
    }
    return acc;
  }, {});

  const customerSelled = Selled?.reduce((acc, item) => {
    const countryCode = countryCodeMap[item.country];
    console.log("countryCode", countryCode, item.country);
    if (countryCode) {
      acc[countryCode] = item.sales;
    } else {
      console.warn(`No code found for country: ${item.country}`);
    }
    return acc;
  }, {});
  console.log("customerSelled", customerSelled);
  console.log("customerViewed", customerViewed);
  useEffect(() => {
    setLoading(true);
    vendorStats();
    vendorTableData(new Date().toISOString());
  }, []);
  const vendorStats = async () => {
    try {
      const res = await getVendorStats();
      console.log("res", res.data);
      setData(res.data);
      setCurrency(res.data.currency);
      dispatch(setCurrencyData(res?.data?.currency));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const vendorTableData = async (date) => {
    try {
      const res = await getvendorTopSellingProducts(date);
      setVendorTable(res.data.topProducts);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // const datachart = {
  //   labels: ["January", "February", "March", "April", "May", "June", "July"],
  //   values: [65, 59, 80, 81, 56, 55, 40],
  // };
  return (
    <div>
      <>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <Card
            color={"rgba(240, 251, 235, 1)"}
            icon={"/arrowsatatue.png"}
            data={{ price: `${Currency} ${data5?.totalSale?.toFixed(1)}` }}
            text={"Total Sale"}
          />
          <Card
            color={"rgba(255, 211, 208, 1)"}
            icon={"/squericon.png"}
            text={"Total Orders"}
            data={{ price: data5?.totalOrders }}
          />
          <Card
            color={"rgba(209, 216, 255, 1)"}
            icon={"/userspng.png"}
            text={"Total Customers"}
            data={{ price: data5?.totalCustomers }}
          />
          <Card
            color={"rgba(255, 231, 193, 1)"}
            icon={"/triyanglesq.png"}
            text={"Total Product"}
            data={{ price: data5?.totalProducts }}
          />
        </div>
        {/* graph data */}
        <div className="flex md:flex-row flex-col mt-10 gap-3 ">
          <div className="bg-containerWhite w-full md:w-[60%] max-h-[550px] p-4 rounded-lg shadow-sm">
            <ChartComponent />
          </div>
          <div
            className="bg-containerWhite max-h-[550px] overflow-hidden overflow-y-auto  w-full md:w-[40%] p-4 rounded-lg shadow-sm"
            style={{ scrollbarWidth: "none" }}
          >
            <h1 className="font-semibold text-2xl mt-1">
              Customers Demographic
            </h1>
            <h3 className=" text-gray-400 mb-5">
              Number of customers based on country
            </h3>
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
                      values: customerViewed,
                      attribute: "fill",
                    },
                    {
                      scale: colorScale2, // Assign the first color in colorScale to viewed data
                      // Assign the second color in colorScale to selled data

                      values: customerSelled,
                      attribute: "fill",
                    }, // Additional region for default gray color
                  ],
                }}
                regionStyle={{
                  initial: {
                    fill: "#CCCCCC", // Set default fill color to gray
                  },
                }}
                // topViewedCountry={topViewedCountry}
                // topSelledCountry={topSelledCountry}
              />
            </div>
            {/* top seeled cont */}
            <h1 className="text-md ">Top Selled Country</h1>
            {Selled.length > 0 &&
              Selled.map((country, index) => {
                const countryCode = countryCodeMap[country.country.trim()];
                return (
                  <div className="mt-4">
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex gap-2 items-center">
                        <div className="rounded-full w-16 h-16 overflow-x-hidden">
                          <img src={country?.flag} className="mt-4" alt="" />
                        </div>
                        <div className="text-sm">
                          <h1>{country?.country}</h1>
                          <p className="text-gray-500 text-sm">
                            {country.sales} Views
                          </p>
                        </div>
                      </div>
                      <div
                        className="rounded-lg w-7 h-7"
                        style={{ backgroundColor: "#BE0A33" }}
                      ></div>
                    </div>
                  </div>
                );
              })}

            {/* top seeled cont */}
            {/* most viewed */}

            {viewed.length > 0 &&
              viewed.map((country, index) => {
                const countryCode = countryCodeMap[country.country.trim()];
                console.log("countryCode", countryCode, country);
                return (
                  <div className="mt-4">
                    <h1 className="text-md ">Most viewed Country</h1>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex gap-2 items-center">
                        <div className="rounded-full w-16 h-16 overflow-x-hidden">
                          <ReactCountryFlag
                            countryCode={countryCode}
                            svg
                            style={{
                              width: "4em",
                              height: "4em",
                            }}
                            title={country[index]}
                          />
                        </div>
                        <div className="text-sm">
                          <h1>{country.country}</h1>
                          <p className="text-gray-500 text-sm">
                            {country.views} Views
                          </p>
                        </div>
                      </div>
                      <div
                        className="rounded-lg w-7 h-7"
                        style={{ backgroundColor: "#002654" }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            {/* most viewed */}
          </div>
        </div>
        {/* graph data */}
        {/* table data */}
        <div className="flex md:flex-row flex-col mt-10 gap-3 ">
          <div
            style={{ scrollbarWidth: "none" }}
            className="bg-containerWhite w-full md:w-[60%] h-[350px] overflow-hidden overflow-y-auto p-5 rounded-lg shadow-sm"
          >
            <div className="flex justify-between">
              <h1 className="font-bold">Top Selling Products</h1>
              <Datepicker fn={vendorTableData} />
            </div>
            <table className="mt-1  w-full">
              <thead>
                <tr className="h-16 font-bold">
                  <td>
                    <div className="flex gap-1">
                      <img src="/Vectortable.png" className="w-5" alt="" />
                      <p>Product</p>
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-4 items-center justify-center">
                      <img src="/Grouptable.png" className="w-5" alt="" />
                      <p>Status</p>
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-4 items-center justify-center">
                      <img src="/Vectortabletable.png" className="w-5" alt="" />
                      <p>Sales</p>
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-4 items-center justify-center">
                      <img src="/Vector (5)table.png" className="w-5" alt="" />
                      <p>Earning</p>
                    </div>
                  </td>
                </tr>
              </thead>
              {/* table body */}
              <tbody>
                {vendorTable.length > 0 ? (
                  vendorTable?.map((data) => (
                    <tr className="">
                      <td className="" style={{ maxWidth: "100px" }}>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-16 shadow-md p-1 rounded-xl bg-containerWhite flex items-center justify-center">
                            {" "}
                            <img src="/imgtable.png" alt="" />
                          </div>
                          <p className="overflow-wrap break-word max-w-40">
                            {data.productName}
                          </p>
                        </div>
                      </td>
                      <td className="justify-center items-center">
                        <div className="flex justify-center">
                          <div
                            className="rounded-xl flex justify-center  p-1 px-4"
                            style={{
                              backgroundColor: "rgba(233, 255, 229, 1)",
                            }}
                          >
                            {data.status == "active" ? "Live" : "Banned"}
                          </div>
                        </div>
                      </td>
                      <td className="text-center">{data.sales}</td>
                      <td className="text-center">$ {data.earnings}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center pt-2">
                      No Product Data Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="bg-containerWhite flex justify-center items-center w-full md:w-[40%] p-4 rounded-lg shadow-sm">
            <CustomSpeedometer value={80} />
          </div>
        </div>
        {/* table data */}
      </>
    </div>
  );
};

export default VentorDashboard;
