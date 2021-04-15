import React from "react";
import { Link } from "react-router-dom";

import { ICustomPage } from "../../context/AppContext";

import s from "./List.module.scss";

interface IList {
  arr: ICustomPage[];
}

export const List: React.FC<IList> = (props) => {
  const { arr } = props;
  return (
    <div className={s.container}>
      {arr.map((item, ind) => {
        return (
          <div className={s.listItem} key={ind}>
            <Link to={`/${item._id}`}>
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
