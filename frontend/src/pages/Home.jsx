import React, { useState, useEffect, useMemo, Fragment } from "react";
import "../styles/Home.css";
import SelectInput from "../components/common/SelectInput";
import Button from "../components/common/Button";
import API from "../Api";
import Loader from "../components/common/Loader";
import { useToast } from "../contexts/ToastContext";
import { useAppContext } from "../contexts/AppContext";

const Home = () => {
  const { searchText, selectedMonth, priceRange } = useAppContext();

  const { onSuccess, onError } = useToast();
  const [loading, setIsLoading] = useState(false);
  const [pageData, setPageData] = useState({
    page: 1,
    perPage: 10,
    pages: "",
    total: "",
    docs: [],
  });

  // handles
  const handlePageChange = (e, field) => {
    setPageData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handlePageIncrement = () => {
    const MAX_PAGE = pageData.pages;
    setPageData((prev) => {
      if (prev.page === MAX_PAGE) return prev;
      return { ...prev, page: prev.page + 1 };
    });
  };

  const handlePageDecrement = () => {
    if (pageData.page == 1) return;
    setPageData((prev) => ({ ...prev, page: prev.page - 1 }));
  };

  const pageValue = useMemo(() => {
    return Array.from({ length: pageData.pages || 5 }, (_, index) => ({
      value: index + 1,
      label: index + 1,
    }));
  }, [pageData.pages]);

  const perPageValue = useMemo(() => {
    return Array.from({ length: 10 }, (_, index) => ({
      value: (index + 1) * 10,
      label: (index + 1) * 10,
    }));
  }, []);

  useEffect(() => {
    const fetchSeedData = async () => {
      setIsLoading(true);
      try {
        const response = await API.get(
          `/get-transaction?page=${pageData.page}&perPage=${pageData.perPage}&month=${selectedMonth}&search=${searchText}&p_min=${priceRange.minPrice}&p_max=${priceRange.maxPrice}`
        );
        if (response.status === 200) {
          const seedData = response.data.data;
          console.log(seedData);
          setPageData(seedData);
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);
        onError(err.message);
      }
    };

    fetchSeedData();
  }, [
    pageData.page,
    pageData.perPage,
    searchText,
    selectedMonth,
    priceRange.minPrice,
    priceRange.maxPrice,
  ]);

  return (
    <Fragment>
      <div className="transaction-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Sold</th>
              <th>Image</th>
            </tr>
          </thead>

          <tbody>
            {pageData.docs &&
              pageData.docs.map((doc) => (
                <tr key={doc._id}>
                  <td>{doc.id}</td>
                  <td>{doc.title}</td>
                  <td>{doc.description}</td>
                  <td>${doc.price}</td>
                  <td>{doc.category}</td>
                  <td>{doc.sold ? "Yes" : "No"}</td>
                  <td>
                    <img
                      src={doc.image}
                      alt="Product"
                      className="product-image"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className="table-controls">
          <SelectInput
            label="Page"
            id="page"
            value={pageData.page}
            onChange={handlePageChange}
            options={pageValue}
          />

          <SelectInput
            label="Per Page"
            id="perPage"
            value={pageData.perPage}
            onChange={handlePageChange}
            options={perPageValue}
          />

          <h3>Total :{pageData.total}</h3>

          <Button
            className="btn btn-prev"
            text="Prev"
            onClick={handlePageDecrement}
          />
          <Button
            className="btn btn-next"
            text="Next"
            onClick={handlePageIncrement}
          />
        </div>
      </div>

      {loading && <Loader />}
    </Fragment>
  );
};

export default Home;
