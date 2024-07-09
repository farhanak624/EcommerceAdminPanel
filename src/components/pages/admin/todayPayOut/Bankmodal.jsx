import React from "react";

function Bankmodal({ modalopen, bank }) {
  return (
    <div
      className="absolute w-full h-[100vh] flex justify-center items-center"
      style={{ backgroundColor: " rgba(0, 0, 0, 0.247)" }}
    >
      <div className="bg-containerWhite md:w-[400px] w-[90%] p-2 text-sm rounded-md">
        <h1 className="text-lg font-bold">Account details</h1>
        <p className="mt-3 mb-1">Account name</p>
        <input
          type="text"
          readOnly
          value={bank?.accountName}
          className="w-full p-2 outline-none  bg-transparent rounded-md border border-gray-400"
        />
        <div className="flex flex-col md:flex-row w-full gap-2 mt-4">
          <div className="w-full">
            <p className="mt-3 mb-1">Account number</p>
            <input
              type="text"
              className="w-full outline-none p-2 bg-transparent rounded-md border border-gray-400"
              readOnly
              value={bank?.accountNumber}
            />
          </div>
          <div className="w-full">
            <p className="mt-3 mb-1">ifc code</p>
            <input
              type="text"
              value={bank?.ifsc}
              className="w-full p-2 outline-none  bg-transparent rounded-md border border-gray-400"
              readOnly
            />
          </div>
        </div>
        <p className="mt-3 mb-1">iban</p>
        <input
          type="text"
          value={bank?.iban}
          className="w-full p-2 outline-none  bg-transparent rounded-md border border-gray-400"
          readOnly
        />
        <div className="flex justify-end">
          <button
            onClick={() => modalopen(false)}
            className="px-3 py-1 rounded-md mt-3  bg-navblue text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Bankmodal;
