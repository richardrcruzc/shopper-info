import axios from "../utils/axios";

async function Register(payload) {
  if (payload === "") return [];
  const client = await axios.post("/client", payload);
  return client.data;
}

async function ListAll() {
  const client = await axios.get("/sms/all");
  return client.data;
}
async function ByPhone(phone) {
  const client = await axios.get(`/sms/phone/${phone}`);
  return client.data;
}

async function ChangeStatus(phone, status) {
  const client = await axios.get(`/sms/phone/${phone}/newstatus/${status}`);
  return client.data;
}
async function SendSmsTest(payload) {
  const client = await axios.post("/sms/SendSmsTest", payload);
  return client.data;
}
async function SendSms(payload) {
  const client = await axios.post("/sms/SendSms", payload);
  return client.data;
}
async function ClearSms() {
  const client = await axios.post("/sms/ClearSms");
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
};

export default AxiosActions;
