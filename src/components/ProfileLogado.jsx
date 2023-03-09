import React, { useState } from "react";
import styles from "../css/componentsStyles/ProfileLogado.module.css";
import { FiEdit } from "react-icons/fi";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const ProfileLogado = () => {
  // const { isLogged } = useSelector((state) => state.isLoggedRedux);
  const [isLogged] = useState(JSON.parse(localStorage.getItem("email")));
  const [dados, setDados] = useState({
    name: isLogged.name,
    email: isLogged.email,
  });
  const [isDisabled, setIsDisabled] = useState({
    email: true,
    name: true,
  });
  const onchangeEmail = (e) => {
    setDados({ ...dados, email: e.target.value });
  };
  const onchangeName = (e) => {
    setDados({ ...dados, name: e.target.value });
  };
  const onBlurEmail = () => {
    let trimEmail;
    trimEmail = dados.email && dados.email.replace(/\s/g, "");
    setDados({ ...dados, email: trimEmail });
  };
  const onBlurName = () => {
    let trimName;
    trimName =
      dados.name && dados.name.trim().split(" ").filter(Boolean).join(" ");
    setDados({ ...dados, name: trimName });
  };

  return (
    <div className={styles.profileLogado}>
      <div className={styles.profileEmail}>
        <label>
          Name:
          <input
            type="text"
            value={dados.name}
            onChange={onchangeName}
            onBlur={onBlurName}
            disabled={isDisabled.name}
          />
        </label>
        <div
          className={styles.editEmail}
          onClick={() => {
            setIsDisabled({ ...isDisabled, name: false });
          }}
        >
          <FiEdit className={styles.editIcon} /> Editar
        </div>
      </div>
      <div className={styles.profileEmail}>
        <label>
          E-mail:
          <input
            type="text"
            value={dados.email}
            onChange={onchangeEmail}
            onBlur={onBlurEmail}
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
      <div className={styles.button}>
        <Button>Save</Button>
        <Link to={"/account/login"}>
          <Button>Change account</Button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileLogado;
