import React, { useState } from "react";

function Card({ text, data, img, color }) {
  const [selected, setselected] = useState("All");
  const [dropdown, setdropdown] = useState(false);
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
          
            <div>
              <p className="text-xl font-bold">{data?.totalCount}</p>
              <p className="flex gap-1 items-center" style={{color : data?.persetage >= 0 ? "rgba(63, 197, 0, 1)" : "red"}}>
                <span
                  className=""
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.2em", // Adjust font size to make it smaller
                    lineHeight: "0.1", // Adjust line height to make it smaller
                  }}
                >
                  {data?.persetage >= 0 ? "\u2191" : "\u2193"}
                </span>
                {data?.persetage.toFixed()}%
              </p>
            </div>
          
        </div>
      </div>
    </div>
  );
}

export default Card;
