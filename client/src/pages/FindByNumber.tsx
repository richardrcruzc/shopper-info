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
} from "@ionic/react";
import { trashBin } from "ionicons/icons";
import AxiosActions from "../service/AxiosCalls";
export type initialState = {
  _id: string;
  phone: string;
  email: string;
  fName: string;
  lName: string;
  ZipCode: string;
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
        console.log("smsPhone 1", smsPhone);
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
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{smsPhone?.phone}</IonCardTitle>
            <IonCardSubtitle>{smsPhone?.fName}</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            <IonCardSubtitle>
              {smsPhone?.fName} {smsPhone?.fName}
            </IonCardSubtitle>
            <IonCardSubtitle>{smsPhone?.email}</IonCardSubtitle>
            <IonCardSubtitle>{smsPhone?.ZipCode}</IonCardSubtitle>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};
