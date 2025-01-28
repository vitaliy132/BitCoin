import React, { useEffect, useState } from "react";
import axios from "axios";

const News = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const url =
        "https://cryptonews-api.com/api/v1?tickers=BTC&items=3&page=1&token=0ujxuqpuhzlwv9ulp6aqen02hskzdbf5w0bzk4iy";
      try {
        const response = await axios.get(url);
        if (response.data && response.data.data) {
          setNews(response.data.data);
        } else {
          setError("No news data available.");
        }
      } catch (err) {
        setError("An error occurred while fetching the news.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Latest News</h2>
      {error && <p className="text-danger">{error}</p>}
      <div className="list-group">
        {news.length === 0 ? (
          <p>No news available.</p>
        ) : (
          news.map((item, index) => (
            <div key={index} className="list-group-item">
              <h5>{item.title}</h5>
              <p className="text-muted">
                <strong>Source:</strong> {item.source_name}
              </p>
              <p>
                <strong>Published:</strong> {item.date}
              </p>
              <p>{item.description}</p>
              <a
                href={item.news_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm">
                Read more
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default News;
