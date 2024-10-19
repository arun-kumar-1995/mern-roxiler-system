import React, { Fragment, useEffect, useState } from "react";
import API from "../Api";

import { useToast } from "../contexts/ToastContext";
import SelectInput from "../components/common/SelectInput";

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

const Statistics = ({ data, statsMonth, handleStatsMonth }) => {
  if (!data) return <div> Loading...</div>;
  const { totalSales, totalSoldItems, totalUnSoldItems } = data;

  return (
    <div className="sales-stats statitics">
      {data && (
        <Fragment>
          <div className="stats-header">
            <h2>Statitics</h2>

            <SelectInput
              label="Month"
              id="month"
              value={statsMonth}
              onChange={handleStatsMonth}
              options={monthOptions}
            />
          </div>
          <div className="stats-wrapper">
            <ul>
              <li>
                <p>Total Sale: ${totalSales}</p>
              </li>
              <li>
                <p>Total Sold Items: {totalSoldItems}</p>
              </li>
              <li>
                <p>Total Unsold Items: {totalUnSoldItems}</p>
              </li>
            </ul>
          </div>
        </Fragment>
      )}
    </div>
  );
};

const BarGraph = ({ data, barMonth, handleBarMonth }) => {
  if (!data) return <div>loading ..</div>;
  const maxCount = Math.max(...data.barChartData.map((item) => item.count));
  const step = 5;

  // Y-axis labels calculation
  const yAxisLabels = Array.from(
    { length: Math.ceil(maxCount / step) },
    (_, index) => maxCount - index * step
  );

  return (
    <div className="bar-graph statitics">
      <div className="stats-header">
        <h2>Bar Graph Chart</h2>

        <SelectInput
          label="Month"
          id="month"
          value={barMonth}
          onChange={handleBarMonth}
          options={monthOptions}
        />
      </div>

      <div className="bar-chart-container">
        <div className="bar-chart-wrapper">
          <div className="y-axis-label">
            {yAxisLabels.map((label, index) => (
              <div className="y-axis" data-count={label} key={index}></div>
            ))}
          </div>
          <div className="bar-chart">
            {data &&
              data.barChartData.map((item, index) => (
                <div
                  key={index}
                  className="bar-item"
                  data-label={item.count}
                  style={{ height: `${(item.count / maxCount) * 100}%` }}
                >
                  <div className="bar" data-range={item.range}></div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Stats = () => {
  const { onError } = useToast();
  const [statsData, setStatsData] = useState(null);
  const [barChartData, setBarChartData] = useState(null);

  const [statsMonth, setStatsMonth] = useState(3);
  const [barMonth, setBarMonth] = useState(3);

  const handleStatsMonth = (e, field) => {
    setStatsMonth(e.target.value);
  };

  const handleBarMonth = (e) => {
    setBarMonth(e.target.value);
  };

  useEffect(() => {
    const getStats = async () => {
      try {
        const response = await API.get(`/getStats?month=${statsMonth}`);

        if (response.status === 200) {
          setStatsData(response.data.data);
        }
      } catch (err) {
        onError(err.message);
      }
    };

    const barChartStats = async () => {
      try {
        const response = await API.get(`/bar-chart-stats?month=${barMonth}`);

        if (response.status === 200) {
          console.log(response.data.data);
          setBarChartData(response.data.data);
        }
      } catch (err) {
        onError(err.message);
      }
    };

    getStats();
    barChartStats();
  }, [statsMonth, barMonth]);
  return (
    <div className="stats-container">
      <Statistics
        data={statsData}
        statsMonth={statsMonth}
        handleStatsMonth={handleStatsMonth}
      />
      <BarGraph
        data={barChartData}
        barMonth={barMonth}
        handleBarMonth={handleBarMonth}
      />
    </div>
  );
};

export default Stats;
