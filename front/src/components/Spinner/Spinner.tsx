import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import s from "./Spinner.module.scss";

const antIcon = <LoadingOutlined spin />;

interface ISpinner {
  loading: boolean;
}

export const Spinner: React.FC<ISpinner> = ({ loading }) => (
  <div className={s.loading}>
    <Spin spinning={loading} indicator={antIcon} tip={"loading..."} />
  </div>
);
