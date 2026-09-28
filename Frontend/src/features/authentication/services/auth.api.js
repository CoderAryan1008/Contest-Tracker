import axios from "axios";
import { useEffect } from "react";
const API_BASE_URL = import.meta.env.DEV
  ? (import.meta.env.VITE_API_URL || "http://localhost:3000")
  : "";
const api = axios.create({
  baseURL: `${API_BASE_URL}/api/auth`,
  withCredentials: true,
  timeout: 10000,
});
useEffect(() => {
  fetch(`${import.meta.env.VITE_BACKEND_URL}/health`).catch(() => { });
}, []); //Isse hum sabse pahle backend server ko up karenge phir hi reverse proxy ka use karenge for the oauth

export function login() {
  window.location.href = `${API_BASE_URL}/api/auth/google`;
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