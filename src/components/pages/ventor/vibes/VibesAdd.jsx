import React, { useEffect, useRef, useState } from "react";
import { CustomDropdown } from "../../../customDropdown/CustomDropdown";
import "react-circular-progressbar/dist/styles.css";
import {
  addVibes,
  allProducts,
  getSectionCategories,
  getSections,
  getvendorStorage,
} from "../../../../Api/ApiCall";
import { uploadImage, uploadImageV2 } from "../../../imageUpload";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CircularProgressbar } from "react-circular-progressbar";
import { loadSpinner } from "../../../../Redux/Features/NavbarSlice";
import { useDispatch } from "react-redux";

function VibesAdd() {
  const dispatch = useDispatch();
  const [videoLoad, setVideoLoad] = useState(false);
  const [options, setoptions] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [image, setImage] = useState();
  const [images, setImages] = useState("");
  const videoRef = useRef(null);
  const [sectionId, setSectionId] = useState("");
  const [sectionList, setSectionList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [productList, setProductList] = useState([]);
  const [formData, setFormData] = useState({
    productcategory: [],
  });
  const [thumbnailError, setThumbnailError] = useState("");
  const [videoError, setVideoError] = useState("");
  const [productError, setProductError] = useState("");
  const [storageError, setStorageError] = useState("");
  const [productIds, setProductIds] = useState([]);
  const [leftStorage, setLeftStorage] = useState();
  const [uploadPercentege, setuploadPercentege] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    getStorage();
    getSections().then((data) => {
      console.log("sections", data?.data?.sectionData);
      setSectionList(data?.data?.sectionData);
    });
    getAllProducts(sectionId, searchText);
  }, [sectionId, searchText]);
  const getAllProducts = (sectionId, search) => {
    allProducts(sectionId, search)
      .then((data) => {
        console.log("products", data?.data?.productData);
        setProductList(data?.data?.productData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getStorage = () => {
    getvendorStorage()
      .then((data) => {
        console.log("SUccess", data?.data.cloudDetails);
        setLeftStorage(data?.data?.cloudDetails);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  const handleDragOver = (e) => {
    e.preventDefault(); // Prevent default behavior (Prevent file from being opened)
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      setVideoFile(files[0]);
      // processVideoFile(files);
    }
  };
  const processVideoFile = (file) => {
    const url = URL.createObjectURL(file);
    videoRef.current.src = url;
    videoRef.current.load();
    console.log(url);
    console.log(videoRef);
  };

  const handleFileChange = (e) => {
    const files = e.target.files[0];

    console.log("files", files);
    setVideoFile(files);
    if (files && files[0]) {
      setVideoFile(files[0]);
      processVideoFile(files[0]);
    }
  };

  const handleImageleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      setImage(files[0]);
      console.log("asa", image);
    }
    if (files.length > 0) {
      const file = files[0];
      const url = URL.createObjectURL(file);

      setImages(url);
    }
  };

  const handleImageFileChange = (e) => {
    const files = e.target.files[0];
    console.log("files", files);
    setImage(files);

    if (e.target.files.length > 0) {
      const url = URL.createObjectURL(files);
      console.log(url, "???????????????//");
      setImages(url);
    }
  };
  const handlRemove = (index) => {
    const newProduct = [...formData?.productcategory];
    newProduct.splice(index, 1);
    setFormData({
      ...formData,
      productcategory: newProduct,
    });
  };

  const handleSubmit = async () => {
    dispatch(loadSpinner());
    setVideoLoad(true);
    console.log("formData", formData);
    const productArray = formData?.productcategory?.map((data) => {
      return data._id;
    });
    if (leftStorage <= 0) {
      setStorageError(
        "you have run out of storage. Please purchase more storage"
      );
      toast.error("you have run out of storage. Please purchase more storage");
      dispatch(loadSpinner());
      return;
    }
    const imageFileSizeMB = image ? image.size / (1024 * 1024) : 0;
    const videoFileSizeMB = videoFile ? videoFile.size / (1024 * 1024) : 0;
    const totalFileSizeMB = imageFileSizeMB + videoFileSizeMB;
    if (totalFileSizeMB > leftStorage) {
      toast.error(
        "File size exceeds remaining storage. Please upload a smaller file or purchase more storage."
      );
      dispatch(loadSpinner());
      navigate("/cloud");
      return;
    }
    if (!image) {
      dispatch(loadSpinner());
      toast.error("Please upload a thumbnail image.");
      setThumbnailError("Please upload a thumbnail image.");
      return;
    }
    setThumbnailError("");
    // Validation for video file
    if (!videoFile) {
      dispatch(loadSpinner());
      toast.error("Please upload a video file.");
      setVideoError("Please upload a video file.");
      return;
    }
    setVideoError("");
    // Validation for product array
    if (formData.productcategory.length === 0) {
      dispatch(loadSpinner());
      toast.error("Please select at least one product.");
      setProductError("Please select at least one product.");
      return;
    }
    setProductError("");
    console.log("upload", image, videoFile);
    let imageUrl;
    let videoUrl;
    try {
      const onUploadProgress = (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setuploadPercentege(percentCompleted);
        console.log(`Upload progress: ${percentCompleted}%`);
      };

      const videoResponse = await uploadImageV2(videoFile, onUploadProgress);

      videoUrl = videoResponse?.images[0]?.imageUrl;
    } catch (error) {
      setVideoLoad(false);
      dispatch(loadSpinner());
      if (
        error?.response?.data?.errors ===
        "File size too large. Maximum is 10MB."
      ) {
        toast("video " + error?.response?.data?.errors);
      } else {
        toast("something wrong");
      }
    }
    try {
      const imageResponse = await uploadImageV2(image);
      imageUrl = imageResponse?.images[0]?.imageUrl;
    } catch (error) {
      setVideoLoad(false);
      if (
        error?.response?.data?.errors ===
        "File size too large. Maximum is 10MB."
      ) {
        toast("image ", error?.response?.data?.errors);
        return;
      } else {
        toast("something wrong");
        return;
      }
    }
    if (!videoUrl) {
      return;
    } else {
      setVideoLoad(false);
    }
    console.log("videoUrl", videoUrl, imageUrl);
    const wholeData = {
      products: productArray,
      imageUrl: imageUrl,
      videoUrl: videoUrl,
      storage: videoFileSizeMB,
    };
    addVibes(wholeData)
      .then((data) => {
        console.log("success", data);
        toast("Vibe video added Successfully");
        setVideoLoad(false);
        setoptions([]);
        setVideoFile(null);
        setImage(null);
        setImages("");
        setSectionId("");
        setSectionList([]);
        setSearchText("");
        setProductList([]);
        setFormData({ productcategory: [] });
        setuploadPercentege(0);
      })
      .catch((err) => {
        console.log(err.response.data);
      }).finally(() => {
        dispatch(loadSpinner());
      });
  
    setProductError("");
    setVideoError("");
    setThumbnailError("");
  };
  return (
    <div className="bg-containerWhite rounded-xl w-full flex justify-center  p-5">
      <div className="max-w-[100%] lg:max-w-[70%]">
        <h1 className="text-center font-semibold text-4xl mt-2">Add Vibes</h1>
        <p className="text-center text-xs text-primary-200 mt-2">
          Add your vibes video here
        </p>
        {/* {thumbnailError && <p className="text-red-500">{thumbnailError}</p>}
        {videoError && <p className="text-red-500">{videoError}</p>}
        {productError && <p className="text-red-500">{productError}</p>}
        {storageError && <p className="text-red-500">{storageError}</p>} */}

        <section className="mt-4">
          <div className="w-full">
            <select
              className="w-full pt-3 border-none bg-[rgba(244,245,250,1)] p-1 rounded-xl outline-none"
              onChange={(e) => {
                setSectionId(e.target.value);
              }}
              name=""
              id=""
            >
              <option className="w-auto" value="">
                Select section
              </option>
              {sectionList.length > 0 &&
                sectionList.map((section) => {
                  return <option value={section._id}> {section?.name}</option>;
                })}
            </select>
            <CustomDropdown
              productData={productList}
              setSearchText={setSearchText}
              setFormData={setFormData}
              formData={formData}
              options={options}
              text={"Search product"}
            />
          </div>
        </section>
        <section className="2 mt-5">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <p className="text-xl font-bold">Upload Your new Videos</p>
              <div
                className="mt-4 rounded-xl p-4 border-2 border-black flex justify-center  border-dashed"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <div>
                  <span className="flex justify-center">
                    {videoLoad ? (
                      <CircularProgressbar
                        styles={{
                          root: {
                            width: "70px",
                            height: "80px",
                            fontSize: "bold",
                          },
                          text: {
                            fontSize: "30px",
                            textAlign: "center",
                            fontWeight: "bold",
                          }, // Set the desired width and height
                        }}
                        value={uploadPercentege}
                        text={uploadPercentege}
                      />
                    ) : videoFile ? (
                      <video ref={videoRef} className="w-36 h-20">
                        <source
                          src={URL.createObjectURL(videoFile)}
                          type={videoFile.type}
                        />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img src="/videopng.png" className="w-16" alt="" />
                    )}
                  </span>
                  <p className="font-bold mt-3 text-center">
                    { videoFile ? videoFile.name : "Drop video file"}
                  </p>
                  <span className="flex justify-center">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                      id="fileInput"
                    />
                    <button
                      className="mt-3 bg-navblue p-3 rounded-xl text-containerWhite"
                      onClick={() =>
                        document.getElementById("fileInput").click()
                      }
                    >
                      Browse
                    </button>
                  </span>
                </div>
              </div>
              {/* 

              <div class="w-full bg-gray-200 rounded-full mt-3 h-2.5 dark:bg-gray-700">
                <div
                  class="bg-blue-600 h-3 rounded-full"
                  style={{ width: 45 }}
                ></div>
              </div> */}
            </div>
            {/* image */}
            <div>
              <p className="text-xl font-bold">Upload Your Thumbnail</p>
              <div
                className="mt-4 rounded-xl p-4 border-2 border-black flex justify-center  border-dashed"
                onDragOver={handleDragOver}
                onDrop={handleImageleDrop}
              >
                <div>
                  <span className="flex justify-center">
                    <img
                      src={images ? images : "/addimg.png"}
                      className="w-20"
                      alt=""
                    />
                  </span>
                  <p className="font-bold mt-3 text-center">
                    {images ? image.name : "Drop image file"}
                  </p>
                  <span className="flex justify-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      style={{ display: "none" }}
                      id="fileInput1"
                    />
                    <button
                      className="mt-3 bg-navblue p-3 rounded-xl text-containerWhite"
                      onClick={() =>
                        document.getElementById("fileInput1").click()
                      }
                    >
                      Browse
                    </button>
                  </span>
                </div>
              </div>
            </div>
            {/* image */}
          </div>
        </section>
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-16">
            {formData?.productcategory[0] &&
              formData?.productcategory.map((data, index) => {
                return (
                  <div
                    key={index}
                    className="bg-gray-300 p-1 h-[200px] rounded-lg relative"
                  >
                    <div className="w-full rounded-t-lg overflow-hidden h-[80%]">
                      <img
                        src={data.images[0]}
                        className="bg-cover w-full h-full "
                        alt=""
                      />
                      <button
                        onClick={() => handlRemove(index)}
                        className="w-4 h-4 rounded-full bg-slate-400 justify-center absolute right-2 top-2 flex items-center"
                      >
                        x
                      </button>
                    </div>
                    <div className="w-[100%] text-center ">
                      <h1 className="text-xs">{data?.productName}</h1>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => {
                handleSubmit();
              }}
              className="mt-3 bg-navblue p-3 rounded-xl text-containerWhite"
            >
              Add Video
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default VibesAdd;
