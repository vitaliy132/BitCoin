import React, { useEffect, useState } from "react";
import axios from "axios";

const News = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const url = "https://cryptonews-api.com/api/v1";
      const params = {
        tickers: "BTC",
        items: 3,
        page: 1,
        token: process.env.REACT_APP_CRYPTO_NEWS_API_TOKEN,
      };

      try {
        const response = await axios.get(url, { params });
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
    <div>
      <h1>Latest News</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {news.map((item, index) => (
            <li key={index}>
              <h2>{item.title}</h2>
              <p>
                <strong>Source:</strong> {item.source_name}
              </p>
              <p>
                <strong>Published:</strong> {item.date}
              </p>
              <a href={item.news_url} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default News;
