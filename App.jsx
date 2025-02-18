import React from "react";
import News from "./components/News";
import Portfolio from "./components/Portfolio";
import BitcoinPricePrediction from "./components/BitcoinYearPrice";
import "./App.css";

const Navbar = () => {
  return (
    <nav>
      <h1>Crypto Tracker</h1>
      <div>
        <BitcoinPricePrediction />
      </div>
    </nav>
  );
};

const App = () => {
  return (
    <div>
      <Navbar />
      <div>
        <div>
          <Portfolio />
        </div>
        <div>
          <News />
        </div>
      </div>
    </div>
  );
};

export default App;
