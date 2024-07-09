import { Navigate, Outlet } from "react-router-dom";

const AdminPrivateRoutes = () => {
  const user = JSON.parse(localStorage.getItem("encryptedToken"));

  return user?.role === "admin" ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminPrivateRoutes;

// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";

// function LoggedInUser() {
//   const user = JSON.parse(localStorage.getItem("sophwe_token"));

//   return user?.user_role == "Admin" ? (
//     <Navigate to="/dashboard" />
//   ) : user?.user_role == "DOCTOR" ? (
//     <Navigate to="/doctor/overview" />
//   ) : (
//     <Outlet />
//   );
// }

// export default LoggedInUser;

// const LoginUser = (e) => {
//     e.preventDefault();
//     setErrmsg("");
//     const form = new FormData(e.target);
//     const UserData = Object.fromEntries(form.entries());

//     const apiCall = selectedOption === "Admin" ? LoginUserdata : DoctorLogInApi;
//     apiCall(UserData)
//       .then((data) => {
// console.log(data);

// if(data.data.data.user_role==="Admin"||data.data.data.user_role==="DOCTOR"){

//   localStorage.setItem("sophwe_token", JSON.stringify(data.data.data));
//   if (selectedOption === "Admin") {
//     requestForToken();
//   }

//   const redirectPath =
//     selectedOption === "Admin" ? "/" : "/doctor/overview";
//   navigate(redirectPath);
// }
// else{
//   setErrmsg("Email or password is incorrect");

// }

//       })
//       .catch((err) => {
//         setErrmsg("Email or password is incorrect");
//       })
//       .finally(() => setIsLoading(false));
//   };
