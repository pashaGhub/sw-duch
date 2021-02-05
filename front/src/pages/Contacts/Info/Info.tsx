import React from "react";
import s from "./Info.module.scss";

export const Info: React.FC = () => {
  return (
    <div className={s.info}>
      <div className={s.infoSection}>
        <h3>Kapłani:</h3>
        <p>
          <span>Proboszcz:</span> ks. Tadeusz Jasiński
        </p>
        <p>
          <span>Wikary:</span> ks. Andrzej Byliński
        </p>
        <p>
          <span>Kapłani posługujący w Parafii:</span> oj. Jacek Szpręglewski
        </p>
      </div>
      <div className={s.infoSection}>
        <h3>Kontakty:</h3>
        <p>
          <span>Adress:</span> Dominikonų g. 8, Vilnius 01131
        </p>
        <p>
          <span>Telefon:</span> +37060000000
        </p>
        <p>
          <span>E-mail:</span> parafia@mail.com
        </p>
        <p>
          znajdź nas na{" "}
          <a
            href="https://www.facebook.com/parafiadswilno/"
            target="_blank"
            rel="noopener noreferrer"
          >
            FACEBOOK'u
          </a>
        </p>
      </div>
    </div>
  );
};
