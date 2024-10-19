import React, { createContext, useContext, useState } from "react";

// create app context
const AppContext = createContext();

// create app provider

const AppProvider = ({ children }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(3);
  const [priceRange, setPriceRange] = useState({ minPrice: 0, maxPrice: 0 });

  return (
    <AppContext.Provider
      value={{
        searchText,
        setSearchText,
        selectedMonth,
        setSelectedMonth,
        priceRange,
        setPriceRange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export default AppProvider;
