import axios from "axios";

const domain = "https://candidate.hubteam.com";

export const getPartners = async () => {
  const response = await axios.get(
    `${domain}/candidateTest/v3/problem/dataset`,
    {
      params: { userKey: "7043ab35efbb6a4c244000ee3232" },
    }
  );

  return response.data;
};
