import axios from "axios";

const domain = "https://candidate.hubteam.com";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const postCountries = async (countries) => {
  const body = JSON.stringify({ countries });
  console.log(body);
  const response = await axios.post(
    `${domain}/candidateTest/v3/problem/result?userKey=7043ab35efbb6a4c244000ee3232`,
    body,
    config
  );

  return response.data;
};
