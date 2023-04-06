import React from "react";
import styles from "../../css/componentsStyles/Button.module.css";
const Button = ({ children, onClick, className }) => {
  return (
    <button className={`${styles.addButton} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
