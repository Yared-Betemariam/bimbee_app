export const baseAPIURL = "https://bimbee.onrender.com/api";
export async function fetchData(input, init) {
  const res = await fetch(input, init);
  return res;
}

export const getAU = (url) => {
  return `${baseAPIURL}${url}`;
};

const currentToken = localStorage.getItem("user_jwt");

export const hOptions = {
  headers: {
    Authorization: `Bearer ${JSON.parse(currentToken)}`,
  },
};
