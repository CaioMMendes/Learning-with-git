import React from "react";
import Slide from "../components/Slide";
import Slide2 from "../components/Slide2";
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
      <Slide />
      <Slide2 />
    </div>
  );
};

export default News;
