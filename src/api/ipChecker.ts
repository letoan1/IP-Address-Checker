import axios from "axios";
export const getDataChecker = (ip: string) => {
  return axios.get(
    `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${
      import.meta.env.VITE_APP_API_KEY
    }&ipAddress=${ip}`
  );
};
