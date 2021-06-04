import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ICustomPage } from "../../../context/AppContext";
import { getEvents } from "../../../services/eventsServices";
import s from "./Leftbar.module.scss";

export const Leftbar: React.FC = () => {
  const [events, setEvents] = useState<Array<ICustomPage>>([]);

  const fetchEvents = async () => {
    const data: any = await getEvents();

    if (data.status === 201 || 200) {
      setEvents(data.data.pages);
    }

    if (data.status === 500) {
      console.log("something went wrong with fetch events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className={s.container}>
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
          {!!events.length &&
            events.map((item: ICustomPage) => (
              <div className={s.singleEvent}>
                <h4>{item.title}</h4>
                <p>
                  {item.description}
                  <a href={`${window.location.origin}/singlepage/${item._id}`}>
                    {" "}
                    Więcej informacji...
                  </a>
                </p>
              </div>
            ))}
          {!events.length && <h3>Nie wybrano żadnych wiadomości.</h3>}
        </div>
      </div>
    </div>
  );
};
