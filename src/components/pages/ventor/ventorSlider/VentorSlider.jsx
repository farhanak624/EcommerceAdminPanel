import React, { useEffect, useRef, useState } from "react";
import { CustomDropdown } from "../../../customDropdown/CustomDropdown";
import Datepicker from "../../../Lineareachart/Datepicker";
import ReactDatePicker from "react-datepicker";
import { uploadImageV2 } from "../../../imageUpload";
import { ToastContainer, toast } from "react-toastify";
import {
  deleteBannerReq,
  getAprovedBanners,
  getBanners,
  getCategories,
  palypalPaymentBanner,
  sliderReq,
  stripepaymentbanner,
} from "../../../../Api/ApiCall";
import { loadSpinner } from "../../../../Redux/Features/NavbarSlice";
import { useDispatch } from "react-redux";

function VentorSlider() {
  const [tableOne, setTableOne] = useState(true);
  const [ondrop1, setonDrop1] = useState(false);
  const [ondrop, setonDrop] = useState(false);
  const [addSlider, setaddSlider] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const dropdownRef = useRef(null);
  const date = new Date();
  const fileInputRef = useRef(null);
  const [imageLoad, setImageLoad] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [searchcategory, setSearchcategory] = useState("");
  const [getcategoryarray, setgetcategoryArray] = useState([]);
  const [uploadImage, setUploadimage] = useState("");
  const [lasFormdata, setlasFormdata] = useState({});
  const [bannersData, setBannersData] = useState([]);
  const [openModal, setOpenmodal] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedOption, setSelectedOption] = useState("option1");
  const [isLoading1, setIsLoading1] = useState(true);
  const [dataLength, setDataLength] = useState(0);
  const [table2, settable2] = useState(false);
  const [formdata, setFormdata] = useState({
    banner: "",
    category: "",
    validity: "",
    position: "",
  });

  const dispatch = useDispatch();
  const handleChange = (event) => {
    setSelectedOption(event?.target?.value);
  };

  const [page, setPage] = useState(1);
  const loader = useRef(null);
  useEffect(() => {
    // if (totalpages < 12) {
    //   return;
    // }
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
        setPage((prev) => prev + 1);
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
  console.log(page);
  useEffect(() => {
    getCategories(keyword).then((data) => {
      setgetcategoryArray(data?.data?.categories);
      console.log(data);
    });
  }, [keyword]);
  useEffect(() => {
    
    getAllBanner();
  }, [tableOne]);
  const getAllBanner = () => {
    dispatch(loadSpinner());
    if (!tableOne) {
      getAprovedBanners()
        .then((data) => {
          setBannersData(data?.data?.Banners);
          setDataLength(data?.data?.Banners?.length);
          setIsLoading1(false);
          console.log(data?.data);
        })
        .catch((err) => {
          dispatch(loadSpinner());
          setIsLoading1(false);
          console.log(err);
        })
        .finally(() => {
          dispatch(loadSpinner());
        });
      return;
    } else {
      setBannersData([]);
      getBanners()
        .then((data) => {
          setBannersData(data?.data?.Banners);
          setDataLength(data?.data?.Banners?.length);
          setIsLoading1(false);
          console.log(data?.data?.Banners, "?????????????????????????????????");
        })
        .catch((err) => {
          setIsLoading1(false);
          console.log(err);
        })
        .finally(() => {
          dispatch(loadSpinner());
        });
    }
  };
  const openFileSelector = () => {
    fileInputRef.current.click(); // Programmatically trigger the click event of the file input
  };
  const handleImageUpload = (event) => {
    setImageLoad(false);
    const image = event.target.files[0];
    setUploadimage(image);

    setSelectedImage(URL.createObjectURL(image)); // Get the selected image from the input
    // Set the selected image to state
  };
  const handOnclick = async () => {
    setImageLoad(true);
    if (!uploadImage) {
      toast("image must");
      setImageLoad(false);
      return;
    }

    if (!formdata?.category) {
      toast("category must");
      setImageLoad(false);
      return;
    }
    if (!formdata?.position) {
      toast("position must");
      setImageLoad(false);
      return;
    }
    if (!formdata?.validity) {
      toast("validity must");
      setImageLoad(false);
    }
    let imageUrl;
    if (uploadImage) {
      uploadImageV2(uploadImage)
        .then((data) => {
          console.log(data);
          imageUrl = data?.images[0]?.imageUrl;
          const dateInIST = new Date(formdata?.validity);
          const dateInUTC = dateInIST.toISOString();
          const wholData = {
            banner: imageUrl,
            category: formdata?.category,
            validity: dateInUTC,
            position: formdata?.position,
          };
          sliderReq(wholData)
            .then((data) => {
              getAllBanner();
              setImageLoad(false);
              setFormdata({
                banner: "",
                category: "",
                validity: "",
                position: "",
              });
              setSearchcategory("");
              setKeyword("");
              setSelectedImage("");
              toast("request sent");
            })
            .catch((err) => {
              setImageLoad(false);
              toast("something wrong !");
              console.log(err);
            });
        })
        .catch((err) => {
          setImageLoad(false);
          console.log(err);

          console.log(err?.response);
          if (err?.response?.data?.errors) {
            toast(err?.response?.data?.errors);
            return;
          } else {
            toast("image can't upload");
            console.log(err);
            return;
          }
        });
    } else {
      toast("image must");
      setImageLoad(false);
      return;
    }
  };
  const localdate = (date) => {
    const utcDateString = date;
    const utcDate = new Date(utcDateString);

    const localDateString = utcDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return localDateString;
  };
  return (
    <div className="relative">
      {openModal && (
        <div
          className="shado absolute w-full h-full z-50 flex items-center justify-center"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.20)",
            boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.3)", // Adding shadow
            backdropFilter: "blur(3px)", // Adding blur
          }}
        >
          <div className="bg-containerWhite w-[50%] p-3">
            {/* radio div   */}
            <div
              className="p-4 flex items-center cursor-pointer justify-between w-full shadow-md"
              onClick={() => setSelectedOption("option1")}
            >
              <div className="flex items-center gap-2">
                <svg
                  width="17"
                  height="18"
                  viewBox="0 0 17 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.0534 6.488C16.1744 7.051 16.1594 7.734 16.0134 8.539C15.4314 11.517 13.5364 13.005 10.3304 13.005H9.88839C9.72504 13.004 9.56703 13.0631 9.44439 13.171C9.31732 13.2811 9.23277 13.4321 9.20539 13.598L9.16439 13.787L8.61139 17.266L8.59039 17.417C8.56185 17.584 8.47418 17.7352 8.34339 17.843C8.21999 17.9516 8.06077 18.0107 7.89639 18.009H5.37339C5.31024 18.0123 5.24722 18.0004 5.18962 17.9743C5.13202 17.9482 5.08153 17.9087 5.04239 17.859C5.00264 17.8083 4.97407 17.7497 4.95856 17.6871C4.94305 17.6246 4.94095 17.5594 4.95239 17.496C5.01339 17.123 5.10039 16.558 5.21939 15.807C5.33639 15.057 5.42539 14.493 5.48639 14.118C5.54739 13.743 5.63639 13.18 5.75839 12.433C5.87939 11.685 5.97039 11.123 6.02939 10.748C6.06239 10.5 6.20839 10.377 6.46239 10.377H7.77839C8.67139 10.39 9.46039 10.32 10.1534 10.166C11.3254 9.904 12.2874 9.422 13.0394 8.717C13.7244 8.08 14.2424 7.255 14.5994 6.244C14.7614 5.774 14.8764 5.327 14.9514 4.906C14.9574 4.865 14.9654 4.84 14.9764 4.832C14.9844 4.821 14.9984 4.818 15.0114 4.821C15.0331 4.83069 15.0539 4.84241 15.0734 4.856C15.5974 5.254 15.9274 5.797 16.0534 6.488ZM14.3254 3.652C14.3254 4.369 14.1714 5.16 13.8604 6.026C13.3234 7.588 12.3134 8.644 10.8234 9.194C10.0654 9.463 9.22139 9.602 8.28839 9.619C8.28839 9.625 7.98739 9.626 7.38439 9.626L6.48139 9.619C5.80939 9.619 5.41439 9.939 5.29439 10.583C5.28139 10.636 4.99639 12.413 4.43939 15.912C4.43139 15.978 4.39139 16.014 4.31839 16.014H1.35339C1.28352 16.0155 1.21418 16.0014 1.15038 15.9729C1.08658 15.9444 1.02989 15.9021 0.984392 15.849C0.937187 15.7968 0.902339 15.7346 0.882431 15.6671C0.862523 15.5996 0.858067 15.5285 0.869392 15.459L3.20139 0.663997C3.23126 0.474673 3.32945 0.302848 3.47739 0.180997C3.62164 0.0568434 3.80608 -0.0106781 3.99639 -0.00900276H10.0104C10.2384 -0.00900276 10.5654 0.0349973 10.9894 0.121997C11.4174 0.205997 11.7904 0.315997 12.1124 0.442997C12.8304 0.716997 13.3784 1.131 13.7574 1.68C14.1364 2.232 14.3254 2.887 14.3254 3.652Z"
                    fill="#6496F7"
                  />
                </svg>
                Paypal
              </div>
              <input
                type="radio"
                id="option1"
                name="options"
                value="option1"
                checked={selectedOption === "option1"}
                onChange={handleChange}
              />
            </div>

            <div
              className="p-4 flex mt-4 items-center justify-between cursor-pointer w-full shadow-md"
              onClick={() => setSelectedOption("option2")}
            >
              <div className="flex items-center gap-2">
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_2333_17592)">
                    <path
                      d="M3.5 0C2.70435 0 1.94129 0.316071 1.37868 0.87868C0.816071 1.44129 0.5 2.20435 0.5 3L0.5 21C0.5 21.7956 0.816071 22.5587 1.37868 23.1213C1.94129 23.6839 2.70435 24 3.5 24H21.5C22.2956 24 23.0587 23.6839 23.6213 23.1213C24.1839 22.5587 24.5 21.7956 24.5 21V3C24.5 2.20435 24.1839 1.44129 23.6213 0.87868C23.0587 0.316071 22.2956 0 21.5 0L3.5 0ZM12.839 8.0775C11.963 8.0775 11.4335 8.3235 11.4335 8.967C11.4335 9.669 12.344 9.978 13.4735 10.362C15.3155 10.9845 17.7395 11.8065 17.75 14.8515C17.75 17.802 15.386 19.5 11.945 19.5C10.3925 19.4951 8.85714 19.1756 7.4315 18.561V14.637C8.8205 15.396 10.574 15.957 11.9465 15.957C12.872 15.957 13.5335 15.7095 13.5335 14.9505C13.5335 14.1735 12.5465 13.818 11.354 13.389C9.539 12.735 7.25 11.91 7.25 9.165C7.25 6.2475 9.482 4.5 12.839 4.5C14.2419 4.48708 15.6343 4.74425 16.94 5.2575V9.132C15.683 8.457 14.096 8.0775 12.839 8.0775Z"
                      fill="#6496F7"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2333_17592">
                      <rect
                        width="24"
                        height="24"
                        fill="white"
                        transform="translate(0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                Stripe
              </div>
              <input
                type="radio"
                id="option2"
                name="options"
                value="option2"
                checked={selectedOption === "option2"}
                onChange={handleChange}
              />
            </div>
            {/* radio div */}
            <div className="flex gap-4 items-center">
              <button
                onClick={() => {
                  setIsloading(true);
                  if (selectedOption === "option2") {
                    if (!selectedPrice?.amount) {
                      toast("amount is must");
                      return;
                    }
                    setOpenmodal(true);
                    stripepaymentbanner(selectedPrice)
                      .then((data) => {
                        const newWindow = window.open(
                          `${data?.data?.url}`,
                          "_blank"
                        );
                        setOpenmodal(false);
                        setIsloading(false);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  } else if (selectedOption === "option1") {
                    if (!selectedPrice?.amount) {
                      toast("amount is must");
                      return;
                    }
                    palypalPaymentBanner(selectedPrice)
                      .then((data) => {
                        setIsloading(true);

                        const newWindow = window.open(
                          `${data?.data?.url}`,
                          "_blank"
                        );
                        setOpenmodal(false);
                        setIsloading(false);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }
                }}
                className="w-full p-2 flex items-center justify-center gap-5 bg-navblue mt-4 rounded-md text-white"
              >
                Place order
                {isLoading && <img src="/loading.gif" className="w-8" />}
              </button>{" "}
              <button
                onClick={() => {
                  setOpenmodal(false);
                }}
                className="w-full p-2 border border-red-500 text-red-600 mt-4 rounded-md "
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <h1 className="font-bold">Sliders</h1>
      <div
        className="bg-containerWhite mt-5 rounded-lg shadow-md overflow-x-auto p-4"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex">
            <button
              onClick={() => {
                setBannersData([]);
                setIsLoading1(true);
                setTableOne(true);
                settable2(false);
                // getAllBanner();
              }}
              className="bg-navblue text-sm px-5 rounded-l-md py-1"
              style={{
                backgroundColor: tableOne
                  ? "rgba(47, 78, 255, 1)"
                  : "rgba(47, 78, 255, 0.06) ",
                color: tableOne ? "white" : "black",
              }}
            >
              Slider
            </button>
            <button
              onClick={() => {
                setBannersData([]);
                setIsLoading1(true);
                setTableOne(false);
                settable2(true);
                // getAllBanner();
              }}
              className=" px-3 text-sm rounded-r-md py-2 text-black"
              style={{
                backgroundColor: tableOne
                  ? "rgba(47, 78, 255, 0.06)"
                  : "rgba(47, 78, 255, 1)",
                color: tableOne ? "black" : "white",
              }}
            >
              Slider request
            </button>
          </div>
          <div ref={loader} className="h-10" />
          {tableOne && (
            <button
              className="px-2 py-2 flex max-w-[190px] gap-3 rounded-md shadow-sm items-center"
              style={{ backgroundColor: "rgba(47, 78, 255, 0.06)" }}
              onClick={() => {
                setaddSlider(true);
              }}
            >
              Add Slider
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 0C3.58185 0 0 3.58185 0 8C0 12.4182 3.58185 16 8 16C12.4182 16 16 12.4182 16 8C16 3.58185 12.4182 0 8 0ZM8 15.3846C3.92154 15.3846 0.615385 12.0785 0.615385 8C0.615385 3.92154 3.92154 0.615385 8 0.615385C12.0785 0.615385 15.3846 3.92154 15.3846 8C15.3846 12.0785 12.0785 15.3846 8 15.3846Z"
                  fill="black"
                />
                <path
                  d="M13.0811 7.69261H8.3119V2.92338C8.3119 2.83845 8.24298 2.76953 8.15805 2.76953H7.85036C7.76544 2.76953 7.69652 2.83845 7.69652 2.92338V7.69261H2.92728C2.84236 7.69261 2.77344 7.76153 2.77344 7.84646V8.15415C2.77344 8.23907 2.84236 8.30799 2.92728 8.30799H7.69652V13.0772C7.69652 13.1618 7.76544 13.2311 7.85036 13.2311H8.15805C8.24298 13.2311 8.3119 13.1618 8.3119 13.0772V8.30799H13.0811C13.1657 8.30799 13.235 8.23907 13.235 8.15415V7.84646C13.235 7.76153 13.1657 7.69261 13.0811 7.69261Z"
                  fill="black"
                />
              </svg>
            </button>
          )}
        </div>
        {tableOne ? (
          <table className="w-full  mt-10 rounded-lg">
            <thead
              className="rounded-md text-center"
              style={{
                backgroundColor: "rgba(242, 242, 242, 1)",
                height: "50px",
              }}
            >
              <tr className="">
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 capitalize">
                  Banner {tableOne}
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 capitalize tracking-wider">
                  Category
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 capitalize tracking-wider">
                  <select className="bg-transparent items-center border-none outline-none">
                    <option selected disabled>
                      Position
                    </option>
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                  </select>
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 capitalize tracking-wider">
                  Validity Date
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 capitalize tracking-wider">
                  Status
                </th>

                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 capitalize tracking-wider">
                  Action
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 capitalize tracking-wider"></th>
              </tr>
            </thead>
            <tbody>
              {addSlider && (
                <tr className="" style={{ height: "50px" }}>
                  <td>
                    <div className="flex justify-center">
                      {" "}
                      <button
                        className="py-1 text-xs px-3 rounded-md flex gap-2 items-center border border-gray-500 justify-center"
                        onClick={openFileSelector}
                      >
                        Upload
                        {imageLoad ? (
                          <img src="/loading.gif" className="w-5 h-5" />
                        ) : selectedImage ? (
                          <img src={selectedImage} className="w-6 h-6" />
                        ) : (
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8 0C3.58185 0 0 3.58185 0 8C0 12.4182 3.58185 16 8 16C12.4182 16 16 12.4182 16 8C16 3.58185 12.4182 0 8 0ZM8 15.3846C3.92154 15.3846 0.615385 12.0785 0.615385 8C0.615385 3.92154 3.92154 0.615385 8 0.615385C12.0785 0.615385 15.3846 3.92154 15.3846 8C15.3846 12.0785 12.0785 15.3846 8 15.3846Z"
                              fill="black"
                            />
                            <path
                              d="M13.0811 7.69261H8.3119V2.92338C8.3119 2.83845 8.24298 2.76953 8.15805 2.76953H7.85036C7.76544 2.76953 7.69652 2.83845 7.69652 2.92338V7.69261H2.92728C2.84236 7.69261 2.77344 7.76153 2.77344 7.84646V8.15415C2.77344 8.23907 2.84236 8.30799 2.92728 8.30799H7.69652V13.0772C7.69652 13.1618 7.76544 13.2311 7.85036 13.2311H8.15805C8.24298 13.2311 8.3119 13.1618 8.3119 13.0772V8.30799H13.0811C13.1657 8.30799 13.235 8.23907 13.235 8.15415V7.84646C13.235 7.76153 13.1657 7.69261 13.0811 7.69261Z"
                              fill="black"
                            />
                          </svg>
                        )}
                      </button>
                      <input
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        type="file"
                        style={{ display: "none" }}
                      />
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-center">
                      <div
                        ref={dropdownRef}
                        className="relative border border-gray-700 flex items-center  rounded-md  max-w-[100px]"
                      >
                        <input
                          onClick={() => setonDrop1(!ondrop1)}
                          onChange={(e) => {
                            setKeyword(e.target.value);
                          }}
                          type="text"
                          value={keyword}
                          className="bg-transparent w-full h-full p-1 outline-none border-none text-xs"
                          placeholder="Select category"
                        />
                        {ondrop1 && (
                          <div
                            className="absolute w-full max-h-28 overflow-hidden  text-transform: capitalize overflow-y-auto top-7 rounded-lg bg-slate-200 text-center"
                            style={{ scrollbarWidth: "thin" }}
                          >
                            {getcategoryarray?.length > 0 &&
                              getcategoryarray.map((data) => {
                                console.log("6565",data);
                                return (
                                  <p
                                    onClick={() => {
                                      setSearchcategory(data?.name);
                                      setKeyword(data?.name);
                                      setFormdata({
                                        ...formdata,
                                        category: data?._id,
                                      });
                                      setonDrop1(false);
                                    }}
                                    className="p-1 border border-gray-200 cursor-pointer hover:bg-gray-800 hover:text-white"
                                  >
                                    {data?.name}
                                  </p>
                                );
                              })}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-center">
                      <div
                        ref={dropdownRef}
                        className="relative border border-gray-700 flex items-center  rounded-md  max-w-[100px]"
                      >
                        <div
                          onClick={() => setonDrop(!ondrop)}
                          className="bg-transparent w-full h-full min-w-[100px] p-1 outline-none border-none text-xs"
                        >
                          {formdata?.position
                            ? formdata?.position
                            : "Select Position"}
                        </div>
                        {ondrop && (
                          <div
                            className="absolute w-full max-h-28 overflow-hidden overflow-y-auto top-7 rounded-lg bg-slate-200 text-center"
                            style={{ scrollbarWidth: "none" }}
                          >
                            <p
                              className="p-1 cursor-pointer"
                              onClick={() => {
                                setFormdata({
                                  ...formdata,
                                  position: "top",
                                });
                                setonDrop(false);
                              }}
                            >
                              Top
                            </p>
                            <p
                              className="p-1 cursor-pointer"
                              onClick={() => {
                                setFormdata({
                                  ...formdata,
                                  position: "bottom",
                                });
                                setonDrop(false);
                              }}
                            >
                              Bottom
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-center">
                      <div>
                        <ReactDatePicker
                          className="border p-1 border-gray-300 rounded-md text-xs outline-none"
                          placeholderText="Select date"
                          selected={formdata?.validity}
                          onChange={(date) =>
                            setFormdata({ ...formdata, validity: date })
                          }
                          minDate={date}
                        />
                      </div>
                    </div>
                  </td>

                  <td className="text-center" style={{ color: "#00D7CB" }}>
                    New
                  </td>

                  <td className="">
                    <div className="flex gap-2 justify-center">
                      <button
                        className="px-2 py-1 rounded-md text-white"
                        style={{ backgroundColor: "#008B0E" }}
                        onClick={handOnclick}
                      >
                        Sent Req
                      </button>
                    </div>
                  </td>
                </tr>
              )}
              {bannersData?.length > 0 &&
                bannersData.map((data) => {
                  return (
                    <tr>
                      <td className="p-2 flex justify-center">
                        <img
                          src={data?.banner}
                          className="max-w-[50px] max-h-[50px]"
                          alt=""
                        />
                      </td>
                      <td className="p-2">
                        <div className="flex justify-center">
                          {data?.category?.name}
                        </div>
                      </td>
                      <td>
                        <div className="flex justify-center">
                          {data?.position}
                        </div>
                      </td>
                      <td>
                        <div className="flex justify-center">
                          {localdate(data?.validity)}
                        </div>
                      </td>
                      <td
                        style={{
                          color: `${
                            data?.status === "Reminder"
                              ? "#DC9E00"
                              : data?.status === "Pending"
                              ? "#DC9E00"
                              : data?.status === "Rejected"
                              ? "#DB3022"
                              : data?.status === "Publish"
                              ? "#008B0E"
                              : data?.status === "Approved"
                              ? "#008B0E"
                              : ""
                          }`,
                        }}
                      >
                        <div className="flex justify-center">
                          {data?.status}
                        </div>
                      </td>

                      <td className="">
                        <div className="flex justify-center">
                          {data?.status === "Reminder" && (
                            <button
                              className="px-2 py-1 rounded-md text-white"
                              style={{
                                backgroundColor:
                                  data?.status === "Reminder"
                                    ? "#DC9E00"
                                    : "#008B0E",
                              }}
                              onClick={() => {
                                if (data?.status === "Reminder") {
                                }
                              }}
                            >
                              {data?.status === "Reminder" ? "Reminder" : ""}
                            </button>
                          )}
                          <button
                            className={`px-2 py-1 rounded-md text-white `}
                            style={{ backgroundColor: "#DB3022" }}
                            onClick={() => {
                              deleteBannerReq(data?._id)
                                .then((data) => {
                                  getAllBanner();
                                  toast("this request deleted");
                                })
                                .catch((err) => {
                                  toast("something wrong");
                                  console.log(err);
                                });
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        ) : (
          <table className="w-full mt-10 text-center rounded-lg">
            <thead>
              <tr
                className=""
                style={{
                  height: "60px",
                  backgroundColor: "#F2F2F2",
                }}
              >
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 capitalize tracking-wider">
                  Banner
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 capitalize tracking-wider">
                  Category
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 capitalize tracking-wider">
                  Validity Date
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 capitalize tracking-wider">
                  Payment Status
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 capitalize tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {bannersData?.length > 0 &&
                bannersData.map((data) => {
                  return (
                    <tr>
                      <td>
                        <div className="pl-3 mt-2 flex items-center justify-center">
                          <img src={data?.banner} className="w-[50px]" alt="" />
                        </div>
                      </td>
                      <td>{data?.category?.name}</td>
                      <td>{localdate(data?.validity)}</td>
                      <td>
                        <p
                          style={{
                            color: `${
                              data?.paymentStatus === "Success"
                                ? "#008B0E"
                                : "#DC9E00"
                            }`,
                          }}
                        >
                          {data?.paymentStatus}
                        </p>
                      </td>
                      <td>
                        <div className="flex justify-center">
                          {data?.paymentStatus === "Success" ? (
                            <svg
                              width="130"
                              height="24"
                              viewBox="0 0 130 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M65 24C71.6274 24 77 18.6274 77 12C77 5.37258 71.6274 0 65 0C58.3726 0 53 5.37258 53 12C53 18.6274 58.3726 24 65 24Z"
                                fill="#2F4EFF"
                              />
                              <path
                                d="M63.0823 15.184L60.2704 12.4671C60.0862 12.2592 59.9899 11.9918 60.0008 11.7183C60.0118 11.4448 60.1291 11.1853 60.3294 10.9918C60.5297 10.7982 60.7983 10.6849 61.0813 10.6743C61.3644 10.6637 61.6412 10.7568 61.8563 10.9348L63.8753 12.8801L68.1437 8.76132C68.3588 8.58328 68.6356 8.49025 68.9187 8.50081C69.2017 8.51137 69.4703 8.62476 69.6706 8.8183C69.8709 9.01185 69.9882 9.27129 69.9992 9.5448C70.0101 9.81831 69.9138 10.0857 69.7296 10.2936L64.6682 15.184C64.4575 15.3864 64.1724 15.5 63.8753 15.5C63.5781 15.5 63.293 15.3864 63.0823 15.184Z"
                                fill="white"
                              />
                            </svg>
                          ) : (
                            <button
                              onClick={() => {
                                const Amount = {
                                  amount: data?.amount,
                                  requestId: data?._id,
                                };
                                setOpenmodal(true);
                                setSelectedPrice(Amount);
                              }}
                              className="px-3 text-white mt-2 rounded-md py-1 text-center"
                              style={{ backgroundColor: "#008B0E" }}
                            >
                              Pay {data?.amount}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}

        {(!isLoading1 && dataLength > 0) ||
          (!dataLength && (
            <div className="flex items-center text-red-800 justify-center w-full h-[10vh]">
              No Requests Available
            </div>
          ))}
      </div>
    </div>
  );
}

export default VentorSlider;
