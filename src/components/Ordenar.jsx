import React from "react";

const Ordenar = ({ livros, crescente }) => {
  const crescente = () => {
    const ordemCrescenteNumero = [...livros].sort((a, b) => a.isbn - b.isbn);
    setLivros(ordemCrescenteNumero);
  };

  return <></>;
};

export default Ordenar;
