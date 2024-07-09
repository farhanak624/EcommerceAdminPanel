import React, { useEffect, useRef, useState } from "react";
import { movieGenre } from "../pages/ventor/flicks/moviegenreLis";
import { getGeners } from "../../Api/ApiCall";

const AddMultiSelectGenre = ({ formData, setformData }) => {
  const [optionlist, setOptionlist] = useState([]);
  const [genresList, setGenresList] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchKey, setsearchKey] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    console.log({ selectedValues });
    setformData({
      ...formData,
      genres: selectedValues,
    });
  }, [selectedValues]);
  useEffect(() => {
    Geners();
  }, [optionlist]);
  const Geners = () => {
    getGeners()
      .then((data) => {
        console.log("geners", data?.data.genres);
        setGenresList(data?.data.genres);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  const handleRemove = (_id, index) => {
    const updatedValues = selectedValues.filter((genre) => genre._id !== _id);

    setSelectedValues(updatedValues);

    setformData({
      ...formData,
      genres: updatedValues.map((genre) => genre._id), // Update genres to save only the _id
    });
  };

  const handleSelectionChange = (option) => {
    const index = selectedValues.findIndex((value) => value._id === option._id);
    if (index !== -1) {
      // If the genre is already selected, remove it
      const updatedValues = selectedValues.filter(
        (value) => value._id !== option._id
      );
        setformData({
          ...formData,
          genres: updatedValues.map((genre) => genre._id),
        });
      setSelectedValues(updatedValues);
    } else {
      // If the genre is not selected, add its _id to the selected values
      const updatedValues = [
        ...selectedValues,
        { _id: option._id, type: option.type },
      ];
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
      <div className="w-full mt-3">
        <div className="">
          <div
            onClick={() => {
              setShowDropdown(true);
              setOptionlist(genresList);
            }}
            className="rounded-lg shadow shadow-black/20 outline-none bg-[rgba(244,245,250,1)] border-none flex flex-wrap mb-3 px-2 py-2"
          >
            {" "}
            {selectedValues.length > 0 ? (
              ""
            ) : (
              <div className="flex items-center justify-between w-full">
                <p className="text-slate-400">Select Genre</p>
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
                    key={value._id}
                    className="bg-gray-200 rounded-md flex items-center px-2 py-1 mr-2"
                  >
                    {value.type} {/* Render the genre type */}
                    <button
                      type="button"
                      onClick={() => handleRemove(value._id, index)}
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

        {showDropdown ? (
          <div
            className=" w-full bg-transparent h-32 overflow-y-auto rounded-lg shadow-md mt-1 overflow-hidden mb-3"
            ref={dropdownRef}
          >
            <ul className="py-1">
              {optionlist.map((option, index) => (
                <li
                  key={option?._id}
                  onClick={() => handleSelectionChange(option, index)}
                  className={`px-4 py-2 cursor-pointer border rounded-lg hover:bg-gray-200  ${
                    selectedValues.includes(option) ? "bg-gray-200" : ""
                  }`}
                >
                  {option?.type}
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

export default AddMultiSelectGenre;
