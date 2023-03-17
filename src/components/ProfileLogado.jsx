import React, { useState, useEffect } from "react";
import styles from "../css/componentsStyles/ProfileLogado.module.css";
import { FiEdit } from "react-icons/fi";
import Button from "./smallComponents/Button";
import { Link } from "react-router-dom";
import UploadUserImg from "./upload/UploadUserImg";
import useApiPrivate from "../hooks/useApiPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import Loading from "./Loading";

const ProfileLogado = () => {
  // const { isLogged } = useSelector((state) => state.isLoggedRedux);
  const apiPrivate = useApiPrivate();
  const [userInfo, setUserInfo] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    getUser();

    // return () => {
    //   isMounted = false;
    //   controller.abort();
    // };
  }, []);
  const getUser = async () => {
    try {
      const response = await apiPrivate.post("/userinfo");

      setUserInfo(response.data);

      setLoading(false);

      // isMounted && setUsers(response.data);
    } catch (err) {
      console.error(err);

      setLoading(false);
      // navigate("/account/login", { state: { from: location }, replace: true });
    }
  };
  const [isLogged] = useState(JSON.parse(localStorage.getItem("email")));
  const [dados, setDados] = useState({
    name: isLogged?.name,
    email: isLogged?.email,
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
    <div>
      {isLoading ? (
        <div className={styles.loading}>
          <Loading />
        </div>
      ) : userInfo ? (
        <div className={styles.profileLogado}>
          <UploadUserImg />
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
      ) : (
        <div className={styles.deslogado}>
          Você ainda não está logado em nenhuma conta. Por favor,{" "}
          <Link to="/account/login">clique aqui</Link> para efetuar o login
        </div>
      )}
    </div>
  );
};

export default ProfileLogado;
