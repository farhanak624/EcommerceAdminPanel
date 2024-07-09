import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";

export const CustomEditDropdown = ({
  options,

  formData,
  setFormData,
  productList,
  text,
  removedProducts,
  setSearchText,
  existingProduct,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [removedOptions, setRemovedOptions] = useState([]);
  const dropdownRef = useRef(null);
  const [search, setSearch] = useState("");
  const [otions2, setOptions] = useState([]);
  useEffect(() => {
    console.log("formData.productcategory", formData.productcategory);
    console.log("removedProducts", removedProducts);

    setSelectedOptions(
      formData.productcategory.filter(
        (product) => !removedProducts.includes(product)
      )
    );
    console.log("12334", existingProduct);
  }, [existingProduct, removedProducts]);

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

    // setFormData({
    //   ...formData,
    //   productcategory: [existingProduct]
    // });
  }, []);

  const handleSelectOption = (option) => {
    if (
      formData.productcategory.some((item) => item?.productId === option?._id)
    ) {
      toast("product all ready selected");
      return; // Exit the function if the option is already included
    }
    const isSelected = selectedOptions.some(
      (selectedOption) => selectedOption === option
    );
    const isRemoved = removedOptions.some(
      (removedOption) => removedOption === option
    );
    // If the clicked option is not already selected, add it to the selected options array
    if (!isSelected && !isRemoved) {
      const newSelectedOptions = [...selectedOptions, option];
      setSelectedOptions(newSelectedOptions);

      // const newSelectedOptions = selectedOptions.includes(option)
      //   ? selectedOptions.filter((selectedOption) => selectedOption !== option)
      //   : [...selectedOptions, option];
      // console.log("jio");
      // console.log("New selected options:", newSelectedOptions);
      // setSelectedOptions(newSelectedOptions);
      // console.log("newSelectedOptions", newSelectedOptions);
      // Update formData with the new list of selected options
      // console.log(newSelectedOptions, "********************");
      // console.log(formData, "????????????????????????????");
      // setFormData({
      // Merge the existing productcategory with newSelectedOptions
      const updatedProductCategory = [
        ...formData.productcategory,
        ...newSelectedOptions,
      ];

      // Remove duplicates from updatedProductCategory (optional)
      const uniqueProductCategory = updatedProductCategory.filter(
        (item, index) => updatedProductCategory.indexOf(item) === index
      );

      // Update formData with the merged list of selected options
      setFormData({
        ...formData,
        productcategory: uniqueProductCategory,
      });
    }
  };
  // const handleSelectOption = (option) => {
  //   console.log("ji");
  //   let newSelectedOptions;
  //   console.log(formData?.productcategory);
  //   // const existingProductIndex = existingProduct.findIndex(
  //   //   (selectedOption) => selectedOption._id === option._id
  //   // );
  //   // if (existingProductIndex !== -1) {
  //   //   const newExistingProducts = [...existingProduct];
  //   //   newExistingProducts.splice(existingProductIndex, 1);
  //   //   setFormData({
  //   //     ...formData,
  //   //     productcategory: [...newExistingProducts, option],
  //   //   });
  //   // } else {
  //   //   setFormData({
  //   //     ...formData,
  //   //     productcategory: [...formData.productcategory, option],
  //   //   });
  //   // }
  //   if (
  //     formData?.productcategory?.find(
  //       (selectedOption) => selectedOption._id === option._id
  //     )
  //   ) {
  //     newSelectedOptions = formData?.productcategory?.filter(
  //       (selectedOption) => selectedOption._id !== option._id
  //     );
  //   } else {
  //     newSelectedOptions = [...formData?.productcategory, option];
  //   }
  //   setSelectedOptions(newSelectedOptions);

  //   // Update formData with the new list of selected option IDs
  //   setFormData({
  //     ...formData,
  //     productcategory: newSelectedOptions,
  //   });
  // };

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
        <div className="dropdown-header w-full h-10 mt-5 pr-0.5 outline-none border-none bg-navblue rounded-xl">
          <div className="flex justify-center items-center h-full">
            <input
              type="text"
              className="bg-transparent h-full outline-none border-none w-full rounded-xl pl-3 text-white"
              placeholder={text}
              onClick={() => setIsOpen(!isOpen)}
              onChange={(e) => {
                setSearchText(e.target.value);
                setSearch(e.target.value);
              }}
            />
            <div
              className="rounded-full flex justify-center items-center w-6 text-white"
              style={{ backgroundColor: "rgba(244, 245, 250, 0.3)" }}
            >
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        {/* Dropdown List */}
        {isOpen && (
          <div
            id="dropdownlist"
            className="dropdown-list p-3 mt-1 absolute  overflow-hidden overflow-y-auto w-full bg-navblue rounded-lg text-white border border-gray-300"
            style={dropdownStyles}
          >
            {productList?.length > 0 &&
              productList.map((option) => (
                <div
                  key={option.productId}
                  className={`hover:bg-blue-200  hover:text-gray-800 bg-opacity-100 bg-transparent mb-2 rounded-xl flex gap-3 border-b border-b-gray-500 items-center p-2 w-full cursor-pointer ${
                    formData?.productcategory?.find(
                      (selectedOption) =>
                        selectedOption.productId === option.productId
                    )
                      ? "bg-white text-gray-800"
                      : ""
                  }`}
                  onClick={() => {
                    console.log("ooooo", option);
                    handleSelectOption(option);
                  }}
                >
                  <div className="text-gray-600 text-sm ">
                    <img
                      src={option?.images[0]}
                      className="w-16 rounded-sm"
                      alt={option?.productName}
                    />
                  </div>
                  <div className="font-bold text-transform: capitalize">
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
