import React, { useEffect, useState } from "react";
import { uploadImageV2 } from "../../imageUpload";
import { addSubCategory, editSubCategory } from "../../../Api/ApiCall";
import { toast } from "react-toastify";

const SubcategoryModal = ({ callback, categoryId, editData,role }) => {
  const [categoryName, setCategoryName] = useState("");
  const [cateImage, setCateImage] = useState();
  const [previewImage, setPreviewImage] = useState(null);
  useEffect(() => {
    if (Object.keys(editData).length > 0) {
      setCategoryName(editData?.category);
      setPreviewImage(editData?.image);
    }
  }, [editData]);
  console.log("editData", editData);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(Object.keys(editData).length > 0){
      let imageUrl ; 
      if(cateImage){
        const uploadResponse = await uploadImageV2(cateImage);
        imageUrl = uploadResponse?.images[0]?.imageUrl;
      }
      const wholeData = {
        name: categoryName,
        image: imageUrl ? imageUrl : editData?.image,
      };
      console.log("wholeData", wholeData);
      editSubCategory(editData?.Id,wholeData,role)
        .then((data) => {
          console.log("success", data);
          callback();
          toast.success("Subcategory updated Successfully");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong");
        });
    }else{
      if(!categoryId){
        toast.error("Please select a category");
        return;
      }
      if(!categoryName || !cateImage){
        toast.error("Please fill all the fields");
        return;
      }
      const uploadResponse = await uploadImageV2(cateImage);
      const imageUrl = uploadResponse.images[0].imageUrl;  
      const wholeData = {
      name: categoryName,
      image: imageUrl,
      categoryId: categoryId,
    };
    console.log("wholeData", wholeData);
    addSubCategory(wholeData,role)
      .then((data) => {
        console.log("success", data);
        callback();
        toast.success("Subcategory Added Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };
  return (
    <div className="fixed inset-0 z-10 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-56  mx-auto border w-[30rem] shadow-lg rounded-md bg-white">
        <div className="text-center">
          <h3 className="text-lg text-start font-medium rounded-xl border shadow text-gray-900 p-4">
            {Object.keys(editData).length > 0 ? "Edit Sub Category" : "Add Sub Category"}
          </h3>
          <div className="flex items-center justify-between px-7 py-6 space-x-3 w-full">
            <input
              type="text"
              defaultValue={editData ? editData?.subCategory : categoryName}
              placeholder="Sub Category Name"
              onChange={(e) => setCategoryName(e.target.value)}
              className="px-3 py-2 border shadow shadow-black/20 rounded-lg bg-bodycolur text-gray-700 focus:outline-none focus:border-blue-500 w-1/2"
            />
            <input
              type="file"
              onChange={(e) => {
                setCateImage(e.target.files[0]);
              }}
              className="w-1/2 file:rounded-lg  bg-bodycolur py-2 rounded-lg px-2"
            />
          </div>
          {previewImage ? (
              <div className="px-7 py-3 flex justify-center">
                <img src={previewImage} alt="Current Category" className="w-12 h-auto rounded-lg" />
              </div>
            )
          :(null)
          }
          <div className="items-center px-4 py-3">
            <button
              type="button"
              onClick={(e) => {
                handleSubmit(e);
                callback();
              }}
              id="ok-btn"
              className="px-4 py-2 bg-navblue text-white text-base font-medium rounded-xl shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Submit
            </button>
          </div>
          <div className="absolute top-0 right-0 p-4">
            <button
              onClick={() => {
                callback();
              }}
              className="text-gray-400 hover:text-gray-900"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubcategoryModal;
