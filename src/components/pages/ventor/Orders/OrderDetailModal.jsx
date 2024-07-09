import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrderDetails } from "../../../../Api/ApiCall";

const OrderDetailModal = ({ id, handleCloseModal }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderInvoice, setOrderInvoice] = useState(null);
  // const [expanded, setExpanded] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const navigate = useNavigate();
  const modalRef = useRef(null);

  useEffect(() => {
    if (id) {
      fetchOrderDetails(id);
    }
  }, [id]);

  const fetchOrderDetails = (id) => {
    getOrderDetails(id)
      .then((data) => {
        console.log("Data in getOrderDetails:", data.data.response);
        setSelectedOrder(data.data.response);
        setOrderInvoice(data.data);
      })
      .catch((error) => {
        console.log("Error in getOrderDetails:", error);
      });
  };

  const toggleExpanded = (index) => {
    setExpandedIndex(index === expandedIndex ? -1 : index);
  };

  const handleButtonClick = () => {
    navigate("/invoice", { state: { order: orderInvoice } });
  };

  const handleProductInvoice = (product) => {
    navigate("/invoice", { state: { product: product, order: orderInvoice } });
  };

  const handleBackgroundClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleCloseModal();
    }
  };

  const formatDateMain = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    // Parse the date string
    const date = new Date(dateString);

    // Format the date according to the options
    return date.toLocaleDateString("en-US", options);
  };

  const formatShippingDate = (dateString) => {
    const date = new Date(dateString);

    // Extracting hours and minutes
    let hours = date.getHours();
    const minutes = date.getMinutes();

    // Determine if it's AM or PM
    const amOrPm = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    hours = hours % 12 || 12;

    // Adding leading zero if minutes is less than 10
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    // Extracting day, month, and year
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-indexed, so we add 1
    const year = date.getFullYear();

    // Constructing the formatted string
    const formattedDate = `${hours}:${formattedMinutes} ${amOrPm}, ${day}/${month}/${year}`;

    return formattedDate;
  };

  const getDisplayValue = (value) => {
    return value !== undefined && value !== null ? value : "N/A";
  };

  return (
    <div
      className="fixed inset-0 max-w-screen h-full flex items-center justify-center bg-gray-700 bg-opacity-10 z-30"
      onClick={handleBackgroundClick}
    >
      {selectedOrder && (
        <div ref={modalRef} className="relative bg-white rounded-lg w-auto">
          <div className="absolute top-0 left-0 w-full h-36 p-6">
            <div
              className="w-full h-full bg-cover bg-center flex text-white"
              style={{ backgroundImage: "url('/Banner.png')" }}
            >
              <div className="mr-4">
                <img
                  className="p-3 w-24 h-24"
                  src={selectedOrder[0].images[0]}
                  alt="productPicture"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-xl font-bold mb-2">
                  Order Id#{selectedOrder[0].orderId}
                </h3>
                <p>{formatDateMain(selectedOrder[0].orderDate)}</p>
              </div>
              <div className="absolute bottom-0 right-0 p-8 flex cursor-pointer">
                <svg
                  onClick={handleButtonClick}
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="30" height="30" rx="10" fill="#7976FF" />
                  <path
                    d="M10.8625 19.6807H18.8103C19.0103 19.6807 19.1728 19.8806 19.1728 20.0431V20.6347C19.1728 20.8347 19.0103 20.9972 18.8103 20.9972H10.8625C10.6625 20.9972 10.5 20.7972 10.5 20.6347V20.0431C10.5 19.8431 10.6625 19.6807 10.8625 19.6807Z"
                    fill="white"
                  />
                  <path
                    d="M14.571 18.2465C14.7127 18.3871 14.9418 18.3871 15.0834 18.2465L17.8028 15.5323C17.9069 15.4271 17.9371 15.2688 17.8788 15.1323C17.8205 14.9959 17.684 14.9095 17.5361 14.9136H15.4958V9.36245C15.4958 9.26663 15.4583 9.17393 15.3896 9.10623C15.3219 9.03854 15.2292 9 15.1334 9H14.5418C14.3418 9 14.1793 9.16248 14.1793 9.36245V14.9168H12.1286C11.9807 14.9127 11.8443 14.9991 11.7859 15.1355C11.7266 15.272 11.7568 15.4303 11.862 15.5355L14.571 18.2465Z"
                    fill="white"
                  />
                </svg>
                <span onClick={handleButtonClick} className="ml-2">
                  Download invoice
                </span>
              </div>
            </div>
          </div>
          <div className="p-6 mt-32">
            <div className="modal-overlay">
              <div className="modal">
                <div className="overflow-auto">
                  <table className="table-auto text-center w-full text-xs">
                    <thead>
                      <tr>
                        <th className="border-b border-gray-500 pb-2 pl-2 pr-2">
                          Product Name
                        </th>
                        <th className="border-b border-gray-500 pb-2 pl-2 pr-2">
                          Brand Name
                        </th>
                        <th className="border-b border-gray-500 pb-2 pl-2 pr-2">
                          Rating
                        </th>
                        <th className="border-b border-gray-500 pb-2 pl-2 pr-2">
                          Colour
                        </th>
                        <th className="border-b border-gray-500 pb-2 pl-2 pr-2">
                          Size
                        </th>
                        <th className="border-b border-gray-500 pb-2 pl-2 pr-2">
                          Quantity
                        </th>
                        <th className="border-b border-gray-500 pb-2 pl-2 pr-2">
                          Prize
                        </th>
                        <th className="border-b border-gray-500 pb-2 pl-2 pr-2">
                          Offer Prize
                        </th>
                        <th className="border-b border-gray-500 pb-2 pl-2 pr-2 text-white">
                          uhuihklkkjhj
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.map((product, index) => (
                        <React.Fragment key={index}>
                          <tr className="bg-customTrBg border-white border-t-8 w-full">
                            {/* Original Product Details */}
                            <td className="text-gray-500 pl-2 pr-2">
                              {getDisplayValue(product?.productName)}
                            </td>
                            <td className="text-gray-500 pl-2 pr-2">
                              {getDisplayValue(product?.brandName)}
                            </td>
                            <td className="text-gray-500 pl-2 pr-2 flex flex-row mt-6">
                              <svg
                                className="mr-2"
                                width="20"
                                height="19"
                                viewBox="0 0 20 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10 0L13.3267 5.42124L19.5106 6.90983L15.3827 11.7489L15.8779 18.0902L10 15.6597L4.12215 18.0902L4.61734 11.7489L0.489435 6.90983L6.67334 5.42124L10 0Z"
                                  fill="#FFC833"
                                />
                              </svg>
                              {product?.ratings?.average}
                            </td>
                            <td className="text-gray-500 pl-2 pr-2">
                              <img
                                className="p-2 ml-3 w-16 h-16"
                                src={getDisplayValue(product.images[0])}
                                alt="Product"
                              />
                            </td>
                            <td className="text-gray-500 pl-2 pr-2">
                              {getDisplayValue(product.size)}
                            </td>
                            <td className="text-gray-500 pl-2 pr-2">
                              {getDisplayValue(product.quantity)}
                            </td>
                            <td className="text-gray-500 pl-2 pr-2">
                              {getDisplayValue(product.price)}
                            </td>
                            <td className="text-gray-500 pl-2 pr-2">
                              {getDisplayValue(product.discount)}
                            </td>
                            <td
                              className="text-blue-500 font-bold pl-2 pr-2 cursor-pointer"
                              onClick={() => toggleExpanded(index)}
                            >
                              {expandedIndex === index
                                ? "Back"
                                : "View Details"}
                            </td>
                          </tr>
                          {expandedIndex === index && (
                            <tr>
                              <td colSpan="9" className="p-0">
                                <div
                                  className="flex flex-col"
                                  style={{
                                    background:
                                      "linear-gradient(180deg, #F4F5FA 0%, #E5E9FF 100%)",
                                  }}
                                >
                                  {/* Exchanged Product Details */}
                                  {product?.orderStatus === "Exchanged" && (
                                    <>
                                      <div className="font-bold text-left pl-2">
                                        Exchanged Product
                                      </div>
                                      <div className="flex justify-between p-2 items-center">
                                        <td className="text-gray-500 w-12">
                                          {getDisplayValue(
                                            product.exchangedProductName
                                          )}
                                        </td>
                                        <td className="text-gray-500 w-16">
                                          {getDisplayValue(
                                            product.exchangedBrandName
                                          )}
                                        </td>
                                        <td className="text-gray-500 flex flex-row">
                                          <svg
                                            className="mr-2"
                                            width="20"
                                            height="19"
                                            viewBox="0 0 20 19"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M10 0L13.3267 5.42124L19.5106 6.90983L15.3827 11.7489L15.8779 18.0902L10 15.6597L4.12215 18.0902L4.61734 11.7489L0.489435 6.90983L6.67334 5.42124L10 0Z"
                                              fill="#FFC833"
                                            />
                                          </svg>
                                          {getDisplayValue(
                                            product?.exchangedProductRatings
                                              ?.average
                                          )}
                                        </td>
                                        <td className="text-gray-500">
                                          <img
                                            className="p-2 w-16 h-16"
                                            src={
                                              product.exchangedProductImages[0]
                                            }
                                            alt="Product"
                                          />
                                        </td>
                                        <td className="text-gray-500 mr-5">
                                          {getDisplayValue(
                                            product.extchangeSize
                                          )}
                                        </td>
                                        <td className="text-gray-500">
                                          {getDisplayValue(
                                            product.extchangeProductQuantity
                                          )}
                                        </td>
                                        <td className="text-gray-500">
                                          {getDisplayValue(
                                            product.exchangeProductPrice
                                          )}
                                        </td>
                                        <td className="text-gray-500">
                                          {getDisplayValue(
                                            product.exchangeProductOfferPrice
                                          )}
                                        </td>
                                        <td className="text-gray-500 pl-2 pr-2">
                                          {product.shippingInfo.find(
                                            (info) =>
                                              info.status === "Exchanged"
                                          )
                                            ? new Date(
                                                product.shippingInfo.find(
                                                  (info) =>
                                                    info.status === "Exchanged"
                                                ).date
                                              ).toLocaleDateString("en-GB")
                                            : "N/A"}
                                        </td>
                                      </div>
                                    </>
                                  )}
                                  {/* Original Product Details */}
                                  <div className="flex justify-between p-2 items-center">
                                    <div className="font-bold">
                                      Order Status
                                    </div>
                                    <button
                                      onClick={() => {
                                        handleProductInvoice(product);
                                      }}
                                      className="bg-white text-black font-semibold px-4 py-2 rounded hover:bg-black hover:text-white transition duration-300"
                                    >
                                      Download Invoice
                                    </button>
                                  </div>

                                  {/* Second Row */}
                                  <div className="flex justify-between p-2 relative items-center">
                                    {/* Map through shippingInfo starting from the second element */}
                                    {selectedOrder[index]?.shippingInfo
                                      .slice(1)
                                      .map((shippingStep, stepIndex) => (
                                        <React.Fragment key={stepIndex}>
                                          <div className="flex flex-col justify-center items-center">
                                            {shippingStep.status ===
                                              "Placed" && (
                                              <svg
                                                width="50"
                                                height="50"
                                                viewBox="0 0 68 68"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <g filter="url(#filter0_d_3896_12566)">
                                                  <circle
                                                    cx="34"
                                                    cy="33"
                                                    r="30"
                                                    fill="#2F4EFF"
                                                  />
                                                </g>
                                                <path
                                                  d="M38.9452 33.7607V23.2902C39.0457 22.5711 36.5617 23.0151 36.2248 22.9C36.1436 22.6713 35.9932 22.4735 35.7945 22.3341C35.5958 22.1946 35.3587 22.1204 35.1159 22.1218C35.1196 21.976 35.0941 21.8308 35.0408 21.695C34.9876 21.5592 34.9077 21.4353 34.8059 21.3308C34.7041 21.2263 34.5824 21.1432 34.448 21.0864C34.3136 21.0296 34.1692 21.0002 34.0233 21H29.919C29.7732 21.0002 29.6289 21.0297 29.4947 21.0865C29.3604 21.1434 29.2389 21.2265 29.1373 21.3311C29.0357 21.4356 28.956 21.5594 28.903 21.6952C28.85 21.831 28.8247 21.9761 28.8286 22.1218C28.5856 22.12 28.3482 22.194 28.1493 22.3335C27.9503 22.4729 27.7999 22.671 27.7188 22.9C27.4659 22.8962 25.3902 22.9 25.3902 22.9C25.3389 22.8996 25.2879 22.9094 25.2404 22.9288C25.1928 22.9483 25.1496 22.977 25.1133 23.0133C25.077 23.0496 25.0483 23.0928 25.0288 23.1404C25.0094 23.1879 24.9996 23.2389 25 23.2902V41.528C25 41.6463 25.047 41.7597 25.1306 41.8433C25.2143 41.927 25.3277 41.9739 25.446 41.9739C27.1359 41.9686 33.073 41.9496 33.556 41.9496C34.5346 43.9264 36.8275 45 38.1645 45C41.5355 45 44.1805 42.7702 44.1805 39.374C44.179 37.9499 43.6382 36.5792 42.6668 35.5377C41.6955 34.4962 40.3657 33.8613 38.9452 33.7607ZM36.3006 23.6804H38.1647V33.7591C37.8477 33.7844 37.5331 33.8342 37.2238 33.9081V25.0112C37.2329 24.5298 36.613 24.6239 36.3006 24.621V23.6804ZM29.609 22.0906C29.6086 22.0498 29.6163 22.0092 29.6317 21.9714C29.6471 21.9336 29.6699 21.8992 29.6988 21.8704C29.7276 21.8415 29.762 21.8186 29.7998 21.8032C29.8376 21.7878 29.8781 21.78 29.919 21.7804H34.024C34.0675 21.7806 34.1104 21.7899 34.1501 21.8075C34.1898 21.8251 34.2255 21.8507 34.2548 21.8828C34.2841 21.9149 34.3065 21.9527 34.3205 21.9938C34.3345 22.0349 34.3398 22.0785 34.3362 22.1218H29.609V22.0906ZM28.8241 22.9022C32.1586 22.9022 34.7565 22.9007 34.7264 22.9022C35.027 22.8869 35.5204 22.8686 35.5202 23.2951V25.0228C35.5209 25.0758 35.5109 25.1284 35.491 25.1775C35.4711 25.2266 35.4416 25.2713 35.4042 25.3088C35.3669 25.3464 35.3224 25.3762 35.2734 25.3963C35.2244 25.4165 35.1718 25.4267 35.1188 25.4264C35.1188 25.4264 29.609 25.4264 28.8241 25.4264C28.7704 25.4257 28.7174 25.4145 28.6681 25.3932C28.6188 25.372 28.5742 25.3412 28.5369 25.3026C28.4996 25.264 28.4703 25.2184 28.4507 25.1684C28.4311 25.1184 28.4216 25.0651 28.4228 25.0114C28.4228 25.0114 28.4228 23.6035 28.4228 23.2971C28.423 23.2448 28.4336 23.193 28.454 23.1448C28.4743 23.0966 28.504 23.0529 28.5413 23.0162C28.5786 22.9795 28.6228 22.9505 28.6713 22.931C28.7199 22.9114 28.7718 22.9017 28.8241 22.9022ZM25.7804 41.1688V23.6804H27.6423V24.6214C27.5155 24.6228 27.1094 24.6214 27.1094 24.6214C27.0065 24.6231 26.9082 24.6648 26.8354 24.7376C26.7626 24.8104 26.7209 24.9087 26.7192 25.0116V39.8376C26.7192 39.9411 26.7603 40.0403 26.8335 40.1135C26.9067 40.1867 27.0059 40.2278 27.1094 40.2278H32.9932C33.0426 40.5472 33.1185 40.8619 33.2202 41.1688H25.7804ZM32.9274 39.4474H27.4996V25.4018H27.7043C27.7858 25.6347 27.937 25.8369 28.1373 25.9809C28.3376 26.1249 28.5774 26.2038 28.8241 26.2068H35.1188C35.3652 26.2035 35.6047 26.1246 35.8046 25.9806C36.0046 25.8365 36.1554 25.6345 36.2366 25.4018H36.4433V34.1576C35.3939 34.5843 34.4973 35.3172 33.8702 36.2606C33.2431 37.2041 32.9146 38.3146 32.9274 39.4474ZM43.3852 39.7468C43.3031 40.968 42.757 42.1115 41.859 42.943C40.9609 43.7745 39.7788 44.2311 38.555 44.2191C37.2704 44.2154 36.0394 43.704 35.1305 42.7963C34.2216 41.8886 33.7084 40.6583 33.7029 39.3738C33.752 36.9801 35.4243 34.5262 38.5552 34.5262C41.686 34.5262 43.5319 37.1395 43.3856 39.7468H43.3852Z"
                                                  fill="#F9FAFF"
                                                />
                                                <path
                                                  d="M40.818 36.8689L37.8586 39.8283L36.2978 38.2675C35.2855 37.3392 34.0591 38.7685 34.9287 39.6325C35.6935 40.3501 36.5696 41.2759 37.1766 41.8813C37.2666 41.9712 37.3735 42.0425 37.4912 42.0911C37.6088 42.1397 37.7349 42.1646 37.8622 42.1643C37.9894 42.1641 38.1154 42.1388 38.2329 42.0898C38.3504 42.0408 38.457 41.9691 38.5468 41.8788C39.5221 40.8986 41.2959 39.1192 42.186 38.2367C43.1147 37.3162 41.6544 35.9886 40.818 36.8689ZM41.6344 37.6848L38.283 41.0337C38.1429 41.1379 37.9304 41.5243 37.7269 41.3265L35.4826 39.082C35.3111 38.9123 35.5753 38.645 35.7455 38.8187C36.5482 39.6361 37.2214 40.2972 37.5864 40.6529C37.622 40.6893 37.6645 40.7183 37.7115 40.7382C37.7584 40.7581 37.8088 40.7685 37.8598 40.7688C37.9107 40.7691 37.9613 40.7593 38.0084 40.7399C38.0556 40.7206 38.0984 40.692 38.1345 40.656C38.6339 40.1626 39.77 39.0205 41.3701 37.4206C41.5396 37.2511 41.8094 37.5149 41.6344 37.6848Z"
                                                  fill="#F9FAFF"
                                                />
                                                <path
                                                  d="M34.8538 28.2676H29.0749C28.5702 28.2603 28.5674 29.0556 29.0749 29.0481H34.8538C35.3584 29.0556 35.3613 28.2601 34.8538 28.2676Z"
                                                  fill="#F9FAFF"
                                                />
                                                <path
                                                  d="M34.8538 30.4278H29.0749C28.5702 30.4202 28.5674 31.2156 29.0749 31.2082H34.8538C35.3584 31.2147 35.3613 30.4202 34.8538 30.4278Z"
                                                  fill="#F9FAFF"
                                                />
                                                <path
                                                  d="M34.8567 32.5879H29.0777C28.9742 32.5879 28.875 32.629 28.8018 32.7022C28.7286 32.7754 28.6875 32.8746 28.6875 32.9781C28.6875 33.0816 28.7286 33.1808 28.8018 33.254C28.875 33.3272 28.9742 33.3683 29.0777 33.3683H34.8567C34.9602 33.3683 35.0594 33.3272 35.1326 33.254C35.2058 33.1808 35.2469 33.0816 35.2469 32.9781C35.2469 32.8746 35.2058 32.7754 35.1326 32.7022C35.0594 32.629 34.9602 32.5879 34.8567 32.5879Z"
                                                  fill="#F9FAFF"
                                                />
                                                <path
                                                  d="M32.7559 34.752H29.0749C28.5697 34.7444 28.5679 35.5398 29.0749 35.5324H32.7559C33.2609 35.5398 33.2627 34.7444 32.7559 34.752Z"
                                                  fill="#F9FAFF"
                                                />
                                                <path
                                                  d="M31.5971 36.9112H29.0749C28.5694 36.9038 28.5681 37.6992 29.0749 37.6916H31.5971C32.1026 37.699 32.1039 36.9036 31.5971 36.9112Z"
                                                  fill="#F9FAFF"
                                                />
                                                <defs>
                                                  <filter
                                                    id="filter0_d_3896_12566"
                                                    x="0"
                                                    y="0"
                                                    width="68"
                                                    height="68"
                                                    filterUnits="userSpaceOnUse"
                                                    color-interpolation-filters="sRGB"
                                                  >
                                                    <feFlood
                                                      flood-opacity="0"
                                                      result="BackgroundImageFix"
                                                    />
                                                    <feColorMatrix
                                                      in="SourceAlpha"
                                                      type="matrix"
                                                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                      result="hardAlpha"
                                                    />
                                                    <feOffset dy="1" />
                                                    <feGaussianBlur stdDeviation="2" />
                                                    <feComposite
                                                      in2="hardAlpha"
                                                      operator="out"
                                                    />
                                                    <feColorMatrix
                                                      type="matrix"
                                                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
                                                    />
                                                    <feBlend
                                                      mode="normal"
                                                      in2="BackgroundImageFix"
                                                      result="effect1_dropShadow_3896_12566"
                                                    />
                                                    <feBlend
                                                      mode="normal"
                                                      in="SourceGraphic"
                                                      in2="effect1_dropShadow_3896_12566"
                                                      result="shape"
                                                    />
                                                  </filter>
                                                </defs>
                                              </svg>
                                            )}
                                            {shippingStep.status ===
                                              "Packed" && (
                                              <svg
                                                width="50"
                                                height="50"
                                                viewBox="0 0 68 68"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <g filter="url(#filter0_d_3896_12550)">
                                                  <circle
                                                    cx="34"
                                                    cy="33"
                                                    r="30"
                                                    fill="#2F4EFF"
                                                  />
                                                </g>
                                                <path
                                                  d="M44.2695 38.9195L46.3553 37.6475"
                                                  stroke="white"
                                                  stroke-width="0.8"
                                                />
                                                <path
                                                  d="M46.2239 37.3211L46.2239 21.0361H45.6797"
                                                  stroke="white"
                                                  stroke-width="0.8"
                                                  stroke-linecap="square"
                                                />
                                                <path
                                                  d="M46.2266 37.5781V37.8637"
                                                  stroke="white"
                                                  stroke-width="0.8"
                                                />
                                                <path
                                                  d="M45.6842 21.0361H37.9617M34.8315 21.0361H29.6562"
                                                  stroke="white"
                                                  stroke-width="0.8"
                                                  stroke-linecap="square"
                                                />
                                                <path
                                                  d="M22 25.585L29.1672 21.2144L29.5231 21"
                                                  stroke="white"
                                                  stroke-width="0.8"
                                                />
                                                <path
                                                  d="M38.543 25.7001L46.3408 21.2002"
                                                  stroke="white"
                                                  stroke-width="0.8"
                                                />
                                                <path
                                                  d="M46.2266 37.5938V37.8794"
                                                  stroke="white"
                                                  stroke-width="0.8"
                                                />
                                                <path
                                                  d="M27.5923 25.6221H22.1328V42.1944H33.4533M38.7045 33.3664V25.6221H31.7765H30.6318H30.8854"
                                                  stroke="white"
                                                  stroke-width="0.8"
                                                  stroke-linecap="square"
                                                />
                                                <path
                                                  d="M36.6445 38.8091L37.5901 40.1996L40.5379 38.1973"
                                                  stroke="white"
                                                  stroke-width="0.8"
                                                />
                                                <path
                                                  d="M35.6239 36.5366C35.2477 40.1649 36.6493 41.6741 38.4674 42.5945C41.2378 41.2993 41.7973 39.1282 41.4699 36.5189C40.2734 36.9384 39.277 36.7401 38.5028 36.0244C37.9138 36.5828 37.0573 36.9165 35.6239 36.5366Z"
                                                  stroke="white"
                                                  stroke-width="0.8"
                                                />
                                                <path
                                                  d="M27.7461 25.5048L35.046 21.0342H38.0028L30.6272 25.5037V31.6316L29.1661 29.9801L27.7461 31.6316V25.5048Z"
                                                  stroke="white"
                                                  stroke-width="0.8"
                                                />
                                                <path
                                                  d="M38.5571 45C41.719 45 44.2822 42.4368 44.2822 39.2749C44.2822 36.113 41.719 33.5498 38.5571 33.5498C35.3952 33.5498 32.832 36.113 32.832 39.2749C32.832 42.4368 35.3952 45 38.5571 45Z"
                                                  stroke="white"
                                                  stroke-width="0.8"
                                                  stroke-linecap="round"
                                                  stroke-linejoin="round"
                                                />
                                                <defs>
                                                  <filter
                                                    id="filter0_d_3896_12550"
                                                    x="0"
                                                    y="0"
                                                    width="68"
                                                    height="68"
                                                    filterUnits="userSpaceOnUse"
                                                    color-interpolation-filters="sRGB"
                                                  >
                                                    <feFlood
                                                      flood-opacity="0"
                                                      result="BackgroundImageFix"
                                                    />
                                                    <feColorMatrix
                                                      in="SourceAlpha"
                                                      type="matrix"
                                                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                      result="hardAlpha"
                                                    />
                                                    <feOffset dy="1" />
                                                    <feGaussianBlur stdDeviation="2" />
                                                    <feComposite
                                                      in2="hardAlpha"
                                                      operator="out"
                                                    />
                                                    <feColorMatrix
                                                      type="matrix"
                                                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
                                                    />
                                                    <feBlend
                                                      mode="normal"
                                                      in2="BackgroundImageFix"
                                                      result="effect1_dropShadow_3896_12550"
                                                    />
                                                    <feBlend
                                                      mode="normal"
                                                      in="SourceGraphic"
                                                      in2="effect1_dropShadow_3896_12550"
                                                      result="shape"
                                                    />
                                                  </filter>
                                                </defs>
                                              </svg>
                                            )}
                                            {shippingStep.status ===
                                              "Picked" && (
                                              <svg
                                                width="50"
                                                height="50"
                                                viewBox="0 0 68 68"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <g filter="url(#filter0_d_3896_12556)">
                                                  <circle
                                                    cx="34"
                                                    cy="33"
                                                    r="30"
                                                    fill="#2F4EFF"
                                                  />
                                                </g>
                                                <path
                                                  d="M45.8333 32.3975H44.8012L44.0307 24.5529H45.3743C45.4827 24.5529 45.5866 24.5099 45.6632 24.4333C45.7399 24.3566 45.7829 24.2527 45.7829 24.1444V21.4086C45.7829 21.3002 45.7399 21.1963 45.6632 21.1197C45.5866 21.043 45.4827 21 45.3743 21H22.4086C22.3002 21 22.1963 21.043 22.1197 21.1197C22.043 21.1963 22 21.3002 22 21.4086V24.1433C22 24.2516 22.043 24.3556 22.1197 24.4322C22.1963 24.5088 22.3002 24.5518 22.4086 24.5518H23.752L22.0019 42.3546C22.0006 42.3679 22 42.3811 22 42.3944V44.5909C22 44.6992 22.043 44.8032 22.1197 44.8798C22.1963 44.9564 22.3002 44.9995 22.4086 44.9995H28.1501C28.2584 44.9995 28.3624 44.9564 28.439 44.8798C28.5156 44.8032 28.5587 44.6992 28.5587 44.5909C28.5587 44.4825 28.5156 44.3786 28.439 44.302C28.3624 44.2254 28.2584 44.1823 28.1501 44.1823H22.8171V42.4143L24.5732 24.5518H26.3998C26.5081 24.5518 26.612 24.5088 26.6887 24.4322C26.7653 24.3556 26.8083 24.2516 26.8083 24.1433C26.8083 24.0349 26.7653 23.931 26.6887 23.8544C26.612 23.7777 26.5081 23.7347 26.3998 23.7347H22.8171V21.8171H44.9658V23.7347H28.9288C28.8205 23.7347 28.7165 23.7777 28.6399 23.8544C28.5633 23.931 28.5202 24.0349 28.5202 24.1433C28.5202 24.2516 28.5633 24.3556 28.6399 24.4322C28.7165 24.5088 28.8205 24.5518 28.9288 24.5518H43.2095L43.98 32.3964H43.2751V30.4004C43.2751 30.292 43.2321 30.1881 43.1554 30.1115C43.0788 30.0349 42.9749 29.9918 42.8665 29.9918H41.0122L40.7207 26.4697C40.7105 26.3622 40.6587 26.2629 40.5763 26.1931C40.4939 26.1234 40.3874 26.0886 40.2797 26.0962C40.2263 26.1007 40.1742 26.1156 40.1265 26.1402C40.0788 26.1647 40.0364 26.1984 40.0017 26.2394C39.967 26.2803 39.9407 26.3277 39.9244 26.3788C39.908 26.4299 39.9019 26.4837 39.9063 26.5372L40.1923 29.9918H30.3918C30.2834 29.9918 30.1795 30.0349 30.1029 30.1115C30.0262 30.1881 29.9832 30.292 29.9832 30.4004V44.5914C29.9832 44.6998 30.0262 44.8037 30.1029 44.8803C30.1795 44.957 30.2834 45 30.3918 45H34.0436H34.0488H45.8333C45.9417 45 46.0456 44.957 46.1222 44.8803C46.1988 44.8037 46.2419 44.6998 46.2419 44.5914V32.8061C46.2419 32.6977 46.1988 32.5938 46.1222 32.5172C46.0456 32.4405 45.9417 32.3975 45.8333 32.3975ZM45.4247 44.1823H45.3792H45.3738H34.4573V33.2146H37.9166V36.6564C37.9166 36.7648 37.9596 36.8687 38.0362 36.9453C38.1128 37.022 38.2168 37.065 38.3251 37.065H41.5569C41.6653 37.065 41.7692 37.022 41.8458 36.9453C41.9224 36.8687 41.9655 36.7648 41.9655 36.6564V33.2146H45.4247V44.1823ZM38.7342 33.2146H41.1484V36.2479H38.7342V33.2146ZM42.458 32.3975H38.6517V30.809H42.458V32.3975ZM37.8346 30.809V32.3975H35.4205V30.809H37.8346ZM30.8003 30.809H34.6033V32.3975H34.0488C33.9404 32.3975 33.8365 32.4405 33.7599 32.5172C33.6832 32.5938 33.6402 32.6977 33.6402 32.8061V44.1818H30.8003V30.809Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M27.0574 26.4706L26.3764 34.6993C26.3719 34.7528 26.3781 34.8066 26.3944 34.8578C26.4107 34.9089 26.437 34.9563 26.4717 34.9973C26.5064 35.0383 26.5488 35.072 26.5965 35.0966C26.6443 35.1212 26.6964 35.1361 26.7499 35.1405C26.7613 35.1405 26.7727 35.1405 26.7842 35.1405C26.8866 35.1404 26.9852 35.1018 27.0606 35.0324C27.1359 34.963 27.1824 34.8678 27.1908 34.7657L27.8718 26.5371C27.8808 26.4291 27.8464 26.322 27.7764 26.2393C27.7064 26.1566 27.6064 26.1051 27.4984 26.0961C27.3904 26.0872 27.2832 26.1215 27.2005 26.1915C27.1178 26.2615 27.0663 26.3616 27.0574 26.4696V26.4706Z"
                                                  fill="#2F4EFF"
                                                />
                                                <path
                                                  d="M34.3054 28.473V26.3441C34.3054 26.2358 34.2624 26.1318 34.1858 26.0552C34.1091 25.9786 34.0052 25.9355 33.8969 25.9355C33.7885 25.9355 33.6846 25.9786 33.6079 26.0552C33.5313 26.1318 33.4883 26.2358 33.4883 26.3441V28.473C33.4883 28.5814 33.5313 28.6853 33.6079 28.7619C33.6846 28.8386 33.7885 28.8816 33.8969 28.8816C34.0052 28.8816 34.1091 28.8386 34.1858 28.7619C34.2624 28.6853 34.3054 28.5814 34.3054 28.473Z"
                                                  fill="#2F4EFF"
                                                />
                                                <defs>
                                                  <filter
                                                    id="filter0_d_3896_12556"
                                                    x="0"
                                                    y="0"
                                                    width="68"
                                                    height="68"
                                                    filterUnits="userSpaceOnUse"
                                                    color-interpolation-filters="sRGB"
                                                  >
                                                    <feFlood
                                                      flood-opacity="0"
                                                      result="BackgroundImageFix"
                                                    />
                                                    <feColorMatrix
                                                      in="SourceAlpha"
                                                      type="matrix"
                                                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                      result="hardAlpha"
                                                    />
                                                    <feOffset dy="1" />
                                                    <feGaussianBlur stdDeviation="2" />
                                                    <feComposite
                                                      in2="hardAlpha"
                                                      operator="out"
                                                    />
                                                    <feColorMatrix
                                                      type="matrix"
                                                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
                                                    />
                                                    <feBlend
                                                      mode="normal"
                                                      in2="BackgroundImageFix"
                                                      result="effect1_dropShadow_3896_12556"
                                                    />
                                                    <feBlend
                                                      mode="normal"
                                                      in="SourceGraphic"
                                                      in2="effect1_dropShadow_3896_12556"
                                                      result="shape"
                                                    />
                                                  </filter>
                                                </defs>
                                              </svg>
                                            )}
                                            {shippingStep.status ===
                                              "Delivered" && (
                                              <svg
                                                width="50"
                                                height="50"
                                                viewBox="0 0 68 68"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <g filter="url(#filter0_d_3896_12527)">
                                                  <circle
                                                    cx="34"
                                                    cy="33"
                                                    r="30"
                                                    fill="#2F4EFF"
                                                  />
                                                </g>
                                                <mask
                                                  id="path-2-inside-1_3896_12527"
                                                  fill="white"
                                                >
                                                  <path d="M45.3402 26.491C45.3402 26.4171 45.3218 26.3433 45.2975 26.2752C45.2918 26.2567 45.2848 26.2383 45.2733 26.2198C45.2491 26.1644 45.2121 26.1148 45.1752 26.0721C45.1695 26.0664 45.1625 26.0537 45.1568 26.0479C45.1141 26.0052 45.0645 25.9683 45.0091 25.9429L35.5813 21.0692C35.4025 20.9769 35.1936 20.9769 35.0148 21.0692L25.587 25.9429C25.384 26.0479 25.2547 26.2567 25.2547 26.491C25.2547 26.5279 25.2605 26.5648 25.2674 26.6017V32.6073C25.2674 32.9453 25.5444 33.2223 25.8824 33.2223C26.2205 33.2223 26.4974 32.9453 26.4974 32.6073V27.5062L34.6757 31.7336V41.8998L32.3738 40.7056C32.4292 40.4044 32.4604 40.0906 32.4604 39.7698C32.4604 36.8842 30.1158 34.5396 27.2302 34.5396C24.3445 34.5396 22 36.8842 22 39.7698C22 42.6555 24.3445 45 27.2302 45C29.3532 45 31.1867 43.7262 32.0058 41.8986L34.9538 43.4251C34.9538 43.4251 34.9665 43.4378 34.9722 43.4378C35.0276 43.4747 35.0957 43.4931 35.1569 43.5116C35.1753 43.5116 35.1938 43.5116 35.2122 43.5174C35.2365 43.5174 35.2676 43.5301 35.2918 43.5301C35.323 43.5301 35.3472 43.5243 35.3784 43.5174C35.3968 43.5174 35.4095 43.5174 35.428 43.5116C35.5018 43.4931 35.563 43.4689 35.6253 43.4251L44.9907 38.5697C45.1938 38.4647 45.323 38.2559 45.323 38.0216L45.3219 26.4905L45.3402 26.491ZM27.2358 43.7703C25.0332 43.7703 23.2356 41.9739 23.2356 39.7701C23.2356 37.5675 25.0321 35.7698 27.2358 35.7698C29.4385 35.7698 31.2361 37.5663 31.2361 39.7701C31.2361 41.9727 29.4396 43.7703 27.2358 43.7703ZM35.2975 22.3073L43.3893 26.4921L41.722 27.3598L33.6362 23.1749L35.2976 22.313L35.2975 22.3073ZM32.2941 23.858L40.38 28.0429L38.6389 28.9474L30.553 24.7567L32.2941 23.8521V23.858ZM39.2422 30.0239L41.1068 29.0582V32.4491L39.2422 33.4148V30.0239ZM29.211 25.4515L37.291 29.6423L35.303 30.6704L27.2112 26.4855L29.211 25.4515ZM35.9125 41.9059V31.7398L38.0112 30.6563V34.4283C38.0112 34.644 38.122 34.8402 38.3066 34.9509C38.4047 35.0121 38.5155 35.0432 38.6262 35.0432C38.7243 35.0432 38.8235 35.019 38.9089 34.9752L42.0044 33.3691C42.2075 33.2641 42.3367 33.0552 42.3367 32.821V28.4214L44.109 27.5041V37.6635L35.9123 41.9095L35.9125 41.9059Z" />
                                                </mask>
                                                <path
                                                  d="M45.3402 26.491C45.3402 26.4171 45.3218 26.3433 45.2975 26.2752C45.2918 26.2567 45.2848 26.2383 45.2733 26.2198C45.2491 26.1644 45.2121 26.1148 45.1752 26.0721C45.1695 26.0664 45.1625 26.0537 45.1568 26.0479C45.1141 26.0052 45.0645 25.9683 45.0091 25.9429L35.5813 21.0692C35.4025 20.9769 35.1936 20.9769 35.0148 21.0692L25.587 25.9429C25.384 26.0479 25.2547 26.2567 25.2547 26.491C25.2547 26.5279 25.2605 26.5648 25.2674 26.6017V32.6073C25.2674 32.9453 25.5444 33.2223 25.8824 33.2223C26.2205 33.2223 26.4974 32.9453 26.4974 32.6073V27.5062L34.6757 31.7336V41.8998L32.3738 40.7056C32.4292 40.4044 32.4604 40.0906 32.4604 39.7698C32.4604 36.8842 30.1158 34.5396 27.2302 34.5396C24.3445 34.5396 22 36.8842 22 39.7698C22 42.6555 24.3445 45 27.2302 45C29.3532 45 31.1867 43.7262 32.0058 41.8986L34.9538 43.4251C34.9538 43.4251 34.9665 43.4378 34.9722 43.4378C35.0276 43.4747 35.0957 43.4931 35.1569 43.5116C35.1753 43.5116 35.1938 43.5116 35.2122 43.5174C35.2365 43.5174 35.2676 43.5301 35.2918 43.5301C35.323 43.5301 35.3472 43.5243 35.3784 43.5174C35.3968 43.5174 35.4095 43.5174 35.428 43.5116C35.5018 43.4931 35.563 43.4689 35.6253 43.4251L44.9907 38.5697C45.1938 38.4647 45.323 38.2559 45.323 38.0216L45.3219 26.4905L45.3402 26.491ZM27.2358 43.7703C25.0332 43.7703 23.2356 41.9739 23.2356 39.7701C23.2356 37.5675 25.0321 35.7698 27.2358 35.7698C29.4385 35.7698 31.2361 37.5663 31.2361 39.7701C31.2361 41.9727 29.4396 43.7703 27.2358 43.7703ZM35.2975 22.3073L43.3893 26.4921L41.722 27.3598L33.6362 23.1749L35.2976 22.313L35.2975 22.3073ZM32.2941 23.858L40.38 28.0429L38.6389 28.9474L30.553 24.7567L32.2941 23.8521V23.858ZM39.2422 30.0239L41.1068 29.0582V32.4491L39.2422 33.4148V30.0239ZM29.211 25.4515L37.291 29.6423L35.303 30.6704L27.2112 26.4855L29.211 25.4515ZM35.9125 41.9059V31.7398L38.0112 30.6563V34.4283C38.0112 34.644 38.122 34.8402 38.3066 34.9509C38.4047 35.0121 38.5155 35.0432 38.6262 35.0432C38.7243 35.0432 38.8235 35.019 38.9089 34.9752L42.0044 33.3691C42.2075 33.2641 42.3367 33.0552 42.3367 32.821V28.4214L44.109 27.5041V37.6635L35.9123 41.9095L35.9125 41.9059Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M45.3402 26.491L45.3355 26.6909L45.5402 26.6958V26.491H45.3402ZM45.2975 26.2752L45.1065 26.3349L45.1091 26.3423L45.2975 26.2752ZM45.2733 26.2198L45.0901 26.3L45.0959 26.3134L45.1037 26.3258L45.2733 26.2198ZM45.1752 26.0721L45.3265 25.9413L45.3218 25.9358L45.3166 25.9307L45.1752 26.0721ZM45.1568 26.0479L45.0153 26.1893L45.0153 26.1893L45.1568 26.0479ZM45.0091 25.9429L44.9171 26.1208L44.9257 26.1247L45.0091 25.9429ZM35.5813 21.0692L35.6732 20.8916L35.6731 20.8915L35.5813 21.0692ZM35.0148 21.0692L34.9231 20.8915L34.923 20.8916L35.0148 21.0692ZM25.587 25.9429L25.4952 25.7652L25.4952 25.7652L25.587 25.9429ZM25.2674 26.6017H25.4674V26.5831L25.464 26.5649L25.2674 26.6017ZM26.4974 27.5062L26.5892 27.3285L26.2974 27.1777V27.5062H26.4974ZM34.6757 31.7336H34.8757V31.6118L34.7675 31.5559L34.6757 31.7336ZM34.6757 41.8998L34.5836 42.0773L34.8757 42.2288V41.8998H34.6757ZM32.3738 40.7056L32.1771 40.6694L32.1504 40.8149L32.2817 40.8831L32.3738 40.7056ZM32.0058 41.8986L32.0978 41.721L31.9098 41.6237L31.8233 41.8168L32.0058 41.8986ZM34.9538 43.4251L35.0952 43.2836L35.0733 43.2617L35.0457 43.2475L34.9538 43.4251ZM34.9722 43.4378L35.0832 43.2713L35.0328 43.2378H34.9722V43.4378ZM35.1569 43.5116L35.0991 43.7031L35.1273 43.7116H35.1569V43.5116ZM35.2122 43.5174L35.1526 43.7083L35.1817 43.7174H35.2122V43.5174ZM35.3784 43.5174V43.3174H35.3564L35.335 43.3221L35.3784 43.5174ZM35.428 43.5116L35.3794 43.3172L35.3683 43.3207L35.428 43.5116ZM35.6253 43.4251L35.5332 43.2475L35.5212 43.2537L35.5102 43.2615L35.6253 43.4251ZM44.9907 38.5697L44.8989 38.392L44.8987 38.3921L44.9907 38.5697ZM45.323 38.0216L45.523 38.0216L45.523 38.0216L45.323 38.0216ZM45.3219 26.4905L45.3266 26.2906L45.1218 26.2857L45.1219 26.4905L45.3219 26.4905ZM35.2975 22.3073L35.3894 22.1296L35.0888 21.9742L35.0976 22.3124L35.2975 22.3073ZM43.3893 26.4921L43.4816 26.6696L43.8236 26.4916L43.4811 26.3145L43.3893 26.4921ZM41.722 27.3598L41.6301 27.5374L41.7223 27.5851L41.8144 27.5372L41.722 27.3598ZM33.6362 23.1749L33.5441 22.9974L33.2014 23.1751L33.5442 23.3526L33.6362 23.1749ZM35.2976 22.313L35.3897 22.4906L35.5008 22.433L35.4976 22.3079L35.2976 22.313ZM32.2941 23.858H32.0941V23.9797L32.2022 24.0356L32.2941 23.858ZM40.38 28.0429L40.4722 28.2203L40.8145 28.0425L40.4719 27.8652L40.38 28.0429ZM38.6389 28.9474L38.5469 29.125L38.639 29.1728L38.7311 29.1249L38.6389 28.9474ZM30.553 24.7567L30.4608 24.5792L30.1188 24.7569L30.461 24.9342L30.553 24.7567ZM32.2941 23.8521H32.4941V23.5228L32.2019 23.6746L32.2941 23.8521ZM39.2422 30.0239L39.1502 29.8463L39.0422 29.9023V30.0239H39.2422ZM41.1068 29.0582H41.3068V28.7294L41.0148 28.8806L41.1068 29.0582ZM41.1068 32.4491L41.1987 32.6267L41.3068 32.5707V32.4491H41.1068ZM39.2422 33.4148H39.0422V33.7436L39.3342 33.5924L39.2422 33.4148ZM29.211 25.4515L29.3031 25.274L29.2112 25.2263L29.1192 25.2739L29.211 25.4515ZM37.291 29.6423L37.3828 29.82L37.7259 29.6426L37.3831 29.4648L37.291 29.6423ZM35.303 30.6704L35.2111 30.848L35.303 30.8955L35.3948 30.848L35.303 30.6704ZM27.2112 26.4855L27.1193 26.3078L26.7758 26.4855L27.1193 26.6631L27.2112 26.4855ZM35.9125 41.9059L36.1125 41.9137V41.9059H35.9125ZM35.9125 31.7398L35.8207 31.562L35.7125 31.6179V31.7398H35.9125ZM38.0112 30.6563H38.2112V30.328L37.9195 30.4786L38.0112 30.6563ZM38.3066 34.9509L38.4125 34.7812L38.4095 34.7794L38.3066 34.9509ZM38.9089 34.9752L39.0003 35.1531L39.001 35.1527L38.9089 34.9752ZM42.0044 33.3691L41.9126 33.1914L41.9123 33.1915L42.0044 33.3691ZM42.3367 28.4214L42.2448 28.2438L42.1367 28.2997V28.4214H42.3367ZM44.109 27.5041H44.309V27.1754L44.017 27.3265L44.109 27.5041ZM44.109 37.6635L44.201 37.8411L44.309 37.7851V37.6635H44.109ZM35.9123 41.9095L35.7125 41.9018L35.6992 42.2451L36.0043 42.0871L35.9123 41.9095ZM45.5402 26.491C45.5402 26.3853 45.5141 26.2873 45.4859 26.2081L45.1091 26.3423C45.1294 26.3993 45.1402 26.4489 45.1402 26.491H45.5402ZM45.4884 26.2155C45.4804 26.1899 45.4674 26.1531 45.4429 26.1138L45.1037 26.3258C45.1022 26.3235 45.1031 26.3236 45.1066 26.3349L45.4884 26.2155ZM45.4565 26.1397C45.4207 26.0578 45.3692 25.9906 45.3265 25.9413L45.024 26.203C45.0551 26.239 45.0774 26.2711 45.0901 26.3L45.4565 26.1397ZM45.3166 25.9307C45.3216 25.9356 45.3251 25.9398 45.3272 25.9422C45.3293 25.9448 45.3307 25.9467 45.3314 25.9476C45.3323 25.9489 45.3328 25.9497 45.3308 25.9467C45.3297 25.9451 45.326 25.9397 45.3219 25.9342C45.3197 25.9312 45.3167 25.9273 45.3131 25.9229C45.3096 25.9187 45.3046 25.9128 45.2982 25.9065L45.0153 26.1893C45.0104 26.1844 45.0069 26.1802 45.0048 26.1778C45.0027 26.1752 45.0013 26.1733 45.0006 26.1724C44.9996 26.1711 44.9992 26.1704 45.0012 26.1733C45.0023 26.175 45.006 26.1803 45.0101 26.1858C45.0123 26.1888 45.0153 26.1927 45.0189 26.1971C45.0224 26.2014 45.0274 26.2072 45.0338 26.2135L45.3166 25.9307ZM45.2982 25.9065C45.2419 25.8502 45.1732 25.7981 45.0924 25.7611L44.9257 26.1247C44.9558 26.1385 44.9863 26.1602 45.0153 26.1893L45.2982 25.9065ZM45.1009 25.7652L35.6732 20.8916L35.4895 21.2469L44.9172 26.1206L45.1009 25.7652ZM35.6731 20.8915C35.4367 20.7695 35.1595 20.7695 34.9231 20.8915L35.1065 21.247C35.2278 21.1843 35.3683 21.1843 35.4896 21.247L35.6731 20.8915ZM34.923 20.8916L25.4952 25.7652L25.6789 26.1206L35.1066 21.2469L34.923 20.8916ZM25.4952 25.7652C25.2259 25.9045 25.0547 26.1817 25.0547 26.491H25.4547C25.4547 26.3318 25.542 26.1913 25.6789 26.1206L25.4952 25.7652ZM25.0547 26.491C25.0547 26.5473 25.0635 26.5993 25.0709 26.6386L25.464 26.5649C25.4575 26.5303 25.4547 26.5085 25.4547 26.491H25.0547ZM25.0674 26.6017V32.6073H25.4674V26.6017H25.0674ZM25.0674 32.6073C25.0674 33.0558 25.4339 33.4223 25.8824 33.4223V33.0223C25.6548 33.0223 25.4674 32.8349 25.4674 32.6073H25.0674ZM25.8824 33.4223C26.3309 33.4223 26.6974 33.0558 26.6974 32.6073H26.2974C26.2974 32.8349 26.11 33.0223 25.8824 33.0223V33.4223ZM26.6974 32.6073V27.5062H26.2974V32.6073H26.6974ZM26.4055 27.6838L34.5839 31.9112L34.7675 31.5559L26.5892 27.3285L26.4055 27.6838ZM34.4757 31.7336V41.8998H34.8757V31.7336H34.4757ZM34.7678 41.7222L32.4659 40.528L32.2817 40.8831L34.5836 42.0773L34.7678 41.7222ZM32.5705 40.7417C32.628 40.4295 32.6604 40.1035 32.6604 39.7698H32.2604C32.2604 40.0777 32.2305 40.3794 32.1771 40.6694L32.5705 40.7417ZM32.6604 39.7698C32.6604 36.7737 30.2263 34.3396 27.2302 34.3396V34.7396C30.0054 34.7396 32.2604 36.9946 32.2604 39.7698H32.6604ZM27.2302 34.3396C24.2341 34.3396 21.8 36.7737 21.8 39.7698H22.2C22.2 36.9946 24.455 34.7396 27.2302 34.7396V34.3396ZM21.8 39.7698C21.8 42.7659 24.2341 45.2 27.2302 45.2V44.8C24.455 44.8 22.2 42.545 22.2 39.7698H21.8ZM27.2302 45.2C29.4352 45.2 31.3383 43.877 32.1883 41.9804L31.8233 41.8168C31.0351 43.5754 29.2712 44.8 27.2302 44.8V45.2ZM31.9138 42.0762L34.8618 43.6027L35.0457 43.2475L32.0978 41.721L31.9138 42.0762ZM34.9538 43.4251C34.8124 43.5665 34.8124 43.5665 34.8124 43.5665C34.8124 43.5665 34.8124 43.5665 34.8124 43.5666C34.8124 43.5666 34.8125 43.5666 34.8125 43.5666C34.8125 43.5667 34.8126 43.5667 34.8126 43.5668C34.8127 43.5668 34.8128 43.5669 34.8129 43.567C34.8131 43.5672 34.8133 43.5675 34.8136 43.5677C34.814 43.5682 34.8146 43.5687 34.8152 43.5693C34.8164 43.5704 34.8179 43.5719 34.8197 43.5735C34.823 43.5766 34.8282 43.5813 34.8345 43.5865C34.84 43.591 34.8507 43.5994 34.8647 43.6077C34.8695 43.6106 34.9122 43.6378 34.9722 43.6378V43.2378C35.0056 43.2378 35.0306 43.2463 35.0418 43.2506C35.0546 43.2556 35.0641 43.2609 35.0691 43.2639C35.0791 43.2698 35.0856 43.275 35.0872 43.2764C35.0896 43.2784 35.0913 43.2798 35.092 43.2806C35.0925 43.281 35.093 43.2815 35.0935 43.282C35.0937 43.2822 35.094 43.2825 35.0943 43.2827C35.0944 43.2829 35.0946 43.283 35.0947 43.2832C35.0948 43.2832 35.0949 43.2833 35.095 43.2834C35.095 43.2834 35.095 43.2835 35.0951 43.2835C35.0951 43.2835 35.0951 43.2836 35.0951 43.2836C35.0952 43.2836 35.0952 43.2836 35.0952 43.2836C35.0952 43.2836 35.0952 43.2836 34.9538 43.4251ZM34.8613 43.6042C34.9471 43.6614 35.0494 43.6881 35.0991 43.7031L35.2147 43.3201C35.142 43.2982 35.1081 43.288 35.0832 43.2713L34.8613 43.6042ZM35.1569 43.7116C35.1618 43.7116 35.1645 43.7116 35.1668 43.7117C35.1689 43.7117 35.1694 43.7118 35.169 43.7117C35.1679 43.7116 35.1616 43.7111 35.1526 43.7083L35.2719 43.3265C35.2198 43.3102 35.171 43.3116 35.1569 43.3116V43.7116ZM35.2122 43.7174C35.2067 43.7174 35.2025 43.717 35.2002 43.7168C35.1989 43.7166 35.198 43.7165 35.1975 43.7164C35.1969 43.7163 35.1966 43.7163 35.1966 43.7163C35.1965 43.7163 35.1968 43.7163 35.1972 43.7164C35.1977 43.7165 35.1984 43.7167 35.1994 43.7169C35.2014 43.7173 35.2037 43.7178 35.2074 43.7187C35.2133 43.72 35.2252 43.7228 35.2377 43.725C35.2501 43.7272 35.2694 43.7301 35.2918 43.7301V43.3301C35.2974 43.3301 35.3016 43.3304 35.3039 43.3307C35.3051 43.3308 35.3061 43.3309 35.3066 43.331C35.3072 43.3311 35.3075 43.3312 35.3075 43.3312C35.3075 43.3312 35.3073 43.3311 35.3068 43.331C35.3063 43.3309 35.3057 43.3308 35.3047 43.3306C35.3027 43.3301 35.3004 43.3296 35.2967 43.3288C35.2908 43.3274 35.2789 43.3246 35.2664 43.3224C35.2539 43.3202 35.2347 43.3174 35.2122 43.3174V43.7174ZM35.2918 43.7301C35.3488 43.7301 35.3947 43.7186 35.4218 43.7126L35.335 43.3221C35.2998 43.33 35.2972 43.3301 35.2918 43.3301V43.7301ZM35.3784 43.7174C35.3981 43.7174 35.4376 43.7181 35.4877 43.7025L35.3683 43.3207C35.3701 43.3202 35.3727 43.3194 35.376 43.3188C35.3793 43.3181 35.3824 43.3177 35.3847 43.3175C35.3869 43.3173 35.388 43.3173 35.3869 43.3173C35.3854 43.3174 35.3835 43.3174 35.3784 43.3174V43.7174ZM35.4765 43.7056C35.5675 43.6829 35.6529 43.6502 35.7404 43.5886L35.5102 43.2615C35.473 43.2877 35.4362 43.3034 35.3795 43.3176L35.4765 43.7056ZM35.7173 43.6026L45.0828 38.7473L44.8987 38.3921L35.5332 43.2475L35.7173 43.6026ZM45.0826 38.7474C45.3519 38.6081 45.523 38.3309 45.523 38.0216H45.123C45.123 38.1809 45.0357 38.3213 44.8989 38.392L45.0826 38.7474ZM45.523 38.0216L45.5219 26.4905L45.1219 26.4905L45.123 38.0217L45.523 38.0216ZM45.3171 26.6905L45.3355 26.6909L45.345 26.291L45.3266 26.2906L45.3171 26.6905ZM27.2358 43.5703C25.1437 43.5703 23.4356 41.8634 23.4356 39.7701H23.0356C23.0356 42.0844 24.9228 43.9703 27.2358 43.9703V43.5703ZM23.4356 39.7701C23.4356 37.6779 25.1426 35.9698 27.2358 35.9698V35.5698C24.9216 35.5698 23.0356 37.4571 23.0356 39.7701H23.4356ZM27.2358 35.9698C29.328 35.9698 31.0361 37.6768 31.0361 39.7701H31.4361C31.4361 37.4558 29.5489 35.5698 27.2358 35.5698V35.9698ZM31.0361 39.7701C31.0361 41.8623 29.3291 43.5703 27.2358 43.5703V43.9703C29.5501 43.9703 31.4361 42.0831 31.4361 39.7701H31.0361ZM35.2056 22.4849L43.2974 26.6698L43.4811 26.3145L35.3894 22.1296L35.2056 22.4849ZM43.2969 26.3147L41.6297 27.1824L41.8144 27.5372L43.4816 26.6696L43.2969 26.3147ZM41.814 27.1822L33.7281 22.9973L33.5442 23.3526L41.6301 27.5374L41.814 27.1822ZM33.7283 23.3525L35.3897 22.4906L35.2055 22.1355L33.5441 22.9974L33.7283 23.3525ZM35.4976 22.3079L35.4974 22.3021L35.0976 22.3124L35.0977 22.3182L35.4976 22.3079ZM32.2022 24.0356L40.2881 28.2205L40.4719 27.8652L32.3861 23.6804L32.2022 24.0356ZM40.2878 27.8654L38.5467 28.77L38.7311 29.1249L40.4722 28.2203L40.2878 27.8654ZM38.7309 28.7699L30.6451 24.5791L30.461 24.9342L38.5469 29.125L38.7309 28.7699ZM30.6453 24.9341L32.3863 24.0296L32.2019 23.6746L30.4608 24.5792L30.6453 24.9341ZM32.0941 23.8521V23.858H32.4941V23.8521H32.0941ZM39.3342 30.2015L41.1987 29.2358L41.0148 28.8806L39.1502 29.8463L39.3342 30.2015ZM40.9068 29.0582V32.4491H41.3068V29.0582H40.9068ZM41.0148 32.2715L39.1502 33.2372L39.3342 33.5924L41.1987 32.6267L41.0148 32.2715ZM39.4422 33.4148V30.0239H39.0422V33.4148H39.4422ZM29.1189 25.6291L37.1989 29.8198L37.3831 29.4648L29.3031 25.274L29.1189 25.6291ZM37.1991 29.4647L35.2111 30.4927L35.3948 30.848L37.3828 29.82L37.1991 29.4647ZM35.3948 30.4927L27.3031 26.3078L27.1193 26.6631L35.2111 30.848L35.3948 30.4927ZM27.303 26.6632L29.3029 25.6292L29.1192 25.2739L27.1193 26.3078L27.303 26.6632ZM36.1125 41.9059V31.7398H35.7125V41.9059H36.1125ZM36.0042 31.9175L38.103 30.834L37.9195 30.4786L35.8207 31.562L36.0042 31.9175ZM37.8112 30.6563V34.4283H38.2112V30.6563H37.8112ZM37.8112 34.4283C37.8112 34.714 37.9586 34.9754 38.2037 35.1224L38.4095 34.7794C38.2854 34.7049 38.2112 34.574 38.2112 34.4283H37.8112ZM38.2008 35.1206C38.3305 35.2015 38.4779 35.2432 38.6262 35.2432V34.8432C38.553 34.8432 38.4789 34.8227 38.4124 34.7812L38.2008 35.1206ZM38.6262 35.2432C38.756 35.2432 38.8866 35.2114 39.0003 35.1531L38.8175 34.7972C38.7604 34.8266 38.6925 34.8432 38.6262 34.8432V35.2432ZM39.001 35.1527L42.0965 33.5466L41.9123 33.1915L38.8168 34.7976L39.001 35.1527ZM42.0963 33.5467C42.3656 33.4075 42.5367 33.1302 42.5367 32.821H42.1367C42.1367 32.9802 42.0494 33.1206 41.9126 33.1914L42.0963 33.5467ZM42.5367 32.821V28.4214H42.1367V32.821H42.5367ZM42.4286 28.599L44.2009 27.6817L44.017 27.3265L42.2448 28.2438L42.4286 28.599ZM43.909 27.5041V37.6635H44.309V27.5041H43.909ZM44.017 37.4859L35.8203 41.7319L36.0043 42.0871L44.201 37.8411L44.017 37.4859ZM36.1122 41.9172L36.1123 41.9137L35.7126 41.8982L35.7125 41.9018L36.1122 41.9172Z"
                                                  fill="#2F4EFF"
                                                  mask="url(#path-2-inside-1_3896_12527)"
                                                />
                                                <path
                                                  d="M26.8551 40.2893L26.9324 40.3672L27.0028 40.283L28.8488 38.0735C28.8488 38.0735 28.8488 38.0735 28.8488 38.0735C29.0344 37.8522 29.3534 37.8254 29.576 38.0067C29.7975 38.1928 29.823 38.5172 29.6426 38.7333L29.6426 38.7333L27.3667 41.4649C27.2674 41.5795 27.1335 41.6459 26.9924 41.6511H26.9699C26.8319 41.6511 26.7024 41.5947 26.6035 41.4959C26.6034 41.4959 26.6034 41.4958 26.6033 41.4958L25.4095 40.2904L25.4095 40.2904L25.4083 40.2892C25.2038 40.0895 25.2071 39.7658 25.4091 39.5638L25.4091 39.5638L25.41 39.563C25.6096 39.3585 25.9332 39.3618 26.1352 39.5637C26.1353 39.5637 26.1353 39.5638 26.1354 39.5638L26.8551 40.2893Z"
                                                  fill="white"
                                                  stroke="#2F4EFF"
                                                  stroke-width="0.2"
                                                />
                                                <defs>
                                                  <filter
                                                    id="filter0_d_3896_12527"
                                                    x="0"
                                                    y="0"
                                                    width="68"
                                                    height="68"
                                                    filterUnits="userSpaceOnUse"
                                                    color-interpolation-filters="sRGB"
                                                  >
                                                    <feFlood
                                                      flood-opacity="0"
                                                      result="BackgroundImageFix"
                                                    />
                                                    <feColorMatrix
                                                      in="SourceAlpha"
                                                      type="matrix"
                                                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                      result="hardAlpha"
                                                    />
                                                    <feOffset dy="1" />
                                                    <feGaussianBlur stdDeviation="2" />
                                                    <feComposite
                                                      in2="hardAlpha"
                                                      operator="out"
                                                    />
                                                    <feColorMatrix
                                                      type="matrix"
                                                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
                                                    />
                                                    <feBlend
                                                      mode="normal"
                                                      in2="BackgroundImageFix"
                                                      result="effect1_dropShadow_3896_12527"
                                                    />
                                                    <feBlend
                                                      mode="normal"
                                                      in="SourceGraphic"
                                                      in2="effect1_dropShadow_3896_12527"
                                                      result="shape"
                                                    />
                                                  </filter>
                                                </defs>
                                              </svg>
                                            )}
                                            {shippingStep.status ===
                                              "Shipped" && (
                                              <svg
                                                width="50"
                                                height="50"
                                                viewBox="0 0 68 68"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <g filter="url(#filter0_d_3896_12533)">
                                                  <circle
                                                    cx="34"
                                                    cy="33"
                                                    r="30"
                                                    fill="#2F4EFF"
                                                  />
                                                </g>
                                                <path
                                                  d="M39.0566 25.7651V25.8651H39.1566H43.6065C44.3111 25.8651 44.9574 26.221 45.3363 26.8173C45.3364 26.8173 45.3364 26.8174 45.3365 26.8175L49.3588 33.2096C49.3589 33.2097 49.3589 33.2098 49.359 33.2099C49.5722 33.5528 49.6838 33.9423 49.6838 34.3396V39.0664C49.6838 39.7712 49.1182 40.3421 48.4261 40.3421H46.9707H46.8874L46.8724 40.424C46.6144 41.8302 45.382 42.9 43.9028 42.9C42.4235 42.9 41.1911 41.8302 40.9331 40.424L40.9181 40.3421H40.8348H28.4081H28.3248L28.3097 40.424C28.0518 41.8302 26.8193 42.9 25.3401 42.9C23.8609 42.9 22.6284 41.8302 22.3705 40.424L22.3555 40.3421H22.2722H19.3577C18.6656 40.3421 18.1 39.7712 18.1 39.0664V23.3757C18.1 22.6709 18.6656 22.1 19.3577 22.1H37.7989C38.491 22.1 39.0566 22.6709 39.0566 23.3757V25.7651ZM38.0214 39.4069H38.1214V39.3069V23.3757C38.1214 23.1933 37.9861 23.0351 37.7989 23.0351H19.3577C19.1705 23.0351 19.0351 23.1933 19.0351 23.3757V39.0664C19.0351 39.2488 19.1705 39.4069 19.3577 39.4069H22.2734H22.3565L22.3717 39.3252C22.6326 37.9227 23.8635 36.8568 25.3401 36.8568C26.8167 36.8568 28.0477 37.9227 28.3086 39.3252L28.3238 39.4069H28.4069H38.0214ZM45.7455 29.2231L45.7161 29.1764H45.6609H42.7005C42.5162 29.1764 42.3791 29.3352 42.3791 29.5147V32.5111C42.3791 32.6914 42.514 32.8555 42.7005 32.8555H47.8502H48.0313L47.9349 32.7023L45.7455 29.2231ZM46.8712 39.3252L46.8864 39.4069H46.9695H48.4261C48.6133 39.4069 48.7486 39.2488 48.7486 39.0664V34.3396C48.7486 34.1626 48.7004 33.9998 48.6315 33.8491L48.6048 33.7906H48.5406H42.7005C42.0094 33.7906 41.444 33.2179 41.444 32.5111V29.5147C41.444 28.8116 42.009 28.2413 42.7005 28.2413H44.9466H45.1277L45.0312 28.088L44.5461 27.317L44.5459 27.3167C44.341 26.9941 43.9891 26.8003 43.6065 26.8003H39.1566H39.0566V26.9003V39.3069V39.4069H39.1566H40.836H40.9191L40.9343 39.3252C41.1952 37.9227 42.4261 36.8568 43.9027 36.8568C45.3793 36.8568 46.6103 37.9227 46.8712 39.3252ZM23.2536 39.8784C23.2536 41.0288 24.1897 41.9649 25.3401 41.9649C26.4906 41.9649 27.4266 41.0288 27.4266 39.8784C27.4266 38.7279 26.4906 37.7919 25.3401 37.7919C24.1897 37.7919 23.2536 38.7279 23.2536 39.8784ZM41.8163 39.8784C41.8163 41.0288 42.7523 41.9649 43.9027 41.9649C45.0532 41.9649 45.9892 41.0288 45.9892 39.8784C45.9892 38.7279 45.0532 37.7919 43.9027 37.7919C42.7523 37.7919 41.8163 38.7279 41.8163 39.8784Z"
                                                  fill="white"
                                                  stroke="#2F4EFF"
                                                  stroke-width="0.2"
                                                />
                                                <path
                                                  d="M26.3367 32.8404L26.2751 32.723L24.2631 28.8852L24.263 28.8851C24.1437 28.6563 23.8615 28.5686 23.6317 28.688C23.403 28.8082 23.315 29.0908 23.4348 29.3189L23.4348 29.3189L25.7962 33.824C25.7962 33.824 25.7962 33.824 25.7963 33.824C25.8646 33.9542 25.9897 34.0445 26.1343 34.0683L26.1359 34.0685L26.1359 34.0685C26.1597 34.0728 26.1844 34.0747 26.2104 34.0747C26.3296 34.0747 26.4456 34.029 26.5332 33.9455C26.5333 33.9455 26.5333 33.9455 26.5333 33.9454L33.6181 27.1879L33.6182 27.1879C33.8049 27.0098 33.8119 26.7135 33.6337 26.5268L26.3367 32.8404ZM26.3367 32.8404L26.4327 32.7489M26.3367 32.8404L26.4327 32.7489M26.4327 32.7489L32.9724 26.5113M26.4327 32.7489L32.9724 26.5113M32.9724 26.5113C33.1592 26.3336 33.4552 26.34 33.6337 26.5267L32.9724 26.5113Z"
                                                  fill="white"
                                                  stroke="#2F4EFF"
                                                  stroke-width="0.2"
                                                />
                                                <path
                                                  d="M42.7785 34.5111H44.3645C44.6228 34.5111 44.8321 34.7202 44.8321 34.9787C44.8321 35.2372 44.6228 35.4463 44.3645 35.4463H42.7785C42.5203 35.4463 42.3109 35.2372 42.3109 34.9787C42.3109 34.7202 42.5203 34.5111 42.7785 34.5111Z"
                                                  fill="white"
                                                  stroke="#2F4EFF"
                                                  stroke-width="0.2"
                                                />
                                                <defs>
                                                  <filter
                                                    id="filter0_d_3896_12533"
                                                    x="0"
                                                    y="0"
                                                    width="68"
                                                    height="68"
                                                    filterUnits="userSpaceOnUse"
                                                    color-interpolation-filters="sRGB"
                                                  >
                                                    <feFlood
                                                      flood-opacity="0"
                                                      result="BackgroundImageFix"
                                                    />
                                                    <feColorMatrix
                                                      in="SourceAlpha"
                                                      type="matrix"
                                                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                      result="hardAlpha"
                                                    />
                                                    <feOffset dy="1" />
                                                    <feGaussianBlur stdDeviation="2" />
                                                    <feComposite
                                                      in2="hardAlpha"
                                                      operator="out"
                                                    />
                                                    <feColorMatrix
                                                      type="matrix"
                                                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
                                                    />
                                                    <feBlend
                                                      mode="normal"
                                                      in2="BackgroundImageFix"
                                                      result="effect1_dropShadow_3896_12533"
                                                    />
                                                    <feBlend
                                                      mode="normal"
                                                      in="SourceGraphic"
                                                      in2="effect1_dropShadow_3896_12533"
                                                      result="shape"
                                                    />
                                                  </filter>
                                                </defs>
                                              </svg>
                                            )}
                                            {shippingStep.status ===
                                              "Exchanged" && (
                                              <svg
                                                width="50"
                                                height="50"
                                                viewBox="0 0 68 68"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <g filter="url(#filter0_d_3896_12573)">
                                                  <circle
                                                    cx="34"
                                                    cy="33"
                                                    r="30"
                                                    fill="#DB3022"
                                                  />
                                                </g>
                                                <path
                                                  d="M39.9825 32.7245C39.9548 32.7245 39.8992 32.7245 39.8715 32.6967L34.2065 30.6973C34.0677 30.6418 33.9844 30.5307 33.9844 30.3919V26.9485C33.9844 26.7818 34.1232 26.6152 34.3176 26.6152C34.4842 26.6152 34.6508 26.7541 34.6508 26.9485V30.1975L40.0936 32.1136C40.2602 32.1691 40.3435 32.3635 40.288 32.5301C40.2325 32.6412 40.1214 32.7245 39.9825 32.7245Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M39.9797 25.4492C39.952 25.4492 39.8964 25.4492 39.8686 25.4214L34.2037 23.422C34.0371 23.3665 33.9538 23.1721 34.0093 23.0055C34.0649 22.8388 34.2592 22.7555 34.4259 22.8111L40.0908 24.8105C40.2574 24.866 40.3407 25.0604 40.2852 25.227C40.2297 25.3659 40.1186 25.4492 39.9797 25.4492Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M39.9817 32.7245C39.9261 32.7245 39.8428 32.6967 39.7873 32.6689C39.704 32.6134 39.6484 32.5023 39.6484 32.419V27.0873C39.6484 26.9207 39.7873 26.7541 39.9817 26.7541C40.1761 26.7541 40.3149 26.8929 40.3149 27.0873V31.9469L45.3411 30.1697V26.9485C45.3411 26.7818 45.48 26.6152 45.6744 26.6152C45.8688 26.6152 46.0076 26.7541 46.0076 26.9485V30.4196C46.0076 30.5585 45.9243 30.6696 45.7855 30.7251L40.1205 32.7245C40.065 32.7245 40.0094 32.7245 39.9817 32.7245Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M39.9808 25.4487C39.842 25.4487 39.7309 25.3654 39.6753 25.2266C39.6198 25.06 39.7031 24.8656 39.8697 24.81L45.5347 22.8384C45.7013 22.7829 45.8957 22.8662 45.9512 23.0328C46.0067 23.1994 45.9234 23.3938 45.7568 23.4493L40.0919 25.4487C40.0641 25.4487 40.0086 25.4487 39.9808 25.4487Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M41.9264 27.3367C41.8431 27.3367 41.7598 27.3089 41.7042 27.2534L39.7604 25.365C39.6215 25.254 39.6215 25.0318 39.7604 24.9207C39.8715 24.7819 40.0936 24.7819 40.2047 24.9207L41.9819 26.6702L46.8693 24.8652L45.4531 23.449L39.8992 21.644C39.7326 21.5884 39.6493 21.4218 39.6771 21.2274C39.7326 21.0608 39.8992 20.9775 40.0936 21.0053L45.7586 22.838C45.8141 22.8658 45.8419 22.8936 45.8974 22.9213L47.7024 24.7264C47.7857 24.8097 47.8135 24.9207 47.7857 25.0318C47.7579 25.1429 47.6746 25.2262 47.5913 25.254L42.0375 27.3089C41.9819 27.3367 41.9542 27.3367 41.9264 27.3367Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M38.0631 27.3322C38.0353 27.3322 37.9798 27.3322 37.952 27.3045L32.3982 25.2495C32.2871 25.2218 32.2315 25.1107 32.2038 25.0274C32.176 24.9163 32.2038 24.8052 32.2871 24.7219L34.0921 22.9169C34.1199 22.8892 34.1754 22.8614 34.2309 22.8336L39.8959 21.0286C40.0625 20.9731 40.2569 21.0564 40.3124 21.2508C40.368 21.4174 40.2846 21.6118 40.0903 21.6673L34.5086 23.4445L33.0924 24.8608L37.9798 26.6658L39.757 24.9163C39.8959 24.8052 40.0903 24.8052 40.2013 24.9163C40.3124 25.0552 40.3124 25.2495 40.2013 25.3606L38.2575 27.2489C38.2019 27.3045 38.1464 27.3322 38.0631 27.3322Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M26.1238 45.22C26.0683 45.22 25.985 45.1922 25.9572 45.1645C25.8739 45.1089 25.8184 44.9978 25.8184 44.8868V38.4165C25.8184 38.2777 25.9017 38.1666 26.0127 38.1111L31.8165 35.7507C31.9276 35.7229 32.0387 35.7229 32.122 35.7784C32.2053 35.834 32.2608 35.945 32.2608 36.0561V42.5264C32.2608 42.6652 32.1775 42.7763 32.0665 42.8318L26.2627 45.1922C26.2071 45.1922 26.1794 45.22 26.1238 45.22ZM26.4571 38.6109V44.3869L31.6221 42.2765V36.5282L26.4571 38.6109Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M26.1288 45.2193C26.101 45.2193 26.0455 45.2193 26.0177 45.1916L20.2139 42.8312C20.1028 42.7756 20.0195 42.6646 20.0195 42.5257V36.0555C20.0195 35.9444 20.0751 35.8611 20.1584 35.7778C20.2417 35.7222 20.3528 35.6945 20.4638 35.75L26.2676 38.1104C26.4342 38.1659 26.5176 38.3603 26.4342 38.5269C26.3787 38.6935 26.1843 38.7769 26.0177 38.6935L20.6582 36.5275V42.3036L26.2399 44.5806C26.4065 44.6362 26.4898 44.8306 26.4065 44.9972C26.3787 45.136 26.2676 45.2193 26.1288 45.2193Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M31.9258 36.3601C31.8981 36.3601 31.8425 36.3601 31.8148 36.3324L26.1221 34.1664L20.4571 36.3601C20.2905 36.4157 20.0961 36.3324 20.0406 36.1657C19.985 35.9991 20.0683 35.8047 20.235 35.7492L26.0387 33.5277C26.1221 33.4999 26.2054 33.4999 26.2609 33.5277L32.0647 35.7492C32.2313 35.8047 32.3146 35.9991 32.2591 36.1657C32.1758 36.3046 32.0647 36.3601 31.9258 36.3601Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M34.398 44.6392C33.4816 44.6392 32.8429 44.5282 32.7874 44.5004C32.6208 44.4726 32.5097 44.306 32.5375 44.1116C32.5652 43.945 32.7318 43.8339 32.9262 43.8617C32.954 43.8617 36.7862 44.5559 39.6742 42.3344C41.618 40.8348 42.7288 38.3911 42.9787 35.031C42.9787 34.8644 43.1453 34.7256 43.312 34.7256C43.4786 34.7256 43.6174 34.8922 43.6174 35.0588C43.3675 38.6133 42.1734 41.2236 40.0629 42.8342C38.1191 44.3338 35.8698 44.6392 34.398 44.6392Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M44.7592 35.4735C44.6759 35.4735 44.5648 35.418 44.5093 35.3624L43.454 33.974L42.0656 35.0292C41.9267 35.1403 41.7324 35.1125 41.6213 34.9737C41.5102 34.8348 41.538 34.6404 41.6768 34.5294L43.3152 33.252C43.3707 33.1964 43.4818 33.1687 43.5651 33.1964C43.6484 33.1964 43.7317 33.252 43.7873 33.3075L45.0647 34.9459C45.1757 35.0848 45.148 35.2791 45.0091 35.3902C44.8981 35.4458 44.8425 35.4735 44.7592 35.4735Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M21.8235 31.5836C21.6291 31.5836 21.4902 31.417 21.4902 31.2504C21.7402 27.6959 22.9342 25.0856 25.0447 23.475C28.1826 21.0868 32.1259 21.8088 32.2925 21.8366C32.4591 21.8643 32.5702 22.031 32.5424 22.2253C32.5147 22.392 32.348 22.503 32.1537 22.4753C32.1259 22.4753 28.2937 21.781 25.4057 24.0026C23.4619 25.5021 22.3511 27.9458 22.1012 31.3059C22.1289 31.4448 21.9901 31.5836 21.8235 31.5836Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M21.5959 33.1402H21.5681C21.4848 33.1402 21.4015 33.0847 21.3459 33.0292L20.0685 31.3908C19.9575 31.2519 19.9852 31.0575 20.1241 30.9465C20.2629 30.8354 20.4573 30.8632 20.5684 31.002L21.6236 32.3905L23.0121 31.3352C23.1509 31.2242 23.3453 31.2519 23.4564 31.3908C23.5675 31.5296 23.5397 31.724 23.4009 31.8351L21.7625 33.1125C21.7347 33.1125 21.6792 33.1402 21.5959 33.1402Z"
                                                  fill="white"
                                                />
                                                <defs>
                                                  <filter
                                                    id="filter0_d_3896_12573"
                                                    x="0"
                                                    y="0"
                                                    width="68"
                                                    height="68"
                                                    filterUnits="userSpaceOnUse"
                                                    color-interpolation-filters="sRGB"
                                                  >
                                                    <feFlood
                                                      flood-opacity="0"
                                                      result="BackgroundImageFix"
                                                    />
                                                    <feColorMatrix
                                                      in="SourceAlpha"
                                                      type="matrix"
                                                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                      result="hardAlpha"
                                                    />
                                                    <feOffset dy="1" />
                                                    <feGaussianBlur stdDeviation="2" />
                                                    <feComposite
                                                      in2="hardAlpha"
                                                      operator="out"
                                                    />
                                                    <feColorMatrix
                                                      type="matrix"
                                                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
                                                    />
                                                    <feBlend
                                                      mode="normal"
                                                      in2="BackgroundImageFix"
                                                      result="effect1_dropShadow_3896_12573"
                                                    />
                                                    <feBlend
                                                      mode="normal"
                                                      in="SourceGraphic"
                                                      in2="effect1_dropShadow_3896_12573"
                                                      result="shape"
                                                    />
                                                  </filter>
                                                </defs>
                                              </svg>
                                            )}
                                            {shippingStep.status ===
                                              "Cancelled" && (
                                              <svg
                                                width="50"
                                                height="50"
                                                viewBox="0 0 68 68"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <g filter="url(#filter0_d_3896_12571)">
                                                  <circle
                                                    cx="34"
                                                    cy="33"
                                                    r="30"
                                                    fill="#DB3022"
                                                  />
                                                </g>
                                                <path
                                                  d="M44.337 37.5732V37.615L44.3667 37.6444C44.8194 38.091 45.1658 38.6337 45.3802 39.2324C45.5946 39.831 45.6716 40.4703 45.6054 41.1027C45.5392 41.7352 45.3316 42.3446 44.9979 42.8859C44.6642 43.4272 44.2129 43.8865 43.6776 44.2297C43.1423 44.5729 42.5366 44.7912 41.9054 44.8685C41.2742 44.9459 40.6337 44.8802 40.0314 44.6763C39.429 44.4725 38.8803 44.1357 38.4258 43.691C37.9712 43.2463 37.6226 42.705 37.4057 42.1072L37.3686 42.0047L37.2697 42.0506L33.8755 43.6252L33.8754 43.6251L33.8721 43.6268C33.8581 43.634 33.8435 43.6397 33.8284 43.644H33.818H33.8061L33.7946 43.6468C33.7395 43.66 33.6821 43.66 33.6271 43.6468L33.6155 43.644H33.6036H33.5933C33.5782 43.6397 33.5636 43.634 33.5496 43.6268L33.5496 43.6268L33.5464 43.6253L23.3383 38.8683L23.338 38.8682C23.2671 38.8354 23.207 38.783 23.1649 38.7172C23.1227 38.6514 23.1002 38.575 23.1 38.4969V26.6147C23.1099 26.5845 23.1231 26.5556 23.1394 26.5283L23.1566 26.4996L23.153 26.4663C23.1529 26.4656 23.1529 26.4649 23.1528 26.4642C23.1601 26.4426 23.1695 26.4218 23.181 26.4021L23.1811 26.4021L23.1834 26.3976C23.1845 26.3955 23.1858 26.3934 23.1872 26.3915L23.1875 26.3917L23.1921 26.3843C23.2094 26.3565 23.2301 26.331 23.2537 26.3085L23.2711 26.2932C23.2867 26.2807 23.3028 26.2689 23.3195 26.258H23.3324L23.3535 26.2474L33.5616 21.1434L33.5616 21.1434C33.6186 21.1149 33.6815 21.1 33.7453 21.1C33.809 21.1 33.8719 21.1149 33.9289 21.1434L33.929 21.1434L44.1336 26.2457L44.1558 26.2591L44.1796 26.2733H44.19C44.2066 26.2862 44.2225 26.2999 44.2376 26.3144L44.2376 26.3145L44.2404 26.317L44.2598 26.3342C44.2794 26.3556 44.2965 26.3791 44.3106 26.4044C44.3219 26.4263 44.331 26.4493 44.3378 26.473C44.3379 26.4763 44.3377 26.4796 44.3374 26.4829L44.337 26.4828V26.4923V26.4925V26.4926V26.4928V26.493V26.4931V26.4933V26.4935V26.4936V26.4938V26.494V26.4942V26.4943V26.4945V26.4947V26.4948V26.495V26.4952V26.4954V26.4955V26.4957V26.4959V26.4961V26.4962V26.4964V26.4966V26.4968V26.4969V26.4971V26.4973V26.4975V26.4977V26.4978V26.498V26.4982V26.4984V26.4986V26.4987V26.4989V26.4991V26.4993V26.4995V26.4997V26.4998V26.5V26.5002V26.5004V26.5006V26.5008V26.5009V26.5011V26.5013V26.5015V26.5017V26.5019V26.5021V26.5023V26.5025V26.5026V26.5028V26.503V26.5032V26.5034V26.5036V26.5038V26.504V26.5042V26.5044V26.5046V26.5048V26.5049V26.5051V26.5053V26.5055V26.5057V26.5059V26.5061V26.5063V26.5065V26.5067V26.5069V26.5071V26.5073V26.5075V26.5077V26.5079V26.5081V26.5083V26.5085V26.5087V26.5089V26.5091V26.5093V26.5095V26.5097V26.5099V26.5101V26.5103V26.5105V26.5107V26.5109V26.5111V26.5113V26.5115V26.5117V26.5119V26.5121V26.5123V26.5125V26.5127V26.5129V26.5131V26.5133V26.5135V26.5137V26.514V26.5142V26.5144V26.5146V26.5148V26.515V26.5152V26.5154V26.5156V26.5158V26.516V26.5162V26.5164V26.5166V26.5168V26.5171V26.5173V26.5175V26.5177V26.5179V26.5181V26.5183V26.5185V26.5187V26.5189V26.5191V26.5193V26.5196V26.5198V26.52V26.5202V26.5204V26.5206V26.5208V26.521V26.5212V26.5214V26.5217V26.5219V26.5221V26.5223V26.5225V26.5227V26.5229V26.5231V26.5233V26.5235V26.5238V26.524V26.5242V26.5244V26.5246V26.5248V26.525V26.5252V26.5254V26.5257V26.5259V26.5261V26.5263V26.5265V26.5267V26.5269V26.5271V26.5273V26.5276V26.5278V26.528V26.5282V26.5284V26.5286V26.5288V26.529V26.5292V26.5295V26.5297V26.5299V26.5301V26.5303V26.5305V26.5307V26.5309V26.5311V26.5314V26.5316V26.5318V26.532V26.5322V26.5324V26.5326V26.5328V26.533V26.5332V26.5335V26.5337V26.5339V26.5341V26.5343V26.5345V26.5347V26.5349V26.5351V26.5353V26.5355V26.5358V26.536V26.5362V26.5364V26.5366V26.5368V26.537V26.5372V26.5374V26.5376V26.5378V26.538V26.5382V26.5384V26.5387V26.5389V26.5391V26.5393V26.5395V26.5397V26.5399V26.5401V26.5403V26.5405V26.5407V26.5409V26.5411V26.5413V26.5415V26.5417V26.5419V26.5421V26.5423V26.5425V26.5427V26.543V26.5432V26.5434V26.5436V26.5438V26.544V26.5442V26.5444V26.5446V26.5448V26.545V26.5452V26.5454V26.5456V26.5458V26.546V26.5462V26.5464V26.5466V26.5468V26.5469V26.5471V26.5473V26.5475V26.5477V26.5479V26.5481V26.5483V26.5485V26.5487V26.5489V26.5491V26.5493V26.5495V26.5497V26.5499V26.5501V26.5503V26.5504V26.5506V26.5508V26.551V26.5512V26.5514V26.5516V26.5518V26.552V26.5522V26.5523V26.5525V26.5527V26.5529V26.5531V26.5533V26.5535V26.5537V26.5538V26.554V26.5542V26.5544V26.5546V26.5548V26.5549V26.5551V26.5553V26.5555V26.5557V26.5558V26.556V26.5562V26.5564V26.5566V26.5567V26.5569V26.5571V26.5573V26.5575V26.5576V26.5578V26.558V26.5582V26.5583V26.5585V26.5587V26.5589V26.559V26.5592V26.5594V26.5595V26.5597V26.5599V26.56V26.5602V26.5604V26.5606V26.5607V26.5609V26.5611V26.5612V26.5614V26.5616V26.5617V26.5619V26.562V26.5622V26.5624V26.5625V26.5627V26.5629V26.563V26.5632V26.5633V26.5635V26.5636V26.5638V26.564V26.5641V26.5643V26.5644V26.5646V26.5647V26.5649V26.565V26.5652V26.5653V26.5655V26.5656V26.5658V26.5659V26.5661V26.5662V26.5664V26.5665V26.5667V26.5668V26.567V26.5671V26.5673V26.5674V26.5675V26.5677V26.5678V26.568V26.5681V26.5682V26.5684V26.5685V26.5687V26.5688V26.5689V26.5691V26.5692V26.5693V26.5695V26.5696V26.5697V26.5699V26.57V26.5701V26.5703V26.5704V26.5705V26.5706V26.5708V26.5709V26.571V26.5711V26.5713V26.5714V26.5715V26.5716V26.5717V26.5719V26.572V26.5721V26.5722V26.5723V26.5725V26.5726V26.5727V26.5728V26.5729V26.573V26.5731V26.5732V26.5734V26.5735V26.5736V26.5737V26.5738V26.5739V26.574V26.5741V26.5742V26.5743V26.5744V26.5745V26.5746V26.5747V26.5748V26.5749V26.575V26.5751V26.5752V26.5753V26.5754V26.5755V26.5756V26.5757V26.5758V26.5758V26.5759V26.576V26.5761V26.5762V26.5763V26.5764V26.5764V26.5765V26.5766V26.5767V26.5768V26.5768V26.5769V26.577V26.5771V26.5772V26.5772V26.5773V26.5774V26.5774V26.5775V26.5776V26.5777V26.5777V26.5778V26.5779V26.5779V26.578V26.5781V26.5781V26.5782V26.5782V26.5783V26.5784V26.5784V26.5785V26.5785V26.5786V26.5786V26.5787V26.5787V26.5788V26.5788V26.5789V26.5789V26.579V26.579V26.5791V26.5791V26.5792V26.5792V26.5793V26.5793V26.5794V26.5794V26.5794V26.5795V26.5795V26.5796V26.5796V26.5797V26.5797V26.5798V26.5798V26.5799V26.5799V26.58V26.58V26.58V26.5801V26.5801V26.5802V26.5802V26.5803V26.5803V26.5804V26.5804V26.5805V26.5805V26.5806V26.5806V26.5807V26.5807V26.5808V26.5808V26.5809V26.5809V26.581V26.581V26.5811V26.5811V26.5812V26.5812V26.5813V26.5813V26.5814V26.5814V26.5815V26.5815V26.5816V26.5816V26.5817V26.5817V26.5818V26.5818V26.5819V26.5819V26.582V26.582V26.5821V26.5821V26.5822V26.5822V26.5823V26.5823V26.5824V26.5824V26.5825V26.5825V26.5826V26.5826V26.5827V26.5827V26.5828V26.5828V26.5829V26.5829V26.583V26.583V26.5831V26.5831V26.5832V26.5832V26.5833V26.5833V26.5834V26.5834V26.5835V26.5835V26.5836V26.5837V26.5837V26.5838V26.5838V26.5839V26.5839V26.584V26.584V26.5841V26.5841V26.5842V26.5842V26.5843V26.5843V26.5844V26.5844V26.5845V26.5845V26.5846V26.5847V26.5847V26.5848V26.5848V26.5849V26.5849V26.585V26.585V26.5851V26.5851V26.5852V26.5852V26.5853V26.5853V26.5854V26.5855V26.5855V26.5856V26.5856V26.5857V26.5857V26.5858V26.5858V26.5859V26.5859V26.586V26.586V26.5861V26.5861V26.5862V26.5863V26.5863V26.5864V26.5864V26.5865V26.5865V26.5866V26.5866V26.5867V26.5867V26.5868V26.5868V26.5869V26.5869V26.587V26.5871V26.5871V26.5872V26.5872V26.5873V26.5873V26.5874V26.5874V26.5875V26.5875V26.5876V26.5876V26.5877V26.5877V26.5878V26.5879V26.5879V26.588V26.588V26.5881V26.5881V26.5882V26.5882V26.5883V26.5883V26.5884V26.5884V26.5885V26.5885V26.5886V26.5886V26.5887V26.5887V26.5888V26.5889V26.5889V26.589V26.589V26.5891V26.5891V26.5892V26.5892V26.5893V26.5893V26.5894V26.5894V26.5895V26.5895V26.5896V26.5896V26.5897V26.5897V26.5898V26.5898V26.5899V26.59V26.59V26.5901V26.5901V26.5902V26.5902V26.5903V26.5903V26.5904V26.5904V26.5905V26.5905V26.5906V26.5906V26.5907V26.5907V26.5908V26.5908V26.5909V26.5909V26.591V26.591V26.5911V26.5911V26.5912V26.5912V26.5913V26.5913V26.5914V26.5914V26.5915V26.5915V26.5916V26.5916V26.5917V26.5917V26.5918V26.5918V26.5919V26.5919V26.592V26.592V26.5921V26.5921V26.5922V26.5922V26.5923V26.5923V26.5924V26.5924V26.5925V26.5925V26.5925V26.5926V26.5926V26.5927V26.5927V26.5928V26.5928V26.5929V26.5929V26.593V26.593V26.5931V26.5931V26.5932V26.5932V26.5933V26.5933V26.5933V26.5934V26.5934V26.5935V26.5935V26.5936V26.5936V26.5937V26.5937V26.5938V26.5938V26.5938V26.5939V26.5939V26.594V26.594V26.5941V26.5941V26.5942V26.5942V26.5942V26.5943V26.5943V26.5944V26.5944V26.5945V26.5945V26.5946V26.5946V26.5946V26.5947V26.5947V26.5948V26.5948V26.5948V26.5949V26.5949V26.595V26.595V26.5951V26.5951V26.5951V26.5952V26.5952V26.5953V26.5953V26.5953V26.5954V26.5954V26.5955V26.5955V26.5955V26.5956V26.5956V26.5957V26.5957V26.5957V26.5958V26.5958V26.5959V26.5959V26.5959V26.596V26.596V26.596V26.5961V26.5961V26.5962V26.5962V26.5962V26.5963V26.5963V26.5963V26.5964V26.5964V26.5965V26.5965V26.5965V26.5966V26.5966V26.5966V26.5967V26.5967V26.5967V26.5968V26.5968V26.5968V26.5969V26.5969V26.5969V26.597V26.597V26.597V26.5971V26.5971V26.5971V26.5972V26.5972V26.5972V26.5973V26.5973V26.5973V26.5974V26.5974V26.5974V26.5974V26.5975V26.5975V26.5975V26.5976V26.5976V26.5976V26.5977V26.5977V26.5977V26.5977V26.5978V26.5978V26.5978V26.5979V26.5979V26.5979V26.5979V26.598V26.598V26.598V26.598V26.5981V26.5981V26.5981V26.5981V26.5982V26.5982V26.5982V26.5982V26.5983V26.5983V26.5983V26.5983V26.5984V26.5984V26.5984V26.5984V26.5985V26.5985V26.5985V26.5985V26.5985V26.5986V26.5986V26.5986V26.5986V26.5987V26.5987V26.5987V26.5987V26.5987V26.5988V26.5988V26.5988V26.5988V26.5988V26.5988V26.5989V26.5989V26.5989V26.5989V26.5989V26.599V26.599V26.599V26.599V26.599V26.599V26.599V26.5991V26.5991V26.5991V26.5991V26.5992V26.5992V26.5992V26.5992V26.5993V26.5993V26.5993V26.5993V26.5993V26.5994V26.5994V26.5994V26.5994V26.5994V26.5994V26.5995V26.5995V26.5995V37.5732ZM33.6738 31.2213L33.7185 31.2437L33.7632 31.2213L42.8305 26.6889L43.0095 26.5995L42.8305 26.51L38.3415 24.2668L38.2943 24.2432L38.2482 24.2689L33.2565 27.0429L29.6607 29.0411L29.4949 29.1332L29.6646 29.218L33.6738 31.2213ZM33.763 21.9775L33.7183 21.9554L33.6738 21.9777L24.6064 26.5101L24.4272 26.5996L24.6066 26.689L28.5698 28.6643L28.6171 28.6878L28.6632 28.6621L33.0015 26.2403L33.0016 26.2402L37.2404 23.8796L37.4064 23.7872L37.2363 23.7027L33.763 21.9775ZM24.0655 27.3369L23.9208 27.2646V27.4264V38.1729V38.2366L23.9786 38.2636L33.1659 42.5433L33.3081 42.6096V42.4527V32.02V31.9582L33.2528 31.9305L29.1696 29.8889L29.0249 29.8166V29.9784V34.2556C29.0249 34.3644 28.9816 34.4688 28.9046 34.5458C28.8277 34.6227 28.7233 34.666 28.6144 34.666C28.5056 34.666 28.4012 34.6227 28.3242 34.5458C28.2473 34.4688 28.204 34.3644 28.204 34.2556V29.468V29.4062L28.1488 29.3785L24.0655 27.3369ZM34.1289 42.4527V42.6096L34.2711 42.5433L37.109 41.2214L37.1745 41.1908L37.1661 41.1191C37.1472 40.9585 37.1372 40.797 37.1361 40.6353C37.1362 39.9035 37.3257 39.1842 37.6863 38.5473C38.0469 37.9104 38.5663 37.3778 39.1939 37.0012C39.8215 36.6246 40.5359 36.417 41.2676 36.3985C41.9993 36.3801 42.7233 36.5514 43.3691 36.8958L43.5162 36.9742V36.8076V27.4264V27.2646L43.3714 27.3369L34.1842 31.9305L34.1289 31.9582V32.02V42.4527ZM39.4758 43.4773C40.0378 43.8528 40.6986 44.0532 41.3746 44.0532C42.281 44.0532 43.1502 43.6932 43.7912 43.0522C44.4321 42.4113 44.7922 41.542 44.7922 40.6356C44.7922 39.9597 44.5917 39.2989 44.2162 38.7369C43.8407 38.1749 43.3069 37.7368 42.6824 37.4781C42.0579 37.2195 41.3708 37.1518 40.7078 37.2837C40.0449 37.4155 39.4359 37.741 38.9579 38.219C38.48 38.6969 38.1545 39.3059 38.0226 39.9689C37.8907 40.6318 37.9584 41.319 38.2171 41.9435C38.4757 42.568 38.9138 43.1017 39.4758 43.4773Z"
                                                  fill="white"
                                                  stroke="#DB3022"
                                                  stroke-width="0.2"
                                                />
                                                <path
                                                  d="M41.3042 39.9844L41.3748 40.0548L41.4454 39.9844L42.3615 39.0709C42.3615 39.0709 42.3615 39.0709 42.3615 39.0709C42.4384 38.9944 42.5424 38.9516 42.6508 38.9516C42.7591 38.9516 42.8631 38.9944 42.9399 39.0707C43.0162 39.1476 43.0591 39.2515 43.0591 39.3598C43.0591 39.4682 43.0162 39.5723 42.9397 39.6492L42.0262 40.5652L41.9558 40.6358L42.0262 40.7064L42.937 41.6198C43.0027 41.6979 43.037 41.7977 43.0331 41.8998C43.0291 42.0031 42.9863 42.1011 42.9132 42.1742C42.8401 42.2473 42.7421 42.2901 42.6388 42.2941C42.5367 42.298 42.4369 42.2638 42.3588 42.198L41.4454 41.2872L41.3748 41.2168L41.3042 41.2872L40.388 42.2009L40.3878 42.2006L40.3827 42.2066C40.3459 42.2496 40.3006 42.2845 40.2497 42.3091C40.1988 42.3338 40.1433 42.3476 40.0868 42.3498C40.0303 42.352 39.9739 42.3424 39.9212 42.3218C39.8686 42.3012 39.8207 42.2699 39.7808 42.2299C39.7408 42.1899 39.7095 42.1421 39.6888 42.0894C39.6682 42.0367 39.6587 41.9804 39.6609 41.9238C39.663 41.8673 39.6769 41.8119 39.7015 41.7609C39.7261 41.71 39.761 41.6647 39.804 41.628L39.8042 41.6282L39.8098 41.6226L40.7234 40.7064L40.7938 40.6358L40.7234 40.5652L39.8126 39.6519C39.7469 39.5738 39.7126 39.4739 39.7165 39.3718C39.7205 39.2685 39.7633 39.1705 39.8364 39.0975C39.9095 39.0244 40.0075 38.9816 40.1108 38.9776C40.2129 38.9736 40.3127 39.0079 40.3908 39.0736L41.3042 39.9844Z"
                                                  fill="white"
                                                  stroke="#DB3022"
                                                  stroke-width="0.2"
                                                />
                                                <defs>
                                                  <filter
                                                    id="filter0_d_3896_12571"
                                                    x="0"
                                                    y="0"
                                                    width="68"
                                                    height="68"
                                                    filterUnits="userSpaceOnUse"
                                                    color-interpolation-filters="sRGB"
                                                  >
                                                    <feFlood
                                                      flood-opacity="0"
                                                      result="BackgroundImageFix"
                                                    />
                                                    <feColorMatrix
                                                      in="SourceAlpha"
                                                      type="matrix"
                                                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                      result="hardAlpha"
                                                    />
                                                    <feOffset dy="1" />
                                                    <feGaussianBlur stdDeviation="2" />
                                                    <feComposite
                                                      in2="hardAlpha"
                                                      operator="out"
                                                    />
                                                    <feColorMatrix
                                                      type="matrix"
                                                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
                                                    />
                                                    <feBlend
                                                      mode="normal"
                                                      in2="BackgroundImageFix"
                                                      result="effect1_dropShadow_3896_12571"
                                                    />
                                                    <feBlend
                                                      mode="normal"
                                                      in="SourceGraphic"
                                                      in2="effect1_dropShadow_3896_12571"
                                                      result="shape"
                                                    />
                                                  </filter>
                                                </defs>
                                              </svg>
                                            )}
                                            <p className="text-xs">
                                              {shippingStep.status}
                                            </p>
                                            {shippingStep.date && (
                                              <p>
                                                {formatShippingDate(
                                                  shippingStep.date
                                                )}
                                              </p>
                                            )}
                                          </div>
                                          {/* Add border line after each step except the last one */}
                                          {stepIndex <
                                            selectedOrder[index].shippingInfo
                                              .length -
                                              2 && (
                                            <div className="flex-1">
                                              <hr className="border-t-4 border-dotted border-blue-700 h-8" />
                                            </div>
                                          )}
                                        </React.Fragment>
                                      ))}
                                    {/* Check if returnInfo exists and render it */}
                                    {selectedOrder[index]?.returnInfo.length >=
                                      1 && (
                                      <>
                                        <div className="flex-1">
                                          <hr className="border-t-4 border-dotted border-blue-700 h-8" />
                                        </div>
                                        <div className="flex flex-col justify-center items-center">
                                          <svg
                                            width="50"
                                            height="50"
                                            viewBox="0 0 68 68"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <g filter="url(#filter0_d_3896_12522)">
                                              <circle
                                                cx="34"
                                                cy="33"
                                                r="30"
                                                fill="#DB3022"
                                              />
                                            </g>
                                            <path
                                              d="M28.637 29.7298C28.733 29.7308 28.8247 29.7698 28.8921 29.8381C28.9594 29.9065 28.997 29.9988 28.9966 30.0947V33.3687H43.1765H46.81C46.8812 33.3692 46.9508 33.3907 47.0099 33.4305C47.0691 33.4702 47.1152 33.5264 47.1427 33.5921C47.1701 33.6579 47.1776 33.7303 47.1643 33.8003C47.1509 33.8703 47.1173 33.9348 47.0676 33.9859L43.6917 37.3671L47.0676 40.743C47.1192 40.7938 47.1544 40.8588 47.1688 40.9297C47.1832 41.0006 47.1761 41.0742 47.1484 41.141C47.1208 41.2079 47.0738 41.265 47.0135 41.305C46.9532 41.345 46.8823 41.3661 46.81 41.3656H43.1765H28.9966V44.6342C28.9971 44.7065 28.976 44.7773 28.936 44.8376C28.896 44.8979 28.8389 44.9448 28.772 44.9725C28.7052 45.0001 28.6316 45.0072 28.5607 44.9928C28.4898 44.9784 28.4248 44.9432 28.3741 44.8916L21.107 37.6246C21.0731 37.5908 21.0462 37.5507 21.0278 37.5065C21.0095 37.4623 21 37.4148 21 37.367C21 37.3191 21.0095 37.2717 21.0278 37.2275C21.0462 37.1833 21.0731 37.1431 21.107 37.1093L28.3741 29.837C28.4084 29.8024 28.4494 29.775 28.4946 29.7565C28.5398 29.7381 28.5882 29.7291 28.637 29.7298ZM28.2721 30.9696L21.8745 37.3671L28.2721 43.7593V41.0006C28.2717 40.9047 28.3093 40.8124 28.3767 40.744C28.444 40.6757 28.5357 40.6367 28.6317 40.6357H43.1765H45.9298L42.9189 37.6248C42.8849 37.591 42.858 37.5508 42.8396 37.5066C42.8213 37.4624 42.8118 37.415 42.8118 37.3671C42.8118 37.3193 42.8213 37.2719 42.8396 37.2277C42.858 37.1835 42.8849 37.1433 42.9189 37.1095L45.9298 34.0932H43.1765H28.6317C28.5357 34.0922 28.444 34.0532 28.3767 33.9849C28.3093 33.9165 28.2717 33.8242 28.2721 33.7283V30.9696Z"
                                              fill="white"
                                            />
                                            <path
                                              d="M37.936 21.0081C37.9836 21.0123 38.0299 21.0258 38.0723 21.0479C38.1146 21.07 38.1522 21.1003 38.1829 21.137L41.8164 25.5004C41.8471 25.5371 41.8702 25.5794 41.8845 25.625C41.8988 25.6705 41.904 25.7186 41.8998 25.7662C41.8956 25.8138 41.882 25.8601 41.8599 25.9024C41.8377 25.9448 41.8075 25.9824 41.7708 26.0131C41.7342 26.0437 41.6918 26.0669 41.6462 26.0812C41.6006 26.0955 41.5526 26.1006 41.505 26.0963C41.4574 26.0921 41.4111 26.0786 41.3688 26.0564C41.3264 26.0343 41.2889 26.004 41.2582 25.9674L37.732 21.7327H24.1372L27.277 25.5004C27.3076 25.5371 27.3308 25.5794 27.3451 25.625C27.3594 25.6705 27.3646 25.7186 27.3604 25.7662C27.3561 25.8138 27.3426 25.8601 27.3204 25.9024C27.2983 25.9448 27.2681 25.9824 27.2314 26.0131C27.1947 26.0437 27.1524 26.0669 27.1068 26.0812C27.0612 26.0955 27.0132 26.1006 26.9656 26.0963C26.918 26.0921 26.8717 26.0786 26.8294 26.0564C26.787 26.0343 26.7494 26.004 26.7188 25.9674L23.0799 21.6039C23.0358 21.5508 23.0078 21.4863 22.999 21.4178C22.9903 21.3494 23.0012 21.28 23.0304 21.2175C23.0597 21.155 23.1061 21.1022 23.1643 21.0651C23.2225 21.028 23.29 21.0083 23.359 21.0082H37.9038C37.9145 21.0077 37.9253 21.0076 37.936 21.0081Z"
                                              fill="white"
                                            />
                                            <path
                                              d="M23.404 21.0028C23.4933 21.0131 23.5756 21.0561 23.6351 21.1235C23.6946 21.1909 23.727 21.2779 23.726 21.3678V28.6402V30.0946V31.4364L25.1161 33.5296C25.1485 33.5687 25.1723 33.6143 25.186 33.6632C25.1997 33.7122 25.203 33.7634 25.1957 33.8137C25.1883 33.864 25.1705 33.9122 25.1434 33.9552C25.1163 33.9982 25.0804 34.035 25.0382 34.0633C24.996 34.0915 24.9483 34.1107 24.8982 34.1194C24.8481 34.1281 24.7968 34.1262 24.7475 34.1138C24.6982 34.1015 24.652 34.079 24.612 34.0477C24.5719 34.0164 24.5389 33.977 24.515 33.9321L23.0605 31.7477C23.0201 31.6892 22.9977 31.6201 22.9961 31.549V30.0946V28.6401V21.3677C22.9955 21.3158 23.006 21.2645 23.0269 21.2171C23.0478 21.1696 23.0786 21.1272 23.1172 21.0926C23.1559 21.0581 23.2014 21.0321 23.2509 21.0166C23.3004 21.0011 23.3526 20.9965 23.404 21.0028Z"
                                              fill="white"
                                            />
                                            <path
                                              d="M41.5404 25.3662C41.5884 25.366 41.636 25.3754 41.6803 25.3936C41.7247 25.4119 41.765 25.4388 41.7989 25.4727C41.8328 25.5066 41.8597 25.5469 41.878 25.5913C41.8963 25.6357 41.9056 25.6832 41.9054 25.7312V33.7281C41.9054 33.8249 41.867 33.9177 41.7985 33.9862C41.7301 34.0546 41.6372 34.0931 41.5404 34.0931C41.4436 34.0931 41.3508 34.0546 41.2824 33.9862C41.2139 33.9177 41.1755 33.8249 41.1755 33.7281V26.0961H27.3606V31.5491C27.3648 31.5992 27.3586 31.6497 27.3423 31.6974C27.3261 31.745 27.3001 31.7886 27.266 31.8257C27.232 31.8627 27.1906 31.8923 27.1445 31.9125C27.0984 31.9328 27.0487 31.9432 26.9983 31.9432C26.948 31.9432 26.8982 31.9328 26.8522 31.9125C26.8061 31.8923 26.7647 31.8627 26.7307 31.8257C26.6966 31.7886 26.6706 31.745 26.6543 31.6974C26.638 31.6497 26.6318 31.5992 26.6361 31.5491V25.7312C26.6359 25.6832 26.6452 25.6357 26.6635 25.5913C26.6817 25.5469 26.7086 25.5066 26.7425 25.4727C26.7765 25.4388 26.8168 25.4119 26.8611 25.3936C26.9055 25.3754 26.953 25.366 27.001 25.3662H41.5404Z"
                                              fill="white"
                                            />
                                            <path
                                              d="M32.1249 21.0026C32.2199 21.0138 32.3067 21.062 32.3664 21.1367L35.9999 25.5002C36.0545 25.5648 36.0849 25.6465 36.0858 25.731V29.3646C36.0859 29.4461 36.0585 29.5253 36.008 29.5895C35.9576 29.6536 35.8871 29.6989 35.8078 29.7181C35.7285 29.7373 35.645 29.7292 35.5709 29.6952C35.4967 29.6612 35.4361 29.6033 35.3988 29.5308L34.9963 28.7257L34.5938 29.5308C34.5635 29.5909 34.5171 29.6415 34.4597 29.6768C34.4024 29.7121 34.3364 29.7308 34.2691 29.7308C34.2017 29.7308 34.1357 29.7121 34.0784 29.6768C34.021 29.6415 33.9746 29.5909 33.9443 29.5308L33.5418 28.7257L33.1393 29.5308C33.102 29.6033 33.0414 29.6612 32.9673 29.6952C32.8931 29.7292 32.8096 29.7373 32.7304 29.7181C32.6511 29.6989 32.5805 29.6536 32.5301 29.5895C32.4797 29.5253 32.4523 29.4461 32.4523 29.3646V25.8652L28.8993 21.6038C28.8686 21.5671 28.8455 21.5247 28.8312 21.4791C28.8168 21.4335 28.8117 21.3856 28.8159 21.338C28.8201 21.2904 28.8337 21.2441 28.8558 21.2017C28.8779 21.1594 28.9082 21.1218 28.9449 21.0911C28.9815 21.0604 29.0238 21.0373 29.0694 21.023C29.1151 21.0087 29.163 21.0035 29.2106 21.0078C29.2582 21.012 29.3045 21.0256 29.3469 21.0478C29.3892 21.0699 29.4268 21.1002 29.4575 21.1368L33.091 25.5003C33.1456 25.5649 33.176 25.6465 33.1769 25.731V27.8242L33.2144 27.7492C33.2447 27.6891 33.2911 27.6385 33.3484 27.6032C33.4058 27.5679 33.4718 27.5491 33.5391 27.5491C33.6065 27.5491 33.6725 27.5679 33.7298 27.6032C33.7872 27.6385 33.8336 27.6891 33.8638 27.7492L34.2664 28.5543L34.6689 27.7492C34.6992 27.6891 34.7456 27.6385 34.8029 27.6032C34.8603 27.5679 34.9263 27.5491 34.9936 27.5491C35.061 27.5491 35.127 27.5679 35.1843 27.6032C35.2416 27.6385 35.288 27.6891 35.3183 27.7492L35.3559 27.8242V25.8652L31.8083 21.6038C31.7596 21.5485 31.7288 21.4797 31.7201 21.4065C31.7114 21.3334 31.7252 21.2593 31.7595 21.1941C31.7938 21.1289 31.8472 21.0757 31.9124 21.0416C31.9777 21.0074 32.0518 20.9938 32.1249 21.0026Z"
                                              fill="white"
                                            />
                                            <defs>
                                              <filter
                                                id="filter0_d_3896_12522"
                                                x="0"
                                                y="0"
                                                width="68"
                                                height="68"
                                                filterUnits="userSpaceOnUse"
                                                color-interpolation-filters="sRGB"
                                              >
                                                <feFlood
                                                  flood-opacity="0"
                                                  result="BackgroundImageFix"
                                                />
                                                <feColorMatrix
                                                  in="SourceAlpha"
                                                  type="matrix"
                                                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                  result="hardAlpha"
                                                />
                                                <feOffset dy="1" />
                                                <feGaussianBlur stdDeviation="2" />
                                                <feComposite
                                                  in2="hardAlpha"
                                                  operator="out"
                                                />
                                                <feColorMatrix
                                                  type="matrix"
                                                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
                                                />
                                                <feBlend
                                                  mode="normal"
                                                  in2="BackgroundImageFix"
                                                  result="effect1_dropShadow_3896_12522"
                                                />
                                                <feBlend
                                                  mode="normal"
                                                  in="SourceGraphic"
                                                  in2="effect1_dropShadow_3896_12522"
                                                  result="shape"
                                                />
                                              </filter>
                                            </defs>
                                          </svg>
                                          <p className="text-xs">
                                            {
                                              selectedOrder[index]
                                                ?.returnInfo[0]?.status
                                            }
                                          </p>
                                          {selectedOrder[index]?.returnInfo[0]
                                            ?.date && (
                                            <p>
                                              {formatShippingDate(
                                                selectedOrder[index]
                                                  ?.returnInfo[0]?.date
                                              )}
                                            </p>
                                          )}
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                  {/* Additional order details */}
                  <table className="table-auto text-center w-full text-xs">
                    <thead>
                      <tr>
                        <th className="pb-1" colSpan="5">
                          &nbsp;
                        </th>{" "}
                        {/* Empty row with colSpan */}
                      </tr>
                      <tr>
                        <th className="border-b border-gray-500 pb-2 pl-2 pr-2">
                          Delivery Address
                        </th>
                        <th className="border-b border-gray-500 pb-2 pl-2 pr-2">
                          Applied Coupon
                        </th>
                        <th className="border-b border-gray-500 pb-2 pl-2 pr-2">
                          Coupon Margin
                        </th>
                        <th className="border-b border-gray-500 pb-2 pl-2 pr-2">
                          Agent Commission Amount
                        </th>
                        <th className="border-b border-gray-500 pb-2 pl-2 pr-2">
                          GST
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-gray-500 pl-2 pr-2">
                          {getDisplayValue(
                            selectedOrder[0].deliveryAddress?.address
                          )}
                        </td>
                        <td className="text-gray-500 pl-2 pr-2">
                          {getDisplayValue(selectedOrder[0].coupenName)}
                        </td>
                        <td className="text-gray-500 pl-2 pr-2">
                          {getDisplayValue(selectedOrder[0].coupenMargin)}
                        </td>
                        <td className="text-gray-500 pl-2 pr-2">
                          {getDisplayValue(selectedOrder[0].coummission)}
                        </td>
                        <td className="text-gray-500 pl-2 pr-2">
                          {getDisplayValue(selectedOrder[0].gst)}
                        </td>
                      </tr>
                    </tbody>
                    <tr>
                      <th className="pb-2" colSpan="5">
                        &nbsp;
                      </th>{" "}
                      {/* Empty row with colSpan */}
                    </tr>
                  </table>
                  {/* Return details */}
                  {selectedOrder.map(
                    (product, index) =>
                      product.returnInfo?.length >= 1 && (
                        <table className="table-auto text-center text-xs">
                          <thead>
                            <tr>
                              <th className="pb-1" colSpan="5">
                                &nbsp;
                              </th>{" "}
                              {/* Empty row with colSpan */}
                            </tr>
                            <tr>
                              <th className="border-b border-gray-500 pb-2 pl-2 pr-2">
                                Return Product
                              </th>
                              <th className="border-b border-gray-500 pb-2 pl-2 pr-2">
                                Return Reason
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="text-gray-500 pl-2 pr-2">
                                {getDisplayValue(product.productName)}
                              </td>
                              <td className="text-gray-500 pl-2 pr-2">
                                {getDisplayValue(product.reasonOfReturn)}
                              </td>
                            </tr>
                          </tbody>
                          <tr>
                            <th className="pb-2" colSpan="5">
                              &nbsp;
                            </th>{" "}
                            {/* Empty row with colSpan */}
                          </tr>
                        </table>
                      )
                  )}

                  {/* Cancelled details */}
                  {selectedOrder.map(
                    (product, index) =>
                      product.cancelInfo?.length >= 1 && (
                        <table className="table-auto text-center text-xs">
                          <thead>
                            <tr>
                              <th className="pb-1" colSpan="5">
                                &nbsp;
                              </th>{" "}
                              {/* Empty row with colSpan */}
                            </tr>
                            <tr>
                              <th className="border-b border-gray-500 pb-2 pl-2 pr-2">
                                Cancelled Product
                              </th>
                              <th className="border-b border-gray-500 pb-2 pl-2 pr-2">
                                Cancelled Reason
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="text-gray-500 pl-2 pr-2">
                                {getDisplayValue(product.productName)}
                              </td>
                              <td className="text-gray-500 pl-2 pr-2">
                                {getDisplayValue(product.reasonOfCancel)}
                              </td>
                            </tr>
                          </tbody>
                          <tr>
                            <th className="pb-2" colSpan="5">
                              &nbsp;
                            </th>{" "}
                            {/* Empty row with colSpan */}
                          </tr>
                        </table>
                      )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailModal;
