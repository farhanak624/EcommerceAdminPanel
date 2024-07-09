import { useEffect, useState } from "react";
import Card from "./CardsTopOrder";
import ChartOrder from "./ChartOrder";
import Invoice from "./Invoice";
import { useNavigate } from "react-router-dom";
import { getOrders, getOrderStatics } from "../../../../Api/ApiCall";
import OrderDetailModal from "./OrderDetailModal";
import Loading from "../../../LodingDiv/LoaderSmall";
import { useDispatch, useSelector } from "react-redux";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState("exchanged");
  const [orderData, setOrderData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [cardsData, setCardsData] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState("");
  const [selected, setselected] = useState("Weekly");
  const [dropdown, setdropdown] = useState(false);
  const [currency, setCurrency] = useState();

  // const loader = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    orders();
  }, [status, page]);

  useEffect(() => {
    orderStatics();
  }, [selected]);

  // console.log("page: ", page)

  const orders = () => {
    // dispatch(loadSpinner());
    getOrders(status, page)
      .then((data) => {
        console.log("getOrders: ", data.data);
        // const { currency } = useSelector((state) => {
        //   return state.navbar;
        // });
        // setCurrency(currency);
        const orderDatas = data.data.orderDatas;
        if (Array.isArray(orderDatas)) {
          const formattedOrders = orderDatas.map((order) => ({
            ...order,
            orderDate: formatDate(order.date),
            // productName: capitalizeEachWord(order.productName)
          }));
          setOrderData((prevData) => [...prevData, ...formattedOrders]); // Append new data to existing data
          setTotalCount(data?.data?.totalCount);
          // dispatch(loadSpinner());
        } else {
          console.log("No orders found or data is not in expected format");
          // dispatch(loadSpinner());
        }
      })
      .catch((error) => {
        console.log("error occurred in get orders: ", error);
      })
      .finally(() => {
        // dispatch(loadSpinner());
      });
  };

  const handleScroll = () => {
    // Detect when user has scrolled to the bottom
    const { scrollTop, scrollHeight, clientHeight } =
      document.documentElement || document.body;

    // Detect when user has scrolled to the bottom
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      // If all data is not fetched yet
      if (orderData.length < totalCount) {
        setPage((prevPage) => prevPage + 1); // Increment page number to fetch next set of data
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [orderData, totalCount]); // Re-add scroll event listener when orderData or totalCount changes

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setPage(1);
    setOrderData([]);
  };

  const orderStatics = () => {
    getOrderStatics(selected).then((data) => {
      console.log("getOrderStatics: ", data.data);
      const {
        newOrder,
        deliverdOrders,
        pendingOrders,
        cancelledOrders,
        graphDatas,
      } = data.data;
      setCardsData({
        newOrder,
        deliverdOrders,
        pendingOrders,
        cancelledOrders,
      });
      // console.log('cardsData', cardsData)
      setGraphData(graphDatas);
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();

    // Ensure leading zeros for day and month if needed
    const formattedDay = day < 10 ? "0" + day : day;
    const formattedMonth = month < 10 ? "0" + month : month;

    return `${formattedDay}-${formattedMonth}-${year}`;
  };

  // Function to capitalize the first letter of each word
  const capitalizeEachWord = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const handleButtonClick = (order) => {
    // Show the invoice only if the button is displaying "Download"
    if (status === "Pending") {
      navigate("/invoice", { state: { order: order } });
    }
  };

  // const handleButtonClick = () => {
  //   // Show the invoice only if the button is displaying "Download"
  //   if (selectedHeading === 'pending') {
  //     window.open('/invoice', '_blank');
  //   }
  // };

  const handleRowClick = (id) => {
    console.log("selectedOrderid: ", id);
    setSelectedOrder(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder("");
  };

  const getDisplayValue = (value) => {
    return value !== undefined && value !== null ? value : "N/A";
  };

  return (
    <div>
      <h1 className="font-bold">Orders</h1>
      <div
        className="p-1 mb-4 w-36 ml-auto relative flex justify-between min-w-[15%] items-center rounded-lg"
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
            className="absolute hover:cursor-pointer top-9 w-full bg-black text-white rounded-md left-0 z-40"
          >
            <li
              className="p-1 flex justify-center"
              onClick={() => setselected("Yearly")}
            >
              Yearly
            </li>
            <li
              className="p-1 flex justify-center"
              onClick={() => setselected("Monthly")}
            >
              Monthly
            </li>
            <li
              className="p-1 flex justify-center"
              onClick={() => setselected("Weekly")}
            >
              Weekly
            </li>
          </ul>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-4">
        <Card
          color={"#E4F7FF"}
          icon={"/newOrders.png"}
          data={cardsData ? cardsData.newOrder : 0}
          text={"New Orders"}
          bgcolor={"#F2FBFF"}
        />
        <Card
          color={"#E5DFFF"}
          icon={"/deliveredOrders.png"}
          data={cardsData ? cardsData.deliverdOrders : 0}
          text={"Delivered Orders"}
          bgcolor={"#F2EFFF"}
        />
        <Card
          color={"#FFF3D3"}
          icon={"/pendingOrders.png"}
          data={cardsData ? cardsData.pendingOrders : 0}
          text={"Pending Orders"}
          bgcolor={"#FFFBF1"}
        />
        <Card
          color={"#FFDCD1"}
          icon={"/cancelledOrders.png"}
          data={cardsData ? cardsData.cancelledOrders : 0}
          text={"Cancelled Orders"}
          bgcolor={"#FFECE6"}
        />
      </div>

      {/* graph data */}
      <div className="mt-10 gap-3 bg-containerWhite w-full p-4 rounded-lg shadow-sm">
        <ChartOrder graphData={graphData} />
      </div>

      {/* table */}
      <div className="mt-10 gap-3 bg-containerWhite w-full p-4 rounded-lg shadow-sm">
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <div className="flex justify-between pb-5 cursor-pointer">
                <div>
                  <h2
                    className={`font-bold ${
                      status === "exchanged" ? "text-blue-500" : ""
                    }`}
                    onClick={() => handleStatusChange("exchanged")}
                  >
                    Exchange Orders
                  </h2>
                  <div
                    className={`border-b-4 border-blue-500 w-12 ${
                      status === "exchanged" ? "block" : "hidden"
                    }`}
                  />
                </div>
                <div>
                  <h2
                    className={`font-bold ${
                      status === "Pending" ? "text-blue-500" : ""
                    }`}
                    onClick={() => handleStatusChange("Pending")}
                  >
                    Pending Orders
                  </h2>
                  <div
                    className={`border-b-4 border-blue-500 w-12 ${
                      status === "Pending" ? "block" : "hidden"
                    }`}
                  />
                </div>
                <div>
                  <h2
                    className={`font-bold ${
                      status === "Delivered" ? "text-blue-500" : ""
                    }`}
                    onClick={() => handleStatusChange("Delivered")}
                  >
                    Delivered Orders
                  </h2>
                  <div
                    className={`border-b-4 border-blue-500 w-14 ${
                      status === "Delivered" ? "block" : "hidden"
                    }`}
                  />
                </div>
                <div>
                  <h2
                    className={`font-bold ${
                      status === "Returned" ? "text-blue-500" : ""
                    }`}
                    onClick={() => handleStatusChange("Returned")}
                  >
                    Return Orders
                  </h2>
                  <div
                    className={`border-b-4 border-blue-500 w-10 ${
                      status === "Returned" ? "block" : "hidden"
                    }`}
                  />
                </div>
                <div>
                  <h2
                    className={`font-bold ${
                      status === "Cancelled" ? "text-blue-500" : ""
                    }`}
                    onClick={() => handleStatusChange("Cancelled")}
                  >
                    Cancelled Orders
                  </h2>
                  <div
                    className={`border-b-4 border-blue-500 w-12 ${
                      status === "Cancelled" ? "block" : "hidden"
                    }`}
                  />
                </div>
              </div>
              <table className="table align-middle table-nowrap mb-0 w-full">
                <thead>
                  <tr>
                    <th className="text-center">
                      <div className="flex items-center justify-center font-normal">
                        <div className="mr-1 p-1">
                          <svg
                            width="16"
                            height="17"
                            viewBox="0 0 16 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15.4896 4.09025C15.3264 3.69319 15.1248 3.31042 14.89 2.95236C14.6575 2.59814 14.3902 2.26479 14.0963 1.96165C13.8019 1.6585 13.4781 1.38392 13.134 1.14448C12.7863 0.902842 12.4145 0.694705 12.0288 0.526658C11.2265 0.177383 10.3747 0 9.49667 0C8.61867 0 7.7668 0.177383 6.96454 0.526658C6.57888 0.694705 6.20709 0.902292 5.8593 1.14448C5.51525 1.38392 5.19146 1.65905 4.89702 1.96165C4.60257 2.26479 4.33586 2.59814 4.10329 2.95236C3.86859 3.31042 3.66643 3.69319 3.50373 4.09025C3.16448 4.9162 2.99219 5.79323 2.99219 6.69662C2.99219 7.60056 3.16448 8.47759 3.50373 9.30355C3.66696 9.7006 3.86859 10.0834 4.10329 10.4414C4.33586 10.7962 4.60311 11.129 4.89702 11.4321C5.19146 11.7353 5.51525 12.0099 5.8593 12.2499C6.20709 12.4915 6.57888 12.6996 6.96454 12.8677C7.7668 13.217 8.61867 13.3943 9.49667 13.3943C10.3747 13.3943 11.2265 13.217 12.0288 12.8677C12.4145 12.6996 12.7863 12.4921 13.134 12.2499C13.4781 12.0104 13.8019 11.7353 14.0963 11.4321C14.3908 11.129 14.6575 10.7957 14.89 10.4414C15.1248 10.0834 15.3269 9.7006 15.4896 9.30355C15.8289 8.47759 16.0012 7.60056 16.0012 6.69662C16.0012 5.79323 15.8289 4.9162 15.4896 4.09025ZM9.49614 12.2965C6.49674 12.2965 4.05689 9.78463 4.05689 6.69662C4.05689 3.60917 6.49674 1.0967 9.49614 1.0967C12.4955 1.0967 14.9354 3.60862 14.9354 6.69662C14.9354 9.78463 12.4955 12.2965 9.49614 12.2965Z"
                              fill="#2F4EFF"
                            />
                            <path
                              d="M3.24024 12.3618L0.156024 15.5371C-0.0520081 15.7513 -0.0520081 16.0984 0.156024 16.3126C0.260041 16.4196 0.396595 16.4729 0.532616 16.4729C0.668638 16.4729 0.805192 16.4196 0.909209 16.3126L3.99342 13.1372C4.20146 12.9231 4.20146 12.576 3.99342 12.3618C3.78593 12.1476 3.44827 12.1476 3.24024 12.3618Z"
                              fill="#2F4EFF"
                            />
                            <path
                              d="M6.4782 3.77734C6.18375 3.77734 5.94531 4.02282 5.94531 4.32597V9.13014C5.94531 9.43328 6.18375 9.67876 6.4782 9.67876C6.77264 9.67876 7.01108 9.43328 7.01108 9.13014V4.32597C7.01108 4.02282 6.77211 3.77734 6.4782 3.77734Z"
                              fill="#2F4EFF"
                            />
                            <path
                              d="M8.46648 3.77734C8.17203 3.77734 7.93359 4.02282 7.93359 4.32597V9.13014C7.93359 9.43328 8.17203 9.67876 8.46648 9.67876C8.76092 9.67876 8.99936 9.43328 8.99936 9.13014V4.32597C8.99883 4.02282 8.76039 3.77734 8.46648 3.77734Z"
                              fill="#2F4EFF"
                            />
                            <path
                              d="M12.4509 3.77734C12.1564 3.77734 11.918 4.02282 11.918 4.32597V9.13014C11.918 9.43328 12.1564 9.67876 12.4509 9.67876C12.7453 9.67876 12.9837 9.43328 12.9837 9.13014V4.32597C12.9837 4.02282 12.7453 3.77734 12.4509 3.77734Z"
                              fill="#2F4EFF"
                            />
                            <path
                              d="M10.4587 3.77734C10.1642 3.77734 9.92578 4.02282 9.92578 4.32597V9.13014C9.92578 9.43328 10.1642 9.67876 10.4587 9.67876C10.7531 9.67876 10.9915 9.43328 10.9915 9.13014V4.32597C10.9915 4.02282 10.7531 3.77734 10.4587 3.77734Z"
                              fill="#2F4EFF"
                            />
                          </svg>
                        </div>
                        Order Id
                      </div>
                    </th>
                    <th className="text-center">
                      <div className="flex items-center justify-center font-normal">
                        <div className="mr-1 p-1">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.3333 1.73961H14.2266C15.206 1.73961 16 2.51766 16 3.47405V13.922C16 14.8799 15.2066 15.6565 14.2266 15.6565H1.77341C0.793983 15.6565 0 14.8784 0 13.922V3.47405C0 2.51615 0.793442 1.73961 1.77341 1.73961H2.66667V0.42662C2.66667 0.191004 2.87283 0 3.11111 0C3.35657 0 3.55556 0.187058 3.55556 0.42662V1.73961H12.4444V0.42662C12.4444 0.191004 12.6506 0 12.8889 0C13.1343 0 13.3333 0.187058 13.3333 0.42662V1.73961ZM13.3333 2.60941V3.0526C13.3333 3.28821 13.1272 3.47922 12.8889 3.47922C12.6434 3.47922 12.4444 3.29216 12.4444 3.0526V2.60941H3.55556V3.0526C3.55556 3.28821 3.34939 3.47922 3.11111 3.47922C2.86565 3.47922 2.66667 3.29216 2.66667 3.0526V2.60941H1.77341C1.28449 2.60941 0.888889 2.9964 0.888889 3.47405V13.922C0.888889 14.3986 1.28546 14.7867 1.77341 14.7867H14.2266C14.7155 14.7867 15.1111 14.3997 15.1111 13.922V3.47405C15.1111 2.9975 14.7145 2.60941 14.2266 2.60941H13.3333ZM0.888889 4.34902H15.1111V5.21883H0.888889V4.34902ZM11.5556 7.39741C11.5556 7.15497 11.7458 6.95844 12.0042 6.95844H12.8847C13.1325 6.95844 13.3333 7.14461 13.3333 7.39741V8.25907C13.3333 8.50151 13.1431 8.69805 12.8847 8.69805H12.0042C11.7564 8.69805 11.5556 8.51188 11.5556 8.25907V7.39741ZM7.11111 7.39741C7.11111 7.15497 7.30136 6.95844 7.55972 6.95844H8.44028C8.68804 6.95844 8.88889 7.14461 8.88889 7.39741V8.25907C8.88889 8.50151 8.69864 8.69805 8.44028 8.69805H7.55972C7.31196 8.69805 7.11111 8.51188 7.11111 8.25907V7.39741ZM2.66667 7.39741C2.66667 7.15497 2.85692 6.95844 3.11528 6.95844H3.99584C4.2436 6.95844 4.44444 7.14461 4.44444 7.39741V8.25907C4.44444 8.50151 4.25419 8.69805 3.99584 8.69805H3.11528C2.86752 8.69805 2.66667 8.51188 2.66667 8.25907V7.39741ZM2.66667 11.7464C2.66667 11.504 2.85692 11.3075 3.11528 11.3075H3.99584C4.2436 11.3075 4.44444 11.4936 4.44444 11.7464V12.6081C4.44444 12.8505 4.25419 13.0471 3.99584 13.0471H3.11528C2.86752 13.0471 2.66667 12.8609 2.66667 12.6081V11.7464ZM7.11111 11.7464C7.11111 11.504 7.30136 11.3075 7.55972 11.3075H8.44028C8.68804 11.3075 8.88889 11.4936 8.88889 11.7464V12.6081C8.88889 12.8505 8.69864 13.0471 8.44028 13.0471H7.55972C7.31196 13.0471 7.11111 12.8609 7.11111 12.6081V11.7464ZM11.5556 11.7464C11.5556 11.504 11.7458 11.3075 12.0042 11.3075H12.8847C13.1325 11.3075 13.3333 11.4936 13.3333 11.7464V12.6081C13.3333 12.8505 13.1431 13.0471 12.8847 13.0471H12.0042C11.7564 13.0471 11.5556 12.8609 11.5556 12.6081V11.7464Z"
                              fill="#DB3022"
                            />
                          </svg>
                        </div>
                        Order Date
                      </div>
                    </th>
                    <th className="text-center">
                      <div className="flex items-center justify-center font-normal">
                        <div className="mr-1 p-1">
                          <svg
                            width="14"
                            height="17"
                            viewBox="0 0 14 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.8859 4.07247L7.11407 0.0315976C7.04356 -0.0105325 6.95661 -0.0105325 6.88593 0.0315976L0.114066 4.07247C0.043562 4.1146 0 4.19235 0 4.27661V12.3584C0 12.4426 0.0433871 12.5204 0.114066 12.5625L6.88593 16.6034C6.92127 16.6245 6.96064 16.635 7 16.635C7.03936 16.635 7.07873 16.6245 7.11407 16.6034L13.8859 12.5625C13.9564 12.5204 14 12.4426 14 12.3584V4.27661C14 4.19235 13.9564 4.1146 13.8859 4.07247ZM7 8.04518L5.03586 6.87313L11.3516 3.10456L13.3156 4.27661L7 8.04518ZM2.87631 6.12907L4.35164 7.00946V9.4964L2.87631 8.61601V6.12907ZM3.10444 5.72079L9.42022 1.95222L10.8956 2.83262L4.57978 6.601L3.10444 5.72079ZM7 0.507867L8.96396 1.67973L2.64836 5.44848L0.684395 4.27643L7 0.507867ZM0.456263 4.68489L2.42022 5.85694V8.75217C2.42022 8.83643 2.46361 8.91418 2.53429 8.95631L4.46571 10.1088C4.50105 10.1298 4.54041 10.1405 4.57978 10.1405C4.61914 10.1405 4.6585 10.13 4.69384 10.1088C4.76435 10.0667 4.80791 9.98895 4.80791 9.90469V7.28159L6.77204 8.45364V15.9911L0.456263 12.2222V4.68489ZM7.22813 15.9909V8.45346L13.5437 4.68489V12.2224L7.22813 15.9909Z"
                              fill="#00D67B"
                            />
                          </svg>
                        </div>
                        Total Price
                      </div>
                    </th>
                    <th className="text-center">
                      <div className="flex items-center justify-center font-normal">
                        <div className="mr-1 p-1">
                          <svg
                            width="21"
                            height="18"
                            viewBox="0 0 21 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g opacity="0.4">
                              <path
                                d="M16.6154 1.03846C16.6154 0.463846 16.1515 0 15.5769 0H10.7308H6.57692H1.03846C0.463846 0 0 0.463846 0 1.03846V16.2692C0 16.8438 0.463846 17.3077 1.03846 17.3077H11.1392C11.2846 17.7092 11.6654 18 12.1154 18H19.0385C19.6131 18 20.0769 17.5362 20.0769 16.9615V10.0385C20.0769 9.46385 19.6131 9 19.0385 9H16.6154V1.03846ZM6.92308 0.692308H10.3846V2.07692H6.92308V0.692308ZM6.92308 2.76923H10.3846V5.04692L10.2808 4.94308C10.1423 4.80462 9.92769 4.80462 9.78923 4.94308L9.34615 5.39308L8.89615 4.94308C8.83385 4.88077 8.74385 4.84615 8.65385 4.84615C8.56385 4.84615 8.47385 4.88077 8.41154 4.95L7.96154 5.39308L7.51154 4.94308C7.37308 4.80462 7.15846 4.80462 7.02 4.94308L6.91615 5.04692V2.76923H6.92308ZM11.0769 10.0385V16.6154H1.03846C0.844615 16.6154 0.692308 16.4631 0.692308 16.2692V1.03846C0.692308 0.844615 0.844615 0.692308 1.03846 0.692308H6.23077V5.88462C6.23077 6.02308 6.31385 6.14769 6.44538 6.20308C6.57692 6.25846 6.72231 6.22385 6.81923 6.12692L7.26923 5.68385L7.71923 6.13385C7.85769 6.27231 8.07231 6.27231 8.21077 6.13385L8.65385 5.68385L9.10385 6.13385C9.24231 6.27231 9.45692 6.27231 9.59539 6.13385L10.0385 5.68385L10.4885 6.13385C10.5508 6.19615 10.6408 6.23077 10.7308 6.23077C10.7723 6.23077 10.8208 6.22385 10.8623 6.20308C10.9938 6.14769 11.0769 6.02308 11.0769 5.88462V0.692308H15.5769C15.7708 0.692308 15.9231 0.844615 15.9231 1.03846V9H12.1154C11.5408 9 11.0769 9.46385 11.0769 10.0385ZM19.0385 9.69231C19.2323 9.69231 19.3846 9.84462 19.3846 10.0385V16.9615C19.3846 17.1554 19.2323 17.3077 19.0385 17.3077H12.1154C11.9215 17.3077 11.7692 17.1554 11.7692 16.9615V10.0385C11.7692 9.84462 11.9215 9.69231 12.1154 9.69231H19.0385Z"
                                fill="#FF9900"
                              />
                              <path
                                d="M14.1938 15.2309C14 15.2309 13.8477 15.3832 13.8477 15.5771C13.8477 15.7709 14 15.9232 14.1938 15.9232H15.2323V16.2694C15.2323 16.4632 15.3846 16.6155 15.5784 16.6155C15.7723 16.6155 15.9246 16.4632 15.9246 16.2694V15.9232C16.6861 15.9232 17.3092 15.3002 17.3092 14.5386C17.3092 13.7771 16.6861 13.154 15.9246 13.154V11.7694H16.963C17.1569 11.7694 17.3092 11.6171 17.3092 11.4232C17.3092 11.2294 17.1569 11.0771 16.963 11.0771H15.9246V10.7309C15.9246 10.5371 15.7723 10.3848 15.5784 10.3848C15.3846 10.3848 15.2323 10.5371 15.2323 10.7309V11.0771C14.4707 11.0771 13.8477 11.7002 13.8477 12.4617C13.8477 13.2232 14.4707 13.8463 15.2323 13.8463V15.2309H14.1938ZM15.9246 13.8463C16.3053 13.8463 16.6169 14.1578 16.6169 14.5386C16.6169 14.9194 16.3053 15.2309 15.9246 15.2309V13.8463ZM14.54 12.4617C14.54 12.0809 14.8515 11.7694 15.2323 11.7694V13.154C14.8515 13.154 14.54 12.8425 14.54 12.4617Z"
                                fill="#FF9900"
                              />
                            </g>
                          </svg>
                        </div>
                        Total Discount
                      </div>
                    </th>
                    <th className="text-center">
                      <div className="flex items-center justify-center font-normal">
                        <div className="mr-1 p-1">
                          <svg
                            width="21"
                            height="18"
                            viewBox="0 0 21 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g opacity="0.4">
                              <path
                                d="M16.6154 1.03846C16.6154 0.463846 16.1515 0 15.5769 0H10.7308H6.57692H1.03846C0.463846 0 0 0.463846 0 1.03846V16.2692C0 16.8438 0.463846 17.3077 1.03846 17.3077H11.1392C11.2846 17.7092 11.6654 18 12.1154 18H19.0385C19.6131 18 20.0769 17.5362 20.0769 16.9615V10.0385C20.0769 9.46385 19.6131 9 19.0385 9H16.6154V1.03846ZM6.92308 0.692308H10.3846V2.07692H6.92308V0.692308ZM6.92308 2.76923H10.3846V5.04692L10.2808 4.94308C10.1423 4.80462 9.92769 4.80462 9.78923 4.94308L9.34615 5.39308L8.89615 4.94308C8.83385 4.88077 8.74385 4.84615 8.65385 4.84615C8.56385 4.84615 8.47385 4.88077 8.41154 4.95L7.96154 5.39308L7.51154 4.94308C7.37308 4.80462 7.15846 4.80462 7.02 4.94308L6.91615 5.04692V2.76923H6.92308ZM11.0769 10.0385V16.6154H1.03846C0.844615 16.6154 0.692308 16.4631 0.692308 16.2692V1.03846C0.692308 0.844615 0.844615 0.692308 1.03846 0.692308H6.23077V5.88462C6.23077 6.02308 6.31385 6.14769 6.44538 6.20308C6.57692 6.25846 6.72231 6.22385 6.81923 6.12692L7.26923 5.68385L7.71923 6.13385C7.85769 6.27231 8.07231 6.27231 8.21077 6.13385L8.65385 5.68385L9.10385 6.13385C9.24231 6.27231 9.45692 6.27231 9.59539 6.13385L10.0385 5.68385L10.4885 6.13385C10.5508 6.19615 10.6408 6.23077 10.7308 6.23077C10.7723 6.23077 10.8208 6.22385 10.8623 6.20308C10.9938 6.14769 11.0769 6.02308 11.0769 5.88462V0.692308H15.5769C15.7708 0.692308 15.9231 0.844615 15.9231 1.03846V9H12.1154C11.5408 9 11.0769 9.46385 11.0769 10.0385ZM19.0385 9.69231C19.2323 9.69231 19.3846 9.84462 19.3846 10.0385V16.9615C19.3846 17.1554 19.2323 17.3077 19.0385 17.3077H12.1154C11.9215 17.3077 11.7692 17.1554 11.7692 16.9615V10.0385C11.7692 9.84462 11.9215 9.69231 12.1154 9.69231H19.0385Z"
                                fill="#FF9900"
                              />
                              <path
                                d="M14.1938 15.2309C14 15.2309 13.8477 15.3832 13.8477 15.5771C13.8477 15.7709 14 15.9232 14.1938 15.9232H15.2323V16.2694C15.2323 16.4632 15.3846 16.6155 15.5784 16.6155C15.7723 16.6155 15.9246 16.4632 15.9246 16.2694V15.9232C16.6861 15.9232 17.3092 15.3002 17.3092 14.5386C17.3092 13.7771 16.6861 13.154 15.9246 13.154V11.7694H16.963C17.1569 11.7694 17.3092 11.6171 17.3092 11.4232C17.3092 11.2294 17.1569 11.0771 16.963 11.0771H15.9246V10.7309C15.9246 10.5371 15.7723 10.3848 15.5784 10.3848C15.3846 10.3848 15.2323 10.5371 15.2323 10.7309V11.0771C14.4707 11.0771 13.8477 11.7002 13.8477 12.4617C13.8477 13.2232 14.4707 13.8463 15.2323 13.8463V15.2309H14.1938ZM15.9246 13.8463C16.3053 13.8463 16.6169 14.1578 16.6169 14.5386C16.6169 14.9194 16.3053 15.2309 15.9246 15.2309V13.8463ZM14.54 12.4617C14.54 12.0809 14.8515 11.7694 15.2323 11.7694V13.154C14.8515 13.154 14.54 12.8425 14.54 12.4617Z"
                                fill="#FF9900"
                              />
                            </g>
                          </svg>
                        </div>
                        Sub Discount
                      </div>
                    </th>
                    <th className="text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  {orderData?.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-3">
                        No data found
                      </td>
                    </tr>
                  ) : (
                    orderData?.map((order, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 cursor-pointer"
                        onClick={() => handleRowClick(order.orderId)}
                      >
                        <td className="text-sm text-center py-3">
                          {getDisplayValue(order.orderId)}
                        </td>
                        <td className="text-sm text-center py-3">
                          {getDisplayValue(order.orderDate)}
                        </td>
                        <td className="text-center text-sm py-3">
                          {getDisplayValue(
                            order.totalPrice
                              ? order.totalPrice?.toFixed(1)
                              : "0"
                          )}{" "}
                          {currency}
                        </td>
                        <td className="text-sm text-center py-3">
                          {getDisplayValue(
                            order.totalDiscount
                              ? order.totalDiscount?.toFixed(1)
                              : "0"
                          )}{" "}
                          {currency}
                        </td>
                        <td className="text-sm text-center py-3">
                          {getDisplayValue(
                            order.totalSubTotal
                              ? order.totalSubTotal?.toFixed(1)
                              : "0"
                          )}{" "}
                          {currency}
                        </td>
                      </tr>
                    ))
                  )}

                  {orderData?.length < totalCount && (
                    <tr>
                      <td colSpan="5" className="text-center">
                        <div className="flex justify-center items-center">
                          <Loading className="text-center w-100 h-106" />
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>

                {/* {orderData.length < totalCount && <p>Loading...</p>} */}
              </table>

              {isModalOpen && (
                <OrderDetailModal
                  handleCloseModal={handleCloseModal}
                  id={selectedOrder}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
