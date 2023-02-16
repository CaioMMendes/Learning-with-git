import React, { useState } from "react";
import styles from "../css/componentsStyles/ProfileLogado.module.css";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";

const ProfileLogado = () => {
  const { isLogged } = useSelector((state) => state.isLoggedRedux);
  const [dados, setDados] = useState({
    name: isLogged.name,
    email: isLogged.email,
  });
  const [isDisabled, setIsDisabled] = useState({
    email: true,
  });
  const onchangeEmail = (e) => {
    setDados({ ...dados, email: e.target.value });
  };

  return (
    <div>
      {dados.name}
      <div className={styles.profileEmail}>
        <label htmlFor="">
          E-mail:
          <input
            type="text"
            value={dados.email}
            onChange={onchangeEmail}
            disabled={isDisabled.email}
          />
        </label>
        <div
          className={styles.editEmail}
          onClick={() => {
            setIsDisabled({ ...isDisabled, email: false });
          }}
        >
          <FiEdit className={styles.editIcon} /> Editar
        </div>
      </div>
    </div>
  );
};

export default ProfileLogado;
