import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Modal, Progress, Upload, Spin } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { AuthContext } from "../../../context";
import { deleteFile, getUploadImgs } from "../../../services/uploadServices";
import { useMessage } from "../../../hooks";
import { ROUTES } from "../../../constants";

import "./UploadImg.scss";
import axios from "axios";

interface IUploadItem {
  _id: string;
  path: string;
}

interface UploadImg {
  modalVisible: boolean;
  closeModal: Function;
  chooseImage: Function;
}

const antIcon = <LoadingOutlined spin />;

const backUrl = "http://localhost:5000/";

export const UploadImg: React.FC<UploadImg> = ({
  modalVisible,
  closeModal,
  chooseImage,
}) => {
  const { token, logout } = useContext(AuthContext);
  const [imgList, setImgList] = useState<any>([]);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);

  const history = useHistory();
  const message = useMessage();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUploadImgs(token);
      if (data.length || data.length === 0) {
        const updatedPath = data.map((item: IUploadItem) => {
          return {
            uid: item._id,
            name: item.path.split("uploads\\").join(""),
            status: "done",
            url: `${backUrl}${item.path}`,
          };
        });
        setImgList(updatedPath);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const uploadImgs = async (options: any) => {
    const { onSuccess, onError, file, onProgress } = options;

    const formData = new FormData();
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      onUploadProgress: (event: any) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };
    formData.append("file", file);

    try {
      const res = await axios.post("/api/uploads/img", formData, config);

      onSuccess(res);
    } catch (err) {
      console.log("ERROR", err.response);

      onError(err.response?.statusText);
    }
  };

  const handleChange = (data: any) => {
    console.log(data);
    if (data.file.response?.status === 201 || data.file.status === "removed") {
      setImgList(data.fileList);
    }
    if (data.file.status === "error") {
      if (data.file.error.status === 401) {
        logout();
        history.push(ROUTES.login);
      }
      const messageText = data?.file?.response?.message
        ? data.file.response.message
        : "Something went wrong :(";
      message(messageText, "error");
      //   setImgList((prev: any) => [...prev]);
    }
  };

  const handeRemove = async (file: any) => {
    const data: any = await deleteFile(file.uid, token);
    console.log(data);

    if (data.status && data.status === 201) {
      message(data.data.message, "success");
    } else if (data.status === 401) {
      message(`${data.message ? data.message : "User unauthorized"}`, "error");
      logout();
      history.push(ROUTES.login);
      return false;
    } else {
      message("Something went wrong :(", "error");
      return false;
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Modal
      destroyOnClose={true}
      forceRender
      footer={null}
      className={"container"}
      width="48.125rem"
      visible={modalVisible}
      title="Choose an image"
      cancelText={"Cancel"}
      onCancel={() => {
        closeModal();
      }}
    >
      {progress > 0 ? <Progress percent={progress} /> : null}
      <Spin spinning={loading} indicator={antIcon} tip={"loading..."}>
        {!loading && (
          <Upload
            accept="image/*"
            multiple={true}
            customRequest={uploadImgs}
            listType="picture-card"
            fileList={imgList}
            onChange={handleChange}
            onPreview={(file: any) => chooseImage(file)}
            onRemove={handeRemove}
          >
            {uploadButton}
          </Upload>
        )}
      </Spin>
    </Modal>
  );
};
