import React from "react";

import s from "./AHeader.module.scss";

export const AHeader: React.FC = () => {
  return (
    <header className={s.header}>
      <div className={s.container}>
        <div className={s.logo}>Admin Panel</div>
      </div>
    </header>
  );
};
