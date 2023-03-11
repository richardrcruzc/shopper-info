import axios from "../utils/axios";

async function Register(payload) {
  if (payload === "") return [];
  const client = await axios.post("/client", payload);
  return client.data;
}

export default Register;
