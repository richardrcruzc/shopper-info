import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import jwt_decode from "jwt-decode";
import { useRecoilState, useSetRecoilState } from "recoil";

import { Link } from "react-router-dom";
import { useIonRouter } from "@ionic/react";

import { authState, userState } from "../../state";

const Initiastate = {
  email: "",
  password: "",
  errors: {},
};
function OldLogin() {
  const router = useIonRouter();
  const [auth, setAuth] = useRecoilState(authState);
  const setUser = useSetRecoilState(userState);
  const [loginModel, setLoginModel] = useState(Initiastate);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e) => {
    setLoginModel({ ...loginModel, [e.target.id]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const userData = {
      email: loginModel.email,
      password: loginModel.password,
    };
    await axios
      .post("/api/users/login", userData)
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem("jwtToken", token);
        const decoded = jwt_decode(token);
        setUser(decoded);
        setAuth(token);
        setIsLoading(false);
      })
      .catch((err) => {
        setErrors(err.response.data);
        console.log("err.response.data", err.response.data);
        console.log("errors", errors);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    console.log("login auth", auth);
    if (auth !== undefined && auth !== "")
      router.push("/landing", "forward", "push");
  }, [auth, router, setErrors]);

  return (
    <div className="container">
      <div style={{ marginTop: "4rem" }} className="row">
        <div className="col s8 offset-s2">
          <Link to="/" className="btn-flat waves-effect">
            <i className="material-icons left">keyboard_backspace</i> Back to
            home
          </Link>
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <h4>
              <b>Login</b> below
            </h4>
            <p className="grey-text text-darken-1">
              Don&apos;t have an account? <Link to="/register">Register</Link>
            </p>
          </div>
          <form noValidate onSubmit={onSubmit}>
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={loginModel.email}
                // eslint-disable-next-line react/no-unknown-property
                error={errors.email}
                id="email"
                type="email"
              />
              <label htmlFor="email">Email</label>
              <span style={{ color: "red" }}>{errors.email}</span>
            </div>
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={loginModel.password}
                // eslint-disable-next-line react/no-unknown-property
                error={errors.password}
                id="password"
                type="password"
              />
              <label htmlFor="password">Password</label>
              <span style={{ color: "red" }}>{errors.password}</span>
            </div>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <button
                disabled={isLoading}
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                }}
                type="submit"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                {isLoading && (
                  <span className="spinner-border spinner-border-sm mr-1"></span>
                )}
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default OldLogin;
