import { Navigate, Outlet } from "react-router-dom";


const VendorPrivateRoutes = () => {
    const user = JSON.parse(localStorage.getItem("encryptedToken"));
    // const user = localStorage.getItem("encryptedToken");

    
    return user?.role === "vendor" ? (
        <Outlet />
      ) : (
        <Navigate to="/login" />
      );

}

export default VendorPrivateRoutes;





