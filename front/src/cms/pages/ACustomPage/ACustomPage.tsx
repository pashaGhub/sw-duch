import React, { useContext, useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Button, Select, Form, DatePicker, Space } from "antd";
import { AppContext, AuthContext } from "../../../context";
import { ICustomPage } from "../../../context/AppContext";
import { useMessage } from "../../../hooks/useMessage";
import { formatDate } from "../../../utils/defaultUtils";
import { ROUTES } from "../../../constants";
import {
  createPage,
  deletePage,
  updatePage,
} from "../../../services/customPageServices";

import { Dashboard } from "../../components/Dashboard/Dashboard";
import { TextEditor } from "../../components/TextEditor/TextEditor";
import { FormInput } from "../../../components/FormInput/FormInput";
import { ChoosePage } from "../../components/ChoosePage/ChoosePage";

import img from "../../../assets/imgs/love-neighbour.jpg";

import s from "./ACustomPage.module.scss";
import { UploadImg } from "../../components/UploadImg/UploadImg";

const { Option } = Select;

export const ACustomPage: React.FC = () => {
  const {
    handleLocation,
    editorContent,
    setEditorContent,
    setResetEditorContent,
  } = useContext(AppContext);
  const { token, isAuthenticated, logout } = useContext(AuthContext);
  const [editId, setEditId] = useState<string>("");
  const [reset, setReset] = useState<boolean>(false);
  const [resetData, setResetData] = useState<boolean>(false);
  const [type, setType] = useState<"ad" | "article">("ad");
  const [bgImage, setBgImage] = useState<string>(img);
  const [date, setDate] = useState<string>(new Date().toString());
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [chooseImgModalVisible, setChooseImgModalVisible] =
    useState<boolean>(false);
  const [choosePageModalVisible, setChoosePageModalVisible] =
    useState<boolean>(false);

  const [form] = Form.useForm();
  const history = useHistory();
  const location = useLocation();
  const message = useMessage();

  useEffect(() => {
    handleLocation(location);
  }, [handleLocation, location]);

  useEffect(() => {
    if (!isAuthenticated) {
      history.push(ROUTES.login);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (reset) {
      form.resetFields();
      setReset(false);
    }
  }, [reset]);

  const clearUpForm = () => {
    setEditorContent("");
    setResetEditorContent(true);
    setEditId("");
    setDate(new Date().toString());
    setTitle("");
    setDescription("");
    setResetData(true);
  };

  const handleSave = () => {
    form
      .validateFields()
      .then(async ({ title, description }) => {
        let data: any;
        if (!!editId) {
          data = await updatePage(
            {
              _id: editId,
              date,
              image: bgImage,
              type,
              title,
              description,
              content: editorContent,
            },
            token
          );
        } else {
          data = await createPage(
            {
              image: bgImage,
              date,
              type,
              title,
              description,
              content: editorContent,
            },
            token
          );
        }

        if (data.status === 201 || data.status === 200) {
          message(data.data.message, "success");
          clearUpForm();
          form.resetFields();
        } else if (data.status !== 401 && data.message) {
          message(data.message, "error");
        }

        if (data.status === 401) {
          logout();
          history.push(ROUTES.login);
          message(data.message, "error");
        }
      })
      .catch((info: any) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleEdit = async () => {
    setChoosePageModalVisible(true);
  };

  const handleCancelEdit = async () => {
    await clearUpForm();
    form.resetFields();
  };

  const handleDelete = async () => {
    if (editId) {
      const response: any = await deletePage(editId, token);

      if (response.status === 201 || 200) {
        message(response.data.message, "success");
        clearUpForm();
        form.resetFields();
      }

      if (response.status === 401) {
        logout();
        history.push(ROUTES.login);
        message(response.message, "error");
      }
      if (response.status === 500) {
        message(response.message, "error");
      }
    } else {
      message(
        "There is no page to delete. Choose a page by clicking 'EDIT' button and try again..",
        "error"
      );
    }
  };

  const handleChangeDate = (date: any) => {
    setDate(date._d);
  };
  const handleChoosePage = (data: ICustomPage) => {
    setEditId(data._id);
    setType(data.type);
    setDate(data.date);
    setBgImage(data.image);
    setTitle(data.title);
    setDescription(data.description);
    setEditorContent(data.content);
    setResetEditorContent(true);
    setReset(true);
  };

  const handleChooseImg = (file: any) => {
    setBgImage(file.url);
    setChooseImgModalVisible(false);
  };

  return (
    <div className={s.container}>
      <Dashboard />
      <UploadImg
        modalVisible={chooseImgModalVisible}
        closeModal={setChooseImgModalVisible}
        chooseImage={handleChooseImg}
      />
      <ChoosePage
        modalVisible={choosePageModalVisible}
        closeModal={setChoosePageModalVisible}
        handleChoosePage={handleChoosePage}
        resetData={resetData}
        setResetData={setResetData}
      />
      <div className={s.board}>
        <Form
          form={form}
          initialValues={{
            title,
            description,
          }}
        >
          <div className={s.buttons}>
            <Button
              type={"primary"}
              size={"large"}
              className={s.success}
              onClick={handleSave}
            >
              Save
            </Button>
            {!!editId ? (
              <Button
                type={"primary"}
                size={"large"}
                onClick={handleCancelEdit}
              >
                Cancel
              </Button>
            ) : (
              <Button type="primary" size="large" onClick={handleEdit}>
                Edit
              </Button>
            )}

            <Button
              type={"primary"}
              size={"large"}
              danger
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
          <Form.Item name="type" className={s.selectBarConainer}>
            <div className={s.selectBar}>
              <Select
                className={s.selectType}
                defaultValue={type}
                onChange={(value) => setType(value)}
              >
                <Option value="ad">Ad</Option>
                <Option value="article">Article</Option>
              </Select>
              <Space>
                <DatePicker onChange={handleChangeDate} />
              </Space>

              <Button onClick={() => setChooseImgModalVisible(true)}>
                Choose image
              </Button>
            </div>
          </Form.Item>
          <h2>{formatDate(date)}</h2>
          <img className={s.coverImg} src={bgImage} alt="" />
          <FormInput
            title={"title"}
            customClass={s.title}
            initialValue={title}
            required
          />
          <FormInput
            title={"description"}
            textarea
            required
            customClass={s.description}
            maxLength={225}
            initialValue={description}
          />
          <h2>Page content</h2>
          <TextEditor />
        </Form>
      </div>
    </div>
  );
};
