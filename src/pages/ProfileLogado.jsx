import React, { useState, useEffect } from "react";
import styles from "../css/pagesStyles/profileLogado.module.css";
import { FiEdit } from "react-icons/fi";
import Button from "../components/smallComponents/Button";
import { Link } from "react-router-dom";
import UploadUserImg from "../components/upload/UploadUserImg";
import useApiPrivate from "../hooks/useApiPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { debounce } from "lodash";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";
const ProfileLogado = () => {
  const { isLogged } = useSelector((state) => state.isLoggedRedux);
  const apiPrivate = useApiPrivate();
  const [userInfo, setUserInfo] = useState(isLogged);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setLoading] = useState(true);
  const [dados, setDados] = useState(isLogged);
  const [isDisabled, setIsDisabled] = useState({
    email: true,
    name: true,
  });

  useEffect(() => {
    const controller = new AbortController();

    // getUser();
    setDados(isLogged);
    // return () => {
    //   isMounted = false;
    //   controller.abort();
    // };
    // debounceLoading();
    setLoading(false);
  }, [isLogged]);
  // const getUser = async () => {
  //   try {
  //     const response = await apiPrivate.post("/userinfo");

  //     setUserInfo(response.data);

  //     setLoading(false);

  //     // isMounted && setUsers(response.data);
  //   } catch (err) {
  //     console.error(err);

  //     setLoading(false);
  //     // navigate("/account/login", { state: { from: location }, replace: true });
  //   }
  // };

  const debounceLoading = debounce(() => {
    setLoading(false);
  }, 2000);
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
  console.log("dados", dados);
  console.log("logged", isLogged);

  return (
    <div className="containerCss">
      {isLoading ? (
        <div className={styles.loading}>
          <Loading />
        </div>
      ) : isLogged.logado ? (
        <div className={styles.profileLogado}>
          <UploadUserImg />
          <div
            className={`${styles.profileEmail} ${
              isDisabled.name ? styles.disabledInput : ""
            }`}
          >
            <label>
              Name:
              <input
                type="text"
                value={dados.name}
                onChange={onchangeName}
                onBlur={onBlurName}
                disabled={isDisabled.name}
                className="pl-1.5 text-left"
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
          <div
            className={`${styles.profileEmail} ${
              isDisabled.email ? styles.disabledInput : ""
            }`}
          >
            <label>
              E-mail:
              <input
                type="text"
                value={dados.email}
                onChange={onchangeEmail}
                onBlur={onBlurEmail}
                disabled={isDisabled.email}
                className="pl-1.5 text-left"
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
      ) : !isLoading && isLogged.logado === false ? (
        <div className={styles.deslogado}>
          Você ainda não está logado em nenhuma conta. Por favor,{" "}
          <Link to="/account/login">clique aqui</Link> para efetuar o login
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProfileLogado;
