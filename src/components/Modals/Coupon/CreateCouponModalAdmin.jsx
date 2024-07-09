import React, { useEffect, useState } from "react";
import { addCoupons, adminAddCoupons } from "../../../Api/ApiCall";
import { toast } from "react-toastify";
import { inputNumberPreventScroll } from "../../../Utils/utils";
import { useDispatch } from "react-redux";
import { loadSpinner } from "../../../Redux/Features/NavbarSlice";

const AdminAddCouponModal = ({ callback, admin }) => {
  const dispatch = useDispatch();
  const [couponName, setCouponName] = useState("");
  const [description, setDescription] = useState("");
  const [minimum, setMinimum] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [noOfUsers, setNoOfUsers] = useState("");
  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState("");
  const [errors, setErrors] = useState({});
  useEffect(() => {
    inputNumberPreventScroll("discount");
    inputNumberPreventScroll("minimum");
    inputNumberPreventScroll("noOf");
  }, []);
  const validateForm = () => {
    let tempErrors = {};
    if (!couponName) tempErrors.couponName = "Coupon name is required.";
    if (!discountType || discountType === "Select type")
      tempErrors.discountType = "Please select a type.";
    if (!discount) tempErrors.discount = "Discount is required.";
    console.log(discountType === "percentage" && (!discount || discount > 100));
    if (discountType === "percentage" && (!discount || discount > 100))
      tempErrors.discountpercent = "Enter a valid percentage.";
    const currentDate = new Date().toISOString().split("T")[0];
    if(discountType ==="price" && discount > minimum){
      tempErrors.discount = "Discount must be less than minimum price";
    }
    if (startDate < currentDate)
      tempErrors.startDate = "Start date must be today or later.";
    if (endDate < startDate)
      tempErrors.endDate = "End date must be after start date.";
    if (!noOfUsers) tempErrors.noOfUsers = "Number of users is required.";
    if (!description) tempErrors.description = "Description is required.";
    if (!minimum) tempErrors.minimum = "Minimum price is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit =async () => {
    if (validateForm()) {
      const utcStartDate = new Date(startDate).toISOString();
      const utcEndDate = new Date(endDate).toISOString();

      const wholeData = {
        name: couponName,
        description: description,
        count: minimum,
        validity: {
          startDate: utcStartDate,
          endDate: utcEndDate,
        },
        minPrice: minimum,
        discount: discount,
        discountType: discountType,
        maximumPerUser: noOfUsers,
      };
      // console.log({wholeData});
      // Proceed with form submission logic here
      try {
        if (admin) {
        const response =  await  adminAddCoupons(wholeData);
          dispatch(loadSpinner());
          callback();
          toast.success("Coupon added successfully");
          dispatch(loadSpinner());
        } else {
         const response= await addCoupons(wholeData);
          dispatch(loadSpinner());
          callback();
          toast.success("Coupon added successfully");
          dispatch(loadSpinner());
        }
      } catch (error) {
        console.log("sssssss", error);
        toast.error(error.response.data.message);
      }
    }
  };
  return (
    <div className="fixed inset-0 z-30 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="flex justify-between">
          <h3 className="text-md leading-6 font-bold text-gray-900">
            Add coupon
          </h3>
          <button type="button" onClick={callback}>
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
        <form className="space-y-6 mt-4">
          <div>
            <label
              htmlFor="couponName"
              className="block text-sm font-medium text-gray-700"
            >
              Coupon name
            </label>
            <input
              type="text"
              id="couponName"
              onChange={(e) => setCouponName(e.target.value)}
              name="couponName"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Extra10"
            />
            {errors.couponName && (
              <p className="text-red-500 text-xs italic">{errors.couponName}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="couponName"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description..."
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              name=""
              id=""
              maxLength={150}
              cols="30"
              rows="2"
            >
              {description}
            </textarea>
            {errors.description && (
              <p className="text-red-500 text-xs italic">
                {errors.description}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700"
            >
              Discount Type
            </label>
            <select
              id="type"
              name="type"
              onChange={(e) => setDiscountType(e.target.value)}
              className="mt-1 border block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value={""}>Select type</option>
              <option value={"percentage"}>Percentage</option>
              <option value={"price"}>Fixed Amount</option>
            </select>
            {errors.discountType && (
              <p className="text-red-500 text-xs italic">
                {errors.discountType}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <div>
              <label
                htmlFor="minimum"
                className="block text-sm font-medium text-gray-700"
              >
                Minimum Price
              </label>
              <input
                type="number"
                id="minimum"
                name="minimum"
                onKeyDown={(e) =>
                  ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                }
                onChange={(e) => setMinimum(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Price"
              />
              {errors.minimum && (
                <p className="text-red-500 text-xs italic">{errors.minimum}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="minimum"
                className="block text-sm font-medium text-gray-700"
              >
                Discount
              </label>
              <input
                type="number"
                id="discount"
                name="minimum"
                onKeyDown={(e) =>
                  ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                }
                onChange={(e) => {
                  const discount = parseInt(e.target.value);
                  console.log(discount);
                  setDiscount(discount);
                }}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="No"
              />

              <p className="text-red-500 text-xs italic">
                {errors?.discount ? errors?.discount : errors?.discountpercent}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="">
              <label
                htmlFor="dueDate"
                className="block text-sm font-medium text-gray-700"
              >
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.startDate && (
                <p className="text-red-500 text-xs italic">
                  {errors.startDate}
                </p>
              )}
            </div>
            <div className="">
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-gray-700"
              >
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.endDate && (
                <p className="text-red-500 text-xs italic">{errors.endDate}</p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="noOf"
              className="block text-sm font-medium text-gray-700"
            >
              Maximum per user
            </label>
            <input
              type="number"
              onKeyDown={(e) =>
                ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
              }
              id="noOf"
              name="noOf"
              onChange={(e) => setNoOfUsers(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="5"
            />
            {errors.noOfUsers && (
              <p className="text-red-500 text-xs italic">{errors.noOfUsers}</p>
            )}
          </div>
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Coupon
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAddCouponModal;
