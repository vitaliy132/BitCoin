import React, { useEffect, useState } from "react";
import axios from "axios";

const News = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const API_KEY = "8b3ddd5dc13243b7a3648d23262820f2"; // Your actual NewsAPI key
      const url = `https://newsapi.org/v2/everything?q=bitcoin&language=en&sortBy=publishedAt&pageSize=5&apiKey=${API_KEY}`;

      try {
        const response = await axios.get(url);
        if (response.data && response.data.articles) {
          setNews(response.data.articles); // NewsAPI returns articles under 'articles'
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
      <h2 className="text-center mb-4">Latest Bitcoin News</h2>
      {error && <p className="text-danger">{error}</p>}
      <div className="list-group">
        {news.length === 0 ? (
          <p>No news available.</p>
        ) : (
          news.map((item, index) => (
            <div key={index} className="list-group-item">
              <h5>{item.title}</h5>
              <p className="text-muted">
                <strong>Source:</strong> {item.source.name}
              </p>
              <p>
                <strong>Published:</strong> {item.publishedAt}
              </p>
              <p>{item.description}</p>
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
    </div>
  );
};

export default News;
