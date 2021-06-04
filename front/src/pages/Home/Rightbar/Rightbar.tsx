import React from "react";
import { Link } from "react-router-dom";

import { ICustomPage } from "../../../context/AppContext";

import s from "./Rightbar.module.scss";

interface IRightbar {
  arr: ICustomPage[];
}

export const Rightbar: React.FC<IRightbar> = (props) => {
  const { arr } = props;
  return (
    <div className={s.container}>
      <h1 className={s.leftbarTitle}>Artykuły</h1>
      {arr
        .filter((item: ICustomPage, ind: number) => ind < 4)
        .map((item, ind) => {
          return (
            <div className={s.listItem} key={ind}>
              <Link to={`/singlepage/${item._id}`}>
                <img src={item.image} alt="" />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </Link>
            </div>
          );
        })}
    </div>
  );
};
