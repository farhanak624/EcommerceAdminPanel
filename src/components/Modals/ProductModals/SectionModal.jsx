import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { uploadImageV2 } from "../../imageUpload";
import { useDispatch } from "react-redux";
import { loadSpinner } from "../../../Redux/Features/NavbarSlice";
import { addSection, editSection } from "../../../Api/ApiCall";

const SectionModal = ({ callback, editData }) => {
  const dispatch = useDispatch();
  const [sectionName, setSectionName] = useState("");
  const [sectionImage, setSectionImage] = useState();
  const [previewImage, setPreviewImage] = useState(null);
  console.log("editData", editData);
  useEffect(() => {
    if (editData) {
      // setCategoryName(editData?.category);
      setPreviewImage(editData?.image);
    }
  }, [editData]);
  const handleSubmit = async () => {
    dispatch(loadSpinner());
    
    if (editData) {
      let imageUrl;
      if (sectionImage) {
        const uploadResponse = await uploadImageV2(sectionImage);
        imageUrl = uploadResponse?.images[0]?.imageUrl;
      }
      const wholeData = {
        name: sectionName ? sectionName : editData?.name,
        image: imageUrl ? imageUrl : editData?.image,
      };
      try {
        const response = await editSection(editData?.Id,wholeData);
        console.log("the response", response);
        if (response.status === 200) {
          dispatch(loadSpinner());
          toast.success("Section added successfully");
          callback();
        }
      } catch (error) {
        dispatch(loadSpinner());
        console.log(error?.response?.data?.message);
        toast.error("Something went wrong");
      }
    } else {
      if (!sectionName || !sectionImage) {
        toast.error("Please fill all the fields");
        dispatch(loadSpinner());
        return;
      }
      const imageResponse = await uploadImageV2(sectionImage);

      const wholeData = {
        name: sectionName,
        image: imageResponse.images[0].imageUrl,
      };
      try {
        const response = await addSection(wholeData);
        console.log("the response", response);
        if (response.status === 200) {
          dispatch(loadSpinner());
          toast.success("Section added successfully");
          callback();
        }
      } catch (error) {
        dispatch(loadSpinner());
        console.log(error?.response?.data?.message);
      }
    }
  };
  return (
    <div className="fixed inset-0 z-10 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-56  mx-auto border w-[30rem] shadow-lg rounded-md bg-white">
        <div className="text-center">
          <h3 className="text-lg text-start font-medium rounded-xl border shadow text-gray-900 p-4">
            Add Section
          </h3>
          <div className="flex items-center justify-between px-7 py-6 space-x-3">
            <input
              type="text"
              defaultValue={editData ? editData?.name : sectionName}
              onChange={(e) => {
                setSectionName(e.target.value);
              }}
              placeholder="Section name"
              className="px-3 py-2 border shadow shadow-black/20 rounded-lg bg-bodycolur text-gray-700 focus:outline-none focus:border-blue-500 w-full "
            />
            <input
              type="file"
              onChange={(e) => {
                setSectionImage(e.target.files[0]);
              }}
              className="w-auto file:text-stone-700 file:bg-stone-50 file:rounded-lg file:mr-5  file:px-1 file:border-[1px] file:font-semibold  
            "
            />
          </div>
          {previewImage ? (
            <div className="flex justify-center items-center">
              <img
                src={previewImage}
                alt="Current Category"
                className="w-12 h-auto rounded-lg"
              />
            </div>
          ) : null}
          <div className="items-center px-4 py-3">
            <button
              type="button"
              onClick={(e) => {
                handleSubmit(e);
              }}
              id="ok-btn"
              className="px-4 py-2 bg-navblue text-white text-base font-medium rounded-xl shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Submit
            </button>
          </div>
          <div className="absolute top-0 right-0 p-4">
            <button
              type="button"
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

export default SectionModal;
