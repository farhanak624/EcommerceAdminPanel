import React from "react"; // Ensure React is imported
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/pages/Home";
import AddFlick from "./components/pages/ventor/flicks/AddFlick";
import AddNewProducts from "./components/pages/ventor/Products/AddNewProducts";
import AllProducts from "./components/pages/ventor/Products/AllProducts";
import Wallet from "./components/pages/ventor/Wallet/Wallet";
import Orders from "./components/pages/ventor/Orders/OrdersPage";
import VibesAdd from "./components/pages/ventor/vibes/VibesAdd";
import AllVibesVides from "./components/pages/ventor/vibes/AllVibesVideos";
import VentorDashboard from "./components/pages/ventor/dasbord/VentorDashboard";
import Vendors from "./components/pages/admin/Vendors/VendMain.jsx";
import VendersOverview from "./components/pages/admin/Vendors/VenDetail";
import VendorRequestOverview from "./components/pages/admin/Vendors/VenOverview";
import Invoice from "./components/pages/ventor/Orders/Invoice";
import ProductDetailed from "./components/pages/ventor/Products/ProductDetailed";
import AdminHome from "./components/pages/AdminHome";
import AdminDashboard from "./components/pages/admin/adminDashboard/AdminDashboard.jsx";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import AllFlicks from "./components/pages/ventor/flicks/showallflicks/AllFlicks";
import Editflicks from "./components/pages/ventor/flicks/Editflicks";
import OverView from "./components/pages/ventor/flicks/OverView";
import VentorProfile from "./components/pages/profile/VentorProfile";
import ProfilePage from "./components/pages/ventor/Profile/ProfilePage";
import VentorOTP from "./components/pages/VentorOTP";
import CloudPage from "./components/pages/ventor/cloud/CloudPage";
import PaymentSccessPage from "./components/pages/successpage/PaymentSccessPage";
import VentorSlider from "./components/pages/ventor/ventorSlider/VentorSlider";
import { ToastContainer } from "react-toastify";
import Coupon from "./components/pages/ventor/Coupons/Coupon";
import SpecialDeels from "./components/pages/ventor/specialdeel/SpecialDeels";

import AdminSlider from "./components/pages/admin/AdminSlider/AdminSlider.jsx";
import TodayPayout from "./components/pages/admin/todayPayOut/TodayPayout.jsx";
import AdminCoupon from "./components/pages/admin/Coupon/AdminCoupon.jsx";
import PushNotification from "./components/pages/admin/pushNotification/PushNotification.jsx";
import SentNotificationpage from "./components/pages/admin/pushNotification/SentNotificationpage.jsx";
import Adminrevenue from "./components/pages/admin/revenue/Adminrevenue.jsx";
import AdminFlicks from "./components/pages/admin/Flicks/AdminFlicks.jsx";
import AdminAddFlick from "./components/pages/admin/Flicks/AdminAddFlick.jsx";
import AdminCloud from "./components/pages/admin/Cloud/AdminCloud.jsx";
import AdminAddCloud from "./components/pages/admin/Cloud/AdminAddCloud.jsx";
import EditProduct from "./components/pages/ventor/Products/EditProduct.jsx";
import AdminOrders from "./components/pages/admin/Orders/AdminOrders.jsx";
import AdminDeliveryBoys from "./components/pages/admin/DeliveryBoys/DeliveryBoys.jsx"
import AdminPrivateRoutes from "./components/PrivateRoutes/AdminPrivateRoute.jsx";
import VendorPrivateRoutes from "./components/PrivateRoutes/VendorPrivateRoutes.jsx";
import LoginCheck from "./components/PrivateRoutes/LoginCheck.jsx";
// import Customers from "./components/pages/admin/Customers/Customers.jsx";
import BlockedPage from "./components/pages/BlockedPage.jsx";
import ProcessingPage from "./components/pages/ProcessingPage.jsx";
import Customers from "./components/pages/admin/Customers/Customers.jsx";
import NotFound from "./components/pages/NotFound.jsx";
import BrandsSections from "./components/pages/admin/Brands&Sections/BrandsSections.jsx";
import SectionCategory from "./components/pages/ventor/SectionCategory/SectionCategory.jsx";
import ShippingCharge from "./components/pages/admin/Shipping/ShippingCharge.jsx";
import RefundPage from "./components/pages/admin/Refund/RefundPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="" element={<VendorPrivateRoutes />}>
          <Route path="/success" element={<PaymentSccessPage />} />
          <Route element={<Home />} path="/">
            <Route path="/" element={<VentorDashboard />} />
            <Route path="/AddProducts" element={<AddNewProducts />} />

            <Route path="/addFlick" element={<AddFlick />} />
            <Route path="/allflicks" element={<AllFlicks />} />
            <Route path="/editFlicks" element={<Editflicks />} />
            <Route path="/flicksoverview" element={<OverView />} />
            <Route path="/AllProducts" element={<AllProducts />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/addvibes" element={<VibesAdd />} />
            <Route path="/productDetailed" element={<ProductDetailed />} />
            <Route path="/Allvibesvideos" element={<AllVibesVides />} />
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/vendorsOverview/:id" element={<VendersOverview />} />
            <Route
              path="/vendorsRequestOverview/:id"
              element={<VendorRequestOverview />}
            />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/cloud" element={<CloudPage />} />
            {/* <Route path="/success" element={<PaymentSccessPage />} /> */}
            <Route path="/slider" element={<VentorSlider />} />
            <Route path="/coupon" element={<Coupon />} />
            <Route path="/editProduct" element={<EditProduct />} />
            <Route path="/specialdeals" element={<SpecialDeels />} />
            <Route path="/brands-and-sections" element={<SectionCategory />} />
          </Route>
        </Route>

        <Route path="" element={<AdminPrivateRoutes />}>
          <Route element={<AdminHome />} path="/admin">
            <Route path="/admin" element={<AdminDashboard />} />
            <Route
              path="/admin/pushNotification"
              element={<PushNotification />}
            />
            <Route path="/admin/sentpage" element={<SentNotificationpage />} />
            <Route path="/admin/slider" element={<AdminSlider />} />
            <Route path="/admin/todaypayout" element={<TodayPayout />} />
            <Route path="/admin/vendors" element={<Vendors />} />

            <Route path="/admin/customers" element={<Customers />} />
            <Route
              path="/admin/vendorsOverview/:id"
              element={<VendersOverview />}
            />
            <Route
              path="/admin/vendorsRequestOverview/:id"
              element={<VendorRequestOverview />}
            />
            <Route path="/admin/flicks" element={<AdminFlicks />} />
            <Route path="/admin/cloud" element={<AdminCloud />} />
            <Route path="/admin/addFlick" element={<AdminAddFlick />} />
            <Route path="/admin/addCloud" element={<AdminAddCloud />} />
            <Route path="/admin/revenue" element={<Adminrevenue />} />
            <Route path="/admin/coupon" element={<AdminCoupon />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/brands-and-sections" element={<BrandsSections />} />
            <Route path="/admin/deliveryBoys" element={<AdminDeliveryBoys />} />
            <Route path="/admin/shipping-charge" element={<ShippingCharge />} />
            <Route path="/admin/refund" element={<RefundPage />} />
          </Route>
        </Route>

        <Route path="" element={<LoginCheck />}>
          <Route element={<Signup />} path="/signup" />
          <Route element={<Login />} path="/login" />
          <Route element={<VentorOTP />} path="/verifyOTP" />
          <Route path="/addProfile" element={<VentorProfile />} />
        </Route>
        <Route path="/blocked" element={<BlockedPage />} />
        <Route path="/processing" element={<ProcessingPage />} />
        <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
