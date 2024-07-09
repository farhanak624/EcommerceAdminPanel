import React, { useState } from "react";

const AddPhoneVariant = ({ formData, setformData, errors }) => {
  const [Color, setColor] = useState("");
  

  const handleVariantChange = (index, field, e) => {
    if (field === "offer") {
     const value = parseInt(e.target.value);
      const updatedVariants = formData.variants.map((variant, variantIndex) => {
        if (index === variantIndex) {
          return { ...variant, [field]: value };
        }
        return variant;
      });
    setformData({ ...formData, variants: updatedVariants });

    } else {
      const updatedVariants = formData.variants.map((variant, variantIndex) => {
        if (index === variantIndex) {
          return { ...variant, [field]: e.target.value };
        }
        return variant;
      });
      setformData({ ...formData, variants: updatedVariants });
    }

  };
  const addVariant = () => {
    
    const newVariant = {
      // color: "",
      images: [],
      details: [{ size: "", quantity: null, price: null }],
      specifications: [{ key: "", value: "" }],
      variantName: "",
      offer: null,
    };
    setformData({ ...formData, variants: [...formData.variants, newVariant] });
  };

  const removeVariant = (index) => {
    const filteredVariants = formData.variants.filter(
      (_, variantIndex) => index !== variantIndex
    );
    setformData({ ...formData, variants: filteredVariants });
  };

  const handleDetailChange = (variantIndex, detailIndex, field, e) => {
    console.log("hghg");
    console.log("begore",e.target.value);
    if (field === "quantity" || field === "price") {
    const value = parseInt(e.target.value);
    console.log("after",value);
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
    }else{
      const updatedVariants = formData.variants.map((variant, vIndex) => {
        if (vIndex === variantIndex) {
          const updatedDetails = variant.details.map((detail, dIndex) => {
            if (dIndex === detailIndex) {
              return { ...detail, [field]: e.target.value };
            }
            return detail;
          });
          return { ...variant, details: updatedDetails };
        }
        return variant;
      });
      setformData({ ...formData, variants: updatedVariants });
    }
    
  };

  const addSpecification = (variantIndex) => {
    console.log("spec");
    const updatedVariants = formData.variants.map((variant, vIndex) => {
      if (vIndex === variantIndex) {
        const newSpecification = { key: "", value: "" };
        return {
          ...variant,
          specifications: [...variant.specifications, newSpecification],
        };
      }

      return variant;
    });
    setformData({ ...formData, variants: updatedVariants });
  };
  const removeSpecification = (variantIndex, specificationIndex) => {
    const updatedVariants = formData.variants.map((variant, vIndex) => {
      if (vIndex === variantIndex) {
        // Check if there's more than one specification before removing
        if (variant.specifications.length > 1) {
          const filteredSpecifications = variant.specifications.filter(
            (_, sIndex) => sIndex !== specificationIndex
          );
          return { ...variant, specifications: filteredSpecifications };
        }
        // Reset the last specification to default values if trying to remove the last one
        return {
          ...variant,
          specifications: [{ key: "", value: "" }],
        };
      }
      return variant;
    });
    setformData({ ...formData, variants: updatedVariants });
  };
  const handleSpecificationChange = (
    variantIndex,
    specificationIndex,
    field,
    value
  ) => {
    const updatedVariants = formData.variants.map((variant, vIndex) => {
      if (vIndex === variantIndex) {
        const updatedSpecifications = variant.specifications.map(
          (specification, sIndex) => {
            if (sIndex === specificationIndex) {
              return { ...specification, [field]: value };
            }
            return specification;
          }
        );
        return { ...variant, specifications: updatedSpecifications };
      }
      return variant;
    });
    setformData({ ...formData, variants: updatedVariants });
  };
  const addDetail = (variantIndex) => {
    const updatedVariants = formData.variants.map((variant, vIndex) => {
      console.log(variant);
      if (vIndex === variantIndex) {
        const newDetail = { size: "", quantity: null, price: null };
        return { ...variant, details: [...variant.details, newDetail] };
      }
      console.log(variant);
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
          images: e.target.files[0],
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
          className="p-2 rounded-lg shadow text-black border mb-3 text-sm bg-bodycolur flex items-center"
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
            <div className="flex gap-3">
              <input
                type="text"
                className="shadow appearance-none text-black border rounded w-auto py-2 px-3 bg-bodycolur  focus:outline-none focus:shadow-outline"
                name="color"
                onChange={(e) =>
                  handleVariantChange(variantIndex, "variantName", e)
                }
                placeholder="Color"
              />
              <input
                type="number"
                className="shadow appearance-none text-black border rounded w-auto py-2 px-3 bg-bodycolur  focus:outline-none focus:shadow-outline"
                name="offerPrice"
                onChange={(e) =>
                  handleVariantChange(variantIndex, "offer", e)
                }
                onKeyDown={(e) =>
                  ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                }
                placeholder="Offer"
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
                        name=""
                        defaultValue={image}
                        onChange={(e) => {
                          handleUpdateImage(variantIndex, imageIndex, e);
                        }}
                        placeholder="Image"
                      />
                    </div>
                  </div>
                  <div className="mt-5">
                    <button
                      className="bg-red-700"
                      onClick={() =>
                        handleRemoveImage(variantIndex, imageIndex)
                      }
                    >
                      <svg
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className=""
                      >
                        <path
                          d="M6.75884 0.165039C6.50198 0.165039 6.29398 0.365973 6.29398 0.614136C6.29398 0.862298 6.50196 1.06323 6.7577 1.06323H13.2417C13.4974 1.06323 13.7065 0.862298 13.7065 0.614136C13.7065 0.365973 13.4985 0.165039 13.2417 0.165039H6.75884ZM19.071 2.51149V5.09948L0.928356 5.09838V2.51149L19.071 2.51149ZM6.02795 9.43557H7.50546V16.1356H6.02795V9.43557ZM12.4939 9.43557H13.9725V16.1356H12.4939V9.43557ZM5.5633 8.5374C5.43941 8.5374 5.32121 8.58462 5.23484 8.66806C5.14732 8.75261 5.09845 8.8668 5.09845 8.98648V16.5846C5.09845 16.7032 5.14732 16.8174 5.23484 16.9019C5.32122 16.9865 5.43941 17.0337 5.5633 17.0337L7.9705 17.0326C8.22736 17.0326 8.43536 16.8317 8.43536 16.5835V8.9865C8.43536 8.73835 8.22737 8.5374 7.9705 8.5374L5.5633 8.5374ZM12.0292 8.5374C11.9065 8.5374 11.7883 8.58462 11.7008 8.66806C11.6133 8.75261 11.5644 8.8668 11.5644 8.98648V16.5846C11.5644 16.7032 11.6133 16.8174 11.7008 16.9019C11.7883 16.9865 11.9065 17.0337 12.0292 17.0337L14.4376 17.0326C14.6933 17.0326 14.9013 16.8317 14.9013 16.5835V8.9865C14.9013 8.73835 14.6933 8.5374 14.4376 8.5374L12.0292 8.5374ZM1.91965 5.99661H18.0814V18.8168C18.0814 19.0617 17.8791 19.2604 17.6268 19.267H2.3731C2.12192 19.2604 1.91962 19.0617 1.91962 18.8168L1.91965 5.99661ZM19.5362 1.6133L0.464861 1.61439C0.208002 1.61439 0 1.81533 0 2.0624V5.54734C0 5.79549 0.207987 5.99644 0.464861 5.99644H0.989951V18.8178C0.989951 19.5611 1.61391 20.1639 2.38451 20.165H17.6155C18.3861 20.1639 19.0101 19.5611 19.0101 18.8178V5.99756L19.5363 5.99647C19.659 5.99647 19.7772 5.94925 19.8647 5.8658C19.9511 5.78126 20 5.66707 20 5.54848V2.06241C20 1.94382 19.9511 1.82963 19.8647 1.74509C19.7772 1.66054 19.6589 1.6133 19.5362 1.6133Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-2 flex mt-3">
              <button
                type="button"
                className="bg-bodycolur p-2 border shadow rounded-lg text-black flex h-10"
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
                    type="text"
                    value={detail.size}
                    className="outline-none border-none bg-bodycolur w-full h-11 mt-7 p-3 rounded-lg"
                    onChange={(e) =>
                      handleDetailChange(
                        variantIndex,
                        detailIndex,
                        "size",
                        e
                      )
                    }
                    placeholder="Size"
                  />
                </div>
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
                        e
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
                        e
                      )
                    }
                    placeholder="Price"
                  />
                </div>

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
                  
                </div>
              </div>
            ))}
            <div className="flex justify-start">
              <button
                className="bg-red-600 flex text-white shadow p-2 rounded-xl my-3"
                onClick={() => removeVariant(variantIndex)}
              >
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2"
                >
                  <path
                    d="M6.75884 0.165039C6.50198 0.165039 6.29398 0.365973 6.29398 0.614136C6.29398 0.862298 6.50196 1.06323 6.7577 1.06323H13.2417C13.4974 1.06323 13.7065 0.862298 13.7065 0.614136C13.7065 0.365973 13.4985 0.165039 13.2417 0.165039H6.75884ZM19.071 2.51149V5.09948L0.928356 5.09838V2.51149L19.071 2.51149ZM6.02795 9.43557H7.50546V16.1356H6.02795V9.43557ZM12.4939 9.43557H13.9725V16.1356H12.4939V9.43557ZM5.5633 8.5374C5.43941 8.5374 5.32121 8.58462 5.23484 8.66806C5.14732 8.75261 5.09845 8.8668 5.09845 8.98648V16.5846C5.09845 16.7032 5.14732 16.8174 5.23484 16.9019C5.32122 16.9865 5.43941 17.0337 5.5633 17.0337L7.9705 17.0326C8.22736 17.0326 8.43536 16.8317 8.43536 16.5835V8.9865C8.43536 8.73835 8.22737 8.5374 7.9705 8.5374L5.5633 8.5374ZM12.0292 8.5374C11.9065 8.5374 11.7883 8.58462 11.7008 8.66806C11.6133 8.75261 11.5644 8.8668 11.5644 8.98648V16.5846C11.5644 16.7032 11.6133 16.8174 11.7008 16.9019C11.7883 16.9865 11.9065 17.0337 12.0292 17.0337L14.4376 17.0326C14.6933 17.0326 14.9013 16.8317 14.9013 16.5835V8.9865C14.9013 8.73835 14.6933 8.5374 14.4376 8.5374L12.0292 8.5374ZM1.91965 5.99661H18.0814V18.8168C18.0814 19.0617 17.8791 19.2604 17.6268 19.267H2.3731C2.12192 19.2604 1.91962 19.0617 1.91962 18.8168L1.91965 5.99661ZM19.5362 1.6133L0.464861 1.61439C0.208002 1.61439 0 1.81533 0 2.0624V5.54734C0 5.79549 0.207987 5.99644 0.464861 5.99644H0.989951V18.8178C0.989951 19.5611 1.61391 20.1639 2.38451 20.165H17.6155C18.3861 20.1639 19.0101 19.5611 19.0101 18.8178V5.99756L19.5363 5.99647C19.659 5.99647 19.7772 5.94925 19.8647 5.8658C19.9511 5.78126 20 5.66707 20 5.54848V2.06241C20 1.94382 19.9511 1.82963 19.8647 1.74509C19.7772 1.66054 19.6589 1.6133 19.5362 1.6133Z"
                    fill="white"
                  />
                </svg>
                Remove Varient
              </button>
            </div>
            <div className="flex justify-between">
              <label className="font-semibold" htmlFor="">
                Specification
              </label>
              <div className="flex">
                <button
                  type="button"
                  className="flex p-1 boder rounded-lg shadow  bg-bodycolur "
                  onClick={() => {
                    addSpecification(variantIndex);
                  }}
                >
                  Add{" "}
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
            </div>
            {variant?.specifications?.length > 0 &&
              variant?.specifications?.map(
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
                              variantIndex,
                              specificationIndex,
                              "key",
                              e.target.value
                            );
                          }}
                          className="outline-none border-none w-auto bg-bodycolur h-11 mt-7 p-3 rounded-lg"
                          placeholder="specification"
                        />
                      </div>
                      <div className="">
                        <input
                          type="text"
                          onChange={(e) => {
                            handleSpecificationChange(
                              variantIndex,
                              specificationIndex,
                              "value",
                              e.target.value
                            );
                          }}
                          value={specifiaction.value}
                          className="outline-none border-none w-auto
                 bg-bodycolur h-11 mt-7 p-3 rounded-lg"
                          placeholder="details"
                        />
                      </div>
                      <div>
                        {variant.specifications.length > 1 && (
                          <button
                            className="w-10 h-10 text-2xl bg-navblue rounded-xl mt-7 text-white"
                            onClick={() =>
                              removeSpecification(
                                variantIndex,
                                specificationIndex
                              )
                            }
                          >
                            -
                          </button>
                        )}
                      </div>
                    </div>
                  );
                }
              )}
          </div>
        ))}
      </div>
    </>
  );
};

export default AddPhoneVariant;
