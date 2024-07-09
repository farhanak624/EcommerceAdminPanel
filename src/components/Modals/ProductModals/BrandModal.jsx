import React, { useState } from "react";
import { uploadImage, uploadImageV2 } from "../../imageUpload";
import { addBrand } from "../../../Api/ApiCall";
import { toast } from "react-toastify";

const BrandModal = ({ callback, categoryId,editData }) => {
  const [brandName, setBrandName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();
  const handleImage = async (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };
  console.log("editData", editData);
  const handleSubmit = async () => {
    if(editData){
      let imageUrl ;
      if(image){
        const uploadResponse = await uploadImageV2(image);
        imageUrl = uploadResponse?.images[0]?.imageUrl;
      }
    const wholeData = {
      name: brandName,
      imageUrl: imageUrl ? imageUrl : editData?.image,
      description: description,
    };
    console.log("wholeData", wholeData);
    try {
      const response = await addBrand(wholeData);
      console.log("addedBrand", response);
      toast.success("Brand Added Successfully");
      callback();
    } catch (error) {
      console.log("error", error.response.data);
    }
    }else{
    const response = await uploadImageV2(image);
    const imageUrl = response.images[0].imageUrl;
    const wholeData = {
      categoryId: categoryId,
      name: brandName,
      imageUrl: imageUrl,
      description: description,
    };
    console.log("wholeData", wholeData);
    try {
      const response = await addBrand(wholeData);
      console.log("addedBrand", response);
      toast.success("Brand Added Successfully");
      callback();
    } catch (error) {
      console.log("error", error.response.data);
    }
  }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-32 mx-auto border w-[30rem] shadow-lg rounded-xl bg-white">
        <div className="text-center">
          <h3 className="text-lg text-start font-medium rounded-xl border shadow text-gray-900 p-4">
            Brand Name
          </h3>

          {/* Flex container for input and file input */}
          <div className="flex items-center justify-between px-7 py-6 space-x-3">
            <input
              type="text"
              placeholder="Add Brand Name"
              onChange={(e) => {
                setBrandName(e.target.value);
              }}
              className="px-3 py-2 border shadow-sm rounded-lg bg-bodycolur text-gray-700 focus:outline-none focus:border-blue-500 flex-1"
            />
            <input
              type="file"
              onChange={(e) => {
                handleImage(e);
              }}
              className="p-2 bg-bodycolur rounded-lg flex-initial shadow h-10  file:text-stone-700 file:bg-stone-50 file:rounded-lg file:mr-5  file:px-1 file:border-[1px] file:font-semibold"
            />
          </div>

          {/* Description Box */}
          <div className="px-7 py-3">
            <textarea
              placeholder="Description"
              className="px-3 py-2 border shadow-sm rounded-lg bg-bodycolur text-gray-700 focus:outline-none focus:border-blue-500 w-full"
              rows="3"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
          </div>

          <div className="items-center px-4 py-3">
            <button
              type="button"
              onClick={() => {
                handleSubmit();
              }}
              id="ok-btn"
              className="px-4 py-2 bg-navblue text-white text-base font-medium rounded-xl shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Submit
            </button>
          </div>

          {/* Close Button */}
          <div className="absolute top-0 right-0 p-4">
            <button
              onClick={callback}
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

export default BrandModal;
