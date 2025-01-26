import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    async function fetchExchangeRates() {
      try {
        const assets = ["BTC", "ETH", "XRP"];
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
    }
    fetchExchangeRates();
  }, []);

  return (
    <div className="App">
      <h1>CoinAPI Cryptocurrency Portfolio Tracker App</h1>
      <ul>
        {Object.entries(portfolio).map(([asset, exchangeRate]) => (
          <li key={asset}>
            {asset}: {exchangeRate.toFixed(2)} USD
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
