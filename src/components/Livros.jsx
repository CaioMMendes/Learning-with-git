import React from "react";
import { useSelector } from "react-redux";
import Livro from "./Livro";

const Livros = ({ excluirLivro }) => {
  const { livros } = useSelector((state) => state.livrosList);
  return (
    <div>
      {livros.map((livro) => (
        <Livro key={livro.id} livro={livro} excluirLivro={excluirLivro} />
      ))}
    </div>
  );
};

export default Livros;
