import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openSidebar } from "../../Redux/Features/NavbarSlice";
import Swal from "sweetalert2";
import {
  toggleFlicksNoHeight,
  toggleProductNoHeight,
  toggleNoVibesHeight,
  toggleProductHeight,
  toggleVibesHeight,
  togleflicks,
} from "./SideBarDropDownFunctions";
import { logo } from "../../../public/Assets/assets";

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [productsExpand, setProductsExpand] = useState(false);

  const { toggleSidebar } = useSelector((state) => {
    return state.navbar;
  });
  //flicks
  const [vibesExpand, setvibesExpand] = useState(false);
  const [flicksExpanted, setFlicksExpanded] = useState(false);
  useEffect(() => {
    // toggleVibesHeight(vibesExpand, setvibesExpand);
    // togleflicks(flicksExpanted, setFlicksExpanded);
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Call your logout function here

        localStorage.removeItem("encryptedToken");
        navigate("/login");

        Swal.fire("Logged out!", "You have been logged out.", "success");
      }
    });
  };

  return (
    <aside
      id="logo-sidebar"
      className={`fixed top-0 left-0 z-30 w-80 h-screen pt-2 transition-transform  
      ${toggleSidebar ? "translate-x-0" : "-translate-x-full"}
         sm:translate-x-0 bg-[rgba(244,245,250,1)] border-white `}
      aria-label="Sidebar"
    >
      <div
        className="h-full relative  pb-4 overflow-y-auto "
        style={{ scrollbarWidth: "none" }}
      >
        <button
          onClick={() => dispatch(openSidebar())}
          className="absolute sm:hidden  block right-6 text-black text-2xl mt-3"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="mt-2">
          <div className="ms-14 mb-8">
            <img src={logo} className="" alt="" />
          </div>
        </div>
        <ul class="space-y-6   font-medium pr-8">
          <li>
            <a
              href="#"
              className={`flex items-center relative p-3 rounded-r-full group w-full ${
                window.location.pathname === "/" ? "text-white bg-navblue" : " "
              } `}
              onClick={() => {
                toggleNoVibesHeight();
                toggleProductNoHeight();
                toggleFlicksNoHeight();
                navigate("/");
              }}
            >
              <div className="flex items-center">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill={`${
                    window.location.pathname === "/" ? "white" : "black"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.40378 10.2204H2.25798C1.28635 10.2204 0.496094 9.42986 0.496094 8.45847V2.31266C0.496094 1.34104 1.28635 0.550781 2.25798 0.550781H8.40378C9.37541 0.550781 10.1657 1.34104 10.1657 2.31266V8.45847C10.1657 9.42986 9.37518 10.2204 8.40378 10.2204ZM2.25798 1.47968C1.79864 1.47968 1.42499 1.85333 1.42499 2.31266V8.45847C1.42499 8.91781 1.79864 9.29146 2.25798 9.29146H8.40378C8.86312 9.29146 9.23677 8.91781 9.23677 8.45847V2.31266C9.23677 1.85333 8.86312 1.47968 8.40378 1.47968H2.25798Z"
                    // fill="white"
                    // stroke="white"
                    stroke-width="0.5"
                  />
                  <path
                    d="M19.6343 10.2204H13.4884C12.5168 10.2204 11.7266 9.42986 11.7266 8.45847V2.31266C11.7266 1.34104 12.5171 0.550781 13.4884 0.550781H19.6343C20.6059 0.550781 21.3961 1.34104 21.3961 2.31266V8.45847C21.3961 9.42986 20.6059 10.2204 19.6343 10.2204ZM13.4884 1.47968C13.0291 1.47968 12.6555 1.85333 12.6555 2.31266V8.45847C12.6555 8.91781 13.0291 9.29146 13.4884 9.29146H19.6343C20.0936 9.29146 20.4672 8.91781 20.4672 8.45847V2.31266C20.4672 1.85333 20.0936 1.47968 19.6343 1.47968H13.4884Z"
                    // fill="black"
                    // stroke="black"
                    stroke-width="0.5"
                  />
                  <path
                    d="M8.40378 21.4498H2.25798C1.28635 21.4498 0.496094 20.6596 0.496094 19.688V13.5422C0.496094 12.5705 1.28635 11.7803 2.25798 11.7803H8.40378C9.37541 11.7803 10.1657 12.5705 10.1657 13.5422V19.688C10.1657 20.6596 9.37518 21.4498 8.40378 21.4498ZM2.25798 12.7092C1.79864 12.7092 1.42499 13.0831 1.42499 13.5422V19.688C1.42499 20.1473 1.79864 20.521 2.25798 20.521H8.40378C8.86312 20.521 9.23677 20.1473 9.23677 19.688V13.5422C9.23677 13.0828 8.86312 12.7092 8.40378 12.7092H2.25798Z"
                    // fill="black"
                    // stroke="black"
                    stroke-width="0.5"
                  />
                  <path
                    d="M19.6343 21.4498H13.4884C12.5168 21.4498 11.7266 20.6596 11.7266 19.688V13.5422C11.7266 12.5705 12.5168 11.7803 13.4884 11.7803H19.6343C20.6059 11.7803 21.3961 12.5705 21.3961 13.5422V19.688C21.3961 20.6596 20.6059 21.4498 19.6343 21.4498ZM13.4884 12.7092C13.0291 12.7092 12.6555 13.0828 12.6555 13.5422V19.688C12.6555 20.1473 13.0291 20.521 13.4884 20.521H19.6343C20.0936 20.521 20.4672 20.1473 20.4672 19.688V13.5422C20.4672 13.0828 20.0936 12.7092 19.6343 12.7092H13.4884Z"
                    // fill="black"
                    // stroke="black"
                    stroke-width="0.5"
                  />
                </svg>
                <span className="ms-7 ">Dashboard</span>
                {/* <span className="absolute right-2 ">
                  <img src="/downArrow.png" className="w-3 " alt="" />
                </span> */}
              </div>
            </a>
          </li>

          <li>
            <a
              href="#"
              className={`flex relative items-center p-3  group w-full ${
                window.location.pathname === "/addFlick" ||
                window.location.pathname === "/allflicks" ||
                window.location.pathname === "/editFlicks" ||
                window.location.pathname === "/flicksoverview"
                  ? "text-white bg-navblue"
                  : "text-black"
              } 
              
              ${
                flicksExpanted
                  ? "height 0.5s linear rounded-tr-3xl rounded-br-3xl"
                  : "rounded-tr-3xl"
              }
              `}
              onClick={() => {
                toggleNoVibesHeight();
                toggleProductNoHeight();
                toggleFlicksNoHeight();
                togleflicks(flicksExpanted, setFlicksExpanded);
                navigate("/allflicks");
              }}
            >
              <div className="flex">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 12.95V15C2 20 4 22 9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9"
                    stroke={`${
                      window.location.pathname === "/addFlick" ||
                      window.location.pathname === "/allflicks" ||
                      window.location.pathname === "/editFlicks" ||
                      window.location.pathname === "/flicksoverview"
                        ? "white"
                        : "black"
                    }`}
                    stroke-width="1.4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12.1016 15.2105C10.4516 16.1605 9.10156 15.3805 9.10156 13.4805V12.0005V10.5205C9.10156 8.61048 10.4516 7.84048 12.1016 8.79048L13.3816 9.53048L14.6616 10.2705C16.3116 11.2205 16.3116 12.7805 14.6616 13.7305"
                    stroke={`${
                      window.location.pathname === "/addFlick" ||
                      window.location.pathname === "/allflicks" ||
                      window.location.pathname === "/editFlicks" ||
                      window.location.pathname === "/flicksoverview"
                        ? "white"
                        : "black"
                    }`}
                    stroke-width="1.4"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <span className="ms-7">Flicks</span>
                {window.location.pathname === "/allflicks" && (
                  <img
                    src="/downArrow.png"
                    className="w-4 absolute right-4 top-5"
                    alt=""
                  />
                )}
              </div>
            </a>
            <div
              id="flicks-div"
              className="bg-blue-400  relative w-auto overflow-hidden rounded-br-3xl"
            >
              <a
                onClick={() => {
                  navigate("/addFlick");
                  dispatch(openSidebar());
                }}
                href="#"
                className={`flex pl-5 items-center p-3 border-b-2  group w-full `}
              >
                <span className="ms-10 text-white">Add Flicks</span>
                {/* <img src="/uparrow1.png" className={`w-3 h-3 ml-5 `} alt="" /> */}
              </a>
            </div>
          </li>

          <li>
            <a
              onClick={() => {
                navigate("/Allvibesvideos");
                toggleNoVibesHeight();
                toggleProductNoHeight();
                toggleFlicksNoHeight();

                toggleVibesHeight(vibesExpand, setvibesExpand);
              }}
              href="#"
              className={`flex relative items-center p-3 overflow-hidden transition-all duration-500 ${
                vibesExpand
                  ? "height 0.5s linear rounded-tr-3xl rounded-br-3xl"
                  : "rounded-tr-3xl"
              } group w-full ${
                window.location.pathname === "/addvibes" ||
                window.location.pathname === "/Allvibesvideos"
                  ? "text-white bg-navblue "
                  : ""
              } `}
            >
              <div className="flex">
                <svg
                  width="26"
                  height="18"
                  viewBox="0 0 26 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25.7143 9V10.2857C23.6683 10.2857 21.7062 11.0985 20.2595 12.5452C18.8127 13.9919 18 15.954 18 18H16.7143C16.7181 15.6142 17.6675 13.3272 19.3545 11.6402C21.0415 9.9532 23.3285 9.00378 25.7143 9ZM20.5714 18H21.8571C21.8587 16.9775 22.2655 15.9973 22.9885 15.2743C23.7116 14.5512 24.6918 14.1444 25.7143 14.1429V12.8571C24.3503 12.8571 23.0422 13.399 22.0777 14.3635C21.1133 15.3279 20.5714 16.636 20.5714 18ZM10.2857 5.32286L16.7257 9L10.2857 12.68V5.32286ZM11.5714 10.4657L14.1429 9L11.5714 7.53714V10.4657ZM24.4286 18H25.7143V16.7143H24.4286V18ZM22.5029 0H3.21714C2.36463 0.000755103 1.54721 0.339553 0.944123 0.942103C0.341037 1.54465 0.00151255 2.36177 0 3.21429V14.7857C0.000757322 15.6385 0.340039 16.456 0.943289 17.0587C1.54654 17.6614 2.3644 18 3.21714 18H14.1429V16.7143H3.21714C2.70539 16.7143 2.21456 16.5112 1.85243 16.1496C1.49029 15.788 1.28647 15.2975 1.28571 14.7857V3.21429C1.28647 2.70253 1.49029 2.212 1.85243 1.85041C2.21456 1.48881 2.70539 1.28571 3.21714 1.28571H22.5029C23.0138 1.28647 23.5037 1.48999 23.8647 1.85159C24.2258 2.21318 24.4286 2.70329 24.4286 3.21429V6.42857H25.7143V3.21429C25.7135 2.36253 25.375 1.54584 24.773 0.943286C24.171 0.340736 23.3546 0.00151255 22.5029 0Z"
                    fill={`${
                      window.location.pathname === "/addvibes"
                        ? "white"
                        : "black"
                    }`}
                    fill-opacity="0.6"
                  />
                </svg>

                <span className="ms-7">Vibes</span>
                {window.location.pathname === "/Allvibesvideos" && (
                  <img
                    src="/downArrow.png"
                    className="w-4 absolute right-4 top-5"
                    alt=""
                  />
                )}
              </div>
            </a>
            <div
              id="vibes-div"
              className="bg-blue-400 rounded-br-3xl relative w-auto overflow-hidden"
            >
              <a
                onClick={() => {
                  // dispatch(telemedicine());

                  // setCurrentRoute("admin/addmembers");
                  navigate("/addvibes");
                  dispatch(openSidebar());
                }}
                href="#"
                className={`flex pl-5 items-center p-3  group w-full ${
                  window.location.pathname === "/admin/addNewplan"
                    ? "text-yellow-300  "
                    : "text-white"
                } `}
              >
                <span className="ms-10">Add Vibes</span>
                {/* <img src="/uparrow1.png" className={`w-3 h-3 ml-5 `} alt="" /> */}
              </a>
            </div>
          </li>
          <li>
            <a
              onClick={() => {
                navigate("/AllProducts");
                toggleNoVibesHeight();
                toggleProductNoHeight();
                toggleFlicksNoHeight();
                toggleProductHeight(productsExpand, setProductsExpand);
              }}
              href="#"
              className={`flex items-center relative p-2 rounded-r-sm group w-full ${
                window.location.pathname === "/AllProducts" ||
                window.location.pathname === "/AddProducts" ||
                window.location.pathname === "/productDetailed" ||
                window.location.pathname === "/editProduct"
                  ? "text-white bg-navblue"
                  : "text-black"
              }
           ${
             productsExpand
               ? "height 0.5s linear rounded-tr-3xl rounded-br-3xl"
               : "rounded-tr-3xl"
           }`}
            >
              <div
                onClick={() => {
                  navigate("/AllProducts");
                }}
                className="flex items-center"
              >
                <svg
                  width="32"
                  height="31"
                  viewBox="0 0 32 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24.0859 1V6.75"
                    stroke={`${
                      window.location.pathname === "/AllProducts" ||
                      window.location.pathname === "/productDetailed"
                        ? "white"
                        : "black"
                    }`}
                    stroke-width="1.4"
                    stroke-miterlimit="10"
                    stroke-linecap="square"
                  />
                  <path
                    d="M28.4062 13.4574V10.1032L24.0937 6.74902L19.7812 10.1032V13.4574"
                    stroke={`${
                      window.location.pathname === "/AllProducts" ||
                      window.location.pathname === "/productDetailed"
                        ? "white"
                        : "black"
                    }`}
                    stroke-width="1.4"
                    stroke-miterlimit="10"
                    stroke-linecap="square"
                  />
                  <path
                    d="M19.7812 25.918V17.293H28.4062V25.918"
                    stroke={`${
                      window.location.pathname === "/AllProducts" ||
                      window.location.pathname === "/productDetailed"
                        ? "white"
                        : "black"
                    }`}
                    stroke-width="1.4"
                    stroke-miterlimit="10"
                    stroke-linecap="square"
                  />
                  <path
                    d="M3.48828 25.9154V13.457H15.9466V25.9154"
                    stroke={`${
                      window.location.pathname === "/AllProducts" ||
                      window.location.pathname === "/productDetailed"
                        ? "white"
                        : "black"
                    }`}
                    stroke-width="1.4"
                    stroke-miterlimit="10"
                    stroke-linecap="square"
                  />
                  <path
                    d="M7.80469 17.293H11.638"
                    stroke={`${
                      window.location.pathname === "/AllProducts" ||
                      window.location.pathname === "/productDetailed"
                        ? "white"
                        : "black"
                    }`}
                    stroke-width="1.4"
                    stroke-miterlimit="10"
                    stroke-linecap="square"
                  />
                  <path
                    d="M23.1328 20.165H25.0495"
                    stroke={`${
                      window.location.pathname === "/AllProducts" ||
                      window.location.pathname === "/productDetailed"
                        ? "white"
                        : "black"
                    }`}
                    stroke-width="1.4"
                    stroke-miterlimit="10"
                    stroke-linecap="square"
                  />
                  <path
                    d="M28.4036 25.918H3.48698C2.42843 25.918 1.57031 26.7761 1.57031 27.8346C1.57031 28.8932 2.42843 29.7513 3.48698 29.7513H28.4036C29.4622 29.7513 30.3203 28.8932 30.3203 27.8346C30.3203 26.7761 29.4622 25.918 28.4036 25.918Z"
                    stroke={`${
                      window.location.pathname === "/AllProducts" ||
                      window.location.pathname === "/productDetailed"
                        ? "white"
                        : "black"
                    }`}
                    stroke-width="1.4"
                    stroke-miterlimit="10"
                    stroke-linecap="square"
                  />
                </svg>

                <span
                  className={`ms-7 ${
                    window.location.pathname === "/AllProducts" ||
                    window.location.pathname === "/productDetailed"
                      ? "text-white"
                      : "text-black"
                  }`}
                >
                  Products
                </span>
              </div>
              {window.location.pathname === "/AllProducts" && (
                <img
                  src="/downArrow.png"
                  className={`w-3 h-2 ml-28 ${""}`}
                  alt=""
                />
              )}
            </a>
            <div
              id="products-div"
              className={`bg-blue-400 ${
                productsExpand
                  ? "rounded-b-xl rounded-e-xl rounded-tr-3xl"
                  : "rounded-br-3xl"
              } relative w-auto`}
            >
              <a
                onClick={() => {
                  // dispatch(telemedicine());
                  // setCurrentRoute("admin/addmembers");
                  navigate("/AddProducts");
                  dispatch(openSidebar());
                }}
                href="#"
                className={`flex pl-5 items-center p-3 border-b-2  group w-full ${
                  window.location.pathname === "/admin/addNewplan"
                    ? "text-yellow-300  "
                    : "text-white"
                } `}
              >
                <span
                  className={`ms-10 text-black ${
                    window.location.pathname === "/AddProducts"
                      ? "text-navblue"
                      : "text-white"
                  }`}
                >
                  Add Product
                </span>
                {/* <img src="/uparrow1.png" className={`w-3 h-3 ml-5 `} alt="" /> */}
              </a>
            </div>
          </li>
          <li>
            <a
              href="#"
              className={`flex relative items-center p-3  group w-full rounded-r-full ${
                window.location.pathname === "/brands-and-sections" ||
                window.location.pathname === "/brands-and-sections" ||
                window.location.pathname === "/brands-and-sections"
                  ? "text-white bg-navblue"
                  : "text-black"
              } `}
              onClick={() => {
                navigate("/brands-and-sections");
                toggleProductNoHeight();
              }}
            >
              <div className="flex">
                <svg
                  width="25px"
                  height="25px"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <rect
                      x="6"
                      y="28"
                      width="36"
                      height="14"
                      rx="4"
                      stroke={`${
                        window.location.pathname ===
                        "/admin/brands-and-sections"
                          ? "#FFFFFF"
                          : "#000000"
                      }`}
                      stroke-width="4"
                    ></rect>{" "}
                    <path
                      d="M20 7H10C7.79086 7 6 8.79086 6 11V17C6 19.2091 7.79086 21 10 21H20"
                      stroke={`${
                        window.location.pathname ===
                        "/admin/brands-and-sections"
                          ? "#FFFFFF"
                          : "#000000"
                      }`}
                      stroke-width="4"
                      stroke-linecap="round"
                    ></path>{" "}
                    <circle
                      cx="34"
                      cy="14"
                      r="8"
                      fill="#95bcee"
                      stroke={`${
                        window.location.pathname ===
                        "/admin/brands-and-sections"
                          ? "#FFFFFF"
                          : "#000000"
                      }`}
                      stroke-width="4"
                    ></circle>{" "}
                    <circle cx="34" cy="14" r="3" fill="white"></circle>{" "}
                  </g>
                </svg>
                <span className="ms-7">Section Category</span>
              </div>
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`flex items-center relative p-3 rounded-r-full group w-full ${
                window.location.pathname === "/slider"
                  ? "text-white bg-navblue"
                  : " "
              } `}
              onClick={() => {
                toggleNoVibesHeight();
                toggleProductNoHeight();

                toggleFlicksNoHeight();
                navigate("/slider");
              }}
            >
              <div className="flex items-center">
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_2239_24425)">
                    <path
                      d="M6.25095 13.499C6.12731 13.4992 6.00555 13.4688 5.89651 13.4105C5.78747 13.3522 5.69452 13.2679 5.62595 13.165L4.12595 10.915C4.04382 10.7919 4 10.6471 4 10.499C4 10.351 4.04382 10.2062 4.12595 10.083L5.62595 7.83305C5.68005 7.74992 5.75011 7.67835 5.83207 7.62248C5.91402 7.56662 6.00624 7.52756 6.10339 7.50757C6.20054 7.48759 6.30069 7.48707 6.39805 7.50605C6.4954 7.52503 6.58802 7.56313 6.67055 7.61815C6.75307 7.67317 6.82387 7.74401 6.87883 7.82657C6.93379 7.90914 6.97184 8.00178 6.99075 8.09915C7.00967 8.19651 7.00909 8.29666 6.98904 8.3938C6.96899 8.49094 6.92987 8.58313 6.87395 8.66505L5.65095 10.499L6.87395 12.333C6.94919 12.4459 6.99241 12.5771 6.99901 12.7126C7.0056 12.8481 6.97532 12.9828 6.91139 13.1025C6.84746 13.2221 6.75227 13.3222 6.63597 13.392C6.51967 13.4619 6.3866 13.4989 6.25095 13.499ZM17.7489 13.499C17.6133 13.4989 17.4802 13.4619 17.3639 13.392C17.2476 13.3222 17.1524 13.2221 17.0885 13.1025C17.0246 12.9828 16.9943 12.8481 17.0009 12.7126C17.0075 12.5771 17.0507 12.4459 17.1259 12.333L18.3489 10.499L17.1259 8.66505C17.0182 8.49954 16.9801 8.29822 17.0199 8.10478C17.0597 7.91135 17.1742 7.74142 17.3385 7.63187C17.5028 7.52233 17.7037 7.48201 17.8976 7.51968C18.0914 7.55734 18.2626 7.66995 18.3739 7.83305L19.8739 10.083C19.9561 10.2062 19.9999 10.351 19.9999 10.499C19.9999 10.6471 19.9561 10.7919 19.8739 10.915L18.3739 13.165C18.3054 13.2679 18.2124 13.3522 18.1034 13.4105C17.9943 13.4688 17.8726 13.4992 17.7489 13.499ZM6.99995 20.7491C6.31095 20.7491 5.74995 20.188 5.74995 19.4991C5.74995 18.8101 6.31095 18.249 6.99995 18.249C7.68895 18.249 8.24995 18.8101 8.24995 19.4991C8.24995 20.188 7.68895 20.7491 6.99995 20.7491ZM6.99995 19.249C6.93364 19.249 6.87005 19.2754 6.82317 19.3223C6.77628 19.3692 6.74995 19.4327 6.74995 19.4991C6.74995 19.774 7.24995 19.774 7.24995 19.4991C7.24995 19.4327 7.22361 19.3692 7.17672 19.3223C7.12984 19.2754 7.06625 19.249 6.99995 19.249ZM11.9999 20.7491C11.3109 20.7491 10.7499 20.188 10.7499 19.4991C10.7499 18.8101 11.3109 18.249 11.9999 18.249C12.6889 18.249 13.2499 18.8101 13.2499 19.4991C13.2499 20.188 12.6889 20.7491 11.9999 20.7491ZM11.9999 19.249C11.9336 19.249 11.8701 19.2754 11.8232 19.3223C11.7763 19.3692 11.7499 19.4327 11.7499 19.4991C11.7499 19.774 12.2499 19.774 12.2499 19.4991C12.2499 19.4327 12.2236 19.3692 12.1767 19.3223C12.1298 19.2754 12.0662 19.249 11.9999 19.249ZM16.9999 20.7491C16.3109 20.7491 15.7499 20.188 15.7499 19.4991C15.7499 18.8101 16.3109 18.249 16.9999 18.249C17.6889 18.249 18.2499 18.8101 18.2499 19.4991C18.2499 20.188 17.6889 20.7491 16.9999 20.7491ZM16.9999 19.249C16.9336 19.249 16.8701 19.2754 16.8232 19.3223C16.7763 19.3692 16.7499 19.4327 16.7499 19.4991C16.7499 19.774 17.2499 19.774 17.2499 19.4991C17.2499 19.4327 17.2236 19.3692 17.1767 19.3223C17.1298 19.2754 17.0662 19.249 16.9999 19.249Z"
                      fill={`${
                        window.location.pathname === "/slider"
                          ? "white"
                          : "black"
                      }`}
                    />
                    <path
                      d="M21.25 24.5H2.75C2.02082 24.4995 1.32165 24.2096 0.806041 23.694C0.290431 23.1783 0.000529737 22.4792 0 21.75L0 3.25C0.000529737 2.52082 0.290431 1.82165 0.806041 1.30604C1.32165 0.790431 2.02082 0.50053 2.75 0.5L21.25 0.5C21.9792 0.50053 22.6783 0.790431 23.194 1.30604C23.7096 1.82165 23.9995 2.52082 24 3.25V21.75C23.9995 22.4792 23.7096 23.1783 23.194 23.694C22.6783 24.2096 21.9792 24.4995 21.25 24.5ZM2.75 2C2.061 2 1.5 2.561 1.5 3.25V21.75C1.5 22.439 2.061 23 2.75 23H21.25C21.939 23 22.5 22.439 22.5 21.75V3.25C22.5 2.561 21.939 2 21.25 2H2.75Z"
                      fill={`${
                        window.location.pathname === "/slider"
                          ? "white"
                          : "black"
                      }`}
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2239_24425">
                      <rect
                        width="24"
                        height="24"
                        fill="white"
                        transform="translate(0 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>

                <span className="ms-7 ">Slider</span>
                {/* <span className="absolute right-2 ">
                  <img src="/downArrow.png" className="w-3 " alt="" />
                </span> */}
              </div>
            </a>
          </li>

          <li>
            <a
              href="#"
              className={`flex items-center p-3  group w-full ${
                window.location.pathname === "/cloud"
                  ? "text-white border-l-4 bg-navblue rounded-r-full"
                  : "text-black"
              } `}
              onClick={() => {
                toggleNoVibesHeight();
                toggleProductNoHeight();

                toggleFlicksNoHeight();
                navigate("/cloud");
              }}
            >
              <div className="flex">
                <svg
                  width="27"
                  height="22"
                  viewBox="0 0 27 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.9496 7.51529C18.2345 7.91921 17.5938 8.44131 16.9768 9.01645L15.9153 7.62802C16.6962 6.79967 17.607 6.15158 18.5857 5.67531C16.605 1.66377 11.8146 0.614762 8.65583 3.41934C7.50886 4.43459 6.63822 5.95384 6.30335 7.96624L6.19788 8.59504L5.64945 8.70597C5.11208 8.81328 4.6322 8.96159 4.21138 9.14969C1.5852 10.3114 0.847978 13.6532 2.4548 16.1907C3.14245 17.2704 4.0189 18.3713 5.16904 18.5546H6.77691C6.76583 18.7354 6.76003 18.9175 6.76003 19.1014C6.76003 19.5439 6.79273 19.9773 6.85601 20.3994H5.1432L5.04195 20.3891C3.43196 20.1552 2.10886 18.7849 1.15278 17.271C-1.0763 13.7623 0.0211023 9.03273 3.63499 7.43028C4.01204 7.26208 4.41546 7.12161 4.8405 7.00887C5.32302 4.81802 6.35134 3.13117 7.67339 1.96038C11.744 -1.64542 17.8548 -0.10869 20.1862 5.18939C20.5369 5.12609 20.8881 5.09413 21.2367 5.09896C26.4521 5.14297 28.5146 12.7675 25.8082 16.8749C24.7235 18.5202 23.0597 19.9201 21.3464 20.3746L21.1665 20.3994H20.1219C20.2126 19.7902 20.2391 19.1709 20.201 18.5546H21.0769C22.3504 18.2043 23.7089 17.0064 24.5168 15.7717C26.4395 12.8441 25.0747 6.96667 21.2256 6.93894C20.4736 6.9317 19.6905 7.1397 18.9496 7.51529ZM12.3784 22H14.6227C15.1474 22 15.5778 21.5081 15.5778 20.9082V17.3729H17.2146C17.5595 17.356 17.8042 17.2258 17.9461 16.9798C18.3294 16.3221 17.8058 15.6728 17.4424 15.2152C16.4115 13.9215 14.6359 12.0061 14.127 11.3212C13.741 10.8341 13.1926 10.8341 12.8066 11.3212C12.2808 12.023 10.4419 14.0806 9.46162 15.3388C9.12148 15.7771 8.70119 16.374 9.05451 16.9798C9.20005 17.2258 9.4421 17.356 9.78699 17.3729H11.4239V20.9082C11.4239 21.5014 11.8536 22 12.3784 22Z"
                    fill={`${
                      window.location.pathname === "/cloud" ? "white" : "black"
                    }`}
                  />
                </svg>

                <span className="ms-7">Cloud</span>
              </div>
              <a />
            </a>
          </li>

          <li>
            <a
              href="#"
              className={`flex relative items-center p-3  group w-full rounded-r-full ${
                window.location.pathname === "/wallet"
                  ? "text-white bg-navblue"
                  : "text-black"
              } `}
              onClick={() => {
                toggleNoVibesHeight();
                toggleFlicksNoHeight();
                toggleProductNoHeight();

                navigate("/wallet");
              }}
            >
              <div className="flex">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.3545 12.9571H23.0566V12.3245C22.8449 11.6325 22.5078 11.1634 22.0712 10.8781C21.6346 10.5932 21.0686 10.4714 20.4042 10.4754L5.22071 10.4785C4.84681 10.4785 4.54425 10.2109 4.54425 9.88143C4.54425 9.55142 4.84681 9.28437 5.22071 9.28437L20.3864 9.2859C21.3407 9.27777 22.1828 9.46968 22.8742 9.92205C22.9364 9.96266 22.9973 10.0053 23.0566 10.05V9.69104C23.0566 9.13358 22.796 8.62385 22.3767 8.25373C21.9608 7.88362 21.3844 7.65464 20.7494 7.65464H20.261L20.1983 7.65211L19.9596 8.44209H18.3191L19.2923 5.2197C18.4744 5.02677 17.9866 4.28045 18.2058 3.55849L12.7923 2.27857C12.5732 3.00002 11.7282 3.43157 10.9114 3.23813L9.32204 8.44209H7.63031L10.2044 0L21.6916 2.71672L20.559 6.46002H20.7494C21.7531 6.46002 22.6683 6.82506 23.3321 7.41044C23.9971 7.99481 24.4095 8.80409 24.4095 9.69104V12.9906C24.8001 13.0591 25.1492 13.2297 25.4202 13.4689C25.7774 13.7841 26 14.2208 26 14.7016V18.6287C26 19.1298 25.7676 19.5857 25.3949 19.9142C25.1285 20.1492 24.7892 20.3213 24.4095 20.4V22.769C24.4095 23.6554 23.9965 24.4642 23.3327 25.0501L23.2901 25.0846C22.6286 25.6497 21.7307 26 20.7494 26H3.66013C2.65522 26 1.73889 25.636 1.07509 25.0506C0.412434 24.4657 0 23.658 0 22.769V9.69104C0 8.80155 0.411858 7.99379 1.07451 7.40892C1.73717 6.82404 2.65292 6.46002 3.66013 6.46002H5.79535L5.80456 6.46053L7.50434 0.888481L9.12588 1.2718L6.89805 8.44209H5.2L5.44044 7.65464H3.66013C3.02681 7.65464 2.44987 7.88413 2.03111 8.25323C1.61292 8.62233 1.35292 9.13206 1.35292 9.69104V22.769C1.35292 23.328 1.6135 23.8367 2.03226 24.2058C2.45102 24.5759 3.02854 24.8059 3.66013 24.8059H20.7494C21.3666 24.8059 21.9309 24.5876 22.345 24.2347L22.3761 24.2053C22.7954 23.8357 23.0566 23.3259 23.0566 22.769V20.4483H19.3545C18.2109 20.4483 17.1709 20.035 16.4197 19.3719L16.3489 19.3034C15.638 18.6434 15.1996 17.7539 15.1996 16.7811V16.6237C15.1996 15.619 15.6673 14.7031 16.4197 14.0375L16.4272 14.0309C17.1807 13.3683 18.2173 12.9571 19.3545 12.9571ZM13.849 8.23241C14.8378 8.46595 15.856 7.9481 16.1206 7.07485C16.3858 6.20211 15.7979 5.30347 14.8091 5.06993C13.8197 4.83638 12.8015 5.35424 12.5369 6.22749C12.2723 7.10023 12.8602 7.99836 13.849 8.23241ZM20.8403 15.6916L20.8437 15.6941C21.4724 16.2506 21.4707 17.1558 20.8426 17.7117L20.8397 17.7148C20.2092 18.2697 19.1836 18.2682 18.5532 17.7138L18.5503 17.7112C17.9216 17.1548 17.9233 16.2496 18.5515 15.6931L18.5543 15.6906C19.1848 15.1357 20.2104 15.1367 20.8403 15.6916Z"
                    fill="white"
                    stroke={`${
                      window.location.pathname === "/wallet" ? "white" : "black"
                    }`}
                    strokeWidth="1"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <defs>
                    <clipPath id="clip0_2118_17024">
                      <rect width="26" height="26" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span className="ms-7">Wallet</span>
              </div>
              {window.location.pathname === "/wallet" && (
                <img
                  src="/downArrow.png"
                  className="w-4 absolute right-4 top-5"
                  alt="downArrow"
                />
              )}
            </a>
          </li>

          <li>
            <a
              href="#"
              className={`flex relative items-center p-3  group w-full rounded-r-full ${
                window.location.pathname === "/orders" ||
                window.location.pathname === "/invoice"
                  ? "text-white bg-navblue"
                  : "text-black"
              } `}
              onClick={() => {
                toggleNoVibesHeight();
                toggleProductNoHeight();

                toggleFlicksNoHeight();
                navigate("/orders");
              }}
            >
              <div className="flex">
                <svg
                  width="28"
                  height="21"
                  viewBox="0 0 28 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.50619 5.80066L3.83948 14.6327L4.01821 15.1063H3.51202H3.21869C3.20341 15.1063 3.19175 15.112 3.18406 15.1195C3.17655 15.1268 3.17486 15.1333 3.17486 15.1385C3.17486 15.1437 3.17655 15.1503 3.18406 15.1576C3.19175 15.165 3.20341 15.1707 3.21869 15.1707H16.9442H16.9455C17.5385 15.1707 18.0356 15.6414 18.0356 16.2404C18.0356 16.5308 17.9161 16.8024 17.7094 17.003C17.7094 17.003 17.7094 17.003 17.7094 17.003L17.4656 16.7518L0.50619 5.80066ZM0.50619 5.80066H4.17024C4.33551 7.1824 4.98329 8.41954 5.94204 9.35009L5.94219 9.35023C7.06081 10.4347 8.60489 11.1058 10.3073 11.1058C12.0095 11.1058 13.5535 10.4362 14.6725 9.35009C15.6313 8.41968 16.2791 7.18253 16.4443 5.80066H19.9696H20.2167L20.2994 5.56784L22.1287 0.419347L22.129 0.418443C22.1324 0.408909 22.1461 0.393825 22.171 0.393825H27.0868L27.0856 0.396596H27.6062C27.6215 0.396596 27.6331 0.402323 27.6408 0.409786C27.6483 0.417079 27.65 0.423631 27.65 0.428836C27.65 0.434043 27.6483 0.440595 27.6408 0.447886C27.6331 0.455347 27.6215 0.461075 27.6062 0.461075H22.4525H22.2054L22.1227 0.693902L17.1345 14.734L17.017 15.0648L17.3482 15.1813C17.8079 15.3431 18.1247 15.7618 18.1247 16.2417C18.1247 16.5422 18.0036 16.8265 17.778 17.0445C17.5556 17.2593 17.2639 17.3772 16.9524 17.3772H16.9438H16.9429L15.0367 17.3667L14.8907 18.0356C15.3832 18.258 15.7155 18.733 15.7155 19.2759C15.7155 20.0232 15.085 20.65 14.2892 20.65C13.4935 20.65 12.8629 20.0232 12.8629 19.2759C12.8629 18.7273 13.2009 18.248 13.701 18.0278L13.562 17.3574L6.60332 17.3166L6.15321 17.314L0.50619 5.80066ZM7.19461 4.17843L7.35963 4.08646C7.65848 3.91989 8.04424 4.01637 8.22205 4.31624C8.22215 4.31641 8.22226 4.31659 8.22236 4.31677L9.19457 5.9518L12.3096 2.9284L12.5534 3.17955L12.3096 2.9284C12.5581 2.6872 12.956 2.68721 13.2046 2.92839L13.2046 2.9284C13.4589 3.17529 13.4589 3.57925 13.2046 3.82613L13.2045 3.82619L9.50654 7.41402C9.50653 7.41404 9.50651 7.41405 9.50649 7.41407C9.46287 7.4564 9.41713 7.48769 9.37521 7.51163L9.37207 7.51342L9.37206 7.5134C9.07326 7.67995 8.68757 7.58352 8.50972 7.28376L7.19461 4.17843ZM7.19461 4.17843L7.19133 4.22364C7.01991 4.4193 6.97989 4.7099 7.12277 4.95139L7.12317 4.95206L8.50933 7.28309L7.19461 4.17843ZM4.36213 19.1427C4.36213 19.876 4.97318 20.4523 5.7008 20.4523C6.43046 20.4523 7.03946 19.874 7.03946 19.1427C7.03946 18.4094 6.42841 17.8331 5.7008 17.8331C4.97114 17.8331 4.36213 18.4114 4.36213 19.1427ZM12.9489 19.2732C12.9489 20.0065 13.5599 20.5828 14.2876 20.5828C15.0172 20.5828 15.6262 20.0045 15.6262 19.2732C15.6262 18.5399 15.0152 17.9636 14.2876 17.9636C13.5579 17.9636 12.9489 18.5419 12.9489 19.2732ZM15.2089 5.09848C15.2089 6.40628 14.6632 7.59179 13.7764 8.45242C12.8894 9.31324 11.663 9.84696 10.3058 9.84696C8.94849 9.84696 7.72215 9.31334 6.83527 8.45244C5.94854 7.59166 5.40283 6.40613 5.40283 5.09848C5.40283 3.79067 5.94842 2.60517 6.83524 1.74456C7.72229 0.883731 8.94853 0.35 10.3058 0.35C11.6632 0.35 12.8895 0.883741 13.7764 1.74455C14.6632 2.60532 15.2089 3.79084 15.2089 5.09848Z"
                    stroke={`${
                      window.location.pathname === "/orders" ||
                      window.location.pathname === "/invoice"
                        ? "white"
                        : "black"
                    }`}
                    strokeWidth="1"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="ms-7">Orders</span>
              </div>
            </a>
          </li>

          <li>
            <a
              href="#"
              className={`flex relative items-center p-3  group w-full rounded-r-full ${
                window.location.pathname === "/specialdeals"
                  ? "text-white bg-navblue"
                  : "text-black"
              } `}
              onClick={() => {
                toggleNoVibesHeight();
                toggleProductNoHeight();

                toggleFlicksNoHeight();
                navigate("/specialdeals");
              }}
            >
              <div className="flex">
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.08047 8.92969C6.92134 8.92969 6.76873 8.9929 6.6562 9.10542C6.54368 9.21795 6.48047 9.37056 6.48047 9.52969V11.0681C6.48047 11.2272 6.54368 11.3798 6.6562 11.4924C6.76873 11.6049 6.92134 11.6681 7.08047 11.6681C7.2396 11.6681 7.39221 11.6049 7.50473 11.4924C7.61725 11.3798 7.68047 11.2272 7.68047 11.0681V9.52969C7.68047 9.37056 7.61725 9.21795 7.50473 9.10542C7.39221 8.9929 7.2396 8.92969 7.08047 8.92969ZM7.08047 13.3329C6.92134 13.3329 6.76873 13.3961 6.6562 13.5086C6.54368 13.6211 6.48047 13.7738 6.48047 13.9329V15.4705C6.48047 15.6296 6.54368 15.7822 6.6562 15.8948C6.76873 16.0073 6.92134 16.0705 7.08047 16.0705C7.2396 16.0705 7.39221 16.0073 7.50473 15.8948C7.61725 15.7822 7.68047 15.6296 7.68047 15.4705V13.9329C7.68047 13.7738 7.61725 13.6211 7.50473 13.5086C7.39221 13.3961 7.2396 13.3329 7.08047 13.3329Z"
                    fill={`${
                      window.location.pathname === "/specialdeals"
                        ? "white"
                        : "black"
                    }`}
                  />
                  <path
                    d="M22.7024 10.5176C23.035 10.3392 23.3127 10.0737 23.5059 9.74961C23.6991 9.42549 23.8005 9.05491 23.7992 8.67757V6.61997C23.7986 6.06491 23.5778 5.53276 23.1853 5.14027C22.7928 4.74778 22.2607 4.527 21.7056 4.52637H2.29284C1.73777 4.527 1.20563 4.74778 0.81314 5.14027C0.420651 5.53276 0.199872 6.06491 0.199237 6.61997V8.67597C0.197959 9.05331 0.299355 9.42389 0.492563 9.74801C0.68577 10.0721 0.963511 10.3376 1.29604 10.516C1.65493 10.7081 1.95494 10.9941 2.16411 11.3433C2.37327 11.6926 2.48374 12.0921 2.48374 12.4992C2.48374 12.9063 2.37327 13.3057 2.16411 13.655C1.95494 14.0042 1.65493 14.2902 1.29604 14.4824C0.963271 14.6609 0.685373 14.9266 0.49215 15.251C0.298927 15.5754 0.197669 15.9464 0.199237 16.324V18.38C0.199872 18.935 0.420651 19.4672 0.81314 19.8597C1.20563 20.2522 1.73777 20.4729 2.29284 20.4736H21.7056C22.2607 20.4729 22.7928 20.2522 23.1853 19.8597C23.5778 19.4672 23.7986 18.935 23.7992 18.38V16.324C23.8005 15.9466 23.6991 15.576 23.5059 15.2519C23.3127 14.9278 23.035 14.6623 22.7024 14.484C21.1312 13.6976 21.1432 11.304 22.7024 10.5176ZM20.7264 14.1272C21.0473 14.7265 21.5383 15.2175 22.1376 15.5384C22.4248 15.6936 22.6024 15.9944 22.5992 16.3208V18.3768C22.599 18.6137 22.5048 18.8409 22.3373 19.0084C22.1697 19.1759 21.9426 19.2702 21.7056 19.2704H7.67924C7.64644 18.7504 7.88564 17.7552 7.07924 17.7352C6.27204 17.7544 6.51204 18.7544 6.47924 19.2736H2.29284C2.0559 19.2734 1.82874 19.1791 1.6612 19.0116C1.49366 18.8441 1.39945 18.6169 1.39924 18.38V16.324C1.39766 16.1639 1.43981 16.0064 1.52116 15.8685C1.60251 15.7307 1.71995 15.6176 1.86084 15.5416C2.41085 15.2469 2.87061 14.8085 3.19114 14.2732C3.51167 13.7378 3.68095 13.1255 3.68095 12.5016C3.68095 11.8776 3.51167 11.2653 3.19114 10.73C2.87061 10.1946 2.41085 9.75624 1.86084 9.46157C1.71995 9.38554 1.60251 9.27248 1.52116 9.1346C1.43981 8.99672 1.39766 8.83925 1.39924 8.67917V6.61997C1.40004 6.12637 1.79924 5.72717 2.29284 5.72637H6.47924C6.51204 6.24717 6.27124 7.24477 7.07924 7.26477C7.88644 7.24557 7.64644 6.24557 7.67924 5.72637H21.7056C22.1992 5.72717 22.5984 6.12637 22.5992 6.61997V8.67597C22.6024 9.00237 22.4248 9.30317 22.1376 9.45837C21.7383 9.67218 21.3851 9.96257 21.098 10.3129C20.811 10.6633 20.5958 11.0668 20.4648 11.5004C20.3337 11.934 20.2894 12.3891 20.3343 12.8398C20.3792 13.2905 20.5124 13.728 20.7264 14.1272Z"
                    fill={`${
                      window.location.pathname === "/specialdeals"
                        ? "white"
                        : "black"
                    }`}
                  />
                </svg>

                <span className="ms-7">Special Deals</span>
              </div>
            </a>
          </li>

          <li>
            <a
              href="#"
              className={`flex relative items-center p-3  group w-full rounded-r-full ${
                window.location.pathname === "/profile"
                  ? "text-white bg-navblue"
                  : "text-black"
              } `}
              onClick={() => {
                toggleNoVibesHeight();
                toggleProductNoHeight();

                toggleFlicksNoHeight();
                navigate("/profile");
              }}
            >
              <div className="flex">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.3389 16.1611C19.9774 14.7997 18.3569 13.7918 16.5888 13.1817C18.4825 11.8775 19.7266 9.69473 19.7266 7.22656C19.7266 3.24185 16.4847 0 12.5 0C8.51528 0 5.27344 3.24185 5.27344 7.22656C5.27344 9.69473 6.51753 11.8775 8.41123 13.1817C6.64316 13.7918 5.02266 14.7997 3.66118 16.1611C1.30024 18.5221 0 21.6611 0 25H1.95312C1.95312 19.1844 6.68442 14.4531 12.5 14.4531C18.3156 14.4531 23.0469 19.1844 23.0469 25H25C25 21.6611 23.6998 18.5221 21.3389 16.1611ZM12.5 12.5C9.59224 12.5 7.22656 10.1344 7.22656 7.22656C7.22656 4.31875 9.59224 1.95312 12.5 1.95312C15.4078 1.95312 17.7734 4.31875 17.7734 7.22656C17.7734 10.1344 15.4078 12.5 12.5 12.5Z"
                    fill={`${
                      window.location.pathname === "/profile"
                        ? "white"
                        : "black"
                    }`}
                    stroke={`${
                      window.location.pathname === "/profile"
                        ? "white"
                        : "black"
                    }`}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="ms-7">Profile</span>
              </div>
            </a>
          </li>

          <li>
            <a
              href="#"
              className={`flex relative items-center p-3  group w-full rounded-r-full ${
                window.location.pathname === "/coupon"
                  ? "text-white bg-navblue"
                  : "text-black"
              } `}
              onClick={() => {
                toggleNoVibesHeight();
                toggleFlicksNoHeight();
                navigate("/coupon");
              }}
            >
              <div className="flex">
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.08047 8.92969C6.92134 8.92969 6.76873 8.9929 6.6562 9.10542C6.54368 9.21795 6.48047 9.37056 6.48047 9.52969V11.0681C6.48047 11.2272 6.54368 11.3798 6.6562 11.4924C6.76873 11.6049 6.92134 11.6681 7.08047 11.6681C7.2396 11.6681 7.39221 11.6049 7.50473 11.4924C7.61725 11.3798 7.68047 11.2272 7.68047 11.0681V9.52969C7.68047 9.37056 7.61725 9.21795 7.50473 9.10542C7.39221 8.9929 7.2396 8.92969 7.08047 8.92969ZM7.08047 13.3329C6.92134 13.3329 6.76873 13.3961 6.6562 13.5086C6.54368 13.6211 6.48047 13.7738 6.48047 13.9329V15.4705C6.48047 15.6296 6.54368 15.7822 6.6562 15.8948C6.76873 16.0073 6.92134 16.0705 7.08047 16.0705C7.2396 16.0705 7.39221 16.0073 7.50473 15.8948C7.61725 15.7822 7.68047 15.6296 7.68047 15.4705V13.9329C7.68047 13.7738 7.61725 13.6211 7.50473 13.5086C7.39221 13.3961 7.2396 13.3329 7.08047 13.3329Z"
                    fill={`${
                      window.location.pathname === "/coupon" ? "white" : "black"
                    }`}
                  />
                  <path
                    d="M22.7024 10.5176C23.035 10.3392 23.3127 10.0737 23.5059 9.74961C23.6991 9.42549 23.8005 9.05491 23.7992 8.67757V6.61997C23.7986 6.06491 23.5778 5.53276 23.1853 5.14027C22.7928 4.74778 22.2607 4.527 21.7056 4.52637H2.29284C1.73777 4.527 1.20563 4.74778 0.81314 5.14027C0.420651 5.53276 0.199872 6.06491 0.199237 6.61997V8.67597C0.197959 9.05331 0.299355 9.42389 0.492563 9.74801C0.68577 10.0721 0.963511 10.3376 1.29604 10.516C1.65493 10.7081 1.95494 10.9941 2.16411 11.3433C2.37327 11.6926 2.48374 12.0921 2.48374 12.4992C2.48374 12.9063 2.37327 13.3057 2.16411 13.655C1.95494 14.0042 1.65493 14.2902 1.29604 14.4824C0.963271 14.6609 0.685373 14.9266 0.49215 15.251C0.298927 15.5754 0.197669 15.9464 0.199237 16.324V18.38C0.199872 18.935 0.420651 19.4672 0.81314 19.8597C1.20563 20.2522 1.73777 20.4729 2.29284 20.4736H21.7056C22.2607 20.4729 22.7928 20.2522 23.1853 19.8597C23.5778 19.4672 23.7986 18.935 23.7992 18.38V16.324C23.8005 15.9466 23.6991 15.576 23.5059 15.2519C23.3127 14.9278 23.035 14.6623 22.7024 14.484C21.1312 13.6976 21.1432 11.304 22.7024 10.5176ZM20.7264 14.1272C21.0473 14.7265 21.5383 15.2175 22.1376 15.5384C22.4248 15.6936 22.6024 15.9944 22.5992 16.3208V18.3768C22.599 18.6137 22.5048 18.8409 22.3373 19.0084C22.1697 19.1759 21.9426 19.2702 21.7056 19.2704H7.67924C7.64644 18.7504 7.88564 17.7552 7.07924 17.7352C6.27204 17.7544 6.51204 18.7544 6.47924 19.2736H2.29284C2.0559 19.2734 1.82874 19.1791 1.6612 19.0116C1.49366 18.8441 1.39945 18.6169 1.39924 18.38V16.324C1.39766 16.1639 1.43981 16.0064 1.52116 15.8685C1.60251 15.7307 1.71995 15.6176 1.86084 15.5416C2.41085 15.2469 2.87061 14.8085 3.19114 14.2732C3.51167 13.7378 3.68095 13.1255 3.68095 12.5016C3.68095 11.8776 3.51167 11.2653 3.19114 10.73C2.87061 10.1946 2.41085 9.75624 1.86084 9.46157C1.71995 9.38554 1.60251 9.27248 1.52116 9.1346C1.43981 8.99672 1.39766 8.83925 1.39924 8.67917V6.61997C1.40004 6.12637 1.79924 5.72717 2.29284 5.72637H6.47924C6.51204 6.24717 6.27124 7.24477 7.07924 7.26477C7.88644 7.24557 7.64644 6.24557 7.67924 5.72637H21.7056C22.1992 5.72717 22.5984 6.12637 22.5992 6.61997V8.67597C22.6024 9.00237 22.4248 9.30317 22.1376 9.45837C21.7383 9.67218 21.3851 9.96257 21.098 10.3129C20.811 10.6633 20.5958 11.0668 20.4648 11.5004C20.3337 11.934 20.2894 12.3891 20.3343 12.8398C20.3792 13.2905 20.5124 13.728 20.7264 14.1272Z"
                    fill={`${
                      window.location.pathname === "/coupon" ? "white" : "black"
                    }`}
                  />
                </svg>

                <span className="ms-7">Coupon</span>
              </div>
            </a>
          </li>
        </ul>
        <div className="space-y-8   font-medium pr-8 ">
          <button
            onClick={handleLogout}
            className="flex gap-8 relative w-full  items-center p-3 mt-4 rounded-r-full text-black"
          >
            <svg
              fill="#000000"
              height="50px"
              width="30px"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 490.3 490.3"
              xml:space="preserve"
            >
              <g>
                <g>
                  <path
                    d="M0,121.05v248.2c0,34.2,27.9,62.1,62.1,62.1h200.6c34.2,0,62.1-27.9,62.1-62.1v-40.2c0-6.8-5.5-12.3-12.3-12.3
			s-12.3,5.5-12.3,12.3v40.2c0,20.7-16.9,37.6-37.6,37.6H62.1c-20.7,0-37.6-16.9-37.6-37.6v-248.2c0-20.7,16.9-37.6,37.6-37.6h200.6
			c20.7,0,37.6,16.9,37.6,37.6v40.2c0,6.8,5.5,12.3,12.3,12.3s12.3-5.5,12.3-12.3v-40.2c0-34.2-27.9-62.1-62.1-62.1H62.1
			C27.9,58.95,0,86.75,0,121.05z"
                  />
                  <path
                    d="M385.4,337.65c2.4,2.4,5.5,3.6,8.7,3.6s6.3-1.2,8.7-3.6l83.9-83.9c4.8-4.8,4.8-12.5,0-17.3l-83.9-83.9
			c-4.8-4.8-12.5-4.8-17.3,0s-4.8,12.5,0,17.3l63,63H218.6c-6.8,0-12.3,5.5-12.3,12.3c0,6.8,5.5,12.3,12.3,12.3h229.8l-63,63
			C380.6,325.15,380.6,332.95,385.4,337.65z"
                  />
                </g>
              </g>
            </svg>
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
