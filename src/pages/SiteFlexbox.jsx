import React from "react";
import styles from "../css/pagesStyles/SiteFlexbox.module.css";
import { BsArrowLeft } from "react-icons/bs";
import logo from "../img/logoSite.svg";
import PageTitle from "../components/PageTitle";

const SiteFlexbox = () => {
  return (
    <div className={styles.tudo}>
      <PageTitle pageTitle="Site flexbox" />
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <img src={logo} alt="" />
        </div>
        <div className={styles.menuNavbar}>
          <button>HOME</button>
          <button>BLOG</button>
          <button>PAGES</button>
          <button>DEPARTMENTS</button>
          <button>TIMETABLE</button>
          <button>GALLERY</button>
          <button>CONTACT</button>
        </div>
      </div>
      {/* parte do meio */}
      <div className={styles.backgroundMiddle}>
        <div className={styles.container}>
          <div className={styles.stringMiddle}>
            <h1>Lorem, ipsum dolor.</h1>{" "}
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Architecto, iure!
            </p>
          </div>
          <div className={styles.boxMiddle}>
            <div className={styles.linhaMiddle}></div>
            <div className={styles.box1}>
              <h1>Lorem, ipsum.</h1>
              <div className={styles.linha1}>1</div>{" "}
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima
                et nulla iste ipsum natus aspernatur?
              </p>
            </div>
            <div className={styles.box2}>
              <h1>Lorem, ipsum.</h1>
              <div className={styles.linha2}>2</div>{" "}
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima
                et nulla iste ipsum natus aspernatur?
              </p>
              <button>
                Read More <BsArrowLeft className={styles.icon} />
              </button>
            </div>
            <div className={styles.box3}>
              <h1>Lorem, ipsum.</h1>
              <div className={styles.linha3}>3</div>
              <div className={styles.box3Texto}>
                <p>Lorem, ipsum. </p> <p>8:00 - 17:00 </p>
              </div>
              <div className={styles.box3Texto}>
                <p>Lorem, ipsum. </p> <p>8:00 - 17:00 </p>
              </div>
              <div className={styles.box3Texto}>
                <p>Lorem, ipsum. </p> <p>8:00 - 17:00 </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.newsTitle}>
          <p>
            Latest news <div className={styles.lineBlue}></div>
          </p>
          <p>
            Departments <div className={styles.lineBlue}></div>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SiteFlexbox;
