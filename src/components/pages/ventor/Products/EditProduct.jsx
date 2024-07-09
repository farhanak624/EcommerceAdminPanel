import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { editProduct, getProductDetails } from "../../../../Api/ApiCall";
import MultiSelectDropDown from "../../../customDropdown/MultiSelectDropDown";
import { uploadImageV2 } from "../../../imageUpload";
import { toast } from "react-toastify";

const EditProduct = () => {
  const location = useLocation();
  const { productDetails } = location.state || {};
  const [images, setImages] = useState("");
  const [product, setProduct] = useState();
  const [image, setImage] = useState();
  const [existingImages, setExistingImages] = useState(product?.images || []);
  const [newImageUrls, setNewImageUrls] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [LatestImages, setLatestImages] = useState([]);
  const [newErrors, setNewErrors] = useState({});
  const [formData, setFormData] = useState({
    productName: product?.productName || "",
    description: product?.description || "",
    images: product?.images || [],
    details: product?.details || [{ size: "", quantity: null, price: null }],
    offers: product?.offers,
    specifications: product?.specifications || [],
    countries: product?.available?.countries || [],
  });
  const naviagte = useNavigate();
  const rating =
    product?.ratings?.average > 0 && product?.ratings?.average.toFixed(1);

  useEffect(() => {
    productDetailed();
  }, []);

  const productDetailed = () => {
    console.log("productDetails", productDetails);
    getProductDetails(productDetails?._id)
      .then((res) => {
        console.log("res", res?.data?.product);
        setProduct(res?.data?.product);
      })
      .catch((err) => {
        console.log("err", err.response);
      });
  };
  useEffect(() => {
    setExistingImages(product?.images || []);
    setFormData({
      ...formData,
      productName: product?.productName || "",
      description: product?.description || "",
      details: product?.details || [{ size: "", quantity: null, price: null }],
      images: product?.images || [],
      offers: product?.offers || null,
      specifications: product?.specifications || [],
    });
  }, [product]);

  const handleDeleteExistingImage = (e, index) => {
    e.preventDefault();
    const updatedImages = [...existingImages];
    updatedImages.splice(index, 1);
    setExistingImages(updatedImages);
  };
  const handleDeleteNewImage = (index, e) => {
    e.preventDefault();
    const updatedImages = [...newImages];
    const updatedUrls = [...newImageUrls];
    updatedImages.splice(index, 1);
    updatedUrls.splice(index, 1);
    setNewImageUrls(updatedUrls);
    setNewImages(updatedImages);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      setImage(files[0]);
      // processVideoFile(files);
    }
  };
  const handleImageFileChange = (e) => {
    e.preventDefault();
    const files = e.target.files;
    console.log("files", files);
    setImage(files);

    if (files.length > 0) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setImages(url);
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
  const handleCountryChange = (selectedOptions) => {
    const countryISOs = selectedOptions.map((option) => option.value); // Extract ISO codes
    console.log(countryISOs);
    setFormData((prevState) => ({
      ...prevState,
      countries: countryISOs, // Set ISO codes in the countries array
    }));
  };
  const handleAddImage = (e) => {
    const files = e.target.files;
    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    const imageArray = Array.from(files).map((file) => file);
    setNewImages([...newImages, ...imageArray]);
    setNewImageUrls([...newImageUrls, ...urls]);
  };

  const handleAddDetail = () => {
    const hasSize = formData.details.some((detail) => "size" in detail);
    console.log({ hasSize });
    // If any detail has a size key, add the size field; otherwise, only add quantity and price
    const newDetail = hasSize
      ? { size: "", quantity: null, price: null }
      : { quantity: null, price: null };
    // Add size field only if not present in any existing detail
    // const newDetail = { size: "", quantity: null, price: null };

    console.log("adsd", newDetail);
    setFormData({
      ...formData,
      details: [...formData.details, newDetail],
    });
  };

  const handleRemoveDetail = (index) => {
    const newDetails = formData.details.filter((_, i) => i !== index);
    setFormData({ ...formData, details: newDetails });
  };

  const handleDetailChange = (index, field, value) => {
    const newValue =
      field === "quantity" || field === "price" ? Number(value) : value;
    const newDetails = formData.details.map((detail, i) =>
      i === index ? { ...detail, [field]: newValue } : detail
    );
    setFormData({ ...formData, details: newDetails });
  };
  const handleSpecificationChange = (specificationIndex, field, value) => {
    const newSpecifications = formData.specifications.map(
      (specification, i) => {
        if (i === specificationIndex) {
          return { ...specification, [field]: value };
        }
        return specification;
      }
    );
    setFormData({ ...formData, specifications: newSpecifications });
  };
  const addSpecification = () => {
    const newSpecification = { key: "", value: "" };
    setFormData({
      ...formData,
      specifications: [...formData.specifications, newSpecification],
    });
  };
  const removeSpecification = (specificationIndex) => {
    const newSpecifications = formData.specifications.filter(
      (_, i) => i !== specificationIndex
    );
    setFormData({ ...formData, specifications: newSpecifications });
  };

  const validateEditProduct = () => {
    let errors = {};

    // Validate productName
    if (!formData.productName.trim()) {
      errors.productName = "Product Name is required";
    }
    console.log(errors);

    // Validate description
    if (!formData.description.trim()) {
      errors.description = "Description is required";
    }
    console.log(errors);

    // Validate images

    console.log(errors);

    // Validate details
    if (formData.details.length === 0) {
      errors.details = "Please add at least one detail";
    }
    formData.details.forEach((detail, index) => {
      // Check if size key exists
      if (detail.hasOwnProperty("size")) {
        if (!detail.size.trim()) {
          errors[`detail${index + 1}`] = "Size is required";
        }
      } else {
        // If size key doesn't exist, validate price and quantity
        if (detail.quantity === null || detail.price === null) {
          errors[`detail${index + 1}`] = "Please fill in all details";
        }
      }
    });
    console.log(errors);

    // Validate specifications

    if (formData.specifications.length > 0) {
      formData.specifications.forEach((specification, index) => {
        if (!specification.key.trim() || !specification.value.trim()) {
          errors[`specification${index + 1}`] =
            "Please fill in all specifications";
        }
      });
    }
    console.log(errors);

    // Validate offers
    if (formData.offers < 0 || formData.offers > 100) {
      errors.offers = "Offer should be between 0 and 100";
    }
    console.log(errors);

    // Set errors state and return validation result
    console.log({ errors });
    setNewErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ newImages }, { existingImages });
    console.log("formData", formData);

    let uploadedImageUrls = [];
    if (newImages.length > 0) {
      uploadedImageUrls = await Promise.all(
        newImages.map(async (imageFile) => {
          try {
            const uploadedResponse = await uploadImageV2(imageFile);
            return uploadedResponse.images[0].imageUrl;
          } catch (error) {
            console.error("Failed to upload image:", error);
            return null; // Return null for failed uploads
          }
        })
      );
    }
    setFormData({
      ...formData,
      images: [
        ...existingImages,
        ...uploadedImageUrls.filter((url) => url !== null),
      ],
    });
    console.log({ uploadedImageUrls });
    if (!validateEditProduct()) {
      toast.error("Please fill in all required fields");
      console.log({ newErrors });
      return;
    }
    const wholeData = {
      productName: formData.productName,
      description: formData.description,
      offers: formData.offers,
      details: formData.details,
      specifications: formData.specifications,
      countries: formData.countries,
      images: [
        ...existingImages,
        ...uploadedImageUrls.filter((url) => url !== null),
      ], // Filter out null values
    };
    if (wholeData.images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }
    console.log("wholeData", wholeData);

    editProduct(wholeData, product?._id)
      .then((res) => {
        naviagte("/AllProducts");
        console.log("res", res.data);
        toast.success("Product updated successfully");
        productDetailed();
      })
      .catch((err) => {
        console.log("err", err.response);
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-5  shadow-md rounded-xl">
      <div className="h-26 justify-between bg-white rounded-lg mb-3 md:p-1">
        <div className="flex">
          <img
            className="w-32 h-32 md:w-24 md:h-24 rounded-lg p-1 mr-4"
            src={
              product?.images[0] ||
              "https://api.dev.test.image.theowpc.com/rNJIs53da.webp"
            }
            alt=""
          />
          <div className="flex w-full p-3 items-center justify-between">
            <div className="md:mr-4">
              <p className="font-semibold text-xl">{product?.productName}</p>
              <p>{product?.brandInfo?.name}</p>
            </div>
            <div>
              <div className="md:flex flex-col items-end">
                <div className="flex items-center mb-2">
                  {rating > 0 && (
                    <svg
                      className="fill-current text-yellow-500 w-4 h-4 md:w-5 md:h-5 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545-4.751-4.635 6.564-.954L10 0l2.942 6.561 6.564.954-4.751 4.635 1.123 6.545z" />
                    </svg>
                  )}
                  <p className="text-zinc-900 leading-none">{rating}</p>
                </div>

                <span className="text-zinc-900 font-bold text-md">
                  {product?.currency} {product?.discountPrice?.toFixed(0) || 0}
                </span>
                <span className="text-zinc-900 line-through text-md">
                  {product?.currency} {product?.price?.toFixed(0) || 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <form>
        <div className="grid mb-4">
          <div>
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              defaultValue={product?.productName}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  productName: e.target.value,
                });
              }}
              placeholder="Product Name"
              className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <p className="text-red-500">{newErrors.productName} </p>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            defaultValue={formData?.description}
            onChange={(e) => {
              setFormData({
                ...formData,
                description: e.target.value
                  ? e.target.value
                  : product?.description,
              });
            }}
            placeholder="Description"
            className="mt-1 block w-full px-3 py-2  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            rows="3"
          ></textarea>
        </div>
        <div className="grid mb-4">
          <div>
            <label
              htmlFor="offerPrice"
              className="block text-sm font-medium text-gray-700"
            >
              Offer
            </label>
            <input
              placeholder="Enter Offer %"
              type="number"
              defaultValue={formData?.offers}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  offers: e.target.value,
                });
              }}
              onKeyDown={(e) =>
                ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
              }
              id="offerPrice"
              className="mt-1 block w-full px-3 py-2  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        <div className="grid mb-4">
          <MultiSelectDropDown
            formData={formData}
            setformData={setFormData}
            existingCountries={product?.available?.countries}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Product Images
          </label>
          <div className="grid grid-cols-3 gap-4 mt-2">
            {existingImages.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Existing Image ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center focus:outline-none"
                  onClick={(e) => handleDeleteExistingImage(e, index)}
                >
                  &times;
                </button>
              </div>
            ))}
            {newImageUrls.length > 0
              ? newImageUrls.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`New Image ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center focus:outline-none"
                      onClick={(e) => handleDeleteNewImage(index, e)}
                    >
                      &times;
                    </button>
                  </div>
                ))
              : ""}
            <div
              className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer p-2"
              onDrop={handleImageleDrop}
              onDragOver={handleDrop}
            >
              <span className="flex justify-center">
                {images ? (
                  <img src={images ? images : ""} className="w-10" alt="" />
                ) : (
                  ""
                )}
              </span>
              <div className="flex ">
                <span className="flex justify-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAddImage}
                    style={{ display: "none" }}
                    id="fileInput1"
                  />
                  <button
                    className="mt-3  p-3 rounded-xl text-containerWhite"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("fileInput1").click();
                    }}
                  >
                    <div className="flex justify-center ">
                      <svg
                        width="26"
                        height="25"
                        className=""
                        viewBox="0 0 26 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.8 25V13.6H0.4V11.35H11.8V0H14.05V11.35H25.4V13.6H14.05V25H11.8Z"
                          fill="black"
                          fill-opacity="0.6"
                        />
                      </svg>
                    </div>
                    <span className="text-black flex items-center">
                      Add Image
                    </span>
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-7">
          <p className="text-md font-medium">Details</p>
        </div>
        {formData?.details
          ? formData?.details.map((detail, index) => (
              <div key={index} className="flex w-full items-center space-x-2">
                <div
                  className={`grid ${
                    detail?.size === "" || detail?.size
                      ? "grid-cols-3"
                      : "grid-cols-2"
                  } gap-2 w-auto`}
                >
                  {detail?.size === "" || detail?.size ? (
                    <div>
                      <div className="">
                        <h1 className="text-sm text-black">Size</h1>
                      </div>
                      <input
                        className="outline-none border-none w-full h-10 mt-7 p-3 rounded-lg"
                        type="text"
                        defaultValue={detail.size}
                        onChange={(e) =>
                          handleDetailChange(index, "size", e.target.value)
                        }
                        placeholder="Size"
                      />
                    </div>
                  ) : null}
                  <div>
                    <p className="text-sm text-black">Quantity</p>
                    <input
                      className="outline-none border-none w-full h-10 mt-7 p-3 rounded-lg"
                      type="number"
                      defaultValue={detail.quantity}
                      onKeyDown={(e) =>
                        ["e", "E", "+", "-"].includes(e.key) &&
                        e.preventDefault()
                      }
                      onChange={(e) =>
                        handleDetailChange(index, "quantity", e.target.value)
                      }
                      placeholder="Quantity"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-black">Price</p>
                    <input
                      className="outline-none border-none h-10 w-full mt-7 p-3 rounded-lg"
                      type="text"
                      defaultValue={detail.price}
                      onKeyDown={(e) =>
                        ["e", "E", "+", "-"].includes(e.key) &&
                        e.preventDefault()
                      }
                      onChange={(e) =>
                        handleDetailChange(index, "price", e.target.value)
                      }
                      placeholder="Price"
                    />
                  </div>
                </div>
                <div className="flex mt-11 mb-6 ml-auto">
                  <button
                    type="button"
                    className="flex items-center justify-center w-10 h-10 text-2xl  bg-navblue rounded-xl mt-7 text-white"
                    onClick={() => handleRemoveDetail(index)}
                  >
                    {/* Remove Detail */}-
                  </button>
                </div>
              </div>
            ))
          : ""}
        {/* { productDetails?.details.map((detail, index) => {})} */}
        <div className="flex justify-end">
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            onClick={handleAddDetail}
          >
            Add
          </button>
        </div>
        {formData?.specifications?.length > 0 ? (
          <div>
            <p className="text-md font-medium">Specifications</p>
          </div>
        ) : (
          ""
        )}
        {formData?.specifications?.length > 0
          ? formData?.specifications?.map(
              (specifiaction, specificationIndex) => {
                return (
                  <div
                    key={`specification-${specificationIndex}`}
                    className="flex gap-2 mb-3"
                  >
                    <div className="">
                      <input
                        type="text"
                        value={specifiaction.key}
                        onChange={(e) => {
                          handleSpecificationChange(
                            specificationIndex,
                            "key",
                            e.target.value
                          );
                        }}
                        className="outline-none border-none w-auto  h-11 mt-7 p-3 rounded-lg"
                        placeholder="specification"
                      />
                    </div>
                    <div className="">
                      <input
                        type="text"
                        onChange={(e) => {
                          handleSpecificationChange(
                            specificationIndex,
                            "value",
                            e.target.value
                          );
                        }}
                        value={specifiaction.value}
                        className="outline-none border-none w-auto
                  h-11 mt-7 p-3 rounded-lg"
                        placeholder="details"
                      />
                    </div>
                    <div className="flex items-center">
                      {formData.specifications.length > 1 && (
                        <button
                          className="flex items-center justify-center w-10 h-10 text-2xl  bg-navblue rounded-xl mt-7 text-white"
                          onClick={() =>
                            removeSpecification(specificationIndex)
                          }
                        >
                          -
                        </button>
                      )}
                    </div>
                  </div>
                );
              }
            )
          : ""}
        {formData?.specifications?.length > 0 ? (
          <div className="flex justify-end">
            <button
              type="button"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={addSpecification}
            >
              Add
            </button>
          </div>
        ) : (
          ""
        )}
        <button
          type="submit"
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Save Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
