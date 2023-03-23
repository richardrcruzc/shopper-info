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
  IonLabel,
  IonTextarea,
  IonLoading,
} from "@ionic/react";
import { useState } from "react";
import AxiosActions from "../service/AxiosCalls";

export const SendSms: React.FC = () => {
  const [loadingText, setLoadingText] = useState<string | undefined>();
  const [smsMessage, setSmsMessage] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [header, setHeader] = useState("Alert");
  const [subHeader, setSubHeader] = useState(
    "Your Information have been saved !"
  );
  const [message, setMessage] = useState("Thank you!");
  const handleSubmit = async () => {
    if (smsMessage === undefined || smsMessage === "") {
      setHeader("Alert!");
      setSubHeader("You Must Enter Some Message In The Message Box !");
      setMessage("Thanks ! ");
      setShowAlert(true);
      return;
    }
    setLoadingText("SendSms...");
    await AxiosActions.SendSms({ message: smsMessage })
      .then((res) => {
        setLoadingText(undefined);
        setHeader("Info!");
        setSubHeader("All SMS has Been Sent !");
        setMessage("Sent ! ");
        setShowAlert(true);
      })
      .catch((err) => {
        setLoadingText(undefined);
        console.log(" + err", err);
        setHeader("An Error Has Occured !");
        setSubHeader("Please Check Your Information !");
        setMessage("All Fields Are Required ! ");
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
          <IonTitle size="large">Send SMS</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <div className="ion-padding">
            Enter The Message To Be Send To all the Customer That Have Been
            Register In Then App.
          </div>
        </IonItem>
        <IonItem fill="outline">
          <IonLabel position="floating">
            {" "}
            <h1>Message To Be Send </h1>
          </IonLabel>
          <IonTextarea
            autoGrow={true}
            name="smsMessage"
            placeholder="Type something here"
            value={smsMessage}
            onIonInput={(e: any) => setSmsMessage(e.target.value)}
          ></IonTextarea>
        </IonItem>
        <IonItem>
          <IonButton
            shape="round"
            expand="block"
            size="large"
            onClick={() => handleSubmit()}
          >
            Send
          </IonButton>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};
