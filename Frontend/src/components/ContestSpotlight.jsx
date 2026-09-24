import { useRef } from "react";
import {
  BellRing,
  Bookmark,
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Radio,
} from "lucide-react";
import { getPlatformTheme } from "@/lib/platformTheme";
import { useCountdown } from "@/lib/useCountdown";

const RING_RADIUS = 18;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

function SpotlightCard({
  contest,
  index,
  bookmarked,
  onBookmark,
  isReminderSet,
  setReminder,
}) {
  const theme = getPlatformTheme(contest.platform);
  const { label, shortLabel, isLive, progress } = useCountdown(
    contest.startTime,
    contest.durationSeconds,
  );
  const cardRef = useRef(null);

  const date = new Date(contest.startTime);
  const dateLabel = date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const timeLabel = date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Subtle 3D tilt + spotlight-glow that follows the cursor.
  const handleMove = (event) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    el.style.setProperty("--ry", `${(px - 0.5) * 12}deg`);
    el.style.setProperty("--rx", `${(0.5 - py) * 10}deg`);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };
  const handleLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <article
      ref={cardRef}
      className={`spot-card ${isLive ? "is-live" : ""}`}
      style={{
        "--p-color": theme.color,
        "--p-glow": theme.glow,
        "--p-from": theme.gradientFrom,
        "--p-to": theme.gradientTo,
        "--stagger": `${index * 60}ms`,
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className="spot-icon-wash" aria-hidden="true">
        <theme.Icon />
      </div>

      <header className="spot-top">
        <span className="spot-chip">
          <theme.Icon className="spot-chip-icon" />
          {theme.label}
        </span>
        <button
          type="button"
          className={`spot-bookmark ${bookmarked ? "is-on" : ""}`}
          onClick={() => onBookmark(contest._id)}
          aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
        >
          <Bookmark size={14} fill={bookmarked ? "currentColor" : "none"} />
        </button>
      </header>

      <h3 className="spot-title">{contest.name}</h3>
      <p className="spot-date">
        {dateLabel} · {timeLabel}
      </p>

      <div className="spot-bottom">
        <div className="spot-ring">
          <svg viewBox="0 0 44 44">
            <circle
              cx="22"
              cy="22"
              r={RING_RADIUS}
              className="spot-ring-track"
            />
            <circle
              cx="22"
              cy="22"
              r={RING_RADIUS}
              className="spot-ring-progress"
              style={{
                strokeDasharray: RING_CIRCUMFERENCE,
                strokeDashoffset: RING_CIRCUMFERENCE * (1 - progress),
              }}
            />
          </svg>
          <span className="spot-ring-label">
            {isLive ? <Radio size={12} /> : shortLabel}
          </span>
        </div>

        <div className="spot-time">
          <span className="spot-time-value">{label}</span>
          <span className="spot-time-caption">
            {isLive ? "in progress" : "until start"}
          </span>
        </div>

        <div className="spot-actions">
          <button
            type="button"
            className={`spot-remind ${isReminderSet(contest._id) ? "is-set" : ""}`}
            onClick={() =>
              !isReminderSet(contest._id) && setReminder(contest._id)
            }
            aria-label="Set reminder"
          >
            {isReminderSet(contest._id) ? (
              <Check size={14} />
            ) : (
              <BellRing size={14} />
            )}
          </button>
          <a
            className="spot-open"
            href={contest.url}
            target="_blank"
            rel="noreferrer"
            aria-label="Open contest"
          >
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </article>
  );
}

function ContestSpotlight({
  contests,
  bookmarks,
  onBookmark,
  isReminderSet,
  setReminder,
}) {
  const trackRef = useRef(null);

  const scrollByAmount = (direction) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction * el.clientWidth * 0.85,
      behavior: "smooth",
    });
  };

  if (!contests.length) return null;

  return (
    <section className="spotlight-section">
      <div className="spotlight-heading">
        <div>
          <p className="eyebrow">Live feed · all platforms</p>
          <h2>Contest spotlight</h2>
          <p className="spotlight-subtitle">
            Scroll through what's next, themed by platform.
          </p>
        </div>
        <div className="spotlight-nav">
          <button
            type="button"
            onClick={() => scrollByAmount(-1)}
            aria-label="Scroll left"
          >
            <ChevronLeft size={17} />
          </button>
          <button
            type="button"
            onClick={() => scrollByAmount(1)}
            aria-label="Scroll right"
          >
            <ChevronRight size={17} />
          </button>
        </div>
      </div>

      <div className="spotlight-track" ref={trackRef}>
        {contests.map((contest, index) => (
          <SpotlightCard
            key={contest._id}
            contest={contest}
            index={index}
            bookmarked={bookmarks.includes(contest._id)}
            onBookmark={onBookmark}
            isReminderSet={isReminderSet}
            setReminder={setReminder}
          />
        ))}
      </div>
    </section>
  );
}

export default ContestSpotlight;
