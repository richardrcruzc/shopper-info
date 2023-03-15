import axios from "axios";
import useAuth from "../hooks/auth";

const clientAxios = axios.create({
  baseURL: "http://23.254.134.220:5000/api/",
  timeout: 1000,
  //headers: { "X-Custom-Header": "foobar" },
});

// Add a request interceptor
clientAxios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const { auth } = useAuth();
    if (clientAxios.defaults.url !== "/users/login")
      clientAxios.defaults.headers.common["Authorization"] = auth;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
clientAxios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default clientAxios;
