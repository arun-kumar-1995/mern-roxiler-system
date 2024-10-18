import React, { useCallback, useState, useMemo } from "react";
import "../styles/Home.css";
import SelectInput from "../components/common/SelectInput";
import Button from "../components/common/Button";

const Home = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPagePage] = useState(10);

  const handlePageChange = useCallback((e) => {
    setPage(e.target.value);
  }, []);

  const handlePerPageChange = useCallback((e) => {
    setPagePage(e.target.value);
  }, []);

  const pageValue = useMemo(() => {
    return Array.from({ length: 10 }, (_, index) => ({
      value: index + 1,
      label: index + 1,
    }));
  }, []);

  const perPageValue = useMemo(() => {
    return Array.from({ length: 10 }, (_, index) => ({
      value: (index + 1) * 10,
      label: (index + 1) * 10,
    }));
  }, []);

  return (
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
          {/* Sample rows */}
          <tr>
            <td>1</td>
            <td>Product 1</td>
            <td>Lorem ipsum dolor sit amet</td>
            <td>$100</td>
            <td>Electronics</td>
            <td>Yes</td>
            <td>
              <img src="image_url" alt="Product" className="product-image" />
            </td>
          </tr>
        </tbody>
      </table>

      <div className="table-controls">
        <SelectInput
          label="Page"
          id="page"
          value={page}
          onChange={handlePageChange}
          options={pageValue}
        />

        <SelectInput
          label="Per Page"
          id="per-page"
          value={perPage}
          onChange={handlePerPageChange}
          options={perPageValue}
        />

        <Button className="btn btn-prev" text="Prev" />
        <Button className="btn btn-next" text="Next" />
      </div>
    </div>
  );
};

export default Home;
