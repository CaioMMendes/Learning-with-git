import React, { useEffect, useState } from "react";
import styles from "../css/ScrollToTop.module.css";
import { BsArrowDown } from "react-icons/bs";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  //   // When the user scrolls down 20px from the top of the document, show the button
  //   window.onscroll = function () {
  //     scrollFunction();
  //   };

  //   function scrollFunction() {
  //     if (
  //       document.body.scrollTop > 20 ||
  //       document.documentElement.scrollTop > 20
  //     ) {
  //       document.getElementById("myBtn").style.display = "block";
  //     } else {
  //       document.getElementById("myBtn").style.display = "none";
  //     }
  //   }

  const { pathname } = useLocation();

  // When the user clicks on the button, scroll to the top of the document
  const topFunction = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(topFunction, [pathname]);
  // useEffect(() => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // }, [pathname]);

  const [backToTopButton, setBackToTopButton] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 130
        ? setBackToTopButton(true)
        : setBackToTopButton(false);
    });
  }, []);

  return (
    <div>
      {" "}
      {backToTopButton && (
        <button
          onClick={topFunction}
          className={styles.button}
          id="myBtn"
          title="Go to top"
        >
          <span className={styles.arrow}>
            {" "}
            <BsArrowDown />
          </span>
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
