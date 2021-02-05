import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../../constants";
import { AuthContext } from "../../../context";

import s from "./Dashboard.module.scss";

export const Dashboard: React.FC = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className={s.container}>
      <div className={s.positionSticky}>
        <div className={s.section}>
          <NavLink
            to={ROUTES.aMainPanel}
            exact
            className={s.title}
            activeClassName={s.titleActive}
          >
            Home page
          </NavLink>
        </div>
        <div className={s.section}>
          <NavLink
            to={ROUTES.aCustomPage}
            exact
            className={s.title}
            activeClassName={s.titleActive}
          >
            Custom page
          </NavLink>
        </div>
        <div className={s.section}>
          <NavLink
            to="/"
            exact
            className={s.title}
            activeClassName={s.titleActive}
          >
            Overview content
          </NavLink>
        </div>
        <div className={s.section}>
          <NavLink
            to={ROUTES.home}
            exact
            className={s.title}
            activeClassName={s.titleActive}
            onClick={() => logout()}
          >
            Logout
          </NavLink>
        </div>
      </div>
    </div>
  );
};
