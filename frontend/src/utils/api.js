import axios from "axios";

const axiosClient = axios.create({ baseURL: "http://localhost:3004/" });
const config = {
  withCredentials: false,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
};

export const getAllHouses = () => axiosClient.get(`/houses`, config);
export const deleteHouse = (data) =>
  axiosClient.post(`/houses/delete`, data, config);

export const deleteRequest = (data) =>
  axiosClient.post(`/requests/delete`, data, config);

export const deleteOrder = (data) =>
  axiosClient.post(`/orders/delete`, data, config);
