import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonBackButton,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonLoading,
  IonAlert,
} from "@ionic/react";
import { useState } from "react";
import AxiosActions from "../service/AxiosCalls";
import "./TestSms.css";
export const TestSms: React.FC = () => {
  const [loadingText, setLoadingText] = useState<string | undefined>();
  const [phone, setPhone] = useState();
  const [smsMessage, setSmsMessage] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [header, setHeader] = useState("Alert");
  const [subHeader, setSubHeader] = useState(
    "Your Information have been saved !"
  );
  const [message, setMessage] = useState("Thank you!");
  async function handleSubmit() {
    if (phone === undefined || phone === "") {
      setHeader("Error");
      setSubHeader("Please enter a valid number.");
      setMessage("Thanks");
      setShowAlert(true);
      return;
    }
    if (smsMessage === undefined || smsMessage === "") {
      setHeader("Error");
      setSubHeader("Please enter a valid Message.");
      setMessage("Thanks");
      setShowAlert(true);
      return;
    }
    setLoadingText("SendSmsTest...");
    const payLoad = { phone: phone, message: smsMessage };
    await AxiosActions.SendSmsTest(payLoad)
      .then(async (res) => {
        setPhone(undefined);
        setSmsMessage(undefined);
        setLoadingText(undefined);
        setHeader("Info");
        setSubHeader("Test Message Sent.");
        setMessage("Thanks");
        setShowAlert(true);
      })
      .catch((err: any) => {
        console.log(" + err", err);
        setLoadingText(undefined);
        setHeader("And Erro has ocurred");
        setSubHeader(err);
        setMessage("Thanks");
        setShowAlert(true);
      });
  }

  return (
    <IonPage>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={header}
        subHeader={subHeader}
        message={message}
        buttons={["OK"]}
      />
      <IonLoading isOpen={!!loadingText} message={loadingText} />
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/dashboard" />
          </IonButtons>
          <IonTitle size="large">Test SMS</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem fill="outline">
            <IonLabel position="floating">
              {" "}
              <h1>Telephone Number </h1>
            </IonLabel>
            <IonInput
              name="phone"
              type="tel"
              placeholder="888-888-8888"
              value={phone}
              onIonInput={(e: any) => setPhone(e.target.value)}
            ></IonInput>
          </IonItem>
          <IonItem fill="outline">
            <IonLabel position="floating">
              {" "}
              <h1>Message </h1>
            </IonLabel>
            <IonTextarea
              autoGrow={true}
              name="smsMessage"
              placeholder="Type something here"
              value={smsMessage}
              onIonInput={(e: any) => setSmsMessage(e.target.value)}
            ></IonTextarea>
          </IonItem>

          <IonButton
            shape="round"
            expand="block"
            size="large"
            onClick={handleSubmit}
          >
            Test
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};
