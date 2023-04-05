import React, { useState, useEffect, useRef } from "react";
import styles from "../css/pagesStyles/profileLogado.module.css";
import { FiEdit } from "react-icons/fi";
import Button from "../components/smallComponents/Button";
import { Link } from "react-router-dom";
import UploadUserImg from "../components/upload/UploadUserImg";
import { useNavigate, useLocation } from "react-router-dom";
import { debounce } from "lodash";
import { changeIsLogged } from "../redux/isLoggedSlice";
import Loading from "../components/Loading";
import { useSelector, useDispatch } from "react-redux";
import { dataURItoFile } from "../components/smallComponents/Base64ToFile";
import { numberGenerator } from "../components/smallComponents/NumberGenerator";
import useApiPrivate from "../hooks/useApiPrivate";
import { localStorageToken } from "../components/smallComponents/LocalStorage";
import SwalFire from "../components/SwalFire";
import { changeAvatarImage } from "../redux/avatarImage";

const ProfileLogado = () => {
  const { image } = useSelector((state) => state.avatarImageRedux);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const dispatch = useDispatch();
  const apiPrivate = useApiPrivate();
  const { isLogged } = useSelector((state) => state.isLoggedRedux);
  const [userInfo, setUserInfo] = useState(isLogged);
  const navigate = useNavigate();
  const location = useLocation();
  const [imagem, setImagem] = useState();
  const [isLoading, setLoading] = useState(true);
  const [dados, setDados] = useState(isLogged);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [userImgLocalStorage, setUserImgLocalStorage] = useState(
    localStorage.getItem("userImg")
  );
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
  useEffect(() => {
    setImagem(image);
    dispatch(changeAvatarImage(""));
    setUserImgLocalStorage(localStorage.getItem("userImg"));
  }, []);
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
  const sucesso = () => {
    SwalFire("Os dados foram atualizados", "success", 2000, false);
  };
  const erro = () => {
    SwalFire("Ocorreu um erro", "error", 2000, false);
  };
  const debounceLoading = debounce(() => {
    setLoading(false);
  }, 2000);
  const onchangeEmail = (e) => {
    setDados({ ...dados, email: e.target.value });
  };
  const onchangeName = (e) => {
    setDados({ ...dados, name: e.target.value });
  };
  const onchangePassword = (e) => {
    let password = e.target.value.replace(/\s+/g, "");

    setDados({ ...dados, password: password });
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

  // apiPrivate: async () => {
  //     const response = await apiPrivateToken.post('/userinfo')
  //     return response
  // }
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };
  const handdleUpdateInfo = async (event) => {
    event.preventDefault();

    const number = numberGenerator();

    const imageFile = dataURItoFile(image, `${number}`);

    const imageUpdate = () => {
      const form = new FormData();
      form.append("file", imageFile);

      //  const response = await api.post("/upload", form, {
      //    headers: {
      //      "Content-Type": "multipart/form-data",
      //    },
      //  });
      //  return response;

      if (imageFile != "" && imageFile != undefined) {
        console.log("enviou a imagem");
        apiPrivate.post("update-user-img", form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
    };
    //  if (imageFile != "" && imageFile != undefined) {

    //   apiPrivate.post('update-user-img',{
    //     imageFile
    //   })

    //  }
    // try {
    //   console.log(dados.name, dados.email);
    //   const token = localStorageToken();
    //   await apiPrivate
    //     .post("/update-user-info", { name: dados.name, email: dados.email })
    //     .then((response) => {
    //       console.log(response.data);
    //       sucesso(),
    //         dispatch(
    //           changeIsLogged({
    //             ...isLogged,
    //             name: response.data.name,
    //             email: response.data.email,
    //           })
    //         );
    //       setIsDisabled({ email: true, name: true });
    //     })
    //     .catch((error, response) => {
    //       console.log(response);
    //       console.log(error);
    //     });
    // } catch (error) {
    //   console.log(error);
    // }

    try {
      Promise.allSettled([
        apiPrivate.post("/update-user-info", {
          name: dados.name,
          email: dados.email,
        }),
        imageUpdate(),
      ])
        // .then(async ([updateUserInfo, updateUserImg]) => {
        .then(async ([updateUserInfo, updateUserImg]) => {
          const updateUserInfoResponse = await updateUserInfo.value.data;
          console.log(updateUserInfo);
          console.log(updateUserImg);
          const updateUserImgResponse = await updateUserImg.value;

          sucesso(), console.log(updateUserImgResponse);
          dispatch(
            changeIsLogged({
              ...isLogged,
              name: updateUserInfoResponse.name,
              email: updateUserInfoResponse.email,
            }),
            changeAvatarImage(updateUserImgResponse)
          );
          setIsDisabled({ email: true, name: true });
        })
        .then((res) => console.log(res))
        .catch((err) => {
          console.log(err);
          erro();
        });
    } catch (err) {
      console.log(err);
      error();
    }

    //       async function loadData(){
    //       const [products,categories]=Promise.allSettled([loadProducts(),loadCategories()])
    //       return{products,categories}
    //     }
  };

  return (
    <div className="containerCss">
      {isLoading ? (
        <div className={styles.loading}>
          <Loading />
        </div>
      ) : isLogged.logado ? (
        <div className={styles.profileLogado}>
          <UploadUserImg />
          <form
            onSubmit={handdleUpdateInfo}
            method="post"
            className="w-full h-full flex flex-col items-center"
          >
            <div
              className={`${styles.profileEmail}  flex justify-center ${
                isDisabled.name === true ? styles.disabledInput : ""
              }`}
            >
              <label
                className="flex flex-row w-[150px] justify-end text-right"
                htmlFor="nameInput"
              >
                <p className="flex flex-col jusify-center items-center text-right">
                  {" "}
                  Name:
                </p>
              </label>
              <input
                type="text"
                value={dados.name}
                onChange={onchangeName}
                onBlur={onBlurName}
                disabled={isDisabled.name}
                id="nameInput"
                ref={nameRef}
                className="pl-1.5 text-left border -border--colorMenu -text--colorMenuHover !mb-0"
              />
              <div
                className={styles.editEmail}
                onClick={() => {
                  nameRef.current.focus(),
                    setIsDisabled({ ...isDisabled, name: false });
                }}
              >
                <FiEdit className={styles.editIcon} /> Editar
              </div>
            </div>
            <div
              className={`flex flex-row items-center p-[10px] justify-center  ${
                isDisabled.email ? styles.disabledInput : ""
              }`}
            >
              <label
                className="flex flex-row w-[150px] text-right justify-end"
                htmlFor="emailInput"
              >
                <p className="flex flex-col jusify-center items-center ">
                  {" "}
                  E-mail:
                </p>
              </label>

              <input
                type="text"
                value={dados.email}
                onChange={onchangeEmail}
                onBlur={onBlurEmail}
                disabled={isDisabled.email}
                id="emailInput"
                className="pl-1.5 text-left border -border--colorMenu -text--colorMenuHover !mb-0"
                ref={emailRef}
              />
              <div
                className={styles.editEmail}
                onClick={() => {
                  emailRef.current.focus();
                  setIsDisabled({ ...isDisabled, email: false });
                }}
              >
                <FiEdit className={styles.editIcon} /> Editar
              </div>
            </div>
            <div
              className={`${styles.profileEmail}  flex justify-center items-center`}
            >
              <label
                className="flex flex-row w-[150px] text-right justify-end"
                htmlFor="passwordInput"
              >
                <p className="flex flex-col jusify-center items-center ">
                  {" "}
                  Current password:
                </p>
              </label>
              <div className="relative">
                <input
                  type={`${showPassword ? "text" : "password"}`}
                  value={dados.password}
                  id="passwordInput"
                  onChange={onchangePassword}
                  className="pl-1.5 text-left  border -border--colorMenu -text--colorMenuHover !mb-0"
                />
                <div
                  className={`${
                    showPassword
                      ? "absolute top-0 w-8 h-8 bg-password-hide bg-85% right-[5px]  bg-no-repeat"
                      : "absolute top-0 w-8 h-8 bg-password-show bg-85% right-[5px]  bg-no-repeat"
                  } `}
                  onClick={togglePassword}
                ></div>
              </div>
              <div className="w-[57.8px]"></div>
              {/* <div
                className={styles.editEmail}
                onClick={() => {
                  emailRef.current.focus();
                  setIsDisabled({ ...isDisabled, email: false });
                }}
              >
                <FiEdit className={styles.editIcon} /> Editar
              </div> */}
            </div>

            <div className={styles.button}>
              <Button>Save</Button>
              <Link to={"/account/login"}>
                <Button>Change account</Button>
              </Link>
            </div>
          </form>
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
