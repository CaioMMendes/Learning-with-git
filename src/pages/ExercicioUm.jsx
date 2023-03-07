import React, { useEffect, useState } from "react";
import styles from "../css/pagesStyles/ExercicioUm.module.css";
import Itens from "../components/Itens";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import Loading from "../components/Loading";

const ExercicioUm = () => {
  const [itens, setItens] = useState([]);
  const [valor, setValor] = useState("");
  const [json, setJson] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const handleKeyUp = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      const handleAddItens = [...itens, valor];
      setItens(handleAddItens);
      setValor("");
    }
  };

  const handleInputChange = (e) => {
    setValor(e.target.value);
  };

  const excluirLivro = (itemName) => {
    const newLivros = itens.filter((item) => {
      if (item !== itemName) return true;
      return false;
    });
    setItens(newLivros);
  };

  //------------------------------importando json

  useEffect(() => {
    axios
      .post(
        "https://jsonplaceholder.typicode.com/users",
        {
          name: "Caio",
          Adress: {
            city: "jesuania",
            geo: {
              lat: "12e2",
              lng: "asdas",
            },
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {})
      .catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    const usersJson = async () => {
      await axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
          setLoading(false);
          setJson(response.data);
        })
        .catch(() => {
          setLoading(false);
        });
    };
    usersJson();
  }, []);

  // const [click, setClick] = useState([false]);
  // const clicou = async () => {
  //   const data = await fetch("https://jsonplaceholder.typicode.com/users");
  //   const dataJson = await data.json();
  //   setClick(dataJson);
  // };

  return (
    <div className="container">
      {itens.map((itens) => (
        <Itens key={uuidv4()} itens={itens} excluirLivro={excluirLivro} />
      ))}
      <div>
        <input
          type="text"
          onKeyUp={handleKeyUp}
          //Se não tiver o onchange no inpt ele buga com o value=valor
          onChange={handleInputChange}
          value={valor}
          placeholder="Digite algo"
        />
      </div>

      {/* <div>
        {livros.map((livro) => (
          <Livro key={livro.id} livro={livro} excluirLivro={excluirLivro} />
        ))}
      </div> */}
      {/* //todo descomentar isso se der tudo errado */}
      {/* <div className={styles.loading}>
        {isLoading ? (
          <Loading />
        ) : (
          json &&
          json.map((item) => {
            return (
              <div className={styles.lista}>
                <p key={item.id}>{item.name}</p>{" "}
                <p key={item.id}> {item.address.city}</p>
              </div>
            );
          })
        )}
      </div> */}
      {/* //todo------------------------------------------------- */}
      <div className={styles.loading}>
        {isLoading ? (
          <Loading />
        ) : (
          <div className={styles.tabela}>
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Cidade</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                </tr>
              </thead>
              <tbody>
                {json &&
                  json.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td>
                          {" "}
                          <p>{item.name}</p>{" "}
                        </td>
                        <td>
                          {" "}
                          <p> {item.address.city}</p>{" "}
                        </td>
                        <td>
                          <p> {item.address.geo.lat}</p>
                        </td>
                        <td>
                          <p> {item.address.geo.lng}</p>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* //todo Outra forma de escrever, usando {} e return */}
      {/* {json &&
        json.map((item) => {
          return <p key={item.id}> {item.name}</p>;
        })} */}
      {/* {click && click[0].name} */}
    </div>
  );
};

export default ExercicioUm;
