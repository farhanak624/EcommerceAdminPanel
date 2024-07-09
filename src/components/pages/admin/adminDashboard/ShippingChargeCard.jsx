import React, { useEffect, useState } from "react";
import { getShipping, updateShipping } from "../../../../Api/ApiCall";
import Select from "react-select";
import { CurrencyList } from "../../../../Utils/country-by-currency-code";
import ShippingChargeModal from "../../../Modals/Dashboard/ShippingChargeModal";
import { toast } from "react-toastify";

const ShippingChargeCard = () => {
  const [ShippingCharge, setShippingCharge] = useState();
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const [amount, setAmount] = useState("");
  useEffect(() => {
    getShippingCharge();
  }, [isModal]);
  const options = CurrencyList.map((currency) => ({
    value: currency.currency_code,
    label: `${currency.country} (${currency.currency_code})`,
  }));
  const callback = () => {
    setIsModal(!isModal);
  };
  const handleCurrencyChange = (selectedOption) => {
    setSelectedCurrency(selectedOption);
  };
  const getShippingCharge = async () => {
    try {
      const res = await getShipping();
      console.log("res", res?.data);
      setShippingCharge(res?.data?.shippingCharge);
    } catch (error) {
      console.log("error", error);
    }
  };
  const updateShippingCharge = async () => {
    const wholeData = {
        shippingCharge: amount,
        currencyCode: selectedCurrency?.value,
    };
    console.log("wholeData", wholeData);
    const response = await updateShipping(wholeData);
    console.log("response", response);
    toast.success("Shipping Charge Updated Successfully");
    getShippingCharge();
    try {
    } catch (error) {
      console.log("error", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <div className="bg-white shadow-sm rounded-lg p-4">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold text-gray-700">
            Shipping Charge
          </h2>
          {ShippingCharge?.charge ? (
            ""
          ) : (
            <button
              onClick={() => setIsModal(!isModal)}
              type="button"
              className="bg-navblue border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Shipping Charge
            </button>
          )}
        </div>
        <p className="text-sm text-gray-500">
          Manage the shipping charges for different regions.
        </p>
        <div>
          <label
            htmlFor="shippingCharge"
            className="block text-sm font-medium text-gray-700"
          >
            <p className="font-bold">
              {" "}
              Current Charge:
              {ShippingCharge?.charge
                ? ShippingCharge?.charge
                : "No Charge Added"}{" "}
              {ShippingCharge?.currency ? ShippingCharge?.currency : ""}
            </p>
          </label>
        </div>
        {ShippingCharge?.charge ? (
          <>
            <div className="mt-4">
              <div className="flex">
                <label
                  htmlFor="shippingCharge"
                  className="block text-sm font-medium text-gray-700"
                >
                  Set New Charge:
                </label>
              </div>
              <div className="flex ">
                <div className="mt-1 w-1/2 relative rounded-md shadow-sm">
                  <input
                    type="number"
                    name="shippingCharge"
                    value={amount}
                    id="shippingCharge"
                    onKeyDown={(e) =>
                      ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                    }
                    onChange={(e) => setAmount(e.target.value)}
                    className="outline-none px-2  w-full border-gray-300 rounded-md py-2 border"
                    placeholder="0.00"
                  />
                </div>
                <div className="w-1/2 rounded-md shadow-sm">
                  <Select
                    id="currency"
                    value={selectedCurrency}
                    onChange={handleCurrencyChange}
                    options={options}
                    className="outline-none px-2 w-full border-gray-300 rounded-md p-0.5 py-1"
                    placeholder="Search for a Currency"
                  />
                </div>
              </div>
            </div>
            <button
              onClick={updateShippingCharge}
              type="button"
              className="mt-4 w-full bg-navblue border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Update Charge
            </button>
          </>
        ) : (
          ""
        )}
      </div>
      {isModal && <ShippingChargeModal callback={callback} />}
    </div>
  );
};

export default ShippingChargeCard;
