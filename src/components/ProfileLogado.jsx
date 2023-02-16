import React from "react";
import styles from "../css/componentsStyles/ProfileLogado.module.css";
import { useDispatch, useSelector } from "react-redux";

const ProfileLogado = () => {
  const { isLogged } = useSelector((state) => state.isLoggedRedux);

  return <div>E-mail: {isLogged.email}</div>;
};

export default ProfileLogado;
