import React, { useState, memo, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { IoStatsChart } from "react-icons/io5";
import SelectInput from "./common/SelectInput";

const Header = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(3);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const handleSearchChange = (e) => setSearchText(e.target.value);

  const handleMonthChange = (e) => setSelectedMonth(e.target.value);

  const handleMinPriceChange = (e) => setMinPrice(e.target.value);

  const handleMaxPriceChange = (e) => setMaxPrice(e.target.value);

  const HeaderLogo = () => {
    return (
      <div className="header-logo">
        <Link to="/">Roxiler System</Link>
      </div>
    );
  };

  const StatsLink = () => {
    return (
      <Link to="/stats" title="go stats" className="btn btn-stats">
        <span>Statitics</span>
        <IoStatsChart />
      </Link>
    );
  };

  const SearchText = ({ searchText, onSearchChange }) => {
    return (
      <div className="search header-section">
        <input
          type="text"
          placeholder="search.."
          value={searchText}
          onChange={onSearchChange}
        />
      </div>
    );
  };

  const monthOptions = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const priceOptions = [{ value: 1, label: 1 }];
  return (
    <header>
      <div className="header-container">
        <HeaderLogo />
        <SearchText
          searchText={searchText}
          onSearchChange={handleSearchChange}
        />
        <SelectInput
          label="Month"
          id="month"
          value={selectedMonth}
          onChange={handleMonthChange}
          options={monthOptions}
        />

        <div className="price-filter header-section">
          <SelectInput
            label="Min price"
            id="min-price"
            value={minPrice}
            onChange={handleMinPriceChange}
            options={priceOptions}
          />

          <SelectInput
            label="Max price"
            id="max-price"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            options={priceOptions}
          />
        </div>

        <StatsLink />
      </div>
    </header>
  );
};

export default Header;
