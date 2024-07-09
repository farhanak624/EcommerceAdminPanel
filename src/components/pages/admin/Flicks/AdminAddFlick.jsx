import React, { useEffect, useState } from "react";
import currencySymbolMap from "currency-symbol-map";
import { addFlickPlanAdmin, editFlickPlan } from "../../../../Api/ApiCall";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminAddFlick = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [flickdata, setFlickData] = useState(location.state?.data || null);
  console.log("data:", flickdata);

  const currencies = Object.keys(currencySymbolMap);
  const [showDropdown, setShowDropdown] = useState(false);
  const [planName, setPlanName] = useState("");
  const [currency, setCurrency] = useState("");
  const [currencyList, setCurrencyList] = useState([]);
  const [description, setDescription] = useState(["", "", ""]);
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [offer, setOffer] = useState("");
  const [id, setId] = useState("");
  const [downloadOption, setDownloadOption] = useState(false);

  useEffect(() => {
    // Set initial state values if flickdata exists
    if (flickdata) {
      setPlanName(flickdata.name || "");
      setCurrency(flickdata.currency || "INR");
      setDescription(flickdata.description || ["", "", ""]);
      setAmount(flickdata.amount || "");
      setDuration(flickdata.duration || "");
      setOffer(flickdata.offer || "");
      setDownloadOption(flickdata.isDownloadable || false);
    }
  }, [flickdata]);

  useEffect(() => {
    const fetchCurrencyList = async () => {
      try {
        const response = await fetch(
          "https://openexchangerates.org/api/currencies.json"
        );
        const data = await response.json();
        const currencies = Object.entries(data).map(([code, name]) => ({
          code,
          name,
        }));
        setCurrencyList(currencies);
        // console.log("Currency list fetched:", currencies);
      } catch (error) {
        console.error("Error fetching currency list:", error);
      }
    };

    fetchCurrencyList();
  }, []);

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleCurrencySelect = (currency) => {
    setCurrency(currency.code);
    console.log("Currency selected:", currency);
    setShowDropdown(false);
  };

  const handleDescriptionChange = (index, value) => {
    setDescription((prevDescriptions) => {
      const newDescriptions = [...prevDescriptions];
      newDescriptions[index] = value;
      return newDescriptions;
    });
  };

  const handleSave = async () => {
    try {
      // if (!planName || !currency || !description.every(field => field && field.trim()) || !amount || !duration ) {
      //   toast.error("Please fill in all fields.");
      //   return;
      // }
      const MAX_DESCRIPTION_WORDS = 100;

      const isValidDescription = (description) => {
        if (!description.trim()) {
          // If description is empty, return false
          return false;
        }
        const words = description.trim().split(/\s+/);
        return words.length <= MAX_DESCRIPTION_WORDS;
      };

      if (
        !planName ||
        !currency ||
        !description.every((field) => isValidDescription(field)) ||
        !amount ||
        !duration
      ) {
        toast.error(
          "Please fill in all fields with descriptions containing 100 words or fewer."
        );
        return;
      }

      let response;
      if (flickdata) {
        console.log("isDownloadable", {
          planName,
          currency,
          description,
          amount,
          duration,
          offer,
          isDownloadable: downloadOption,
        });
        response = await editFlickPlan(flickdata._id, {
          planName,
          currency,
          description,
          amount,
          duration,
          offer,
          isDownloadable: downloadOption,
        });
        if (response.data.success) {
          toast.success("Plan edited successfully");
        }
      } else {
        console.log("isDownloadable", {
          planName,
          currency,
          description,
          amount,
          duration,
          offer,
          isDownloadable: downloadOption,
        });
        response = await addFlickPlanAdmin({
          planName,
          currency,
          description,
          amount: parseInt(amount),
          duration,
          offer,
          isDownloadable: downloadOption,
        });
        if (response.data.success) {
          toast.success("Plan created successfully");
        }
      }

      console.log("response: ", response);

      if (response.data.success) {
        setPlanName("");
        setCurrency("INR");
        setDescription(["", "", ""]);
        setAmount("");
        setDuration("");
        setOffer("");

        navigate("/admin/flicks");
      }
    } catch (error) {
      console.log("error in adding/editing flicks: ", error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div>
      <h1 className="font-bold">Add Plan</h1>
      <div className="flex text-sm mt-5 gap-4 flex-col md:flex-row p-3 bg-containerWhite rounded-lg">
        <div className="w-full md:w-[50%]">
          <div className=" p-3 rounded-md">
            <p className="mt-4 mb-1">Plan Name</p>
            <input
              type="text"
              className="bg-bodycolur  w-full p-1 outline-none border border-gray-200 rounded-md shadow-sm"
              placeholder="Enter Plan name"
              name=""
              id=""
              value={planName}
              onChange={(e) => {
                setPlanName(e.target.value);
              }}
            />
            <p className="mt-5 mb-1">Specification 1</p>
            <input
              type="text"
              className="bg-bodycolur  w-full p-1 outline-none border border-gray-200 rounded-md shadow-sm"
              placeholder="Enter Plan Specification"
              name=""
              id=""
              value={description[0]}
              onChange={(e) => handleDescriptionChange(0, e.target.value)}
            />
            <p className="mt-5 mb-1">Specification 2</p>
            <input
              type="text"
              className="bg-bodycolur w-full p-1 outline-none border border-gray-200 rounded-md shadow-sm"
              placeholder="Enter Plan Specification"
              name=""
              id=""
              value={description[1]}
              onChange={(e) => handleDescriptionChange(1, e.target.value)}
            />
            <p className="mt-5 mb-1">Specification 3</p>
            <input
              type="text"
              className="bg-bodycolur w-full p-1 outline-none border border-gray-200 rounded-md shadow-sm"
              placeholder="Enter Plan Specification"
              name=""
              id=""
              value={description[2]}
              onChange={(e) => handleDescriptionChange(2, e.target.value)}
            />
          </div>
        </div>

        <div className="w-full notfi md:w-[50%]">
          <div className=" p-3 rounded-md">
            <p className="mt-4 mb-1">Prize</p>
            <input
              type="number"
              className="bg-bodycolur w-full p-1 outline-none border border-gray-200 rounded-md shadow-sm"
              placeholder="Enter Plan Prize"
              name=""
              id=""
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
            <p className="mt-5 mb-1">Offer(%)</p>
            <input
              type="number"
              className="bg-bodycolur w-full p-1 outline-none border border-gray-200 rounded-md shadow-sm"
              placeholder="Enter Discount (Optional)"
              name=""
              id=""
              value={offer}
              onChange={(e) => {
                const inputOffer = e.target.value;
                // Check if the entered offer is less than 100
                if (
                  inputOffer === "" ||
                  (inputOffer >= 0 && inputOffer <= 100)
                ) {
                  setOffer(inputOffer);
                }
              }}
            />
            <p className="mt-5 mb-1">Duration (Days)</p>
            <div className="relative">
              <input
                type="number"
                className="bg-bodycolur w-full p-1 outline-none border border-gray-200 rounded-md shadow-sm"
                placeholder="Enter Plan Duration"
                name=""
                id=""
                value={duration}
                onChange={(e) => {
                  setDuration(e.target.value);
                }}
              />
              {/* <svg className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2" width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.7381 1.62999C15.6003 0.709472 14.8059 0 13.8472 0C12.9251 0 12.1534 0.654964 11.9735 1.52407H10.8177C10.6371 0.654944 9.86608 0 8.94401 0C8.02193 0 7.25015 0.654964 7.06949 1.52407L5.91455 1.52485C5.73387 0.655724 4.96288 0.000778972 4.0408 0.000778972C3.08212 0.000778972 2.28854 0.709473 2.15069 1.63C1.41863 1.88465 0.890625 2.58011 0.890625 3.39783V14.127C0.890625 15.1597 1.73092 16 2.76359 16H15.1252C16.1579 16 16.9982 15.1597 16.9982 14.127L16.9974 3.39783C16.9974 2.59647 16.4803 1.88933 15.7381 1.62999ZM2.76281 2.30364H4.3562C4.57114 2.30364 4.74559 2.12919 4.74559 1.91425C4.74559 1.69932 4.57114 1.52487 4.3562 1.52487H2.97542C3.13507 1.09031 3.55094 0.77957 4.04001 0.77957C4.66614 0.77957 5.17547 1.2889 5.17547 1.91425C5.17547 2.40332 4.86395 2.82154 4.42861 2.98042C4.41382 2.77871 4.2456 2.61906 4.04001 2.61906C3.82507 2.61906 3.65062 2.79351 3.65062 3.00845V3.89237C3.65062 4.1073 3.82507 4.28175 4.04001 4.28175C4.25494 4.28175 4.42939 4.1073 4.42939 3.89237V3.78801C5.17236 3.63381 5.758 3.0466 5.91297 2.30365H9.25937C9.47431 2.30365 9.64875 2.1292 9.64875 1.91427C9.64875 1.69933 9.47431 1.52488 9.25937 1.52488H7.87858C8.03823 1.09032 8.45488 0.779582 8.94397 0.779582C9.5701 0.779582 10.0787 1.28891 10.0787 1.91427C10.0787 2.40334 9.76714 2.82155 9.3318 2.98043C9.31778 2.77873 9.14878 2.61907 8.94319 2.61907C8.72825 2.61907 8.5538 2.79352 8.5538 3.00846V3.89238C8.5538 4.10732 8.72825 4.28176 8.94319 4.28176C9.15813 4.28176 9.33257 4.10732 9.33257 3.89238V3.78802C10.0755 3.63382 10.6612 3.04661 10.8154 2.30366H14.1618C14.3767 2.30366 14.5512 2.12922 14.5512 1.91428C14.5512 1.69934 14.3767 1.52489 14.1618 1.52489H12.781C12.9406 1.09033 13.3573 0.779593 13.8456 0.779593C14.4717 0.779593 14.981 1.28892 14.981 1.91428C14.981 2.40335 14.6695 2.82156 14.2342 2.98044C14.2194 2.77874 14.0512 2.61908 13.8456 2.61908C13.6306 2.61908 13.4562 2.79353 13.4562 3.00847V3.89239C13.4562 4.10733 13.6306 4.28178 13.8456 4.28178C14.0605 4.28178 14.235 4.10733 14.235 3.89239V3.78803C14.9257 3.64474 15.4802 3.12685 15.6796 2.45787C16.0044 2.65178 16.217 3.00535 16.217 3.39785V4.67817H1.66926V3.39785C1.66926 2.7943 2.16002 2.30364 2.76281 2.30364ZM15.1244 15.2205H2.76281C2.15927 15.2205 1.66862 14.7299 1.66862 14.1263L1.6694 5.45699H16.2193V14.1263C16.2185 14.7299 15.728 15.2205 15.1244 15.2205Z" fill="#98A2B3" />
                <path d="M9.68543 7.12598H8.19017C7.97523 7.12598 7.80078 7.30042 7.80078 7.51536C7.80078 7.7303 7.97523 7.90475 8.19017 7.90475H9.68543C9.90037 7.90475 10.0748 7.7303 10.0748 7.51536C10.0748 7.29965 9.90037 7.12598 9.68543 7.12598Z" fill="#98A2B3" />
                <path d="M9.68543 9.83594H8.19017C7.97523 9.83594 7.80078 10.0104 7.80078 10.2253C7.80078 10.4403 7.97523 10.6147 8.19017 10.6147H9.68543C9.90037 10.6147 10.0748 10.4403 10.0748 10.2253C10.0748 10.0096 9.90037 9.83594 9.68543 9.83594Z" fill="#98A2B3" />
                <path d="M9.68543 12.4561H8.19017C7.97523 12.4561 7.80078 12.6305 7.80078 12.8454C7.80078 13.0604 7.97523 13.2348 8.19017 13.2348H9.68543C9.90037 13.2348 10.0748 13.0604 10.0748 12.8454C10.0748 12.6305 9.90037 12.4561 9.68543 12.4561Z" fill="#98A2B3" />
                <path d="M5.56434 7.12598H4.06907C3.85413 7.12598 3.67969 7.30042 3.67969 7.51536C3.67969 7.7303 3.85413 7.90475 4.06907 7.90475H5.56434C5.77927 7.90475 5.95372 7.7303 5.95372 7.51536C5.95372 7.29965 5.77927 7.12598 5.56434 7.12598Z" fill="#98A2B3" />
                <path d="M5.56434 9.83594H4.06907C3.85413 9.83594 3.67969 10.0104 3.67969 10.2253C3.67969 10.4403 3.85413 10.6147 4.06907 10.6147H5.56434C5.77927 10.6147 5.95372 10.4403 5.95372 10.2253C5.95372 10.0096 5.77927 9.83594 5.56434 9.83594Z" fill="#98A2B3" />
                <path d="M5.56434 12.4561H4.06907C3.85413 12.4561 3.67969 12.6305 3.67969 12.8454C3.67969 13.0604 3.85413 13.2348 4.06907 13.2348H5.56434C5.77927 13.2348 5.95372 13.0604 5.95372 12.8454C5.95372 12.6305 5.77927 12.4561 5.56434 12.4561Z" fill="#98A2B3" />
                <path d="M13.8104 7.12598H12.3152C12.1002 7.12598 11.9258 7.30042 11.9258 7.51536C11.9258 7.7303 12.1002 7.90475 12.3152 7.90475H13.8104C14.0254 7.90475 14.1998 7.7303 14.1998 7.51536C14.1998 7.29965 14.0254 7.12598 13.8104 7.12598Z" fill="#98A2B3" />
                <path d="M13.8104 9.83594H12.3152C12.1002 9.83594 11.9258 10.0104 11.9258 10.2253C11.9258 10.4403 12.1002 10.6147 12.3152 10.6147H13.8104C14.0254 10.6147 14.1998 10.4403 14.1998 10.2253C14.1998 10.0096 14.0254 9.83594 13.8104 9.83594Z" fill="#98A2B3" />
                <path d="M13.8104 12.4561H12.3152C12.1002 12.4561 11.9258 12.6305 11.9258 12.8454C11.9258 13.0604 12.1002 13.2348 12.3152 13.2348H13.8104C14.0254 13.2348 14.1998 13.0604 14.1998 12.8454C14.1998 12.6305 14.0254 12.4561 13.8104 12.4561Z" fill="#98A2B3" />
              </svg> */}
            </div>
            <p className="mt-5 mb-1">Currency</p>
            <div className="relative">
              <input
                type="text"
                className="bg-bodycolur w-full p-1 outline-none border border-gray-200 rounded-md shadow-sm"
                placeholder="Enter Currency"
                value={currency}
                readOnly
                onClick={handleToggleDropdown}
              />
              <svg
                onClick={handleToggleDropdown}
                className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2"
                width="13"
                height="8"
                viewBox="0 0 13 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.13388 2.38388L5.61612 6.86612C6.10427 7.35427 6.89573 7.35427 7.38388 6.86612L11.8661 2.38388C12.6536 1.59643 12.0959 0.25 10.9822 0.25H2.01777C0.904136 0.25 0.346428 1.59643 1.13388 2.38388Z"
                  fill="#98A2B3"
                />
              </svg>
              {showDropdown && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-md max-h-40 overflow-y-auto">
                  {currencyList.map((currency) => (
                    <div
                      key={currency.code}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleCurrencySelect(currency)}
                    >
                      {currency.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-5">
              <p className="mb-2">Enable Download Option:</p>
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="downloadOption"
                    value="yes"
                    checked={downloadOption === true}
                    onChange={() => {
                      // setDownloadOption();
                      setDownloadOption(true);
                    }}
                    className="form-radio h-5 w-5 text-navblue"
                  />
                  <span className="ml-2 text-gray-700">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="downloadOption"
                    value="no"
                    checked={downloadOption === false}
                    onChange={() => setDownloadOption(false)}
                    className="form-radio h-5 w-5 text-navblue"
                  />
                  <span className="ml-2 text-gray-700">No</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center bg-containerWhite rounded-lg">
        <button
          onClick={handleSave}
          className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-8"
        >
          {flickdata ? "Save" : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default AdminAddFlick;
