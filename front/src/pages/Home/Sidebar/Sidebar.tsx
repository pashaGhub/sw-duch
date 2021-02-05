import React from "react";
import s from "./Sidebar.module.scss";

export const Sidebar: React.FC = () => {
  return (
    <div className={s.sidebar}>
      <div className={s.positionSticky}>
        <div className={s.schedule}>
          <h3>Rozkład Mszy Świętych:</h3>
          <ul>
            <li>
              <span>I-V :</span> 15:00, 18:00
            </li>
            <li>
              <span>VI :</span> 9:00, 15:00, 18:00
            </li>
            <li>
              <span>VII :</span> 8:00, 9:00, 10:30, 12:00, 15:00, 18:00
            </li>
          </ul>
        </div>
        <div className={s.upcomingEvents}>
          <h3>Nadchodzące wydarzenia:</h3>

          <div className={s.singleEvent}>
            <h4>Rekolekcje Oj. Adama Szustaka w Wilnie / 24-26 marca</h4>
            <p>
              Parafia pw. Ducha Świętego w Wilnie zaprasza na rekolekcje
              wielkopostne ze słynnym kaznodzieją.{" "}
              <a href="#/">Więcej informacji...</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
