import React, { useEffect, useState } from "react";
import TopNav from "../../../Layout/TopNav";
import Card from "./card/Card";
import { toPadding } from "chart.js/helpers";
import ChartComponent from "../linechart/ChartComponent";

import OrderTable from "./OrderTable";
import VendorsTable from "./VendorsTable";
import {
  getAdminDashboardData,
  getAdminGetStats,
} from "../../../../Api/ApiCall";
import { useDispatch } from "react-redux";
import { loadSpinner } from "../../../../Redux/Features/NavbarSlice";
import ShippingChargeCard from "./ShippingChargeCard";

function AdminDashboard() {
  const dispatch = useDispatch();
  const [selected, setselected] = useState("This Year");
  const [dropdown, setdropdown] = useState(false);
  const [ orderData, setOrderData ] = useState({});
  const [dashboardData, setDashBoarbData] = useState({})
  const [ vendorTable, setVendorTable ] = useState(dashboardData?.vendorData)
 

  useEffect(() => {
    setVendorTable(dashboardData?.vendorData);
  }, [dashboardData]);

  useEffect(() => {
    getData(selected);
  }, [selected]);
  const getData = async (selected) => {
    try {
      dispatch(loadSpinner());
      const res = await getAdminDashboardData(selected);
      console.log(res.data);
      setDashBoarbData(res.data);
      setOrderData(res.data);
      dispatch(loadSpinner());
      
    } catch (error) {
      console.log(error);
      dispatch(loadSpinner());
    }
  };

  return (
    <div className="">
      <>
      <div
        className="p-1 mb-2 w-36 ml-auto relative flex justify-between min-w-[15%] items-center rounded-lg cursor-pointer"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        onClick={() => setdropdown(!dropdown)}
      >
        <p className="">{selected}</p>

        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.375076 1.70711L3.96086 5.29289C4.35139 5.68342 4.98455 5.68342 5.37508 5.29289L8.96086 1.70711C9.59083 1.07714 9.14466 0 8.25376 0H1.08218C0.191278 0 -0.254888 1.07714 0.375076 1.70711Z"
            fill="black"
          />
        </svg>

        {dropdown && (
          <ul
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            className="absolute hover:cursor-pointer top-9 w-full bg-black text-white rounded-md left-0 z-40"
          >
            <li
              className="p-1 flex justify-center"
              onClick={() => setselected("This Year")}
            >
              This Year
            </li>
            <li
              className="p-1 flex justify-center"
              onClick={() => setselected("This Month")}
            >
              This Month
            </li>
            <li
              className="p-1 flex justify-center"
              onClick={() => setselected("This Week")}
            >
              This Week
            </li>
          </ul>
        )}
      </div>

      {/* dashbord card */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <Card
          text={"Total Revenue"}
          data={{totalCount: dashboardData.totalRevenue?.toFixed(2), persetage : dashboardData.prevTotalRevenue != 0 ? (dashboardData.totalRevenue-dashboardData.prevTotalRevenue)*100/dashboardData.prevTotalRevenue : 100}}
          img={"/Money.png"}
          color={"rgba(16, 200, 0, 0.08)"}
        />
        <Card
          text={"Total Vendors"}
          data={{
            totalCount: dashboardData.totalVendorData?.totalVendorsCount,
            last7: dashboardData?.totalVendorData?.actives,
            todaycount: dashboardData?.totalVendorData?.nonActive,
          }}
          img={"/user (3).png"}
          color={"rgba(0, 18, 119, 0.08)"}
        />
        <Card
          text={"Total Customers"}
          data={{
            totalCount: dashboardData.totalUserData?.total,
            last7: dashboardData?.totalUserData?.orderedUsersCount,
            todaycount: dashboardData?.totalUserData?.notOrderedUsersCount,
          }}
          img={"/users.png"}
          color={"rgba(233, 118, 57, 0.08)"}
        />
      </div>
      {/* dashbord card */}
      {/* chart div */}
      <div className="flex flex-col md:flex-row gap-4 mt-8">
        <div className="w-full p-4 bg-containerWhite md:w-[75%] rounded-lg">
          <ChartComponent
            total={orderData?.totalOrdersInYear}
            prev={orderData?.totalOrderPrevYear}
            maxMonth={orderData?.monthWithMostOrders?.month}
            maxValue={orderData?.monthWithMostOrders?.totalOrders}
            minMonth={orderData?.monthWithLeastOrders?.month}
            minValue={orderData?.monthWithLeastOrders?.totalOrders}
            data={orderData?.orders}
          />
        </div>
        <div className="w-full bg-containerWhite rounded-lg md:w-[36%] flex flex-col justify-between">
          <h1 className="p-2 pl-5 pt-5 font-semibold">
            Total Flicks Subscribes
          </h1>
          <div className="flex gap-4 mt-10 pl-8 items-center">
            <div
              className="p-6 m-3 rounded-lg"
              style={{ backgroundColor: "rgba(211, 218, 255, 1)" }}
            >
              <img src={"/flix.png"} className="w-6 h-6" alt="" />
            </div>
            <div>
              <div>
                <p className="text-xl font-bold">
                  {dashboardData?.flicksSubscirbers?.totalFlicksSubscribes}
                </p>
                <div className="flex items-center gap-1 mt-3">
                  <div className="p-0.5 bg-green-600 rounded-full"></div>
                  {dashboardData?.flicksSubscirbers?.activeFlicksSubscribes}
                  <div className="p-0.5 bg-red-600 rounded-full ml-3"></div>
                  {dashboardData?.flicksSubscirbers?.nonActiveFlicksSubscribes}
                </div>
              </div>
            </div>
          </div>
          <div>
            <img src="/OrderBoxImg.png" alt="" />
          </div>
        </div>
      </div>
      {/* chart div end */}
      <div className="pt-2">
      {/* <ShippingChargeCard/> */}
      </div>
      {/* ventor tabl */}
      <div className="w-full bg-containerWhite p-3 mt-5 rounded-lg overflow-x-auto">
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold">Vendors</h1>
          <a href="/admin/vendors#" className="text-blue-600 text-xs underline">
            View All
          </a>
        </div>
        {/* buttondiv */}
        <div className="flex gap-0 mt-5 ">
          <button
            className="p-3 py-1 rounded-l-md font-bold"
            style={{
              backgroundColor:
                vendorTable == dashboardData?.vendorData
                  ? "rgba(47, 78, 255, 1)"
                  : "rgba(47, 78, 255, 0.06)",
              color:
                vendorTable == dashboardData?.vendorData ? "white" : "black",
            }}
            onClick={() => {
              setVendorTable(dashboardData?.vendorData);
            }}
          >
            Top Vendors
          </button>
          <button
            className="p-2 py-3 rounded-r-md font-bold"
            style={{
              backgroundColor:
                vendorTable == dashboardData?.newVendors
                  ? "rgba(47, 78, 255, 1)"
                  : "rgba(47, 78, 255, 0.06)",
              color:
                vendorTable == dashboardData?.newVendors ? "white" : "black",
            }}
            onClick={() => {
              setVendorTable(dashboardData?.newVendors);
            }}
          >
            New Vendors
          </button>
        </div>
        {/* table */}
        <VendorsTable data={vendorTable} />
        {/* table */}
        {/* buttondiv */}
      </div>
      {/* ventor tabl ent */}
      {/* orderTable */}
      
      
      <OrderTable /></>
      
    </div> 
  );
}

export default AdminDashboard;
