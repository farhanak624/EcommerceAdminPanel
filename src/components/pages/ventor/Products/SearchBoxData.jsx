import React, { useEffect, useState, useRef } from "react";

const SearchBoxData = ({ BrandNames, callback, setformData, formData }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [color, setColor] = useState(false);
  const dropdownRef = useRef(null);
  const [SearchBoxData, setSearchBoxData] = useState("");
  useEffect(() => {
    if (!searchText) {
      setSearchResults([]);
      return;
    }
    const filterByFirstLetters = (BrandNames, letters) => {
      return BrandNames.filter((item) => {
        const nameStart = item.name.slice(0, letters.length).toLowerCase();
        return nameStart === letters.toLowerCase();
      });
    };
    const filteredArray = filterByFirstLetters(BrandNames, searchText);
    setSearchResults(filteredArray);
  }, [BrandNames, searchText]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  // console.log(BrandNames, "Brandss");
  const handleBrandSelection = (brandId, brandName) => {
    console.log({ brandName });

    setSearchText(brandName);
    setColor(true);
    // setSearchBoxData(brandName);
    if (searchText) {
      setSearchResults([]);
    }
    setformData({
      ...formData,
      brand: brandId,
    });
  };

  return (
    <div class="relative w-auto max-w-lg ">
      <>
        <div class="flex justify-between overflow-hidden rounded-md bg-bodycolur shadow shadow-black/20">
          <input
            value={searchText}
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
            onClick={() => {
              setSearchResults(BrandNames);

              if (searchResults.length === 0) {
                return;
              }
            }}
            class={`block w-full flex-1 py-3 px-3 focus:outline-none ${
              searchResults.length > 0
                ? " text-black"
                : "bg-bodycolur text-gray-700"
            }`}
            placeholder="Search Brand..."
          />
          <div class="flex justify-center cursor-pointer items-center  rounded-md bg-navblue px-2 py-2 ">
            <button
              type="button"
              onClick={() => {
                callback();
              }}
              className="w-6 h-6 bg-navblue rounded-xl text-2xl  text-white"
            >
              <p className=" -my-1">+</p>
            </button>
          </div>
        </div>
      </>
      {!searchText ? (
        <div
          ref={dropdownRef}
          class={`absolute mt-2 w-full max-h-40 z-30 overflow-x-auto text-white rounded-md bg-navblue`}
        >
          {searchResults.length > 0
            ? searchResults?.map((data) => {
                return (
                  <div
                    onClick={() => {
                      setSearchResults([]);
                    }}
                    class="flex cursor-pointer py-2 px-3 hover:bg-slate-400"
                  >
                    <img
                      src={data?.image}
                      alt=""
                      className="w-8 h-5 mr-2 rounded-lg"
                    />
                    <p
                      onClick={() => {
                        handleBrandSelection(data?._id, data?.name);
                        searchResults([]);
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

export default SearchBoxData;
