import React, { useState } from 'react';
import { 
  FiChevronDown, 
  FiCompass, 
  FiUsers, 
  FiHome, 
  FiSun, 
  FiUserCheck, 
  FiLogOut, 
  FiPlus, 
  FiThumbsUp, 
  FiTrash2,
  FiArrowLeft
} from 'react-icons/fi';
import heroBg from '../../assets/images/bg.png';
import './dashboard.css';

export default function Dashboard({ onLogout }) {
  const [currentView, setCurrentView] = useState('home');

  // Student Ideas State
  const [ideas, setIdeas] = useState([
    {
      id: 1,
      title: 'EcoPack - Biodegradable Campus Packaging',
      author: 'Alex Chen',
      category: 'Sustainability',
      description: 'Replacing single-use plastics across university cafeterias with mushroom-based mycelium packaging.',
      votes: 24,
    },
    {
      id: 2,
      title: 'StudyBuddy AI Matching',
      author: 'Sarah Jenkins',
      category: 'EdTech',
      description: 'An algorithm that pairs students based on complementary skill sets for group projects and startup teams.',
      votes: 42,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newAuthor, setNewAuthor] = useState('');

  // Super Admin Mentor Management State
  const [mentors, setMentors] = useState([
    { 
      id: 1, 
      name: 'Dr. Robert Vance', 
      expertise: 'Venture Capital & SaaS', 
      email: 'robert.vance@venturelink.edu'
    },
    { 
      id: 2, 
      name: 'Elena Rostova', 
      expertise: 'AI Ethics & Product Strategy', 
      email: 'elena.rostova@venturelink.edu'
    }
  ]);
  const [mentorName, setMentorName] = useState('');
  const [mentorEmail, setMentorEmail] = useState('');
  const [mentorExpertise, setMentorExpertise] = useState('');

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!newTitle || !newDescription || !newAuthor) return;

    const newIdeaObj = {
      id: Date.now(),
      title: newTitle,
      author: newAuthor,
      category: newCategory || 'General Innovation',
      description: newDescription,
      votes: 1,
    };

    setIdeas([newIdeaObj, ...ideas]);
    setNewTitle('');
    setNewCategory('');
    setNewDescription('');
    setNewAuthor('');
    setShowForm(false);
  };

  const handleVote = (id) => {
    setIdeas(ideas.map(idea => idea.id === id ? { ...idea, votes: idea.votes + 1 } : idea));
  };

  const handleAddMentor = (e) => {
    e.preventDefault();
    if (!mentorName || !mentorEmail || !mentorExpertise) return;

    const newMentorObj = {
      id: Date.now(),
      name: mentorName,
      email: mentorEmail,
      expertise: mentorExpertise,
    };

    setMentors([newMentorObj, ...mentors]);
    setMentorName('');
    setMentorEmail('');
    setMentorExpertise('');
  };

  const handleDeleteMentor = (id) => {
    setMentors(mentors.filter(mentor => mentor.id !== id));
  };

  const handleLogoutClick = () => {
    if (typeof onLogout === 'function') {
      onLogout();
    } else {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="dashboard-container">
      {/* Top Navigation Bar */}
      <nav className="dashboard-nav">
        <div className="nav-brand">Venture<span>Link</span></div>
        <div className="nav-links">
          <button 
            onClick={() => setCurrentView('home')} 
            className={`nav-item-btn ${currentView === 'home' ? 'active' : ''}`}
          >
            <FiHome /> Home
          </button>
          <button 
            onClick={() => setCurrentView('student-ideas')} 
            className={`nav-item-btn ${currentView === 'student-ideas' ? 'active' : ''}`}
          >
            <FiSun /> Student Idea
          </button>
          <button 
            onClick={() => setCurrentView('mentor')} 
            className={`nav-item-btn ${currentView === 'mentor' ? 'active' : ''}`}
          >
            <FiUserCheck /> Mentor
          </button>
          <button className="nav-logout-btn" onClick={handleLogoutClick} type="button">
            <FiLogOut /> Logout
          </button>
        </div>
      </nav>

      {/* Home View */}
      {currentView === 'home' && (
        <>
          <div 
            className="welcome-hero-banner"
            style={{
              background: `linear-gradient(180deg, rgba(11, 15, 23, 0.75) 0%, rgba(11, 15, 23, 0.92) 100%), url(${heroBg}) center/cover no-repeat`
            }}
          >
            <h1 className="welcome-title">Welcome to <span>VentureLink</span></h1>
            <p className="welcome-description">
              Your premier ecosystem connecting student founders, campus innovators, and university researchers 
              with leading venture mentors, investors, and industry advisors. Explore the platform features below to get started.
            </p>

            <div className="swipe-indicator">
              <span>Scroll or Swipe for Features</span>
              <FiChevronDown />
            </div>
          </div>

          <div className="features-section">
            <h2 className="section-heading">Platform Features</h2>
            <div className="features-grid">
              <div 
                className="feature-card" 
                onClick={() => setCurrentView('student-ideas')}
              >
                <div className="feature-icon"><FiCompass /></div>
                <h3>Discover Startups</h3>
                <p>Browse groundbreaking campus innovations and university research projects looking for collaborators.</p>
              </div>
              <div 
                className="feature-card" 
                onClick={() => setCurrentView('mentor')}
              >
                <div className="feature-icon"><FiUsers /></div>
                <h3>Expert Mentorship</h3>
                <p>Connect directly with industry advisors, seasoned entrepreneurs, and potential co-founders.</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Student Ideas View */}
      {currentView === 'student-ideas' && (
        <>
          <div className="ideas-header-section">
            <div>
              <h1 className="section-heading-main">Student Innovation Hub</h1>
              <p className="section-subtext">Discover groundbreaking ideas from campus creators or pitch your own venture.</p>
            </div>
            <button className="primary-action-btn" onClick={() => setShowForm(!showForm)}>
              <FiPlus /> {showForm ? 'Cancel' : 'Upload New Idea'}
            </button>
          </div>

          {showForm && (
            <form className="idea-upload-form" onSubmit={handleUploadSubmit}>
              <h3>Submit Your Startup Idea</h3>
              <div className="form-group">
                <label>Project Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. SmartCampus Energy Tracker" 
                  value={newTitle} 
                  onChange={(e) => setNewTitle(e.target.value)} 
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Jane Doe" 
                    value={newAuthor} 
                    onChange={(e) => setNewAuthor(e.target.value)} 
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <input 
                    type="text" 
                    placeholder="e.g. FinTech, AI, Sustainability" 
                    value={newCategory} 
                    onChange={(e) => setNewCategory(e.target.value)} 
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  rows="4" 
                  placeholder="Explain the problem you're solving and your solution..." 
                  value={newDescription} 
                  onChange={(e) => setNewDescription(e.target.value)} 
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-idea-btn">Publish Idea</button>
            </form>
          )}

          <div className="ideas-grid">
            {ideas.map((idea) => (
              <div className="idea-card" key={idea.id}>
                <div className="idea-card-header">
                  <span className="idea-category">{idea.category}</span>
                  <button className="vote-btn" onClick={() => handleVote(idea.id)}>
                    <FiThumbsUp /> <span>{idea.votes}</span>
                  </button>
                </div>
                <h3 className="idea-title">{idea.title}</h3>
                <p className="idea-author">By {idea.author}</p>
                <p className="idea-description">{idea.description}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Super Admin Mentor View */}
      {currentView === 'mentor' && (
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem', width: '100%', boxSizing: 'border-box' }}>
          <button className="back-to-home-link" onClick={() => setCurrentView('home')}>
            <FiArrowLeft /> Back to Home
          </button>

          <div className="auth-card-style">
            <h1 className="auth-card-title">Get Started</h1>
            <p className="auth-card-subtitle">Register a new mentor profile and assign platform access credentials.</p>

            <form onSubmit={handleAddMentor}>
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  value={mentorName} 
                  onChange={(e) => setMentorName(e.target.value)} 
                  required
                />
              </div>

              <div className="form-group">
                <label>Corporate Email</label>
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  value={mentorEmail} 
                  onChange={(e) => setMentorEmail(e.target.value)} 
                  required
                />
              </div>

              <div className="form-group">
                <label>Expertise / Domain</label>
                <input 
                  type="text" 
                  placeholder="e.g. Venture Capital & SaaS" 
                  value={mentorExpertise} 
                  onChange={(e) => setMentorExpertise(e.target.value)} 
                  required
                />
              </div>

              <button type="submit" className="auth-submit-btn">Create Account</button>
            </form>
          </div>

          <div style={{ marginTop: '3rem', width: '100%' }}>
            <h2 className="section-heading" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>Active Mentors Management</h2>
            <div className="admin-mentor-grid">
              {mentors.map((mentor) => {
                return (
                  <div className="feature-card" key={mentor.id} style={{ width: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'default' }}>
                    <div>
                      <div className="mentor-card-top">
                        <div className="feature-icon"><FiUsers /></div>
                        <button className="delete-mentor-icon-btn" onClick={() => handleDeleteMentor(mentor.id)} title="Revoke Access">
                          <FiTrash2 />
                        </button>
                      </div>
                      <h3>{mentor.name}</h3>
                      <p className="mentor-email-text">{mentor.email}</p>
                      <p style={{ marginBottom: '1rem' }}>{mentor.expertise}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}