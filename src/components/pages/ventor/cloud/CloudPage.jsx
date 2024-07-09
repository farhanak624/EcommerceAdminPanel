import React, { useEffect, useRef, useState } from "react";
import {
  cloudPaymentPaypal,
  cloudPaymentStripe,
  getAllClouds,
} from "../../../../Api/ApiCall";
import { useDispatch } from "react-redux";
import {
  loadSpinner,
  sendigCloud,
} from "../../../../Redux/Features/NavbarSlice";

function CloudPage() {
  const [allCloud, setAllCloud] = useState([]);
  const [selectedOption, setSelectedOption] = useState("option1");
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [openModal, setOpenmodal] = useState(false);
  const [loading, setIsloading] = useState(false);
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
  console.log(page);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadSpinner());
    getAllclodPlane();
  }, [page]);
  const getAllclodPlane = () => {
    getAllClouds(page)
      .then((data) => {
        setAllCloud((prev) => [...prev, ...data?.data?.cloudDatas]);
        console.log(data?.data?.cloudDatas);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        dispatch(loadSpinner());
      });
  };
  const handleChange = (event) => {
    setSelectedOption(event?.target?.value);
  };
  return (
    <div className="relative">
      {openModal && (
        <div
          className="shado absolute w-full h-[100%] z-50 flex  justify-center"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.20)",
            boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.3)", // Adding shadow
            backdropFilter: "blur(3px)", // Adding blur
          }}
        >
          <div className="bg-containerWhite mt-40 w-[90%] max-h-60 lg:w-[30%] p-3">
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
            <div className="flex md:flex-row flex-col gap-3 justify-center">
              <button
                onClick={() => {
                  setIsloading(true);
                  if (selectedOption === "option2") {
                    cloudPaymentStripe(selectedPrice)
                      .then((data) => {
                        console.log(data?.data?.url);
                        const newWindow = window.open(
                          `${data?.data?.url}`,
                          "_blank"
                        );
                        setIsloading(false);
                        setOpenmodal(false);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  } else if (selectedOption === "option1") {
                    cloudPaymentPaypal(selectedPrice)
                      .then((data) => {
                        setIsloading(true);
                        console.log(data?.data?.url);
                        const newWindow = window.open(
                          `${data?.data?.url}`,
                          "_blank"
                        );
                        setIsloading(false);
                        setOpenmodal(false);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }
                }}
                className="w-full p-2 bg-navblue justify-center items-center flex gap-9 mt-4 rounded-md text-white"
              >
                Place order
                {loading && <img src="/loading.gif" className="w-8" alt="" />}
              </button>
              <button
                onClick={() => {
                  setOpenmodal(false);
                }}
                className="w-full p-2 border border-red-600 text-red-700 mt-4 rounded-md "
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-containerWhite p-4 rounded-lg relative">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-transform: capitalize">
            Buy New cloud storage
          </h1>
          {/* <p className="mt-2 text-xs">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s,
          </p> */}
        </div>
        {/* crdt div */}
        <div className="grid mt-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10">
          {/* first card */}
          {allCloud.length > 0 &&
            allCloud.map((data) => {
              return (
                <div
                  className="p-4 rounded-lg relative shadow-md bg-white"
                  style={{
                    background:
                      "radial-gradient(circle,rgba(226, 230, 252, 1),rgba(247, 248, 250, 1))",
                  }}
                >
                  <div className="flex gap-3 items-center">
                    <div className="bg-green-900 rounded-lg w-16 ml-2 h-16 overflow-hidden">
                      <img
                        src={data?.image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h1 className="font-bold mb-4 text-2xl ml-2 text-transform: capitalize">
                        {data?.cloudName}
                      </h1>
                      <div className=" px-3 p-1 flex justify-center items-center text-white rounded-lg bg-navblue">
                        $ {data?.cloudPrice}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-center">
                    {data?.cloudPrice < 0 && "Free"}
                  </div>
                  {/* tickdiv */}
                  <div>
                    {data?.specification.length > 0 &&
                      data.specification.map((speci) => {
                        return (
                          <p className="flex gap-3 items-center mt-4 text-transform: capitalize">
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M7 0C10.8657 0 14 3.13428 14 7C14 10.8657 10.8657 14 7 14C3.13428 14 0 10.8657 0 7C0 3.13428 3.13428 0 7 0ZM4.49805 6.47022C5.02214 6.77214 5.36279 7.02279 5.76953 7.47054C6.82227 5.77523 7.96615 4.83643 9.45182 3.50228L9.59766 3.44645H11.2246C9.04395 5.86865 7.35205 7.86589 5.83789 10.7871C5.04948 9.10205 4.34652 7.9388 2.77539 6.85986L4.49805 6.47022Z"
                                fill="#3AAF3C"
                              />
                            </svg>
                            {speci}
                          </p>
                        );
                      })}
                  </div>
                  {/* tickdiv */}
                  <div className="flex gap-5 items-center mt-4">
                    <h1>
                      {data?.cloudStorage?.storageCapacity}
                      {data?.cloudStorage?.storage} Storage 
                    </h1>
                    <svg
                      width="81"
                      height="81"
                      viewBox="0 0 81 81"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M81 40.5C81 62.8675 62.8675 81 40.5 81C18.1325 81 0 62.8675 0 40.5C0 18.1325 18.1325 0 40.5 0C62.8675 0 81 18.1325 81 40.5ZM7.96785 40.5C7.96785 58.467 22.533 73.0322 40.5 73.0322C58.467 73.0322 73.0322 58.467 73.0322 40.5C73.0322 22.533 58.467 7.96785 40.5 7.96785C22.533 7.96785 7.96785 22.533 7.96785 40.5Z"
                        fill="#5C70E1"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M39.9783 37.4273C42.329 38.8869 44.4526 39.5774 46.2752 39.4137C46.5936 45.7213 44.216 49.4459 40.0027 51C35.9341 49.5454 33.5276 45.981 33.7058 39.3182C35.8457 39.4282 37.9445 38.975 39.9783 37.4273ZM45.2702 35.2041C45.1118 35.2807 44.9508 35.3658 44.7924 35.4548C44.3165 35.7284 43.8463 36.0622 43.3664 36.4458L42.3422 35.2976C42.6956 34.9762 43.0785 34.6837 43.4847 34.425C43.8082 34.2176 44.1469 34.033 44.4963 33.8758C44.636 33.8072 44.7756 33.743 44.9193 33.6828C44.2444 32.5117 43.273 31.672 42.1731 31.1541C41.0726 30.6377 39.8412 30.4387 38.6417 30.5526C37.4504 30.6651 36.2931 31.0894 35.3369 31.8172C34.2304 32.6565 33.3899 33.9131 33.0665 35.5772L32.9649 36.0975L32.4358 36.1886C31.9173 36.2776 31.4542 36.4 31.0479 36.5557C30.6543 36.705 30.3029 36.8895 29.9962 37.1069C29.751 37.281 29.5392 37.4761 29.3594 37.6875C28.8029 38.3402 28.5449 39.159 28.551 39.9883C28.5662 42.0195 29.9546 43.5995 31.9726 43.8746H32.0336C32.1448 44.4054 32.2748 44.9139 32.4226 45.4004H31.9472L31.8497 45.3919C31.2851 45.3213 30.7727 45.191 30.3075 45.0024C28.2778 44.1791 27.0159 42.124 27.0001 39.9923C26.992 38.8192 27.3642 37.6522 28.1686 36.707C28.4286 36.4 28.7353 36.1184 29.0862 35.8697C29.495 35.5792 29.9627 35.3349 30.4913 35.1339C30.8554 34.9946 31.2449 34.8787 31.6552 34.7857C32.1204 32.9739 33.1132 31.5789 34.3888 30.6109C35.5822 29.7049 37.0188 29.1766 38.4975 29.0378C39.9702 28.8985 41.4855 29.1433 42.8459 29.7835C44.3287 30.4825 45.6236 31.6451 46.4641 33.2808C46.8023 33.2286 47.141 33.2017 47.4772 33.2057C48.899 33.2161 50.2701 33.7141 51.3492 34.8538C51.5757 35.0921 51.7895 35.3618 51.9906 35.6622C52.6675 36.6821 53.0144 38.0442 52.9996 39.3764C52.9849 40.6848 52.6249 41.9862 51.8885 42.9438C51.4086 43.5677 50.7927 44.0776 50.0543 44.482C49.3611 44.8616 48.5558 45.1531 47.6534 45.3631C47.8179 44.8228 47.9581 44.2577 48.0723 43.6672C48.5182 43.5234 48.9254 43.3528 49.2906 43.1533C49.8471 42.8488 50.3021 42.4777 50.6424 42.032C51.1715 41.3415 51.432 40.3654 51.4427 39.364C51.4554 38.3133 51.1928 37.2582 50.683 36.4915C50.5425 36.2784 50.3831 36.0778 50.2067 35.8921C49.4429 35.0862 48.474 34.7335 47.4665 34.7275C46.7408 34.721 45.9857 34.8931 45.2702 35.2041ZM40.0469 39.6247C41.6368 40.6117 43.0724 41.0788 44.3054 40.9684C44.5202 45.2327 42.9124 47.7515 40.0641 48.8027C40.0458 48.7962 40.0281 48.7897 40.0103 48.7828V39.652L40.0469 39.6247ZM39.9813 38.4521C42.0446 39.7336 43.9083 40.3395 45.5084 40.1963C45.5952 45.6068 43.5954 48.5425 40.0027 49.9747C36.5363 48.639 34.4431 45.8904 34.4756 40.1122C36.3535 40.2087 38.1959 39.8107 39.9813 38.4521Z"
                        fill="#6F6969"
                      />
                    </svg>
                  </div>
                  {/* button */}
                  <div className="flex bg-slate-500 w-10 mt-14">
                    {" "}
                    <button
                      onClick={() => {
                        const amount = {
                          amount: data?.cloudPrice,
                          cloudId: data?._id,
                        };
                        dispatch(sendigCloud(data?._id));
                        setSelectedPrice(amount);
                        setOpenmodal(true);
                      }}
                      className="w-full text-white absolute bottom-5 left-2 max-w-[93%]  p-2 bg-navblue mt-4 rounded-xl"
                    >
                      Buy now
                    </button>
                  </div>
                  {/* button */}
                </div>
              );
            })}
        </div>
        {!loading && allCloud.length === 0 && (
          <div className="text-center text-2xl mt-7 text-red-800 text-transform: capitalize">
            oops No Available Cloud storage plan
          </div>
        )}
        <div ref={loader} className="h-10"></div>
      </div>
    </div>
  );
}

export default CloudPage;
