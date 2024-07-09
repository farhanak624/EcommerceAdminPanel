import React, { useEffect, useState, useRef } from "react";

const ConnectBox = ({ flicksLists, setFormData, formData }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [SearchBoxData, setSearchBoxData] = useState("");
  const dropdownRef = useRef(null);
  useEffect(() => {
    console.log(flicksLists, "flicksLists");
  }, [flicksLists]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    if (!searchText) {
      setSearchResults([]);
      return;
    }
    const filterByFirstLetters = (flicksLists, letters) => {
      return flicksLists.filter((item) => {
        const nameStart = item.name.slice(0, letters.length).toLowerCase();
        return nameStart === letters.toLowerCase();
      });
    };
    const filteredArray = filterByFirstLetters(flicksLists, searchText);
    setSearchResults(filteredArray);
  }, [flicksLists, searchText]);
  const handleConnectSelection = (flicksId, flickName) => {
    setSearchText(flickName);
    setSearchBoxData(flickName);
    setSearchResults(false);
    setFormData({
      ...formData,
      connect: flicksId,
    });
  };
  return (
    <div class="relative w-auto " ref={dropdownRef}>
      <>
        <div class="flex justify-between overflow-hidden rounded-md bg-bodycolur shadow shadow-black/20">
          <input
            value={searchText}
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
            onClick={() => {
              setSearchResults(flicksLists);
              if (flicksLists.length === 0) {
                return;
              }
            }}
            class={`block w-full flex-1 py-2 px-3 focus:outline-none  ${
              searchResults.length > 0
                ? "bg- text-black"
                : "bg-bodycolur text-gray-700"
            }`}
            placeholder="Search Series or Movie..."
          />
          <span class=" cursor-pointer items-center  rounded-md bg-navblue px-3 py-2 ">
            <button
              type="button"
              // onClick={() => {
              //   callback();
              // }}
              className="w-6 h-6 bg-navblue rounded-3xl text-2xl text-white"
            >
              <svg
                width="23"
                height="22"
                viewBox="0 0 23 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.7782 8.32737C16.7782 3.76982 13.0646 0 8.45079 0C3.83698 0 0.179688 3.76982 0.179688 8.32737C0.179688 12.8849 3.89324 16.6547 8.50705 16.6547C10.5889 16.6547 12.5019 15.867 13.9649 14.5729L21.392 22L22.1797 21.2123L14.7526 13.7852C15.9904 12.3223 16.7782 10.4092 16.7782 8.32737ZM8.50705 1.12532C12.4457 1.12532 15.7091 4.33248 15.7091 8.32737C15.7091 12.3223 12.5019 15.5294 8.50705 15.5294C4.51217 15.5294 1.30501 12.266 1.30501 8.32737C1.30501 4.38875 4.51217 1.12532 8.50705 1.12532Z"
                  fill="white"
                />
              </svg>
            </button>
          </span>
        </div>
      </>
      {!searchText ? (
        <div class="absolute mt-2 w-full z-30 overflow-hidden text-white rounded-md bg-navblue">
          {searchResults.length > 0
            ? searchResults?.map((data) => {
                return (
                  <div
                    onClick={() => {
                      setSearchResults([]);
                    }}
                    class="flex cursor-pointer py-2 px-3 hover:bg-slate-400"
                  >
                    <p
                      onClick={() => {
                        handleConnectSelection(data?._id, data?.name);
                      }}
                      class="text-sm font-medium text-white"
                    >
                      {data?.name}
                    </p>
                  </div>
                );
              })
            : ""}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ConnectBox;
