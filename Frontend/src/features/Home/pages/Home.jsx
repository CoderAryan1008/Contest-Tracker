import { Moon, Sun } from "lucide-react";
import { useContest } from "../hooks/useContest";
import { useTheme } from "@/features/themes/theme.provider";
import { useAuth } from "@/features/authentication/hooks/useAuth";
import Sidebar from "@/components/Sidebar";
import { ContestCard } from "@/components/ContestCard";
import { platformThemes as platformMeta } from "@/lib/platformTheme";
import { useEffect, useState } from "react";

function Home() {
  const {
    contests,
    loading,
    error,
    isReminderSet,
    setReminder,
    removeReminder,
  } = useContest();
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [activeTab, setActiveTab] = useState("upcoming");
  const [search, setSearch] = useState("");

  const [bookmarks, setBookmarks] = useState(() =>
    JSON.parse(localStorage.getItem("contest-bookmarks") || "[]"),
  );

  // persist bookmarks
  useEffect(() => {
    localStorage.setItem("contest-bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  // toggle bookmark
  const toggleBookmark = (id) => {
    setBookmarks((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  // search filter
  const visible =
    search.trim() === ""
      ? contests
      : contests.filter((contest) =>
          contest.name.toLowerCase().includes(search.toLowerCase()),
        );

  // today's contests
  const today = new Date();
  const todaysContests = visible.filter((contest) => {
    const d = new Date(contest.startTime);
    return (
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
    );
  });

  // Saare bookmarked contests
  const bookmarked = visible.filter((contest) =>
    bookmarks.includes(contest._id),
  );

  // platform-specific contests
  const platformContests = visible.filter(
    (contest) => contest.platform === activeTab,
  );

  const contestQuotes = [
    "⚔️ Arena awaits—bring your best logic and dominate!",
    "🔥 No excuses, just ACs. Time to level up!",
    "🧠 Mind sharp, timer ticking—go crush this round!",
    "⚡ Rating points are waiting. Enter the queue!",
    "🎯 Lock in, focus, and leave no test case unsolved!",
    "🏆 Grandmasters are built in rounds like this. Step up!",
    "🚀 Transform your practice into peak performance!",
    "💥 Show the leaderboard what real grit looks like!",
  ];
  return (
    <div className="app-shell">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        theme={theme}
        onToggleTheme={toggleTheme}
        user={user}
      />

      <main className="main-content">
        {/* HEADER */}
        <header className="page-header">
          <div>
            <p className="eyebrow">
              {new Date().toLocaleDateString(undefined, {
                weekday: "long",
                month: "short",
                day: "numeric",
              })}
            </p>

            <h1>
              {activeTab === "upcoming"
                ? "Contest Reminder"
                : platformMeta[activeTab]?.label}
            </h1>

            <p className="header-subtitle">
              <b>
                {
                  contestQuotes[
                    Math.floor(Math.random() * contestQuotes.length)
                  ]
                }
              </b>
            </p>
          </div>

          <div className="header-actions">
            <button
              className="icon-button"
              onClick={toggleTheme}
              aria-label="Toggle color theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
              placeholder="Search contests"
            />
          </div>
        </header>

        {error && <div className="state-message is-error">{error}</div>}
        {loading && <div className="state-message">Loading contests...</div>}

        {!loading && !error && (
          <>
            {activeTab === "upcoming" && (
              <>
                {/* BOOKMARKS */}
                <section className="section-block">
                  <h2>⭐ Bookmarked ({bookmarked.length})</h2>

                  {bookmarked.length ? (
                    <div className="contest-track">
                      {bookmarked.map((contest, index) => (
                        <ContestCard
                          key={contest._id}
                          contest={contest}
                          index={index}
                          bookmarked
                          onBookmark={toggleBookmark}
                          isReminderSet={isReminderSet}
                          setReminder={setReminder}
                          removeReminder={removeReminder} //Abb isse hum reminder ko remove bhi kar sakenge
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="empty-watchlist">No bookmarks yet</p>
                  )}
                </section>

                {/* TODAY */}
                <section className="section-block">
                  <h2>🔥 Happening Today ({todaysContests.length})</h2>

                  {todaysContests.length ? (
                    <div className="contest-track">
                      {todaysContests.map((contest, index) => (
                        <ContestCard
                          key={contest._id}
                          contest={contest}
                          index={index}
                          bookmarked={bookmarks.includes(contest._id)}
                          onBookmark={toggleBookmark}
                          isReminderSet={isReminderSet}
                          setReminder={setReminder}
                          removeReminder={removeReminder}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="empty-watchlist">No contests today 🎉</p>
                  )}
                </section>
              </>
            )}

            {activeTab !== "upcoming" && (
              <section className="section-block">
                <h2>
                  {platformMeta[activeTab]?.label} Contests (
                  {platformContests.length})
                </h2>

                {platformContests.length ? (
                  <div className="contest-track">
                    {platformContests.map((contest, index) => (
                      <ContestCard
                        key={contest._id}
                        contest={contest}
                        index={index}
                        bookmarked={bookmarks.includes(contest._id)}
                        onBookmark={toggleBookmark}
                        isReminderSet={isReminderSet}
                        setReminder={setReminder}
                        removeReminder={removeReminder}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="empty-watchlist">No contests found</p>
                )}
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default Home;
