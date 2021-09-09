import axios from "axios";

let development = process.env.NODE_ENV !== "production";

export const BASE_URL = development
  ? "http://localhost:5000"
  : "https://url-shortener-hasura.herokuapp.com";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const getUrl = (slug) => axiosInstance.get(`/${slug}`);
export const shortenUrl = (formData) => axiosInstance.post("/url", formData);
