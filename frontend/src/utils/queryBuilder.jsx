import React from "react";
import { useAppContext } from "../contexts/AppContext";

const useQueryBuilder = (endpoint, page, perPage) => {
  const { searchText, selectedMonth, priceRange } = useAppContext();

  let query = endpoint;

  if (page) {
    query += `&page=${page}`;
  }

  if (perPage) {
    query += `&perPage=${perPage}`;
  }

  if (selectedMonth) {
    query += `&month=${selectedMonth}`;
  }
  if (searchText) {
    query += `&search=${encodeURIComponent(searchText)}`;
  }

  if (priceRange.minPrice > 0) {
    query += `&p_min=${priceRange.minPrice}`;
  }

  if (priceRange.maxPrice > 0) {
    query += `&p_max=${priceRange.maxPrice}`;
  }
  console.log("Query--------", query);
  return query;
};

export default useQueryBuilder;
