import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import { AppContext, ICustomPage } from "../../context/AppContext";
// import { usePageSearch } from "../../hooks";

import { Decoration } from "../../components/Decoration/Decoration";
import { Sidebar } from "./Sidebar/Sidebar";
import { Leftbar } from "./Leftbar/Leftbar";
import { Card } from "../../components/Card/Card";
import { List } from "../../components/List/List";

import Image1 from "../../assets/imgs/swduch.jpg";
import Image2 from "../../assets/imgs/love-neighbour.jpg";
import Image3 from "../../assets/imgs/bible-love.jpg";
import Image4 from "../../assets/imgs/bible-kid.jpg";

import s from "./Home.module.scss";
import "./Home.scss";

export const Home: React.FC = () => {
  const { adsArr, articlesArr, handleLocation } = useContext(AppContext);

  const location = useLocation();

  const images = [
    {
      original: Image1,
    },
    {
      original: Image2,
    },
    {
      original: Image3,
    },
    {
      original: Image4,
    },
  ];

  useEffect(() => {
    handleLocation(location);
  }, [handleLocation, location]);

  return (
    <>
      <ImageGallery
        additionalClass="homeGallery"
        items={images}
        showNav={false}
        showFullscreenButton={false}
        showPlayButton={false}
        showThumbnails={false}
        autoPlay={true}
        slideInterval={10000}
        slideDuration={1000}
      />
      <div className={s.mobileFoto} />
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
        <div className={s.leftbar}>
          <Leftbar arr={articlesArr} />
        </div>
      </div>
    </>
  );
};
