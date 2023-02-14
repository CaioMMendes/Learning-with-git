import React from "react";
import Loading from "./Loading";
import { useState, useEffect } from "react";
import styles from "../css/componentsStyles/TabelaProdutos.module.css";
import axios from "axios";

const TabelaProdutos = ({ dummy }) => {
  const [json, setJson] = useState([]);
  const [isLoading, setLoading] = useState(false);
  // const [dummy, setDummy] = useState("");

  useEffect(() => {
    setLoading(true);
    usersJson();
  }, [dummy]);
  const usersJson = async () => {
    await axios
      .get("http://localhost:3003/produtos")
      .then((response) => {
        setLoading(false);
        setJson(response.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  return (
    <div>
      {" "}
      <div className={styles.loading}>
        {isLoading ? (
          <Loading />
        ) : json == "" ? (
          <div className={styles.falhaCarregamento}>
            Não foi possível carregar
          </div>
        ) : (
          <div className={styles.testandoApi}>
            <table>
              <thead>
                <tr>
                  <th>id</th>
                  <th>produto</th>
                  <th>preço</th>
                  <th>estoque</th>
                  <th>estoque mínimo</th>
                </tr>
              </thead>

              <tbody>
                {json &&
                  json.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.nome}</td>
                        <td>{item.preco}</td>
                        <td>{item.estoque}</td>
                        <td>{item.minEstoque}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabelaProdutos;
