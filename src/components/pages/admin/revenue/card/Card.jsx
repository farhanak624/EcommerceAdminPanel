import React, { useEffect } from "react";

function Card({ img, firstText, data, trans,currency }) {
  useEffect(() => {}, []);
  console.log(trans, "))))))))))))))");
  return (
    <div className="bg-containerWhite p-4 rounded-xl shadow-md">
      <div className="flex gap-8 items-center">
        <div className="w-7 ">{img}</div>
        <p className="font-semibold">{firstText}</p>
      </div>
      <div className="flex items-center gap-4 mt-5">
        <h1 className="font-bold text-xl">
          {trans ? "" : currency}
          {data?.amount >= 0 && data?.amount != undefined
            ? data?.amount?.toFixed(1)
            : data?.totalTransaction?.toFixed()}
        </h1>
      </div>
      <div className="flex pt-2 gap-3">
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
          {data?.percentage >= 0
            ? data?.percentage?.toFixed(1)
            : data?.previousMonth?.toFixed(2)}
          %
        </p>
      </div>
      <p className="text-xs mt-3 text-transform: capitalize">
        Compared to prev month
      </p>
    </div>
  );
}

export default Card;
