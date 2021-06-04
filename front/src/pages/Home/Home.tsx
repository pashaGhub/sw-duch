import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import { AppContext, ICustomPage } from "../../context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";

import { getCurrentNews } from "../../services/currentNewsServices";
import { getPages } from "../../services/customPageServices";

import { Decoration } from "../../components/Decoration/Decoration";
import { Leftbar } from "./Leftbar/Leftbar";
import { Rightbar } from "./Rightbar/Rightbar";
import { Card } from "../../components/Card/Card";

import main from "../../assets/imgs/main.jpeg";
import worshipImg from "../../assets/imgs/worship.jpg";
import youtubeimg from "../../assets/imgs/youtubeimg.jpg";
import Image1 from "../../assets/imgs/swduch.jpg";
import Image2 from "../../assets/imgs/love-neighbour.jpg";
import Image3 from "../../assets/imgs/bible-love.jpg";
import Image4 from "../../assets/imgs/bible-kid.jpg";

import s from "./Home.module.scss";
import "./Home.scss";
import { Spinner } from "../../components/Spinner/Spinner";

export const Home: React.FC = () => {
  const { handleLocation } = useContext(AppContext);
  const [news, setNews] = useState<Array<ICustomPage>>([]);
  const [articles, setArticles] = useState<Array<ICustomPage>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCurrentNews = async () => {
    const data: any = await getCurrentNews();

    if (data.status === 201 || 200) {
      setNews(data.data.pages);
    }

    if (data.status === 500) {
      console.log("Cannot load the news");
    }
  };

  const fetchArticles = async () => {
    const data: any = await getPages("article", 1, "", 5);

    if (data.status === 201 || 200) {
      setArticles(data.data.pages);
    }

    if (data.status === 500) {
      console.log("Cannot load the articles");
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchCurrentNews();
    fetchArticles();
    setLoading(false);
  }, []);

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
        <Leftbar />
        <div className={s.container}>
          <div className={s.news}>
            <div className={s.newsContainer}>
              {!!news.length &&
                news.map((item: ICustomPage) => <Card data={item} />)}
              <Spinner loading={loading} />
            </div>
          </div>

          <div className={s.history}>
            <img src={main} alt="main swduch" />
            <div className={s.historyText}>
              <h3>Historia kościoła</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum
                accusantium, laudantium aliquid, nisi inventore eum molestiae
                dolores suscipit esse distinctio nesciunt laboriosam cum facilis
                culpa expedita? Accusantium hic odio nihil! Lorem ipsum dolor
                sit amet, consectetur adipisicing elit. Harum accusantium,
                laudantium aliquid, nisi inventore eum molestiae dolores
                suscipit esse distinctio nesciunt laboriosam cum facilis culpa
                expedita? Accusantium hic odio nihil!Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Harum accusantium, laudantium
                aliquid, nisi inventore eum molestiae dolores suscipit esse
                distinctio nesciunt laboriosam cum facilis culpa expedita?
                Accusantium hic odio nihil!
                <br />
                <br />
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum
                accusantium, laudantium aliquid, nisi inventore eum molestiae
                dolores suscipit esse distinctio nesciunt laboriosam cum facilis
                culpa expedita? Accusantium hic odio nihil!Lorem ipsum dolor sit
                amet, consectetur adipisicing elit. Harum accusantium,
              </p>

              <a
                href={`${
                  window.location.pathname.split("/")[1]
                }/singlepage/60b8d333eead103aa65bdb3b`}
              >
                Więcej..
              </a>
            </div>
          </div>
          <div className={s.socialmedia}>
            <a href="https://www.facebook.com/parafiadswilno" target="_blank">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <span>Znajdź nas na facebook'u!</span>
          </div>
          <div className={s.worship}>
            <img src={worshipImg} alt="" />
            <div className={s.worshipText}>
              <h3>Uwielbiaj Boga razem z nami!</h3>
              <p>
                Wieczór uwielbienia każdy pierwszy wtorek miesiąca. Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Laboriosam quidem
                autem perferendis incidunt eaque in consequuntur omnis
                necessitatibus placeat sapiente exercitationem dolorum nesciunt,
                fugiat rerum sunt, eum maiores blanditiis laudantium.{" "}
              </p>
            </div>
          </div>
          <div className={s.youtube}>
            <a
              href="https://www.youtube.com/channel/UCVcv1m3Rivkkl9rrsPj2eQA"
              target="_blank"
            >
              <img src={youtubeimg} alt="" />
              <div className={s.youtubeText}>
                <h3>Odwiedź nasz kanał Youtube!</h3>
              </div>
            </a>
          </div>
        </div>

        <div className={s.rightbar}>
          {!!articles.length && <Rightbar arr={articles} />}
          <Spinner loading={loading} />
        </div>
      </div>
    </>
  );
};
