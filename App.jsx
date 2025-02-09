import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import News from "./components/News";
import Portfolio from "./components/Portfolio";
import BitcoinPricePrediction from "./components/BitcoinYearPrice";

const App = () => {
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Cryptocurrency Portfolio & News Tracker</h1>

      <div className="row">
        {/* Left Side: Portfolio + Bitcoin Predictor */}
        <div className="col-md-6">
          <Portfolio />
          <div className="mt-4">
            {" "}
            {/* Adds spacing between Portfolio & Predictor */}
            <BitcoinPricePrediction />
          </div>
        </div>

        {/* Right Side: News */}
        <div className="col-md-6">
          <News />
        </div>
      </div>
    </div>
  );
};

export default App;
