import React from "react";

import { ICustomPage } from "../../context/AppContext";
import img from "../../assets/imgs/love-neighbour.jpg";

import s from "./CustomPage.module.scss";

interface IProps {
  info: ICustomPage;
}

export const CustomPage: React.FC<IProps> = (props) => {
  const { info } = props;
  return (
    <div className={s.container}>
      <img src={info.image} alt="" />
      <h1 className={s.title}>{info.title}</h1>
      <div
        className={s.info}
        dangerouslySetInnerHTML={{ __html: info.content }}
      ></div>
    </div>
  );
};
