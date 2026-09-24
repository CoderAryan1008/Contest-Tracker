import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  LockKeyhole,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const policySections = [
  {
    number: "01",
    title: "Information We Collect",
    content: (
      <>
        <p>When you sign in using Google OAuth, we may collect:</p>
        <ul>
          <li>Your name</li>
          <li>Your email address</li>
          <li>Your profile picture</li>
        </ul>
        <p>We do not collect or store your Google password.</p>
      </>
    ),
  },
  {
    number: "02",
    title: "How We Use Your Information",
    content: (
      <>
        <p>We use your information to:</p>
        <ul>
          <li>Authenticate your account</li>
          <li>Personalize your experience</li>
          <li>Provide core features such as contest reminders</li>
        </ul>
      </>
    ),
  },
  {
    number: "03",
    title: "Data Sharing",
    content: (
      <p>We do not sell, trade, or rent your personal information to others.</p>
    ),
  },
  {
    number: "04",
    title: "Data Security",
    content: (
      <p>
        We take reasonable measures to protect your data, but no method of
        transmission over the internet is 100% secure.
      </p>
    ),
  },
  {
    number: "05",
    title: "Third-Party Services",
    content: (
      <p>
        We use Google OAuth for authentication. By using our app, you agree to
        Google&apos;s Privacy Policy.
      </p>
    ),
  },
  {
    number: "06",
    title: "Your Rights",
    content: <p>You can request deletion of your data by contacting us.</p>,
  },
  {
    number: "07",
    title: "Changes to This Policy",
    content: (
      <p>
        We may update this policy from time to time. Updates will be posted on
        this page.
      </p>
    ),
  },
  {
    number: "08",
    title: "Contact Us",
    content: <p>If you have any questions, contact us at: [your email]</p>,
  },
];

function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="privacy-page">
      <main className="privacy-main" aria-labelledby="privacy-title">
        <button
          className="privacy-back-button"
          onClick={() => navigate(-1)}
          type="button"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          <span>Back to tracker</span>
        </button>

        <article className="privacy-panel">
          <div className="privacy-panel-accent" />
          <header className="privacy-header">
            <div className="privacy-kicker">
              <LockKeyhole size={14} aria-hidden="true" />
              <span>Code Calendar / Trust center</span>
            </div>
            <h1 id="privacy-title">Privacy Policy</h1>
            <p className="privacy-intro">
              A clear look at how Contest Tracker handles the information that
              keeps your contest reminders running.
            </p>
            <div className="privacy-meta" aria-label="Policy details">
              <span>
                <CalendarDays size={15} aria-hidden="true" />
                Effective September 24, 2026
              </span>
              <span>
                <CheckCircle2 size={15} aria-hidden="true" />
                Plain-language summary
              </span>
            </div>
          </header>

          <div className="privacy-sections">
            {policySections.map(({ number, title, content }) => (
              <section className="privacy-section" key={number}>
                <div className="privacy-section-number">{number}</div>
                <div>
                  <h2>{title}</h2>
                  <div className="privacy-section-copy">{content}</div>
                </div>
              </section>
            ))}
          </div>

          <footer className="privacy-footer">
            By using Contest Tracker, you agree to this Privacy Policy.
          </footer>
        </article>
      </main>
    </div>
  );
}

export default PrivacyPolicy;
