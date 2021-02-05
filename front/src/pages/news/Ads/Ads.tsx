import React, { useContext } from "react";
// import { useRouteMatch } from "react-router-dom";

import { AppContext } from "../../../context/AppContext";
import { Card } from "../../../components/Card/Card";

import s from "./Ads.module.scss";

export const Ads: React.FC = () => {
  const { adsArr } = useContext(AppContext);
  // const { path, url } = useRouteMatch();

  return (
    <div className={s.container}>
      <h1 className={s.title}>Tablica ogłoszeń</h1>
      {/* <Card arr={adsArr} rail /> */}
    </div>
  );
};
