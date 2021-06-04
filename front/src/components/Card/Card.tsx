import React from "react";
import { Link } from "react-router-dom";

import { ICustomPage } from "../../context/AppContext";

import s from "./Card.module.scss";

interface ICard {
  data: ICustomPage;
}

export const Card: React.FC<ICard> = ({ data }) => {
  return (
    <div className={s.card} key={data._id}>
      <div className={s.content}>
        <h2>Aktualia</h2>
        <h3>{data.title}</h3>

        <p>{data.description}</p>
        <Link to={`${window.location.origin}/singlepage/${data._id}`}>
          Więcej..
        </Link>
      </div>
    </div>
  );
};
