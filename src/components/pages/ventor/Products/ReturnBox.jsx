import React, { useEffect, useState } from "react";

const ReturnBox = ({
  setNumberOfDays,
  numberOfDays,
  formData,
  setformData,
}) => {
  const [returnAllowed, setReturnAllowed] = useState(true);
  const handleRadioChange = (event) => {
    const { value } = event.target;
    setReturnAllowed(value === "true");
  };
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault(); // Prevent scrolling
    };
  
    const inputElement = document.getElementById('numberOfDays');
  
    if (inputElement) {
      inputElement.addEventListener('wheel', handleWheel, { passive: false });
    }
  
    return () => {
      if (inputElement) {
        inputElement.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);
  return (
    <div className="flex items-center space-x-4">
      <div className="relative flex items-start">
        <div className="flex items-center h-5 mt-1">
          <input
            id="hs-radio-delete"
            name="return-radio"
            value={true}
            type="radio"
            className="border-gray-200 rounded-full text-blue-600 focus:ring-blue-500"
            aria-describedby="hs-radio-delete-description"
            checked={returnAllowed}
            onChange={handleRadioChange}
          />
        </div>
        <label htmlFor="hs-radio-delete" className="ms-3">
          <span className="block text-sm font-semibold text-gray-800 mt-1">
            Yes
          </span>
        </label>
      </div>

      <div className="relative flex items-start">
        <div className="flex items-center h-5 mt-1">
          <input
            id="hs-radio-archive"
            name="return-radio"
            value={false}
            type="radio"
            className="border-gray-200 rounded-full text-blue-600 focus:ring-blue-500"
            aria-describedby="hs-radio-archive-description"
            checked={!returnAllowed}
            onChange={handleRadioChange}
          />
        </div>
        <label htmlFor="hs-radio-archive" className="ms-3">
          <span className="block text-sm font-semibold text-gray-800 mt-1">
            No
          </span>
        </label>
      </div>
      {returnAllowed && (
        <div className="flex">
          <input
            type="number"
            maxLength={2}
            id="numberOfDays"
            defaultValue={numberOfDays}
            onKeyDown={(e) =>
              ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
            }
            className="p-1 rounded-lg shadow shadow-black/20  outline-none bg-[rgba(244,245,250,1)] border-none flex-1"
            placeholder="How many days"
            onChange={(e) => {
              setNumberOfDays(e.target.value);
              setformData({
                ...formData,
                returnDays: parseInt(e.target.value),
              });
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ReturnBox;
