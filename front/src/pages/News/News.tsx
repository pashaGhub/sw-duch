import React, { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { Select, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { CustomInput } from "../../components/CustomInput/CustomInput";
import { usePageSearch } from "../../hooks";
import { formatDate } from "../../utils/defaultUtils";

import s from "./News.module.scss";

const { Option } = Select;
const antIcon = <LoadingOutlined spin />;

export const News: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [pageNum, setPageNum] = useState<number>(1);
  const [type, setType] = useState<"ad" | "article" | "all">("all");
  const { loading, error, pages, hasMore } = usePageSearch(
    type,
    pageNum,
    query
  );

  const observer = useRef();
  const lastPageElementRef = useCallback(
    (node) => {
      if (loading) return;
      // @ts-ignore: Unreachable code error
      if (observer.current) observer.current.disconnect();
      // @ts-ignore: Unreachable code error
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNum((prevPageNum) => prevPageNum + 1);
        }
      });
      // @ts-ignore: Unreachable code error
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleSearch = (searchValue: string) => {
    setQuery(searchValue);
    setPageNum(1);
  };

  const handleType = (value: "ad" | "article" | "all") => {
    setType(value);
    setPageNum(1);
  };
  return (
    <div className={s.container}>
      <h1 className={s.title}>Artykuły</h1>
      <div className={s.searchContainer}>
        <CustomInput
          title={"Search"}
          value={query}
          setValue={handleSearch}
          customClass={s.searchInput}
        />
        <Select
          className={s.select}
          defaultValue={type}
          onChange={(value) => handleType(value)}
        >
          <Option value="all">Wszystko</Option>
          <Option value="ad">Wiadomości</Option>
          <Option value="article">Artykuły</Option>
        </Select>
      </div>
      <div className={s.listContainer}>
        {pages.map((item, ind) => {
          if (pages.length === ind + 1) {
            return (
              <div className={s.listItem} key={ind} ref={lastPageElementRef}>
                <Link to={`/${item._id}`}>
                  <img src={item.image} alt="" />
                  <div>
                    <h3>{item.title}</h3>
                    <div className={s.date}>{formatDate(item.date)}</div>
                    <p>{item.description}</p>
                  </div>
                </Link>
              </div>
            );
          }
          return (
            <div className={s.listItem} key={ind}>
              <Link to={`/${item._id}`}>
                <img src={item.image} alt="" />
                <div>
                  <h3>{item.title}</h3>
                  <div className={s.date}>{formatDate(item.date)}</div>
                  <p>{item.description}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      {!loading && !error && !pages.length && (
        <h2>Nie znaleziono żadnej informacji</h2>
      )}
      {!loading && error && <h2 style={{ color: "red" }}>Błąd systemu.</h2>}
      <div className={s.loading}>
        <Spin spinning={loading} indicator={antIcon} tip={"loading..."} />
      </div>
    </div>
  );
};
