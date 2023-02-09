import React from "react";

const NewsList = ({ newsData }) => {
  return (
    <div className="container">
      <ul>
        {newsData.map((news) => (
          <li key={news.id}>
            <a href={`/news/${news.id}`}>{news.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsList;
