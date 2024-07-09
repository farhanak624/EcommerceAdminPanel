import { bubbleClick } from "@syncfusion/ej2-react-maps";
import BulkInstance from "./Axios";

export const signup = async (data) => {
  console.log("signup", data);
  return await BulkInstance.post(`/vendor/signup`, data);
};

export const verifyOTP = async (data) => {
  return await BulkInstance.post(`/vendor/verifyOtp`, data);
};

export const resendOTP = async (data) => {
  return await BulkInstance.post(`/vendor/resendOtp`, data);
};

export const addProfile = async (data) => {
  console.log("wholeData:", data);
  return await BulkInstance.post(`/vendor/addProfiles`, data);
};

export const login = async (data) => {
  console.log("login", data);
  return await BulkInstance.post(`/admin/login`, data);
};

export const getProfile = async () => {
  return await BulkInstance.get(`vendor/getProfiles`);
};

export const addNewBank = async (data) => {
  console.log("addNewBank", data);
  return await BulkInstance.post(`vendor/addNewBank`, data);
};

export const editBank = async (data) => {
  console.log("editBank", data);
  return await BulkInstance.post(`vendor/editBank`, data);
};

export const makePrimary = async (data) => {
  console.log("makePrimary", data);
  return await BulkInstance.post(`vendor/makePrimaryAccount`, data);
};

export const getOrderStatics = async (filter) => {
  return await BulkInstance.get(`vendor/getOrderStatics?filter=${filter}`);
};

export const getOrders = async (status, page) => {
  let apiUrl = `/vendor/getOrders?page=${page}`;
  if (status) {
    apiUrl += `&status=${status}`;
  }
  console.log("getOrders", status);
  return await BulkInstance.get(apiUrl);
};

export const getOrderDetails = async (id) => {
  return await BulkInstance.get(`vendor/getOrderDetails?orderId=${id}`);
};

export const getVendorRequests = async (page) => {
  return await BulkInstance.get(`admin/getVendorRequests?page=${page}`);
};

export const getVendorDetails = async (id) => {
  return await BulkInstance.get(`admin/getVendorDetails?id=${id}`);
};

export const approveVendor = async (id) => {
  console.log("approve: ", id);
  return await BulkInstance.post(`admin/approve`, { id: id });
};

export const rejectVendor = async (id) => {
  return await BulkInstance.post(`admin/reject`, { id: id });
};

export const actionOnVendor = async (id) => {
  console.log("actionOnVendor: ", id);
  return await BulkInstance.post(`admin/blockAction`, { id: id });
};

export const getTopVendors = async (page) => {
  return await BulkInstance.get(`admin/topVendors?page=${page}`);
};

export const getVendorProduct = async (id, searchKey,page) => {
  return await BulkInstance.get(`admin/getVendorProduct?id=${id}&page=${page}&search=${searchKey}`);
};

export const activeProduct = async (productId) => {
  return await BulkInstance.post(`admin/activeProduct`, { productId });
};

export const changeCommissionSingle = async (productId, commission) => {
  console.log("productId, commission: ", productId, commission)
  return await BulkInstance.post(`admin/change-product-commission`, { productId, commission });
};

export const changeCommissionAll = async (vendorId, commission) => {
  console.log("vendorId, commission: ", vendorId, commission)
  return await BulkInstance.post(`admin/change-venodr-all-product-commission`, { vendorId, commission });
};

export const getFlickPlansAdmin = async () => {
  return await BulkInstance.get(`flicks/memberships`);
};

export const addFlickPlanAdmin = async (data) => {
  return await BulkInstance.post(`flicks/membership`, data);
};

export const deleteFlickPlanAdmin = async (id) => {
  console.log("deleteFlickPlan", id);
  return await BulkInstance.delete(`flicks/membership/${id}`);
};

export const editFlickPlan = async (id, data) => {
  console.log("editFlickPlan", id, data);
  return await BulkInstance.put(`flicks/membership/${id}`, data);
};

export const getAllCloudsAdmin = async () => {
  return await BulkInstance.get(`admin/getAllClouds`);
};

export const addCloudAdmin = async (data) => {
  return await BulkInstance.post(`admin/addCloud`, data);
};

export const deleteCloudAdmin = async (id) => {
  console.log("deleteCloud", id);
  return await BulkInstance.post(`admin/deleteCloud`, { id });
};

export const editCloudAdmin = async (data) => {
  console.log("editFlickPlan", data);
  return await BulkInstance.put(`admin/editCloud`, data);
};

export const addProduct = async (data) => {
  console.log("to uploadd", data);
  return await BulkInstance.post(`/vendor/product`, data);
};
export const addCategory = async (data,role) => {
  console.log("to category", data);
  return await BulkInstance.post(`${role}/category`, data);
};
export const getSections = async () => {
  return await BulkInstance.get(`vendor/getAllSections`);
};
export const getBrands = async (categoryId) => {
  return await BulkInstance.get(`vendor/getBrands?id=${categoryId}`);
};
export const getCategory = async () => {
  return await BulkInstance.get(`vendor/getCategories`);
};
export const getSectionCategories = async (sectionId) => {
  console.log("secfsd", sectionId);
  return await BulkInstance.get(
    `vendor/getSectionCategories?sectionId=${sectionId}`
  );
};
export const addBrand = async (data) => {
  return await BulkInstance.post(`vendor/addBrands`, data);
};
export const allProducts = async (sectionId, search, pages) => {
  console.log("sectionId", sectionId, "search", search);
  console.log(
    `vendor/products?section=${sectionId ? sectionId : ""}&search=${
      search ? search : ""
    }&page=${pages ? pages : "1"}`
  );
  return await BulkInstance.get(
    `vendor/products?section=${sectionId ? sectionId : ""}&search=${
      search ? search : ""
    }&page=${pages ? pages : "1"}`
  );
};

export const productDetailed = async (productId, year) => {
  console.log({ year });
  return await BulkInstance.get(
    `vendor/product/${productId}?year=${year ? year : new Date().getFullYear()}`
  );
};
export const productOverview = async (productId, year) => {
  console.log({ year });
  return await BulkInstance.get(
    `vendor/productOverview/${productId}?year=${
      year ? year : new Date().getFullYear()
    }`
  );
};

export const addSubCategory = async (data,role) => {
  return await BulkInstance.post(`${role}/subCategory`, data);
};
export const getAllClouds = async () => {
  return await BulkInstance.get("/vendor/getAllClouds");
};
export const getAllVibes = async (productName, page) => {
  return await BulkInstance.get(
    `vendor/getvibes?productName=${productName}&page=${page}`
  );
};
export const deleteVibe = async (data) => {
  return await BulkInstance.delete(`vendor/deleteVibes?id=${data}`);
};
export const getvendorStorage = async () => {
  return await BulkInstance.get(`vendor/getVendorStorage`);
};
export const cloudPaymentStripe = async (amount) => {
  return await BulkInstance.post("/vendor/cloudStripePay", amount);
};
export const addVibes = async (data) => {
  console.log("final data", data);
  return await BulkInstance.post("/vendor/addVibes", data);
};
export const editVibes = async (data) => {
  console.log("final data", data);
  return await BulkInstance.put("/vendor/editVibes", data);
};
export const StripeValidation = async (validationData) => {
  console.log(validationData, "}}}}}}}}}}}}}}}}}}");
  return await BulkInstance.post(
    "vendor/cloudStripeValidation",
    validationData
  );
};
export const cloudPaymentPaypal = async (validationData) => {
  console.log(validationData, "}}}}}}}}}}}}}}}}}}");
  return await BulkInstance.post("vendor/cloudPaypalPay", validationData);
};
export const paypalValidationfor = async (validationData) => {
  console.log(validationData, "}}}}}}}}}}}}}}}}}}");
  return await BulkInstance.post(
    "vendor/cloudPaypalValidation",
    validationData
  );
};
export const sliderReq = async (wholData) => {
  console.log(wholData);
  return await BulkInstance.post("vendor/banner", wholData);
};
export const getCategories = async (keyword) => {
  return await BulkInstance.get(`vendor/categories?keyword=${keyword}`);
};
export const getBanners = async () => {
  return await BulkInstance.get("vendor/banner");
};
export const getAprovedBanners = async () => {
  return await BulkInstance.get("vendor/banner/approved");
};
export const deleteBannerReq = async (id) => {
  console.log(id);
  return await BulkInstance.delete(`vendor/banner?request=${id}`);
};
export const stripepaymentbanner = async (amount) => {
  console.log(amount);
  return await BulkInstance.post("vendor/stripe", amount);
};
export const palypalPaymentBanner = async (amount) => {
  return await BulkInstance.post("vendor/paypal", amount);
};
export const paypalValidationforBanner = async (validationData) => {
  console.log(validationData, "<<<<<<<<<<<<<<<<<<<<<<<<<<<");
  return await BulkInstance.post("vendor/paypal/validation", validationData);
};
export const stripeValidationForBanner = async (validationData) => {
  console.log(validationData);
  return await BulkInstance.post("vendor/stripe/validation", validationData);
};
export const addSpcialDeal = async (formdata) => {
  console.log(formdata);
  return await BulkInstance.post("vendor/specialDeal", formdata);
};
export const getsearchProduct = async (search) => {
  return await BulkInstance.get(`vendor/products?search=${search}`);
};
export const getAllSpecialDeals = async () => {
  return await BulkInstance.get("vendor/specialDeal");
};
export const deleteDeals = async (product) => {
  console.log(product, "???????????");
  return await BulkInstance.delete(
    `vendor/specialDeal?product=${product}`,
    product
  );
};
export const getAlltodaypayout = async (page) => {
  return await BulkInstance.get(`admin/getPendingWallets${page}`);
};
export const addCoupons = async (data) => {
  return await BulkInstance.post("vendor/coupon", data);
};
export const getCoupons = async () => {
  return await BulkInstance.get("vendor/coupons");
};
export const blockOrUnblock = async (couponId) => {
  console.log(couponId);
  return await BulkInstance.put("vendor/coupon", { couponId: couponId });
};
export const adminAddCoupons = async (data) => {
  return await BulkInstance.post("admin/coupon", data);
};
export const adminGetCoupons = async (page) => {
  return await BulkInstance.get(`admin/coupons?page=${page}`);
};
export const adminBlockOrUnblock = async (couponId) => {
  console.log(couponId);
  return await BulkInstance.put("admin/coupon", { couponId: couponId });
};
export const aprovedPayOut = async (data) => {
  return await BulkInstance.post("admin/payWallet", data);
};
export const adminGetbannerReq = async (page) => {
  return await BulkInstance.get(`admin/getBannerRequest?page=${page}`);
};
export const adminGetApprovedbannerReq = async () => {
  return await BulkInstance.get(`admin/getBannerRequest?status=Approved`);
};
export const adminAprovebnrEeq = async (data) => {
  return await BulkInstance.post("admin/approveRequest", data);
};
export const adminDeleteBannerReq = async (data) => {
  return await BulkInstance.post("admin/rejectRequest", data);
};
export const getbyadminBanner = async (page) => {
  return await BulkInstance.get(`admin/banners?page=${page}`);
  // ?page=${page}
};
export const getAdminAllSection = async (name) => {
  return await BulkInstance.get(`admin/getAllSections?name=${name}`);
};
export const getAdminAllcategory = async (productname) => {
  return await BulkInstance.get(`admin/getAllCategories?name=${productname}`);
};
export const sentPushNotification = async (data) => {
  return await BulkInstance.post("admin/createNotification", data);
};
export const getAllNotification = async (page) => {
  return await BulkInstance.get(`admin/getAllNotifications?page=${page}`);
};
export const getAdminOrders = async (page, status) => {
  return await BulkInstance.get(`admin/getOrders/?status=${status}&page=${page}`);
  // if(selected == 'This Year'){
  //   return await BulkInstance.get("admin/getOrders/?filter=year");
  // }else if(selected == 'This Month'){
  //   return await BulkInstance.get("admin/getOrders/?filter=month");
  // }else if(selected == 'This Week'){
  //   return await BulkInstance.get("admin/getOrders/?filter=week");
};

export const getWalletHistory = async () => {
  return await BulkInstance.get("vendor/getCreditedWallet");
};
export const getVendorPayoutHistory = async () => {
  return await BulkInstance.get("vendor/payOutHistory");
};
export const getBalanceDetails = async () => {
  return await BulkInstance.get(`vendor/getWalletStatics?year=2024`);
};
// export const getAdminOrders = async () => {
//   return await BulkInstance.get("admin/getOrders");
// };

export const getVendorStats = async () => {
  return await BulkInstance.get("vendor/stats");
};
export const getVendorSalesAnalysis = async (selected) => {
  if (selected == "Current Year") {
    return await BulkInstance.get("vendor/salesAnalysis");
  } else {
    return await BulkInstance.get("vendor/salesAnalysis/?year=lastYear");
  }
};
export const getAdminGetStats = async () => {
  return await BulkInstance.get("admin/getOrderStatics");
};
export const getAdminDashboardData = async (selected) => {
  if (selected == "This Year") {
    return await BulkInstance.get("admin/dashboardDatas/?filter=year");
  } else if (selected == "This Month") {
    return await BulkInstance.get("admin/dashboardDatas/?filter=month");
  } else if (selected == "This Week") {
    return await BulkInstance.get("admin/dashboardDatas/?filter=week");
  }
};
export const getvendorTopSellingProducts = async (date) => {
  return await BulkInstance.get(`vendor/topProducts/?duration=${date}`);
};

export const getrevenueFirstSection = async () => {
  return await BulkInstance.get("admin/revenue/details");
};
export const geytgraphdataofRevenue = async (year) => {
  console.log(year);
  return await BulkInstance.get(`admin/revenue/analysis?year=${year}`);
};
export const getRevenueOrderDetails = async (orders) => {
  return await BulkInstance.get(`admin/revenue/orders?filter=${orders}`);
};
export const getCloudRevenue = async (cloud) => {
  return await BulkInstance.get(`admin/revenue/cloud?filter=${cloud}`);
};
export const getFlixRevenue = async (flix) => {
  return await BulkInstance.get(`admin/revenue/membership?filter=${flix}`);
};
export const specialDealrevenue = async (Spciel) => {
  console.log(Spciel, "??????????????????????");
  return await BulkInstance.get(`admin/revenue/specialDeals?filter=${Spciel}`);
};
export const getBannerRevenue = async (bannerkey) => {
  return await BulkInstance.get(`admin/revenue/banner?filter=${bannerkey}`);
};
export const getColorGraph = async (filter) => {
  return await BulkInstance.get(`admin/income/stats?filter=${filter}`);
};
export const getProductDetails = async (productId) => {
  return await BulkInstance.get(`vendor/product/${productId}`);
};
export const editProduct = async (data, productId) => {
  return await BulkInstance.put(`vendor/product/${productId}`, data);
};
export const deleteProduct = async (productId) => {
  return await BulkInstance.delete(`vendor/product/${productId}`);
};
export const getAdminCustomers = async (activeButton, page) => {
  if (activeButton == "Ecomers") {
    return await BulkInstance.get(`admin/getEcomCustomers?page=${page}`);
  } else if (activeButton == "Flicks") {
    return await BulkInstance.get(`admin/getFlixUsers?page=${page}`);
  }
};

export const addAdminBAnnerreq = async (data) => {
  console.log(data, "}}}}}}}}}}}}}}}}}}}}}}}}}}}}]");
  return await BulkInstance.post("admin/banner", data);
};
export const addAdminrepDelete = async (id) => {
  console.log(id);
  return await BulkInstance.delete(`admin/banner/${id}`);
};

export const getFlicksCategory = async () => {
  return await BulkInstance.get(`/flicks/categories`);
};
export const getFlicksConnects = async (category) => {
  return await BulkInstance.get(`flicks/flicksByCategory?category=${category}`);
};
export const addFlick = async (data) => {
  return await BulkInstance.post(`flicks`, data);
};
export const getGeners = async () => {
  return await BulkInstance.get(`flicks/genres`);
};
export const adminCloudRevenuetable = async (page) => {
  return await BulkInstance.get(`admin/cloudDetails?page=${page}`);
};
export const adminFlixTablerevenue = async (page) => {
  return await BulkInstance.get(`admin/membershipDetails?page=${page}`);
};
export const adminrevenueOreder = async (page) => {
  return await BulkInstance.get(`admin/orderDetails?page=${page}`);
};
export const adminrevenueSpesialDeals = async () => {
  return await BulkInstance.get("admin/specialDealsDetails");
};
export const adminrevenuebenner = async (page) => {
  return await BulkInstance.get(`admin/bannerDetails?page=${page}`);
};
export const adminRemindNotification = async (data) => {
  return await BulkInstance.post("admin/sendNotification", data);
};
export const deleteFlick = async (flicksId) => {
  return await BulkInstance.delete(`flicks?flick=${flicksId}`);
};

export const getFlicks = async (page) => {
  return await BulkInstance.get(`vendor/flicks?page=${page ? page : "1"}`);
};
export const flickOverView = async (flickId) => {
  return await BulkInstance.get(`vendor/flicks/${flickId}`);
};
export const vendorCostomersDemoGraph = async () => {
  return await BulkInstance.get("vendor/customers");
}
export const addSection = async (data) => {
  return await BulkInstance.post(`admin/section`, data);
}
export const getShipping = async () => {
  return await BulkInstance.get(`admin/getShippingCharge`);
}
export const updateShipping = async (data) => {
  return await BulkInstance.post(`admin/editShippingCharge`, data);
}
export const addShipping = async (data) => {
  return await BulkInstance.post(`admin/addShippingCharge`, data);
}

export const getDeliveryBoysAdmin = async () => {
  return await BulkInstance.get(`admin/showAllDeliveryBoys`);
};

export const actionOnDeliveryBoy = async (id) => {
  return await BulkInstance.put(`admin/blockActionDeliveryBoy`, { id: id });
};

export const addNewDeliveryBoy = async (data) => {
  return await BulkInstance.post(`admin/addPerson`, data);
};

export const editDeliveryBoy = async ({ boyId, name, email, profileImage, password  }) => {
  const data = { name, email, profileImage, password };
  console.log("editBank", data);
  return await BulkInstance.put(`admin/updateDeliveryBoyProfile/${boyId}`, data);
};

export const getOrderForAssigning = async () => {
  return await BulkInstance.get(`admin/getOrderForAssigning`);
};

export const assignOrders = async (data) => {
  console.log("assignOrders", data);
  return await BulkInstance.post(`admin/assignOrders`, data);
};

export const getAssignedOrdersAdmin = async () => {
  return await BulkInstance.get(`admin/getAssignedOrders`);
};

export const getReturnOrdersAdmin = async (status) => {
  return await BulkInstance.get(`admin/getReturnOrders?status=${status}`);
};

export const assignPickup = async (data) => {
  console.log("assignPickup", data);
  return await BulkInstance.post(`admin/assignPickup`, data);
};
export const adminGetSections=async()=>{
  return await BulkInstance.get(`admin/sections`);
}
export const adminAddSections=async(data)=>{
  return await BulkInstance.post(`admin/section`,data);
}
export const editCategory=async(id,data,role)=>{
  return await BulkInstance.put(`${role}/category/${id}`,data);
}
export const deleteCategory=async(id,role)=>{
  return await BulkInstance.delete(`${role}/category/${id}`);
}
export const getAdminSectionCategories = async (sectionId) => {
  console.log("secfsd", sectionId);
  return await BulkInstance.get(
    `admin/getSectionCategories?sectionId=${sectionId}`
  );
};
export const editSubCategory=async(id,data,role)=>{
  return await BulkInstance.put(`${role}/subCategory/${id}`,data);
}
export const deleteSubCategory=async(id,role)=>{
  return await BulkInstance.delete(`${role}/subCategory/${id}`);
}
export const editSection = async (id,data) => {
  return await BulkInstance.put(`admin/section/${id}`, data);
}
export const deleteSection = async (id) => {
  return await BulkInstance.delete(`admin/section/${id}`);
}
export const adminAddCategory = async (data) => {
  console.log("to category", data);
  return await BulkInstance.post(`admin/category`, data);
};
export const deleteShipping = async (data) => {
  return await BulkInstance.post(`admin/deleteShippingCharge`, data);
}
export const deleteCoupon = async (id,role) => {
  return await BulkInstance.delete(`${role}/coupon/${id}`);
};
export const getRefundRequest = async () => {
  return await BulkInstance.get(`admin/get-refund-request`);
};
export const payRefund = async (data) => {
  return await BulkInstance.post(`admin/pay-refund`, data);
}
export const refundRequest = async () => {
  return await BulkInstance.get(`admin/get-refund-history`);
}
