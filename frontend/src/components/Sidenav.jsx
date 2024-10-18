import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineHome } from "react-icons/md";
import { IoStatsChart } from "react-icons/io5";

const Sidenav = () => {
  return (
    <nav>
      <Link to="/">
        <MdOutlineHome />
      </Link>
      <Link to="/stats">
        <IoStatsChart />
      </Link>
    </nav>
  );
};

export default Sidenav;
