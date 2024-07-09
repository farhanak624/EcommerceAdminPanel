import React from "react";

function Prossessingbar({ percentage }) {
  return (
    <div
      className="w-full h-2 rounded-full  mt-3 relative"
      style={{ backgroundColor: "  rgba(47, 78, 255, 0.330)" }}
    >
      <div
        id="percetage1"
        className={`h-full  bg-navblue`}
        style={{ width: `${percentage}%` }}
      ></div>
      <div className="absolute rounded-full  h-4 w-4 flex items-center justify-center p-1 -bottom-1 -left-1 text-xs bg-navblue">
        <i class="fa-solid fa-check" style={{ color: "white" }}></i>
      </div>
      <h3 className="absolute text-xs -left-10">cloud selectet</h3>
      <div className="absolute rounded-full h-4 w-4 flex items-center justify-center p-1 text-xs -bottom-1 left-[50%] bg-navblue">
        <i class="fa-solid fa-check" style={{ color: "white" }}></i>
      </div>
      <h3 className="absolute text-xs left-[30%]">processing</h3>
      <div className="absolute rounded-full  h-4 w-4 flex items-center justify-center p-1 -bottom-1  -right-1 text-xs bg-navblue">
        {percentage === 100 && (
          <i class="fa-solid fa-check" style={{ color: "white" }}></i>
        )}
      </div>
      <h3 className="absolute text-xs -right-7">payment success</h3>
    </div>
  );
}

export default Prossessingbar;
