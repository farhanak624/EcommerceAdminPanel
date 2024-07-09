import React, { useState, useRef, useEffect } from "react";

export const CustomDropdown = ({
  options,
  formData,
  setFormData,
  productData,
  text,
  setSearchText,
  existingProduct,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const dropdownRef = useRef(null);
  const [search, setSearch] = useState("");
  const [otions2, setOptions] = useState([]);
  useEffect(() => {
    setSelectedOptions(existingProduct);
  }, [existingProduct]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    console.log("existingProduct", existingProduct);
  }, []);
  const handleSelectOption = (option) => {
    console.log("ji");
    let newSelectedOptions;
    console.log(formData?.productcategory);
    // const existingProductIndex = existingProduct.findIndex(
    //   (selectedOption) => selectedOption._id === option._id
    // );
    // if (existingProductIndex !== -1) {
    //   const newExistingProducts = [...existingProduct];
    //   newExistingProducts.splice(existingProductIndex, 1);
    //   setFormData({
    //     ...formData,
    //     productcategory: [...newExistingProducts, option],
    //   });
    // } else {
    //   setFormData({
    //     ...formData,
    //     productcategory: [...formData.productcategory, option],
    //   });
    // }
    if (
      formData?.productcategory?.find(
        (selectedOption) => selectedOption._id === option._id
      )
    ) {
      newSelectedOptions = formData?.productcategory?.filter(
        (selectedOption) => selectedOption._id !== option._id
      );
    } else {
      newSelectedOptions = [...formData?.productcategory, option];
    }
    setSelectedOptions(newSelectedOptions);

    // Update formData with the new list of selected option IDs
    setFormData({
      ...formData,
      productcategory: newSelectedOptions,
    });
  };

  // Include styles directly in the component for demonstration purposes
  const dropdownStyles = {
    opacity: isOpen ? 1 : 0,
    maxHeight: isOpen ? "296px" : "0", // Use maxHeight for smooth transition
    overflowY: "auto",
    transform: isOpen ? "translateY(0)" : "translateY(-10px)",
    transition: "opacity 0.5s ease, max-height 0.5s ease, transform 0.5s ease",
    willChange: "opacity, transform",
    scrollbarWidth: "none",
  };

  return (
    <>
      <style>
        {`
          .dropdown-item:hover, .dropdown-item-selected {
            background-color: #f3f4f6; /* Tailwind bg-gray-100 */
            color: #1f2937; /* Tailwind text-gray-800 */
          }
          .dropdown-item-selected {
            background-color: #e2e8f0; /* Tailwind bg-gray-200 for selected items */
          }
        `}
      </style>
      <div className="dropdown relative" ref={dropdownRef}>
        {/* Dropdown Header */}
        <div className="dropdown-header w-full h-10 mt-5 pr-0.5 outline-none border-none bg-containerWhite rounded-xl">
          <div className="flex justify-center items-center h-full">
            <input
              type="text"
              className={`bg-slate-100 h-full outline-none border-none w-full ${
                isOpen ? "rounded-s-xl " : "rounded-xl"
              }  pl-3 text-black`}
              placeholder={text}
              onClick={() => setIsOpen(!isOpen)}
              onChange={(e) => {
                setSearchText(e.target.value);
                setSearch(e.target.value);
              }}
            />
            {isOpen ? (
              <div className=" flex bg-slate-100 justify-center h-10 rounded-e-xl items-center w-6 text-white">
                <svg
                  onClick={() => setIsOpen(false)}
                  class="h-6 w-6"
                  className="cursor-pointer "
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="black"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </div>
            ) : null}
          </div>
        </div>
        {/* Dropdown List */}
        {isOpen && (
          <div
            id="dropdownlist"
            className="dropdown-list p-3 mt-1 absolute  overflow-hidden overflow-y-auto w-full bg-navblue rounded-lg text-white border border-gray-300"
            style={dropdownStyles}
          >
            {productData?.length > 0 &&
              productData.map((option) => (
                <div
                  key={option._id}
                  className={`hover:bg-blue-200  hover:text-gray-800 bg-opacity-100  mb-2 bg-transparent rounded-xl flex gap-3 border-b border-b-gray-500 items-center p-2 w-full cursor-pointer ${
                    formData?.productcategory?.find(
                      (selectedOption) => selectedOption.id === option.id
                    )
                      ? "bg-navblue text-gray-800"
                      : ""
                  }`}
                  onClick={() => handleSelectOption(option)}
                >
                  <div className="text-gray-600 text-sm ">
                    <img
                      src={option?.images[0]}
                      className="w-16 h-20 rounded-sm"
                      alt={option?.productName}
                    />
                  </div>
                  <div className="font-normal text-white text-transform: capitalize">
                    {option?.productName}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
};
