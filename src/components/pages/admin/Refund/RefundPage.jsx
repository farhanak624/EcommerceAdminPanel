import React, { useState } from "react";
import Refund from "./Refund";
import RefundHistory from "./RefundHistory";

const RefundPage = () => {
    const [activeButton, setActiveButton] = useState("refund");
    const handleButtonClick = (button) => {
        setActiveButton(button);
      };
  return (
    <div className="bg-containerWhite w-full flex justify-center h-full rounded-xl min-h-[600px] shadow-sm p-4">
      <div className="bg-containerWhite w-full rounded-xl min-h-[600px] shadow-sm p-4">
        <div className="flex justify-between">
          <div className="flex">
            <div
              className={`rounded-l-xl cursor-pointer text-xs text-center px-2 py-3 w-24 ${
                activeButton === "refund"
                  ? "bg-navblue text-white"
                  : "bg-gray-100 hover:bg-gray-300 hover:text-black"
              }`}
              onClick={() => handleButtonClick("refund")}
            >
              Refund
            </div>
            <div
              className={`rounded-r-xl cursor-pointer text-xs text-center px-2 py-3  ${
                activeButton === "history"
                  ? "bg-navblue text-white "
                  : "bg-gray-100 hover:bg-gray-300 hover:text-black"
              }`}
              onClick={() => handleButtonClick("history")}
            >
              Refund History
            </div>
          </div>
        </div>

        {activeButton === "refund" ? <Refund /> : <RefundHistory />}
      </div>
    </div>
  );
};

export default RefundPage;
