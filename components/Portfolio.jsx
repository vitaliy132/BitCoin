import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState({});
  const [error, setError] = useState(null);
  const assets = ["BTC", "ETH", "XRP"];
  const refreshInterval = 5000;

  const fetchExchangeRates = async () => {
    setError(null);
    try {
      const promises = assets.map((asset) =>
        axios.get(
          `https://rest.coinapi.io/v1/exchangerate/${asset}/USD?apikey=c7792603-9a9a-4a59-8bd6-e3335c2fd98f`,
        ),
      );
      const responses = await Promise.all(promises);
      const exchangeRates = responses.reduce((acc, response, index) => {
        acc[assets[index]] = response.data.rate;
        return acc;
      }, {});
      setPortfolio(exchangeRates);
    } catch (error) {
      setError("Error fetching exchange rates. Please try again later.");
    }
  };

  useEffect(() => {
    fetchExchangeRates();
    const intervalId = setInterval(fetchExchangeRates, refreshInterval);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container mt-4">
      <div className="card shadow-lg p-3 mb-5 bg-white rounded">
        <div className="card-body">
          <h2 className="card-title text-center mb-3">Crypto Portfolio</h2>
          {error && <p className="text-danger text-center">{error}</p>}
          <div className="portfolio-list">
            {Object.keys(portfolio).length === 0 ? (
              <p className="text-center text-muted">No portfolio data available.</p>
            ) : (
              <ul className="list-group">
                {Object.entries(portfolio).map(([asset, exchangeRate]) => (
                  <li
                    key={asset}
                    className="list-group-item d-flex justify-content-between align-items-center">
                    <strong>{asset}</strong>
                    <span className="badge bg-primary fs-6">{exchangeRate.toFixed(2)} USD</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
