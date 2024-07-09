import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTopVendors, actionOnVendor } from "../../../../Api/ApiCall";
import CountryFlag from "react-country-flag";
import countryCodeLookup from "country-code-lookup";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Loading from "../../../LodingDiv/LoaderSmall";

const TopVendors = () => {
  const navigate = useNavigate();
  const [topVendors, setTopVendors] = useState([]);
  const [isBlocked, setIsBlocked] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [userIdToBlock, setUserIdToBlock] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTopVendors(page)
      .then((data) => {
        console.log("data in getTopVendors", data?.data);
        const vendors = data?.data?.vendorData;
        if (Array.isArray(vendors)) {
          setTopVendors((prevData) => [...prevData, ...vendors]);
          setTotalCount(data?.data?.totalVendor);
        } else {
          console.log("No Top vendors found");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("error in getTopVendors:", error);
      });
  }, [page]);

  const handleToggleBlock = (id) => {
    const vendor = topVendors.find((v) => v._id === id);
    const action = vendor.vendorDetails.isBlocked ? "unblock" : "block";

    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to ${action} this vendor?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${action} it!`,
    }).then((result) => {
      if (result.isConfirmed) {
        actionOnVendor(id)
          .then((data) => {
            console.log("data in actionOnVendor: ", data);
            setTopVendors((prevVendors) =>
              prevVendors.map((vendor) =>
                vendor._id === id
                  ? {
                      ...vendor,
                      vendorDetails: {
                        ...vendor.vendorDetails,
                        isBlocked: !vendor.vendorDetails.isBlocked,
                      },
                    }
                  : vendor
              )
            );
            Swal.fire(
              `${action.charAt(0).toUpperCase() + action.slice(1)}ed!`,
              `Vendor has been ${action}ed.`,
              "success"
            );
          })
          .catch((error) => {
            console.error("Error updating blocking status:", error);
            Swal.fire("Failed!", `Failed to ${action} the vendor.`, "error");
          });
      }
    });
  };

  // const handleToggleBlock = (id) => {
  //     actionOnVendor(id).then((data) => {
  //         console.log("data in actionOnVendor: ", data);
  //         setTopVendors(prevVendors => prevVendors.map(vendor =>
  //             vendor._id === id ? { ...vendor, vendorDetails: { ...vendor.vendorDetails, isBlocked: !vendor.vendorDetails.isBlocked } } : vendor
  //         ));
  //     }).catch((error) => {
  //         console.error('Error updating blocking status:', error);
  //     });
  // };

  const handleScroll = () => {
    // Detect when user has scrolled to the bottom
    const { scrollTop, scrollHeight, clientHeight } =
      document.documentElement || document.body;

    // Detect when user has scrolled to the bottom
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      // If all data is not fetched yet
      if (topVendors.length < totalCount) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [topVendors, totalCount]);

  const getDisplayValue = (value) => {
    return value != undefined || value != null || value === "" ? value : "N/A";
  };

  return (
    <div className="mt-8 overflow-x-auto border rounded-xl shadow-md">
      <div className="table-responsive">
        <table className="table align-middle table-nowrap mb-0 h-9 w-full">
          <thead className="bg-gray-100 h-10">
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Mail ID</th>
              <th>Total Value</th>
              <th>No.Products</th>
              <th>Location</th>
              <th>Return %</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="8" className="text-center py-3">
                  <Loading />
                </td>
              </tr>
            ) : topVendors.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-black text-center py-3">
                  No data available
                </td>
              </tr>
            ) : (
              topVendors?.map((vendor, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td
                    className="text-sm text-center py-3 cursor-pointer"
                    onClick={() =>
                      navigate(`/admin/vendorsOverview/${vendor._id}`)
                    }
                  >
                    <div className="flex flex-col items-center md:flex-row sm:items-center">
                      <img
                        src={
                          vendor?.vendorDetails?.profileImage
                            ? vendor.vendorDetails.profileImage
                            : "/defaultProfile.png"
                        }
                        className="m-2 w-7 h-7 mr-2 rounded-full"
                        alt="Vendor Profile"
                      />
                      <span className="sm:ml-2 sm:mt-0 text-sm text-transform: capitalize">
                        {getDisplayValue(vendor.name)}
                      </span>
                    </div>
                  </td>
                  <td
                    className="text-sm text-center py-3 cursor-pointer"
                    onClick={() =>
                      navigate(`/admin/vendorsOverview/${vendor._id}`)
                    }
                  >
                    {getDisplayValue(vendor?.phoneNumber)}
                  </td>
                  <td
                    className="text-center text-sm py-3 cursor-pointer"
                    onClick={() =>
                      navigate(`/admin/vendorsOverview/${vendor._id}`)
                    }
                  >
                    {getDisplayValue(vendor?.email)}
                  </td>
                  <td
                    className="text-sm text-center py-3 cursor-pointer"
                    onClick={() =>
                      navigate(`/admin/vendorsOverview/${vendor._id}`)
                    }
                  >
                    {getDisplayValue(vendor?.totalPrice)}
                  </td>
                  <td
                    className="text-sm text-center py-3 cursor-pointer"
                    onClick={() =>
                      navigate(`/admin/vendorsOverview/${vendor._id}`)
                    }
                  >
                    {getDisplayValue(vendor?.totalProducts)}
                  </td>
                  <td
                    className="text-center py-3 cursor-pointer"
                    onClick={() =>
                      navigate(`/admin/vendorsOverview/${vendor._id}`)
                    }
                  >
                    <div className="flex items-center">
                      <CountryFlag
                        className="m-2 w-2 h-7 mr-2 rounded-full"
                        countryCode={
                          countryCodeLookup.byCountry(
                            vendor?.vendorDetails?.country
                          )?.iso2 || ""
                        }
                        svg
                      />
                      <span className="text-sm">
                        {getDisplayValue(vendor?.vendorDetails.country)}
                      </span>
                    </div>
                  </td>
                  <td
                    className="text-sm text-center py-3 cursor-pointer"
                    onClick={() =>
                      navigate(`/admin/vendorsOverview/${vendor._id}`)
                    }
                  >
                    {getDisplayValue(
                      parseFloat(vendor?.returnPercentage.toFixed(2))
                    )}{" "}
                    %
                  </td>
                  <td className="text-center text-sm py-3">
                    <div
                      className={`text-xs font-bold py-1 px-2 rounded-full ${
                        vendor?.vendorDetails?.isBlocked
                          ? "bg-red-100 text-red-600 "
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {vendor.vendorDetails.isBlocked ? "In Active" : "Active"}
                    </div>
                  </td>
                  <td className="text-sm text-center py-3">
                    <button
                      className={`w-10 h-6 rounded-full focus:outline-none ${
                        vendor.vendorDetails.isBlocked
                          ? "bg-gray-300"
                          : "bg-blue-600"
                      }`}
                      onClick={() => {
                        handleToggleBlock(vendor._id);
                      }}
                    >
                      <div
                        className={`w-4 h-4 rounded-full m-1 shadow-md transform duration-300 ${
                          vendor.vendorDetails.isBlocked
                            ? "translate-x-0 bg-gray-100"
                            : "translate-x-4 bg-white"
                        }`}
                      ></div>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopVendors;
