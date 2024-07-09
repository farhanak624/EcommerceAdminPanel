import React, { useEffect } from "react";

function PercentageBar({ color, percentage, id }) {
  useEffect(() => {
    const div = document.getElementById(id);
    if (div) {
      div.style.width = `${percentage}%`;
      div.style.backgroundColor = color; // Set the width using template literals
    }
  }, [percentage]); // Add 'percentage' as a dependency to re-run the effect when it changes

  return (
    <div className="relative w-full h-3 bg-[#bebebe] rounded-md overflow-hidden">
      <div id={id} className={`h-full  rounded-md`}></div>
    </div>
  );
}

export default PercentageBar;