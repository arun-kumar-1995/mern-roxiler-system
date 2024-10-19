import React, { useState, memo, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { IoStatsChart } from "react-icons/io5";
import SelectInput from "./common/SelectInput";
import { useAppContext } from "../contexts/AppContext";

const Header = () => {
  const {
    searchText,
    setSearchText,
    selectedMonth,
    setSelectedMonth,
    priceRange,
    setPriceRange,
  } = useAppContext();

  const handleSearchChange = (e) => setSearchText(e.target.value);
  const handleMonthChange = (e) => setSelectedMonth(e.target.value);

  const handlePriceChange = (e, field) => {
    setPriceRange((prev) => ({ ...prev, [field]: e.target.value }));
  };

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

  const priceOptions = useMemo(() => {
    return Array.from({ length: 25 }, (_, index) => ({
      value: (index + 1) * 10,
      label: (index + 1) * 10,
    }));
  }, []);

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
            id="minPrice"
            value={priceRange.minPrice}
            onChange={handlePriceChange}
            options={priceOptions}
          />

          <SelectInput
            label="Max price"
            id="maxPrice"
            value={priceRange.maxPrice}
            onChange={handlePriceChange}
            options={priceOptions}
          />
        </div>

        <StatsLink />
      </div>
    </header>
  );
};

export default Header;
