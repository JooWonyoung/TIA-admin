import axios from "axios";

const url = process.env.REACT_APP_PUBLIC_API_URL;

//로그인
export async function postLoginApi(payload) {
  return await axios.post(url + "/login", payload);
}
