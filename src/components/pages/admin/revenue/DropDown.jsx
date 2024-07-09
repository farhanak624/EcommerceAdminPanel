import React from "react";

function DropDown({
  setDrp1,
  drop1,
  keword,
  setkeyword,
  keyWord1,
  setKeyWord1,
}) {
  return (
    <div
      className="flex cursor-pointer relative gap-1 justify-center text-xs items-center max-w-[130px] min-w-[70px] p-1 px-2 rounded-xl"
      onClick={() => setDrp1(!drop1)}
      style={{ backgroundColor: "#0000000D" }}
    >
      <p>{keyWord1 ? keyWord1 : "This Week"}</p>
      <svg
        width="16px"
        height="16px"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.70711 6.70711L7.29289 10.2929C7.68342 10.6834 8.31658 10.6834 8.70711 10.2929L12.2929 6.70711C12.9229 6.07714 12.4767 5 11.5858 5H4.41421C3.52331 5 3.07714 6.07714 3.70711 6.70711Z"
          fill="black"
        />
      </svg>
      {drop1 && (
        <div
          className="z-50 text-center absolute w-full top-7 rounded-md left-0 bg-slate-200"
          // style={{ backgroundColor: "#0000000D" }}
        >
          <p
            className="p-1 cursor-pointer"
            onClick={() => {
              setKeyWord1("This Week");
              setkeyword("lastWeek");
            }}
          >
            This week
          </p>
          <p
            className="p-1 cursor-pointer"
            onClick={() => {
              setKeyWord1("This Month");
              setkeyword("lastMonth");
            }}
          >
            This Month
          </p>
          <p
            className="p-1 cursor-pointer"
            onClick={() => {
              setKeyWord1("This Year");
              setkeyword("lastYear");
            }}
          >
            This Year
          </p>
        </div>
      )}
    </div>
  );
}

export default DropDown;
