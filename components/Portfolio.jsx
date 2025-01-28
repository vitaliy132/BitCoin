import React, { useState, useEffect } from "react";
import axios from "axios";

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const assets = ["BTC", "ETH", "XRP"];
  const refreshInterval = 5000;

  const fetchExchangeRates = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRates();
    const intervalId = setInterval(fetchExchangeRates, refreshInterval);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h2>Portfolio</h2>
      {loading && <p>Loading portfolio...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && Object.keys(portfolio).length === 0 && !error && (
        <p>No portfolio data available.</p>
      )}
      {Object.keys(portfolio).length > 0 && (
        <ul className="list-group">
          {Object.entries(portfolio).map(([asset, exchangeRate]) => (
            <li key={asset} className="list-group-item d-flex justify-content-between">
              <strong>{asset}</strong> <span>{exchangeRate.toFixed(2)} USD</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Portfolio;
