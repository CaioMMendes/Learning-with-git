import React from "react";
import styles from "../css/componentsStyles/NavbarUser.module.css";
import { useState, useEffect, useRef } from "react";
import { BsFillGearFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { GiPadlock } from "react-icons/gi";

const NavbarUser = () => {
  function useOnClickOutside(ref, handler) {
    useEffect(() => {
      const listener = (event) => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    }, [ref, handler]);
  }
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <div ref={ref} className={styles.user}>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <div className={styles.userBackground}>
          <FaUser className={styles.userIcon} />
        </div>
      </button>
      <div className={`${styles.dropdown} ${isOpen ? styles.open : ""}`}>
        <button>
          <span>
            <FaUser /> Profile
          </span>
        </button>
        <button>
          <span>
            <BsFillGearFill /> Settings
          </span>
        </button>
        <button>
          <span>
            <GiPadlock /> Account
          </span>
        </button>
      </div>
    </div>
  );
};

export default NavbarUser;
