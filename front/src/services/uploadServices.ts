import axios from "axios";
const backendUrl = "https://sw-duch.netlify.app";

export const uploadImgs = async (options: any) => {
  const { onSuccess, onError, file, onProgress } = options;

  const formData = new FormData();
  const config = {
    headers: {
      "content-type": "multipart/form-data",
      //   Authorization: `Bearer ${token}`,
    },
  };
  formData.append("file", file);

  try {
    const res = await axios.post(
      `${backendUrl}/api/uploads/img`,
      formData,
      config
    );

    onSuccess("Ok");
  } catch (err) {
    onError(err.response.statusText);
  }
};

export const getUploadImgs = async (token: string) => {
  try {
    const response = await axios.get(`${backendUrl}/api/uploads/img`);
    return response.data;
  } catch (e) {
    return { message: e };
  }
};

export const deleteFile = async (id: string, token: string) => {
  try {
    const response = await axios.delete(`${backendUrl}/api/uploads/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (e) {
    console.log("INSIDE FETCH", e.response);

    return { status: e.response.status, message: e.response.data.message };
  }
};
