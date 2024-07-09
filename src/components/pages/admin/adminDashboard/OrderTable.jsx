import React, { useEffect, useState, useRef } from "react";
import { getAdminOrders } from "../../../../Api/ApiCall";
import Loader from "../../../LodingDiv/LoaderSmall";

function OrderTable({ selected }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const loader = useRef(null);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("latest");
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 0.5,
    };

    const observerCallback = (entities) => {
      const target = entities[0];
      const totalPages = Math.ceil(count / 10);
      if (target.isIntersecting && page < totalPages) {
        setPage((prev) => prev + 1);
      }
    };

    const observer = new IntersectionObserver(observerCallback, options);

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [page, totalPages, loading]);
  console.log(page);
  useEffect(() => {
    getOrders(page, selectedTab);
  }, [page, selectedTab]);

  const getOrders = async (page, selectedTab) => {
    try {
      setLoading(true);
      const res = await getAdminOrders(page, selectedTab);
      console.log(res.data);
      setCount(res.data.totalCount);
      setTotalPages(Math.ceil(res.data.totalCount / 10));
      setData((prevData) => [...prevData, ...res.data.orderDatas]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setPage(1);
    setData([]);
    setTotalPages(1);
  };
  return (
    <div className="w-full bg-containerWhite p-3 mt-5 rounded-lg overflow-x-auto">
      <div className="flex justify-between items-center">
        {window.location.pathname !== "/admin/orders" && (
          <>
            <h1 className="text-xl font-bold">Orders</h1>
            <a href="/admin/orders" className="text-blue-600 text-xs underline">
              View All
            </a>
          </>
        )}
      </div>
      <div className="flex gap-0 mt-2">
        <div className="flex gap-0">
          <button
            className="p-3 py-1 rounded-l-md font-bold"
            style={{
              backgroundColor:
                selectedTab == "latest"
                  ? "rgba(47, 78, 255, 1)"
                  : "rgba(47, 78, 255, 0.06)",
              color: selectedTab == "latest" ? "white" : "black",
            }}
            onClick={() => handleTabChange("latest")}
          >
            Latest Orders
          </button>
          <button
            className="p-2 py-3 rounded-r-md font-bold"
            style={{
              backgroundColor:
                selectedTab == "returned"
                  ? "rgba(47, 78, 255, 1)"
                  : "rgba(47, 78, 255, 0.06)",
              color: selectedTab == "returned" ? "white" : "black",
            }}
            onClick={() => handleTabChange("returned")}
          >
            Returned Orders
          </button>
        </div>
      </div>

      {/* buttondiv */}

      {/* table */}
      {!loading ? (
        <table className="w-full text-center mt-4">
          <thead
            className=" rounded-lg font-semibold"
            style={{
              backgroundColor: "rgba(242, 242, 242, 1)",
              height: "50px",
            }}
          >
            <tr className="rounded-md">
              <td>Order ID</td>

              <td>Product</td>
              <td>Total Value</td>
              <td>Status</td>
              <td>Vendor</td>
            </tr>
          </thead>

          <tbody>
            {/* demo tr */}
            {data.length ? (
              data.map((data) => (
                <tr
                  style={{
                    height: "60px",
                  }}
                >
                  <td className=" truncate">{"#" + data.orderId.slice(-5)}</td>

                  <td>
                    {" "}
                    <div className="flex gap-2 items-center ml-5">
                      <div className=" w-10 overflow-hidden ">
                        <img src={data.productImage} className="w-10" alt="" />
                      </div>
                      <p className="text-sm text-wrap"> {data?.productName}</p>
                    </div>
                  </td>
                  <td>${data?.totalValue?.toFixed(2)}</td>
                  <td>
                    <button
                      className="p-3 py-2 rounded-lg"
                      style={{
                        backgroundColor:
                          data.status == "Placed"
                            ? "rgba(224, 188, 0, 0.1)"
                            : data.status == "Waiting For Pickup"
                            ? "rgba(224, 188, 0, 0.1)"
                            : data.status == "Cancelled"
                            ? "rgba(219, 48, 34, 0.1)"
                            : data.status == "Returned"
                            ? "rgba(219, 48, 34, 0.1)"
                            : data.status == "Shipped"
                            ? "rgba(47, 78, 255, 0.1)"
                            : data.status == "In Transit"
                            ? "rgba(47, 78, 255, 0.1)"
                            : data.status == "Delivered"
                            ? "rgba(1, 96, 16, 0.1)"
                            : "rgba(0, 224, 22, 0.1)",
                        color:
                          data.status == "Placed"
                            ? "rgba(137, 115, 0, 1)"
                            : data.status == "Waiting For Pickup"
                            ? "rgba(137, 115, 0, 1)"
                            : data.status == "Cancelled"
                            ? "rgba(219, 48, 34, 1)"
                            : data.status == "Returned"
                            ? "rgba(219, 48, 34, 1)"
                            : data.status == "Shipped"
                            ? "rgba(0, 17, 113, 1)"
                            : data.status == "In Transit"
                            ? "rgba(0, 17, 113, 1)"
                            : data.status == "Delivered"
                            ? "rgba(1, 96, 16, 1)"
                            : "rgba(0, 139, 14, 1)",
                      }}
                    >
                      {data.status}
                    </button>
                  </td>
                  <td>
                    <div className="flex gap-1 items-center truncate">
                      <div className="rounded-full w-8 h-8 overflow-hidden">
                        <img
                          src={
                            !data.vendorImage ? "/propic.png" : data.vendorImage
                          }
                          alt=""
                        />
                      </div>
                      {data.vendorName}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <p className="p-5">No Order Yet</p>
            )}

            <tr>
              <td colSpan="5">
                <div ref={loader} className="h-10" />
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <div className=" bg-inherit items-center py-10">
          <Loader />
        </div>
      )}
      {/* table */}
      {/* buttondiv */}
    </div>
  );
}

export default OrderTable;
