import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants";

import { AppContext } from "../../context/AppContext";

import s from "./MobileNav.module.scss";

export const MobileNav: React.FC = (props) => {
  const { mobNav, closeMobNav } = useContext(AppContext);

  let navStyle = `${s.mobileNav}`;
  if (mobNav) {
    navStyle = `${s.mobileNav} ${s.open}`;
  }

  return (
    <nav className={navStyle}>
      <div className={s.container}>
        <ul>
          <li>
            <Link to={ROUTES.home} onClick={() => closeMobNav()}>
              <span className={s.pointer}>Strona główna</span>
            </Link>
          </li>
          <li>
            <span className={s.pointer}>Aktywności</span>
            <div className={s.dropdown}>
              <Link to={ROUTES.activitiesKids} onClick={() => closeMobNav()}>
                Kółko dziecięce
              </Link>
              <Link to={ROUTES.activitiesChoirs} onClick={() => closeMobNav()}>
                Schole parafialne
              </Link>
            </div>
          </li>
          <li>
            <span className={s.pointer}>
              <Link to={ROUTES.news} onClick={() => closeMobNav()}>
                Wiadomości
              </Link>
            </span>
          </li>
          <li>
            <Link to={ROUTES.contacts} onClick={() => closeMobNav()}>
              <span className={s.pointer}>Kontakty</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
