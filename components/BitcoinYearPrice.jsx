import { useState, useEffect } from "react";

function BitcoinPricePrediction() {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        const response = await fetch("https://training-2hyn.onrender.com/predict");
        if (!response.ok) throw new Error("Failed to fetch prediction");
        const data = await response.json();
        setPrediction(data.predicted_price);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrediction();
  }, []);

  return (
    <div>
      <h2>Bitcoin Price Prediction</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <h3>Predicted Price (2025): ${prediction.toFixed(2)}</h3>
      )}
    </div>
  );
}

export default BitcoinPricePrediction;
