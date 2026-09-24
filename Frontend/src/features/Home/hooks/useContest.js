import { useContext } from "react";
import { ContestContext } from "../contest.context";

export const useContest = () => {
  const context = useContext(ContestContext);

  if (!context) {
    throw new Error("useContest must be used inside a ContestProvider");
  }

  return context;
};