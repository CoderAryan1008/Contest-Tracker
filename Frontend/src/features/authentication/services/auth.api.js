import axios from "axios";

const BASE_URL = (import.meta.env.VITE_API_URL || "https://contest-tracker-jmf8.onrender.com").replace(/\/$/, "");

const api = axios.create({
  baseURL: `${BASE_URL}/api/auth`,
  withCredentials: true,
  timeout: 10000,
});

export function login() {
  window.location.href = `${BASE_URL}/api/auth/google`;
}

export async function logout() {
  try {
    const response = await api.post("/logout", {});
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getMe() {
  try {
    const response = await api.get("/get-me");
    return response.data.user; // matches getmecontroller's { user: {...} } shape
  } catch (err) {
    console.log(err);
    return null;
  }
}