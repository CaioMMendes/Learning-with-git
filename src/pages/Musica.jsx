import React from "react";
import { useState, useEffect } from "react";
import A from "../sounds/A.ogg";
import styles from "../css/pagesStyles/Musica.module.css";
import ReactPlayer from "react-player";
import B from "../sounds/B_out.ogg";
import PageTitle from "../components/PageTitle";

const Musica = () => {
  const [value, setValue] = useState(1);

  const [playing, setPlaying] = useState(false);
  const [key, setKey] = useState();
  const [notas, setNotas] = useState([
    { nota: "A", key: "a" },
    { nota: "A#", key: "a" },
    { nota: "B", key: "b" },
    { nota: "C", key: "c" },
    { nota: "C#", key: "a" },
    { nota: "D", key: "a" },
    { nota: "D#", key: "a" },
    { nota: "E", key: "a" },
    { nota: "F", key: "a" },
    { nota: "F#", key: "a" },
    { nota: "G", key: "a" },
    { nota: "G#", key: "a" },
    { nota: "A5", key: "a" },
    { nota: "A5#", key: "a" },
    { nota: "Do not press", key: "x" },
  ]);
  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      play();
    }
  };

  window.addEventListener("keypress", function (event) {
    if (event.key === "a") {
      play();
    }
    if (event.key === "x") {
      setPlaying(true);
    }
  });

  useEffect(() => {
    if (value % 2 === 0) play();
  }, [value]);

  const play = () => {
    <audio src={A}></audio>;
  };

  return (
    <div className="containerCss" onKeyDown={handleKeypress}>
      <PageTitle pageTitle="Música" />
      <button className={styles.button} onClick={play}>
        Play
      </button>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.borda}>Nota</th>
            <th>Key</th>
          </tr>
        </thead>
        <tbody>
          {notas.map((nota, index) => {
            return (
              <tr key={index} value={nota.nota}>
                <td className={styles.borda}>{nota.nota}</td>
                <td>{nota.key}</td>
              </tr>
            );
          })}
        </tbody>
        <tr>
          {" "}
          <td colSpan={2} className={styles.tabelaFooter}>
            {" "}
            Precione a tecla correspondente a nota para ouvi-la
          </td>
        </tr>
      </table>
      {playing && (
        <ReactPlayer
          url="https://www.youtube.com/watch?v=oDNTHvjn5hs&ab_channel=Avhgie"
          playing
          loop
          width="0"
          height="0"
        />
      )}
    </div>
  );
};

export default Musica;
