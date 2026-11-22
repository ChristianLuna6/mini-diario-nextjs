import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  timeout: 15000,
});

export async function getQuotes() {
  const response = await api.get("/quote");
  return response.data;
}
