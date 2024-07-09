import React, { useEffect, useState } from "react";

function OverViewCards({ data, img, text }) {
  
  return (
    <div className="card p-5 bg-containerWhite shadow-md rounded-lg ">
      <div className="flex justify-between">
        <div
          className={`w-10 rounded-xl ${img === "/imagee.png" ? "p-2" : "p-0"}`}
          style={{ backgroundColor: "rgba(209, 216, 255, 1)" }}
        >
          <img src={img} alt="" />
        </div>
        {/* {data?.lastweek && (
          <div>
            <p className="flex gap-2">
              <p
                className=" -mt-1.5"
                style={{
                  color: "rgba(63, 197, 0, 1)",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                {"\u2191"}
              </p>
              
            </p>
            <p></p>
          </div>
        )} */}
      </div>
      <div className="mt-4">
        <h1 className="font-bold"> {data}</h1>
        <p className="text-xs">{text}</p>
      </div>
    </div>
  );
}

export default OverViewCards;
