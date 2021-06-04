import axios from "axios";

export const newEvent = async (id: string, token: string) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.post(`/api/events/${id}`, {}, { headers });

    return response;
  } catch (e) {
    return { status: e.response.status, message: e.response.data.message };
  }
};

export const getEvents = async () => {
  try {
    const response = await axios.get(`/api/events/`);

    return response;
  } catch (e) {
    return { status: e.response.status, message: e.response.data.message };
  }
};

export const deleteEvent = async (id: string, token: string) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.delete(`/api/events/${id}`, {
      headers,
    });

    return response;
  } catch (e) {
    return { status: e.response.status, message: e.response.data.message };
  }
};
