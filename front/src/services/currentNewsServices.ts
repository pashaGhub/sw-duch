import axios from "axios";
let backendUrl = "https://sw-duch.netlify.app";
if (process.env.REACT_APP_IN_DEVELOPMENT) {
  backendUrl = "http://localhost:5000";
}

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
