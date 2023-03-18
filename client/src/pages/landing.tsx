import { useState } from "react";
import {
  IonAlert,
  IonApp,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonFooter,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./landing.css";
import AxiosActions from "../service/AxiosCalls";
import { useIonRouter } from "@ionic/react";
import logo from "../Images/LogoIdeal.jpeg";
const initialState = {
  phone: "",
  fName: "",
  lName: "",
  Address: "",
  City: "",
  ZipCode: "",
};

function Landing() {
  const [client, setClient] = useState(initialState);
  const [showAlert, setShowAlert] = useState(false);
  const [header, setHeader] = useState("Alert");
  const [subHeader, setSubHeader] = useState(
    "Your Information have been saved !"
  );
  const [message, setMessage] = useState("Thank you!");

  const handleSubmit = async () => {
    await AxiosActions.Register(client)
      .then((res) => {
        setClient(initialState);
        setShowAlert(true);
      })
      .catch((err) => {
        console.log(" + err", err);
        setHeader("An Error Has Occured !");
        setSubHeader("Please Check Your Information !");
        setMessage("All Fields Are Required ! ");
        setShowAlert(true);
      });
  };
  const handleInputChange = (ev: Event) => {
    const { name, value } = ev.target as HTMLInputElement;
    setClient({ ...client, [name]: value });
  };

  //	Initializing our router
  const router = useIonRouter();
  //	A simple, hard-coded navigation
  const simpleNavigate = () => {
    router.push("/login", "forward", "push");
  };
  return (
    <IonApp>
      <IonCard>
        <IonCardHeader>
          <img src={logo} alt="Ideal Food Market"></img>
          <IonCardTitle class="ion-text-center">
            Join Our Weekly Ad.
          </IonCardTitle>
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
            <IonGrid>
              <IonRow>
                <IonCol>
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
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
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
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
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
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonItem fill="outline">
                    <IonLabel position="floating">
                      <h1>Address </h1>
                    </IonLabel>
                    <IonInput
                      name="Address"
                      value={client.Address}
                      onIonInput={(e) => handleInputChange(e)}
                    ></IonInput>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonItem fill="outline">
                    <IonLabel position="floating">
                      <h1>City </h1>
                    </IonLabel>
                    <IonInput
                      name="City"
                      value={client.City}
                      onIonInput={(e) => handleInputChange(e)}
                    ></IonInput>
                  </IonItem>
                </IonCol>
                <IonCol>
                  <IonItem fill="outline">
                    <IonLabel position="floating">
                      <h1>Zipcode </h1>
                    </IonLabel>
                    <IonInput
                      type="number"
                      name="ZipCode"
                      placeholder="Zipcode"
                      value={client.ZipCode}
                      onIonInput={(e) => handleInputChange(e)}
                    ></IonInput>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonButton
                    shape="round"
                    expand="block"
                    size="large"
                    onClick={() => handleSubmit()}
                  >
                    Join -- Unete
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonList>
        </IonCardContent>
      </IonCard>
      <IonFooter>
        <IonToolbar>
          <IonTitle>
            <IonButton onClick={simpleNavigate}>LogIn</IonButton>
          </IonTitle>
        </IonToolbar>
      </IonFooter>
    </IonApp>
  );
}
export default Landing;
