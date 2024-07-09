import React from "react";
function Card({ img, icon, data, color, text }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-3">
      <div
        className="p-3 rounded-xl w-14 flex items-center justify-center h-14"
        style={{ backgroundColor: color }}
      >
        <img src={icon} className="" alt="" />
      </div>
      <div className="mt-3 mb-3">
        <h1 className="font-bold">{text}</h1>
        <p className="text-gray-300 text-xs">Last 30 days</p>
      </div>
      <div className="w-full font-bold flex gap-1  text-xl items-center">
        <p className="mb-2" style={{ color: "rgba(63, 197, 0, 1)" }}>
          {"\u2191"}
        </p>
        {data?.price}
      </div>
    </div>
  );
}

export default Card;
