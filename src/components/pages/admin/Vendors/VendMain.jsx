import React, { useState } from 'react';
import TopVendors from './TopVendors';
import VendorRequests from './VendorRequests';

const VendorsPage = () => {
  const [activeButton, setActiveButton] = useState('topVendors');


  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  return (
    <>
    <div className="flex justify-between text-sm mb-5">
        <h1 className="text-lg font-bold">Vendors</h1>
        {/* <div
          className="p-1.5 relative flex justify-between min-w-[20%] items-center rounded-lg"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.375076 1.70711L3.96086 5.29289C4.35139 5.68342 4.98455 5.68342 5.37508 5.29289L8.96086 1.70711C9.59083 1.07714 9.14466 0 8.25376 0H1.08218C0.191278 0 -0.254888 1.07714 0.375076 1.70711Z"
              fill="black"
            />
          </svg>
        </div> */}
      </div>
    <div className="bg-containerWhite w-full rounded-xl min-h-[600px] shadow-sm p-4">
      
      <div className="flex justify-between">
        <div className="flex">
          <div
            className={`rounded-l-xl cursor-pointer text-xs text-center px-8 py-3 ${activeButton === 'topVendors' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
            onClick={() => handleButtonClick('topVendors')}
          >
            Vendors
          </div>
          <div
            className={`rounded-r-xl cursor-pointer text-xs text-center px-2 py-3 ${activeButton === 'newVendors' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
            onClick={() => handleButtonClick('newVendors')}
          >
            Vendor Requests
          </div>
        </div>
      </div>
      
      {activeButton === 'topVendors' ? <TopVendors />: <VendorRequests />}
      
    </div>
    </>
  );
};

export default VendorsPage;
