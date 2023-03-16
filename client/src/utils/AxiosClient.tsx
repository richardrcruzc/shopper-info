import axios from "axios";

function getLocalAccessToken() {
  const accessToken = localStorage.getItem("jwtToken");
  return accessToken;
}
function getLocalRefreshToken() {
  const refreshToken = localStorage.getItem("refreshToken");
  return refreshToken;
}

// axios instance
export const instanceApi = axios.create({
  // eslint-disable-next-line no-undef
  //baseURL: process.env.REACT_APP_API_URL
  //baseURL: "http://10.0.0.212:5000/api/",
  baseURL: "http://23.254.134.220:5000/api/",
});
instanceApi.defaults.headers.common["Content-Type"] = "application/json";
export const refreshAccessTokenFn = async () => {
  const response = await instanceApi.get("auth/refresh");
  return response.data;
};

instanceApi.interceptors.request.use(
  (config: any) => {
    const token = getLocalAccessToken();
    if (token) {
      config.headers["authorization"] = token;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);
instanceApi.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await refreshToken();
          const { accessToken } = rs.data;
          localStorage.setItem("jwtToken", accessToken);
          instanceApi.defaults.headers.common["authorization"] = accessToken;

          return instanceApi(originalConfig);
        } catch (_error: any) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }

          return Promise.reject(_error);
        }
      }

      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }

    return Promise.reject(err);
  }
);

function refreshToken() {
  return instanceApi.post("/auth/refreshtoken", {
    refreshToken: getLocalRefreshToken(),
  });
}
