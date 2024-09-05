import axios, { AxiosRequestConfig } from "axios";

const url = "";
const config: AxiosRequestConfig = {
  headers: {
    Authorization: "test",
    accept: "Application/json",
  },
};
export const fetchFreeItems = async (category: string) => {
  axios.get(url, config);
  return [];
};

export const fetchItemsToBuy = async (category: string) => {
  return [];
};
