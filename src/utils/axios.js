import axios from "axios";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { authState } from "../state";

import { useHistory } from "react-router-dom";

// axios instance
const instance = axios.create({
  // eslint-disable-next-line no-undef
  //baseURL: process.env.REACT_APP_API_URL
  baseURL: "http://10.0.0.212:5000/api/",
});

const AxiosInterceptor = ({ children }) => {
  //console.log('interceptor', children);
  const auth = useRecoilValue(authState);

  const history = useHistory();

  useEffect(() => {
    instance.interceptors.request.use(
      async (config) => {
        const token = auth;
        config.headers = {
          "Content-Type": "application/json",
        };
        if (token) {
          config.headers = {
            "Content-Type": "application/json",
            authorization: `Authorization ${token}`,
          };
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const resInterceptor = (response) => {
      //console.log('resInterceptor');
      return response;
    };

    const errInterceptor = (error) => {
      console.log("errInterceptor", error);
      const config = error.config;
      if (error.response.status === 401 && !config._retry) {
        history.push("/login");
      }

      return Promise.reject();
    };

    const interceptor = instance.interceptors.response.use(
      resInterceptor,
      errInterceptor
    );

    return () => instance.interceptors.response.eject(interceptor);
  }, [auth, history]);

  return children;
};

export default instance;
export { AxiosInterceptor };
