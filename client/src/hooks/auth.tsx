import { authState } from "../state";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [auth, setAuth] = useRecoilState(authState);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token !== undefined && token !== null && token !== "") {
      setAuth(token);
    }
    if (auth !== undefined && auth !== "") {
      setLoggedIn(true);
    }
  }, [auth, setAuth]);
  return { isLoggedIn, auth };
};

export default useAuth;
