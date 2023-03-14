import React from "react";
import styles from "../../css/componentsStyles/navbarCss/NavbarUser.module.css";
import { useState, useEffect, useRef } from "react";
import { BsFillGearFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { GiPadlock } from "react-icons/gi";
import { Link } from "react-router-dom";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/isLoggedSlice";
import { ClickOutside } from "../smallComponents/ClickOutside";
import { UserApi } from "../../hooks/UserApi";

const NavbarUser = () => {
  const { isLogged } = useSelector((state) => state.isLoggedRedux);
  console.log(isLogged);

  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  // useOnClickOutside(ref, () => setIsOpen(false));
  ClickOutside(ref, () => setIsOpen(false));

  //todo não ta excluindo o token do banco de dados porque não sei como enviar o refresh token
  //todo e o servidor usa isso para achar qual pessoa é e excluir o token
  const logoutServer = async () => {
    const api = UserApi();
    await api
      .logout()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div ref={ref} className={`${styles.user} `}>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {isLogged && isLogged.logado ? (
          <div className={styles.userLogado}>
            {isLogged.img ? (
              <img src={isLogged.img} alt="" />
            ) : (
              <div className={`${styles.userBackground}`}>
                <FaUser className={styles.userIcon} />
              </div>
            )}
          </div>
        ) : (
          <div className={`${styles.userBackground}`}>
            <FaUser className={styles.userIcon} />
          </div>
        )}
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
              logoutServer();
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
