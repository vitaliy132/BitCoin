import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import News from "./components/News";
import Portfolio from "./components/Portfolio";
const App = () => {
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Cryptocurrency Portfolio and News Tracker</h1>
      <div className="row">
        {/* Portfolio Component */}
        <div className="col-md-6">
          <Portfolio />
        </div>

        {/* News Component */}
        <div className="col-md-6">
          <News />
        </div>
      </div>
    </div>
  );
};

export default App;
