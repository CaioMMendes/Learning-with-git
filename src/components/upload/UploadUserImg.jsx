import React, { useState, useCallback, useRef } from "react";
// import Dropzone from "react-dropzone";
import { useDropzone } from "react-dropzone";
import DropContainer from "./DropContainer";
import styles from "../../css/componentsStyles/uploadCss/Upload.module.css";
import AvatarEditor from "react-avatar-editor";
const UploadUserImg = () => {
  const [file, setFile] = useState([]);
  const [zoomValue, setZoomValue] = useState(1);
  const handdleDrop = (onDropAccepted) => {
    this.setState({ image: dropped[0] });
  };
  const onDrop = useCallback((acceptedFiles) => {
    if (!acceptedFiles[0]) {
      return alert("Envie um arquivo válido");
    }
    setFile(acceptedFiles);
  }, []);
  console.log(file[0]);
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
  return (
    <div>
      {/* <Dropzone accept={"image/*"} onDropAccepted={() => {}}>
        {({ getRootProps, getInputProps, isDragActive, isDragReject }) => ( */}
      <div
        {...getRootProps()}
        className={`${styles.dropZone} ${isDragActive && styles.dragActive} ${
          isDragReject && styles.dragReject
        }`}
      >
        <input {...getInputProps()} />
        <div className={styles.dropContainer}>
          {" "}
          {renderDragMessage(isDragActive, isDragReject)}
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
      <div className={styles.avatarEditorContainer}>
        {" "}
        <AvatarEditor
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
      </div>
    </div>
  );
};

export default UploadUserImg;
