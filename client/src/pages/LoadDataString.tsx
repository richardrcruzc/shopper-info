import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonLoading,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import AxiosActions from "../service/AxiosCalls";
import "./LoadDataString.css";
class Sms {
  constructor(
    public phone: string,
    public fName: string,
    public lName: string,
    public Adress: string,
    public City: string,
    public ZipCode: string,
    public Status: string,
    public results: string
  ) {}
}
const LoadDataString = () => {
  const [isDisabled, setIsDisable] = useState(false);
  const [importData, setImportData] = useState("");
  const [loadingText, setLoadingText] = useState<string | undefined>();

  const handleChangeStatus = async () => {
    if (importData === "") return;
    setIsDisable(true);
    setLoadingText("ChangeStatus...");

    const arrayLines = importData.split("\n");

    let arrayResult: Sms[] = [];

    arrayLines.forEach((line) => {
      const arrayData = line.split("|");

      let list = new Sms(
        arrayData[0] ?? "",
        arrayData[1] ?? "",
        arrayData[2] ?? "",
        arrayData[3] ?? "",
        arrayData[4] ?? "",
        arrayData[5] ?? "",
        arrayData[6] ?? "",
        arrayData[7] ?? ""
      );

      arrayResult.push(list);
    });

    await AxiosActions.ImportSms(JSON.stringify(arrayResult))
      .then(async (res) => {
        setLoadingText(undefined);
      })
      .catch((err: any) => {
        console.log(" + err", err);
        setLoadingText(undefined);
      });
  };
  return (
    <IonPage>
      <IonLoading isOpen={!!loadingText} message={loadingText} />
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/dashboard" />
          </IonButtons>
          <IonTitle>Import Data</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="container">
          <div>
            <h1>Please use this format to import Info</h1>
            <h3>phone|First Name|Last Name|Adress|City|ZipCode</h3>
          </div>
          <IonButton
            onClick={(event) => handleChangeStatus()}
            disabled={isDisabled}
          >
            Import Info...
          </IonButton>
          <IonTextarea
            id="importData"
            name="importData"
            value={importData}
            autoGrow
            autofocus
            placeholder="Paste info to Import here !"
            onIonInput={(e: any) => setImportData(e.target.value)}
          ></IonTextarea>
          <IonButton
            onClick={(event) => handleChangeStatus()}
            disabled={isDisabled}
          >
            Import Info...
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoadDataString;
