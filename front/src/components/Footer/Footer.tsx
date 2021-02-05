import React from "react";
import s from "./Footer.module.scss";

export const Footer: React.FC = () => {
  return (
    <footer className={s.footer}>
      <div className={s.container}>
        <div>© Parafia Ducha Świętego w Wilnie</div>
        <div>
          <ul>
            <li>Adres: Dominikonų g. 8, Vilnius 01131</li>
            <li>Telefon: +37060000000</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
