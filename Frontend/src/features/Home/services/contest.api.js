import axios from "axios";

const BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(
  /\/$/,
  "",
);

const EMPTY_CONTEST_GROUPS = {
  codeforces: [],
  codechef: [],
  leetcode: [],
};

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true,
  timeout: 10000,
});

export async function getGroupedContests() {
  const response = await api.get("/fetch-contest");
  return {
    ...EMPTY_CONTEST_GROUPS,
    ...response.data.contests,
  };
}

export async function getUpcomingContests() {
  const grouped = await getGroupedContests();
  const flat = [...grouped.codeforces, ...grouped.codechef, ...grouped.leetcode];
  flat.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
  return flat;
}

export async function getMyReminders() {
  const response = await api.get("/reminder/allReminders");
  return response.data.reminders;
}

export async function createReminder(contestId) {
  const response = await api.post("/reminder", { contestId });
  return response.data.reminder;
}

export async function deleteReminder(reminderId) {
  // console.log("Bhai deleteReminder function main hu");
  const response = await api.delete(`/reminder/${reminderId}`);
  return response.data;
}