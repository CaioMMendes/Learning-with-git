import React from "react";
import { useState, useRef } from "react";
import styles from "../css/pagesStyles/Home.module.css";

const Home = ({ isDark }) => {
  const [tecla, setTecla] = useState();
  const [nomeTecla, setNomeTecla] = useState();
  const qualTecla = (e) => {
    setNomeTecla(e.key);
    setTecla(e.keyCode);
  };

  const [numeros, setNumeros] = useState([0, -1, -2, 3, 5, 10]);

  const myElement = useRef(null);
  function scrollToMyElement() {
    myElement.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "start",
    });
  }

  const numerosPositivos = (numeros) => {
    return numeros.filter((numeros) => numeros > 0) + "";
  };

  return (
    <div className="containerCss">
      <input type="text" id="key" onKeyUp={qualTecla} value={nomeTecla} />
      <p>{nomeTecla}</p>
      <p>{tecla}</p>
      <button onClick={scrollToMyElement}>Scroll to Element</button>
      {/* <p>{numerosPositivos(numeros)}</p> */}
      <div className={isDark ? styles.textoHome : styles.textoHomeLight}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia maxime
        quod eligendi repudiandae non, labore facere harum error iusto, placeat
        fugit ullam, omnis dolorem magni a aspernatur? Ex, nulla necessitatibus
        dicta nostrum esse dolor vitae non expedita corporis id perferendis
        debitis commodi consectetur veritatis maxime explicabo. Saepe possimus
        odit error nihil voluptatem autem fugiat aliquam repellendus cum, quae
        rerum voluptatibus veniam exercitationem itaque, necessitatibus labore
        libero accusamus? Debitis iste eius tenetur iusto quasi? Quas, expedita
        repellat perspiciatis molestiae vel dicta dolor eaque culpa quis quam
        alias nobis numquam provident. Perspiciatis iste impedit, unde mollitia
        quia sed nemo sequi libero soluta consequuntur, asperiores officiis
        beatae reiciendis corrupti delectus commodi adipisci ab quaerat.
        Assumenda minus sit dicta illum officia aperiam dolorum vero nobis
        dolores sequi illo in, culpa nostrum hic laudantium vel tempora
        praesentium commodi. Exercitationem accusantium nam nulla dignissimos
        culpa, maxime aspernatur optio officiis voluptatibus, quam accusamus
        necessitatibus. Et, non! Id, ducimus obcaecati accusantium cum officiis
        enim veniam placeat nobis, quia minus soluta in culpa reprehenderit
        ratione? Expedita deleniti impedit ullam alias in tenetur neque
        quibusdam corporis voluptate reiciendis delectus provident at animi,
        odio distinctio ea omnis! Molestiae veritatis consequatur ea recusandae
        qui repudiandae vitae quod alias dolorum! Similique quos voluptate nemo
        veniam, aut at sit harum quas, perferendis ratione inventore a! Quia
        magni sunt quas laborum, adipisci necessitatibus modi tenetur numquam
        ex, officiis minima voluptates sapiente architecto ea dolorem odit nisi
        fuga? Iste esse quos, eveniet dicta delectus eligendi sunt possimus
        inventore, recusandae, illum omnis ullam! Dolor perferendis neque,
        facere architecto quia expedita maxime recusandae praesentium. Suscipit,
        aut. Tempore obcaecati recusandae laboriosam consectetur perspiciatis ab
        dolores! Laborum repellendus architecto aliquid ullam sapiente sit rem
        praesentium officia est, quidem similique error quod laudantium ad
        deleniti eius consectetur quia exercitationem perspiciatis, quam
        mollitia, id itaque dignissimos obcaecati? Deserunt quas sed facilis
        ullam, voluptas hic. Sunt sequi aliquam reiciendis iusto, assumenda
        eaque asperiores animi accusamus architecto corporis tenetur perferendis
        qui soluta veritatis eius. Rem aliquam excepturi veritatis eaque facere
        modi error porro sequi, praesentium tenetur, odio distinctio, officiis
        rerum laboriosam ipsum. Minus cupiditate doloribus, totam in similique
        sint neque tempore, harum assumenda tenetur praesentium velit animi
        natus consectetur, quidem vero illum! Accusamus natus totam voluptates
        quos a, quaerat dicta autem in consectetur laudantium architecto
        distinctio corrupti, fuga quasi ipsam aliquam non voluptatibus nulla
        reprehenderit, laboriosam esse vitae. Tempore aliquid ex unde facere?
        Tempore, deserunt beatae. Ipsum libero non ab minima esse officiis
        earum! Facilis nihil consequatur numquam incidunt nam nulla ab
        perspiciatis delectus dolorum quae? Officiis distinctio nihil iste
        assumenda repellat perspiciatis ullam animi accusamus amet, excepturi,
        soluta, temporibus totam. Ullam dolores facere fuga quo repellendus quam
        facilis. Animi asperiores corporis dolor optio voluptates incidunt
        sapiente quo minima, laborum repellat? Iure tenetur aut laboriosam quas
        minima accusamus numquam dignissimos facere quis illum alias delectus
        dolore, aliquam minus eligendi labore consequuntur libero perferendis.
        Alias recusandae, beatae culpa ipsa maiores reiciendis aut consequuntur
        voluptas maxime dignissimos ratione, facere, eos deserunt modi
        laboriosam vitae iste unde dolorem quo quam. Veniam libero magnam enim
        maiores eveniet hic voluptatem exercitationem autem quod nobis!
        Consequuntur possimus sunt delectus ut voluptates? Labore, voluptas.
        Alias tempora obcaecati, exercitationem iste dolorum consequuntur eos at
        aliquam voluptas. Deleniti, quaerat ad! Molestiae libero amet eaque
        voluptas consequatur atque voluptatibus mollitia odio quae consectetur
        eum adipisci nisi explicabo repudiandae praesentium quas veniam,
        perferendis, a saepe esse non beatae consequuntur, hic ducimus! Rerum
        accusantium provident perferendis reiciendis sequi iure quos nam atque
        quibusdam distinctio, quaerat earum cupiditate. Sunt, corporis.
        Reiciendis perspiciatis temporibus eligendi aliquid voluptatum quod nisi
        id maiores ipsa atque omnis recusandae iste nobis ipsam magnam, incidunt
        nam delectus. Tempora illum magnam quod sunt eaque dolores! Consequatur
        laboriosam repellat repudiandae voluptate pariatur maiores aliquam
        similique quam facilis impedit, ipsa quidem dolorum obcaecati, atque cum
        id facere voluptatum soluta ipsam fuga? Sit nulla cum iusto! Aspernatur
        eos cupiditate expedita voluptas ea dolore quisquam consequatur unde
        assumenda optio, placeat eaque illo ratione autem quaerat ducimus alias
        nulla est animi? Laudantium, hic! Itaque laboriosam aperiam sequi illum
        error! Eligendi repudiandae explicabo sunt. Voluptatibus odio excepturi
        eaque quam eligendi consectetur dolor veniam distinctio! Cumque
        inventore aspernatur autem sunt fuga debitis provident excepturi
        mollitia distinctio quo fugiat pariatur, iusto dolor placeat at
        doloremque in corrupti dolore. Sunt harum est quas accusamus iusto
        tempore velit tempora eaque fugiat inventore. Quisquam itaque illum,
        quos ipsum iusto qui fugit doloremque voluptatem iure. Voluptatum omnis
        soluta molestiae cumque saepe esse perferendis maiores sapiente odio
        iure nisi amet commodi, quidem perspiciatis, reiciendis cum nesciunt
        obcaecati sit modi architecto? Magni et amet error nisi quasi quod
        aliquid libero explicabo suscipit, sit velit soluta aperiam voluptate
        possimus aliquam, accusantium doloribus quas? Laboriosam placeat soluta
        excepturi consequatur? Praesentium culpa, blanditiis, fuga vel modi,
        eligendi quasi corporis nobis repudiandae quis laborum animi quos
        nesciunt eaque dolorem cupiditate provident a sapiente! Nesciunt numquam
        possimus quo accusantium magni, in ut illum incidunt enim omnis
        molestias veniam voluptas perspiciatis at libero necessitatibus eius
        distinctio, sunt nobis. Rerum, iste! Consectetur minima tempore quae
        officia quia autem earum repellat sed non laudantium voluptatibus
        dolorem aspernatur, sequi eligendi natus placeat ex? Optio, ullam.
        Placeat voluptate dicta minus ad suscipit ab ratione! Animi facere
        obcaecati quaerat saepe illo minus placeat aliquid consequatur adipisci
        sunt et, quasi exercitationem molestiae magni unde praesentium ex.
        Dolorum quia totam a dolor minima illo, ut mollitia tempore velit
        temporibus ducimus iure voluptate vel cupiditate deleniti. Officia
        voluptatem non, veritatis commodi similique recusandae quidem tenetur
        nihil tempore praesentium. Hic labore error animi dolorum iusto,
        molestias culpa esse dolores, facilis tempora alias laboriosam
        distinctio earum optio itaque ad vero cupiditate? Eius reiciendis
        numquam alias quo quaerat itaque corrupti at quam quod esse? Culpa,
        maiores laborum repellat modi sint a voluptatum fuga velit distinctio
        dolorem perferendis enim dignissimos dicta consectetur numquam adipisci
        magni explicabo voluptatem. Aut facere dolore asperiores recusandae, at
        laboriosam culpa laudantium quisquam ullam libero inventore, mollitia
        tempora assumenda ratione sequi molestias quia tenetur rerum deserunt
        odit non? Ad vitae deleniti blanditiis necessitatibus eos voluptatum
        eaque repellat magni voluptas, consectetur, natus iste exercitationem
        adipisci illum placeat, pariatur distinctio maiores illo itaque.
        Consequuntur!
      </div>
      <div ref={myElement}>aaaa</div>
      <div className={isDark ? styles.textoHome : styles.textoHomeLight}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia maxime
        quod eligendi repudiandae non, labore facere harum error iusto, placeat
        fugit ullam, omnis dolorem magni a aspernatur? Ex, nulla necessitatibus
        dicta nostrum esse dolor vitae non expedita corporis id perferendis
        debitis commodi consectetur veritatis maxime explicabo. Saepe possimus
        odit error nihil voluptatem autem fugiat aliquam repellendus cum, quae
        rerum voluptatibus veniam exercitationem itaque, necessitatibus labore
        libero accusamus? Debitis iste eius tenetur iusto quasi? Quas, expedita
        repellat perspiciatis molestiae vel dicta dolor eaque culpa quis quam
        alias nobis numquam provident. Perspiciatis iste impedit, unde mollitia
        quia sed nemo sequi libero soluta consequuntur, asperiores officiis
        beatae reiciendis corrupti delectus commodi adipisci ab quaerat.
        Assumenda minus sit dicta illum officia aperiam dolorum vero nobis
        dolores sequi illo in, culpa nostrum hic laudantium vel tempora
        praesentium commodi. Exercitationem accusantium nam nulla dignissimos
        culpa, maxime aspernatur optio officiis voluptatibus, quam accusamus
        necessitatibus. Et, non! Id, ducimus obcaecati accusantium cum officiis
        enim veniam placeat nobis, quia minus soluta in culpa reprehenderit
        ratione? Expedita deleniti impedit ullam alias in tenetur neque
        quibusdam corporis voluptate reiciendis delectus provident at animi,
        odio distinctio ea omnis! Molestiae veritatis consequatur ea recusandae
        qui repudiandae vitae quod alias dolorum! Similique quos voluptate nemo
        veniam, aut at sit harum quas, perferendis ratione inventore a! Quia
        magni sunt quas laborum, adipisci necessitatibus modi tenetur numquam
        ex, officiis minima voluptates sapiente architecto ea dolorem odit nisi
        fuga? Iste esse quos, eveniet dicta delectus eligendi sunt possimus
        inventore, recusandae, illum omnis ullam! Dolor perferendis neque,
        facere architecto quia expedita maxime recusandae praesentium. Suscipit,
        aut. Tempore obcaecati recusandae laboriosam consectetur perspiciatis ab
        dolores! Laborum repellendus architecto aliquid ullam sapiente sit rem
        praesentium officia est, quidem similique error quod laudantium ad
        deleniti eius consectetur quia exercitationem perspiciatis, quam
        mollitia, id itaque dignissimos obcaecati? Deserunt quas sed facilis
        ullam, voluptas hic. Sunt sequi aliquam reiciendis iusto, assumenda
        eaque asperiores animi accusamus architecto corporis tenetur perferendis
        qui soluta veritatis eius. Rem aliquam excepturi veritatis eaque facere
        modi error porro sequi, praesentium tenetur, odio distinctio, officiis
        rerum laboriosam ipsum. Minus cupiditate doloribus, totam in similique
        sint neque tempore, harum assumenda tenetur praesentium velit animi
        natus consectetur, quidem vero illum! Accusamus natus totam voluptates
        quos a, quaerat dicta autem in consectetur laudantium architecto
        distinctio corrupti, fuga quasi ipsam aliquam non voluptatibus nulla
        reprehenderit, laboriosam esse vitae. Tempore aliquid ex unde facere?
        Tempore, deserunt beatae. Ipsum libero non ab minima esse officiis
        earum! Facilis nihil consequatur numquam incidunt nam nulla ab
        perspiciatis delectus dolorum quae? Officiis distinctio nihil iste
        assumenda repellat perspiciatis ullam animi accusamus amet, excepturi,
        soluta, temporibus totam. Ullam dolores facere fuga quo repellendus quam
        facilis. Animi asperiores corporis dolor optio voluptates incidunt
        sapiente quo minima, laborum repellat? Iure tenetur aut laboriosam quas
        minima accusamus numquam dignissimos facere quis illum alias delectus
        dolore, aliquam minus eligendi labore consequuntur libero perferendis.
        Alias recusandae, beatae culpa ipsa maiores reiciendis aut consequuntur
        voluptas maxime dignissimos ratione, facere, eos deserunt modi
        laboriosam vitae iste unde dolorem quo quam. Veniam libero magnam enim
        maiores eveniet hic voluptatem exercitationem autem quod nobis!
        Consequuntur possimus sunt delectus ut voluptates? Labore, voluptas.
        Alias tempora obcaecati, exercitationem iste dolorum consequuntur eos at
        aliquam voluptas. Deleniti, quaerat ad! Molestiae libero amet eaque
        voluptas consequatur atque voluptatibus mollitia odio quae consectetur
        eum adipisci nisi explicabo repudiandae praesentium quas veniam,
        perferendis, a saepe esse non beatae consequuntur, hic ducimus! Rerum
        accusantium provident perferendis reiciendis sequi iure quos nam atque
        quibusdam distinctio, quaerat earum cupiditate. Sunt, corporis.
        Reiciendis perspiciatis temporibus eligendi aliquid voluptatum quod nisi
        id maiores ipsa atque omnis recusandae iste nobis ipsam magnam, incidunt
        nam delectus. Tempora illum magnam quod sunt eaque dolores! Consequatur
        laboriosam repellat repudiandae voluptate pariatur maiores aliquam
        similique quam facilis impedit, ipsa quidem dolorum obcaecati, atque cum
        id facere voluptatum soluta ipsam fuga? Sit nulla cum iusto! Aspernatur
        eos cupiditate expedita voluptas ea dolore quisquam consequatur unde
        assumenda optio, placeat eaque illo ratione autem quaerat ducimus alias
        nulla est animi? Laudantium, hic! Itaque laboriosam aperiam sequi illum
        error! Eligendi repudiandae explicabo sunt. Voluptatibus odio excepturi
        eaque quam eligendi consectetur dolor veniam distinctio! Cumque
        inventore aspernatur autem sunt fuga debitis provident excepturi
        mollitia distinctio quo fugiat pariatur, iusto dolor placeat at
        doloremque in corrupti dolore. Sunt harum est quas accusamus iusto
        tempore velit tempora eaque fugiat inventore. Quisquam itaque illum,
        quos ipsum iusto qui fugit doloremque voluptatem iure. Voluptatum omnis
        soluta molestiae cumque saepe esse perferendis maiores sapiente odio
        iure nisi amet commodi, quidem perspiciatis, reiciendis cum nesciunt
        obcaecati sit modi architecto? Magni et amet error nisi quasi quod
        aliquid libero explicabo suscipit, sit velit soluta aperiam voluptate
        possimus aliquam, accusantium doloribus quas? Laboriosam placeat soluta
        excepturi consequatur? Praesentium culpa, blanditiis, fuga vel modi,
        eligendi quasi corporis nobis repudiandae quis laborum animi quos
        nesciunt eaque dolorem cupiditate provident a sapiente! Nesciunt numquam
        possimus quo accusantium magni, in ut illum incidunt enim omnis
        molestias veniam voluptas perspiciatis at libero necessitatibus eius
        distinctio, sunt nobis. Rerum, iste! Consectetur minima tempore quae
        officia quia autem earum repellat sed non laudantium voluptatibus
        dolorem aspernatur, sequi eligendi natus placeat ex? Optio, ullam.
        Placeat voluptate dicta minus ad suscipit ab ratione! Animi facere
        obcaecati quaerat saepe illo minus placeat aliquid consequatur adipisci
        sunt et, quasi exercitationem molestiae magni unde praesentium ex.
        Dolorum quia totam a dolor minima illo, ut mollitia tempore velit
        temporibus ducimus iure voluptate vel cupiditate deleniti. Officia
        voluptatem non, veritatis commodi similique recusandae quidem tenetur
        nihil tempore praesentium. Hic labore error animi dolorum iusto,
        molestias culpa esse dolores, facilis tempora alias laboriosam
        distinctio earum optio itaque ad vero cupiditate? Eius reiciendis
        numquam alias quo quaerat itaque corrupti at quam quod esse? Culpa,
        maiores laborum repellat modi sint a voluptatum fuga velit distinctio
        dolorem perferendis enim dignissimos dicta consectetur numquam adipisci
        magni explicabo voluptatem. Aut facere dolore asperiores recusandae, at
        laboriosam culpa laudantium quisquam ullam libero inventore, mollitia
        tempora assumenda ratione sequi molestias quia tenetur rerum deserunt
        odit non? Ad vitae deleniti blanditiis necessitatibus eos voluptatum
        eaque repellat magni voluptas, consectetur, natus iste exercitationem
        adipisci illum placeat, pariatur distinctio maiores illo itaque.
        Consequuntur!
      </div>
    </div>
  );
};

export default Home;
