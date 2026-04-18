import React from 'react';
import MainLayout from '../../components/layouts/MainLayout';


export default function MentorDashboard() {
  return (
    <MainLayout title="Mentor Hub" subtitle="Manage your sessions and reviews">
      {/* Mentor Specific Stats */}
      <section className="stats-grid">
        <div className="stat-card">
          <h3>Pending Reviews</h3>
          <div className="stat-value" style={{color: '#d97706'}}>⚠️ 4</div>
          <p className="stat-sub">Student projects waiting</p>
        </div>
        <div className="stat-card">
          <h3>Upcoming Sessions</h3>
          <div className="stat-value">📅 3</div>
          <p className="stat-sub">Scheduled for today</p>
        </div>
        <div className="stat-card">
          <h3>Total Earnings</h3>
          <div className="stat-value">$1,250</div>
          <p className="stat-sub">This month</p>
        </div>
      </section>

      <div className="content-split">
        {/* Verification Queue */}
        <div className="content-left">
          <section className="continue-learning">
            <h2>Verification Requests</h2>
            <p>Review student projects to issue skill badges.</p>
            
            <div className="course-card">
              <div className="course-header">
                <h4>Project: E-Commerce API</h4>
                <span className="badge-available">Pending</span>
              </div>
              <p>Submitted by: <strong>Alex Johnson</strong></p>
              <p className="text-sm">Skill: Backend Development (Node.js)</p>
              <div className="action-row" style={{marginTop: '15px', display: 'flex', gap: '10px'}}>
                <button className="btn-continue">Review Code</button>
                <button className="btn-view-profile">Reject</button>
              </div>
            </div>
          </section>
        </div>

        {/* Schedule */}
        <div className="content-right">
          <section className="sidebar-widget">
            <h3>Today's Schedule</h3>
            <div className="session-card">
              <p className="session-time">2:00 PM - 2:45 PM</p>
              <h4>Mock Interview</h4>
              <p className="text-sm">with Emily Blunt</p>
              <button className="btn-join">Join Meeting</button>
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}