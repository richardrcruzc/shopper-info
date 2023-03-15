import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Landing from "./pages/landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import DashBoard from "./pages/DashBoard";
import useAuth from "./hooks/auth";
import { ListAllPage } from "./pages/ListAllPage";
import { FindByNumber } from "./pages/FindByNumber";
import { TestSms } from "./pages/TestSms";
import { SendSms } from "./pages/SendSms";
import { ClearSms } from "./pages/ClearSms";

setupIonicReact();

const App = () => {
  const { isLoggedIn } = useAuth();
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/landing" component={Landing} exact={true} />
          <Redirect exact from="/" to="/landing" />
          <Route path="/Login" component={Login} exact={true} />

          <Route
            path="/DashBoard"
            render={() =>
              isLoggedIn ? <DashBoard /> : <Redirect to="/landing" />
            }
            exact={true}
          />
          <Route
            path="/ListAllPage"
            render={() =>
              isLoggedIn ? <ListAllPage /> : <Redirect to="/landing" />
            }
            exact={true}
          />
          <Route
            path="/FindByNumber"
            render={() =>
              isLoggedIn ? <FindByNumber /> : <Redirect to="/landing" />
            }
            exact={true}
          />
          <Route
            path="/testsms"
            render={() =>
              isLoggedIn ? <TestSms /> : <Redirect to="/landing" />
            }
            exact={true}
          />
          <Route
            path="/SendSms"
            render={() =>
              isLoggedIn ? <SendSms /> : <Redirect to="/landing" />
            }
            exact={true}
          />
          <Route
            path="/ClearSms"
            render={() =>
              isLoggedIn ? <ClearSms /> : <Redirect to="/landing" />
            }
            exact={true}
          />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
