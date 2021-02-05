import React from "react";
import topSVG from "../../assets/imgs/wavesTop.svg";
import bottomSVG from "../../assets/imgs/wavesBottom.svg";

import s from "./Decoration.module.scss";

interface IDecoration {
  customClass?: string;
}

export const Decoration: React.FC<IDecoration> = ({ customClass }) => {
  let style = s.bgDecoration;

  if (customClass) {
    style = `${s.bgDecoration} ${customClass}`;
  }

  return (
    <div className={style}>
      <img src={topSVG} alt="" />
      <img src={bottomSVG} alt="" />
    </div>
  );
};
