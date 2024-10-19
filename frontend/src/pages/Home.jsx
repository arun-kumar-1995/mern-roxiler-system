import React, { useState, useEffect, useMemo, Fragment } from "react";
import "../styles/Home.css";
import SelectInput from "../components/common/SelectInput";
import Button from "../components/common/Button";
import API from "../Api";
import Loader from "../components/common/Loader";
import { useToast } from "../contexts/ToastContext";
const Home = () => {
  const [loading, setIsLoading] = useState(false);
  const [transactionData, setTransactionData] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const { onSuccess, onError } = useToast();

  // handles
  const handlePageChange = (e) => setPage(e.target.value);

  const handlePerPageChange = (e) => setPerPage(e.target.value);

  const handlePageIncrement = () => setPage((prev) => prev + 1);

  const handlePageDecrement = () => setPage((next) => next - 1);

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

  useEffect(() => {
    const fetchSeedData = async () => {
      setIsLoading(true);
      try {
        const response = await API.get(`/get-transaction?month=${1}`);
        if (response.status === 200) {
          const seedData = response.data.data;
          console.log(seedData);
          setTransactionData(seedData);
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);
        onError(err.message);
      }
    };

    fetchSeedData();
  }, [page, perPage]);

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

          <h3>Total :{60}</h3>

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
