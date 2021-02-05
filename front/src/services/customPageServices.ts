import axios from "axios";
import { ICustomPage } from "../context/AppContext";

export const createPage = async (data: any, token: string) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.post(`/api/custom-page`, data, { headers });

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
    const response = await axios.post(`/api/custom-page/${data._id}`, data, {
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
    const response = await axios.delete(`/api/custom-page/${id}`, {
      headers,
    });

    return response;
  } catch (e) {
    return { status: e.response.status, message: e.response.data.message };
  }
};

export const getPages = async (
  token: string,
  type: "ad" | "article" | "all" = "article",
  page: number = 1,
  query: string = ""
) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  try {
    const data = await axios.get(
      `/api/custom-page?type=${type}&page=${page}&query=${query}`,
      {
        headers,
      }
    );
    console.log(data);

    return data;
  } catch (e) {
    return { message: e };
  }
};
