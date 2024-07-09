import React, { createContext, useContext, useEffect, useState } from "react";
import DropDown from "../DropDown";
import { UserContext } from "../../../../pages/admin/revenue/Adminrevenue";
function ThirdSectionCard({
  img,
  firstText,
  data,
  keword,
  setkeyword,
  keyWord1,
  setKeyWord1,
}) {
  const [dropDown1, setDropDown1] = useState(false);
  // const UserContext = createContext();

  const Symbol = useContext(UserContext);
  console.log(Symbol, "))))))))))))))")
  useEffect(() => {}, []);
  return (
    <div className="bg-containerWhite p-3 rounded-xl shadow-md">
      <div className="w-full flex justify-between items-center -mt-3">
        <div className="flex gap-1 items-center">
          <div className="w-7 flex justify-between">{img}</div>
          <p className="font-bold text-sm">{firstText}</p>
        </div>
        <DropDown
          drop1={dropDown1}
          setDrp1={setDropDown1}
          keword={keword}
          keyWord1={keyWord1}
          setKeyWord1={setKeyWord1}
          setkeyword={setkeyword}
        />
      </div>
      <div className="flex items-center gap-2 mt-5">
        <h1 className="font-bold text-xl">
          {data?.cloudRevenue ? Symbol : ""}
          {data?.cloudRevenue >= 0
            ? data?.cloudRevenue.toFixed(1)
            : data?.specialDealsRevenue >= 0
            ? data?.specialDealsRevenue.toFixed(1)
            : data?.bannerRevenue >= 0
            ? data?.bannerRevenue.toFixed(1)
            : data?.membershipRevenue >= 0 && data?.membershipRevenue.toFixed(1)}
        </h1>
        <p className="flex gap-3">
          <p className="flex gap-1 items-center">
            <svg
              width="12"
              height="14"
              viewBox="0 0 12 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.2 13V1M6.2 1L1 5.5M6.2 1L11 5.5"
                stroke="#10C800"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            {data?.percentage?.toFixed()}%
          </p>
        </p>
      </div>
      {/* <p className="text-xs mt-3">Compared to prev month</p> */}
    </div>
  );
}

export default ThirdSectionCard;
