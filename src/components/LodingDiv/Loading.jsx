import React from "react";

function Loading({ text }) {
  return (
    <div
      className={`absolute w-full h-full z-50 flex items-center justify-center ${
        text ? "bg-containerWhite" : "bg-[#4660F5]"
      } `}
    >
      <div className="bg-containerWhite flex items-center justify-center p-4 w-[350px] rounded-3xl h-[300px]">
        <div>
          <div className="flex items-center justify-center">
            <img src="/Loading (2).gif" className="h-40 w-32" alt="" />
          </div>
          <h1 className="text-center font-bold">Please wait...</h1>
          <p className="text-xs mt-3 text-gray-400">
            Your information {text ? text : "information"} will be upload in few
            seconds
          </p>
        </div>
      </div>
    </div>
  );
}

export default Loading;
