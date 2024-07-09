// Layout.js
import React from "react";
import { Outlet } from "react-router-dom";
import TopNav from "./TopNav";
import SideBar from "./SideBar";
import SpinningLoader from "../LodingDiv/SpinningLoader";

const Layout = () => (
  <div className="flex flex-col sm:flex-row min-h-screen ">
    <SideBar />
    <div className="flex-1">
      <TopNav />
      <main className="p-6 sm:ml-[300px] ml-0 ">
        <Outlet />
      </main>
    </div>
    <SpinningLoader/>
  </div>
);

export default Layout;
