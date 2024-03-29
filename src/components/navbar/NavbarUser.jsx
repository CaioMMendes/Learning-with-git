import React from "react";
import styles from "../../css/componentsStyles/navbarCss/NavbarUser.module.css";
import { useState, useEffect, useRef } from "react";
import { BsFillGearFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { GiPadlock } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/isLoggedSlice";
import { ClickOutside } from "../smallComponents/ClickOutside";
import { UserApi } from "../../hooks/UserApi";
import Loading from "../Loading";
import { useLocation } from "react-router-dom";

const NavbarUser = () => {
  const { isLogged } = useSelector((state) => state.isLoggedRedux);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const random = Math.floor(Math.random() * 1000000000);
  const [image, setImage] = useState(
    isLogged.avatarId != null
      ? `https://docs.google.com/uc?id=${isLogged?.avatarId}&random=${random}`
      : isLogged.picture != null
      ? isLogged.picture
      : "https://docs.google.com/uc?id=undefined"
  );
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (isLogged.avatarId != null) {
      setImage(
        `https://docs.google.com/uc?id=${isLogged?.avatarId}&random=${random}`
      );
    } else if (isLogged.picture != null) {
      setImage(isLogged.picture);
    } else {
      setImage("https://docs.google.com/uc?id=undefined");
    }

    setIsLoading(false);
  }, [isLogged]);

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
        if (location.pathname === "/account/profile") {
          navigate("/account/login", { replace: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    localStorage.removeItem("token");
  };
  return (
    <div ref={ref} className={`${styles.user} `}>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {isLoading ? (
          <Loading />
        ) : isLogged && isLogged.logado ? (
          <div className={styles.userLogado}>
            {image && image != `https://docs.google.com/uc?id=undefined` ? (
              <img
                src={image}
                alt=""
                referrerPolicy="no-referrer"
                className={styles.avatarImage}
              />
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
