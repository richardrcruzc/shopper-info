import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
//import { useHistory } from "react-router";

import "./DashBoard.css";

const DashBoard = () => {
  //	Initializing our router
  const router = useIonRouter();
  const handleClick = async (link: any) => {
    router.push(link, "forward", "push");
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonToolbar className="center">
          <IonTitle size="large">Available Options</IonTitle>
        </IonToolbar>
        <IonButton expand="block" onClick={() => handleClick("ListAllPage")}>
          {" "}
          List all Clients
        </IonButton>{" "}
        <IonButton expand="block" onClick={() => handleClick("FindByNumber")}>
          {" "}
          Find By Phone Number
        </IonButton>{" "}
        <IonButton expand="block" onClick={() => handleClick("TestSms")}>
          {" "}
          Send Sms Test
        </IonButton>
        <IonButton expand="block" onClick={() => handleClick("SendSms")}>
          {" "}
          Send Sms
        </IonButton>
        <IonButton expand="block" onClick={() => handleClick("ClearSms")}>
          {" "}
          Clear SMS
        </IonButton>
        <IonButton expand="block" onClick={() => handleClick("LoadDataString")}>
          {" "}
          Import CSV File.
        </IonButton>
        <IonButton expand="full" routerLink="/login">
          Log Out
        </IonButton>
        <IonButton expand="full" onClick={() => handleClick("Tab1")}>
          About Us
        </IonButton>
        <IonButton expand="full" onClick={() => handleClick("Tab1")}>
          Help
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default DashBoard;
