import { getAU } from ".";
import axios from "axios";
const currentToken = localStorage.getItem("user_jwt");

export async function getLoggedInUser() {
  const res = await axios.get(getAU("/auth"), {
    headers: {
      Authorization: `Bearer ${JSON.parse(currentToken)}`,
    },
  });
  return res.data;
}

export async function signUserIn(credentials) {
  const res = await axios.post(
    getAU("/auth/signin"),
    JSON.stringify(credentials),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
}
export async function logUserIn(credentials) {
  const res = await axios.post(
    getAU("/auth/login"),
    JSON.stringify(credentials),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
}

export async function logUserOut() {
  const res = await axios.post(getAU("/auth/logout"));
  return res.data;
}
