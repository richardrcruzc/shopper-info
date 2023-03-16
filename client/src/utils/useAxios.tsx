import { useEffect, useRef, useState } from "react";
import axios from "axios";

import { authState } from "../state";
import { useRecoilValue } from "recoil";
const instance = axios.create({
  // eslint-disable-next-line no-undef
  //baseURL: process.env.REACT_APP_API_URL
  //baseURL: "http://10.0.0.212:5000/api/",
  baseURL: "http://23.254.134.220:5000/api/",
});
export const useAxios = (url = "", method = "", payload: any) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const controllerRef = useRef(new AbortController());
  const cancel = () => {
    controllerRef.current.abort();
  };
  const auth = useRecoilValue(authState);

  // request interceptor to add token to request headers
  instance.interceptors.request.use(
    async (config) => {
      const token = auth;

      if (token !== "" && token !== undefined) {
        config.headers["authorization"] = token;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // response interceptor intercepting 401 responses, refreshing token and retrying the request
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const config = error.config;

      if (error.response.status === 401 && !config._retry) {
        // we use this flag to avoid retrying indefinitely if
        // getting a refresh token fails for any reason
        config._retry = true;
        // localStorage.setItem("token", await refreshAccessToken());

        return instance(config);
      }

      return Promise.reject(error);
    }
  );

  useEffect(() => {
    (async () => {
      try {
        const response = await instance.request({
          data: payload,
          signal: controllerRef.current.signal,
          method,
          url,
        });
        setData(response.data);
      } catch (ex) {
        setError("ex.message");
      } finally {
        setLoaded(true);
      }
    })();
  }, [method, payload, url]);
  return { cancel, data, error, loaded };
};
export default useAxios;
