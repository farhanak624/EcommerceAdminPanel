import { Navigate, Outlet } from "react-router-dom";


const loginCheck = () => {
    const user = JSON.parse(localStorage.getItem("encryptedToken"));

      return user?.role == "admin" ? (
        <Navigate to="/admin" />
      ) : user?.role == "vendor" ? (
        <Navigate to="/" />
      ) : (
        <Outlet />
      );
}

export default loginCheck;


