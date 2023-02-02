import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import styles from "./App.module.css";
import "./index.css";
import Tabela from "./pages/Tabela";
import Cadastro from "./pages/Cadastro";
import OutroEstilo from "./pages/Animation";
import NavBar from "./components/NavBar";
import SiteFlexbox from "./pages/SiteFlexbox";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Musica from "./pages/Musica";
import ExercicioUm from "./pages/ExercicioUm";
import Jogos from "./pages/Jogos";
import ScrollToTop from "./components/ScrollToTop";
import Endereco from "./pages/Endereco";
import Cookies from "js-cookie";
import PageNotFound from "./pages/PageNotFound";

function App() {
  const [livros, setLivros] = useState([
    {
      isbn: 2,
      titulo: "titulo",
      autor: "yy",
      id: uuidv4(),
    },
    {
      isbn: 3,
      titulo: "ddd",
      autor: "tt",
      id: uuidv4(),
    },
    {
      isbn: 1,
      titulo: "asd",
      autor: "autor",
      id: uuidv4(),
    },
    {
      isbn: 1,
      titulo: "asd",
      autor: "autor",
      id: uuidv4(),
    },
    {
      isbn: 1,
      titulo: "asd",
      autor: "autor",
      id: uuidv4(),
    },
  ]);

  const [isDark, setIsDark] = useState(!!Cookies.get("dark"));

  // const currentMode = localStorage.getItem("darkMode");

  const mudarTema = () => {
    setIsDark(!isDark);

    isDark
      ? (setIsDark(false), Cookies.remove("dark"))
      : (setIsDark(true), Cookies.set("dark", true));
  };

  // useEffect(mudarTema, []);
  const toggleMenu = () => document.body.classList.toggle("open");

  const crescente = () => {
    const ordemCrescenteNumero = [...livros].sort((a, b) =>
      a.isbn > b.isbn ? 1 : -1
    );

    setLivros(ordemCrescenteNumero);
  };

  const decrescente = () => {
    const ordemDecrescenteNumero = [...livros].sort((a, b) =>
      b.isbn > a.isbn ? 1 : -1
    );
    setLivros(ordemDecrescenteNumero);
  };
  const crescenteTitulo = () => {
    const ordemCrescenteTitulo = [...livros].sort((a, b) =>
      a.titulo > b.titulo ? 1 : -1
    );
    setLivros(ordemCrescenteTitulo);
  };

  const decrescenteTitulo = () => {
    const ordemDecrescenteTitulo = [...livros].sort((a, b) =>
      b.titulo > a.titulo ? 1 : -1
    );
    setLivros(ordemDecrescenteTitulo);
  };
  const crescenteAutor = () => {
    const ordemCrescenteAutor = [...livros].sort((a, b) =>
      a.autor > b.autor ? 1 : -1
    );
    setLivros(ordemCrescenteAutor);
  };

  const decrescenteAutor = () => {
    const ordemDecrescenteAutor = [...livros].sort((a, b) =>
      b.autor > a.autor ? 1 : -1
    );
    setLivros(ordemDecrescenteAutor);
  };

  const addLivros = (isbn, titulo, autor) => {
    const newLivros = [
      ...livros,
      {
        isbn: isbn,
        titulo: titulo,
        autor: autor,
        id: uuidv4(),
      },
    ];
    setLivros(newLivros);
  };

  const excluirLivro = (livroId) => {
    const newLivros = livros.filter((livro) => {
      if (livro.id !== livroId) return true;
      return false;
    });
    setLivros(newLivros);
  };

  const cadastrarLivro = (livroIsbn, livroTitulo, livroAutor) => {
    const newLivros = [
      ...livros,
      {
        isbn: livroIsbn,
        titulo: livroTitulo,
        autor: livroAutor,
        id: uuidv4(),
      },
    ];
    setLivros(newLivros);
  };

  // Passando ref para outro componente

  return (
    <div className={`${styles.container} ${isDark ? "dark" : "light"} `}>
      <Router>
        <NavBar mudarTema={mudarTema} isDark={isDark} />

        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route
            path="/Tabela"
            exact
            element={
              <Tabela
                livros={livros}
                addLivros={addLivros}
                crescente={crescente}
                decrescente={decrescente}
                crescenteTitulo={crescenteTitulo}
                decrescenteTitulo={decrescenteTitulo}
                crescenteAutor={crescenteAutor}
                decrescenteAutor={decrescenteAutor}
                excluirLivro={excluirLivro}
              />
            }
          ></Route>
          <Route
            path="/cadastro"
            exact
            element={<Cadastro cadastrarLivro={cadastrarLivro} />}
          ></Route>
          <Route path="/animation" exact element={<OutroEstilo />}></Route>
          <Route path="/siteFlexbox" exact element={<SiteFlexbox />}></Route>
          <Route path="/musica" exact element={<Musica />}></Route>
          <Route
            path="/endereco"
            exact
            element={<Endereco isDark={isDark} />}
          ></Route>
          <Route path="/exercicioUm" exact element={<ExercicioUm />}></Route>
          <Route path="/jogos" exact element={<Jogos />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
        <ScrollToTop />
        <Footer isDark={isDark} />
      </Router>
    </div>
  );
}

export default App;
