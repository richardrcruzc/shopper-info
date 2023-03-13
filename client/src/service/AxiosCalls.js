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
const AxiosActions = { Register, ListAll, ByPhone };

export default AxiosActions;
