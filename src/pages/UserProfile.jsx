import React from "react";
import { Link } from "react-router-dom";
import styles from "../css/pagesStyles/UserProfile.module.css";
import ProfileLogado from "../components/ProfileLogado";
import { useDispatch, useSelector } from "react-redux";
const UserProfile = () => {
  const { isLogged } = useSelector((state) => state.isLoggedRedux);

  return (
    <div className="container">
      {isLogged.logado ? (
        <ProfileLogado />
      ) : (
        <div className={styles.deslogado}>
          Você ainda não está logado em nenhuma conta. Por favor,{" "}
          {<Link to="/account/login">clique aqui</Link>} para efetuar o login
        </div>
      )}
    </div>
  );
};

export default UserProfile;
