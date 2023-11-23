import React from "react";
import { useState, useEffect, useRef } from "react";
import styles from "../../css/componentsStyles/navbarCss/NavBar.module.css";
import { BsFillGearFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosArrowBack, IoIosClose } from "react-icons/io";
import SwitchComponent from "../SwitchComponent";
import NavbarUser from "./NavbarUser";
import NavbarHamburguer from "./NavbarHamburguer";
import { ClickOutside } from "../smallComponents/ClickOutside";

import { Link } from "react-router-dom";

const NavBar = ({ mudarTema, isDark }) => {
  const checkedSwitch = false;

  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  ClickOutside(ref, () => setIsOpen(false));

  const root = getComputedStyle(document.querySelector(":root"));

  //Todo -------------- Muda o valor da variável do css
  // document
  //   .querySelector(":root")
  //   .style.setProperty("--navbarBackground", "pink");

  // const button = document.getElementById("dark-mode-button");

  // Obtém o estado do modo escuro do LocalStorage (se houver)
  // const currentMode = localStorage.getItem("darkMode");

  // Se houver um estado salvo, define a classe do modo escuro no corpo da página
  // if (currentMode === "dark") {
  //   document.body.classList.add("dark-mode");
  //   button.innerText = "Light Mode";
  // }

  // button.addEventListener("click", () => {
  //   document.body.classList.toggle("dark-mode");
  //   if (document.body.classList.contains("dark-mode")) {
  //     localStorage.setItem("dark-mode", "dark");
  //     button.innerText = "Light Mode";
  //   } else {
  //     localStorage.removeItem("dark-mode");
  //     button.innerText = "Dark Mode";
  //   }
  // });

  return (
    <nav className={`${styles.navbar} dark`}>
      <div className={styles.burguerContainer}>
        <button
          className={styles.burger}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {isOpen ? (
            <IoIosClose className={styles.closeIcon} />
          ) : (
            <GiHamburgerMenu className={styles.burgerIcon} />
          )}
        </button>
      </div>

      <div
        ref={ref}
        className={`${styles.dropdowns} ${isOpen ? styles.open : styles.close}`}
      >
        <Link to="/" className={styles.menu}>
          Home
        </Link>
        <div className={styles.dropdown}>
          <button className={styles.button}>
            Páginas
            <IoIosArrowBack className={styles.arrow} />
          </button>
          <div className={styles.dropdownMenu}>
            {" "}
            <Link to="/Tabela" className={styles.menuDrop}>
              <button>Tabela</button>
            </Link>
            <Link to="/siteFlexbox" className={styles.menuDrop}>
              <button>Site Flexbox</button>
            </Link>
            <Link to="/testando-react-form" className={styles.menuDrop}>
              <button>React form</button>
            </Link>
          </div>
        </div>
        <div className={styles.dropdown}>
          <button className={styles.button}>
            Teste
            <IoIosArrowBack className={styles.arrow} />
          </button>
          <div className={styles.dropdownMenu}>
            <Link to="/qr-code" className={styles.menuDrop}>
              <button>QR Code Generator </button>
            </Link>
            <Link to="/animation" className={styles.menuDrop}>
              <button>Animation</button>
            </Link>
            <Link to="/exercicioUm" className={styles.menuDrop}>
              <button>Exercicio 1</button>
            </Link>
            <Link to="/news" className={styles.menuDrop}>
              <button>Notícias</button>
            </Link>
          </div>
        </div>
        <div className={styles.dropdown}>
          <button className={styles.button}>
            Teste2
            <IoIosArrowBack className={styles.arrow} />
          </button>
          <div className={styles.dropdownMenu}>
            <Link to="/musica" className={styles.menuDrop}>
              <button>Música</button>
            </Link>
            <Link to="/endereco" className={styles.menuDrop}>
              <button>Endereço</button>
            </Link>
          </div>
        </div>
        {/* ---------------------- */}
        <div className={styles.dropdown}>
          <button className={styles.button}>
            Jogos
            <IoIosArrowBack className={styles.arrow} />
          </button>
          <div className={styles.dropdownMenu}>
            <Link to="/jogos" className={styles.menuDrop}>
              <button>Jogos</button>
            </Link>
          </div>
        </div>
      </div>

      {/* <div className={styles.settings}>
        <div className={styles.menuSettings}>
          <BsFillGearFill />
          <label htmlFor="dropControl">
            <input type="checkbox" id="dropControl" />
            <div className={styles.dropSettings}>
              <label className={styles.label}>
                Mudar background
                <input
                  className={styles.input}
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => {
                    inputChange(e);
                    mudarBackground(backgroundColor);
                  }}
                />
              </label>
            </div>
          </label>
        </div>
      </div> */}
      <div className={styles.rightNavbar}>
        {" "}
        <div className={styles.switchStyle}>
          <label className={styles.themeText}>
            <p>Theme</p>
            <SwitchComponent
              onChange={mudarTema}
              isDark={isDark}
              checkedSwitch={checkedSwitch}
            />
          </label>
        </div>
        <NavbarUser />
      </div>
    </nav>
  );
};

export default NavBar;
