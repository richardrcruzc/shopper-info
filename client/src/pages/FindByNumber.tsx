import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonLoading,
  IonButtons,
  IonBackButton,
  IonSearchbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonButton,
} from "@ionic/react";
import { trashBin } from "ionicons/icons";
import AxiosActions from "../service/AxiosCalls";

import "./FindByNumber.css";
export type initialState = {
  _id: string;
  phone: string;
  email: string;
  fName: string;
  lName: string;
  ZipCode: string;
  Status: string;
};
export const FindByNumber: React.FC = () => {
  const [loadingText, setLoadingText] = useState<string | undefined>();
  const [smsPhone, setSmsPhone] = useState<initialState>();

  const SearchQuery = async (phone: any) => {
    if (phone.length <= 9 || phone.length > 11) return;
    setLoadingText("Loading...");
    await AxiosActions.ByPhone(phone)
      .then((res) => {
        setSmsPhone(res[0]);
        setLoadingText(undefined);
      })
      .catch((err: any) => {
        console.log(" + err", err);
        setLoadingText(undefined);
      });
  };
  const handleChangeStatust = async () => {
    setLoadingText("ChangeStatus...");
    const newStatus = smsPhone?.Status === "Canceled" ? "Pending" : "Canceled";
    await AxiosActions.ChangeStatus(smsPhone?.phone, newStatus)
      .then(async (res) => {
        setLoadingText(undefined);
        await SearchQuery(smsPhone?.phone);
      })
      .catch((err: any) => {
        console.log(" + err", err);
        setLoadingText(undefined);
      });
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/dashboard" />
          </IonButtons>
          <IonTitle>Find By Number</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonLoading isOpen={!!loadingText} message={loadingText} />
        <IonSearchbar
          animated={true}
          showClearButton="always"
          clearIcon={trashBin}
          placeholder="Search phone number"
          onIonChange={(e) => SearchQuery(e.detail.value!)}
        />
        {smsPhone && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>{smsPhone?.phone}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonCardSubtitle>
                Name: {smsPhone?.fName} {smsPhone?.fName}
              </IonCardSubtitle>
              <IonCardSubtitle>Email: {smsPhone?.email}</IonCardSubtitle>
              <IonCardSubtitle>ZipCode: {smsPhone?.ZipCode}</IonCardSubtitle>
              <IonCardSubtitle>Status: {smsPhone?.Status}</IonCardSubtitle>
            </IonCardContent>
            <IonButton
              shape="round"
              expand="block"
              onClick={() => handleChangeStatust()}
            >
              {smsPhone?.Status === "Canceled" ? "Activate?" : "Cancel?"}
            </IonButton>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};
