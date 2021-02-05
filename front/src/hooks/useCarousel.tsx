import { useState } from "react";
import { ISlide } from "../context/AppContext";

export const useCarousel: Function = () => {
  const [x, setX] = useState<number>(0); //Contact image carousel

  const goLeft: Function = (slideArr: ISlide[]) => {
    x === 0 ? setX((slideArr.length - 1) * -100) : setX(x + 100);
  };

  const goRight: Function = (slideArr: ISlide[]) => {
    x === (slideArr.length - 1) * -100 ? setX(0) : setX(x - 100);
  };

  return { x, goRight, goLeft };
};
