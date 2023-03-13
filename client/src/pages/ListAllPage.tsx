import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonLoading,
  IonButtons,
  IonBackButton,
  IonCol,
  IonGrid,
  IonRow,
} from "@ionic/react";
import { useHistory } from "react-router";
import AxiosActions from "../service/AxiosCalls";
export type initialState = {
  _id: string;
  phone: string;
  email: string;
  fName: string;
  lName: string;
  ZipCode: string;
};
export const ListAllPage: React.FC = () => {
  const [listSms, setListSms] = useState<initialState[]>([]);
  const [loadingText, setLoadingText] = useState<string | undefined>();
  const { replace } = useHistory();

  useEffect(() => {
    const LoadSms = async () => {
      setLoadingText("Loading...");
      await AxiosActions.ListAll()
        .then((res: initialState[]) => {
          setListSms(res);
          setLoadingText(undefined);
        })
        .catch((err) => {
          console.log(" + err", err);
          setLoadingText(undefined);
        });
    };
    LoadSms();
  }, []);
  const handLoad = async () => {
    replace("/DashBoard");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/dashboard" />
          </IonButtons>
          <IonTitle size="large">List All SMS</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton onClick={handLoad}>Action</IonButton>
        <IonLoading isOpen={!!loadingText} message={loadingText} />
        <IonGrid>
          <IonRow>
            <IonCol size="12" size-sm="2">
              Phone
            </IonCol>
            <IonCol size="12" size-sm="2">
              Name
            </IonCol>
            <IonCol size="12" size-sm="2">
              Email
            </IonCol>
            <IonCol size="12" size-sm="2">
              ZipCode
            </IonCol>
            <IonCol size="12" size-sm="2">
              Actin
            </IonCol>
          </IonRow>
          {listSms &&
            listSms?.map((sms: initialState) => (
              <IonRow key={sms._id}>
                <IonCol size="12" size-sm="2">
                  {sms.phone}
                </IonCol>
                <IonCol size="12" size-sm="2">
                  {sms.fName} {sms.lName}
                </IonCol>
                <IonCol size="12" size-sm="2">
                  {sms.email}
                </IonCol>
                <IonCol size="12" size-sm="2">
                  {sms.ZipCode}
                </IonCol>
                <IonCol size="12" size-sm="2">
                  {"Action"}
                </IonCol>
              </IonRow>
            ))}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
