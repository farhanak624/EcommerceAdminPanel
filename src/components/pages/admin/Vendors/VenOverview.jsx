import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  getVendorDetails,
  approveVendor,
  rejectVendor,
} from "../../../../Api/ApiCall";
import ImageModal from "./ImageModal";
import { useDispatch } from "react-redux";
import { loadSpinner } from "../../../../Redux/Features/NavbarSlice";

const VenOverview = ({ vendorId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showButton, setShowButton] = useState(false);
  const { id } = useParams() || vendorId; // Access the ID parameter from the URL
  const [vendorData, setVendorData] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setShowButton(
      location.pathname.startsWith("/admin/vendorsRequestOverview/")
    );

    dispatch(loadSpinner());
    getVendorDetails(id)
      .then((data) => {
        const vendorDetails = data?.data?.vendorData;
        setVendorData(vendorDetails);
        console.log("data in vendorDetailss", vendorDetails);
        console.log("profileImage", vendorDetails?.vendorDetails?.profileImage);
        // setRequests(vendorRequests)
        // const profileData = data.data.vendorData
        // setProfileDetails(profileData)
        // console.log("profileImg: ", profileDetails?.vendorDetails?.profileImage)
      })
      .catch((error) => {
        console.log("error in getVendorRequests:", error);
      })
      .finally(() => {
        dispatch(loadSpinner());
      });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  const handleApprove = (id) => {
    console.log("vendor: ", id);
    approveVendor(id)
      .then((data) => {
        console.log("data in approveVendor", data);
        setShowButton(false);
      })
      .catch((error) => {
        console.log("error in approveVendor:", error);
      });
  };

  const handleReject = (id) => {
    console.log("vendor: ", id);
    rejectVendor(id)
      .then((data) => {
        console.log("data in rejectVendor", data);
        setShowButton(false);
      })
      .catch((error) => {
        console.log("error in rejectVendor:", error);
      });
  };

  const openModal = (imageUrl) => {
    setCurrentImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage("");
  };

  return (
    <div className="bg-containerWhite w-full rounded-xl min-h-[600px] shadow-sm p-4">
      {/* <button
        onClick={() => navigate("/admin/vendors")}
        className="flex items-center  border border-gray-100 cursor-pointer w-[100px] shadow-md justify-center font-bold gap-2 mb-4"
      >
        {" "}
        <div className="flex justify-center items-center">
          <span className="font-bold" style={{ fontSize: "30px" }}>
            &#8592;
          </span>{" "}
          <p className="mt-1 ml-2">Back</p>
        </div>
      </button> */}

      <div className="flex justify-between mb-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div
            className={`w-full sm:w-3/5 bg-gray-100 rounded-xl p-4 text-gray-600`}
          >
            <div className="w-full sm:w-2/5 mb-4 sm:mb-0">
              <img
                src={
                  vendorData?.vendorDetails?.profileImage
                    ? vendorData.vendorDetails.profileImage
                    : "/defaultProfile.png"
                }
                className="w-full h-auto rounded-lg"
                alt="Profile"
              />
            </div>
            {/* Vendor Name and Contact Number */}
            <div className="mb-4 sm:flex justify-between">
              <div className="mb-2">
                <label htmlFor="vendorName" className="text-sm font-bold">
                  Vendor Name
                </label>
                <input
                  readOnly
                  type="text"
                  id="vendorName"
                  placeholder="Vendor Name"
                  className="border border-gray-300 rounded-md py-1 px-2 w-full focus:outline-none"
                  value={vendorData.name}
                />
              </div>
              <div className="mb-2 sm:ml-4">
                <label
                  htmlFor="contactNumber"
                  className="text-sm font-semibold"
                >
                  Contact Number
                </label>
                <input
                  readOnly
                  type="text"
                  id="contactNumber"
                  placeholder="Contact Number"
                  className="border border-gray-300 rounded-md py-1 px-2 w-full focus:outline-none"
                  value={vendorData.phoneNumber}
                />
              </div>
            </div>
            <div className="mb-4 sm:flex justify-between">
              {/* Email ID */}
              <div className="mb-2 sm:w-1/2 sm:mr-2">
                <label htmlFor="email" className="text-sm font-semibold">
                  Email ID
                </label>
                <input
                  readOnly
                  type="text"
                  id="email"
                  placeholder="Email ID"
                  className="border border-gray-300 rounded-md py-1 px-2 w-full focus:outline-none"
                  value={vendorData?.email}
                />
              </div>
              {/* Date of Birth */}
              <div className="mb-2 sm:w-1/2 relative">
                <label htmlFor="dob" className="text-sm font-semibold">
                  Date of Birth
                </label>
                <div className="relative">
                  <input
                    readOnly
                    type="text"
                    id="dob"
                    placeholder="Date of Birth"
                    className="border border-gray-300 rounded-md py-1 px-2 w-full pr-8 focus:outline-none"
                    value={formatDate(vendorData?.vendorDetails?.dateOfBirth)}
                  />
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-0 right-0 mt-2 mr-2"
                  >
                    <path
                      d="M15.8346 4.16602H15.0013V2.49935C15.0013 2.27834 14.9135 2.06637 14.7572 1.91009C14.6009 1.75381 14.389 1.66602 14.168 1.66602C13.947 1.66602 13.735 1.75381 13.5787 1.91009C13.4224 2.06637 13.3346 2.27834 13.3346 2.49935V4.16602H6.66797V2.49935C6.66797 2.27834 6.58017 2.06637 6.42389 1.91009C6.26761 1.75381 6.05565 1.66602 5.83464 1.66602C5.61362 1.66602 5.40166 1.75381 5.24538 1.91009C5.0891 2.06637 5.0013 2.27834 5.0013 2.49935V4.16602H4.16797C3.50493 4.16602 2.86904 4.42941 2.4002 4.89825C1.93136 5.36709 1.66797 6.00297 1.66797 6.66602V7.49935H18.3346V6.66602C18.3346 6.00297 18.0712 5.36709 17.6024 4.89825C17.1336 4.42941 16.4977 4.16602 15.8346 4.16602Z"
                      fill="#667085"
                    />
                    <path
                      d="M1.66797 15.8327C1.66797 16.4957 1.93136 17.1316 2.4002 17.6004C2.86904 18.0693 3.50493 18.3327 4.16797 18.3327H15.8346C16.4977 18.3327 17.1336 18.0693 17.6024 17.6004C18.0712 17.1316 18.3346 16.4957 18.3346 15.8327V9.16602H1.66797V15.8327Z"
                      fill="#667085"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mb-4">
              {/* Address */}
              <label htmlFor="address" className="text-sm font-semibold">
                Address
              </label>
              <input
                readOnly
                type="text"
                id="address"
                placeholder="Address"
                className="border border-gray-300 rounded-md py-1 px-2 w-full focus:outline-none"
                value={vendorData?.vendorDetails?.address}
              />
            </div>
            <div className="mb-4 sm:flex justify-between">
              {/* City */}
              <div className="mb-2 sm:w-1/2 sm:mr-2">
                <label htmlFor="city" className="text-sm font-semibold">
                  City
                </label>
                <input
                  readOnly
                  type="text"
                  id="city"
                  placeholder="City"
                  className="border border-gray-300 rounded-md py-1 px-2 w-full focus:outline-none"
                  value={vendorData?.vendorDetails?.address}
                />
              </div>
              {/* State */}
              <div className="mb-2 sm:w-1/2">
                <label htmlFor="state" className="text-sm font-semibold">
                  State
                </label>
                <input
                  readOnly
                  type="text"
                  id="state"
                  placeholder="State"
                  className="border border-gray-300 rounded-md py-1 px-2 w-full focus:outline-none"
                  value={vendorData?.vendorDetails?.state}
                />
              </div>
            </div>
            <div className="sm:flex justify-between">
              {/* Country */}
              <div className="mb-2 sm:w-1/2 sm:mr-2">
                <label htmlFor="country" className="text-sm font-semibold">
                  Country
                </label>
                <input
                  readOnly
                  type="text"
                  id="country"
                  placeholder="Country"
                  className="border border-gray-300 rounded-md py-1 px-2 w-full focus:outline-none"
                  value={vendorData?.vendorDetails?.country}
                />
              </div>
              {/* Post code */}
              <div className="sm:w-1/2">
                <label htmlFor="postcode" className="text-sm font-semibold">
                  Post code
                </label>
                <input
                  readOnly
                  type="text"
                  id="postcode"
                  placeholder="Post code"
                  className="border border-gray-300 rounded-md py-1 px-2 w-full focus:outline-none"
                  value={vendorData?.vendorDetails?.postCode}
                />
              </div>
            </div>
          </div>

          <div
            className={`w-full sm:w-2/5 bg-gray-100 rounded-xl p-4 text-gray-600 h-fit`}
          >
            <div className="mb-4">
              <label htmlFor="proof" className="text-sm font-semibold">
                Proof
              </label>
              <input
                readOnly
                type="text"
                id="address"
                placeholder="Proof"
                className="border border-gray-300 rounded-md py-1 px-2 w-full focus:outline-none"
                value={vendorData?.vendorDetails?.profileId}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="images" className="text-sm font-semibold">
                Images
              </label>
              <div className="flex flex-wrap mt-2">
                <div
                  className="w-16 h-16 mr-2 mb-2 rounded-md overflow-hidden cursor-pointer"
                  onClick={() =>
                    openModal(
                      vendorData?.vendorDetails?.profileIdImages?.backPageImage
                    )
                  }
                >
                  <img
                    src={
                      vendorData?.vendorDetails?.profileIdImages?.backPageImage
                    }
                    className="w-full h-full object-cover"
                    alt="backImage"
                  />
                </div>
                <div
                  className="w-16 h-16 mr-2 mb-2 rounded-md overflow-hidden cursor-pointer"
                  onClick={() =>
                    openModal(
                      vendorData?.vendorDetails?.profileIdImages?.frontPageImage
                    )
                  }
                >
                  <img
                    src={
                      vendorData?.vendorDetails?.profileIdImages?.frontPageImage
                    }
                    className="w-full h-full object-cover"
                    alt="frontImage"
                  />
                </div>
              </div>
            </div>
            <ImageModal
              imageUrl={currentImage}
              isOpen={isModalOpen}
              onClose={closeModal}
            />
            <div className="mb-4 sm:flex justify-between">
              {/* <div className="mb-2">
                                <label htmlFor="registeredName" className="text-sm font-bold">Registered Name</label>
                                <input readOnly type="text" id="registeredName" placeholder="Registered Name" className="border border-gray-300 rounded-md py-1 px-2 w-full focus:outline-none" />
                            </div>
                            <div className="mb-2 sm:ml-4">
                                <label htmlFor="passportNumber" className="text-sm font-semibold">Passport Number</label>
                                <input readOnly type="text" id="passportNumber" placeholder="Passport Number" className="border border-gray-300 rounded-md py-1 px-2 w-full focus:outline-none" />
                            </div> */}
            </div>
            {showButton && (
              <div className="flex justify-end mt-4">
                <button
                  className="bg-green-600 text-white mr-2 px-4 py-2 rounded-md"
                  onClick={() => handleApprove(vendorData._id)}
                >
                  Approve
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-md"
                  onClick={() => handleReject(vendorData._id)}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenOverview;
