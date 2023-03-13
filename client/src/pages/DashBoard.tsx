import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { helpCircle, personCircle } from "ionicons/icons";

import "./DashBoard.css";

const DashBoard = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton fill="solid" routerLink="/about">
              <IonIcon slot="start" icon={personCircle}></IonIcon>
              List all Clients
            </IonButton>
            <IonButton fill="solid" routerLink="/about">
              <IonIcon slot="start" icon={personCircle}></IonIcon>
              find One
            </IonButton>
            <IonButton fill="solid" routerLink="/about">
              <IonIcon slot="start" icon={personCircle}></IonIcon>
              Send Sms Test
            </IonButton>
            <IonButton fill="solid" routerLink="/about">
              <IonIcon slot="start" icon={personCircle}></IonIcon>
              Send Sms
            </IonButton>
            <IonButton fill="solid">
              Help
              <IonIcon slot="end" icon={helpCircle}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonContent>
    </IonPage>
  );
};

export default DashBoard;
