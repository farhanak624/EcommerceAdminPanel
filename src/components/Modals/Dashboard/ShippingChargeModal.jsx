import React, { useState, useEffect } from "react";
import { CurrencyList } from "../../../Utils/country-by-currency-code";
import Select from "react-select";
import { addShipping, updateShipping } from "../../../Api/ApiCall";
import { toast } from "react-toastify";

const ShippingChargeModal = ({ callback, editData }) => {
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [amount, setAmount] = useState("");
  const [minimumAmount, setMinimumAmount] = useState("");
  const options = CurrencyList.map((country) => ({
    label: `${country.country}`,
    value: country.currency_code,
  }));

  useEffect(() => {
    if (editData?.country) {
      const countryData = options.find(
        (option) =>
          option.label.toLowerCase() === editData.country.toLowerCase()
      );
      console.log("countryData", countryData);
      setSelectedCurrency(countryData);
    }
    if (editData?.charge) {
      setAmount(editData.charge);
    }
    if (editData?.minAmount) {
      setMinimumAmount(editData.minAmount);
    }
  }, [editData]);

  const handleCurrencyChange = (selectedOption) => {
    setSelectedCurrency(selectedOption);
  };

  const handleSubmit = async () => {
    if (Object.keys(editData).length > 0) {
      const wholeData = {
        shippingCharge: parseInt(amount),
        minAmount: parseInt(minimumAmount),
        country: selectedCurrency?.label,
      };
      console.log(wholeData);
      try {
        const response = await updateShipping(wholeData);
        if (response.status === 200) {
          toast.success("Shipping Charge Added Successfully");
          callback();
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      if (!amount || !selectedCurrency || !minimumAmount) {
        toast.error("Please fill all the fields");
        return;
      }
      const wholeData = {
        shippingCharge: parseInt(amount),
        minAmount: parseInt(minimumAmount),
        country: selectedCurrency?.label,
      };

      try {
        const response = await addShipping(wholeData);
        if (response.status === 200) {
          toast.success("Shipping Charge Added Successfully");
          callback();
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-36 mx-auto border w-[30rem] shadow-lg rounded-xl bg-white">
        <div className="text-center">
          <h3 className="text-lg text-start font-medium rounded-xl border shadow text-gray-900 p-4">
            {Object.keys(editData).length > 0
              ? "Edit Shipping Charge"
              : "Add Shipping Charge"}
          </h3>

          {/* Flex container for input and file input */}
          <div className="flex flex-col md:flex-row items-center justify-between px-7 py-6 space-y-3 md:space-y-0 md:space-x-3">
            <div className="w-full md:w-auto">
              <input
                type="number"
                placeholder="Charge"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                onKeyDown={(e) =>
                  ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                }
                className="px-3 py-2 border shadow-sm rounded-lg text-gray-700 focus:outline-none focus:border-blue-500 w-full"
              />
            </div>
            <div className="w-full md:w-auto">
              {Object.keys(editData).length > 0 ? (
                ""
              ) : (
                <Select
                  value={selectedCurrency}
                  onChange={handleCurrencyChange}
                  options={options}
                  className="w-full"
                  placeholder="Country"
                />
              )}
            </div>
            <div className="w-full md:w-auto">
              <input
                type="number"
                value={minimumAmount}
                placeholder="Minimum Amount"
                onChange={(e) => setMinimumAmount(e.target.value)}
                onKeyDown={(e) =>
                  ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                }
                className="px-3 py-2 border shadow-sm rounded-lg text-gray-700 focus:outline-none focus:border-blue-500 w-full"
              />
            </div>
          </div>

          {/* Description Box */}
          <div className="items-center px-4 py-3">
            <button
              type="button"
              onClick={handleSubmit}
              id="ok-btn"
              className="px-4 py-2 bg-navblue text-white text-base font-medium rounded-xl shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              {Object.keys(editData).length > 0 ? "Update" : "Add"}
            </button>
          </div>

          {/* Close Button */}
          <div className="absolute top-0 right-0 p-4">
            <button
              className="text-gray-400 hover:text-gray-900"
              onClick={callback}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingChargeModal;
