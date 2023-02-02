import React from "react";
import styles from "../css/Loading.module.css";
const Loading = () => {
  return (
    <div>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Loading;
