import React, { useState, useCallback, useRef } from "react";
// import Dropzone from "react-dropzone";
import { useDropzone } from "react-dropzone";
import DropContainer from "./DropContainer";
import { FaUser } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import styles from "../../css/componentsStyles/uploadCss/Upload.module.css";
import AvatarEditor from "react-avatar-editor";
import { FiEdit } from "react-icons/fi";
import Button from "../smallComponents/Button";

const UploadUserImg = () => {
  const editorRef = useRef(null);
  const [file, setFile] = useState([]);
  const [img, setImg] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [zoomValue, setZoomValue] = useState(1);
  const handdleDrop = (onDropAccepted) => {
    this.setState({ image: dropped[0] });
  };
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
  const handleSave = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      const img = canvas.toDataURL();
      // Faça algo com a imagem, como enviar para o servidor]

      setImg(img);
    }
  };
  const sizeAdjust = () => {
    setIsOpen(true);
  };
  return (
    <div className={styles.container}>
      <div className={styles.avatarContainer}>
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
            <img src={img} alt="Image" className={styles.avatarImage} />
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
        <span className={img === undefined ? styles.sizeAdjustHide : ""}>
          <Button onClick={sizeAdjust}>Ajustar posição</Button>
        </span>
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
            step=".01"
            min="0.5"
            max="3"
          />
        </label>
        <Button onClick={handleSave}>Cortar</Button>
      </div>
    </div>
  );
};

export default UploadUserImg;
