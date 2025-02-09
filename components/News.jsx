import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const News = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const API_KEY = "8b3ddd5dc13243b7a3648d23262820f2";
      const url = `https://newsapi.org/v2/everything?q=bitcoin&language=en&sortBy=publishedAt&pageSize=5&apiKey=${API_KEY}`;

      try {
        const response = await axios.get(url);
        if (response.data && response.data.articles) {
          setNews(response.data.articles);
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

  return (
    <div className="container mt-4">
      <div className="card shadow-lg">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Latest Bitcoin News</h2>
          {loading ? (
            <p className="text-primary text-center">Loading...</p>
          ) : error ? (
            <p className="text-danger text-center">{error}</p>
          ) : (
            <div className="list-group">
              {news.length === 0 ? (
                <p className="text-center">No news available.</p>
              ) : (
                news.map((item, index) => (
                  <div key={index} className="list-group-item">
                    <h5 className="mb-2">{item.title}</h5>
                    <p className="text-muted mb-1">
                      <strong>Source:</strong> {item.source.name}
                    </p>
                    <p className="mb-1">
                      <strong>Published:</strong> {new Date(item.publishedAt).toLocaleString()}
                    </p>
                    <p className="mb-2">{item.description}</p>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm">
                      Read more
                    </a>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default News;
