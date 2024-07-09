import React, { useEffect, useState } from "react";
import axios from "axios";
import BrandModal from "../../../Modals/ProductModals/BrandModal";
import AddFashionVariantForm from "./VariantForms/AddFashionVariantForm";
import AddPhoneVariant from "./VariantForms/AddPhoneVariant";
import FurnitureVariant from "./VariantForms/FurnitureVariant";
import PersonalCareVariant from "./VariantForms/PersonalCareVariant";
import SportsVariant from "./VariantForms/SportsVariant";
import GroceryVariant from "./VariantForms/GroceryVariant";
import HomeApplianceVariant from "./VariantForms/HomeApplianceVariant.";
import GadgetAccesorryVariant from "./VariantForms/Gadget&AccesorryVariant";
import SearchBoxData from "./SearchBoxData";
import CategoryModal from "../../../Modals/ProductModals/CategoryModal";
import SubcategoryModal from "../../../Modals/ProductModals/SubcategoryModal";
import {
  addProduct,
  getCategory,
  getSectionCategories,
  getSections,
} from "../../../../Api/ApiCall";
import ReturnBox from "./ReturnBox";
import { uploadImage, uploadImageV2 } from "../../../imageUpload";
import Accessories from "./VariantForms/Accessories";
import MultiSelectDropDown from "../../../customDropdown/MultiSelectDropDown";
import ToysAndBabyVariants from "./VariantForms/ToysAndBabyVariants";
import { toast } from "react-toastify";
import AddMultiSelectDropDown from "../../../customDropdown/AddMultiSelectDropDown";
import { useNavigate } from "react-router-dom";
import { inputNumberPreventScroll } from "../../../../Utils/utils";
import SectionModal from "../../../Modals/ProductModals/SectionModal";
import { useDispatch } from "react-redux";
import { loadSpinner } from "../../../../Redux/Features/NavbarSlice";
import OtherSections from "./VariantForms/OtherSections";

const AddNewProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [Brands, setBrands] = useState([]);
  const [isBrandModal, setisBrandModal] = useState(false);
  const [Subcategory, setSubcategory] = useState(false);
  const [iscategory, setIscategory] = useState(false);
  const [formCategory, setFormCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [sectionId, setSectionId] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [sectionCategories, setSectionCategories] = useState({});
  const [selectedSections, setSelectedSections] = useState({
    name: "",
    id: "",
  });
  const [displayErrors, setDisplayErrors] = useState({});
  const [sectionList, setSectionList] = useState([]);
  const [formData, setformData] = useState({
    productName: "",
    brand: "",
    description: "",
    currency: "",
    section: "",
    category: "",
    subCategory: "",
    variants: [],
    returnDays: 0,
    countries: [],
    gender: "",
    age: "",
    estimatedDelivery: "",
  });
  const [OtherSectionss, setOtherSectionss] = useState(false);
  const [isSectionModal, setIsSectionModal] = useState(false);

  useEffect(() => {
    getSections().then((data) => {
      console.log("sections", data?.data?.sectionData);
      setSectionList(data?.data?.sectionData);
    });
  }, [isSectionModal]);
  useEffect(() => {
    sectinGetCategories();
  }, [sectionId, categoryId]);
  const sectinGetCategories = () => {
    dispatch(loadSpinner());
    getSectionCategories(sectionId)
      .then((data) => {
        setCategoryList(data?.data?.sectionData?.categories);
        const sectionCategories = data?.data?.sectionData?.categories;
        console.log("scsetegory", sectionCategories);
        sectionCategories.find((category) => {
          if (category._id === categoryId) {
            console.log("category", category.brands);
            setBrands(category?.brands);
            console.log("subcategoryoes", category?.subCategories);
            setSubCategoryList(category?.subCategories);
          }
        });
      })
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => {
        dispatch(loadSpinner());
      });
  };
  console.log("Brands", Brands);

  const [numberOfDays, setNumberOfDays] = useState("");
  const Section = [
    "Fashion",
    "Gadget & Accessories",
    "Appliances",
    "Accessories",
    "Mobiles",
    "Sports",
    "Personal Care",
    "Toys & Baby",
    "Furniture",
    "Grocery",
  ];
  const [errors, setErrors] = useState({});
  const brandModal = () => {
    sectinGetCategories();
    setisBrandModal(!isBrandModal);
  };
  const categoryModal = () => {
    sectinGetCategories();
    setIscategory(!iscategory);
  };
  const subCategoryModal = () => {
    sectinGetCategories();
    setSubcategory(!Subcategory);
  };
  const sectionModal = () => {
    sectinGetCategories();
    setIsSectionModal(!isSectionModal);
  };
  const extraHandle = () => {
    if (!Section.includes(formCategory)) {
      console.log("fi");
      setOtherSectionss(true);
    } else {
      setOtherSectionss(false);
    }
  };
  useEffect(() => {
    extraHandle();
  }, [formCategory]);
  const validateForm = () => {
    let newErrors = {};
    console.log("formDatassssss", formData);
    console.log("sdfds", formData.returnDays);
    if (formData.returnDays) {
      // console.log("hi");
      const parsedReturn = parseInt(formData.returnDays);
      // console.log("dfgd");
      if (parsedReturn > 20) {
        // console.log("bi");
        newErrors.returnDays = "Enter valid return days";
        console.log(newErrors.returnDays);
      }
    }
    if (!formData.productName.trim()) {
      newErrors.productName = "Product Name is required";
    }
    if (!formData.brand.trim()) {
      newErrors.brand = "Brand is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.currency.trim()) {
      newErrors.currency = "Currency is required";
    }
    if (!formData.section.trim()) {
      newErrors.section = "Section is required";
    }
    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }
    const categoriesRequiringSubCategory = [
      "Fashion",
      "Furniture",
      "Gadget & Accessories",
      "Toys & Baby",
      "Sports",
      "Personal Care",
    ];
    if (
      !formData.subCategory.trim() &&
      categoriesRequiringSubCategory.includes(formCategory)
    ) {
      newErrors.subCategory = "Subcategory is required";
    }
    // if (formData.countries.length === 0) {
    //   newErrors.countries = "At least one country must be selected";
    // }
    if (
      formCategory === "Sports" &&
      (!formData.gender || !formData.gender.trim())
    ) {
      newErrors.gender = "Gender is required";
    }

    // Validate age for Toys & Baby category
    if (
      formCategory === "Toys & Baby" &&
      (!formData.age || !formData.age.trim())
    ) {
      newErrors.age = "Age is required";
    }

    if (formData.variants.length === 0) {
      newErrors.variants = "At least one variant must be added";
    } else {
      formData.variants.forEach((variant, index) => {
        if (variant.images.length === 0) {
          newErrors[`variants[${index}].images`] =
            "At least one image is required for each variant";
        }
        variant.images.forEach((image, imageIndex) => {
          console.log("fefeefe", image);
          // Assuming 'image' is an object with a 'name' property
          if (!image) {
            newErrors[`variants[${index}].images[${imageIndex}]`] =
              "Image is required";
          }
        });
        if (variant.details.length === 0) {
          newErrors[`variants[${index}].details`] =
            "At least one detail is required for each variant";
        }
        if (variant?.specifications?.length === 0) {
          newErrors[`variants[${index}].specifications`] =
            "At least one specification is required for each variant";
        }
        if (!variant.variantName.trim()) {
          newErrors[`variants[${index}].variantName`] =
            "Variant name is required";
        }
        if (variant.offer === 0 || null || variant.offer > 100 || NaN) {
          newErrors[`variants[${index}].offer`] =
            "Enter Offer or Enter valid offer percentage";
        }
        variant.details.forEach((detail, detailIndex) => {
          if (detail.quantity === 0) {
            newErrors[`variants[${index}].details[${detailIndex}].quantity`] =
              "Quantity is required";
          }
          if (detail.price === 0 || null || detail.price === NaN) {
            newErrors[`variants[${index}].details[${detailIndex}].price`] =
              "Price is required";
          }
          const categoriesRequiringSize = [
            "Fashion",
            "Accessories",
            "Mobiles",
            "Sports",
            "Personal Care",
            "Furniture",
            "Grocery",
          ];
          if (
            categoriesRequiringSize.includes(formCategory) &&
            (detail.size === "" || detail.size == null)
          ) {
            newErrors[`variants[${index}].details[${detailIndex}].size`] =
              "Size is required";
          }
        });
        const categoriesWithSpecifications = [
          "Gadgets and Accessories",
          "Appliances",
          "Accessories",
          "Mobiles",
        ];
        if (
          categoriesWithSpecifications.includes(formCategory) &&
          variant.specifications &&
          variant.specifications.length > 0
        ) {
          variant.specifications.forEach((spec, specIndex) => {
            if (!spec.key.trim()) {
              newErrors[`variants[${index}].specifications[${specIndex}].key`] =
                "Specification key is required";
            }
            if (!spec.value.trim()) {
              newErrors[
                `variants[${index}].specifications[${specIndex}].value`
              ] = "Specification value is required";
            }
          });
        }
      });
    }

    setErrors(newErrors);
    setDisplayErrors(newErrors);
    console.log("newErrors", newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const formHandling = async (e) => {
    e.preventDefault();
    dispatch(loadSpinner());
    setformData({
      ...formData,
    });
    if (!validateForm()) {
      dispatch(loadSpinner());
      toast.error("Please correct the errors before submitting.");
      return; // Stop the form submission if validation fails
    }
    setIsLoading(true);
    const PostForm = formData;
    let updatedFormData = {
      ...formData,
      returnDays: numberOfDays ? numberOfDays : 0,
    };
    console.log("datada", updatedFormData);
    for (let i = 0; i < updatedFormData.variants.length; i++) {
      // console.log("hi", updatedFormData.variants[i]);
      const variant = updatedFormData.variants[i];
      for (let j = 0; j < variant.images.length; j++) {
        // console.log("image", variant.images[j]);
        const imageFile = variant.images[j];
        // console.log("imageFile", imageFile);
        try {
          const uploadResponse = await uploadImage(imageFile);
          console.log({ uploadResponse });
          console.log("uploadResponse", uploadResponse.images[0].imageUrl);
          variant.images[j] = uploadResponse.images[0].imageUrl;
        } catch (error) {
          console.error("Failed to upload image:", error);
        }
      }
    }
    setformData(updatedFormData);
    console.log("formDatassssss", formData);
    try {
      const submissionResponse = await addProduct(updatedFormData);
      console.log("Product added successfully:", submissionResponse);
      toast.success("Product added successfully");
      setIsLoading(false);
      dispatch(loadSpinner());
      navigate("/AllProducts");
      setDisplayErrors({});
      setErrors({});
      // Handle successful submission (e.g., showing a success message or redirecting the user)
    } catch (submissionError) {
      console.error("Failed to add product:", submissionError);
      setIsLoading(false);
      dispatch(loadSpinner());
      toast.error("Failed to add product:");

      // Handle submission failure (e.g., by showing an error message)
    }
  };

  return (
    <>
      <div className="bg-containerWhite w-full flex justify-center h-full rounded-xl min-h-[600px] shadow-sm p-4">
        <form onSubmit={formHandling}>
          <div className="lg:max-w-[80%] flex items-center justify-center w-full">
            <div className="text-center">
              <h1 className="text-2xl font-semibold">Add New Product</h1>
              <p className="text-gray-500 text-lg mt-4">
                This section helps to add your products
              </p>

              <div className="flex justify-center items-center rounded-lg  mb-5">
                <div className="w-full p-10">
                  {/* <p className="text-red-500 text-xs">{errors.productName}</p> */}
                  {/* First row with Product Name and Brand dropdown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <select
                        name="section"
                        className={`p-3  shadow  ${
                          formData.section ? "text-black" : "text-slate-400"
                        } shadow-black/20 rounded-lg outline-none bg-[rgba(244,245,250,1)] border-none w-full`}
                        id=""
                        onChange={(e) => {
                          setOtherSectionss(false);
                          setFormCategory("");
                          const selectedSectionId = e.target.value;
                          setSectionId(selectedSectionId);
                          const selectedSectionName = sectionList.find(
                            (section) => section._id === selectedSectionId
                          )?.name;
                          setFormCategory(selectedSectionName);
                          setSelectedSections({
                            name: selectedSectionName,
                            id: selectedSectionId,
                          });
                          setformData({
                            ...formData,
                            section: selectedSectionId,
                          });
                          extraHandle();
                        }}
                        value={selectedSections.id}
                      >
                        <option selected disabled value="">
                          Select Section
                        </option>
                        {sectionList[0] &&
                          sectionList.map((data) => {
                            return (
                              <option
                                className="text-black"
                                key={data._id}
                                value={data._id}
                              >
                                {data.name}
                              </option>
                            );
                          })}
                      </select>
                      {/* <button
                        onClick={() => {
                          setIsSectionModal(true);
                        }}
                        type="button"
                        className="w-12 h-12 inline-flex justify-center bg-navblue rounded-md text-2xl text-white"
                      >
                        <p className="mt-1">+</p>
                      </button> */}
                    </div>
                    <input
                      type="text"
                      defaultValue={``}
                      onChange={(e) =>
                        setformData({
                          ...formData,
                          productName: e.target.value,
                        })
                      }
                      placeholder="Product Name"
                      className="p-2 rounded-lg shadow shadow-black/20  outline-none bg-[rgba(244,245,250,1)] border-none flex-1"
                    />

                    <div className="flex items-center gap-2">
                      {/* <p className="text-red-500 text-xs">{errors?.currency}</p> */}
                      <select
                        name="currency"
                        onChange={(e) =>
                          setformData({
                            ...formData,
                            currency: e.target.value,
                          })
                        }
                        className={`p-3 shadow  ${
                          formData.currency ? "text-black" : "text-slate-400"
                        } shadow-black/20 rounded-lg outline-none text-black bg-[rgba(244,245,250,1)] border-none w-full`}
                        placeholder="currency"
                        id=""
                      >
                        <option selected disabled value="">
                          Currency
                        </option>
                        <option className="text-black" value="AED">
                          AED
                        </option>
                        <option className="text-black" value="INR">
                          INR
                        </option>
                        <option className="text-black" value="USD">
                          USD
                        </option>
                        <option className="text-black" value="EUR">
                          EUR
                        </option>
                        <option className="text-black" value="JPY">
                          JPY
                        </option>
                        <option className="text-black" value="GBP">
                          GBP
                        </option>
                        <option className="text-black" value="AUD">
                          AUD
                        </option>
                        <option className="text-black" value="HKD">
                          HKD
                        </option>
                        <option className="text-black" value="AED">
                          AED
                        </option>
                        <option className="text-black" value="NZD">
                          NZD
                        </option>

                        {/* Brand options */}
                      </select>
                    </div>
                  </div>
                  {/* Description on the second row */}
                  {/* <p className="text-red-500 text-xs">{errors.description}</p> */}
                  <textarea
                    className="shadow shadow-black/20 bg-[rgba(244,245,250,1)] p-2 rounded-lg outline-none border-none w-full mb-2"
                    name="description"
                    onChange={(e) => {
                      setformData({
                        ...formData,
                        description: e.target.value,
                      });
                    }}
                    rows="2"
                    placeholder="Description"
                  ></textarea>
                  <div>
                    <AddMultiSelectDropDown
                      formData={formData}
                      setformData={setformData}
                    />
                  </div>
                  {/* <p className="text-red-500 text-xs">{errors.countries}</p> */}
                  {/* Third row with Category and Subcategory dropdowns, each with a plus button */}
                  <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <select
                        name="Category"
                        className={`p-3 shadow shadow-black/20 ${
                          formData.category ? "text-black" : "text-slate-400"
                        } rounded-lg outline-none bg-[rgba(244,245,250,1)] border-none w-full`}
                        id=""
                        onChange={(e) => {
                          setCategoryId(e.target.value);
                          setformData({
                            ...formData,
                            category: e.target.value,
                          });
                        }}
                      >
                        <option
                          className="text-slate-400"
                          disabled
                          selected
                          value=""
                        >
                          Category
                        </option>
                        {categoryList[0] &&
                          categoryList.map((category) => {
                            return (
                              <option
                                className="text-black"
                                key={category._id}
                                value={category._id}
                              >
                                {category.name}
                              </option>
                            );
                          })}
                        {/* Brand options */}
                      </select>
                      <button
                        onClick={() => {
                          setIscategory(true);
                        }}
                        type="button"
                        className="w-12 h-12 inline-flex justify-center bg-navblue rounded-md text-2xl text-white"
                      >
                        <p className="mt-1">+</p>
                      </button>
                      {isSectionModal ? (
                        <SectionModal callback={sectionModal} />
                      ) : (
                        ""
                      )}
                      {iscategory ? (
                        <CategoryModal
                          callback={categoryModal}
                          sectionId={sectionId}
                          editData={{}}
                          role={"vendor"}
                        />
                      ) : (
                        ""
                      )}
                      {Subcategory ? (
                        <SubcategoryModal
                          callback={subCategoryModal}
                          categoryId={categoryId}
                          editData={{}}
                          role={"vendor"}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                    {/* <p className="text-red-500 text-xs">{errors.category}</p> */}

                    <div className="flex items-center gap-2">
                      <SearchBoxData
                        BrandNames={Brands}
                        formData={formData}
                        setformData={setformData}
                        callback={brandModal}
                      />
                    </div>
                    {/* <p className="text-red-500 text-xs">{errors.brand}</p> */}
                    {isBrandModal ? (
                      <BrandModal
                        setisBrandModal={setisBrandModal}
                        callback={brandModal}
                        categoryId={formData.category}
                      />
                    ) : (
                      ""
                    )}

                    {formCategory === "Sports" ? (
                      <select
                        name="brand"
                        className={`p-3 rounded-lg outline-none${
                          formData.gender ? "text-black" : "text-slate-400"
                        } bg-[rgba(244,245,250,1)] border-none w-full`}
                        placeholder="gender"
                        id=""
                        onChange={(e) => {
                          setformData({
                            ...formData,
                            gender: e.target.value,
                          });
                        }}
                      >
                        <option selected disabled value="">
                          Gender
                        </option>
                        <option className="text-black" value="Male">
                          Male
                        </option>
                        <option className="text-black" value="Female">
                          Female
                        </option>

                        {/* Brand options */}
                      </select>
                    ) : (
                      ""
                    )}
                    {formCategory === "Toys & Baby" ? (
                      <select
                        name="age"
                        className={`p-3 rounded-lg outline-none ${
                          formData.age ? "text-black" : "text-slate-400"
                        }bg-[#F4F5FA] border-none w-full`}
                        id=""
                        onChange={(e) => {
                          setformData({
                            ...formData,
                            age: e.target.value,
                          });
                        }}
                      >
                        <option selected disabled value="">
                          Age
                        </option>
                        {Array.from({ length: 20 }, (_, i) => (
                          <option
                            className="text-black bg-[#F4F5FA]"
                            key={i + 1}
                            value={i + 1}
                          >
                            {i + 1} years
                          </option>
                        ))}
                      </select>
                    ) : (
                      ""
                    )}
                    {/* <p className="text-red-500 text-xs">{errors.subCategory}</p> */}
                    {formCategory === "Gadget & Accessories" ||
                    formCategory === "Toys & Baby" ||
                    formCategory === "Personal Care" ||
                    formCategory === "Sports" ||
                    formCategory === "Fashion" ||
                    formCategory === "Furniture" ||
                    formCategory !== "" ? (
                      <div className="flex items-center gap-2">
                        <select
                          name="brand"
                          className={`p-3 rounded-lg shadow outline-none ${
                            formData.subCategory
                              ? "text-black"
                              : "text-slate-400"
                          } bg-[rgba(244,245,250,1)] border-none w-full`}
                          placeholder="currency"
                          id=""
                          onChange={(e) => {
                            setformData({
                              ...formData,
                              subCategory: e.target.value,
                            });
                          }}
                        >
                          <option selected disabled value="">
                            Subcategory
                          </option>
                          {subCategoryList[0] &&
                            subCategoryList.map((data) => {
                              return (
                                <option className="text-black" value={data._id}>
                                  {data.name}
                                </option>
                              );
                            })}
                        </select>
                        <button
                          type="button"
                          onClick={() => {
                            setSubcategory(true);
                          }}
                          className="w-12 h-12 inline-flex justify-center bg-navblue rounded-md text-2xl text-white"
                        >
                          <p className="mt-1">+</p>
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                    {/* Empty third column on the third row for lg screens */}
                  </div>
                  {formCategory === "Fashion" ? (
                    <AddFashionVariantForm
                      setformData={setformData}
                      formData={formData}
                      errors={errors}
                    />
                  ) : (
                    ""
                  )}
                  {formCategory === "Mobiles" ? (
                    <AddPhoneVariant
                      setformData={setformData}
                      formData={formData}
                      errors={errors}
                    />
                  ) : (
                    ""
                  )}
                  {formCategory === "Furniture" ? (
                    <FurnitureVariant
                      setformData={setformData}
                      formData={formData}
                      errors={errors}
                    />
                  ) : (
                    ""
                  )}
                  {formCategory === "Personal Care" ? (
                    <PersonalCareVariant
                      setformData={setformData}
                      formData={formData}
                      errors={errors}
                    />
                  ) : (
                    ""
                  )}
                  {formCategory === "Sports" ? (
                    <SportsVariant
                      setformData={setformData}
                      formData={formData}
                      errors={errors}
                    />
                  ) : (
                    ""
                  )}
                  {formCategory === "Toys & Baby" ? (
                    <ToysAndBabyVariants
                      setformData={setformData}
                      formData={formData}
                      errors={errors}
                    />
                  ) : (
                    ""
                  )}
                  {formCategory === "Grocery" ? (
                    <GroceryVariant
                      setformData={setformData}
                      formData={formData}
                      errors={errors}
                    />
                  ) : (
                    ""
                  )}
                  {formCategory === "Gadget & Accessories" ? (
                    <GadgetAccesorryVariant
                      setformData={setformData}
                      formData={formData}
                      errors={errors}
                    />
                  ) : (
                    ""
                  )}
                  {formCategory === "Accessories" ? (
                    <Accessories
                      setformData={setformData}
                      formData={formData}
                      errors={errors}
                    />
                  ) : (
                    ""
                  )}
                  {formCategory === "Appliances" ? (
                    <HomeApplianceVariant
                      setformData={setformData}
                      formData={formData}
                      errors={errors}
                    />
                  ) : (
                    ""
                  )}
                  {OtherSectionss && (
                    <OtherSections
                      setformData={setformData}
                      formData={formData}
                      errors={errors}
                    />
                  )}

                  {formCategory === "" ? (
                    ""
                  ) : (
                    <>
                      <div className="flex justify-normal">
                        <label className="font-semibold" htmlFor="">
                          Return
                        </label>
                      </div>
                      {/* <p className="text-red-500 text-xs">
                          {errors.returnDays}
                        </p> */}
                      <ReturnBox
                        setNumberOfDays={setNumberOfDays}
                        numberOfDays={numberOfDays}
                        formData={formData}
                        setformData={setformData}
                      />
                      <div className="flex justify-normal mt-4">
                        <label className="font-semibold" htmlFor="estimated-delivery">
                          Estimated Delivery (in days)
                        </label>
                      </div>
                      <input
                        type="text"
                        id="estimated-delivery"
                        className="w-full p-2 border rounded bg-input text-foreground"
                        placeholder="Enter estimated delivery days"
                        value={formData.estimatedDelivery || ""}
                        onChange={(e) => {
                          setformData({
                            ...formData,
                            estimatedDelivery: parseInt(e.target.value),
                          });
                        }}
                      />
                      {errors.estimatedDelivery && (
                        <span className="text-red-500 text-xs">
                          {errors.estimatedDelivery}
                        </span>
                      )}
                      <div className="flex justify-end mt-3">
                        <button
                          onClick={(e) => {
                            formHandling(e);
                          }}
                          type="submit"
                          className="bg-navblue text-white p-2 rounded-lg border shadow"
                        >
                          Save Product
                        </button>
                      </div>
                    </>
                  )}
                  {/* <p className="text-red-500 text-xs">{errors.variants}</p> */}

                  <ul>
                    {Object.entries(displayErrors).map(([key, message]) => (
                      <li className="text-red-500 text-xs" key={key}>
                        {message}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNewProducts;
