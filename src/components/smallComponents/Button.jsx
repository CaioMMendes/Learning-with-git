import React from "react";
import styles from "../../css/componentsStyles/Button.module.css";
const Button = ({ children, onClick }) => {
  return (
    <div>
      <button className={styles.addButton} onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

export default Button;
