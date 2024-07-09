import React, { useEffect, useState } from "react";
import Sections from "./Sections";
import {
  deleteCategory,
  deleteSubCategory,
  getSectionCategories,
  getSections,
} from "../../../../Api/ApiCall";
import { useDispatch } from "react-redux";
import { loadSpinner } from "../../../../Redux/Features/NavbarSlice";
import CategoryModal from "../../../Modals/ProductModals/CategoryModal";
import SubcategoryModal from "../../../Modals/ProductModals/SubcategoryModal";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const SectionCategory = () => {
  const dispatch = useDispatch();
  const [activeButton, setActiveButton] = useState("brands");
  const [sectionList, setSectionList] = useState([]);
  const [sectionId, setSectionId] = useState("");
  const [currentCategory, setCurrentCategory] = useState({});
  const [categoryList, setCategoryList] = useState([]);
  const [categoryEditModal, setCategoryEditModal] = useState(false);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [currentSubCategory, setCurrentSubCategory] = useState({});
  const [subCategoryModal, setsubCategoryModal] = useState(false);

  useEffect(() => {
    console.log("Brands Page");
    getProductSections();
  }, []);
  useEffect(() => {
    sectionCategories(sectionId);
  }, [sectionId, categoryId]);
  const getProductSections = () => {
    dispatch(loadSpinner());
    getSections()
      .then((data) => {
        console.log("sections", data?.data?.sectionData);
        setSectionList(data?.data?.sectionData);
      })
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => {
        dispatch(loadSpinner());
      });
  };

  const sectionCategories = async (sectionId) => {
    dispatch(loadSpinner());
    try {
      const response = await getSectionCategories(sectionId);
      console.log("sectionCategories", response?.data);
      setCategoryList(response?.data?.sectionData?.categories);
      const sectionCategories = response?.data?.sectionData?.categories;
      sectionCategories.find((category) => {
        if (category._id === categoryId) {
          console.log("subcategoryoes", category?.subCategories);
          setSubCategoryList(category?.subCategories);
        }
      });
      dispatch(loadSpinner());
    } catch (error) {
      console.log("error", error);
      dispatch(loadSpinner());
    }
  };
  const handleButtonClick = (button) => {
    setActiveButton(button);
  };
  const categoryModal = () => {
    // sectinGetCategories();
    sectionCategories(sectionId);
    setCategoryEditModal(!categoryEditModal);
  };
  const subCategoryModals = () => {
    getProductSections();
    setCurrentSubCategory({});
    sectionCategories(sectionId);
    setsubCategoryModal(!subCategoryModal);
  };
  return (
    <div className="bg-containerWhite h-full rounded-xl min-h-[600px] shadow-sm p-4">
      {categoryEditModal && (
        <CategoryModal
          callback={categoryModal}
          editData={currentCategory}
          sectionId={sectionId}
          role={"vendor"}
        />
      )}
      {subCategoryModal && (
        <SubcategoryModal
          callback={subCategoryModals}
          editData={currentSubCategory}
          categoryId={categoryId}
          role={"vendor"}
        />
      )}
      <div className="flex justify-between mt-2 w-full">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 pt-6">
          <div className="flex items-center gap-2">
            <select
              name="brand"
              className="p-3 rounded-lg outline-none bg-[rgba(244,245,250,1)] border-none w-full"
              id=""
              onChange={(e) => {
                setSectionId(e.target.value);
                //   handleSectionChange(e);
              }}
            >
              <option disabled selected value="">
                Section
              </option>
              {sectionList.length > 0 &&
                sectionList.map((section) => {
                  return (
                    <option key={section._id} value={section._id}>
                      {section?.name}
                    </option>
                  );
                })}
            </select>
          </div>
          {/* <div className="flex items-center gap-2">
          <select
              name="brand"
              className="p-3 rounded-lg outline-none bg-[rgba(244,245,250,1)] border-none w-full "
              id=""
              onChange={(e) => {
                setCategoryId(e.target.value);
              }}
            >
              <option disabled selected value="">
                Category
              </option>
              {categoryList.length > 0 &&
                categoryList.map((category) => {
                  return (
                    <option key={category._id} value={category._id}>
                      {category?.name}
                    </option>
                  );
                })}
            </select>
          </div> */}
          {/* <div className="flex items-center gap-2">
            <select
              name="brand"
              className="p-3 rounded-lg outline-none bg-[rgba(244,245,250,1)] border-none w-full"
              id=""
              onChange={(e) => {
               
                // setsubCategoryModal(true);
              }}
            >
              <option disabled selected value="">
               Sub Category
              </option>
              {subCategoryList?.length > 0 &&
                subCategoryList?.map((category) => {
                  console.log("category", category);
                  return (
                    <option key={category?._id} value={category?._id}>
                      {category?.name}
                    </option>
                  );
                })}
            </select>
            
          </div> */}
          {/* <button className="bg-navblue text-white px-4 py-2 rounded-lg">
            Add Brand
          </button> */}
        </div>
      </div>
      <div className="mt-6  overflow-y-auto">
        <div className="table-responsive p-3 w-full">
          <table className="table table-wrap mb-0 w-full border">
            <thead className="bg-gray-100 h-10 text-start">
              <tr>
                <th className="text-start px-4">Category</th>
                <th className="text-start px-4">Sub Category</th>
                <th className="text-start px-4">Brand</th>
              </tr>
            </thead>
            <tbody>
              {categoryList?.length > 0 ? (
                categoryList.map((category) => (
                  <tr className="border-b b border-gray-200">
                    <td className="text-sm py-3 capitalize border-r">
                      <div className="flex gap-2">
                        <p className="mt-2 ml-4">{category?.name}</p>
                        <button
                          onClick={() => {
                            console.log("category", category);
                            setCurrentCategory({
                              category: category?.name,
                              Id: category?._id,
                              image: category?.image,
                            });
                            setCategoryEditModal(true);
                          }}
                          className="w-9 h-9  hover:bg-slate-200 rounded-full"
                        >
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
                            e.stopPropagation(); // Prevent click from bubbling to the card div
                            Swal.fire({
                              title: "Are you sure?",
                              text: "Do you want to delete this category, If you delete this all the sub category and brands under this category will be deleted!",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Yes, delete it!",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                // If confirmed, perform the delete operation
                                // You can place your delete logic here
                                deleteCategory(category?._id, "vendor")
                                  .then((data) => {
                                    if (result.isConfirmed) {
                                    }
                                    setCategoryEditModal(false);
                                    Swal.fire(
                                      "Deleted!",
                                      "Your file has been deleted.",
                                      "success"
                                    );
                                    sectionCategories(sectionId);
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
                            className="ml-1.5"
                            width="23px"
                            height="23px"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z"></path>
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="text-sm py-3 border-r">
                      {category?.subCategories?.length > 0 ? (
                        <table className="w-full">
                          {category.subCategories.map((subCat) => (
                            <tr className="border-b">
                              <td className="py-3 capitalize px-4">
                                {subCat?.name}
                              </td>
                              <td className="text-sm py-3">
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => {
                                      console.log("subCat", subCat);
                                      setsubCategoryModal(true);
                                      setCurrentSubCategory({
                                        subCategory: subCat?.name,
                                        Id: subCat?._id,
                                        image: subCat?.image,
                                      });
                                    }}
                                    className="w-9 h-9 hover:bg-slate-200 rounded-full"
                                  >
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
                                    console.log("subCat", subCat);
                                    e.stopPropagation(); // Prevent click from bubbling to the card div
                                    Swal.fire({
                                      title: "Are you sure?",
                                      text: "Do you want to delete this sub category, If you delete this all the brands under this sub category will be deleted!",
                                      icon: "warning",
                                      showCancelButton: true,
                                      confirmButtonColor: "#3085d6",
                                      cancelButtonColor: "#d33",
                                      confirmButtonText: "Yes, delete it!",
                                    }).then((result) => {
                                      if (result.isConfirmed) {
                                        // If confirmed, perform the delete operation
                                        // You can place your delete logic here
                                        deleteSubCategory(subCat?._id,"vendor")
                                          .then((data) => {
                                            if (result.isConfirmed) {
                                            }
                                            setCategoryEditModal(false);
                                            Swal.fire(
                                              "Deleted!",
                                              "Your file has been deleted.",
                                              "success"
                                            );
                                            sectionCategories(sectionId);
                                          })
                                          .catch((err) => {
                                            toast.error(
                                              err.response.data.message
                                            );
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
                                  className="w-9 h-9 hover:bg-slate-200 rounded-full">
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
                          ))}
                        </table>
                      ) : (
                        <p className="text-red-600 font-medium px-4">
                          SubCategory Not Added
                        </p>
                      )}
                    </td>
                    <td className="text-sm py-3 border-r">
                      {category?.brands?.length > 0 ? (
                        <table className="w-full">
                          {category.brands.map((brand) => (
                            <tr className="border-b">
                              <td className="py-3 capitalize px-4">
                                {brand?.name}
                              </td>
                              {/* <td className="text-sm py-3">
                                <div className="flex gap-2">
                                  <button className="w-9 h-9 hover:bg-slate-200 rounded-full">
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
                                  <button className="w-9 h-9 hover:bg-slate-200 rounded-full">
                                    <svg
                                      fill="#FF0000"
                                      width="23px"
                                      height="23px"
                                      className="ml-1.5"
                                      viewBox="0 0 24 24"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z"></path>
                                    </svg>
                                  </button>
                                </div>
                              </td> */}
                            </tr>
                          ))}
                        </table>
                      ) : (
                        <p className="text-red-600 font-medium px-4">
                          Brand Not Added
                        </p>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-3">
                    No Categories Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SectionCategory;
