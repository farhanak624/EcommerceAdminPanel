import React, { useEffect, useRef, useState } from "react";
import AddCouponModal from "../../../Modals/Coupon/CreateCouponModal";
import AdminAddCouponModal from "../../../Modals/Coupon/CreateCouponModalAdmin";
import { adminBlockOrUnblock, adminGetCoupons, deleteCoupon } from "../../../../Api/ApiCall";
import { useDispatch } from "react-redux";
import { loadSpinner } from "../../../../Redux/Features/NavbarSlice";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const AdminCoupon = () => {
  const dispatch = useDispatch();
  const loader = useRef(null);
  const [createModal, setCreateModal] = useState(false);
  const [CouponList, setCouponList] = useState([]);
  const [totalpages, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  useEffect(() => {
    console.log(page);
    getAllcouponList(page);
  }, [page]);
  useEffect(() => {
    if (totalpages < 10) {
      return;
    }

    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };

    const observerCallback = (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setPage((prev) => prev + 1);
      }
    };

    const observer = new IntersectionObserver(observerCallback, options);

    const setupObserver = () => {
      if (loader.current) {
        observer.observe(loader.current);
      } else {
        setTimeout(setupObserver, 500);
      }
    };

    setupObserver();

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [loader, totalpages]);
  const getAllcouponList =async (page) => {
    setCouponList([])
    dispatch(loadSpinner())
    adminGetCoupons(page)
      .then((res) => {
        const newCoupons = res?.data?.coupons || [];
        setTotalPage(res?.data?.total || 0);
        setCouponList((prev) => [...prev, ...newCoupons]);
      })
      .catch((err) => {
        console.log(err);
      }).finally(() => {
        dispatch(loadSpinner())
      }
      );
  };
  const couponStatusChange =async (couponId) => {
    adminBlockOrUnblock(couponId)
      .then((data) => {
        console.log(data);
        setCouponList((prev) =>
          prev.map((coupon) =>
            coupon._id === couponId
              ? { ...coupon, activeStatus: !coupon.activeStatus }
              : coupon
          )
        );
        toast.success("Coupon Status Changed successfully");
      })
      .catch((error) => {
        console.log("asdsdd", error.response.data);
        toast.error(error.response.data.message);
      });
  };
  const callback = () => {
    setCreateModal(!createModal);
    setCouponList([]);
    setPage(1);
    getAllcouponList(1);
  };

  return (
    <div className="bg-containerWhite w-full flex flex-col h-full rounded-xl min-h-[600px] shadow-sm p-4">
      <div className="">
        <div className="flex justify-between items-center mb-4">
          <div>
            {/* <button className="bg-navblue hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-l">
              Top Vendors
            </button> */}
            {/* <button className="bg-gray-200 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-r">
              Vendor Request
            </button> */}
          </div>
          <button
            onClick={() => setCreateModal(true)}
            className="bg-containerWhite border shadow hover:bg-green-700 text-black font-bold py-2 px-4 rounded"
          >
            Create Coupon
          </button>
        </div>
        {createModal && (
          <AdminAddCouponModal admin={true} callback={callback} />
        )}
        <div className="overflow-x-auto">
          <table className="min-w-full  leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600  tracking-wider rounded-s-xl">
                  Coupon Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600  tracking-wider">
                  Start date
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600  tracking-wider">
                  End date
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600  tracking-wider">
                  Min price
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600  tracking-wider">
                  Discount
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600  tracking-wider">
                  Discount type
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600  tracking-wider">
                  Maximum Per user
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600  tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600  tracking-wider rounded-e-xl">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Map your data here */}
              {CouponList.length > 0 ?
                CouponList.map((coupon) => {
                  return (
                    <tr>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {coupon?.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {new Date(
                          coupon?.validity?.startDate
                        ).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {new Date(
                          coupon?.validity?.endDate
                        ).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {coupon?.currency} {" "}{coupon?.minPrice}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {coupon?.discount}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {coupon.discountType}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {coupon?.maximumCount.userCount}
                      </td>
                      <td className="px-5 border-gray-200 py-5 border-b bg-white text-sm">
                        {coupon?.activeStatus ? (
                          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                            ></span>
                            <span className="relative">Active</span>
                          </span>
                        ) : (
                          <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                            ></span>
                            <span className="relative">Inactive</span>
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex justify-center">
                          <button className="text-blue-500 hover:text-blue-700">
                            <label className="inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={coupon?.activeStatus} // This will set the toggle "on" if activeStatus is true
                                onChange={() => couponStatusChange(coupon._id)}
                              />
                              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent click from bubbling to the card div
                              Swal.fire({
                                title: "Are you sure?",
                                text: `Do you want to delete this coupon ${coupon?.name}  !`,
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Yes, delete it!",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  // If confirmed, perform the delete operation
                                  // You can place your delete logic here
                                  deleteCoupon(coupon?._id, "admin")
                                    .then((data) => {
                                      if (result.isConfirmed) {
                                      }
                                      Swal.fire(
                                        "Deleted!",
                                        "Your Coupon has been deleted.",
                                        "success"
                                      );
                                      getAllcouponList();
                                    })
                                    .catch((err) => {
                                      toast.error(err.response.data.message);
                                      Swal(
                                        "Sorry!",
                                        err.response.data.message,
                                        "error"
                                      );
                                    });

                                  // For demonstration purposes, let's just log the deletion
                                  console.log("Item deleted");
                                }
                              });
                            }}
                            className="w-9 h-9 hover:bg-slate-200 rounded-full"
                          >
                            <svg
                              fill="#FF0000"
                              width="23px"
                              className="ml-1.5"
                              height="23px"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z"></path>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                }):(
                <tr>
                  <td colSpan="9" className="text-center">
                    No Coupons Found
                  </td>
                </tr>
                )}
              {/* Repeat rows as needed */}
            </tbody>
          </table>
          <div ref={loader} className="h-10" />
        </div>
      </div>
    </div>
  );
};

export default AdminCoupon;
