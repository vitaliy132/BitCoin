import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [portfolio, setPortfolio] = useState({});
  const refreshInterval = 5000;

  const fetchExchangeRates = async () => {
    const assets = ["BTC", "ETH", "XRP"];
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
      console.error("Error fetching exchange rates:", error);
    }
  };

  useEffect(() => {
    fetchExchangeRates();
    const intervalId = setInterval(fetchExchangeRates, refreshInterval);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="App">
      <h1>CoinAPI Cryptocurrency Portfolio Tracker</h1>
      <ul>
        {Object.entries(portfolio).map(([asset, exchangeRate]) => (
          <li key={asset}>
            {asset}: {exchangeRate ? exchangeRate.toFixed(2) : "Loading..."} USD
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
