import React, { useState, useCallback, useRef } from "react";
// import Dropzone from "react-dropzone";
import { useDropzone } from "react-dropzone";

import { FaUser } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { useLocation } from "react-router-dom";
import styles from "../../css/componentsStyles/uploadCss/Upload.module.css";
import AvatarEditor from "react-avatar-editor";
import { FiEdit } from "react-icons/fi";
import Button from "../smallComponents/Button";
import { useDispatch, useSelector } from "react-redux";
import { changeAvatarImage } from "../../redux/avatarImage";
import useApiPrivate from "../../hooks/useApiPrivate";

import { useEffect } from "react";
import { changeIsLogged } from "../../redux/isLoggedSlice";

const UploadUserImg = () => {
  const dispatch = useDispatch();
  const { googleLogin } = useSelector((state) => state.googleLoginRedux);
  const location = useLocation();
  const apiPrivate = useApiPrivate();
  const { isLogged } = useSelector((state) => state.isLoggedRedux);
  const editorRef = useRef(null);
  const [file, setFile] = useState([]);
  const [img, setImg] = useState(() => {
    if (location.pathname === "/account/profile" && isLogged.avatarId != null) {
      `https://docs.google.com/uc?id=${isLogged?.avatarId}`;
    } else if (
      isLogged.avatarId == null &&
      isLogged.picture != null &&
      location.pathname !== "/account/register"
    ) {
      isLogged.picture;
    }
    if (location.pathname === "/account/register") {
      googleLogin.picture;
    }
  });
  const [isOpen, setIsOpen] = useState(false);
  const [ajustPositionOpen, setAjustPositionOpen] = useState(false);
  const [zoomValue, setZoomValue] = useState(1);
  const [numbers, setNumbers] = useState();
  const handdleDrop = (onDropAccepted) => {
    this.setState({ image: dropped[0] });
  };

  // function dataURItoFile(dataURI, fileName) {
  //   const byteString = atob(dataURI.split(",")[1]);
  //   const ab = new ArrayBuffer(byteString.length);
  //   const ia = new Uint8Array(ab);
  //   for (let i = 0; i < byteString.length; i++) {
  //     ia[i] = byteString.charCodeAt(i);
  //   }
  //   const blob = new Blob([ab], { type: "image/*" });
  //   return new File([blob], fileName, { type: "image/*" });
  // }
  useEffect(() => {
    if (location.pathname === "/account/profile" && isLogged.avatarId != null) {
      setImg(`https://docs.google.com/uc?id=${isLogged?.avatarId}`);
    } else if (
      isLogged.avatarId == null &&
      isLogged.picture != null &&
      location.pathname !== "/account/register"
    ) {
      setImg(isLogged.picture);
    }
    if (location.pathname === "/account/register") {
      console.log(googleLogin.picture);
      setImg(googleLogin.picture);
    }
    if (isLogged.avatarId !== null || isLogged !== null) {
      setAjustPositionOpen(true);
    }
  }, [isLogged, googleLogin]);
  // console.log(img);
  const onDrop = useCallback((acceptedFiles) => {
    if (!acceptedFiles[0]) {
      return alert("Envie um arquivo válido");
    }
    setFile(acceptedFiles);
    setIsOpen(true);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: {
      //   "image/*": [".jpeg", ".png"],
      "image/*": [],
    },
    onDrop,
    maxFiles: 1,
    maxSize: 10485760,
  });
  const renderDragMessage = (isDragActive, isDragReject) => {
    if (!isDragActive) {
      return <p>Arraste arquivos aqui...</p>;
    }
    if (isDragReject) {
      return <p>Arquivo não suportado</p>;
    }
    return <p>Solte os arquivos aqui</p>;
  };
  const onChangeZoom = (e) => {
    setZoomValue(e.target.value);
  };
  // const numberGenerator = () => {
  //   const newNumbers = [];
  //   for (let i = 0; i < 5; i++) {
  //     const randomNumber = Math.floor(Math.random() * 100) + 1;
  //     newNumbers.push(randomNumber);
  //   }
  //   setNumbers(newNumbers.join(""));
  // };
  const removeImage = () => {
    apiPrivate.post("/remove-user-img");
    dispatch(changeAvatarImage(""));
    setImg(undefined);
    dispatch(changeIsLogged({ ...isLogged, avatarId: null }));
  };
  const handleSave = () => {
    // numberGenerator();

    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      const img = canvas.toDataURL();

      // const imageFile = dataURItoFile(img, `${numbers}`);
      // console.log(imageFile);
      //todo esse tava funcionando imagem base 64----- const img = canvas.toDataURL();
      // Faça algo com a imagem, como enviar para o servidor]
      dispatch(changeAvatarImage(img));

      setImg(img);
      setAjustPositionOpen(true);
    }
  };
  const sizeAdjust = () => {
    setIsOpen(true);
  };
  return (
    <div className={styles.container}>
      <div className={styles.avatarContainer} title="Change Avatar">
        {/* <Dropzone accept={"image/*"} onDropAccepted={() => {}}>
        {({ getRootProps, getInputProps, isDragActive, isDragReject }) => ( */}
        <div
          {...getRootProps()}
          className={`${styles.dropZone} ${isDragAccept && styles.dragAccept} ${
            isDragReject && styles.dragReject
          } `}
        >
          {img === undefined ? (
            <FaUser className={`${styles.avatarImage} ${styles.avatarIcon}`} />
          ) : (
            <>
              <img src={`${img}`} alt="" className={styles.avatarImage} />
              {/* {img} */}
              {/* <img
                src={`https://lh3.googleusercontent.com/a/AGNmyxb4_naCnnb4yPCF5hVfnRdkyeaCJktRLHDYexGG9g=s96-c`}
                alt=""
                className={styles.avatarImage}
              /> */}
            </>
          )}

          <FiEdit className={styles.editIcon} />

          <input {...getInputProps()} />
          <div
            className={styles.dropContainer}
            onClick={() => {
              setIsOpen(true);
            }}
          >
            {" "}
            {/* {renderDragMessage(isDragActive, isDragReject)} */}
          </div>
        </div>
        <div className="flex flex-row">
          <span
            className={ajustPositionOpen ? "" : `${styles.sizeAdjustHide} `}
          >
            <Button onClick={sizeAdjust}>Adjust position</Button>
          </span>
          <span className={ajustPositionOpen ? "" : styles.sizeAdjustHide}>
            <Button onClick={removeImage}>Remove image</Button>
          </span>
        </div>
      </div>

      {/* {...getRootProps()}
              isDragActive={isDragActive}
              isDragReject={isDragReject}
              className={StyleSheet.dropZone}
            >
              <input {...getInputProps()} />

        )}
      </Dropzone> */}
      <div
        className={`${styles.avatarEditorContainer} ${
          isOpen ? styles.open : styles.close
        }`}
      >
        <IoIosClose
          className={styles.closeIcon}
          onClick={() => {
            setIsOpen(false);
          }}
        />{" "}
        <AvatarEditor
          ref={editorRef}
          image={file[0]}
          // image={img}
          width={200}
          height={200}
          border={20}
          className={styles.avatarBox}
          borderRadius={300}
          //   color={[255, 255, 255, 0.6]} // RGBA
          color={[36, 36, 36]}
          backgroundColor="black"
          scale={zoomValue}
          rotate={0}
        />
        <label>
          Zoom
          <input
            type="range"
            name="zoom"
            value={zoomValue}
            onChange={onChangeZoom}
            step={0.01}
            min={0.5}
            max={3}
            className="-accent--verde"
          />
        </label>
        <Button onClick={handleSave}>Cortar</Button>
      </div>
    </div>
  );
};

export default UploadUserImg;
