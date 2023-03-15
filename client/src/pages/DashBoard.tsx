import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router";

import "./DashBoard.css";

const DashBoard = () => {
  const { replace } = useHistory();

  const handleClick = async (link: any) => {
    replace(link);
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
        <IonButton expand="block" onClick={() => handleClick("ImportFile")}>
          {" "}
          Import CSV File.
        </IonButton>
        <IonButton expand="full" routerLink="/login">
          Log Out
        </IonButton>
        <IonButton expand="full" onClick={() => handleClick("AboutUs")}>
          About Us
        </IonButton>
        <IonButton expand="full" onClick={() => handleClick("Help")}>
          Help
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default DashBoard;
