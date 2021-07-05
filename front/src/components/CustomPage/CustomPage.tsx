import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { Spinner } from "../../components/Spinner/Spinner";

import { getSinglePage } from "../../services/customPageServices";
import { AppContext } from "../../context/AppContext";

import s from "./CustomPage.module.scss";

export const CustomPage: React.FC = () => {
  const { handleLocation } = useContext(AppContext);
  const [page, setPage] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();
  useEffect(() => {
    handleLocation(location);
  }, [handleLocation, location]);

  const fetchData = async () => {
    setLoading(true);
    const id = window.location.pathname.split("/")[2];
    const data: any = await getSinglePage(id);

    if (data.status === 201 || data.status === 200) {
      setPage(data.data.page);
    }

    if (data.status === 500) {
      console.log("Cannot load the page");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={s.container}>
      {!loading && page && (
        <>
          <img src={page.image} alt="" />
          <h1 className={s.title}>{page.title}</h1>
          <div
            className={s.info}
            dangerouslySetInnerHTML={{ __html: page.content }}
          ></div>{" "}
        </>
      )}
      <Spinner loading={loading} />
    </div>
  );
};
