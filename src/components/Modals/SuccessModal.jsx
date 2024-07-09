import React from "react";

const SuccessModal = ({onClose}) => {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
          <div className="bg-white px-4 py-5 sm:p-6">
            <div className="flex justify-center mb-4">
              <img src="/success.png" alt="Request Sent Successfully" className="w-32 h-32" />
            </div>

            <div className="text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">Request Sent Successfully</h3>
              <p className="text-sm text-gray-500 mb-4">Below is your withdraw Req summary</p>
            </div>

            <div className="sm:flex sm:items-start">
              

              <div className="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
                <div className="mt-5">
                  <div className="mb-4">
                    <p className="text-sm text-gray-700 font-medium">Withdraw Destination</p>
                    <div className="flex items-center border p-3 rounded-lg mt-2">
                      <div className="mr-3 flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="" >
                        <p className="text-sm font-medium text-gray-900">Kotak Bank Account</p>
                        <p className="text-xs text-gray-500">XXXXXXXXX42555</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center items-center mb-4">
                    <div>
                    <p className="text-sm text-gray-700 font-medium">Total Withdraw</p>
                    <p className="text-xl font-bold text-navyblue">$200.00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-0 right-0 mt-4 mr-4">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              onClick={()=>{
                onClose()
              }} // Add your close modal function here
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
            //   onClick={onClose}
              type="button"
              className="w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-navyblue text-white font-medium hover:bg-navyblue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navyblue sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
