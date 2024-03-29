import React, { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import styles from "./App.module.css";
import "./index.css";
import Tabela from "./pages/Tabela";
import Cadastro from "./pages/Cadastro";
import OutroEstilo from "./pages/Animation";
import NavBar from "./components/navbar/NavBar";
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
import Sobre from "./pages/Sobre";
import News from "./pages/News";
import NewsList from "./pages/NewsList";
import LoginUser from "./pages/LoginUser";
import RegisterUser from "./pages/RegisterUser";
import RecoverPassword from "./pages/RecoverPassword";
import { useDispatch } from "react-redux";
import { changeLivros } from "./redux/LivrosSlice";
import { changeIsDark } from "./redux/IsDarkSlice";
import { changeIsLogged } from "./redux/isLoggedSlice";
import { useSelector } from "react-redux";
import { UserApi } from "./hooks/UserApi";
import { localStorageToken } from "./components/smallComponents/LocalStorage";
import ProfileLogado from "./pages/ProfileLogado";
import RecoverPasswordSent from "./pages/RecoverPasswordSent";
import EmailVerificated from "./pages/EmailVerificated";
import useApiPrivate from "./hooks/useApiPrivate";
import TestandoReactForm from "./pages/TestandoReactForm";
import QrCode from "./pages/QRCode";
import { isDarkContext } from "./contexts/IsDarkContext";
import Estudando from "./pages/Estudando";

function App() {
  const { isLogged } = useSelector((state) => state.isLoggedRedux);
  const apiPrivate = useApiPrivate();
  const dispatch = useDispatch();
  const { isDark, setIsDark } = useContext(isDarkContext);
  useEffect(() => {
    const getData = async () => {
      const token = localStorageToken();
      const api = UserApi();

      try {
        await apiPrivate
          .post("/userinfo")
          .then((response) => {
            console.log(response.data);
            if (response.data.avatarId === null) {
              localStorage.setItem("userImg", response.data.picture);
            } else {
              localStorage.setItem("userImg", response.data.avatarId);
            }

            dispatch(changeIsLogged({ ...response.data, logado: true }));
          })
          .catch((error, response) => {
            dispatch(changeIsLogged({ ...isLogged, logado: false }));
            console.log(error);
            console.log(response);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

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

  useEffect(() => {
    dispatch(changeLivros(livros));
  }, [livros]);
  // const [isDark, setIsDark] = useState(!!Cookies.get("dark"));

  // const currentMode = localStorage.getItem("darkMode");
  const mudarTema = () => {
    console.log(isDark);
    const novoIsDark = !isDark;
    setIsDark(novoIsDark);

    if (novoIsDark) {
      Cookies.set("dark", true);
    } else {
      Cookies.remove("dark");
    }

    // setIsDark(!isDark);

    // isDark
    //   ? (setIsDark(false), Cookies.remove("dark"))
    //   : (setIsDark(true), Cookies.set("dark", true));
  };

  // Se não usar dentro do useEffect da warning
  useEffect(() => {
    dispatch(changeIsDark(isDark));
  }, [isDark]);

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
  const newsData = [
    { id: 1, title: "Notícia 1", content: "Conteúdo da notícia 1" },
    { id: 2, title: "Notícia 2", content: "Conteúdo da notícia 2" },
    { id: 3, title: "Notícia 3", content: "Conteúdo da notícia 3" },
  ];
  return (
    <div className={`${styles.container} ${isDark ? "dark" : "light"} `}>
      <Router>
        <NavBar mudarTema={mudarTema} isDark={isDark} />

        <Routes>
          <Route path="/" exact element={<Home isDark={isDark} />}></Route>
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
          <Route path="/sobre" element={<Sobre />}></Route>

          <Route
            path="/news/:id"
            exact
            element={<News newsData={newsData} />}
          ></Route>
          <Route
            path="/news"
            exact
            element={<NewsList newsData={newsData} />}
          ></Route>
          <Route path="/account/login" exact element={<LoginUser />}></Route>
          <Route
            path="/account/register"
            exact
            element={<RegisterUser isDark={isDark} />}
          ></Route>
          <Route
            path="/account/recover-password"
            exact
            element={<RecoverPassword />}
          ></Route>
          <Route
            path="/account/recover-password/sent"
            exact
            element={<RecoverPasswordSent />}
          ></Route>
          <Route path="/account/profile" exact element={<ProfileLogado />} />
          <Route
            path="/account/register/email-verificated"
            exact
            element={<EmailVerificated />}
          />
          <Route
            path="/testando-react-form"
            exact
            element={<TestandoReactForm />}
          />
          <Route path="/qr-code" exact element={<QrCode />} />
          <Route path="/estudando" exact element={<Estudando />} />
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
        <ScrollToTop />
        <Footer isDark={isDark} />
      </Router>
    </div>
  );
}

export default App;
