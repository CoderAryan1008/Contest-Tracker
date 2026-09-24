import { ArrowLeft, CalendarDays, CheckCircle2, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const termsSections = [
  {
    number: "01",
    title: "Use of Service",
    content: <p>You agree to use the application only for lawful purposes.</p>,
  },
  {
    number: "02",
    title: "User Accounts",
    content: (
      <p>
        You are responsible for maintaining the confidentiality of your account.
      </p>
    ),
  },
  {
    number: "03",
    title: "Service Availability",
    content: <p>We do not guarantee uninterrupted or error-free service.</p>,
  },
  {
    number: "04",
    title: "Limitation of Liability",
    content: (
      <p>
        We are not responsible for any losses or damages resulting from the use
        of this application.
      </p>
    ),
  },
  {
    number: "05",
    title: "Changes to the Service",
    content: (
      <p>
        We may modify or discontinue the service at any time without notice.
      </p>
    ),
  },
  {
    number: "06",
    title: "Termination",
    content: (
      <p>
        We reserve the right to terminate access if users violate these terms.
      </p>
    ),
  },
  {
    number: "07",
    title: "Changes to Terms",
    content: (
      <p>
        We may update these terms at any time. Continued use means acceptance of
        the updated terms.
      </p>
    ),
  },
  {
    number: "08",
    title: "Contact",
    content: <p>For any questions, contact us at: [anonyuser1008@gmail.com]</p>,
  },
];

function TermsOfServices() {
  const navigate = useNavigate();

  return (
    <div className="privacy-page">
      <main className="privacy-main" aria-labelledby="terms-title">
        <button
          className="privacy-back-button"
          onClick={() => navigate("/login", { replace: true })}
          type="button"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          <span>Back to tracker</span>
        </button>

        <article className="privacy-panel">
          <div className="privacy-panel-accent" />
          <header className="privacy-header">
            <div className="privacy-kicker">
              <FileText size={14} aria-hidden="true" />
              <span>Code Calendar / Service terms</span>
            </div>
            <h1 id="terms-title">Terms of Service</h1>
            <p className="privacy-intro">
              The rules and responsibilities that keep Contest Tracker useful
              for every competitor.
            </p>
            <div className="privacy-meta" aria-label="Terms details">
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
            {termsSections.map(({ number, title, content }) => (
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
            By using Contest Tracker, you agree to these Terms of Service.
          </footer>
        </article>
      </main>
    </div>
  );
}

export default TermsOfServices;
