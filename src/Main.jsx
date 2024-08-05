import React from "react";
import SideBar from "./components/SideBar";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { Outlet } from "react-router-dom";
const Main = () => {
  return (
    <SideBar>
      <Outlet />
    </SideBar>
  );
};

export default Main;
