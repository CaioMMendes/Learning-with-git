import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";

const News = ({ newsData }) => {
  let { id } = useParams();
  let newss = newsData.find((news) => news.id == id);
  return (
    <div className="container">
      <h1>{newss.title}</h1>
      <p>{newss.content}</p>
    </div>
  );
};

export default News;
