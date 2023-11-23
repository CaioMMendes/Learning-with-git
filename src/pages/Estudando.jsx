import { useEffect, useState } from "react";
import Teste from "../components/smallComponents/Teste";
import { useCallback } from "react";
const Estudando = () => {
  const [a, setA] = useState(false);
  console.log("renderizou Estudando");

  const [name, setName] = useState("lucao");
  const setNameCallback = useCallback(() => {
    setName((prevCall) => prevCall + "a");
  }, []);

  const handleA = () => {
    setA(!a);
  };

  return (
    <main className=" bg-red-400">
      <button onClick={handleA}>click me</button>
      <Teste namee={setNameCallback} />
      {`${a}`}
      {name}
      {/* <Teste name={name} setName={setName} /> */}
    </main>
  );
};

export default Estudando;
