import React, { useState } from 'react';
import './landingpage.css';
import chatgptBg from '../../assets/images/chatgpt.png';
import { FiCpu, FiTrendingUp, FiAward, FiMail, FiPhone, FiMapPin, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';

const LandingPage = ({ onLoginSuccess }) => {
    const [currentView, setCurrentView] = useState('landing'); // 'landing', 'login', or 'register'
    const [successMessage, setSuccessMessage] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    // Handle Login Submit -> Triggers the App level view switcher to dashboard
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (onLoginSuccess) {
            onLoginSuccess();
        }
    };

    // Handle Registration Submit -> Now redirects to Login view automatically
    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        setSuccessMessage('Registration successful! Please sign in to your new account.');
        setCurrentView('login');
        
        // Automatically hide the message after 5 seconds
        setTimeout(() => {
            setSuccessMessage('');
        }, 5000);
    };

    // ===========================
    // Login Page View
    // ===========================
    if (currentView === 'login') {
        return (
            <div className="auth-page-container">
                {/* Success Popup Notification Bar */}
                {successMessage && (
                    <div className="success-popup-banner">
                        <FiCheckCircle className="popup-icon" />
                        <span>{successMessage}</span>
                    </div>
                )}
                <div className="auth-card glass-panel">
                    <button className="back-link-btn" onClick={() => setCurrentView('landing')}>
                        <FiArrowLeft /> Back to Home
                    </button>
                    <h2>Welcome Back</h2>
                    <p>Sign in to your VentureLink executive account.</p>
                    <form className="auth-form" onSubmit={handleLoginSubmit}>
                        <div className="input-group">
                            <label>Corporate Email</label>
                            <input 
                                type="email" 
                                placeholder="name@company.com" 
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                                required 
                            />
                        </div>
                        <div className="input-group">
                            <label>Password</label>
                            <input 
                                type="password" 
                                placeholder="••••••••" 
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                required 
                            />
                        </div>
                        <button type="submit" className="primary-btn premium-depth full-width">Sign In</button>
                    </form>
                </div>
            </div>
        );
    }

    // ===========================
    // Register Page View
    // ===========================
    if (currentView === 'register') {
        return (
            <div className="auth-page-container">
                <div className="auth-card glass-panel">
                    <button className="back-link-btn" onClick={() => setCurrentView('landing')}>
                        <FiArrowLeft /> Back to Home
                    </button>
                    <h2>Get Started</h2>
                    <p>Create your enterprise profile and connect with investors.</p>
                    <form className="auth-form" onSubmit={handleRegisterSubmit}>
                        <div className="input-group">
                            <label>Full Name</label>
                            <input type="text" placeholder="John Doe" required />
                        </div>
                        <div className="input-group">
                            <label>Corporate Email</label>
                            <input type="email" placeholder="name@company.com" required />
                        </div>
                        <div className="input-group">
                            <label>Password</label>
                            <input type="password" placeholder="••••••••" required />
                        </div>
                        <button type="submit" className="primary-btn premium-depth full-width">Create Account</button>
                    </form>
                </div>
            </div>
        );
    }

    // ===========================
    // Main Landing Page View
    // ===========================
    return (
        <div className="landing-page">
            {/* Success Popup Notification Bar */}
            {successMessage && (
                <div className="success-popup-banner">
                    <FiCheckCircle className="popup-icon" />
                    <span>{successMessage}</span>
                </div>
            )}

            {/* Navbar */}
            <nav className="navbar light-premium">
                <div className="logo">
                    <h2>Venture<span>Link</span></h2>
                </div>
                <ul className="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#features">Features</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
                <div className="nav-buttons">
                    <button className="login-btn soft-outline" onClick={() => setCurrentView('login')}>
                        Login
                    </button>
                    <button className="register-btn standard-pill" onClick={() => setCurrentView('register')}>
                        Register
                    </button>
                </div>
            </nav>

            {/* Hero Section (Home) */}
            <section 
                className="refined-light" 
                id="home"
                style={{
                    backgroundImage: `linear-gradient(90deg, rgba(10, 15, 25, 0.92) 0%, rgba(10, 15, 25, 0.75) 50%, rgba(10, 15, 25, 0.5) 100%), url(${chatgptBg})`
                }}
            >
                <div className="hero-left">
                    <div className="hero-tag">Empowering Growth</div>
                    <h1>Empowering Startups Through <span>Collaboration & Innovation</span></h1>
                    <p className="hero-description">
                        VentureLink connects startups with mentors, investors and talented collaborators to build the next generation of successful businesses.
                    </p>
                    <div className="hero-buttons">
                        <button className="primary-btn premium-depth" onClick={() => setCurrentView('register')}>
                            Get Started
                        </button>
                        <button className="secondary-btn" onClick={() => {
                            document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
                        }}>
                            Learn More
                        </button>
                    </div>
                </div>

                <div className="hero-right viz-stage">
                    <div className="stage-glow"></div>
                </div>
            </section>

            {/* About Section */}
            <section className="about-section" id="about">
                <div className="about-container">
                    <div className="section-title">
                        <h2>About VentureLink</h2>
                        <p>Bridging the gap between visionary founders, global mentors, and elite investors.</p>
                        <div className="title-line"></div>
                    </div>
                    <div className="about-content-grid">
                        <div className="about-text-box">
                            <h3>Our Mission</h3>
                            <p>
                                We believe that groundbreaking ideas deserve frictionless paths to success. VentureLink leverages advanced AI matchmaking engines to analyze startup milestones, funding goals, and domain expertise to forge powerful, high-impact business relationships.
                            </p>
                        </div>
                        <div className="about-text-box">
                            <h3>Why Choose Us</h3>
                            <p>
                                Unlike traditional networking platforms, our ecosystem is curated for quality and speed. Whether you are seeking your next seed round or looking to offer expert guidance, VentureLink provides a secure, structured corporate environment designed for rapid scaling.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features refined-cards" id="features">
                <div className="section-title">
                    <h2>Built for Modern Innovation</h2>
                    <p>Everything you need to scale your startup from concept to industry leader.</p>
                    <div className="title-line"></div>
                </div>
                <div className="feature-grid">
                    <div className="tactile-card">
                        <div className="feature-icon ai">
                            <FiCpu />
                        </div>
                        <div className="feature-content">
                            <h3>Matching Pulses</h3>
                            <p>AI-driven algorithms connect you with the right strategic partners at the exact right moment.</p>
                        </div>
                    </div>
                    <div className="tactile-card">
                        <div className="feature-icon funding">
                            <FiTrendingUp />
                        </div>
                        <div className="feature-content">
                            <h3>Growth Capital</h3>
                            <p>Direct access to verified venture capitalists and angel investors looking for high-impact ideas.</p>
                        </div>
                    </div>
                    <div className="tactile-card">
                        <div className="feature-icon mentor">
                            <FiAward />
                        </div>
                        <div className="feature-content">
                            <h3>Expert Mentorship</h3>
                            <p>Learn from seasoned industry pioneers who have successfully scaled global enterprises.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="contact-section" id="contact">
                <div className="section-title">
                    <h2>Get in Touch</h2>
                    <p>Ready to accelerate your growth? Connect with our executive team today.</p>
                    <div className="title-line"></div>
                </div>
                <div className="contact-grid">
                    <div className="tactile-card contact-card">
                        <div className="feature-icon"><FiMail /></div>
                        <h3>Email Us</h3>
                        <p>support@venturelink.io</p>
                    </div>
                    <div className="tactile-card contact-card">
                        <div className="feature-icon"><FiPhone /></div>
                        <h3>Call Executive Desk</h3>
                        <p>+1 (800) 555-VENTURE</p>
                    </div>
                    <div className="tactile-card contact-card">
                        <div className="feature-icon"><FiMapPin /></div>
                        <h3>Global Headquarters</h3>
                        <p>100 Financial Plaza, Suite 400, New York, NY</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;