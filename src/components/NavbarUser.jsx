import React from "react";
import styles from "../css/componentsStyles/NavbarUser.module.css";
import { useState, useEffect, useRef } from "react";
import { BsFillGearFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { GiPadlock } from "react-icons/gi";
import { Link } from "react-router-dom";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/isLoggedSlice";

const NavbarUser = () => {
  const { isLogged } = useSelector((state) => state.isLoggedRedux);

  const dispatch = useDispatch();
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
        {isLogged && isLogged.logado ? (
          <Link to="/account/profile">
            <button>
              <span>
                {" "}
                <FaUser /> <p>Profile</p>
              </span>
            </button>
          </Link>
        ) : (
          <Link to="/account/login">
            <button>
              <span>
                <BiLogIn className={styles.log} /> <p>Login</p>
              </span>
            </button>
          </Link>
        )}

        <button>
          <span>
            <BsFillGearFill /> <p>Settings</p>
          </span>
        </button>
        <button>
          <span>
            <GiPadlock /> <p> Account</p>
          </span>
        </button>
        {isLogged && isLogged.logado && (
          <button
            onClick={() => {
              dispatch(logout());
              localStorage.setItem(
                "email",
                JSON.stringify({ name: "", logado: false, email: "" })
              );
            }}
            //         localStorage.setItem(
            //   "email",
            //   JSON.stringify({ logado: true, email: dados.email })
            // );
          >
            <span>
              <BiLogOut className={styles.log} /> <p>Logout</p>
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default NavbarUser;
