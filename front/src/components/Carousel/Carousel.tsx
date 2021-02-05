import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import s from "./Carousel.module.scss";

import { ISlide } from "../../context/AppContext";

interface ICarousel {
  smallWidth?: boolean;
  slideArr: ISlide[];
  controller: any;
}

export const Carousel: React.FC<ICarousel> = (props: ICarousel) => {
  const { smallWidth, slideArr, controller } = props;

  let carouselStyle = `${s.carousel}`;
  let btnStyle = "";
  if (smallWidth) {
    carouselStyle = `${s.carousel} ${s.smallWidth}`;
    btnStyle = `${s.smallWidthBtn}`;
  }

  return (
    <div className={carouselStyle}>
      {slideArr.map((item: ISlide, ind: number) => (
        <div
          key={ind}
          className={s.slide}
          style={{ transform: `translateX(${controller.x}%)` }}
        >
          <img src={item.img} alt="" />
          <p className={s.label}>{item.label}</p>
        </div>
      ))}
      <button
        className={`${s.leftBtn} ${btnStyle}`}
        onClick={() => controller.goLeft(slideArr)}
      >
        <FontAwesomeIcon icon={faChevronLeft} size="2x" />
      </button>
      <button
        className={`${s.rightBtn} ${btnStyle}`}
        onClick={() => controller.goRight(slideArr)}
      >
        <FontAwesomeIcon icon={faChevronRight} size="2x" />
      </button>
    </div>
  );
};
