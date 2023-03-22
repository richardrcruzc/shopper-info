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
  const [phoneError, setPhoneError] = useState("");
  const [fNameError, setFnameError] = useState("");
  const [lNameError, setLnameError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [cityError, setCityError] = useState("");
  const [zipCodeError, setZipCodeError] = useState("");
  const [client, setClient] = useState(initialState);
  const [showAlert, setShowAlert] = useState(false);
  const [header, setHeader] = useState("Alert");
  const [subHeader, setSubHeader] = useState(
    "Your Information have been saved !"
  );
  const [message, setMessage] = useState("Thank you!");

  const phoneValidation = async (ev: Event) => {
    const { name, value } = ev.target as HTMLInputElement;
    setClient({ ...client, [name]: value });
    setPhoneError("");

    const regex =
      /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s.]{0,1}[0-9]{3}[-\s.]{0,1}[0-9]{4}$/;
    const result = regex.test(value);

    if (!result) setPhoneError("Phone Number not valid!");
  };
  const handleInputChangeFName = (ev: Event) => {
    const { name, value } = ev.target as HTMLInputElement;
    console.log("value.trim.length", value.trim.length);
    console.log("name", name);
    setFnameError("");
    if (value.length > 25) {
      setFnameError("First Name Not Valid!,  Input Should Be between 2 and 25");
    }

    if (value.length < 2) {
      setFnameError("First Name Not Valid!,  Input Should Be between 2 and 75");
    }

    setClient({ ...client, [name]: value });
  };
  const handleInputChangeLName = (ev: Event) => {
    const { name, value } = ev.target as HTMLInputElement;
    console.log("value.trim.length", value.trim.length);
    console.log("name", name);
    setLnameError("");
    if (value.length > 25) {
      setLnameError("Last Name Not Valid!,  Input Should Be between 2 and 25");
    }

    if (value.length < 2) {
      setLnameError("Last Name Not Valid!,  Input Should Be between 2 and 75");
    }

    setClient({ ...client, [name]: value });
  };
  const handleInputChangeAddress = (ev: Event) => {
    const { name, value } = ev.target as HTMLInputElement;
    console.log("value.trim.length", value.trim.length);
    console.log("name", name);
    setAddressError("");
    if (value.length > 75) {
      setAddressError("Address Not Valid!, Input Should Be between 2 and 75");
    }

    if (value.length < 2) {
      setAddressError("Address Not Valid!, Input Should Be between 2 and 75");
    }

    setClient({ ...client, [name]: value });
  };
  const handleInputChangeCity = (ev: Event) => {
    const { name, value } = ev.target as HTMLInputElement;
    console.log("value.trim.length", value.trim.length);
    console.log("name", name);
    setCityError("");
    if (value.length > 75) {
      setCityError("City Not Valid!, Input Should Be between 2 and 50");
    }

    if (value.length < 2) {
      setCityError("City Not Valid!, Input Should Be between 2 and 50");
    }

    setClient({ ...client, [name]: value });
  };
  const handleZipInputChange = (ev: Event) => {
    const { name, value } = ev.target as HTMLInputElement;
    setZipCodeError("");

    if (value.length > 10) {
      setZipCodeError("Zip Code Not Valid!, Input Should Be between 2 and 9");
    }

    if (value.length < 5) {
      setZipCodeError("Zip Code Not Valid!, Input Should Be between 5 and 9");
    }
    setClient({ ...client, [name]: value });
  };
  const handleSubmit = async () => {
    if (
      phoneError !== "" ||
      fNameError !== "" ||
      lNameError !== "" ||
      addressError !== "" ||
      cityError !== "" ||
      zipCodeError !== ""
    ) {
      return;
    }
    console.log("phoneError", phoneError);
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
                      pattern="\d{3}[\-]\d{3}[\-]\d{4}"
                      required
                      name="phone"
                      type="tel"
                      placeholder="888-888-8888"
                      value={client.phone}
                      onIonInput={(e) => phoneValidation(e)}
                    ></IonInput>
                    <label className="alert alert-danger" role="alert">
                      {phoneError}
                    </label>
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
                      placeholder="Enter First Name"
                      value={client.fName}
                      onIonInput={(e) => handleInputChangeFName(e)}
                    ></IonInput>
                    <label className="alert alert-danger" role="alert">
                      {fNameError}
                    </label>
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
                      placeholder="Enter Last Name"
                      value={client.lName}
                      onIonInput={(e) => handleInputChangeLName(e)}
                    ></IonInput>
                    <label className="alert alert-danger" role="alert">
                      {lNameError}
                    </label>
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
                      onIonInput={(e) => handleInputChangeAddress(e)}
                    ></IonInput>
                    <label className="alert alert-danger" role="alert">
                      {addressError}
                    </label>
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
                      onIonInput={(e) => handleInputChangeCity(e)}
                    ></IonInput>
                    <label className="alert alert-danger" role="alert">
                      {cityError}
                    </label>
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
                      onIonInput={(e) => handleZipInputChange(e)}
                    ></IonInput>
                    <label className="alert alert-danger" role="alert">
                      {zipCodeError}
                    </label>
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
