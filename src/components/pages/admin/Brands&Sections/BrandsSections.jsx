import React, { useContext, useEffect, useState } from "react";
import Brands from "./Brands";
import Sections from "./Sections";

const BrandsSections = () => {
  const [activeButton, setActiveButton] = useState("brands");
  const handleButtonClick = (button) => {
    setActiveButton(button);
  };
  // const reset = useContext()
  useEffect(() => {
    console.log("Brands Page");
  }, []);
  return (
    <div className="bg-containerWhite w-full flex justify-center h-full rounded-xl min-h-[600px] shadow-sm p-4">
      <div className="bg-containerWhite w-full rounded-xl min-h-[600px] shadow-sm p-4">
        <div className="flex justify-between">
          <div className="flex">
            <div
              className={`rounded-l-xl cursor-pointer text-xs text-center px-2 py-3 w-20 ${
                activeButton === "brands"
                  ? "bg-navblue text-white"
                  : "bg-gray-100 hover:bg-gray-300 hover:text-black"
              }`}
              onClick={() => handleButtonClick("brands")}
            >
              Category
            </div>
            <div
              className={`rounded-r-xl cursor-pointer text-xs text-center px-2 py-3  ${
                activeButton === "sections"
                  ? "bg-navblue text-white "
                  : "bg-gray-100 hover:bg-gray-300 hover:text-black"
              }`}
              onClick={() => handleButtonClick("sections")}
            >
              Sections
            </div>
          </div>
        </div>

        {activeButton === "brands" ? <Brands /> : <Sections />}
      </div>
    </div>
  );
};

export default BrandsSections;
