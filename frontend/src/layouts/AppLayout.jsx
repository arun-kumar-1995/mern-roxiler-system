import React from "react";
import Sidenav from "../components/Sidenav";
import "../styles/App.css";

const AppLayout = ({ children }) => {
  return <div className="app-container">{children}</div>;
};

export default AppLayout;
