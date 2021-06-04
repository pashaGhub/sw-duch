import React, { useState, useContext, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Button } from "antd";
import { AppContext, AuthContext } from "../../../context";
import { ICustomPage } from "../../../context/AppContext";
import { ROUTES } from "../../../constants";
import { useMessage } from "../../../hooks/useMessage";
import {
  newCurrentNews,
  getCurrentNews,
  deleteCurrentNew,
} from "../../../services/currentNewsServices";
import {
  newEvent,
  getEvents,
  deleteEvent,
} from "../../../services/eventsServices";

import { Dashboard } from "../../components/Dashboard/Dashboard";
import { ChoosePage } from "../../components/ChoosePage/ChoosePage";

import s from "./MainPanel.module.scss";

export const MainPanel: React.FC = () => {
  const { handleLocation } = useContext(AppContext);
  const { isAuthenticated, token, logout } = useContext(AuthContext);
  const [news, setNews] = useState<Array<ICustomPage>>([]);
  const [events, setEvents] = useState<Array<ICustomPage>>([]);
  const [target, setTarget] = useState<"event" | "news">("news");
  const [choosePageModalVisible, setChoosePageModalVisible] =
    useState<boolean>(false);

  const history = useHistory();
  const location = useLocation();
  const message = useMessage();

  const fetchCurrentNews = async () => {
    const data: any = await getCurrentNews();

    if (data.status === 201 || 200) {
      setNews(data.data.pages);
    }

    if (data.status === 500) {
      message(data.data.message, "error");
    }
  };

  const fetchEvents = async () => {
    const data: any = await getEvents();

    if (data.status === 201 || 200) {
      setEvents(data.data.pages);
    }

    if (data.status === 500) {
      message(data.data.message, "error");
    }
  };

  useEffect(() => {
    handleLocation(location);
  }, [handleLocation, location]);

  useEffect(() => {
    if (!isAuthenticated) {
      history.push(ROUTES.login);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchCurrentNews();
    fetchEvents();
  }, []);

  const handleChoosePage = async (page: ICustomPage) => {
    let data: any;
    if (target === "news") {
      data = await newCurrentNews(page._id, token);
    }

    switch (target) {
      case "news":
        data = await newCurrentNews(page._id, token);
        break;
      case "event":
        data = await newEvent(page._id, token);
        break;
      default:
        break;
    }

    if (data.status === 201 || 200) {
      message(data.data.message, "success");
      switch (target) {
        case "news":
          fetchCurrentNews();
          break;
        case "event":
          fetchEvents();
          break;
        default:
          break;
      }
    }

    if (data.status === 401) {
      logout();
      history.push(ROUTES.login);
      message(data.data.message, "error");
    }
    if (data.status === 500) {
      message(data.data.message, "error");
    }
  };

  const handleChooseBtnClick = (target: "event" | "news") => {
    setChoosePageModalVisible(true);
    setTarget(target);
  };

  const handleDelete = async (
    page: ICustomPage,
    deleteTarget: "event" | "news"
  ) => {
    let data: any;

    switch (deleteTarget) {
      case "news":
        data = await deleteCurrentNew(page._id, token);
        break;
      case "event":
        data = await deleteEvent(page._id, token);
        break;
      default:
        break;
    }

    if (data.status === 201 || 200) {
      message(data.data.message, "success");
      switch (deleteTarget) {
        case "news":
          fetchCurrentNews();
          break;
        case "event":
          fetchEvents();
          break;
        default:
          break;
      }
      fetchCurrentNews();
    }

    if (data.status === 401) {
      logout();
      history.push(ROUTES.login);
      message(data.data.message, "error");
    }
    if (data.status === 500) {
      message(data.data.message, "error");
    }
  };

  return (
    <div className={s.container}>
      <Dashboard />
      <ChoosePage
        modalVisible={choosePageModalVisible}
        closeModal={setChoosePageModalVisible}
        handleChoosePage={handleChoosePage}
        resetData={false}
        setResetData={() => {}}
      />
      <div className={s.panel}>
        <div className={s.currentNews}>
          <h1>Strona główna</h1>
          <h3>Rozkład mszy świętych:</h3>
          <div>
            <b>I-V: </b> <span>15:00, 18:00</span>
          </div>
          <div>
            <b>VI: </b> <span>9:00, 15:00, 18:00</span>
          </div>
          <div>
            <b>VII: </b> <span>8:00, 9:00, 10:30, 12:00, 15:00, 18:00</span>
          </div>
          <div className={s.news}>
            <div className={s.newsTitle}>
              <h3>Nadchodzące wydżenia:</h3>
              <Button onClick={() => handleChooseBtnClick("event")}>
                Wybież wydażenie:
              </Button>
            </div>
            <div className={s.newsContainer}>
              {!!events.length &&
                events.map((item: ICustomPage) => (
                  <div className={s.singlePage}>
                    <span>{item.title}</span>
                    <span onClick={() => handleDelete(item, "event")}>
                      delete
                    </span>
                  </div>
                ))}
              {!events.length && <h3>Nie wybrano żadnych wydażeń.</h3>}
            </div>
          </div>
          <div className={s.news}>
            <div className={s.newsTitle}>
              <h3>Aktualne wiadomości:</h3>
              <Button onClick={() => handleChooseBtnClick("news")}>
                Wybież stronę:
              </Button>
            </div>
            <div className={s.newsContainer}>
              {!!news.length &&
                news.map((item: ICustomPage) => (
                  <div className={s.singlePage}>
                    <span>{item.title}</span>
                    <span onClick={() => handleDelete(item, "news")}>
                      delete
                    </span>
                  </div>
                ))}
              {!news.length && <h3>Nie wybrano żadnych wiadomości.</h3>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
