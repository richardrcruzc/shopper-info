import axios from "../utils/axios";

async function Register(payload: any) {
  if (payload === "") return [];
  const client = await axios.post("/client", payload);
  return client.data;
}

async function ListAll() {
  const client = await axios.get("/sms/all");
  return client.data;
}
async function ByPhone(phone: any) {
  const client = await axios.get(`/sms/phone/${phone}`);
  return client.data;
}

async function ChangeStatus(phone: any, status: any) {
  const client = await axios.get(`/sms/phone/${phone}/newstatus/${status}`);
  return client.data;
}
async function SendSmsTest(payload: any) {
  const client = await axios.post("/sms/SendSmsTest", payload);
  return client.data;
}
async function SendSms(payload: any) {
  const client = await axios.post("/sms/SendSms", payload);
  return client.data;
}
async function ClearSms() {
  const client = await axios.post("/sms/ClearSms");
  return client.data;
}
async function ImportSms(payload: any) {
  const client = await axios.post("/sms/BulkSms", JSON.parse(payload));
  console.log("client.data", client.data);
  return client.data;
}
const AxiosActions = {
  Register,
  ListAll,
  ByPhone,
  ChangeStatus,
  SendSmsTest,
  SendSms,
  ClearSms,
  ImportSms,
};

export default AxiosActions;
