import { authState } from "../state";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [auth] = useRecoilState(authState);

  useEffect(() => {
    if (auth !== undefined) {
      setLoggedIn(true);
    }
  }, [auth]);
  return { isLoggedIn };
};

export default useAuth;
