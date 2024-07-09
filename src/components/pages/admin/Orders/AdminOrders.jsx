import React, { useEffect, useState } from "react";
import Card from "./card/Card";
import ChartComponent from "./linechart/ChartComponent";
import OrderTable from "../adminDashboard/OrderTable";
import { getAdminGetStats } from "../../../../Api/ApiCall";
import { useDispatch } from "react-redux";
import { loadSpinner } from "../../../../Redux/Features/NavbarSlice";
import Loader from "../../../LodingDiv/LoaderSmall";

function calculatePercentageChange(returnOrders, prevReturnOrders) {
  if (prevReturnOrders === 0 && returnOrders === 0) {
    return '0';
  } else if (prevReturnOrders === 0) {
    return '100';
  } else {
    return ((returnOrders - prevReturnOrders) * 100 / prevReturnOrders).toFixed(2).replace(/\.?0+$/, '');
  }
}

function AdminOrders() {
  const dispatch = useDispatch();
  const [selected, setselected] = useState("This Year");
  const [dropdown, setdropdown] = useState(false);
  const [loading, setLoading] = useState(true)

  const [data, setData] = useState({});
  useEffect(() => {
    getOrderStats(selected);
  }, [selected])

  const getOrderStats = async (selected) => {
    // dispatch(loadSpinner());
    try {
      setLoading(true)
      const res = await getAdminGetStats(selected);
      console.log(res.data)
      setData(res.data);
      //  dispatch(loadSpinner());
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error);
      // dispatch(loadSpinner());
    }
  }


  return (
    <div className="p-4">
      {/* dashbord card */}
      <div className="flex justify-between text-sm py-5">
        <h1 className="text-xl font-bold">Orders</h1>
        <div
          className="p-1.5 relative flex justify-between min-w-[20%] max-w-[30%] items-center rounded-lg cursor-pointer"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
          onClick={() => setdropdown(!dropdown)}
        >
          <p>{selected}</p>

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
              className="absolute top-9 w-full bg-black text-white rounded-md left-0 z-40 "
            >
              <li
                className="p-1 flex justify-center hover:bg-gray-700"
                onClick={() => setselected("This Year")}
              >
                This Year
              </li>
              <li
                className="p-1 flex justify-center hover:bg-gray-700"
                onClick={() => setselected("This Month")}
              >
                This Month
              </li>
              <li
                className="p-1 flex justify-center hover:bg-gray-700"
                onClick={() => setselected("This Week")}
              >
                This Week
              </li>

            </ul>
          )}
        </div>
      </div>
      {!loading ? <>



        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <Card
            text={"Total Orders"}
            data={{
              totalCount: data.totalOrder,
              persetage: data.prevTotalOrder != 0 ? (data.totalOrder - data.prevTotalOrder) * 100 / data.prevTotalOrder : 100,
            }}
            img={"/Orders.png"}
            color={"rgba(242, 251, 255, 1)"}
          />
          <Card
            text={"Cancel Orders"}
            data={{
              totalCount: data.cancelledOrders,
              persetage: data.preveCancelledOrders != 0 ? (data.cancelledOrders - data.preveCancelledOrders) * 100 / data.preveCancelledOrders : data.cancelledOrders,
            }}
            img={"/CancelOrder.png"}
            color={"rgba(242, 239, 255, 1)"}
          />
          <Card
            text={"Pending Orders"}
            data={{
              totalCount: data.pendingOrders,
              persetage: data.prevPendingOrders != 0 ? (data.pendingOrders - data.prevPendingOrders) * 100 / data.prevPendingOrders : 100,
            }}
            img={"/pendingOrders.png"}
            color={"rgba(255, 251, 241, 1)"}
          />
          <Card
            text={"Delivered Orders"}
            data={{
              totalCount: data.deliverdOrders,
              persetage: data.prevDeliverdOrders != 0 ? (data.deliverdOrders - data.prevDeliverdOrders) * 100 / data.prevDeliverdOrders : data.deliverdOrders,
            }}
            img={"/delivered.png"}
            color={"rgba(255, 236, 230, 1)"}
          />
        </div>
        {/* dashbord card */}
        {/* chart div */}
        <div className="flex flex-col md:flex-row gap-4 mt-8">
          <div className="w-full p-4 rounded-xl bg-containerWhite md:w-[110%]">
            <ChartComponent
              percentage={data.prevTotalOrder != 0 ? (data.totalOrder - data.prevTotalOrder) * 100 / data.prevTotalOrder : data.totalOrder}
              total={data.totalOrder}
              maxMonth={data?.monthWithMostOrders?.month}
              maxValue={data?.monthWithMostOrders?.totalOrders}
              minMonth={data?.monthWithLeastOrders?.month}
              minValue={data?.monthWithLeastOrders?.totalOrders}
              data={data?.orders} />
          </div>
          <div className="w-full bg-containerWhite rounded-lg md:w-[36%] flex flex-col justify-between">
            <h1 className="p-2 pl-5 pt-5 font-semibold">Returned Orders</h1>
            <div className="flex gap-4 mt-10 pl-8 items-center">
              <div className="p-3 m-3 rounded-lg" style={{ backgroundColor: 'rgba(188, 226, 245, 1)' }}>
                <img src={'/cart.png'} className="w-10 h-10" alt="" />
              </div>
              <div>

                <div>
                  <p className="text-xl font-bold">{data?.returnOrders}</p>
                  <p className="flex gap-1 items-center" style={{ color: data?.prevReturnOrders != 0 ? (data?.returnOrders - data?.prevReturnOrders) * 100 / data?.prevReturnOrders : data?.returnOrders >= 0 ? "rgba(63, 197, 0, 1)" : "red" }}>
                    <span
                      className=""
                      style={{
                        color: data?.prevReturnOrders != 0 ? (data?.returnOrders - data?.prevReturnOrders) * 100 / data?.prevReturnOrders : data?.returnOrders >= 0 ? "rgba(63, 197, 0, 1)" : "red",
                        fontWeight: "bold",
                        fontSize: "1.2em", // Adjust font size to make it smaller
                        lineHeight: "0.1", // Adjust line height to make it smaller
                      }}
                    >
                      {"\u2191"}
                    </span>
                    {/* {(data.prevReturnOrders != 0 ? ((data.returnOrders - data.prevReturnOrders) * 100 / data.prevReturnOrders) : 100).toFixed(2).replace(/\.?0+$/, '')} */}
                    {calculatePercentageChange(data?.returnOrders, data?.prevReturnOrders)}
                    %
                  </p>
                </div>

              </div>
            </div>
            <div >
              <img src='/OrderBoxImg.png' alt="" />
            </div>
          </div>
        </div>
        {/* chart div end */}

        {/* orderTable */}
        <OrderTable />
      </> : <div className=" bg-inherit items-center pt-48"><Loader /></div>}
    </div>
  );
}

export default AdminOrders;
