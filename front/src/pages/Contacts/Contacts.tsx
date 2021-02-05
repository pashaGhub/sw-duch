import React, { useContext } from "react";

import { Info } from "./Info/Info";
import { Decoration } from "../../components/Decoration/Decoration";
import { LocationMap } from "../../components/LocationMap/LocationMap";
import { Carousel } from "../../components/Carousel/Carousel";
import { AppContext } from "../../context/AppContext";

import s from "./Contacts.module.scss";

export const Contacts: React.FC = () => {
  const { contactArr, contactController } = useContext(AppContext);

  return (
    <>
      <Decoration customClass={s.contactsDecoration} />
      <div className={s.container}>
        <div className={s.info}>
          <Info />
          <Carousel
            slideArr={contactArr}
            controller={contactController}
            smallWidth
          />
        </div>

        <div className={s.map}>
          <LocationMap />
        </div>
      </div>
    </>
  );
};
