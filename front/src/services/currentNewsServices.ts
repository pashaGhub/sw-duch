import axios from "axios";
const backendUrl = "https://sw-duch.netlify.app";

export const newCurrentNews = async (id: string, token: string) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.post(
      `${backendUrl}/api/current-news/${id}`,
      {},
      { headers }
    );

    return response;
  } catch (e) {
    return { status: e.response.status, message: e.response.data.message };
  }
};

export const getCurrentNews = async () => {
  try {
    const response = await axios.get(`${backendUrl}/api/current-news/`);

    return response;
  } catch (e) {
    return { status: e.response.status, message: e.response.data.message };
  }
};

export const deleteCurrentNew = async (id: string, token: string) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.delete(
      `${backendUrl}/api/current-news/${id}`,
      {
        headers,
      }
    );

    return response;
  } catch (e) {
    return { status: e.response.status, message: e.response.data.message };
  }
};
