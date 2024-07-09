import React from "react";
import AdminSideBar from "./AdminSideBar";
import TopNav from "../TopNav";
import { Outlet } from "react-router-dom";
import SpinningLoader from "../../LodingDiv/SpinningLoader";

function AdminLayout() {
  return (
    <div className="flex flex-col sm:flex-row min-h-screen ">
      <AdminSideBar />
      <div className="flex-1">
        <TopNav />
        <main className="p-6 sm:ml-[300px] ml-0 ">
          <Outlet />
        </main>
      </div>
      <SpinningLoader />
    </div>
  );
}

export default AdminLayout;
