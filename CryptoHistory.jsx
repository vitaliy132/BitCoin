import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CryptoHistory = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCryptoHistory = async () => {
    try {
      const response = await fetch(
        new Request("https://api.livecoinwatch.com/coins/single/history", {
          method: "POST",
          headers: new Headers({
            "content-type": "application/json",
            "x-api-key": "48fd681e-f8f1-4fa3-81a3-0c01989596bf",
          }),
          body: JSON.stringify({
            currency: "USD",
            code: "BTC",
            start: 1617035100000, // Replace with desired start timestamp
            end: 1617035400000, // Replace with desired end timestamp
            meta: true,
          }),
        }),
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoHistory();
  }, []);

  // Prepare data for the chart
  const chartData = {
    labels: data?.history.map((point) => new Date(point.date).toLocaleTimeString()) || [],
    datasets: [
      {
        label: "Bitcoin Price (USD)",
        data: data?.history.map((point) => point.rate) || [],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && (
        <div>
          <h1>Bitcoin Price History</h1>
          <Line
            data={chartData}
            options={{ responsive: true, plugins: { legend: { position: "top" } } }}
          />
        </div>
      )}
    </div>
  );
};

export default CryptoHistory;
