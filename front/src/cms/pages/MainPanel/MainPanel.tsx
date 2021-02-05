import React, { useState, useContext, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Button } from "antd";
import { AppContext, AuthContext } from "../../../context";
import { ICustomPage } from "../../../context/AppContext";
import { ROUTES } from "../../../constants";

import { Dashboard } from "../../components/Dashboard/Dashboard";
import { ChoosePage } from "../../components/ChoosePage/ChoosePage";

import s from "./MainPanel.module.scss";

export const MainPanel: React.FC = () => {
  const { handleLocation } = useContext(AppContext);
  const { isAuthenticated } = useContext(AuthContext);
  const [choosePageModalVisible, setChoosePageModalVisible] = useState<boolean>(
    false
  );

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    handleLocation(location);
  }, [handleLocation, location]);

  useEffect(() => {
    if (!isAuthenticated) {
      history.push(ROUTES.login);
    }
  }, [isAuthenticated]);

  const handleChoosePage = (data: ICustomPage) => {
    console.log(data);
  };

  const handleChooseBtnClick = () => {
    setChoosePageModalVisible(true);
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
          <h1>Current news</h1>
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
              <h3>Aktualne wiadomości:</h3>
              <Button onClick={handleChooseBtnClick}>Choose page</Button>
            </div>
            <div className={s.newsContainer}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
