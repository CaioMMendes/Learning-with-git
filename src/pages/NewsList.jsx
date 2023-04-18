import React from "react";
import PageTitle from "../components/PageTitle";
const NewsList = ({ newsData }) => {
  return (
    <div className="containerCss">
      <PageTitle pageTitle="News" />
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
