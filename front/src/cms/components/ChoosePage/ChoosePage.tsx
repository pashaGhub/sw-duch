import React, {
  useState,
  useContext,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { useHistory } from "react-router-dom";
import { Modal, Select, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { AuthContext } from "../../../context";
import { ICustomPage } from "../../../context/AppContext";
import { usePageSearch, useMessage } from "../../../hooks";
import { ROUTES } from "../../../constants";

import { CustomInput } from "../../../components/CustomInput/CustomInput";

import s from "./ChoosePage.module.scss";

interface IChoosePage {
  modalVisible: boolean;
  closeModal: Function;
  handleChoosePage: Function;
  resetData: boolean;
  setResetData: Function;
}

const { Option } = Select;
const antIcon = <LoadingOutlined spin />;

export const ChoosePage: React.FC<IChoosePage> = ({
  modalVisible,
  closeModal,
  handleChoosePage,
  resetData,
  setResetData,
}) => {
  const { token, logout } = useContext(AuthContext);
  const [query, setQuery] = useState<string>("");
  const [pageNum, setPageNum] = useState<number>(1);
  const [type, setType] = useState<"ad" | "article" | "all">("all");
  const { loading, error, pages, hasMore } = usePageSearch(
    token,
    type,
    pageNum,
    query,
    resetData
  );

  const history = useHistory();
  const message = useMessage();

  useEffect(() => {
    if (error.status === 401) {
      logout();
      history.push(ROUTES.login);
      message(error.message, "error");
    }
  }, [error]);

  useEffect(() => {
    if (resetData) {
      setPageNum(1);
      setResetData(false);
    }
  }, [resetData]);

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

  const handleChoosePageClick = (data: ICustomPage) => {
    handleChoosePage(data);
    closeModal();
  };
  return (
    <Modal
      destroyOnClose={true}
      forceRender
      footer={null}
      className={s.container}
      width="48.125rem"
      visible={modalVisible}
      title="Choose your page"
      cancelText={"Cancel"}
      onCancel={() => {
        closeModal();
      }}
    >
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
          <Option value="all">All</Option>
          <Option value="ad">Ad</Option>
          <Option value="article">Article</Option>
        </Select>
      </div>

      <div className={s.results}>
        {pages.map((p, ind) => {
          if (pages.length === ind + 1) {
            return (
              <div
                ref={lastPageElementRef}
                key={p._id}
                className={s.singleResult}
                onClick={() => handleChoosePageClick(p)}
              >
                <span>{p.title}</span> <span>select</span>
              </div>
            );
          }
          return (
            <div
              key={p._id}
              className={s.singleResult}
              onClick={() => handleChoosePageClick(p)}
            >
              <span>{p.title}</span> <span>select</span>
            </div>
          );
        })}
        {!loading && !error && !pages.length && (
          <h2>No result has been found</h2>
        )}
        {!loading && error && (
          <h2 style={{ color: "red" }}>Somethig went wrong</h2>
        )}
        <div className={s.loading}>
          <Spin spinning={loading} indicator={antIcon} tip={"loading..."} />
        </div>
      </div>
    </Modal>
  );
};
