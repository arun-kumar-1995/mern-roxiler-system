import { Link } from "react-router-dom";
import { IoStatsChart } from "react-icons/io5";

const Header = () => {
  return (
    <header>
      <div className="header-container">
        <div className="header-logo">
          <Link to="/">Roxiler System</Link>
        </div>
        <div className="search header-section">
          <input type="text" placeholder="search.." />
        </div>
        <div className="month-filter header-section">
          <label htmlFor="month">Month </label>
          <select name="" id="">
            <option value="1">January</option>
          </select>
        </div>

        <div className="price-filter header-section">
          <div className="min-price">
            <label htmlFor="price">Min price</label>
            <select name="" id=""></select>
          </div>
          <div className="max-price">
            <label htmlFor="price">Max price</label>
            <select name="" id=""></select>
          </div>
        </div>

        <Link to="/stats" title="go stats" className="btn btn-stats">
          <span>Statitics</span>
          <IoStatsChart />
        </Link>
      </div>
    </header>
  );
};

export default Header;
