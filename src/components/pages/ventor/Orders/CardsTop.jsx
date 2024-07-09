import React from "react";
function Card({ text, icon, data, color, bgcolor }) {
  // console.log(data, "data");
  return ( 
    <div className="rounded-lg shadow-md p-3 bg-white">
      <div className="flex items-center justify-between">
        <div className="p-3 rounded-xl w-14 flex items-center justify-center h-14" style={{ backgroundColor: color }}>
          <img src={icon} className="" alt="" />
        </div>
        <img src="/thread.png" className="w-14" alt="" />
      </div>
      <div className="mt-3 mb-3">
        <p className="text-gray-400 text-xs">{text}</p>
      </div>
      <div className="w-full font-bold flex gap-1  text-xl items-center">
        {data ? (
          <p className="text-2xl">{data.price}</p>
        ) : (
          <p className="text-2xl">0</p>
        )}
        
      </div> 
    </div>

  );
}

export default Card;
