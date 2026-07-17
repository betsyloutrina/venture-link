import "./landingpage.css";
import HeroImage from "../../assets/images/Chatgpt.png";

import AIIcon from "../../assets/icons/ai.png";
import FundingIcon from "../../assets/icons/funding.png";
import MentorIcon from "../../assets/icons/mentor.png";

export default function LandingPage() {
  return (
    <div className="landing">

      {/* ================= NAVBAR ================= */}

      <nav className="navbar">

        <div className="logo">
          <h2>VentureLink</h2>
        </div>

        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/">Features</a></li>
          <li><a href="/">About</a></li>
          <li><a href="/">Contact</a></li>
        </ul>

        <div className="nav-buttons">
          <button className="login-btn">Login</button>
          <button className="register-btn">Register</button>
        </div>

      </nav>

      {/* ================= HERO SECTION ================= */}

      <section className="hero">

        <div className="hero-left">

          <h1>
            Empowering Startups Through
            <span> Collaboration & Innovation</span>
          </h1>

          <p>
            VentureLink connects startup founders with experienced mentors
            and investors using AI-powered intelligent matching, helping
            innovative ideas become successful businesses.
          </p>

          <div className="hero-buttons">

            <button className="primary-btn">
              Get Started
            </button>

            <button className="secondary-btn">
              Learn More
            </button>

          </div>

        </div>

        <div className="hero-right">

          <img
            src={HeroImage}
            alt="VentureLink Illustration"
            className="hero-image"
          />

        </div>

      </section>

      {/* ================= FEATURES ================= */}

      <section className="features">

        <div className="section-title">

          <h2>Why Choose VentureLink?</h2>

          <div className="title-line"></div>

        </div>

        <div className="feature-grid">

          {/* AI Matching */}

          <div className="feature-card">

            <div className="feature-icon ai">
              <img src={AIIcon} alt="AI Matching" />
            </div>

            <div className="feature-content">

              <h3>AI Matching</h3>

              <p>
                Get intelligent mentor and investor recommendations
                tailored to your startup.
              </p>

            </div>

          </div>

          {/* Funding */}

          <div className="feature-card">

            <div className="feature-icon funding">
              <img src={FundingIcon} alt="Funding Opportunities" />
            </div>

            <div className="feature-content">

              <h3>Funding Opportunities</h3>

              <p>
                Connect with investors actively looking for
                innovative and promising startups.
              </p>

            </div>

          </div>

          {/* Mentorship */}

          <div className="feature-card">

            <div className="feature-icon mentor">
              <img src={MentorIcon} alt="Expert Mentorship" />
            </div>

            <div className="feature-content">

              <h3>Expert Mentorship</h3>

              <p>
                Learn from experienced founders and
                industry experts.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= FOOTER ================= */}

      <footer className="footer">

        <p>
          © 2026 VentureLink. All Rights Reserved.
        </p>

      </footer>

    </div>
  );
}