import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import {
  addAdminBAnnerreq,
  addAdminrepDelete,
  adminAprovebnrEeq,
  adminDeleteBannerReq,
  adminGetApprovedbannerReq,
  adminGetbannerReq,
  deleteBannerReq,
  getAdminAllSection,
  getAdminAllcategory,
  getAprovedBanners,
  getBanners,
  getCategories,
  getbyadminBanner,
} from "../../../../Api/ApiCall";
import ReactDatePicker from "react-datepicker";
import { uploadImageV2 } from "../../../imageUpload";
import { toast } from "react-toastify";
import SweetAlert2 from "react-sweetalert2";
import { loadSpinner } from "../../../../Redux/Features/NavbarSlice";
import { useDispatch } from "react-redux";

function AdminSlider() {
  const [tableOne, setTableOne] = useState(true);
  const [ondrop1, setonDrop1] = useState(false);
  const [ondrop2, setonDrop2] = useState(false);
  const [ondrop, setonDrop] = useState(false);
  const [addSlider, setaddSlider] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const dropdownRef = useRef(null);
  const date = new Date();
  const fileInputRef = useRef(null);
  const [imageLoad, setImageLoad] = useState(false);
  const [productkeyword, setproductKeyword] = useState("");
  const [keyword, setKeyword] = useState("");
  const [searchcategory, setSearchcategory] = useState("");
  const [searchProduct, setSearchProduct] = useState("");
  const [getcategoryarray, setgetcategoryArray] = useState([]);
  const [uploadImage, setUploadimage] = useState("");
  const [lasFormdata, setlasFormdata] = useState({});
  const [bannersData, setBannersData] = useState([]);
  const [openModal, setOpenmodal] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedOption, setSelectedOption] = useState("option1");
  const [apiLoading, setApiLoding] = useState(true);
  const [openModal1, setOpenmodal1] = useState(false);
  const [amount, setAomunt] = useState("");
  const [reqId, setReqId] = useState("");
  const [bannerimg, setBannerimg] = useState("");
  const [isSection, setSection] = useState(true);
  const [sectionData, setSectionData] = useState([]);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const loader = useRef(null);
  const [totalpages, setTotalPage] = useState(0);
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
  const [formdata, setFormdata] = useState({
    banner: "",

    validity: "",
    position: "",
  });
  const handleChange = (event) => {
    setSelectedOption(event?.target?.value);
  };
  useEffect(() => {
    getAdminAllSection(keyword).then((data) => {
      console.log(data?.data);
      setgetcategoryArray(data?.data?.sectionData);
      // console.log(data?.data);
    });
  }, [keyword, productkeyword]);
  useEffect(() => {
    getAllBanner();
  }, [tableOne, page]);
  const getAllBanner = () => {
    dispatch(loadSpinner());
    if (!tableOne) {
      setBannersData([]);
      adminGetbannerReq(page)
        .then((data) => {
          setBannersData(data?.data?.bannerRequests);
          console.log(data?.data, "{{{{{{{{{{{{{{{{{{[");
          setApiLoding(false);
        })
        .catch((err) => {
          setApiLoding(false);
          toast("something wrong");
          console.log(err);
        })
        .finally(() => {
          dispatch(loadSpinner());
        });
      return;
    } else {
      setBannersData([]);
      getbyadminBanner(page)
        .then((data) => {
          console.log(data?.data?.Banners);
          setBannersData((prev) => [...prev, ...data?.data?.Banners]);
          setApiLoding(false);
        })
        .catch((err) => {
          toast("something wrong");
          setApiLoding(false);
          console.log(err);
        })
        .finally(() => {
          dispatch(loadSpinner());
        });
    }

    // adminGetApprovedbannerReq()
  };

  console.log(page);
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
    if (!formdata?.section) {
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
    console.log(formdata);
    setImageLoad(true);
    let imageUrl;
    if (uploadImage) {
      try {
        uploadImageV2(uploadImage)
          .then((data) => {
            imageUrl = data?.images[0]?.imageUrl;
            const dateInIST = new Date(formdata?.validity);
            const dateInUTC = dateInIST.toISOString();
            addAdminBAnnerreq({
              image: imageUrl,
              validity: dateInUTC,
              section: formdata?.section,
              position: formdata.position,
            })
              .then((data) => {
                getAllBanner();
                setImageLoad(false);
                setFormdata({
                  banner: "",
                  section: "",
                  validity: "",
                  position: "",
                });
                setKeyword("");
                console.log(data);
                setSearchcategory("");

                setSelectedImage("");
                toast("new banner added successfully");
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
              toast("image can't upload try other one");
              return;
            }
          });
      } catch (err) {
        console.log(err);
      }
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
      <h1 className="font-bold">Sliders</h1>
      {openModal1 && (
        <div
          className="fixed overflow-x-auto w-full h-screen py-4 flex items-center justify-center inset-0 z-30"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.305)",
            scrollbarWidth: "none",
          }}
        >
          <div className="min-w-[300px] mt-4 p-4 bg-containerWhite rounded-lg ">
            <div className="rounded-lg overflow-hidden">
              <img
                src={bannerimg}
                className="h-20  object-contain object-center w-full"
                alt=""
              />
            </div>
            <p className="mt-5 mb-2 p-1 text-sm">Enter Slider Amount</p>
            <input
              type="text"
              onChange={(e) => setAomunt(e.target.value)}
              placeholder="Enter Slider Amount"
              className="w-full p-2 outline-none border-none rounded-lg"
              style={{ backgroundColor: "#F2F2F2" }}
            />
            <div className="flex gap-1 items-center justify-center">
              <button
                onClick={() => {
                  if (!amount) {
                    toast("Amount Required");
                    return;
                  }
                  console.log("asad", reqId, amount);
                  adminAprovebnrEeq({ requestId: reqId, amount: amount })
                    .then((data) => {
                      toast.success("Successfully approved");
                      console.log(data);
                      getAllBanner();
                      setOpenmodal1(false);
                    })
                    .catch((err) => {
                      toast("something wrong");
                      console.log(err);
                    });
                }}
                className="bg-navblue px-4 py-1 text-white rounded-md mt-4"
              >
                Send
              </button>
              <button
                onClick={() => {
                  setOpenmodal1(false);
                }}
                className="border border-red-400 px-4 py-1 text-red-400 rounded-md mt-4"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        className="bg-containerWhite mt-5 rounded-lg shadow-md overflow-x-auto p-4"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <div className="flex">
              <button
                onClick={() => {
                  setTableOne(true);
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
                  setTableOne(false);
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
          </div>
          {tableOne && (
            <button
              className="px-2 py-2 flex max-w-44 gap-3 rounded-md shadow-sm items-center"
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
          <table className="min-w-[100vh] w-full text-center  leading-normal mt-5">
            <thead
              style={{
                backgroundColor: "rgba(242, 242, 242, 1)",
                height: "50px",
              }}
            >
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 capitalize tracking-wider">
                  Banner
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 capitalize tracking-wider">
                  section/Category
                </th>
                {/* <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 capitalize tracking-wider"></th> */}
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 capitalize tracking-wider">
                  Position
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 capitalize tracking-wider">
                  Validity Date
                </th>

                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 capitalize tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {addSlider && (
                <tr className="" style={{ height: "50px" }}>
                  <td>
                    <div className="flex justify-center">
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
                          placeholder="Select section"
                        />
                        {ondrop1 && (
                          <div
                            className="absolute w-full max-h-28 overflow-hidden overflow-y-auto top-7 rounded-lg bg-slate-200 text-center"
                            style={{ scrollbarWidth: "none" }}
                          >
                            {getcategoryarray?.length > 0 &&
                              getcategoryarray.map((data) => {
                                return (
                                  <p
                                    onClick={() => {
                                      setKeyword(data?.name);
                                      setFormdata({
                                        ...formdata,
                                        section: data?._id,
                                      });
                                      setonDrop1(false);
                                    }}
                                    className="p-1 border border-gray-200 cursor-pointer"
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
                          className="bg-transparent w-full h-full p-1 min-w-[100px] outline-none border-none text-xs"
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

                  <td className="">
                    <div className="flex gap-2 justify-center">
                      <button
                        className="px-2 py-1 rounded-md text-white"
                        style={{ backgroundColor: "#008B0E" }}
                        onClick={handOnclick}
                      >
                        Save
                      </button>
                      {/* <button
                        className="px-2 py-1 rounded-md text-white"
                        style={{ backgroundColor: "#DB3022" }}
                        onClick={() => {
                          setFormdata({
                            banner: "",
                            category: "",
                            validity: "",
                            position: "",
                          });
                          setSearchcategory("");

                          setSelectedImage("");
                        }}
                      >
                        Delete
                      </button> */}
                    </div>
                  </td>
                </tr>
              )}
              {bannersData?.length > 0 &&
                bannersData.map((data, index) => {
                  // console.log(data?.category, "==========", index);
                  return (
                    <tr>
                      <td className="p-2 flex justify-center">
                        <img
                          src={data?.image}
                          className="max-w-[50px] max-h-[50px]"
                          alt=""
                        />
                      </td>
                      <td className="p-2">
                        <div className="flex justify-center">
                          {data?.section
                            ? data?.section
                            : data?.category?.name
                            ? data?.category?.name
                            : data?.category}
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

                      <td className="">
                        <div className="flex justify-center">
                          <button
                            className={`px-2 py-1 rounded-md text-white `}
                            style={{ backgroundColor: "#DB3022" }}
                            onClick={() => {
                              Swal.fire({
                                title: "Are you sure?",
                                text: "You want to delete this item!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Yes, delete it!",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  addAdminrepDelete(data?.id)
                                    .then((data) => {
                                      console.log(data);
                                      getAllBanner();
                                      toast("slider deleted successfully");
                                    })
                                    .catch((err) => {
                                      toast("something wrong");
                                      console.log(err);
                                    });
                                }
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
          <table className="min-w-[100vh] w-full leading-normal mt-5">
            <thead className="">
              <tr
                className=""
                style={{
                  height: "60px",
                  backgroundColor: "#F2F2F2",
                }}
              >
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 capitalize tracking-wider">
                  <p>Banner</p>
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 capitalize tracking-wider">
                  category
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 capitalize tracking-wider">
                  Position
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 capitalize tracking-wider">
                  Validity Date
                </th>

                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 capitalize tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {bannersData?.length > 0 &&
                bannersData.map((data) => {
                  // console.log(data, "**************************");
                  return (
                    <tr className="">
                      <td className="p-2 flex justify-center">
                        <img
                          src={data?.banner}
                          className="max-w-[50px] max-h-[50px]"
                          alt=""
                        />
                      </td>
                      <td className="px-5 py-3  text-center  text-xs font-semibold text-gray-600 capitalize tracking-wider">
                        {data?.category?.name}
                      </td>

                      <td className="px-5 py-3  text-center  text-xs font-semibold text-gray-600 capitalize tracking-wider">
                        {data?.position}
                      </td>
                      <td className="px-5 py-3  text-center  text-xs font-semibold text-gray-600 capitalize tracking-wider">
                        {localdate(data?.validity)}
                      </td>

                      <td className="">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => {
                              setReqId(data?._id);
                              setBannerimg(data?.banner);
                              setOpenmodal1(true);
                            }}
                            className="px-2 py-1 bg-green-700 rounded-md text-white"
                          >
                            Approve
                          </button>

                          <button
                            className={`px-2 py-1 rounded-md text-white `}
                            style={{ backgroundColor: "#DB3022" }}
                            onClick={() => {
                              Swal.fire({
                                title: "Are you sure?",
                                text: "You want to reject this item!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Yes, reject it!",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  adminDeleteBannerReq({ requestId: data?._id })
                                    .then((data) => {
                                      getAllBanner();
                                      toast("this request is rejected");
                                    })
                                    .catch((err) => {
                                      toast("something wrong");
                                      console.log(err);
                                    }); // Call your delete function here
                                  // Example: deleteItem(itemId);
                                }
                              });
                            }}
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}

        {/* {apiLoading === true && bannersData?.length === 0 && (
          <div className="flex justify-center p-4 mt-6">
            <img src="/loading.gif" className="w-20" alt="" />
          </div>
        )} */}
        {apiLoading === false && bannersData?.length === 0 && (
          <div className="flex justify-center text-xl text-red-700 p-4 mt-6">
            <h1>Oops No availabe slider</h1>
          </div>
        )}
        <div ref={loader} className="h-10"></div>
      </div>
    </div>
  );
}

export default AdminSlider;
