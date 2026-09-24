import {
  CalendarDays,
  ChevronRight,
  CircleUserRound,
  Code2,
  Coffee,
  Moon,
  Sun,
  Trophy,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const tabs = [
  { id: "upcoming", label: "Upcoming contests", icon: CalendarDays },
  { id: "leetcode", label: "LeetCode", icon: Code2 },
  { id: "codechef", label: "CodeChef", icon: Coffee },
  { id: "codeforces", label: "Codeforces", icon: Trophy },
];

function Sidebar({ activeTab, onTabChange, theme, onToggleTheme, user }) {
  const navigate = useNavigate();
  return (
    <aside className="app-sidebar">
      <div className="brand-lockup">
        <span className="brand-mark">
          <Code2 size={19} />
        </span>
        <span>Code Calendar</span>
      </div>
      <div className="sidebar-rule" />
      <p className="sidebar-label">Workspace</p>
      <nav className="sidebar-nav" aria-label="Contest views">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={`sidebar-tab ${activeTab === id ? "is-active" : ""}`}
            onClick={() => onTabChange(id)}
            aria-current={activeTab === id ? "page" : undefined}
            type="button"
          >
            <Icon size={17} />
            <span>{label}</span>
            {activeTab === id && (
              <ChevronRight className="tab-arrow" size={15} />
            )}
          </button>
        ))}
      </nav>
      <div className="sidebar-spacer" />
      <button
        className="theme-switch"
        onClick={onToggleTheme}
        aria-label="Toggle color theme"
        type="button"
      >
        {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
        <span>{theme === "dark" ? "Night mode" : "Day mode"}</span>
        <span className="theme-dot" />
      </button>
      <div className="profile-chip">
        <span className="avatar">
          <CircleUserRound
            size={37}
            onClick={() => {
              navigate("/profile");
            }}
          />
        </span>
        <span className="profile-copy">
          <strong>{user?.username || "Champa"}</strong>
          <small>Google account</small>
        </span>
      </div>
    </aside>
  );
}

export default Sidebar;
