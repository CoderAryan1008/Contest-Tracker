import {
  ArrowLeft,
  CalendarDays,
  Code2,
  LogOut,
  Mail,
  UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/authentication/hooks/useAuth";

function UserProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="app-shell profile-page">
        <main className="profile-main">
          <div className="profile-loading">Loading profile...</div>
        </main>
      </div>
    );
  }

  const displayName = user?.username || "Contest Participant";

  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="app-shell profile-page">
      <main className="profile-main">
        <button
          type="button"
          className="profile-back-button"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={16} />
          <span>Back to contests</span>
        </button>

        {/* 🧾 Profile Card */}
        <section className="profile-panel" aria-labelledby="profile-title">
          <div className="profile-panel-accent" aria-hidden="true" />

          {/* 👤 Identity */}
          <div className="profile-identity">
            {user?.picture ? (
              <img
                className="profile-avatar"
                src={user.picture}
                alt={`${displayName} profile`}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.target.src = "/default-avatar.png";
                }}
              />
            ) : (
              <span className="profile-avatar profile-avatar-fallback">
                {initials}
              </span>
            )}

            <div>
              <p className="eyebrow">Account overview</p>

              <h1 id="profile-title">{displayName}</h1>

              <p className="profile-status">
                <span className="profile-status-dot" />
                {user?.email ? "Google account connected" : "Guest user"}
              </p>
            </div>
          </div>

          {/* 📊 Details */}
          <div className="profile-details">
            <div className="profile-detail">
              <span className="profile-detail-icon">
                <Mail size={16} />
              </span>
              <span>
                <span className="profile-detail-label">Email</span>
                <strong>{user?.email || "Not available"}</strong>
              </span>
            </div>

            <div className="profile-detail">
              <span className="profile-detail-icon">
                <Code2 size={16} />
              </span>
              <span>
                <span className="profile-detail-label">Codeforces ID</span>
                <strong>{user?.cfHandle || "Not connected"}</strong>
              </span>
            </div>

            <div className="profile-detail">
              <span className="profile-detail-icon">
                <CalendarDays size={16} />
              </span>
              <span>
                <span className="profile-detail-label">Calendar access</span>
                <strong>
                  {user?.calendarConnected ? "Connected" : "Not connected"}
                </strong>
              </span>
            </div>

            <div className="profile-detail">
              <span className="profile-detail-icon">
                <UserRound size={16} />
              </span>
              <span>
                <span className="profile-detail-label">Profile type</span>
                <strong>Contest participant</strong>
              </span>
            </div>
          </div>
          <div className="logout-btn">
            <button
              type="button"
              className="profile-logout-button"
              onClick={async () => {
                await logout();
                // navigate("/login", { replace: true });
              }}
            >
              <LogOut className="btn-icon" size={16} />
              Logout
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default UserProfile;
