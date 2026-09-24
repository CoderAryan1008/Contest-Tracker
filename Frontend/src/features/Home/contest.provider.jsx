import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ContestContext } from "./contest.context";
import {
  getUpcomingContests,
  getMyReminders,
  createReminder as createReminderApi,
  deleteReminder as deleteReminderApi,
} from "./services/contest.api";

export const ContestProvider = ({ children }) => {
  const [contests, setContests] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // run both in parallel — no reason to wait for one before starting the other
      const [contestList, reminderList] = await Promise.all([
        getUpcomingContests(),
        getMyReminders(),
      ]);
      setContests(contestList);
      setReminders(reminderList);
    } catch (err) {
      console.error("Failed to load contest data:", err);
      setError("Unable to load contests right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const initialLoad = window.setTimeout(() => {
      void loadData();
    }, 0);

    return () => window.clearTimeout(initialLoad);
  }, [loadData]);

  const getReminderContestId = (reminder) => {
    if (!reminder?.contestId) {
      return null;
    }

    return typeof reminder.contestId === "object"
      ? reminder.contestId._id
      : reminder.contestId;
  };

  const matchesContest = (reminder, contestId) =>
    String(getReminderContestId(reminder)) === String(contestId);

  const isReminderSet = (contestId) => {
    return reminders.some((reminder) => matchesContest(reminder, contestId));
  };

  const getReminderForContest = (contestId) => {
    return reminders.find((reminder) => matchesContest(reminder, contestId));
  };

  // action: create a reminder, then resync local state from the server
  // rather than trying to guess the shape of what the server returns
  const setReminder = async (contestId) => {
    if (isReminderSet(contestId)) {
      toast("Reminder already set.", { icon: "ℹ️" });
      return;
    }

    try {
      await toast.promise(createReminderApi(contestId), {
        loading: "Setting reminder...",
        success: "Reminder set successfully!",
        error: "Unable to set reminder right now.",
      });
      await loadData();
    } catch (err) {
      console.error("Failed to set reminder:", err);
    }
  };

  const removeReminder = async (targetId) => {
    const reminderRecord =
      reminders.find((reminder) => matchesContest(reminder, targetId)) ??
      reminders.find((reminder) => String(reminder._id) === String(targetId));

    const reminderId = reminderRecord?._id ?? targetId;

    if (!reminderId) {
      toast.error("No reminder found for this contest.");
      return;
    }

    try {
      await toast.promise(deleteReminderApi(reminderId), {
        loading: "Removing reminder...",
        success: "Reminder removed.",
        error: "Unable to remove reminder.",
      });
      await loadData();
    } catch (err) {
      console.error("Failed to remove reminder:", err);
    }
  };

  const value = {
    contests,
    reminders,
    loading,
    error,
    isReminderSet,
    getReminderForContest,
    setReminder,
    removeReminder,
    refetch: loadData,
  };

  return (
    <ContestContext.Provider value={value}>{children}</ContestContext.Provider>
  );
};
