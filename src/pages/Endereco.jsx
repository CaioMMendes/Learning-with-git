import React, { useState, useEffect, useLayoutEffect } from "react";
import styles from "../css/Endereco.module.css";
import axios from "axios";
import validator from "validator";

const Endereco = ({ isDark }) => {
  const [isValid, setIsValid] = useState(true);
  const [location, setLocation] = useState({
    latitude: "",
    longitude: "",
    zipCode: "",
  });
  const [endereco, setEndereco] = useState({
    localidade: "",
    cep: "",
    logradouro: "",
    uf: "",
    complemento: "",
    bairro: "",
  });
  const [dados, setDados] = useState({
    nome: "",
    telefone: "",
    email: "",
    sexo: "",
  });
  const [isDisabled, setIsDisabled] = useState({
    localidade: false,
    cep: false,
    logradouro: false,
    uf: false,
    complemento: false,
    bairro: false,
  });

  function askForPermission() {
    // if (window.confirm("Would you like to share your location?")) {
    //   getLocation();
    // } else {
    // }
    getLocation();
  }

  useEffect(askForPermission, []);

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            zipCode: [position.coords.latitude, position.coords.longitude],
          });
        },

        (error) => {},
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  const onBlurnome = () => {
    let trimNome;
    trimNome =
      dados.nome && dados.nome.trim().split(" ").filter(Boolean).join(" ");
    setDados({ ...dados, nome: trimNome });
  };

  const onBlurLocalidade = () => {
    const trimLocalidade =
      endereco.localidade &&
      endereco.localidade.trim().split(" ").filter(Boolean).join(" ");
    setEndereco({
      ...endereco,
      localidade: trimLocalidade,
    });
  };

  const onBlurLogradouro = () => {
    const trimLogradouro =
      endereco.logradouro &&
      endereco.logradouro.trim().split(" ").filter(Boolean).join(" ");
    setEndereco({
      ...endereco,
      logradouro: trimLogradouro,
    });
  };

  const onBlurPais = () => {
    const trimPais =
      endereco.pais &&
      endereco.pais.trim().split(" ").filter(Boolean).join(" ");
    setEndereco({
      ...endereco,
      pais: trimPais,
    });
  };

  const onBlurComplemento = () => {
    const trimComplemento =
      endereco.complemento &&
      endereco.complemento.trim().split(" ").filter(Boolean).join(" ");
    setEndereco({
      ...endereco,
      complemento: trimComplemento,
    });
  };

  const onBlurbairro = () => {
    const trimBairro =
      endereco.bairro &&
      endereco.bairro.trim().split(" ").filter(Boolean).join(" ");
    setEndereco({
      ...endereco,
      bairro: trimBairro,
    });
  };

  const onBlurNumero = () => {
    const trimNumero =
      endereco.numero &&
      endereco.numero.trim().split(" ").filter(Boolean).join(" ");
    setEndereco({
      ...endereco,
      numero: trimNumero,
    });
  };

  let myString = "my   string   with   multiple    spaces   ";
  myString = myString.trim().split(" ").filter(Boolean).join(" ");

  //todo Onchange dados------------------------------------------------------------

  const onchangeNome = (e) => {
    // let nome = e.target.value.trim().split(" ").filter(Boolean).join(" ");
    //  let trimDados = dados.nome.trim().split(" ").filter(Boolean).join(" ");
    // setDados({ ...dados, nome: trimDados });
    setDados({ ...dados, nome: e.target.value });
  };

  const onchangeEmail = (e) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    // /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
    // if (e.target.value === "" || emailRegex.test(e.target.value)) {
    //   setIsValid(true);
    // } else {
    //   setIsValid(false);
    // }
    if (e.target.value === "" || validator.isEmail(e.target.value)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }

    setDados({ ...dados, email: e.target.value });
  };
  const onchangeTelefone = (e) => {
    let telefone = e.target.value.replace(/\D/g, "").substring(0, 11);
    let novoTelefone = telefone;
    if (telefone.length == 11) {
      novoTelefone =
        "(" +
        telefone.substring(0, 2) +
        ") " +
        telefone.substring(2, 7) +
        "-" +
        telefone.substring(7, 11);
    } else if (telefone.length > 2) {
      novoTelefone =
        "(" + telefone.substring(0, 2) + ") " + telefone.substring(2, 6);
      if (telefone.length >= 7) {
        novoTelefone += "-" + telefone.substring(6, 11);
      }
    }

    setDados({ ...dados, telefone: novoTelefone });
  };
  const onchangeSexo = (e) => {
    setDados({ ...dados, sexo: e.target.value });
  };

  //todo Onchange endereço------------------------------------------------------------
  const onchangeUF = (e) => {
    setEndereco({ ...endereco, uf: e.target.value });
  };
  const onchangeLocalidade = (e) => {
    setEndereco({ ...endereco, localidade: e.target.value });
  };
  const onchangePais = (e) => {
    setEndereco({ ...endereco, pais: e.target.value });
  };
  const onchangeLogradouro = (e) => {
    setEndereco({ ...endereco, logradouro: e.target.value });
  };
  const onchangeComplemento = (e) => {
    setEndereco({ ...endereco, complemento: e.target.value });
  };
  const onchangeNumero = (e) => {
    setEndereco({ ...endereco, numero: e.target.value });
  };
  const onchangeCep = (e) => {
    let cep = e.target.value.replace(/\D/g, "").substring(0, 8);
    if (cep.length > 5) {
      cep = cep.substring(0, 5) + "-" + cep.substring(5, 8);
    }
    cep.length < 9
      ? setIsDisabled({
          ...isDisabled,
          localidade: false,
          cep: false,
          logradouro: false,
          uf: false,
          complemento: false,
          bairro: false,
        })
      : "";
    setEndereco({ ...endereco, cep: cep });
  };
  const onchangeBairro = (e) => {
    setEndereco({ ...endereco, bairro: e.target.value });
  };
  function onSubmit(data) {
    console.log(data);
  }
  //todo -----------------------------------------------------------------------------
  const teste = () => {
    axios
      .get(`https://viacep.com.br/ws/${endereco.cep}/json`)
      .then((response) => {
        if (response.data.erro) {
          throw new Error("erro");
        }
        setEndereco({ ...endereco, ...response.data });

        setIsDisabled({
          ...isDisabled,
          logradouro: response.data.logradouro ? true : false,
          localidade: response.data.localidade ? true : false,
          numero: response.data.numero ? true : false,
          complemento: response.data.complemento ? true : false,
          uf: response.data.uf ? true : false,
          bairro: response.data.bairro ? true : false,
        });
      })

      .catch(() => {
        alert("Cep não encontrado");
      });
  };

  useEffect(() => {
    endereco.cep && endereco.cep.length > 8 ? teste() : "";
  }, [endereco.cep]);

  return (
    <div className="container">
      {location && (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          <p>Zip Code: {location.zipCode}</p>
        </div>
      )}

      {/* //todo----------------------------Dados------------------------------------------- */}
      <div className={`${styles.cadastro} ${!isDark && styles.cadastroLight} `}>
        <h1>Cadastro</h1>
        <fieldset className={styles.fieldset}>
          <legend>Dados</legend>
          <div className={styles.linha1}>
            <label className={styles.localidade}>
              {" "}
              Nome: <span className={styles.enderecoSpan}> * </span>
              <input
                type="text"
                value={dados.nome}
                placeholder="João da Silva"
                onChange={onchangeNome}
                onBlur={onBlurnome}
              />
            </label>
          </div>
          <div className={styles.linha2}>
            <label className={styles.localidade}>
              {" "}
              E-mail: <span className={styles.enderecoSpan}> * </span>
              <input
                type="email"
                name="email"
                placeholder="Joao@gmail.com"
                onChange={onchangeEmail}
                value={dados.email}
                // ref={register}
              />
              <div className={isValid ? styles.valido : styles.invalido}>
                E-mail inválido
              </div>
            </label>
            <label className={styles.localidade}>
              {" "}
              Telefone: <span className={styles.enderecoSpan}> * </span>
              <input
                type="tel"
                onChange={onchangeTelefone}
                placeholder="(99) 99999-9999"
                value={dados.telefone}
              />
            </label>
            <label className={styles.localidade}>
              {" "}
              sexo: <span className={styles.enderecoSpan}>&nbsp;*&nbsp;</span>
              <select
                name="sexo"
                id="sexo"
                defaultValue=" "
                onChange={onchangeSexo}
              >
                <option value=" " hidden></option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
                <option value="outros">Outros</option>
              </select>
            </label>
          </div>
          <p className={styles.obrigatorio}>
            Campos marcados com
            <span className={styles.enderecoSpan}>&nbsp;*&nbsp;</span> são
            obrigatórios!
          </p>
          {/* //todo-----------------------endereço-------------------------------------- */}
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend>Endereço</legend>
          <div className={styles.linha1}>
            <label className={styles.cep}>
              {" "}
              CEP: <span className={styles.enderecoSpan}> * </span>
              <input
                type="text"
                htmlFor="cep"
                id="cep"
                required="required"
                placeholder="99999-999"
                value={endereco.cep}
                onChange={onchangeCep}
              />
            </label>

            <label htmlFor="uf" className={styles.uf}>
              {" "}
              UF: <span className={styles.enderecoSpan}>&nbsp;*&nbsp;</span>
              <select
                name="uf"
                id="uf"
                htmlFor="uf"
                className={styles.menu}
                required
                onChange={onchangeUF}
                disabled={isDisabled.uf}
                value={endereco.uf}
              >
                {[
                  "",
                  "AC",
                  "AL",
                  "AP",
                  "AM",
                  "BA",
                  "CE",
                  "DF",
                  "ES",
                  "GO",
                  "MA",
                  "MT",
                  "MS",
                  "MG",
                  "PA",
                  "PB",
                  "PR",
                  "PE",
                  "PI",
                  "RJ",
                  "RN",
                  "RS",
                  "RO",
                  "RR",
                  "SC",
                  "SP",
                  "SE",
                  "TO",
                ].map((estado, index) => {
                  return (
                    <option
                      hidden={!estado ? true : false}
                      key={index}
                      value={estado}
                    >
                      {estado}
                    </option>
                  );
                })}
              </select>
            </label>
            <label className={styles.localidade}>
              {" "}
              Cidade: <span className={styles.enderecoSpan}> * </span>
              <input
                type="text"
                id="localidade"
                value={endereco.localidade}
                disabled={isDisabled.localidade}
                onChange={onchangeLocalidade}
                placeholder="Belo Horizonte"
                onBlur={onBlurLocalidade}
              />
            </label>
            <label className={styles.pais}>
              {" "}
              País: <span className={styles.enderecoSpan}> * </span>
              <input
                type="text"
                id="pais"
                value={endereco.pais}
                placeholder="Brasil"
                onChange={onchangePais}
                onBlur={onBlurPais}
              />
            </label>
          </div>
          <div className={styles.linha2}>
            <label className={styles.rua}>
              {" "}
              Rua: <span className={styles.enderecoSpan}> * </span>
              <input
                type="text"
                id="logradouro"
                value={endereco.logradouro}
                disabled={isDisabled.logradouro}
                placeholder="avenida Otacílio Negrão de Lima"
                onChange={onchangeLogradouro}
                onBlur={onBlurLogradouro}
              />
            </label>
            <label className={styles.localidade}>
              {" "}
              Bairro: <span className={styles.enderecoSpan}> * </span>
              <input
                type="text"
                id="bairro"
                value={endereco.bairro}
                disabled={isDisabled.bairro}
                placeholder="centro"
                onChange={onchangeBairro}
                onBlur={onBlurbairro}
              />
            </label>
            <label className={styles.numero}>
              {" "}
              Número: <span className={styles.enderecoSpan}> * </span>
              <input
                type="text"
                id="numero"
                onChange={onchangeNumero}
                value={endereco.numero}
                placeholder="999"
                onBlur={onBlurNumero}
              />
            </label>
            <label className={styles.complemento}>
              {" "}
              Complemento:{" "}
              <input
                type="text"
                id="complemento"
                value={endereco.complemento}
                disabled={isDisabled.complemento}
                onChange={onchangeComplemento}
                onBlur={onBlurComplemento}
              />
            </label>
          </div>
          <p className={styles.obrigatorio}>
            Campos marcados com
            <span className={styles.enderecoSpan}>&nbsp;*&nbsp;</span>são
            obrigatórios!
          </p>

          {/* {errors.email && <p>{errors.email.message}</p>} */}
        </fieldset>
      </div>

      {/* //todo ---------------------------------------------------------- */}
    </div>
  );
};

export default Endereco;
