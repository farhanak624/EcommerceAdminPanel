import React, { useState } from "react";
import VenOverview from "./VenOverview";
import VenProducts from "./VenProducts";
import { useNavigate, useParams } from "react-router-dom";

import { getVendorDetails } from "../../../../Api/ApiCall";
const VenDetail = () => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("overview");
  const { id } = useParams();

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  return (
    <>
      <div className="flex justify-between text-sm py-5">
        <h1 className="text-xl font-bold">Vendor Details</h1>
        {/* <div
          className="p-1.5 relative flex justify-between min-w-[20%] items-center rounded-lg"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
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
        </div> */}
      </div>
      <div className="bg-containerWhite w-full rounded-xl min-h-[600px] shadow-sm p-4">
        <button
          onClick={() => navigate("/admin/vendors")}
          className="flex items-center  border border-gray-100 cursor-pointer w-[100px] shadow-md justify-center font-bold gap-2 mb-4"
        >
          {" "}
          <div className="flex justify-center items-center">
            <span className="font-bold" style={{ fontSize: "30px" }}>
              &#8592;
            </span>{" "}
            <p className="mt-1 ml-2">Back</p>
          </div>
        </button>
        <div className="flex justify-between mb-4">
          <div className="flex">
            <div
              className={`rounded-l-xl cursor-pointer text-xs text-center px-2 py-2 ${
                activeButton === "overview"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100"
              }`}
              onClick={() => handleButtonClick("overview")}
            >
              Overview
            </div>
            <div
              className={`rounded-r-xl cursor-pointer text-xs text-center px-2 py-2 ${
                activeButton === "products"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100"
              }`}
              onClick={() => handleButtonClick("products")}
            >
              Products
            </div>
          </div>
          
        </div>

        {activeButton === "overview" ? (
          <VenOverview vendorId={id} />
        ) : (
          <VenProducts id={id} />
        )}
      </div>
    </>
  );
};

export default VenDetail;
