import { BellRing, Bookmark, Check, Clock3, ExternalLink } from "lucide-react";
import { getPlatformTheme } from "@/lib/platformTheme";
import { useCountdown } from "@/lib/useCountdown";

export const ContestCard = ({
  contest,
  index = 0,
  bookmarked,
  onBookmark,
  isReminderSet,
  setReminder,
  removeReminder,
}) => {
  const theme = getPlatformTheme(contest.platform);
  // Derives isLive/label straight from startTime + durationSeconds — the
  // fields this project's API actually returns (there is no endTime field).
  const { label, isLive } = useCountdown(
    contest.startTime,
    contest.durationSeconds,
  );
  const reminderSet = isReminderSet(contest._id);

  const formatDate = (isoString) =>
    new Date(isoString).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <article
      className={`contest-card ${isLive ? "is-live" : ""}`}
      style={{
        "--accent": theme.color,
        animationDelay: `${Math.min(index, 10) * 50}ms`,
      }}
    >
      <div className="card-accent-bar" />
      <div className="card-glow" aria-hidden="true" />

      <header className="card-header">
        <span className="platform-chip">
          <span className="platform-mono">
            <img src={theme.Icon} alt="Logo Of Codechef" />
          </span>
          {theme.label}
        </span>
        <div className="card-header-actions">
          <span className={`badge ${isLive ? "badge-live" : "badge-upcoming"}`}>
            <span className="pulse-dot" />
            {isLive ? "Live now" : "Upcoming"}
          </span>
          <button
            type="button"
            className={`bookmark-toggle ${bookmarked ? "is-on" : ""}`}
            onClick={() => onBookmark(contest._id)}
            aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            <Bookmark size={13} fill={bookmarked ? "currentColor" : "none"} />
          </button>
        </div>
      </header>

      <h3 className="contest-title">{contest.name}</h3>

      <div className="contest-meta">
        <div className="meta-block">
          <span className="meta-label">Start time</span>
          <span className="meta-value">
            <Clock3 size={13} className="meta-icon" />
            {formatDate(contest.startTime)}
          </span>
        </div>
        <div className="meta-block">
          <span className="meta-label">Duration</span>
          <span className="meta-value">
            {contest.durationSeconds
              ? `${Math.round(contest.durationSeconds / 60)} mins`
              : "N/A"}
          </span>
        </div>
      </div>

      <div className="countdown-strip">
        <span className={`countdown-text ${isLive ? "is-live" : ""}`}>
          {label} {isLive ? "remaining" : "to start"}
        </span>
      </div>

      <footer className="card-actions">
        <a
          href={contest.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline"
        >
          <ExternalLink size={14} className="btn-icon" />
          View contest
        </a>
        <button
          type="button"
          className={`btn btn-solid ${reminderSet ? "is-set" : ""}`}
          onClick={() => {
            if (!reminderSet) {
              setReminder(contest._id);
            } else {
              //Abb humme yaahan reminder ko remove karna hain
              removeReminder(contest._id);
            }
          }}
        >
          {reminderSet ? (
            <Check size={14} className="btn-icon" />
          ) : (
            <BellRing size={14} className="btn-icon" />
          )}
          {reminderSet ? "Reminder set" : "Remind me"}
        </button>
      </footer>
    </article>
  );
};

export default ContestCard;
