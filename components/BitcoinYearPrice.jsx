import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function BitcoinPricePrediction() {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/predict");
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
    <div className="container mt-4">
      <div className="card text-center shadow-lg">
        <div className="card-body">
          <h2 className="card-title">Bitcoin Price Prediction</h2>
          {loading ? (
            <p className="text-primary">Loading...</p>
          ) : error ? (
            <p className="text-danger">Error: {error}</p>
          ) : (
            <h3 className="text-success">Predicted Price (2025): ${prediction.toFixed(2)}</h3>
          )}
        </div>
      </div>
    </div>
  );
}

export default BitcoinPricePrediction;
