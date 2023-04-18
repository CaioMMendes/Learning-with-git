import React from "react";
import Slide from "../components/Slide";
import Slide2 from "../components/Slide2";
import PageTitle from "../components/PageTitle";
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
    <div className="containerCss">
      <PageTitle pageTitle={`News ${id}`} />
      <h1>{newss.title}</h1>
      <p>{newss.content}</p>
      <Slide />
      <Slide2 />
    </div>
  );
};

export default News;
