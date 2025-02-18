import React, { useState, useEffect } from "react";
import axios from "axios";

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
    <div>
      <h2>Crypto Portfolio</h2>
      {error && <p>{error}</p>}
      <div>
        {Object.keys(portfolio).length === 0 ? (
          <p>No portfolio data available.</p>
        ) : (
          <ul>
            {Object.entries(portfolio).map(([asset, exchangeRate]) => (
              <li key={asset}>
                <strong>{asset}</strong>: {exchangeRate.toFixed(2)} USD
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
