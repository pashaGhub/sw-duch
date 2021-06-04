import axios from "axios";
import { ICustomPage } from "../context/AppContext";
const backendUrl = "//34.88.72.177";

export const createPage = async (data: any, token: string) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.post(`${backendUrl}/api/custom-page`, data, {
      headers,
    });

    return response;
  } catch (e) {
    return { status: e.response.status, message: e.response.data.message };
  }
};

export const updatePage = async (data: ICustomPage, token: string) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.post(
      `${backendUrl}/api/custom-page/${data._id}`,
      data,
      {
        headers,
      }
    );

    return response;
  } catch (e) {
    return { status: e.response.status, message: e.response.data.message };
  }
};

export const getSinglePage = async (id: string) => {
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.get(`${backendUrl}/api/custom-page/${id}`, {
      headers,
    });

    return response;
  } catch (e) {
    return { status: e.response.status, message: e.response.data.message };
  }
};

export const deletePage = async (id: string, token: string) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.delete(`${backendUrl}/api/custom-page/${id}`, {
      headers,
    });

    return response;
  } catch (e) {
    return { status: e.response.status, message: e.response.data.message };
  }
};

export const getPages = async (
  type: "ad" | "article" | "all" = "all",
  page: number = 1,
  query: string = "",
  limit?: number
) => {
  const headers = {
    "Content-Type": "application/json",
  };

  let fetchUrl = `${backendUrl}/api/custom-page?type=${type}&page=${page}&query=${query}`;

  if (!!limit) {
    fetchUrl = `${backendUrl}/api/custom-page?type=${type}&page=${page}&query=${query}&limit=${limit}`;
  }
  try {
    const data = await axios.get(fetchUrl, {
      headers,
    });

    return data;
  } catch (e) {
    return { message: e };
  }
};
