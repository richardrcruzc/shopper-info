import axios from "axios";
import { useEffect } from "react";
import { useIonRouter } from "@ionic/react";

import useAuth from "../hooks/auth";

// axios instance
const instance = axios.create({
  // eslint-disable-next-line no-undef
  //baseURL: process.env.REACT_APP_API_URL
  baseURL: "http://10.0.0.212:5000/api/",
  //baseURL: "http://23.254.134.220:5000/api/",
});

const AxiosInterceptor = ({ children }) => {
  //const auth = useRecoilValue(authState);
  const { auth } = useAuth();
  const router = useIonRouter();

  useEffect(() => {
    instance.interceptors.request.use(
      async (config, request) => {
        const token = auth;
        if (token && config.url !== "/users/login") {
          config.headers = {
            authorization: token,
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
        router.push("/login", "forward", "push");
      }

      return Promise.reject();
    };

    const interceptor = instance.interceptors.response.use(
      resInterceptor,
      errInterceptor
    );

    return () => instance.interceptors.response.eject(interceptor);
  });

  return children;
};

export default instance;
export { AxiosInterceptor };
