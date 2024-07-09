import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
function RoundGraph() {
  const percentage = 66;
  return (
    <div className="">
      <h1 className="mb-2">Product Value</h1>
      <div className="relative h-full">
        <CircularProgressbar
          className=""
          value={percentage}
          styles={buildStyles({
            textColor: "red",
            //
            pathColor: "rgba(47, 78, 255, 1)",
            trailColor: "rgba(213, 220, 255, 1)",
          })}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <p className="font-bold text-lg">5k</p>
          <p className="text-gray-500 text-xs">Second Text</p>
        </div>
      </div>
    </div>
  );
}

export default RoundGraph;
