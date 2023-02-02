import React from "react";

import Livro from "./Livro";

const Livros = ({ livros, excluirLivro }) => {
  return (
    <div>
      {livros.map((livro) => (
        <Livro key={livro.id} livro={livro} excluirLivro={excluirLivro} />
      ))}
    </div>
  );
};

export default Livros;
