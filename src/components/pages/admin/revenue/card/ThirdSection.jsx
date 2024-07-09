import { ChartContainer, PieChart } from "@mui/x-charts";
import React, { useContext, useEffect, useState } from "react";
import styled from "@emotion/styled";
import DropDown from "../DropDown";
import ThirdSectionCard from "./ThirdSectionCard";
import {
  getBannerRevenue,
  getCloudRevenue,
  getColorGraph,
  getFlixRevenue,
  getRevenueOrderDetails,
  geytgraphdataofRevenue,
  specialDealrevenue,
} from "../../../../../Api/ApiCall";
import { log10 } from "chart.js/helpers";
import { UserContext } from "../../../../pages/admin/revenue/Adminrevenue";

export default function ThirdSection() {
  const [orederRevenue, setOrderRevenue] = useState({});
  const [drop, setDrop] = useState(false);
  const [coludData, setCloudData] = useState({});
  const [cloudkeyword, setCloudKeyword] = useState("");
  const [flicksdata, setFlixdata] = useState({});
  const [flikskeyword, setFlixKeyword] = useState("");
  const [spcielDealsData, setSpesialDealsdata] = useState({});
  const [spesielKeyword, setSpesielKeyWord] = useState("");
  const [bannerData, setBannerdata] = useState({});
  const [bannerKeyword, setBannerKeword] = useState("");
  const [colorGraphData, setColorGraphData] = useState();
  const [colorgraphkey, setColorgraphkey] = useState("");
  const [colorgrapharray, setcolorgraphArray] = useState([]);
  const [cloud, setcloud] = useState("");
  const [flicks, setficks] = useState("");
  const [specialDeel, setSpsialDeel] = useState("");
  const [banner, setbanner] = useState("");
  const [revenuedropkey, setRevDropKey] = useState("");
  const [totalAmount, setTotalAmount] = useState({});
  const [drop2, setDrp2] = useState(false);
  const [orederKey, setOrderKey] = useState("lastWeek");
  const [orederKey1, setOrderkey1] = useState("This Year");
  useEffect(() => {
    getCloudRevenue(cloudkeyword)
      .then((data) => {
        setCloudData(data?.data);
      })
      .catch((err) => console.log(err));
  }, [cloudkeyword]);
  useEffect(() => {
    getBannerRevenue(bannerKeyword)
      .then((data) => {
        console.log(data);
        setBannerdata(data?.data);
      })
      .catch((err) => console.log(err));
  }, [bannerKeyword]);
  useEffect(() => {
    specialDealrevenue(spesielKeyword)
      .then((data) => {
        setSpesialDealsdata(data?.data);
      })
      .catch((err) => console.log(err));
  }, [spesielKeyword]);
  useEffect(() => {
    getRevenueOrder();
  }, [orederKey]);
  const getRevenueOrder = () => {
    getRevenueOrderDetails(orederKey)
      .then((data) => {
        console.log(data?.data);
        setOrderRevenue(data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getFlixRevenue(flikskeyword)
      .then((data) => {
        setFlixdata(data?.data);
      })
      .catch((err) => console.log(err));
  }, [flikskeyword]);
  // let segmentOffset = 360 / segments.length;
  useEffect(() => {
    getColorGraph(colorgraphkey)
      .then((data) => {
        console.log(data?.data?.incomeArray);
        setColorGraphData(data?.data);
        setcolorgraphArray(data?.data?.incomeArray);
      })
      .catch((err) => console.log(err));
  }, [colorgraphkey]);
  const [keyWord1, setKeyWord1] = useState("");
  const [keyWord2, setKeyWord2] = useState("");
  const Symbol = useContext(UserContext);
  return (
    <div className="flex md:flex-row flex-col mt-5 gap-8">
      <div className="bg-containerWhite max-w-[600px] w-full rounded-lg p-4">
        <div className="p-1 mb-3 flex justify-between">
          <p className="font-bold">All income</p>
          <DropDown
            drop1={drop}
            setDrp1={setDrop}
            keyWord1={keyWord1}
            setKeyWord1={setKeyWord1}
            keword={colorgraphkey}
            setkeyword={setColorgraphkey}
          />
        </div>
        <div className=" w-full  lg:flex-row flex-col  flex gap-4 ">
          <div className="progress lg:ml-0 md:ml-0 ml-10  w-[205px]  flex items-center justify-center gap-4">
            <PieChart
              series={[
                {
                  data: colorgrapharray,
                  innerRadius: 70,
                  outerRadius: 100,
                  paddingAngle: 1,
                  cornerRadius: 5,
                  startAngle: -90,
                  endAngle: 360,
                  cx: 95,
                  cy: 100,
                },
              ]}
            >
              <text
                className="font-bold text-xl"
                x="48%"
                y="45%"
                dominantBaseline="middle"
                textAnchor="middle"
                fill="black"
              >
                {Symbol} {colorGraphData?.totalIncome?.toFixed()}
              </text>
              <text
                className="text-sm text-center"
                x="48%"
                y="55%"
                dominantBaseline="middle"
                textAnchor="middle"
                fill="black"
              >
                Total
              </text>
            </PieChart>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 ml-5 md:grid-cols-1 gap-4">
            {colorgrapharray.map((data) => {
              return (
                <div className="flex gap-2  items-center w-full">
                  <div
                    className="h-5 w-5 rounded-full"
                    style={{ backgroundColor: data?.color }}
                  />
                  {data?.source}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className=" p-4 w-full">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
          <ThirdSectionCard
            keword={cloudkeyword}
            setkeyword={setCloudKeyword}
            keyWord1={keyWord2}
            setKeyWord1={setKeyWord2}
            data={coludData}
            firstText={"Cloud"}
            img={
              <svg
                width="52"
                height="52"
                viewBox="0 0 52 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_2616_11998)">
                  <rect
                    x="6"
                    y="5"
                    width="40"
                    height="40"
                    rx="10"
                    fill="#FF685B"
                  />
                </g>
                <path
                  d="M29.4436 22.935C28.974 23.2003 28.5533 23.5431 28.1481 23.9208L27.451 23.0091C27.9639 22.4651 28.5619 22.0395 29.2046 21.7268C27.904 19.0925 24.7583 18.4037 22.684 20.2454C21.9308 20.912 21.3591 21.9097 21.1392 23.2312L21.0699 23.6441L20.7098 23.7169C20.3569 23.7874 20.0418 23.8848 19.7655 24.0083C18.041 24.7712 17.5568 26.9656 18.612 28.6319C19.0635 29.3409 19.6391 30.0638 20.3943 30.1842H21.4502C21.4429 30.3029 21.4391 30.4225 21.4391 30.5432C21.4391 30.8338 21.4606 31.1185 21.5021 31.3956H20.3774L20.3109 31.3889C19.2537 31.2352 18.3848 30.3354 17.757 29.3413C16.2932 27.0372 17.0139 23.9315 19.387 22.8792C19.6346 22.7688 19.8995 22.6765 20.1786 22.6025C20.4955 21.1638 21.1707 20.0561 22.0389 19.2873C24.7119 16.9195 28.7247 17.9286 30.2556 21.4077C30.4859 21.3661 30.7165 21.3451 30.9454 21.3483C34.3702 21.3772 35.7246 26.384 33.9474 29.0812C33.2351 30.1616 32.1425 31.0808 31.0175 31.3793L30.8994 31.3956H30.2134C30.2729 30.9956 30.2904 30.5889 30.2653 30.1842H30.8405C31.6768 29.9542 32.5688 29.1675 33.0993 28.3567C34.3619 26.4343 33.4657 22.5748 30.9382 22.5566C30.4443 22.5518 29.9301 22.6884 29.4436 22.935ZM25.1285 32.4467H26.6023C26.9468 32.4467 27.2294 32.1236 27.2294 31.7297V29.4082H28.3043C28.5307 29.3971 28.6914 29.3116 28.7846 29.1501C29.0363 28.7182 28.6925 28.2918 28.4539 27.9913C27.7769 27.1418 26.6109 25.884 26.2768 25.4343C26.0233 25.1144 25.6631 25.1144 25.4096 25.4343C25.0644 25.8951 23.8569 27.2463 23.2131 28.0725C22.9898 28.3603 22.7138 28.7522 22.9458 29.1501C23.0414 29.3116 23.2003 29.3971 23.4268 29.4082H24.5017V31.7297C24.5017 32.1193 24.7839 32.4467 25.1285 32.4467Z"
                  fill="white"
                />
                <defs>
                  <filter
                    id="filter0_d_2616_11998"
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
                    <feMorphology
                      radius="2"
                      operator="dilate"
                      in="SourceAlpha"
                      result="effect1_dropShadow_2616_11998"
                    />
                    <feOffset dy="1" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 1 0 0 0 0 0.407843 0 0 0 0 0.356863 0 0 0 0.4 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_2616_11998"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_2616_11998"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            }
          />
          <ThirdSectionCard
            data={flicksdata}
            firstText={"Flicks"}
            keword={flikskeyword}
            setkeyword={setFlixKeyword}
            keyWord1={flicks}
            setKeyWord1={setficks}
            img={
              <svg
                width="52"
                height="52"
                viewBox="0 0 52 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_2610_13529)">
                  <rect
                    x="6"
                    y="5"
                    width="40"
                    height="40"
                    rx="10"
                    fill="#2F4EFF"
                  />
                </g>
                <path
                  d="M36 25V26C34.4087 26 32.8826 26.6321 31.7574 27.7574C30.6321 28.8826 30 30.4087 30 32H29C29.0029 30.1444 29.7414 28.3656 31.0535 27.0535C32.3656 25.7414 34.1444 25.0029 36 25ZM32 32H33C33.0012 31.2047 33.3176 30.4423 33.88 29.88C34.4423 29.3176 35.2047 29.0012 36 29V28C34.9391 28 33.9217 28.4214 33.1716 29.1716C32.4214 29.9217 32 30.9391 32 32ZM24 22.14L29.0089 25L24 27.8622V22.14ZM25 26.14L27 25L25 23.8622V26.14ZM35 32H36V31H35V32ZM33.5022 18H18.5022C17.8392 18.0006 17.2034 18.2641 16.7343 18.7327C16.2653 19.2014 16.0012 19.8369 16 20.5V29.5C16.0006 30.1632 16.2645 30.7991 16.7337 31.2679C17.2029 31.7367 17.839 32 18.5022 32H27V31H18.5022C18.1042 31 17.7224 30.842 17.4408 30.5608C17.1591 30.2796 17.0006 29.898 17 29.5V20.5C17.0006 20.102 17.1591 19.7204 17.4408 19.4392C17.7224 19.158 18.1042 19 18.5022 19H33.5022C33.8997 19.0006 34.2806 19.1589 34.5614 19.4401C34.8423 19.7214 35 20.1026 35 20.5V23H36V20.5C35.9994 19.8375 35.7361 19.2023 35.2679 18.7337C34.7997 18.265 34.1647 18.0012 33.5022 18Z"
                  fill="white"
                />
                <defs>
                  <filter
                    id="filter0_d_2610_13529"
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
                    <feMorphology
                      radius="2"
                      operator="dilate"
                      in="SourceAlpha"
                      result="effect1_dropShadow_2610_13529"
                    />
                    <feOffset dy="1" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0.184314 0 0 0 0 0.305882 0 0 0 0 1 0 0 0 0.4 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_2610_13529"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_2610_13529"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            }
          />
          <div className="w-full bg-containerWhite rounded-lg p-3">
            <div className="flex items-center justify-between ">
              <div className=" flex items-center gap-1">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 82 82"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_3221_12222)">
                    <rect
                      x="6"
                      y="5"
                      width="70"
                      height="70"
                      rx="10"
                      fill="#FFBF1F"
                    />
                  </g>
                  <path
                    d="M57.4383 47.61H55.459V36.5779C56.1728 36.0912 56.6271 35.28 56.6271 34.3391V31.5485C56.6271 31.4836 56.5946 31.4187 56.5622 31.3538L53.0903 26.1298C53.0254 26.0324 52.928 26 52.8307 26H30.7986C30.7012 26 30.6039 26.0649 30.539 26.1298L27.0346 31.3538C27.0022 31.4187 26.9697 31.4836 26.9697 31.5485V34.3391C26.9697 35.2476 27.424 36.0913 28.1378 36.5779V47.61H26.1585C25.6718 47.61 25.25 47.9994 25.25 48.5185V50.6276C25.25 51.5362 25.9639 52.25 26.8724 52.25H56.7244C57.6329 52.25 58.3467 51.5361 58.3467 50.6276V48.5185C58.3467 47.9994 57.9574 47.61 57.4383 47.61ZM53.869 36.4155C52.7009 36.4155 51.7923 35.4746 51.7923 34.3389V31.8729H55.978V34.3389C55.9456 35.4746 55.0371 36.4155 53.869 36.4155ZM30.7338 36.8698C31.3178 36.6427 31.837 36.1884 32.129 35.6044C32.5833 36.4805 33.4918 37.0645 34.5301 37.0645C35.5685 37.0645 36.477 36.4805 36.9313 35.6044C37.3855 36.4805 38.294 37.0645 39.3324 37.0645C40.3707 37.0645 41.2792 36.4805 41.7335 35.6044C42.1878 36.4805 43.0963 37.0645 44.1346 37.0645C45.1729 37.0645 46.0815 36.4805 46.5357 35.6044C46.99 36.4805 47.8985 37.0645 48.9368 37.0645C49.9752 37.0645 50.8837 36.4805 51.338 35.6044C51.63 36.156 52.1491 36.6103 52.7332 36.8698V45.6632H30.7335L30.7338 36.8698ZM32.4535 31.8406H36.6392V34.3066C36.6392 35.4747 35.6982 36.3833 34.5625 36.3833C33.4268 36.3833 32.4859 35.4423 32.4859 34.3066V31.8406H32.4535ZM46.9577 31.8406H51.1434V34.3066C51.1434 35.4747 50.2024 36.3833 49.0668 36.3833C47.9311 36.3833 46.9901 35.4423 46.9901 34.3066V31.8406H46.9577ZM46.3087 34.3391C46.3087 35.5072 45.3678 36.4157 44.2321 36.4157C43.0964 36.4157 42.123 35.4747 42.123 34.3391V31.873H46.3087L46.3087 34.3391ZM41.4739 34.3391C41.4739 35.5072 40.5329 36.4157 39.3972 36.4157C38.2615 36.4157 37.3205 35.4747 37.3205 34.3391V31.873H41.4739V34.3391ZM30.961 26.6488H52.6363L55.6864 31.2241H27.9111L30.961 26.6488ZM27.6513 34.3391V31.873H31.837V34.3391C31.837 35.5072 30.896 36.4157 29.7603 36.4157C28.6247 36.4157 27.6513 35.4747 27.6513 34.3391ZM28.787 36.9024C29.079 36.9998 29.4035 37.0647 29.7279 37.0647C29.8577 37.0647 29.9875 37.0647 30.0849 37.0322V45.9552C30.0849 46.1499 30.2147 46.2797 30.4094 46.2797H53.1554C53.3501 46.2797 53.4799 46.1499 53.4799 45.9552V37.0322C53.6097 37.0647 53.707 37.0647 53.8368 37.0647C54.1613 37.0647 54.4858 36.9998 54.7778 36.9024V47.6101H46.4712C46.3738 47.6101 46.2765 47.6426 46.2116 47.7075L45.1408 48.7134H38.4565L37.3857 47.7075C37.3208 47.6426 37.2559 47.6101 37.1586 47.6101H28.7871L28.787 36.9024ZM57.6978 50.5955C57.6978 51.1471 57.276 51.569 56.7244 51.569H26.8724C26.3208 51.569 25.8989 51.1472 25.8989 50.5955V48.4864C25.8989 48.3566 25.9963 48.2268 26.1585 48.2268H37.0286L38.0993 49.2327C38.1642 49.2976 38.2291 49.3301 38.3265 49.3301H45.2704C45.3678 49.3301 45.4326 49.2976 45.4975 49.2327L46.5683 48.2268H57.4384C57.5682 48.2268 57.698 48.3242 57.698 48.4864L57.6978 50.5955Z"
                    fill="white"
                  />
                  <path
                    d="M28.5948 49.9181C28.5948 50.7828 27.2969 50.7828 27.2969 49.9181C27.2969 49.0534 28.5948 49.0534 28.5948 49.9181Z"
                    fill="white"
                  />
                  <path
                    d="M30.9698 49.9181C30.9698 50.7828 29.6719 50.7828 29.6719 49.9181C29.6719 49.0534 30.9698 49.0534 30.9698 49.9181Z"
                    fill="white"
                  />
                  <defs>
                    <filter
                      id="filter0_d_3221_12222"
                      x="0"
                      y="0"
                      width="82"
                      height="82"
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
                      <feMorphology
                        radius="2"
                        operator="dilate"
                        in="SourceAlpha"
                        result="effect1_dropShadow_3221_12222"
                      />
                      <feOffset dy="1" />
                      <feGaussianBlur stdDeviation="2" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 0.74902 0 0 0 0 0.121569 0 0 0 0.4 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_3221_12222"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_3221_12222"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
                <p className="font-semibold">Orders</p>
              </div>
              <div
                className="flex justify-center relative gap-1 text-xs items-center max-w-[100px] p-1 rounded-xl"
                onClick={() => setDrp2(!drop2)}
                style={{ backgroundColor: "#0000000D" }}
              >
                <p>{orederKey1}</p>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.70711 6.70711L7.29289 10.2929C7.68342 10.6834 8.31658 10.6834 8.70711 10.2929L12.2929 6.70711C12.9229 6.07714 12.4767 5 11.5858 5H4.41421C3.52331 5 3.07714 6.07714 3.70711 6.70711Z"
                    fill="black"
                  />
                </svg>
                {drop2 && (
                  <div
                    className="z-50 text-center absolute w-full top-7 rounded-md left-0 bg-slate-200"
                    // style={{ backgroundColor: "#0000000D" }}
                  >
                    <p
                      className="p-1 cursor-pointer"
                      onClick={() => {
                        setOrderkey1("This Week");
                        setOrderKey("lastWeek");
                      }}
                    >
                      This Week
                    </p>
                    <p
                      className="p-1 cursor-pointer"
                      onClick={() => {
                        setOrderkey1("This Month");
                        setOrderKey("lastMonth");
                      }}
                    >
                      This Month
                    </p>
                    <p
                      className="p-1 cursor-pointer"
                      onClick={() => {
                        setOrderkey1("This Year");
                        setOrderKey("lastYear");
                      }}
                    >
                      This Year
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-end gap-4 mt-5">
              <p className="text-2xl font-bold  p-0 ">
              {Symbol}{orederRevenue?.orderRevenue ? orederRevenue?.orderRevenue.toFixed(1) : 0}
              </p>
              <div className="flex text-xs gap-1 mb-1">
                <svg
                  width="12"
                  height="13"
                  viewBox="0 0 12 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.2 11.5V1M6.2 1L1 5.5M6.2 1L11 5.5"
                    stroke="#10C800"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p>{orederRevenue?.percentage ? orederRevenue?.percentage.toFixed(1) : 0 }%</p>
              </div>
            </div>
          </div>
          <ThirdSectionCard
            data={bannerData}
            firstText={"Banner Section"}
            keword={bannerKeyword}
            setkeyword={setBannerKeword}
            keyWord1={banner}
            setKeyWord1={setbanner}
            img={
              <svg
                width="52"
                height="52"
                viewBox="0 0 52 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_2610_13539)">
                  <rect
                    x="6"
                    y="5"
                    width="40"
                    height="40"
                    rx="10"
                    fill="#21BBFF"
                  />
                </g>
                <path
                  d="M21.8912 25.1273C21.8139 25.1274 21.7378 25.1084 21.6697 25.072C21.6015 25.0356 21.5435 24.9829 21.5006 24.9186L20.5631 23.5123C20.5118 23.4353 20.4844 23.3449 20.4844 23.2523C20.4844 23.1598 20.5118 23.0693 20.5631 22.9923L21.5006 21.5861C21.5344 21.5341 21.5782 21.4894 21.6294 21.4545C21.6806 21.4196 21.7383 21.3952 21.799 21.3827C21.8597 21.3702 21.9223 21.3698 21.9832 21.3817C22.044 21.3936 22.1019 21.4174 22.1535 21.4518C22.205 21.4862 22.2493 21.5304 22.2836 21.582C22.318 21.6336 22.3418 21.6915 22.3536 21.7524C22.3654 21.8132 22.3651 21.8758 22.3525 21.9366C22.34 21.9973 22.3155 22.0549 22.2806 22.1061L21.5162 23.2523L22.2806 24.3986C22.3276 24.4691 22.3546 24.5511 22.3588 24.6358C22.3629 24.7205 22.3439 24.8047 22.304 24.8795C22.264 24.9543 22.2045 25.0168 22.1319 25.0605C22.0592 25.1041 21.976 25.1272 21.8912 25.1273ZM29.0775 25.1273C28.9927 25.1272 28.9095 25.1041 28.8368 25.0605C28.7641 25.0168 28.7046 24.9543 28.6647 24.8795C28.6247 24.8047 28.6058 24.7205 28.6099 24.6358C28.614 24.5511 28.6411 24.4691 28.6881 24.3986L29.4525 23.2523L28.6881 22.1061C28.6208 22.0026 28.5969 21.8768 28.6218 21.7559C28.6467 21.635 28.7182 21.5288 28.8209 21.4603C28.9236 21.3919 29.0492 21.3667 29.1704 21.3902C29.2915 21.4138 29.3985 21.4841 29.4681 21.5861L30.4056 22.9923C30.4569 23.0693 30.4843 23.1598 30.4843 23.2523C30.4843 23.3449 30.4569 23.4353 30.4056 23.5123L29.4681 24.9186C29.4252 24.9829 29.3671 25.0356 29.299 25.072C29.2308 25.1084 29.1547 25.1274 29.0775 25.1273ZM22.3593 29.6586C21.9287 29.6586 21.5781 29.308 21.5781 28.8773C21.5781 28.4467 21.9287 28.0961 22.3593 28.0961C22.79 28.0961 23.1406 28.4467 23.1406 28.8773C23.1406 29.308 22.79 29.6586 22.3593 29.6586ZM22.3593 28.7211C22.3179 28.7211 22.2782 28.7375 22.2489 28.7669C22.2196 28.7962 22.2031 28.8359 22.2031 28.8773C22.2031 29.0492 22.5156 29.0492 22.5156 28.8773C22.5156 28.8359 22.4991 28.7962 22.4698 28.7669C22.4405 28.7375 22.4008 28.7211 22.3593 28.7211ZM25.4843 29.6586C25.0537 29.6586 24.7031 29.308 24.7031 28.8773C24.7031 28.4467 25.0537 28.0961 25.4843 28.0961C25.915 28.0961 26.2656 28.4467 26.2656 28.8773C26.2656 29.308 25.915 29.6586 25.4843 29.6586ZM25.4843 28.7211C25.4429 28.7211 25.4032 28.7375 25.3739 28.7669C25.3446 28.7962 25.3281 28.8359 25.3281 28.8773C25.3281 29.0492 25.6406 29.0492 25.6406 28.8773C25.6406 28.8359 25.6241 28.7962 25.5948 28.7669C25.5655 28.7375 25.5258 28.7211 25.4843 28.7211ZM28.6093 29.6586C28.1787 29.6586 27.8281 29.308 27.8281 28.8773C27.8281 28.4467 28.1787 28.0961 28.6093 28.0961C29.04 28.0961 29.3906 28.4467 29.3906 28.8773C29.3906 29.308 29.04 29.6586 28.6093 29.6586ZM28.6093 28.7211C28.5679 28.7211 28.5282 28.7375 28.4989 28.7669C28.4696 28.7962 28.4531 28.8359 28.4531 28.8773C28.4531 29.0492 28.7656 29.0492 28.7656 28.8773C28.7656 28.8359 28.7491 28.7962 28.7198 28.7669C28.6905 28.7375 28.6508 28.7211 28.6093 28.7211Z"
                  fill="white"
                />
                <path
                  d="M31.2812 32H19.7188C19.263 31.9997 18.826 31.8185 18.5038 31.4962C18.1815 31.174 18.0003 30.737 18 30.2812V18.7188C18.0003 18.263 18.1815 17.826 18.5038 17.5038C18.826 17.1815 19.263 17.0003 19.7188 17H31.2812C31.737 17.0003 32.174 17.1815 32.4962 17.5038C32.8185 17.826 32.9997 18.263 33 18.7188V30.2812C32.9997 30.737 32.8185 31.174 32.4962 31.4962C32.174 31.8185 31.737 31.9997 31.2812 32ZM19.7188 17.9375C19.2881 17.9375 18.9375 18.2881 18.9375 18.7188V30.2812C18.9375 30.7119 19.2881 31.0625 19.7188 31.0625H31.2812C31.7119 31.0625 32.0625 30.7119 32.0625 30.2812V18.7188C32.0625 18.2881 31.7119 17.9375 31.2812 17.9375H19.7188Z"
                  fill="white"
                />
                <defs>
                  <filter
                    id="filter0_d_2610_13539"
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
                    <feMorphology
                      radius="2"
                      operator="dilate"
                      in="SourceAlpha"
                      result="effect1_dropShadow_2610_13539"
                    />
                    <feOffset dy="1" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0.129412 0 0 0 0 0.733333 0 0 0 0 1 0 0 0 0.4 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_2610_13539"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_2610_13539"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            }
          />
        </div>
      </div>
    </div>
  );
}
