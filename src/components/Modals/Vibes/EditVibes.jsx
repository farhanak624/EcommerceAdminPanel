import React, { useEffect, useRef, useState } from "react";
import {
  addVibes,
  allProducts,
  editVibes,
  getSections,
  getvendorStorage,
} from "../../../Api/ApiCall";
import { useNavigate } from "react-router-dom";
import { CustomDropdown } from "../../customDropdown/CustomDropdown";
import { CustomEditDropdown } from "../../customDropdown/CustomEditDropDown";
import { uploadImageV2 } from "../../imageUpload";
import { toast } from "react-toastify";
import { CircularProgressbar } from "react-circular-progressbar";

const EditVibes = ({ alldata, productData, cardData, cloasModal }) => {
  console.log("fgfgsf sdf ", productData);
  let image1;
  const [options, setoptions] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [videoFile1, setVideoFile1] = useState(null);
  const [videoFile2, setVideoFile2] = useState(null);
  const [image, setImage] = useState();
  const [images, setImages] = useState("");
  const videoRef = useRef(null);
  const [sectionId, setSectionId] = useState("");
  const [sectionList, setSectionList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [productList, setProductList] = useState([]);
  const [uploadImageUrl, setUploadImageUrl] = useState();
  const [uploadVideoUrl, setUploadVideoUrl] = useState();
  const [formData, setFormData] = useState({
    productcategory: [],
  });
  const [videoLoad, setVideoLoad] = useState(false);
  const [thumbnailError, setThumbnailError] = useState("");
  const [videoError, setVideoError] = useState("");
  const [productError, setProductError] = useState("");
  const [storageError, setStorageError] = useState("");
  const [productIds, setProductIds] = useState([]);
  const [leftStorage, setLeftStorage] = useState();
  const [removedProducts, setRemovedProducts] = useState([]);
  const [uploadPercentege, setuploadPercentege] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const existingProducts = productData;
    setFormData({
      ...formData,
      productcategory: existingProducts,
    });
    // console.log(cardData?.videoUrl, "))))))))))))))))))))0");
    // setImages(cardData?.imageUrl);
    // setVideoFile1(cardData?.videoUrl);
  }, [productData]);
  useEffect(() => {}, [videoFile2]);
  useEffect(() => {
    getStorage();
    getSections().then((data) => {
      //   console.log("sections", data?.data?.sectionData);
      setSectionList(data?.data?.sectionData);
    });
    getAllProducts(sectionId, searchText);
  }, [sectionId, searchText]);
  const getAllProducts = (sectionId, search) => {
    allProducts(sectionId, search)
      .then((data) => {
        // console.log("products", data?.data?.productData);
        setProductList(data?.data?.productData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getStorage = () => {
    getvendorStorage()
      .then((data) => {
        // console.log("SUccess", data?.data.cloudDetails);
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
    setVideoFile1("");
    e.preventDefault();
    const files = e.dataTransfer.files;
    const url = URL.createObjectURL(files);
    setVideoFile1(url);
    if (files && files[0]) {
      setVideoFile(files[0]);

      // processVideoFile(files);
    }
  };
  const processVideoFile = (file) => {
    videoRef.current.src = url;
    videoRef.current.load();
    console.log(url);
    console.log(videoRef);
  };
  let url;
  const handleFileChange = (e) => {
    setVideoFile1("");
    const files = e.target.files[0];

    setVideoFile2(files);
    console.log(files);
    console.log(videoFile2); // Update videoFile1 with the new URL
    setVideoFile(files); // Update videoFile with the new file

    if (files && files[0]) {
      processVideoFile(files[0]); // Process the new video file
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
    const url = URL.createObjectURL(files);
    setImages(url);
    console.log("files", files);
    setImage(files);
  };
  const handlRemove = (data, index) => {
    const newProduct = [...formData?.productcategory];
    const removedItem = newProduct.splice(index, 1)[0]; // Splice and retrieve the removed item
    console.log("Removed item:", removedItem);
    const updatedRemovedProducts = [...removedProducts, removedItem]; // Store removed item in an array
    setRemovedProducts(updatedRemovedProducts); // Set the updated removed products array in state
    console.log("newProduct", newProduct);
    setFormData({
      ...formData,
      productcategory: newProduct,
    });
  };

  const handleSubmit = async () => {
    setVideoLoad(true);
    console.log("formData", formData);
    console.log("cardData", cardData);

    const productArray = formData?.productcategory?.map((data) => {
      return data.productId ? data?.productId : data?._id;
    });
    console.log("productArray", productArray);
    if (leftStorage <= 0) {
      setStorageError(
        "you have run out of storage. Please purchase more storage"
      );
      return;
    }
    const imageFileSizeMB = image ? image.size / (1024 * 1024) : 0;
    const videoFileSizeMB = videoFile ? videoFile.size / (1024 * 1024) : 0;
    const totalFileSizeMB = imageFileSizeMB + videoFileSizeMB;
    if (totalFileSizeMB > leftStorage) {
      toast(
        "File size exceeds remaining storage. Please upload a smaller file or purchase more storage."
      );
      setVideoLoad(false);
      navigate("/cloud");
      return;
    }
    // if (!image) {
    //   setThumbnailError("Please upload a thumbnail image.");
    //   return;
    // }
    // setThumbnailError("");
    // // Validation for video file
    // if (!videoFile) {
    //   setVideoError("Please upload a video file.");
    //   return;
    // }
    setVideoError("");
    // Validation for product array
    if (formData.productcategory.length === 0) {
      setProductError("Please select at least one product.");
      setVideoLoad(false);
      return;
    }
    setProductError("");
    console.log("upload", image, videoFile);
    let imageUrl;
    let videoUrl;
    if (image) {
      try {
        const imageResponse = await uploadImageV2(image);
        imageUrl = imageResponse?.images[0]?.imageUrl;
        setUploadImageUrl(imageUrl);
      } catch (error) {
        console.log(error);
        toast("something wrong");
      }
    }
    if (videoFile) {
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
        setUploadVideoUrl(videoUrl);
      } catch (error) {
        console.log(error);
        toast("something wrong");
      }
    }

    const wholeData = {
      id: cardData?._id,
      products: productArray,
      imageUrl: imageUrl,
      videoUrl: videoUrl,
    };

    editVibes(wholeData)
      .then((data) => {
        console.log("success", data);
        setVideoLoad(false);
        alldata();
        toast("Vibe video Edited Successfully");

        cloasModal(false);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
    setProductError("");
    setVideoError("");
    setThumbnailError("");
  };
  return (
    <div className="fixed z-30 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className="inline-block align-bottom bg-white mb-5 rounded-lg text-left overflow-hidden shadow-xl transform transition-all p-2"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="flex justify-end p-5">
            <p
              className="p-2 bg-slate-100 rounded-full cursor-pointer"
              onClick={() => cloasModal(false)}
            >
              X
            </p>
          </div>
          <div className="flex justify-center">
            <div className="max-w-[100%] lg:max-w-[60%]">
              <h1 className="text-center font-bold text-4xl mt-2">
                Edit vibes video
              </h1>
              <p className="text-center text-xs text-primary-200 mt-2">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s,
              </p>
              {thumbnailError && (
                <p className="text-red-500">{thumbnailError}</p>
              )}
              {videoError && <p className="text-red-500">{videoError}</p>}
              {productError && <p className="text-red-500">{productError}</p>}
              <section>
                <div className="w-full">
                  <select
                    className="w-full mt-4 outline-none p-2"
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
                        return (
                          <option value={section._id}> {section?.name}</option>
                        );
                      })}
                  </select>
                  <CustomEditDropdown
                    productList={productList}
                    removedProducts={removedProducts}
                    existingProduct={productData}
                    setSearchText={setSearchText}
                    setFormData={setFormData}
                    formData={formData}
                    options={options}
                    text={"search product"}
                  />
                </div>
              </section>
              <section className="2 mt-5">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <div>
                    <p className="text-xl font-bold">Edit Your Videos</p>
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
                          ) : videoFile2 ? (
                            <video className="w-20 h-20">
                              <source
                                src={
                                  videoFile2
                                    ? URL.createObjectURL(videoFile2)
                                    : ""
                                }
                                type="video/mp4"
                              />
                              Your browser does not support the video tag.
                            </video>
                          ) : (
                            <img
                              src="/videopng.png"
                              className="w-20 h-20"
                              alt=""
                            />
                          )}
                        </span>
                        <p className="font-bold mt-3 text-center"></p>
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
                    <p className="text-xl font-bold">Edit Your Thumbnail</p>
                    <div
                      className="mt-4 rounded-xl p-4 border-2 border-black flex justify-center  border-dashed"
                      onDragOver={handleDragOver}
                      onDrop={handleImageleDrop}
                    >
                      <div>
                        <span className="flex justify-center">
                          <img
                            src={images ? images : "/addimg.png"}
                            className="w-20 h-20"
                            alt=""
                          />
                        </span>
                        <p className="font-bold mt-3 text-center"></p>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-16">
                  {formData?.productcategory[0] &&
                    formData?.productcategory.map((data, index) => {
                      return (
                        <div
                          key={index}
                          className="bg-gray-300 p-1 h-[200px] rounded-lg relative"
                        >
                          <div className="w-auto rounded-t-lg overflow-hidden h-[80%]">
                            <img
                              src={data?.images[0]}
                              className="object-fit w-full h-full"
                              alt=""
                            />
                            <button
                              onClick={() => handlRemove(data, index)}
                              className="w-4 h-4 rounded-full bg-slate-400 justify-center absolute right-2 top-2 flex items-center"
                            >
                              x
                            </button>
                          </div>
                          <div className="w-[100%] text-center text-xs ">
                            <h1>{data?.productName}</h1>
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
                    Update Video
                  </button>
                </div>
              </section>
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              //   onClick={onClose}
              type="button"
              className="w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-navyblue text-white font-medium hover:bg-navyblue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navyblue sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditVibes;
