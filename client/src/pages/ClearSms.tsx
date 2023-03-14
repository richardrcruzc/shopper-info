import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonButton,
  IonItem,
  IonAlert,
  IonLoading,
} from "@ionic/react";
import { useState } from "react";
import AxiosActions from "../service/AxiosCalls";

export const ClearSms: React.FC = () => {
  const [loadingText, setLoadingText] = useState<string | undefined>();
  const [showAlert, setShowAlert] = useState(false);
  const [header, setHeader] = useState("Info");
  const [subHeader, setSubHeader] = useState("Your Data Have Been Cleared !");
  const [message, setMessage] = useState("Thank you!");
  const handleSubmit = async () => {
    setLoadingText("Clean...");
    await AxiosActions.ClearSms()
      .then((res) => {
        setLoadingText(undefined);
        setHeader("Info!");
        setSubHeader("All SMS has Been Cleared !");
        setMessage("Clean ! ");
        setShowAlert(true);
      })
      .catch((err) => {
        setLoadingText(undefined);
        console.log(" + err", err);
        setHeader("An Error Has Occured !");
        setSubHeader("Please Check Your Information !");
        setMessage("Data No Clean ! ");
        setShowAlert(true);
      });
  };
  return (
    <IonPage>
      <IonLoading isOpen={!!loadingText} message={loadingText} />
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={header}
        subHeader={subHeader}
        message={message}
        buttons={["OK"]}
      />
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/dashboard" />
          </IonButtons>
          <IonTitle size="large">Clear SMS</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonTitle size="large">
            This Option Will Clear the Past SMS Send Proces, In Order To Allow
            You To Send New Batch Again.
          </IonTitle>
        </IonItem>

        <IonItem>
          <IonButton
            shape="round"
            expand="block"
            size="large"
            onClick={() => handleSubmit()}
          >
            Clear
          </IonButton>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};
