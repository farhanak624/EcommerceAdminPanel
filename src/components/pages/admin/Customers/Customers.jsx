import React, { useEffect, useState } from "react";
import Card from "./Card";
import CustomerTable from "./CustomerTable";
import { getAdminCustomers } from "../../../../Api/ApiCall";
import { useDispatch } from "react-redux";
import { loadSpinner } from "../../../../Redux/Features/NavbarSlice";
import Loader from "../../../LodingDiv/LoaderSmall";

const Customers = () => {
  const dispatch = useDispatch();
  const [activeButton, setActiveButton] = useState("Ecomers");
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const [loading,setLoading] = useState(true)
  useEffect(() => {
   
    getCustomerData(activeButton, page);
    
  }, [activeButton, page]);
  const getCustomerData = async (activeButton, page) => {
    try {
    //  dispatch(loadSpinner());
      const res = await getAdminCustomers(activeButton, page);
      console.log("hihihihi",res.data);
      setData(res.data);
     // dispatch(loadSpinner());
      setLoading(false)
    } catch (error) {
      console.log(error);
     // dispatch(loadSpinner());
    }
  };
  function handleButtonClick(str) {
    setActiveButton(str);
  }
  return (
    <div
    // style={{ backgroundColor: "rgba(255, 255, 255, 1)" }}
    // className="p-6 rounded-xl"
    >
      <div className="flex">
        <div
          className={`rounded-l-xl cursor-pointer text-xs text-center px-5 py-3 ${
            activeButton === "Ecomers"
              ? "text-white"
              : ""
          }`}
          style={{ backgroundColor: activeButton === "Ecomers" ? "rgba(47, 78, 255, 1)": "rgba(47, 78, 255, 0.1)" }}
          onClick={() => handleButtonClick("Ecomers")}
        >
          Ecommerce
        </div>
       
        <div
          className={`rounded-r-xl cursor-pointer text-xs text-center px-10 py-3 ${
            activeButton === "Flicks" ? "text-white" : ""
          }`}
          style={{ backgroundColor: activeButton === "Flicks" ? "rgba(47, 78, 255, 1)": "rgba(47, 78, 255, 0.1)" }}
          onClick={() => handleButtonClick("Flicks")}
        >
          Flicks
        </div>
      </div>
      {!loading ? <>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 py-4 lg:grid-cols-2 gap-3">
        <Card
          text={"Total Customers"}
          data={
            activeButton == "Flicks"
              ? {
                  totalCount: data?.totalCoustemer?.totalUsers,
                  img: data?.totalCoustemer?.totalUsersImage,
                }
              : {
                  totalCount: data?.totalUser?.totalUsers,
                  img: data?.totalUser?.totalCustomerImage,
                }
          }
          img={
            <svg
              width="30"
              height="28"
              viewBox="0 0 30 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25.9458 8.36024C26.8243 7.74447 27.406 6.72016 27.406 5.5656C27.406 3.67685 25.8746 2.14927 23.981 2.14927C22.0875 2.14927 20.556 3.67685 20.556 5.5656C20.556 6.72016 21.1318 7.74447 22.0162 8.36024C21.2624 8.62075 20.5738 9.02337 19.9921 9.54441C19.1907 8.86351 18.2469 8.34247 17.2141 8.03459C18.4666 7.27672 19.3095 5.89716 19.3095 4.32814C19.3095 1.93612 17.3684 0 14.9703 0C12.5722 0 10.6312 1.94204 10.6312 4.32814C10.6312 5.89716 11.4681 7.27672 12.7266 8.03459C11.7056 8.34247 10.7736 8.85759 9.97824 9.52664C9.39652 9.01745 8.71983 8.62075 7.97784 8.36616C8.85635 7.75039 9.43807 6.72608 9.43807 5.57152C9.43807 3.68277 7.90661 2.15519 6.01306 2.15519C4.11951 2.15519 2.58805 3.68277 2.58805 5.57152C2.58805 6.72608 3.16383 7.75039 4.04828 8.36616C1.69173 9.17731 0 11.4095 0 14.0324V14.4232C0 14.435 0.0118718 14.4469 0.0237436 14.4469H7.28334C7.24179 14.7725 7.21805 15.11 7.21805 15.4475V15.8501C7.21805 17.5908 8.63079 19 10.3759 19H19.5766C21.3217 19 22.7345 17.5908 22.7345 15.8501V15.4475C22.7345 15.11 22.7107 14.7725 22.6692 14.4469H29.9763C29.9881 14.4469 30 14.435 30 14.4232V14.0324C29.9881 11.4036 28.3023 9.17139 25.9458 8.36024ZM21.5057 5.55968C21.5057 4.19788 22.6157 3.09068 23.981 3.09068C25.3463 3.09068 26.4563 4.19788 26.4563 5.55968C26.4563 6.90371 25.37 7.99907 24.0285 8.02867H23.9335C22.5861 8.00499 21.5057 6.90963 21.5057 5.55968ZM11.5691 4.32814C11.5691 2.46307 13.0886 0.947336 14.9584 0.947336C16.8283 0.947336 18.3478 2.46307 18.3478 4.32814C18.3478 6.12808 16.9292 7.60237 15.1543 7.70302H14.7626C12.9877 7.60237 11.5691 6.12808 11.5691 4.32814ZM3.51998 5.55968C3.51998 4.19788 4.63 3.09068 5.99525 3.09068C7.36051 3.09068 8.47052 4.19788 8.47052 5.55968C8.47052 6.90371 7.38425 7.99907 6.04274 8.02867H5.94776C4.60625 8.00499 3.51998 6.90963 3.51998 5.55968ZM7.44954 13.4936H0.961615C1.22873 10.9713 3.36565 8.99377 5.95964 8.97601H6.03087C7.26553 8.98193 8.39335 9.43783 9.26593 10.1779C8.41116 11.1016 7.77602 12.2384 7.44954 13.4936ZM21.7729 15.8501C21.7729 17.0639 20.7816 18.0527 19.5647 18.0527H10.3641C9.14721 18.0527 8.15592 17.0639 8.15592 15.8501V15.4475C8.15592 11.7706 11.1001 8.76285 14.7626 8.65628C14.8279 8.6622 14.8991 8.6622 14.9644 8.6622C15.0297 8.6622 15.1009 8.6622 15.1662 8.65628C18.8287 8.76285 21.7729 11.7706 21.7729 15.4475V15.8501ZM22.4792 13.4936C22.1528 12.2443 21.5295 11.1253 20.6806 10.2016C21.5592 9.44375 22.6989 8.98785 23.9454 8.97601H24.0166C26.6106 8.99377 28.7475 10.9713 29.0146 13.4936H22.4792Z"
                fill="black"
              />
            </svg>
          }
          color={"rgba(242, 251, 255, 1)"}
        />
        <Card
          text={
            <div className="flex justify-center text-xl font-semibold">
              <div className="mt-2 mx-2 w-3 h-3 bg-green-600 rounded-full"></div>
              New Customers
            </div>
          }
          data={
            activeButton == "Flicks"
              ? {
                  totalCount: data?.newCoustomer?.newCoustemers,
                  persetage:
                    data?.newCoustomer?.prevMonthUsers != 0
                      ? ((data?.newCoustomer?.newCoustemers -
                          data?.newCoustomer?.prevMonthUsers) *
                          100) /
                        data?.newCoustomer?.prevMonthUsers
                      : data?.newCoustomer?.newCoustemers,
                  img: data?.newCoustomer?.newCustomerImage,
                }
              : {
                  totalCount: data?.newCoustomers?.totalNewUsers,
                  persetage:
                    data?.newCoustomers?.prevMonthUsers != 0
                      ? ((data?.newCoustomers?.totalNewUsers -
                          data?.newCoustomers?.prevMonthUsers) *
                          100) /
                        data?.newCoustomers?.prevMonthUsers
                      : data?.newCoustomers?.totalNewUsers,
                  img: data?.newCoustomers?.userImages,
                }
          }
          img={
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 11.4783C10.8649 11.4783 9.7553 11.1417 8.81151 10.511C7.86771 9.88042 7.13212 8.98409 6.69773 7.9354C6.26335 6.88671 6.1497 5.73277 6.37114 4.61948C6.59259 3.5062 7.13919 2.48359 7.94182 1.68095C8.74445 0.878323 9.76707 0.331724 10.8803 0.110278C11.9936 -0.111167 13.1476 0.0024867 14.1963 0.436868C15.245 0.871249 16.1413 1.60685 16.7719 2.55064C17.4025 3.49444 17.7391 4.60404 17.7391 5.73913C17.7391 7.26124 17.1345 8.72101 16.0582 9.79731C14.9819 10.8736 13.5221 11.4783 12 11.4783ZM12 1.04348C11.0713 1.04348 10.1634 1.31888 9.39123 1.83484C8.61904 2.35081 8.01719 3.08417 7.66178 3.94218C7.30638 4.8002 7.21339 5.74434 7.39457 6.65521C7.57576 7.56608 8.02297 8.40276 8.67967 9.05946C9.33637 9.71616 10.1731 10.1634 11.0839 10.3446C11.9948 10.5257 12.9389 10.4328 13.7969 10.0773C14.655 9.72195 15.3883 9.12009 15.9043 8.3479C16.4203 7.5757 16.6957 6.66784 16.6957 5.73913C16.6957 4.49377 16.2009 3.29941 15.3203 2.41881C14.4397 1.5382 13.2454 1.04348 12 1.04348ZM18.7826 24H5.21739C3.83365 24 2.50659 23.4503 1.52814 22.4719C0.549688 21.4934 0 20.1663 0 18.7826C0 17.3989 0.549688 16.0718 1.52814 15.0934C2.50659 14.1149 3.83365 13.5652 5.21739 13.5652H18.7826C20.1663 13.5652 21.4934 14.1149 22.4719 15.0934C23.4503 16.0718 24 17.3989 24 18.7826C24 20.1663 23.4503 21.4934 22.4719 22.4719C21.4934 23.4503 20.1663 24 18.7826 24ZM5.21739 14.6087C4.1104 14.6087 3.04875 15.0484 2.26599 15.8312C1.48323 16.614 1.04348 17.6756 1.04348 18.7826C1.04348 19.8896 1.48323 20.9512 2.26599 21.734C3.04875 22.5168 4.1104 22.9565 5.21739 22.9565H18.7826C19.8896 22.9565 20.9512 22.5168 21.734 21.734C22.5168 20.9512 22.9565 19.8896 22.9565 18.7826C22.9565 17.6756 22.5168 16.614 21.734 15.8312C20.9512 15.0484 19.8896 14.6087 18.7826 14.6087H5.21739Z"
                fill="#231F20"
              />
            </svg>
          }
          color={"rgba(242, 239, 255, 1)"}
        />
        
      </div>
      <CustomerTable
        data={data.userData}
        page={page}
        setPage={setPage}
        count={data.totalUsers}
        selected={activeButton}
      />
      </> :  <div className=" bg-inherit items-center pt-48"><Loader/></div>}
    </div>
  );
};

export default Customers;
