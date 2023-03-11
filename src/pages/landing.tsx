import React, { useState } from "react";
import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
} from "@ionic/react";

import "./landing.css";
import Register from "../service/registerClient";

const initialState = {
  phone: "",
  email: "",
  fName: "",
  lName: "",
  zipCode: "",
};

function Landing() {
  const [client, setClient] = useState(initialState);
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState<boolean>();
  //const ionInputEl = useRef<HTMLIonInputElement>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [header, setHeader] = useState("Alert");
  const [subHeader, setSubHeader] = useState(
    "Your Information have been saved !"
  );
  const [message, setMessage] = useState("Thank you!");

  const handleSubmit = async () => {
    console.log("client", client);
    await Register(client)
      .then((res) => {
        setClient(initialState);
        setShowAlert(true);
      })
      .catch((err) => {
        setHeader("An Error Has Occured !");
        setSubHeader("Please Check Your Information !");
        setMessage("All Fields Are Required ! " + err);
        setShowAlert(true);
      });
  };
  const handleInputChange = (ev: Event) => {
    const { name, value } = ev.target as HTMLInputElement;
    setClient({ ...client, [name]: value });
  };

  const validateEmail = (email: string) => {
    return email.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
  };
  const validate = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    setIsValid(undefined);

    if (value === "") return;

    validateEmail(value) !== null ? setIsValid(true) : setIsValid(false);
  };

  const markTouched = () => {
    setIsTouched(true);
  };
  return (
    <IonCard>
      <IonCardHeader>
        <img src="/assets/logoideal.jpeg" alt="Ideal Food Market"></img>
        <IonCardTitle class="ion-text-center">Join Our Weekly Ad.</IonCardTitle>
        <IonCardSubtitle class="ion-text-center">
          Shop and save with our weekly deals.
        </IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={header}
          subHeader={subHeader}
          message={message}
          buttons={["OK"]}
        />
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
              value={client.phone}
              onIonInput={(e) => handleInputChange(e)}
            ></IonInput>
          </IonItem>
          <IonItem
            fill="outline"
            className={`${isValid && "ion-valid"} ${
              isValid === false && "ion-invalid"
            } ${isTouched && "ion-touched"}`}
          >
            <IonLabel position="floating">
              <h1>Email input </h1>
            </IonLabel>
            <IonInput
              name="email"
              type="email"
              placeholder="email@domain.com"
              onIonInput={(event) => {
                validate(event);
                handleInputChange(event);
              }}
              onIonBlur={() => markTouched()}
              value={client.email}
            ></IonInput>

            <IonNote slot="error">
              <h1>Invalid email </h1>
            </IonNote>
          </IonItem>
          <IonItem fill="outline">
            <IonLabel position="floating">
              <h1>First Name </h1>
            </IonLabel>
            <IonInput
              name="fName"
              value={client.fName}
              onIonInput={(e) => handleInputChange(e)}
            ></IonInput>
          </IonItem>

          <IonItem fill="outline">
            <IonLabel position="floating">
              <h1>Last Name </h1>
            </IonLabel>
            <IonInput
              name="lName"
              placeholder="Enter company name"
              value={client.lName}
              onIonInput={(e) => handleInputChange(e)}
            ></IonInput>
          </IonItem>
          <IonItem fill="outline">
            <IonLabel position="floating">
              <h1>Zipcode </h1>
            </IonLabel>
            <IonInput
              type="number"
              name="zipCode"
              placeholder="Zipcode"
              value={client.zipCode}
              onIonInput={(e) => handleInputChange(e)}
            ></IonInput>
          </IonItem>
          <IonButton
            shape="round"
            expand="block"
            size="large"
            onClick={() => handleSubmit()}
          >
            Join -- Unete
          </IonButton>
        </IonList>
      </IonCardContent>
    </IonCard>
  );
}
export default Landing;
