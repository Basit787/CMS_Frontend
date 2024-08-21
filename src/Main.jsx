import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./components/SideBar";
const Main = () => {
  return (
    <SideBar>
      <Outlet />
    </SideBar>
  );
};

export default Main;
