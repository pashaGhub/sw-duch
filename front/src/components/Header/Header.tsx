import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { ROUTES } from "../../constants";

import { AppContext } from "../../context/AppContext";
import { Burger } from "../Burger/Burger";

import s from "./Header.module.scss";

export const Header: React.FC = () => {
  const { closeMobNav } = useContext(AppContext);

  return (
    <header className={s.header}>
      <div className={s.container}>
        <div className={s.logo}>
          <Link to={ROUTES.home} onClick={() => closeMobNav()}>
            Św. Duch
          </Link>
        </div>

        <Burger />
        <nav className={s.navBar}>
          <ul>
            <li>
              <span className={s.navItem}>
                <NavLink to={ROUTES.home} exact>
                  Strona główna
                </NavLink>
              </span>
            </li>
            <li>
              <span className={s.navItem}>Aktywności</span>
              <div className={s.dropdown}>
                <NavLink to={ROUTES.activitiesKids} exact>
                  Kółko dziecięce
                </NavLink>
                <NavLink to={ROUTES.activitiesChoirs} exact>
                  Schole parafialne
                </NavLink>
              </div>
            </li>
            <li>
              <span className={s.navItem}>
                <NavLink to={ROUTES.news} exact>
                  Wiadomości
                </NavLink>
              </span>
            </li>
            <li>
              <span className={s.navItem}>
                <NavLink to={ROUTES.contacts} exact>
                  Kontakty
                </NavLink>
              </span>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
