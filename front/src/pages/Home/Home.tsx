import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AppContext, ICustomPage } from "../../context/AppContext";

import { Decoration } from "../../components/Decoration/Decoration";
import { Sidebar } from "./Sidebar/Sidebar";
import { Card } from "../../components/Card/Card";
import { List } from "../../components/List/List";

import s from "./Home.module.scss";

export const Home: React.FC = () => {
  const { adsArr, articlesArr, handleLocation } = useContext(AppContext);
  const location = useLocation();

  useEffect(() => {
    handleLocation(location);
  }, [handleLocation, location]);

  return (
    <>
      <div className={s.mainFoto} />
      <Decoration />
      <div className={s.homePage}>
        <Sidebar />
        <div className={s.container}>
          <div className={s.news}>
            <div className={s.newsContainer}>
              {adsArr
                .filter((item: ICustomPage, ind: number) => ind < 3)
                .map((item: ICustomPage) => (
                  <Card data={item} />
                ))}
            </div>
          </div>
        </div>
        <div className={s.articleBar}>
          <div className={s.articleBarContainer}>
            <h1 className={s.sectionTitle}>Artykuły</h1>
            <List
              arr={articlesArr.filter(
                (item: ICustomPage, ind: number) => ind < 4
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};
