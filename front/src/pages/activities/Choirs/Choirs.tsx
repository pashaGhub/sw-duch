import React from "react";

import s from "./Choirs.module.scss";

export const Choirs: React.FC = () => {
  return (
    <div className={s.container}>
      <h1 className={s.sectionTitle}>Schole parafialne</h1>

      <div className={s.singleChoir}>
        <h3>Chór dziecięcy</h3>
        <div className={s.infoSection}>
          <span>Prowadzący/-a: </span> Imię Nazwisko
        </div>
        <div className={s.infoSection}>
          <span>Czas posługi: </span> Niedziela, 9:00
        </div>
        <div className={s.infoSection}>
          <span>Próby: </span> Środa, 19:00
        </div>
        <div className={s.infoSection}>
          <span>Kontakty: </span> email@choir.com, +37060000000
        </div>
        <div className={s.infoSection}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga quo
          asperiores nihil, dicta omnis fugiat voluptate voluptatem eos et ad
          quam expedita magni placeat maiores! Non beatae earum ea natus.
        </div>
      </div>

      <div className={s.singleChoir}>
        <h3>Schola młodzieżowa</h3>
        <div className={s.infoSection}>
          <span>Prowadzący/-a: </span> Imię Nazwisko
        </div>
        <div className={s.infoSection}>
          <span>Czas posługi: </span> Niedziela, 12:00
        </div>
        <div className={s.infoSection}>
          <span>Próby: </span> Czwartek, 19:00
        </div>
        <div className={s.infoSection}>
          <span>Kontakty: </span> email@choir.com, +37060000000
        </div>
        <div className={s.infoSection}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga quo
          asperiores nihil, dicta omnis fugiat voluptate voluptatem eos et ad
          quam expedita magni placeat maiores! Non beatae earum ea natus.
        </div>
      </div>
      <div className={s.singleChoir}>
        <h3>Schola parafialna</h3>
        <div className={s.infoSection}>
          <span>Prowadzący/-a: </span> Imię Nazwisko
        </div>
        <div className={s.infoSection}>
          <span>Czas posługi: </span> Niedziela, 18:00
        </div>
        <div className={s.infoSection}>
          <span>Próby: </span> Wtorek, 19:00
        </div>
        <div className={s.infoSection}>
          <span>Kontakty: </span> email@choir.com, +37060000000
        </div>
        <div className={s.infoSection}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga quo
          asperiores nihil, dicta omnis fugiat voluptate voluptatem eos et ad
          quam expedita magni placeat maiores! Non beatae earum ea natus.
        </div>
      </div>
    </div>
  );
};
