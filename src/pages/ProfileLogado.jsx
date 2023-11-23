import React, { useState, useEffect, useRef, useContext } from "react";
import styles from "../css/pagesStyles/ProfileLogado.module.css";
import { FiEdit } from "react-icons/fi";
import Button from "../components/smallComponents/Button";
import { Link } from "react-router-dom";
import validator from "validator";
import UploadUserImg from "../components/upload/UploadUserImg";
import { useNavigate, useLocation } from "react-router-dom";
import { debounce } from "lodash";
import { changeIsLogged, logout } from "../redux/isLoggedSlice";
import Loading from "../components/Loading";
import { useSelector, useDispatch } from "react-redux";
import { dataURItoFile } from "../components/smallComponents/Base64ToFile";
import { numberGenerator } from "../components/smallComponents/NumberGenerator";
import PageTitle from "../components/PageTitle";
import useApiPrivate from "../hooks/useApiPrivate";

import { localStorageToken } from "../components/smallComponents/LocalStorage";
import { SwalFire, SwalFireConfirm } from "../components/SwalFire";
import Swal from "sweetalert2";
import { changeAvatarImage } from "../redux/avatarImage";
import Cookies from "js-cookie";
import { IsOpenAvatarContext } from "../contexts/IsOpenAvatarContext";
import { SwalFireTextInput } from "../components/SwalFire";

const ProfileLogado = () => {
  const { image } = useSelector((state) => state.avatarImageRedux);
  const { isOpenAvatar, setIsOpenAvatar } = useContext(IsOpenAvatarContext);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const dispatch = useDispatch();
  const apiPrivate = useApiPrivate();
  const { isLogged } = useSelector((state) => state.isLoggedRedux);
  const [userInfo, setUserInfo] = useState(isLogged);
  const navigate = useNavigate();
  const location = useLocation();
  const [imagem, setImagem] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingApi, setIsLoadingApi] = useState(false);
  const [dados, setDados] = useState({
    ...isLogged,
    password: "",
    newPassword: "",
    newPasswordConfirm: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordNew, setShowPasswordNew] = useState(false);
  const [showPasswordNewConfirm, setShowPasswordNewConfirm] = useState(false);
  const [isValid, setIsValid] = useState(true);
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
    setDados({
      ...isLogged,
      password: "",
      newPassword: "",
      newPasswordConfirm: "",
    });
    // return () => {
    //   isMounted = false;
    //   controller.abort();
    // };
    // debounceLoading();
    setIsLoading(false);
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
  const sucessoConfirm = () => {
    SwalFireConfirm(
      "Yes, save it!",
      "Saved",
      "Your information has been saved"
    );
  };
  const erro = (error) => {
    SwalFire(error, "error", 2000, false);
  };
  const debounceLoading = debounce(() => {
    setIsLoading(false);
  }, 2000);
  const onchangeEmail = (e) => {
    if (
      e.target.value === "" ||
      (validator.isEmail(e.target.value) && e.target.value.length <= 100)
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    setDados({ ...dados, email: e.target.value });
  };
  const onchangeName = (e) => {
    setDados({ ...dados, name: e.target.value });
  };
  const onchangePassword = (e) => {
    let password = e.target.value.replace(/\s+/g, "");

    setDados({ ...dados, password: password });
  };
  const onchangePasswordNew = (e) => {
    let password = e.target.value.replace(/\s+/g, "");

    setDados({ ...dados, newPassword: password });
  };
  const onchangePasswordNewConfirm = (e) => {
    let password = e.target.value.replace(/\s+/g, "");

    setDados({ ...dados, newPasswordConfirm: password });
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
  const togglePasswordNew = () => {
    setShowPasswordNew(!showPasswordNew);
  };
  const togglePasswordNewConfirm = () => {
    setShowPasswordNewConfirm(!showPasswordNewConfirm);
  };
  const deleteAccount = async () => {
    SwalFireTextInput("Delete").then(async (result) => {
      if (result.isConfirmed) {
        try {
          await apiPrivate
            .post("/delete-user-account")
            .then((response) => {
              console.log(response.data);
              localStorage.removeItem("token");
              Cookies.remove("jwt");
              dispatch(logout());
              navigate("/account/login", { replace: true });
            })
            .catch((error) => {
              console.log(error);
            });
        } catch (error) {
          console.log(error);
        }
      }
    });
  };
  const handdleUpdateInfo = async (event) => {
    event.preventDefault();
    {
      //ifs
      if (isValid === false || dados.email === "") {
        return alert("Digite um e-mail válido");
      }
      if (
        dados.password === "" &&
        (dados.newPassword !== "" || dados.newPasswordConfirm !== "")
      ) {
        return alert("Digite a senha atual");
      }
      if (
        dados.password !== "" &&
        dados.newPassword === "" &&
        dados.newPasswordConfirm === ""
      ) {
        return alert("Digite uma nova senha válida");
      }
      if (dados.newPassword !== dados.newPasswordConfirm) {
        return alert("As senhas estão diferentes");
      }
    }
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
        return apiPrivate
          .post("update-user-img", form, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            console.log(res);
            return res.data.avatarId;
          });
      }
    };

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it!",
      customClass: {
        confirmButton: `${styles.swalFireConfirm}`,
        cancelButton: `${styles.swalFireCancel}`,
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoadingApi(true);
        if (dados.name != "") {
          try {
            Promise.allSettled([
              apiPrivate.post("/update-user-info", {
                name: dados.name,
                email: dados.email,
                password: dados.password,
                newPassword: dados.newPassword,
                newPasswordConfirm: dados.newPasswordConfirm,
              }),
              imageUpdate(),
            ])
              // .then(async ([updateUserInfo, updateUserImg]) => {
              .then(async ([updateUserInfo, updateUserImg]) => {
                const updateUserInfoResponse = await updateUserInfo.value?.data;

                const updateUserImgResponse = await updateUserImg?.value;
                console.log(updateUserImgResponse);
                if (updateUserImgResponse?.error === "Arquivo inválido") {
                  setIsLoadingApi(false);
                  return erro(updateUserImgResponse.error);
                }
                if (updateUserInfoResponse?.error) {
                  setIsLoadingApi(false);

                  return erro(updateUserInfoResponse.error);
                }
                sucesso();
                setIsLoadingApi(false);

                setIsOpenAvatar(false);
                if (updateUserImgResponse !== undefined) {
                  dispatch(
                    changeIsLogged({
                      ...isLogged,

                      avatarId: updateUserImgResponse,
                      name: updateUserInfoResponse.name,
                      email: updateUserInfoResponse.email,
                    }),
                    changeAvatarImage(updateUserImgResponse)
                  );
                } else {
                  dispatch(
                    changeIsLogged({
                      ...isLogged,
                      name: updateUserInfoResponse.name,
                      email: updateUserInfoResponse.email,
                    })
                  );
                }
                console.log(isLogged);
                console.log(image);
                setIsDisabled({ email: true, name: true });
              })
              .then((res) => {
                console.log(res);
                setIsLoadingApi(false);
              })
              .catch((err) => {
                console.log(err);
                setIsLoadingApi(false);

                erro("Ocorreu um erro");
              });
          } catch (err) {
            console.log(err);
            setIsLoadingApi(false);

            erro("Ocorreu um erro");
          }

          //       async function loadData(){
          //       const [products,categories]=Promise.allSettled([loadProducts(),loadCategories()])
          //       return{products,categories}
          //     }
        } else {
          alert("Insira um nome ou e-mail válido");
        }
      }
    });

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
  };

  return (
    <div className="containerCss">
      <PageTitle pageTitle="Profile" />
      <div
        className={
          isLoadingApi
            ? `fixed inset-0 bg-gray-600 opacity-75 z-50 flex items-center justify-center`
            : "hidden"
        }
      >
        {" "}
        <Loading />
      </div>
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
                className="flex flex-row w-[170px] justify-end text-right"
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
              className={`flex flex-row items-center p-[10px] justify-center relative ${
                isDisabled.email ? styles.disabledInput : ""
              }`}
            >
              <label
                className="flex flex-row w-[170px] text-right justify-end"
                htmlFor="emailInput"
              >
                <p className="flex flex-col jusify-center items-center ">
                  {" "}
                  E-mail:
                </p>
              </label>
              <div className="flex flex-col">
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
                {!isValid && (
                  <div className="text-[red] -bg--navbarBackground w-fit ml-2 mt-1">
                    <p>Invalid e-mail</p>
                  </div>
                )}
              </div>
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
                className="flex flex-row w-[170px] text-right justify-end"
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
            </div>
            <div
              className={`${styles.profileEmail}  flex justify-center items-center`}
            >
              <label
                className="flex flex-row w-[170px] text-right justify-end"
                htmlFor="newPasswordInput"
              >
                <p className="flex flex-col jusify-center items-center ">
                  {" "}
                  New password:
                </p>
              </label>
              <div className="relative">
                <input
                  type={`${showPasswordNew ? "text" : "password"}`}
                  value={dados.newPassword}
                  id="newPasswordInput"
                  onChange={onchangePasswordNew}
                  className="pl-1.5 text-left  border -border--colorMenu -text--colorMenuHover !mb-0"
                />
                <div
                  className={`${
                    showPasswordNew
                      ? "absolute top-0 w-8 h-8 bg-password-hide bg-85% right-[5px]  bg-no-repeat"
                      : "absolute top-0 w-8 h-8 bg-password-show bg-85% right-[5px]  bg-no-repeat"
                  } `}
                  onClick={togglePasswordNew}
                ></div>
              </div>
              <div className="w-[57.8px]"></div>
            </div>
            <div
              className={`${styles.profileEmail}  flex justify-center items-center`}
            >
              <label
                className="flex flex-row w-[170px] text-right justify-end"
                htmlFor="newPasswordInputConfirm"
              >
                <p className="flex flex-col jusify-center items-center ">
                  {" "}
                  Confirm New password:
                </p>
              </label>
              <div className="relative">
                <input
                  type={`${showPasswordNewConfirm ? "text" : "password"}`}
                  value={dados.newPasswordConfirm}
                  id="newPasswordInputConfirm"
                  onChange={onchangePasswordNewConfirm}
                  className="pl-1.5 text-left  border -border--colorMenu -text--colorMenuHover !mb-0"
                />
                <div
                  className={`${
                    showPasswordNewConfirm
                      ? "absolute top-0 w-8 h-8 bg-password-hide bg-85% right-[5px]  bg-no-repeat"
                      : "absolute top-0 w-8 h-8 bg-password-show bg-85% right-[5px]  bg-no-repeat"
                  } `}
                  onClick={togglePasswordNewConfirm}
                ></div>
              </div>
              <div className="w-[57.8px]"></div>
            </div>

            <div className={styles.button}>
              <Button>Save</Button>
              <Link to={"/account/login"}>
                <Button>Change account</Button>
              </Link>
            </div>
          </form>
          <div className="type:!bg-red-600">
            <Button
              className="!bg-red-500 hover:!text-black"
              onClick={deleteAccount}
            >
              Delete Account
            </Button>
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

// Swal.fire({
//   title: "Submit your Github username",
//   input: "text",
//   inputAttributes: {
//     autocapitalize: "off",
//   },
//   showCancelButton: true,
//   confirmButtonText: "Look up",
//   showLoaderOnConfirm: true,
//   preConfirm: (login) => {
//     return fetch(`//api.github.com/users/${login}`)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(response.statusText);
//         }
//         return response.json();
//       })
//       .catch((error) => {
//         Swal.showValidationMessage(`Request failed: ${error}`);
//       });
//   },
//   allowOutsideClick: () => !Swal.isLoading(),
// }).then((result) => {
//   if (result.isConfirmed) {
//     Swal.fire({
//       title: `${result.value.login}'s avatar`,
//       imageUrl: result.value.avatar_url,
//     });
//   }
// });
