import React, { useState, useEffect } from "react";
import axios from "axios";
import PortfolioList from "./PortfolioList";
import "./App.css";
const App = () => {
  const [portfolio, setPortfolio] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const refreshInterval = 5000;
  const assets = ["BTC", "ETH", "XRP"];

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
      setError("Error fetching data. Please try again later.");
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
    <div className="App">
      <PortfolioList portfolio={portfolio} loading={loading} error={error} />
    </div>
  );
};

export default App;
