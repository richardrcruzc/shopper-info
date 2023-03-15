import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonAlert,
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonIcon,
} from "@ionic/react";

import { personCircle } from "ionicons/icons";
import { useState } from "react";
import { useHistory } from "react-router";
import { useRecoilState } from "recoil";
import { authState } from "../../state";
import instance from "../../utils/axios";
function validateEmail(email: string) {
  const re =
    // eslint-disable-next-line no-control-regex
    /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
  return re.test(String(email).toLowerCase());
}

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [iserror, setIserror] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const [auth, setAuth] = useRecoilState(authState);
  //const setUser = useSetRecoilState(userState);

  const handleLogin = async () => {
    if (!email) {
      setMessage("Please enter a valid email");
      setIserror(true);
      return;
    }
    if (validateEmail(email) === false) {
      setMessage("Your email is invalid");
      setIserror(true);
      return;
    }

    if (!password || password.length < 6) {
      setMessage("Please enter your password");
      setIserror(true);
      return;
    }

    const userData = {
      email: email,
      password: password,
    };

    await instance
      .post("/users/login", userData)
      .then((res) => {
        console.log("payload", res);
        const token = res.data.token;
        localStorage.setItem("jwtToken", token);
        // const decoded = jwt_decode(token);
        // setUser(decoded);
        setAuth(token);
        console.log("auth", auth);
        history.push("/dashboard");
      })
      .catch((err) => {
        console.log("err.response.data", err);
        setMessage("Authentication Info Incorrect");
        setIserror(true);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonAlert
            isOpen={iserror}
            onDidDismiss={() => setIserror(false)}
            header={"Error!"}
            message={message}
            buttons={["Dismiss"]}
          />
        </IonItem>
        <IonItem>
          <IonIcon
            style={{ fontSize: "70px", color: "#0040ff" }}
            icon={personCircle}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="floating"> Email</IonLabel>
          <IonInput
            type="email"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
          ></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="floating"> Password</IonLabel>
          <IonInput
            type="password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
          ></IonInput>
        </IonItem>

        <IonButton
          className="ion-margin-top"
          shape="round"
          expand="block"
          size="large"
          onClick={handleLogin}
        >
          Login
        </IonButton>
      </IonContent>
    </IonPage>
  );
};
export default Login;
