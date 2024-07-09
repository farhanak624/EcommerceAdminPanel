import React, { useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import {
  deleteShipping,
  getShipping,
  updateShipping,
} from "../../../../Api/ApiCall";
import { CurrencyList } from "../../../../Utils/country-by-currency-code";
import ShippingChargeModal from "../../../Modals/Dashboard/ShippingChargeModal";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { loadSpinner } from "../../../../Redux/Features/NavbarSlice";

const ShippingCharge = () => {
  const dispatch = useDispatch();
  const [ShippingCharge, setShippingCharge] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [currentData, setCurrentData] = useState();
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
    dispatch(loadSpinner());
    try {
      const res = await getShipping();
      console.log("res", res?.data);
      setShippingCharge(res?.data?.shippingCharge);
      dispatch(loadSpinner());
    } catch (error) {
      dispatch(loadSpinner());
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
    <div className="bg-containerWhite w-full  justify-center h-full rounded-xl min-h-[600px] shadow-sm p-4">
      {isModal && (
        <ShippingChargeModal callback={callback} editData={currentData} />
      )}
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
                onClick={() => {
                  setCurrentData({});
                  setIsModal(!isModal);
                }}
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
            ></label>
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
                        ["e", "E", "+", "-"].includes(e.key) &&
                        e.preventDefault()
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
      </div>
      <div className=" mt-6">
        <div className="table-responsive overflow-x-auto">
          <table className="table align-middle table-nowrap mb-0 h-9 w-full overflow-x-auto">
            <thead className="bg-gray-100 h-10">
              <tr>
                <th>Country</th>
                <th>Charge</th>
                <th>Minumum Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {ShippingCharge.length > 0 ? (
                ShippingCharge?.map((chargeData) => (
                  <tr className="text-center border-b border-gray-200">
                    <td className="py-1 text-transform: capitalize">
                      {chargeData?.country}
                    </td>
                    <td className="py-1">{chargeData?.charge}</td>
                    <td className="py-1">{chargeData?.minAmount}</td>
                    <td className="py-1">
                      <button
                        onClick={() => {
                          setIsModal(!isModal);
                          setCurrentData(chargeData);
                        }}
                        className="w-9 h-9  hover:bg-slate-200 rounded-full"
                      >
                        <svg
                          width="23px"
                          height="23px"
                          className="ml-1.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="m3.99 16.854-1.314 3.504a.75.75 0 0 0 .966.965l3.503-1.314a3 3 0 0 0 1.068-.687L18.36 9.175s-.354-1.061-1.414-2.122c-1.06-1.06-2.122-1.414-2.122-1.414L4.677 15.786a3 3 0 0 0-.687 1.068zm12.249-12.63 1.383-1.383c.248-.248.579-.406.925-.348.487.08 1.232.322 1.934 1.025.703.703.945 1.447 1.025 1.934.058.346-.1.677-.348.925L19.774 7.76s-.353-1.06-1.414-2.12c-1.06-1.062-2.121-1.415-2.121-1.415z"
                            fill="#000000"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent click from bubbling to the card div
                          Swal.fire({
                            title: "Are you sure?",
                            text: "Do you want to delete this Shipping charge!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, delete it!",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              // If confirmed, perform the delete operation
                              // You can place your delete logic here
                              deleteShipping({ country: chargeData?.country })
                                .then((data) => {
                                  if (result.isConfirmed) {
                                  }
                                  Swal.fire(
                                    "Deleted!",
                                    "Your Shipping charge has been deleted.",
                                    "success"
                                  );
                                  getShippingCharge();
                                })
                                .catch((err) => {
                                  toast.error(err.response.data.message);
                                  Swal(
                                    "Sorry!",
                                    err.response.data.message,
                                    "error"
                                  );
                                });

                              // For demonstration purposes, let's just log the deletion
                              console.log("Item deleted");
                            }
                          });
                        }}
                        className="w-9 h-9  hover:bg-slate-200 rounded-full"
                      >
                        <svg
                          fill="#FF0000"
                          className="ml-1.5"
                          width="23px"
                          height="23px"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z"></path>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="text-center">
                  <td className="text-red-600 font-medium" colSpan="4">
                    Shipping Charge Not added yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShippingCharge;
