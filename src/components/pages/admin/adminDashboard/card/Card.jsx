import React, { useState } from "react";

function Card({ text, data, img, color }) {
  
  return (
    <div className="bg-containerWhite rounded-xl p-4">
      <div className="flex justify-between w-full text-sm">
        <p>{text}</p>
        
      </div>
      <div className="flex gap-4 mt-10 items-center">
        <div className="p-3 rounded-lg" style={{ backgroundColor: color }}>
          <img src={img} className="w-10 h-10" alt="" />
        </div>
        <div>
          {text === "Total Revenue" ? (
            <div>
              <p className="text-xl font-bold">{data?.totalCount}</p>
              <p className="flex gap-1 items-center mt-3">
                <span
                  className="mb-1.5"
                  style={{
                    color: "rgba(63, 197, 0, 1)",
                    fontWeight: "bold",
                    fontSize: "1.2em", // Adjust font size to make it smaller
                    lineHeight: "0.8", // Adjust line height to make it smaller
                  }}
                >
                  {"\u2191"}
                </span>
                {data?.persetage}%
              </p>
            </div>
          ) : (
            <div>
              <p className="text-xl font-bold">{data?.totalCount}</p>
              <div className="flex items-center gap-1 mt-3">
                <div className="p-0.5 bg-green-600 rounded-full"></div>
                {data?.last7}
                <div className="p-0.5 bg-red-600 rounded-full ml-3"></div>
                {data?.todaycount}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
