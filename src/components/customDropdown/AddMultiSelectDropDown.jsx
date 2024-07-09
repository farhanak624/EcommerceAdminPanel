import React, { useEffect, useRef, useState } from "react";
import { countryData } from "../pages/ventor/Products/countries";

const AddMultiSelectDropDown = ({ formData, setformData }) => {
  const [optionlist, setOptionlist] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchKey, setsearchKey] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    console.log({ selectedValues });
    setformData({
      ...formData,
      countries: selectedValues,
    });
  }, [selectedValues]);

  const handleRemove = (value, index) => {
    const updatedValues = selectedValues.filter((country) => country !== value);
    setSelectedValues(updatedValues);
    setformData({
      ...formData,
      countries: updatedValues,
    });
  };

  const handleSearch = (e) => {
    setsearchKey(e.target.value);
    const filteredOptions = countryData.filter((country) =>
      country.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setOptionlist(filteredOptions);
  };

  const handleSelectionChange = (value) => {
    // Check if the value is already in the selectedValues array
    const index = selectedValues.indexOf(value.name);
    if (index !== -1) {
      // If the value is already selected, remove it from the array
      const updatedValues = [
        ...selectedValues.slice(0, index),
        ...selectedValues.slice(index + 1),
      ];
      setSelectedValues(updatedValues);
      setformData({
        ...formData,
        countries: updatedValues,
      });
    } else {
      // If the value is not selected, add it to the beginning of the array
      const updatedValues = [...selectedValues, value.name]; // Create updatedValues array

      setSelectedValues(updatedValues);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <>
      <div className="w-full">
        <div className="">
          <div
            onClick={() => {
              console.log("hello");
              setShowDropdown(true);
              setOptionlist(countryData);
            }}
            className="rounded-lg shadow shadow-black/20 outline-none bg-[rgba(244,245,250,1)] border-none flex flex-wrap mb-3 px-2 py-2"
          >
            {" "}
            {selectedValues.length > 0 ? (
              ""
            ) : (
              <div className="flex items-center justify-between w-full">
                <p className="text-slate-400"> Add countries</p>
                <svg
                  width="18"
                  height="10"
                  viewBox="0 0 18 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.91517 10C8.66739 10 8.42995 9.90026 8.2565 9.72326L0.263598 1.56782C-0.0929493 1.20407 -0.087038 0.62015 0.276742 0.263634C0.64049 -0.0928509 1.22444 -0.0870024 1.58093 0.276777L8.91517 7.76016L16.2494 0.276777C16.6059 -0.0870339 17.1898 -0.0929767 17.5536 0.263634C17.9174 0.620181 17.9233 1.20407 17.5667 1.56782L9.57383 9.72326C9.40038 9.90026 9.16298 10 8.91517 10Z"
                    fill="black"
                    fill-opacity="0.5"
                  />
                </svg>
              </div>
            )}
            {selectedValues.length > 0
              ? selectedValues.map((value, index) => (
                  <div
                    key={value}
                    className="bg-gray-200 rounded-md flex text-nowrap items-center px-2 py-1 mr-2"
                  >
                    {value}
                    <button
                      type="button"
                      onClick={() => handleRemove(value, index)}
                      className="ml-1 focus:outline-none w-full "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))
              : ""}
          </div>
        </div>

        <div>
          <input
            type="text"
            onClick={() => {
              setShowDropdown(true);
            }}
            onChange={handleSearch}
            placeholder="Search Country"
            className="w-full border  bg-[rgba(244,245,250,1)] shadow rounded-lg py-2 mb-3 p-2"
          />
        </div>

        {showDropdown ? (
          <div
            className=" w-full bg-transparent h-32 overflow-y-auto rounded-lg shadow-md mt-1 overflow-hidden mb-3"
            ref={dropdownRef}
          >
            <ul className="py-1">
              {optionlist.map((option, index) => (
                <li
                  key={option?.code}
                  onClick={() => handleSelectionChange(option, index)}
                  className={`px-4 py-2 cursor-pointer border rounded-lg text-nowrap hover:bg-gray-200  ${
                    selectedValues.includes(option) ? "bg-gray-200" : ""
                  }`}
                >
                  {option?.name}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default AddMultiSelectDropDown;
