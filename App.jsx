import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

const App = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch data using Axios
  const fetchCryptoData = async () => {
    try {
      const response = await axios.post(
        "https://api.livecoinwatch.com/coins/single",
        {
          currency: "USD",
          code: "ETH",
          meta: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "48fd681e-f8f1-4fa3-81a3-0c01989596bf", // Replace with your LiveCoinWatch API key
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  useEffect(() => {
    const loadChartData = async () => {
      try {
        const data = await fetchCryptoData();
        // Set up the chart data
        setChartData({
          labels: ["1 Hour", "1 Day", "1 Week", "1 Month", "1 Year"],
          datasets: [
            {
              label: "Price Change (%)",
              data: [
                (data.delta.hour - 1) * 100,
                (data.delta.day - 1) * 100,
                (data.delta.week - 1) * 100,
                (data.delta.month - 1) * 100,
                (data.delta.year - 1) * 100,
              ],
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 2,
              pointBackgroundColor: "rgba(54, 162, 235, 1)",
            },
          ],
        });
        setLoading(false);
      } catch (error) {
        console.error("Error setting chart data:", error);
      }
    };

    loadChartData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ width: "600px", margin: "0 auto" }}>
      <h1>Ethereum Price Change (%)</h1>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { display: true, position: "top" },
          },
        }}
      />
    </div>
  );
};

export default App;
