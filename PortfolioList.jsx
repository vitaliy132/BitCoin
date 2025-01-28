import React from "react";

const PortfolioList = ({ portfolio, loading, error }) => {
  return (
    <div>
      <h1>CoinAPI Cryptocurrency Portfolio Tracker</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
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

export default PortfolioList;
