import axios, { AxiosRequestConfig } from "axios";
import config from "../utils/config";

const $host = axios.create({
  baseURL: config.url,
});

const $authHost = axios.create({
  baseURL: config.url,
});

const authInterceptor = (config: AxiosRequestConfig) => {
  config.headers.authorization = `Bearer ${localStorage.getItem(
    "accessToken"
  )}`;
  return config;
};

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
