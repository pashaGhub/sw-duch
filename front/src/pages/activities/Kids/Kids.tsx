import React, { useContext } from "react";

import { AppContext } from "../../../context/AppContext";
import { Carousel } from "../../../components/Carousel/Carousel";

import s from "./Kids.module.scss";

export const Kids: React.FC = () => {
  const { kidsArr, kidsController } = useContext(AppContext);
  return (
    <div className={s.container}>
      <h1 className={s.sectionTitle}>Zajęcia pozalekcyjne dla dzieci</h1>

      <div className={s.text}>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis
          nostrum explicabo eius blanditiis vitae quae illum. Numquam maxime
          corrupti sit, impedit itaque tempora laboriosam consequuntur soluta,
          aut fugiat error nihil. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Modi nihil aperiam omnis laboriosam itaque rem
          culpa, recusandae at id error rerum odit, qui incidunt? Sapiente amet
          consequuntur repudiandae sequi velit. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Dolores adipisci eum quod commodi ea
          alias culpa aperiam officiis, magnam vel mollitia eius optio nobis id
          non enim itaque. Sequi, impedit.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
          aut labore dolore enim iure illum repudiandae alias ad ab explicabo
          quasi nam necessitatibus, reprehenderit voluptatem eligendi minus
          quam. Quae, tenetur. Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Assumenda est dolorum adipisci distinctio soluta at
          sit cumque perferendis libero alias incidunt exercitationem, ipsum
          accusantium quos quia blanditiis ipsam eum. Possimus.
        </p>
      </div>

      <Carousel slideArr={kidsArr} controller={kidsController} />
    </div>
  );
};
