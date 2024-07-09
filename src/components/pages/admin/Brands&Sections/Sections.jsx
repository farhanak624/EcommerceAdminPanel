import React, { useEffect, useState } from "react";
import { adminGetSections, deleteSection } from "../../../../Api/ApiCall";
import SectionModal from "../../../Modals/ProductModals/SectionModal";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Sections = () => {
  const [sectionList, setSectionList] = useState([]);
  const [sectionEditModal, setSectionEditModal] = useState(false);
  const [currentSectionData, setCurrentSectionData] = useState({})
  useEffect(() => {
    console.log("Brands Page");
    getProductSections();
  }, []);
  const getProductSections = async () => {
    try {
      const data = await adminGetSections();
      console.log("sections", data?.data?.sectionData);
      setSectionList(data?.data?.sectionData);
    } catch (error) {
      console.error("Error fetching sections:", error);
    }
  };

  const sectionEditCallback=()=>{
    setSectionEditModal(!sectionEditModal);
    getProductSections();
  }
  return (
    <div>
      {
        sectionEditModal && (
          <SectionModal
          callback={sectionEditCallback}
          editData={currentSectionData}
          />
        )
      }
      <div className=" mt-6">
        <div className="table-responsive ">
          <table className="table align-middle table-nowrap mb-0 h-9 w-full overflow-x-auto">
            <thead className="bg-gray-100 h-10">
              <tr>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sectionList?.map((section) => (
                <tr className="text-center " key={section?._d}>
                  <td className="py-1">{section?.name}</td>
                  <td className="py-1">
                    <button
                    onClick={()=>{
                      setSectionEditModal(true);
                      setCurrentSectionData({
                        name:section?.name,
                        Id:section?._id,
                      image:section?.image
                      });
                    }}
                    className="w-9 h-9  hover:bg-slate-200 rounded-full">
                      <svg
                        width="23px"
                        height="23px"
                        className="ml-1.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="m3.99 16.854-1.314 3.504a.75.75 0 0 0 .966.965l3.503-1.314a3 3 0 0 0 1.068-.687L18.36 9.175s-.354-1.061-1.414-2.122c-1.06-1.06-2.122-1.414-2.122-1.414L4.677 15.786a3 3 0 0 0-.687 1.068zm12.249-12.63 1.383-1.383c.248-.248.579-.406.925-.348.487.08 1.232.322 1.934 1.025.703.703.945 1.447 1.025 1.934.058.346-.1.677-.348.925L19.774 7.76s-.353-1.06-1.414-2.12c-1.06-1.062-2.121-1.415-2.121-1.415z"
                          fill="#000000"
                        />
                      </svg>
                    </button>
                    <button
                    onClick={(e) => {
                      console.log("Delete button clicked",section?._id);
                      e.stopPropagation(); // Prevent click from bubbling to the card div
                      Swal.fire({
                        title: "Are you sure?",
                        text: "Do you want to delete this section!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          // If confirmed, perform the delete operation
                          // You can place your delete logic here
                          deleteSection(section?._id)
                            .then((data) => {
                              if (result.isConfirmed) {
                              }
                              Swal.fire(
                                "Deleted!",
                                "Your file has been deleted.",
                                "success"
                              );
                              getProductSections();
                            })
                            .catch((err) => {
                              console.log(err.response.data.message);
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
                    className="btn btn-danger btn-sm ms-2">
                      <svg
                        fill="#FF0000"
                        className="ml-1.5"
                        width="23px"
                        height="23px"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z"></path>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Sections;
