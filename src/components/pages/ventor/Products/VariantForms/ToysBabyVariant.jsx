import React, { useState } from "react";

const ToysBabyVariant = ({ formData, setformData, errors }) => {
  const [Color, setColor] = useState("");
  const [imageName, setImageName] = useState();

  const [variants, setVariants] = useState([
    // {
    //   color: "",
    //   img: "",
    //   details: [{ size: "", quantity: "", currency: "", price: "" }],
    // },
  ]);

  const handleVariantChange = (index, field, e) => {
    setColor(e.target.value);
    const updatedVariants = formData.variants.map((variant, variantIndex) => {
      if (index === variantIndex) {
        return { ...variant, [field]: e.target.value };
      }
      return variant;
    });
    setformData({ ...formData, variants: updatedVariants });
  };
  const addVariant = () => {
    const newVariant = {
      // color: "",
      images: [],
      details: [{ quantity: "", price: "", offerPrice: "" }],
      variantName: "",
      offerPrice: "",
    };
    setformData({ ...formData, variants: [...formData.variants, newVariant] });
  };
  const removeVariant = (index) => {
    const filteredVariants = formData.variants.filter(
      (_, variantIndex) => index !== variantIndex
    );
    setformData({ ...formData, variants: filteredVariants });
  };

  const handleDetailChange = (variantIndex, detailIndex, field, value) => {
    const updatedVariants = formData.variants.map((variant, vIndex) => {
      if (vIndex === variantIndex) {
        const updatedDetails = variant.details.map((detail, dIndex) => {
          if (dIndex === detailIndex) {
            return { ...detail, [field]: value };
          }
          return detail;
        });
        return { ...variant, details: updatedDetails };
      }
      return variant;
    });
    setformData({ ...formData, variants: updatedVariants });
  };

  const addDetail = (variantIndex) => {
    const updatedVariants = formData.variants.map((variant, vIndex) => {
      console.log(variant);
      if (vIndex === variantIndex) {
        const newDetail = { size: "", quantity: "", price: "" };
        return { ...variant, details: [...variant.details, newDetail] };
      }
      return variant;
    });
    setformData({ ...formData, variants: updatedVariants });
  };

  // Function to remove a detail from a specific variant
  const removeDetail = (variantIndex, detailIndex) => {
    const updatedVariants = formData.variants.map((variant, vIndex) => {
      if (vIndex === variantIndex) {
        const filteredDetails = variant.details.filter(
          (_, dIndex) => dIndex !== detailIndex
        );
        return { ...variant, details: filteredDetails };
      }
      return variant;
    });
    setformData({ ...formData, variants: updatedVariants });
  };
  const handleAddImage = (variantIndex, image) => {
    const updatedVariants = formData.variants.map((variant, vIndex) => {
      if (vIndex === variantIndex) {
        return { ...variant, images: [...variant.images, image] };
      }
      return variant;
    });
    setformData({ ...formData, variants: updatedVariants });
  };

  const handleUpdateImage = (variantIndex, imageIndex, e) => {
    const updatedVariants = formData.variants.map((variant, vIndex) => {
      if (vIndex === variantIndex) {
        const updatedImages = [...variant.images];
        updatedImages[imageIndex] = {
          [e.target.name]: e.target.files[0],
        };
        // setColor("")
        return { ...variant, images: updatedImages };
      }
      return variant;
    });
    setformData({ ...formData, variants: updatedVariants });
  };

  // Function to handle removing an image from a variant
  const handleRemoveImage = (variantIndex, imageIndex) => {
    const updatedVariants = formData.variants.map((variant, vIndex) => {
      if (vIndex === variantIndex) {
        const filteredImages = variant.images.filter(
          (_, iIndex) => iIndex !== imageIndex
        );
        return { ...variant, images: filteredImages };
      }
      return variant;
    });
    setformData({ ...formData, variants: updatedVariants });
  };

  return (
    <>
      <div className="flex justify-between mt-3">
        <p className="font-semibold"> Add Variant</p>
        <button
          className="p-2 rounded-lg text-black border mb-3 border-gray-800 text-sm bg-bodycolur flex items-center"
          type="button"
          onClick={() => {
            addVariant();
          }}
        >
          <p className="mr-3">Add Variants</p>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 0C3.58185 0 0 3.58185 0 8C0 12.4182 3.58185 16 8 16C12.4182 16 16 12.4182 16 8C16 3.58185 12.4182 0 8 0ZM8 15.3846C3.92154 15.3846 0.615385 12.0785 0.615385 8C0.615385 3.92154 3.92154 0.615385 8 0.615385C12.0785 0.615385 15.3846 3.92154 15.3846 8C15.3846 12.0785 12.0785 15.3846 8 15.3846Z"
              fill="black"
            />
            <path
              d="M13.0811 7.69359H8.3119V2.92435C8.3119 2.83943 8.24298 2.77051 8.15805 2.77051H7.85036C7.76544 2.77051 7.69652 2.83943 7.69652 2.92435V7.69359H2.92728C2.84236 7.69359 2.77344 7.76251 2.77344 7.84743V8.15512C2.77344 8.24005 2.84236 8.30897 2.92728 8.30897H7.69652V13.0782C7.69652 13.1628 7.76544 13.232 7.85036 13.232H8.15805C8.24298 13.232 8.3119 13.1628 8.3119 13.0782V8.30897H13.0811C13.1657 8.30897 13.235 8.24005 13.235 8.15512V7.84743C13.235 7.76251 13.1657 7.69359 13.0811 7.69359Z"
              fill="black"
            />
          </svg>
        </button>
      </div>
      <div className="w-auto">
        {formData.variants.map((variant, variantIndex) => (
          <div key={variantIndex}>
            {errors[`variant_${variantIndex}_images`] && (
              <p className="text-red-500">
                {errors[`variant_${variantIndex}_images`]}
              </p>
            )}
            <div className="flex">
              <input
                type="text"
                className="shadow appearance-none text-black border rounded w-auto py-2 px-3 bg-bodycolur  focus:outline-none focus:shadow-outline"
                defaultValue={""}
                name={variant.color}
                onChange={(e) =>
                  handleVariantChange(variantIndex, "variantName", e)
                }
                placeholder="Color"
              />
              <input
                type="text"
                className="shadow appearance-none text-black border rounded w-auto py-2 px-3 bg-bodycolur  focus:outline-none focus:shadow-outline"
                defaultValue={""}
                name={variant.offer}
                onChange={(e) =>
                  handleVariantChange(variantIndex, "offer", e)
                }
                placeholder="offer"
              />
            </div>

            <div className="">
              {variant.images.map((image, imageIndex) => (
                <div key={imageIndex} className="flex relative mr-2">
                  <div className="grid-flow-row">
                    <div className="">
                      <input
                        className="outline-none border-none bg-bodycolur mt-3 w-full h-10 p-1 rounded-lg"
                        type="file"
                        name={Color}
                        defaultValue={image}
                        onChange={(e) => {
                          handleUpdateImage(variantIndex, imageIndex, e);
                        }}
                        placeholder="Image "
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      className="p-1"
                      onClick={() =>
                        handleRemoveImage(variantIndex, imageIndex)
                      }
                    >
                      <svg
                        width="26px"
                        height="26px"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mt-3"
                        fill="#df0c0c"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <rect
                            x="0"
                            fill="none"
                            width="24"
                            height="24"
                          ></rect>{" "}
                          <g>
                            {" "}
                            <path d="M20.587 3.423L22 4.837 20 6.84V18c0 1.105-.895 2-2 2H6.84l-2.007 2.006-1.414-1.414 17.167-17.17zM12.42 14.42l1 1 1-1c.63-.504 1.536-.456 2.11.11L18 16V8.84l-5.58 5.58zM15.16 6H6v6.38l2.19-2.19 1.39 1.39L4 17.163V6c0-1.105.895-2 2-2h11.162l-2 2z"></path>{" "}
                          </g>{" "}
                        </g>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-2 flex mt-3">
              <button
                type="button"
                className="bg-bodycolur p-2 border border-gray-600 rounded-lg text-black flex h-10"
                onClick={() => handleAddImage(variantIndex, "")}
              >
                <p>Add Image</p>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  className="my-1 mx-1"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 0C3.58185 0 0 3.58185 0 8C0 12.4182 3.58185 16 8 16C12.4182 16 16 12.4182 16 8C16 3.58185 12.4182 0 8 0ZM8 15.3846C3.92154 15.3846 0.615385 12.0785 0.615385 8C0.615385 3.92154 3.92154 0.615385 8 0.615385C12.0785 0.615385 15.3846 3.92154 15.3846 8C15.3846 12.0785 12.0785 15.3846 8 15.3846Z"
                    fill="black"
                  />
                  <path
                    d="M13.0811 7.69359H8.3119V2.92435C8.3119 2.83943 8.24298 2.77051 8.15805 2.77051H7.85036C7.76544 2.77051 7.69652 2.83943 7.69652 2.92435V7.69359H2.92728C2.84236 7.69359 2.77344 7.76251 2.77344 7.84743V8.15512C2.77344 8.24005 2.84236 8.30897 2.92728 8.30897H7.69652V13.0782C7.69652 13.1628 7.76544 13.232 7.85036 13.232H8.15805C8.24298 13.232 8.3119 13.1628 8.3119 13.0782V8.30897H13.0811C13.1657 8.30897 13.235 8.24005 13.235 8.15512V7.84743C13.235 7.76251 13.1657 7.69359 13.0811 7.69359Z"
                    fill="black"
                  />
                </svg>
              </button>
            </div>
            {variant.details.map((detail, detailIndex) => (
              <div key={detailIndex} className="flex gap-2 w-auto">
                <div>
                  <input
                    type="number"
                    onKeyDown={(e) =>
                      ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                    }
                    className="outline-none border-none w-full bg-bodycolur h-11 mt-7 p-3 rounded-lg"
                    value={detail.quantity}
                    onChange={(e) =>
                      handleDetailChange(
                        variantIndex,
                        detailIndex,
                        "quantity",
                        e.target.value
                      )
                    }
                    placeholder="Quantity"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    className="outline-none border-none w-full bg-bodycolur h-11 mt-7 p-3 rounded-lg"
                    value={detail.price}
                    onKeyDown={(e) =>
                      ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                    }
                    onChange={(e) =>
                      handleDetailChange(
                        variantIndex,
                        detailIndex,
                        "price",
                        e.target.value
                      )
                    }
                    placeholder="Price"
                  />
                </div>
                {/* <div>
                  <input
                    type="number"
                    onKeyDown={(e) =>
                      ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                    }
                    className="outline-none border-none w-full bg-bodycolur h-11 mt-7 p-3 rounded-lg"
                    value={detail.offerprice}
                    onChange={(e) =>
                      handleDetailChange(
                        variantIndex,
                        detailIndex,
                        "offerPrice",
                        e.target.value
                      )
                    }
                    placeholder="Offer Price"
                  />
                </div> */}
                <div className="flex mt-7 gap-2">
                  <button
                    className="w-10 h-10 text-2xl bg-navblue rounded-xl text-white"
                    type="button"
                    onClick={() => addDetail(variantIndex)}
                  >
                    +
                  </button>
                  <button
                    className="w-10 h-10 text-2xl bg-navblue rounded-xl text-white"
                    onClick={() => removeDetail(variantIndex, detailIndex)}
                  >
                    -
                  </button>
                  {errors.variants &&
                    errors.variants[variantIndex] &&
                    errors.variants[variantIndex].details &&
                    errors.variants[variantIndex].details[detailIndex] && (
                      <>
                        {errors.variants[variantIndex].details[detailIndex]
                          .size && (
                          <p className="text-red-500">
                            {
                              errors.variants[variantIndex].details[detailIndex]
                                .size
                            }
                          </p>
                        )}
                        {errors.variants[variantIndex].details[detailIndex]
                          .quantity && (
                          <p className="text-red-500">
                            {
                              errors.variants[variantIndex].details[detailIndex]
                                .quantity
                            }
                          </p>
                        )}
                        {errors.variants[variantIndex].details[detailIndex]
                          .price && (
                          <p className="text-red-500">
                            {
                              errors.variants[variantIndex].details[detailIndex]
                                .price
                            }
                          </p>
                        )}
                      </>
                    )}
                </div>
              </div>
            ))}
            <div className="flex justify-start">
              <button
                className="bg-red-600 text-white p-2 rounded-xl my-3"
                onClick={() => removeVariant(variantIndex)}
              >
                Remove Varient
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ToysBabyVariant;
