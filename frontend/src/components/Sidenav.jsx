import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineHome } from "react-icons/md";
import { IoStatsChart } from "react-icons/io5";

const Sidenav = () => {
  return (
    <div className="sidenav">
      <nav>
        <Link to="/" title="home">
          <MdOutlineHome />
        </Link>
        <Link to="/stats" title="go stats">
          <IoStatsChart />
        </Link>
      </nav>
    </div>
  );
};

export default Sidenav;
