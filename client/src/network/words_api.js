import { getAU, hOptions } from ".";
import axios from "axios";

export const getWordList = async (query) => {
  const res = await axios.get(
    getAU(`/words${query ? `?${query}` : ""}`),
    hOptions
  );
  return res.data;
};
export const getFocusList = async () => {
  const res = await axios.get(getAU(`/words/perf`), hOptions);
  return res.data;
};
export const getWord = async (name) => {
  const res = await axios.get(getAU(`/words/word/${name}`), hOptions);
  return res.data;
};
export const getRandomWord = async () => {
  const res = await axios.get(getAU(`/words/random`), hOptions);
  return res.data;
};
export const getWordAmout = async () => {
  const res = await axios.get(getAU(`/words/no`), hOptions);
  return res.data;
};
export const getTestQ = async (credentials) => {
  const res = await axios.post(
    getAU(`/words/test`),
    JSON.stringify(credentials),
    {
      headers: {
        "Content-Type": "application/json",
        ...hOptions.headers,
      },
    }
  );
  return res.data;
};
export const postPerf = async (credentials) => {
  console.log(credentials);
  const res = await axios.post(
    getAU(`/words/perf`),
    JSON.stringify(credentials),
    {
      headers: {
        "Content-Type": "application/json",
        ...hOptions.headers,
      },
    }
  );
  return res.data;
};
