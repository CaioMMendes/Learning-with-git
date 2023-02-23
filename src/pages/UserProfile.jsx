import React from "react";
import { Link } from "react-router-dom";
import styles from "../css/pagesStyles/UserProfile.module.css";
import ProfileLogado from "../components/ProfileLogado";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import PageTitle from "../components/PageTitle";

const UserProfile = () => {
  const { isLogged } = useSelector((state) => state.isLoggedRedux);
  const [logado, setLogado] = useState(
    JSON.parse(localStorage.getItem("email"))
  );
  const [isLoading, setLoading] = useState(false);

  return (
    <div className="container">
      <PageTitle pageTitle="Profile" />
      {logado && logado.logado ? (
        <ProfileLogado />
      ) : (
        <div className={styles.deslogado}>
          Você ainda não está logado em nenhuma conta. Por favor,{" "}
          <Link to="/account/login">clique aqui</Link> para efetuar o login
        </div>
      )}
    </div>
  );
};

export default UserProfile;
