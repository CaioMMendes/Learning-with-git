import { useEffect, useState } from "react";
const Teste = ({ namee }) => {
  //   const [name, setName] = useState();
  // const [numero, setNumero] = useState(4);
  const handleClick = () => {
    namee();
    // console.log(a);
  };
  console.log("renderizou o Teste");
  return (
    <div>
      <button onClick={handleClick}>Set name</button>

      {/* {a * numero} */}
    </div>
  );
};

export default Teste;
