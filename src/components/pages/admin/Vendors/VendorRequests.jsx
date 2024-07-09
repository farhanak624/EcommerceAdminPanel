import { useEffect, useState } from "react";
import VenOverview from "./VenOverview";
import { useNavigate } from "react-router-dom";
import {
  getVendorRequests,
  approveVendor,
  rejectVendor,
} from "../../../../Api/ApiCall";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loading from "../../../LodingDiv/LoaderSmall";

const VendorRequests = () => {
  const [selectedVendor, setSelectedVendor] = useState(null); // State to track the selected vendor
  const [requests, setRequests] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getVendorRequests(page)
      .then((data) => {
        console.log("data in getVendorRequests", data);
        const vendors = data?.data?.Vendors;
        if (Array.isArray(vendors)) {
          setRequests((prevData) => [...prevData, ...vendors]);
          setTotalCount(data?.data?.totalRequestedVendors);
        } else {
          console.log("No vendors found");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("error in getVendorRequests:", error);
      });
  }, [page]);

  const handleScroll = () => {
    // Detect when user has scrolled to the bottom
    const { scrollTop, scrollHeight, clientHeight } =
      document.documentElement || document.body;

    // Detect when user has scrolled to the bottom
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      if (requests.length < totalCount) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [requests, totalCount]);

  const handleApprove = (id) => {
    setSelectedVendor(id);
    approveVendor(id)
      .then((data) => {
        console.log("data in approveVendor", data);
        toast.success("Approved vendor successfully");
        setRequests((prevRequests) =>
          prevRequests.filter((vendor) => vendor._id !== id)
        );
        setSelectedVendor(null);
      })
      .catch((error) => {
        console.log("error in approveVendor:", error);
        toast.error("Failed to approve vendor");
        setSelectedVendor(null);
      });
  };

  const handleReject = (id) => {
    setSelectedVendor(id);
    rejectVendor(id)
      .then((data) => {
        console.log("data in rejectVendor", data);
        toast.warning("Rejected the vendor");
        setRequests((prevRequests) =>
          prevRequests.filter((vendor) => vendor._id !== id)
        );
        setSelectedVendor(null);
      })
      .catch((error) => {
        console.log("error in rejectVendor:", error);
        toast.error("Failed to reject the request");
        setSelectedVendor(null);
      });
  };

  const getDisplayValue = (value) => {
    return value !== undefined && value !== null ? value : "N/A";
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
            ) : requests.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-black text-center py-3">
                  No data available
                </td>
              </tr>
            ) : (
              requests?.map((vendor, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td
                    className="text-sm text-center py-3 cursor-pointer"
                    onClick={() =>
                      navigate(`/admin/vendorsRequestOverview/${vendor._id}`)
                    }
                  >
                    <div className="flex flex-col justify-center items-center sm:flex-row sm:items-center">
                      <img
                        src={
                          vendor?.vendorDetails?.profileImage
                            ? vendor.vendorDetails.profileImage
                            : "/defaultProfile.png"
                        }
                        className="m-2 w-7 h-7 mr-2 rounded-full"
                        alt="Vendor Profile"
                      />
                      <span className="sm:ml-2 sm:mt-0">
                        {getDisplayValue(vendor.name)}
                      </span>
                    </div>
                  </td>
                  <td
                    className="text-sm text-center py-3 cursor-pointer"
                    onClick={() =>
                      navigate(`/admin/vendorsRequestOverview/${vendor._id}`)
                    }
                  >
                    {getDisplayValue(vendor.phoneNumber)}
                  </td>
                  <td
                    className="text-center text-sm py-3 cursor-pointer"
                    onClick={() =>
                      navigate(`/admin/vendorsRequestOverview/${vendor._id}`)
                    }
                  >
                    {getDisplayValue(vendor.email)}
                  </td>
                  <td className="text-sm text-center py-3">
                    <div>
                      <button
                        className={
                          "w-16 h-6 m-1 rounded focus:outline-none bg-green-600 text-white"
                        }
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent click from bubbling to the card div
                          Swal.fire({
                            title: "Are you sure?",
                            text: "You want approve this vendor!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, approve!",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              handleApprove(vendor._id);
                            }
                          });
                        }}
                      >
                        Approve
                      </button>
                      <button
                        className={
                          "w-16 h-6 m-1 rounded focus:outline-none bg-red-600 text-white"
                        }
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent click from bubbling to the card div
                          Swal.fire({
                            title: "Are you sure?",
                            text: "You want reject this vendor!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, reject!",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              handleReject(vendor._id);
                            }
                          });
                        }}
                      >
                        Reject
                      </button>
                    </div>
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

export default VendorRequests;
