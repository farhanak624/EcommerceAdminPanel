import React, { useState, useEffect } from "react";
import MyVectorMap from "../../../Layout/mapGraph/Mapgraph";
import ChartComponent from "../../../Lineareachart/LineAreaChart";
import Card from "../Orders/CardsTop";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteProduct, productOverview } from "../../../../Api/ApiCall";
import LineChartProductSale from "../../../Lineareachart/LineChartProductSale";
import ReactCountryFlag from "react-country-flag";
import { countryAlpha2List } from "../../../Layout/mapGraph/map-data/CountryCodes";
import PercentageBar from "../../../../components/pages/ventor/Products/PercentageBar";
import { useDispatch } from "react-redux";
import { loadSpinner } from "../../../../Redux/Features/NavbarSlice";
import Swal from "sweetalert2";
import { Rating, Typography } from "@mui/material";

const ProductDetailed = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { productDetails } = location.state || {};
  const [selected, setselected] = useState(new Date().getFullYear());
  const [totalSales, setTotalSales] = useState();
  const [totalFavourites, setTotalFavourites] = useState();
  const [cancelledOrders, setCancelledOrders] = useState();
  const [totalViews, setTotalViews] = useState();
  const [productBrand, setProductBrand] = useState("");
  const [salesAnalysis, setSalesAnalysis] = useState({});
  const [topSelledCountry, setTopSelledCountry] = useState([]);
  const [topViewedCountry, setTopViewedCountry] = useState([]);
  const [productData, setProductData] = useState();
  const [productReviewDatas, setProductReviewDatas] = useState();
  const [Ratings, setRatings] = useState(0);
  const [reviewsList, setReviewsList] = useState([]);
  useEffect(() => {
    if (productDetails) {
      setProductData(productDetails);
    }
  }, [productDetails]);

  useEffect(() => {
    if (productData?._id) {
      getProductDetail(productData?._id, selected);
    }
  }, [productData, selected]);

  const getProductDetail = (prodId, year) => {
    dispatch(loadSpinner());
    console.log("productDetails", prodId, year);
    productOverview(prodId, year)
      .then((data) => {
        console.log("productDetails", data?.data);
        setTopSelledCountry(data?.data?.topSelledCountry);
        setTopViewedCountry(data?.data?.topViewedCountry);
        setTotalSales(data?.data?.totalSales);
        setTotalFavourites(data?.data?.totalFavorites);
        setCancelledOrders(data?.data?.cancelOrders);
        setTotalViews(data?.data?.totalViewers);
        setProductReviewDatas(data?.data?.product);
        setProductBrand(data?.data?.product?.brand);
        setSalesAnalysis(data?.data?.salesAnalysis);
        setRatings(data?.data?.product?.ratings?.average);
        setReviewsList(data?.data?.product?.reviews);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(loadSpinner());
      });
  };
  const countryCodeMap = countryAlpha2List?.reduce((acc, country) => {
    acc[country?.name] = country?.code;
    return acc;
  }, {});
  // console.log("countryCodeMap", countryCodeMap);

  //
  const data = {
    // heading:"",
    // count:'',
    price: totalSales,
  };
  const data1 = {
    // heading:"",
    // count:'',
    price: cancelledOrders,
  };
  const data2 = {
    // heading:"",
    // count:'',
    price: totalFavourites,
  };
  const data3 = {
    // heading:"",
    // count:'',
    price: totalViews,
  };
  return (
    <>
      <div className="w-full justify-between bg-white rounded-lg mb-3 md:p-1 relative">
        <div className="flex">
          <img
            className="w-32 h-32 md:w-32 md:h-32 rounded-lg p-1 mr-4"
            src={productData?.images[0]}
            alt=""
          />

          <div className="flex w-full p-3 items-center justify-between">
            <div className="md:mr-4">
              <p className="font-semibold text-xl">
                {productData?.productName}
              </p>
              <p>{productBrand}</p>
            </div>
            <div>
              <div className="md:flex flex-col items-end">
                <div className="flex items-center mb-2">
                  {productData?.ratings?.average === 0 ? (
                    ""
                  ) : (
                    <svg
                      className="fill-current text-yellow-500 w-4 h-4 md:w-5 md:h-5 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545-4.751-4.635 6.564-.954L10 0l2.942 6.561 6.564.954-4.751 4.635 1.123 6.545z" />
                    </svg>
                  )}

                  <p className="text-zinc-900 leading-none">
                    {productData?.ratings?.average === 0
                      ? ""
                      : productData?.ratings?.average?.toFixed(0)}
                  </p>
                </div>

                <div className="flex flex-col">
                  <span className="text-zinc-900 font-bold text-sm">
                    {productData?.currency} {productData?.discountPrice?.toFixed(0)}
                  </span>
                  <span className="text-zinc-900 line-through text-sm">
                    {productData?.price === productData?.discountPrice
                      ? ""
                      : productData?.currency}
                    {productData?.price === productData?.discountPrice
                      ? ""
                      : productData?.price?.toFixed(0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-auto right-0 mt-2 mr-2">
            {/* Place your edit icon here */}
            <button>
              <svg
                width="52"
                onClick={() => {
                  navigate("/editProduct", {
                    state: { productDetails: productData },
                  });
                }}
                height="52"
                viewBox="0 0 52 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_1770_15462)">
                  <circle cx="26" cy="26" r="20" fill="#FAFAFC" />
                </g>
                <path
                  d="M18.7852 33.2187C18.7586 33.2183 18.7324 33.2126 18.7081 33.2019C18.6837 33.1911 18.6618 33.1756 18.6436 33.1563C18.6254 33.1369 18.6113 33.1141 18.6021 33.0891C18.5929 33.0642 18.5888 33.0377 18.5901 33.0111L18.7977 29.6568C18.7994 29.609 18.8195 29.5637 18.8539 29.5304L30.0593 18.3249C30.2679 18.1168 30.5506 18 30.8452 18C31.1399 18 31.4225 18.1168 31.6311 18.3249L33.4838 20.1855C33.6915 20.3943 33.8081 20.6768 33.8081 20.9714C33.8081 21.2659 33.6915 21.5484 33.4838 21.7573L22.2784 32.9549C22.2449 32.989 22.1997 33.009 22.152 33.0111L18.7977 33.2187H18.7852ZM19.1816 29.7536L18.9928 32.8144L22.0536 32.6271L33.2076 21.4732C33.3424 21.3375 33.418 21.154 33.418 20.9628C33.418 20.7715 33.3424 20.5881 33.2076 20.4524L31.3564 18.6012C31.2207 18.4664 31.0372 18.3908 30.846 18.3908C30.6547 18.3908 30.4713 18.4664 30.3356 18.6012L19.1816 29.7536Z"
                  fill="black"
                />
                <path
                  d="M20.6384 31.3595C20.5998 31.3598 20.5618 31.3487 20.5295 31.3275C20.4972 31.3063 20.4718 31.2759 20.4568 31.2403C20.4417 31.2047 20.4376 31.1654 20.4449 31.1274C20.4523 31.0894 20.4707 31.0545 20.498 31.027L30.1613 21.3668C30.1794 21.3486 30.201 21.3343 30.2247 21.3244C30.2484 21.3146 30.2738 21.3096 30.2994 21.3096C30.3251 21.3096 30.3505 21.3146 30.3742 21.3244C30.3979 21.3343 30.4194 21.3486 30.4376 21.3668C30.4557 21.3849 30.4701 21.4065 30.4799 21.4302C30.4897 21.4539 30.4948 21.4793 30.4948 21.5049C30.4948 21.5306 30.4897 21.556 30.4799 21.5797C30.4701 21.6034 30.4557 21.6249 30.4376 21.6431L20.7774 31.3033C20.7401 31.3393 20.6903 31.3595 20.6384 31.3595Z"
                  fill="black"
                />
                <path
                  d="M31.8677 23.2729C31.8159 23.2729 31.7661 23.2528 31.7288 23.2168L28.5805 20.0669C28.5474 20.0297 28.5298 19.9811 28.5313 19.9313C28.5329 19.8815 28.5534 19.8341 28.5888 19.7989C28.6241 19.7638 28.6716 19.7435 28.7215 19.7422C28.7713 19.741 28.8197 19.7589 28.8568 19.7922L32.0051 22.9405C32.0321 22.9678 32.0505 23.0024 32.0579 23.0401C32.0654 23.0778 32.0615 23.1168 32.0468 23.1523C32.0322 23.1878 32.0073 23.2182 31.9755 23.2397C31.9436 23.2611 31.9061 23.2727 31.8677 23.2729Z"
                  fill="black"
                />
                <path
                  d="M22.2113 32.9351C22.1857 32.9353 22.1603 32.9303 22.1367 32.9203C22.113 32.9104 22.0917 32.8958 22.0739 32.8773L18.9241 29.7291C18.906 29.711 18.8917 29.6896 18.882 29.666C18.8722 29.6425 18.8672 29.6172 18.8672 29.5917C18.8672 29.5662 18.8722 29.5409 18.882 29.5174C18.8917 29.4938 18.906 29.4724 18.9241 29.4544C18.9421 29.4363 18.9635 29.422 18.9871 29.4122C19.0107 29.4025 19.0359 29.3975 19.0614 29.3975C19.0869 29.3975 19.1122 29.4025 19.1358 29.4122C19.1593 29.422 19.1808 29.4363 19.1988 29.4544L22.3471 32.6026C22.3652 32.6206 22.3796 32.642 22.3894 32.6656C22.3992 32.6892 22.4042 32.7144 22.4042 32.74C22.4042 32.7655 22.3992 32.7908 22.3894 32.8144C22.3796 32.8379 22.3652 32.8593 22.3471 32.8773C22.3295 32.8956 22.3084 32.9101 22.285 32.92C22.2617 32.9299 22.2366 32.9351 22.2113 32.9351Z"
                  fill="black"
                />
                <path
                  d="M18.1945 33.8043C18.1689 33.8045 18.1435 33.7995 18.1199 33.7895C18.0963 33.7796 18.075 33.765 18.0572 33.7465C18.0391 33.7286 18.0247 33.7072 18.0149 33.6836C18.0051 33.66 18 33.6347 18 33.6092C18 33.5837 18.0051 33.5584 18.0149 33.5348C18.0247 33.5112 18.0391 33.4898 18.0572 33.4718L18.6441 32.8834C18.6622 32.8652 18.6837 32.8509 18.7075 32.841C18.7312 32.8312 18.7566 32.8262 18.7822 32.8262C18.8079 32.8262 18.8333 32.8312 18.857 32.841C18.8807 32.8509 18.9022 32.8652 18.9203 32.8834C18.9385 32.9015 18.9529 32.9231 18.9627 32.9468C18.9725 32.9705 18.9776 32.9959 18.9776 33.0215C18.9776 33.0472 18.9725 33.0726 18.9627 33.0963C18.9529 33.12 18.9385 33.1415 18.9203 33.1597L18.3319 33.7465C18.3141 33.765 18.2928 33.7796 18.2692 33.7895C18.2455 33.7995 18.2202 33.8045 18.1945 33.8043Z"
                  fill="black"
                />
                <path
                  d="M28.9272 34.0006H23.035C22.9832 34.0006 22.9336 33.98 22.897 33.9434C22.8604 33.9068 22.8398 33.8572 22.8398 33.8055C22.8398 33.7537 22.8604 33.7041 22.897 33.6675C22.9336 33.6309 22.9832 33.6104 23.035 33.6104H28.9272C28.979 33.6104 29.0286 33.6309 29.0652 33.6675C29.1018 33.7041 29.1223 33.7537 29.1223 33.8055C29.1223 33.8572 29.1018 33.9068 29.0652 33.9434C29.0286 33.98 28.979 34.0006 28.9272 34.0006Z"
                  fill="black"
                />
                <defs>
                  <filter
                    id="filter0_d_1770_15462"
                    x="0"
                    y="0"
                    width="52"
                    height="52"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset />
                    <feGaussianBlur stdDeviation="3" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_1770_15462"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_1770_15462"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </button>
          </div>
          <div className="absolte top-0 right-2 mt-2 mr-14">
            <button>
              <svg
                width="52"
                height="52"
                viewBox="0 0 52 52"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent click from bubbling to the card div
                  Swal.fire({
                    title: "Are you sure?",
                    text: "You want to delete this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      // If confirmed, perform the delete operation
                      // You can place your delete logic here
                      deleteProduct(productData?._id)
                        .then((data) => {
                          console.log("success", data?.data);
                          if (result.isConfirmed) {
                          }
                          navigate("/AllProducts");
                        })
                        .catch((err) => {
                          console.log(err?.response?.data);
                        });
                      Swal.fire(
                        "Deleted!",
                        "Your file has been deleted.",
                        "success"
                      );
                      // For demonstration purposes, let's just log the deletion
                      console.log("Item deleted");
                    }
                  });
                }}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_1770_15461)">
                  <circle cx="26" cy="26" r="20" fill="#FF7266" />
                </g>
                <path
                  d="M20.9385 19.7505H23.6172V18.4201C23.6172 18.1751 23.7934 18 24.0402 18C24.0402 18 24.0402 18 24.0754 18L28.3402 18.035C28.5516 18.035 28.7279 18.2101 28.7279 18.4201V19.7505H31.2656H32.9574C33.1689 19.7505 33.3451 19.9606 33.3451 20.1707C33.3451 20.3807 33.1689 20.5558 32.9574 20.5558H31.8295V33.0197C31.8295 33.2648 31.7238 33.5098 31.5475 33.7199C31.3713 33.895 31.1246 34 30.8426 34H21.5377C21.2557 34 21.009 33.895 20.8328 33.7199C20.6566 33.5098 20.5156 33.2648 20.5156 33.0197V20.5558H19.423C19.1762 20.5558 19 20.3807 19 20.1707C19 19.9606 19.1762 19.7505 19.423 19.7505H20.5156H20.9385ZM24.4279 19.7505H27.9172V18.8053H24.4279V19.7505ZM28.9393 30.3939C28.9393 30.6039 28.7631 30.779 28.5516 30.779C28.3402 30.779 28.1639 30.6039 28.1639 30.3939V23.3567C28.1639 23.1466 28.3402 22.9716 28.5516 22.9716C28.7631 22.9716 28.9393 23.1466 28.9393 23.3567V30.3939ZM26.5779 30.3939C26.5779 30.6039 26.4016 30.779 26.1902 30.779C25.9434 30.779 25.7672 30.6039 25.7672 30.3939V23.3567C25.7672 23.1466 25.9434 22.9716 26.1902 22.9716C26.4016 22.9716 26.5779 23.1466 26.5779 23.3567V30.3939ZM24.2164 30.3939C24.2164 30.6039 24.0402 30.779 23.7934 30.779C23.582 30.779 23.4057 30.6039 23.4057 30.3939V23.3567C23.4057 23.1466 23.582 22.9716 23.7934 22.9716C24.0402 22.9716 24.2164 23.1466 24.2164 23.3567V30.3939ZM31.0541 20.5558H24.0402H21.3262V33.0197C21.3262 33.0547 21.3262 33.1247 21.3967 33.1597C21.432 33.1947 21.4672 33.1947 21.5377 33.1947H30.8426C30.8779 33.1947 30.9484 33.1947 30.9836 33.1597C31.0189 33.1247 31.0541 33.0547 31.0541 33.0197V20.5558Z"
                  fill="white"
                />
                <defs>
                  <filter
                    id="filter0_d_1770_15461"
                    x="0"
                    y="0"
                    width="52"
                    height="52"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset />
                    <feGaussianBlur stdDeviation="3" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_1770_15461"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_1770_15461"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <Card
          color={"rgba(240, 251, 235, 1)"}
          icon={"/arrowsatatue.png"}
          data={data}
          text={"Total Sells"}
        />

        <Card
          color={"rgba(255, 211, 208, 1)"}
          icon={"/squericon.png"}
          text={"Cancelled Orders"}
          data={data1}
        />
        <Card
          color={"rgba(209, 216, 255, 1)"}
          icon={"/fav.png"}
          text={"Total Added Favourites"}
          data={data2}
        />
        <Card
          color={"rgba(255, 231, 193, 1)"}
          icon={"/eye.png"}
          text={"Total Views"}
          data={data3}
        />
      </div>
      {/* graph data */}
      <div className="flex md:flex-row flex-col mt-10 gap-3 ">
        <div className="bg-containerWhite w-full md:w-[60%] max-h-[550px] p-4 rounded-lg shadow-sm">
          <LineChartProductSale
            salesAnalysis={salesAnalysis}
            setselected={setselected}
            selected={selected}
            currency={productData?.currency}
          />
        </div>
        <div
          className="bg-containerWhite max-h-[550px] overflow-hidden overflow-y-auto  w-full md:w-[40%] p-4 rounded-lg shadow-sm"
          style={{ scrollbarWidth: "none" }}
        >
          <h1 className="font-semibold text-2xl mt-1">Customers Demographic</h1>
          <h3 className=" text-gray-400 mb-5">
            Number of customers based on country
          </h3>
          <MyVectorMap
            topViewedCountry={topViewedCountry}
            topSelledCountry={topSelledCountry}
          />
          {/* top seeled cont */}
          {topSelledCountry?.length > 0 &&
            topSelledCountry?.map((country, index) => {
              const countryCode = countryCodeMap[country?.country.trim()];
              return (
                <div className="mt-4">
                  <h1 className="text-md ">Top Selled Country</h1>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex gap-2 items-center">
                      <div className="rounded-full w-16 h-16 overflow-x-hidden">
                        <ReactCountryFlag
                          countryCode={countryCode}
                          svg
                          style={{
                            width: "4em",
                            height: "4em",
                          }}
                          title={country[index]}
                        />
                      </div>
                      <div className="text-sm">
                        <h1>{country?.country}</h1>
                        <p className="text-gray-500 text-sm">
                          {country?.count} Sales
                        </p>
                      </div>
                    </div>
                    <div className="rounded-lg w-7 h-7 bg-[#BE0A33]"></div>
                  </div>
                </div>
              );
            })}
          {/* top seeled cont */}
          {/* most viewed */}
          {topViewedCountry?.length > 0 &&
            topViewedCountry?.map((country, index) => {
              const countryCode = countryCodeMap[country?.country.trim()];
              return (
                <div className="mt-4">
                  <h1 className="text-md ">Top Viewed Country</h1>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex gap-2 items-center">
                      <div className="rounded-full w-16 h-16 overflow-x-hidden">
                        <ReactCountryFlag
                          countryCode={countryCode}
                          svg
                          style={{
                            width: "4em",
                            height: "4em",
                          }}
                          title={country[index]}
                        />
                      </div>
                      <div className="text-sm">
                        <h1>{country?.country}</h1>
                        <p className="text-gray-500 text-sm">
                          {country?.viewCount} Views
                        </p>
                      </div>
                    </div>
                    <div
                      className="rounded-lg w-7 h-7"
                      style={{ backgroundColor: "#002654" }}
                    ></div>
                  </div>
                </div>
              );
            })}
          {/* most viewed */}

          {/* table start */}
        </div>
      </div>
      <div className="mt-2">
        <p className="text-3xl font-semibold">Reviews</p>
      </div>
      <div className="w-full flex-col flex md:flex-row gap-5 mt-5">
        <div className="p-4 bg-white w-full md:w-[40%] md:max-w[300px] rounded-lg">
          <div className="flex gap-2 items-center">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 28C21.732 28 28 21.732 28 14C28 6.26801 21.732 0 14 0C6.26801 0 0 6.26801 0 14C0 21.732 6.26801 28 14 28Z"
                fill="#34A4E3"
              />
              <path
                d="M14.0009 5.44531L16.649 10.6937L22.5564 11.5574L18.2786 15.6099L19.2972 21.3898L14.0009 18.6659L8.70457 21.3898L9.72309 15.6099L5.44531 11.5574L11.3527 10.6937L14.0009 5.44531Z"
                fill="white"
              />
            </svg>
            Overall Ratings
          </div>
          <div className="flex items-center justify-center mt-4">
            <h1 className="font-semibold text-3xl" style={{ fontSize: "45px" }}>
              {productReviewDatas?.ratings?.average}
              <span className="text-[#858D9D]">/5</span>{" "}
            </h1>
          </div>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Rating name="read-only" value={Ratings} readOnly />
          </div>
          <div className="flex items-center justify-center gap-2 mt-3 text-xs text-[#858D9D]">
            {productReviewDatas?.reviews?.length} Ratings
          </div>
        </div>
      </div>
      <div
        className="w-full bg-white rounded-lg mt-10 overflow-x-auto"
        style={{ scrollbarWidth: "none" }}
      >
        <table className="min-w-[70vh] w-full text-center  leading-normal mt-5 max-h-72 overflow-x-auto">
          <thead className="border-b  border-b-[#3F3F3F]">
            <tr>
              <th className="px-5 py-6   text-sm font-semibold  capitalize tracking-wider">
                Customer
              </th>
              {/* <th className="px-5 py-6  text-left text-sm font-semibold  capitalize tracking-wider"></th> */}
              <th className="px-5 py-6   text-sm font-semibold  capitalize tracking-wider">
                Review
              </th>
              <th className="px-5 py-6   text-sm font-semibold  capitalize tracking-wider">
                Date
              </th>

              {/* <th className="px-5 py-6   text-sm font-semibold  capitalize tracking-wider">
                Action
              </th> */}
            </tr>
          </thead>
          <tbody className="border-b-2  border-b-[#3F3F3F]">
            {productReviewDatas?.reviews?.length > 0 ? (
              productReviewDatas?.reviews?.map((review, index) => {
                return (
                  <tr className="" style={{ height: "50px" }}>
                    <td className="px-5 py-3 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 overflow-hidden rounded-full bg-[#1F222A]">
                          <img
                            src={
                              review?.user?.details.profilePicture
                                ? review?.user?.details.profilePicture
                                : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                            }
                            className="w-10 h-10 rounded-full"
                            alt=""
                          />
                        </div>
                        {review?.user?.name}
                      </div>
                    </td>

                    <td className="px-5 py-5 text-xs text-[#6F757E] text-transform: capitalize">
                      <div className="">
                        <div className="flex items-center justify-center px-3 mb-3 gap-2 mt-2">
                          <Rating
                            name="read-only"
                            value={review?.rating}
                            readOnly
                          />
                        </div>
                        {review?.review}
                      </div>
                    </td>
                    <td className="px-5 py-3 text-sm">
                      {new Date(review?.Date).toLocaleDateString()}
                    </td>

                    {/* <td className="px-5 py-3 text-sm">
                      <div className="bg-[#f6f6f7] rounded-md border flex border-[#6F757E]">
                        <button className="flex w-full items-center justify-center   p-1">
                          <svg
                            width="15"
                            height="14"
                            viewBox="0 0 15 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M10.9094 13.0156H4.08438C3.5459 13.0156 3.10938 12.5791 3.10938 12.0406V3.26562H11.8844V12.0406C11.8844 12.5791 11.4479 13.0156 10.9094 13.0156Z"
                              stroke="#F85949"
                              stroke-width="0.918314"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M6.03984 10.0875V6.1875"
                              stroke="#F85949"
                              stroke-width="0.918314"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M8.96172 10.0875V6.1875"
                              stroke="#F85949"
                              stroke-width="0.918314"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M1.16406 3.2625H13.8391"
                              stroke="#F85949"
                              stroke-width="0.918314"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M8.9625 1.3125H6.0375C5.49902 1.3125 5.0625 1.74902 5.0625 2.2875V3.2625H9.9375V2.2875C9.9375 1.74902 9.50098 1.3125 8.9625 1.3125Z"
                              stroke="#F85949"
                              stroke-width="0.918314"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </td> */}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-5 ">
                  No Reviews
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* <div className="w-full flex justify-end px-10 mb-4 mt-8">
          <ThemeProvider theme={theme}>
            <Pagination
              count={2}
              // onChange={handlePageChange}
            />
          </ThemeProvider>
        </div> */}
      </div>
    </>
  );
};

export default ProductDetailed;
