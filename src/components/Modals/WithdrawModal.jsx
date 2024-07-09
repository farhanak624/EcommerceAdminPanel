import React, { useState } from "react";
import SuccessModal from "./SuccessModal";

const WithdrawModal = ({ callback,bankData, currency }) => {
  const [isSuccessModal, setIsSuccessModal] = useState(false)
  const onClose=()=>{
    setIsSuccessModal(!isSuccessModal)
  }
  return (
    <div className={` fixed z-30 inset-0 overflow-y-auto`}>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <button className="absolute top-0 right-0 m-4 text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150">
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                onClick={() => {
                    callback();
                  }}
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-slate-300 sm:mx-0 sm:h-10 sm:w-10">
                {/* Icon */}
                <svg
                  width="32"
                  onClick={() => {
                    callback();
                  }}
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_2279_11925)">
                    <path
                      d="M16.3959 28.879C14.8548 28.879 13.4439 28.5968 12.1633 28.0325C10.8827 27.4464 9.79741 26.6542 8.90749 25.6557C8.01756 24.6573 7.37725 23.5394 6.98656 22.3022L9.754 21.1627C10.34 22.7255 11.2083 23.9301 12.3586 24.7767C13.5307 25.6015 14.8982 26.0139 16.461 26.0139C17.416 26.0139 18.2517 25.8619 18.968 25.558C19.6842 25.2542 20.2377 24.8309 20.6284 24.2883C21.0408 23.7239 21.247 23.0728 21.247 22.3348C21.247 21.3146 20.954 20.5115 20.368 19.9255C19.8036 19.3177 18.968 18.8619 17.861 18.558L13.4005 17.1906C11.6424 16.648 10.2966 15.7906 9.3633 14.6185C8.42997 13.4464 7.9633 12.1007 7.9633 10.5813C7.9633 9.25727 8.27803 8.09603 8.90749 7.09758C9.55865 6.07743 10.4486 5.28518 11.5773 4.72084C12.7276 4.13479 14.03 3.84177 15.4842 3.84177C16.9385 3.84177 18.2517 4.10223 19.4238 4.62316C20.6176 5.14409 21.6269 5.84952 22.4517 6.73944C23.2765 7.60766 23.8842 8.60611 24.2749 9.73479L21.54 10.8743C21.0191 9.50688 20.2377 8.47588 19.1959 7.7813C18.154 7.06502 16.9276 6.70688 15.5168 6.70688C14.6486 6.70688 13.878 6.85882 13.2052 7.1627C12.554 7.44487 12.0439 7.86813 11.6749 8.43247C11.3276 8.9751 11.154 9.62626 11.154 10.386C11.154 11.2759 11.4362 12.0681 12.0005 12.7627C12.5649 13.4573 13.4222 13.9891 14.5726 14.358L18.6424 15.5627C20.5524 16.1487 21.9959 16.9844 22.9726 18.0697C23.9493 19.1549 24.4377 20.5007 24.4377 22.1069C24.4377 23.4309 24.0904 24.603 23.3959 25.6232C22.723 26.6433 21.7788 27.4464 20.5633 28.0325C19.3695 28.5968 17.9804 28.879 16.3959 28.879ZM14.9307 31.7441V0.976652H17.3726V31.7441H14.9307Z"
                      fill="#304EFF"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2279_11925">
                      <rect width="32" height="32" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>

              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Bank Details
                </h3>
              </div>
            </div>

            <div className="mt-5 p-4 bg-slate-300 rounded-lg">
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                 Amount
              </label>
              <div className="mt-1 p-2 bg-slate-300 rounded-md w-full cursor-not-allowed  focus:outline-none focus:ring-2 "> 
                <p className="text-gray-700">{currency?.symbol} 2300</p>
              </div>
            </div>

            

            <div className="mt-2">
              <label
                htmlFor="bankHolderName"
                className="block text-sm font-medium text-gray-700"
              >
                Bank Holder Name
              </label>
              <div className="mt-1 p-2 bg-slate-300 rounded-md w-full cursor-not-allowed focus:outline-none focus:ring-2">
                <p className="text-gray-700">{bankData?.bankHolderName}</p>
              </div>
            </div>

            <div className="mt-2">
              <label
                htmlFor="accountNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Account Number
              </label>
              <div className="mt-1 p-2 bg-slate-300 rounded-md w-full cursor-not-allowed focus:outline-none focus:ring-2">
                <p className="text-gray-700">{bankData?.accountNumber}</p>
              </div>
            </div>

            <div className="mt-2">
              <label
                htmlFor="ifscCode"
                className="block text-sm font-medium text-gray-700"
              >
                IBan Code
              </label>
              <div className="mt-1 p-2 bg-slate-300 rounded-md w-full cursor-not-allowed focus:outline-none focus:ring-2">
                <p className="text-gray-700">{bankData?.iban}</p>
              </div>
            </div>

            {/* <div className="mt-2">
              <label
                htmlFor="branchName"
                className="block text-sm font-medium text-gray-700"
              >
                Branch Name
              </label>
              <div className="mt-1 p-2 bg-slate-300 rounded-md w-full cursor-not-allowed focus:outline-none focus:ring-2">
                <p className="text-gray-700">{bankData?.branchName}</p>
              </div>
            </div> */}

            <div className="mt-2">
              <label
                htmlFor="refundAmount"
                className="block text-sm font-medium text-gray-700"
              >
                Refund Amount
              </label>
              <div className="mt-1 p-2 bg-slate-300 rounded-md w-full cursor-not-allowed focus:outline-none focus:ring-2">
                <p className="text-gray-700">{currency?.symbol} {bankData?.refundAmount}</p>
              </div>
            </div>

            <div className="mt-2">
              <label
                htmlFor="ifRefundCompleted"
                className="block text-sm font-medium text-gray-700"
              >
                Refund Completed
              </label>
              <div className="mt-1 p-2 bg-slate-300 rounded-md w-full cursor-not-allowed focus:outline-none focus:ring-2">
                <p className="text-gray-700">{bankData?.ifRefundCompleted ? "Yes" : "No"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isSuccessModal ? (<SuccessModal onClose={onClose}/> ) : ""}
    </div>
    
  );
};

export default WithdrawModal;
