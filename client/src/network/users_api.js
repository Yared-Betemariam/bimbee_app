import { getAU, hOptions } from ".";
import axios from "axios";

export async function getLoggedInUser() {
  const res = await axios.get(getAU("/auth"), hOptions);
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
