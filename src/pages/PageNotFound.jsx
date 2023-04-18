import React from "react";
import styles from "../css/pagesStyles/PageNotFound.module.css";
import PageTitle from "../components/PageTitle";

const PageNotFound = () => {
  return (
    <div className="containerCss">
      <PageTitle pageTitle="Page Not Found" />
      <div className={styles.tudo}>
        <h1>404</h1>
        <h1>Page Not Found</h1>
      </div>
    </div>
  );
};

export default PageNotFound;
