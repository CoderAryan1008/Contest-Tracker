import axios from "axios";
const API_BASE_URL = import.meta.env.DEV
  ? (import.meta.env.VITE_API_URL || "http://localhost:3000")
  : "";
const BACKEND_URL = (import.meta.env.VITE_BACKEND_URL || "").replace(/\/+$/, "");
let backendWarmup;
const api = axios.create({
  baseURL: `${API_BASE_URL}/api/auth`,
  withCredentials: true,
  timeout: 10000,
});

export function warmBackend() {
  if (!BACKEND_URL) {
    return Promise.resolve();
  }

  if (!backendWarmup) {
    backendWarmup = fetch(`${BACKEND_URL}/health`, { mode: "no-cors" })
      .then(() => undefined)
      .catch(() => {
        backendWarmup = undefined;
      });
  }

  return backendWarmup;
}

export async function login() {
  await warmBackend();
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