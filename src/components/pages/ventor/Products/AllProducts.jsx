import React, { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import {
  allProducts,
  getSectionCategories,
  getSections,
} from "../../../../Api/ApiCall";
import { useDispatch } from "react-redux";
import { loadSpinner } from "../../../../Redux/Features/NavbarSlice";
import { NodataSvg } from "../../../../../public/Assets/assets";

const AllProducts = () => {
  const [productList, setProductList] = useState([]);
  const [pages, setPages] = useState(0);
  const [sectionList, setSectionList] = useState([]);
  const [sectionId, setSectionId] = useState("");
  const [search, setSearch] = useState("");
  const [totalpages, setTotalPage] = useState(0);
  const dispatch = useDispatch();
  // scrollpaging efect
  useEffect(() => {
    getAllProducts(sectionId, search, pages);
    getAllSections();
  }, [sectionId, search, pages, totalpages]);

  useEffect(() => {
    if (totalpages < 12) {
      return;
    }
    // Function to check if the document height is greater than the viewport height
    const isScrollRequired = () => {
      return document.documentElement.scrollHeight > window.innerHeight;
    };

    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };

    const observerCallback = (entities) => {
      const target = entities[0];
      if (target.isIntersecting) {
        setPages((prev) => prev + 1);
      }
    };

    const observer = new IntersectionObserver(observerCallback, options);

    // Setup observer if scrolling is required
    const setupObserver = () => {
      if (loader.current && isScrollRequired()) {
        observer.observe(loader.current);
      } else {
        // Use a timeout to retry after some time, in case content or images are still loading
        setTimeout(setupObserver, 500);
      }
    };

    setupObserver();

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, []);
  console.log("page", pages);
  // scrollpaging efect ending

  const getAllProducts = (sectionId, search, pages) => {
    dispatch(loadSpinner());
    setProductList([]);
    allProducts(sectionId, search, pages)
      .then((data) => {
        console.log(data?.data?.productData);
        if (pages === 1) {
          setProductList(data?.data?.productData);
        } else {
          setProductList((prevProducts) => [
            ...prevProducts,
            ...data?.data?.productData,
          ]);
        }
        setTotalPage(data?.data?.totalProduct);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(loadSpinner());
      });
  };
  const getAllSections = () => {
    getSections()
      .then((data) => {
        setSectionList(data?.data?.sectionData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSectionChange = (e) => {
    setSectionId(e.target.value);
    setPages(1); // Reset page to 1 when section changes
  };
  const debounce = (func, wait) => {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };
  const handleSearchChange = debounce((e) => {
    setSearch(e.target.value);
    setPages(1); // Reset page to 1 when search changes
  }, 300);
  const loader = useRef(null);

  return (
    <div className="bg-containerWhite h-full rounded-xl min-h-[600px] shadow-sm p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">All Product</h1>
          <p className="text-gray-500 text-lg mt-4">
            This section helps to find and list your products
          </p>
        </div>
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-6 pt-6">
            <div className="flex items-center gap-2">
              <select
                name="brand"
                className="p-3 rounded-lg outline-none bg-[rgba(244,245,250,1)] border-none w-full shadow-md"
                id=""
                onChange={(e) => {
                  setSectionId(e.target.value);

                  handleSectionChange(e);
                }}
              >
                <option disabled selected value="">
                  Section
                </option>
                {sectionList.length > 0 &&
                  sectionList.map((section) => {
                    return <option value={section._id}>{section?.name}</option>;
                  })}
                {/* Brand options */}
              </select>
            </div>

            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                class="block w-full p-3 ps-10 text-sm bg-bodycolur rounded-lg shadow-md"
                placeholder="Search Product"
                onChange={(e) => {
                  handleSearchChange(e);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {productList?.length > 0 ? (
        <div className="mb-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
          {productList?.length > 0 &&
            productList?.map((product,i) => {
              return (
                <ProductCard key={product._id} product={product} callback={getAllProducts} />
              );
            })}

          {/* Repeat <ProductCard /> for as many products as you have */}
        </div>
      ) : (
        <div className="flex justify-center w-full mt-18">
          <div>
            <img src={NodataSvg} alt="Loading..." className="w-48" />
          </div>
        </div>
      )}
      <div ref={loader} className="h-10" />
    </div>
  );
};

export default AllProducts;
