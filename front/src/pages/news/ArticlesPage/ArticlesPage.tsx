import React, { useContext } from "react";

import { AppContext } from "../../../context/AppContext";
import { List } from "../../../components/List/List";

import s from "./ArticlesPage.module.scss";

export const ArticlesPage: React.FC = () => {
  const { articlesArr } = useContext(AppContext);
  return (
    <div className={s.container}>
      <h1 className={s.title}>Artykuły</h1>
      <List arr={articlesArr} />
    </div>
  );
};
