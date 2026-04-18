import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  ChartNoAxesColumn,
  ChevronLeft,
  ChevronRight,
  Flame,
} from 'lucide-react';
import { userService, UserRoadmapSummary } from '../../services/user.service';
import '../../styles/userDashboard.css';

const COURSES_PER_PAGE = 3;

export default function LearnerDashboard() {
  const [roadmaps, setRoadmaps] = useState<UserRoadmapSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const data = await userService.getMyRoadmaps();
        if (Array.isArray(data)) {
          const sorted = [...data].sort(
            (a, b) => (b.progressPercent || 0) - (a.progressPercent || 0)
          );
          setRoadmaps(sorted);
        } else {
          setRoadmaps([]);
        }
      } catch (error) {
        console.error("Failed to load dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoadmaps();
  }, []);

  const safeRoadmaps = useMemo(() => roadmaps || [], [roadmaps]);

  const totalProgress =
    safeRoadmaps.length > 0
      ? Math.round(safeRoadmaps.reduce((acc, r) => acc + (r.progressPercent || 0), 0) / safeRoadmaps.length)
      : 0;

  const totalCompletedNodes = safeRoadmaps.reduce((acc, r) => acc + (r.completedNodes || 0), 0);
  const totalNodesAllMaps = safeRoadmaps.reduce((acc, r) => acc + (r.totalNodes || 0), 0);

  const totalPages = Math.max(1, Math.ceil(safeRoadmaps.length / COURSES_PER_PAGE));

  const paginatedRoadmaps = useMemo(() => {
    const startIndex = (currentPage - 1) * COURSES_PER_PAGE;
    return safeRoadmaps.slice(startIndex, startIndex + COURSES_PER_PAGE);
  }, [currentPage, safeRoadmaps]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const getStatusLabel = (progressPercent: number) => {
    if (progressPercent >= 100) return 'Completed';
    if (progressPercent > 0) return 'In Progress';
    return 'Available';
  };

  if (loading) {
    return <div className="dashboard-loading">Loading dashboard...</div>;
  }

  return (
    <div className="learner-dashboard-container">
      <div className="dashboard-heading">
        <h1>Welcome back! 👋</h1>
        <p>Continue your learning journey</p>
      </div>

      <section className="stats-row">
        <div className="learner-stat-card">
          <h3>Roadmap Progress</h3>
          <div className="stat-main">
            <span className="stat-icon stat-progress">
              <ChartNoAxesColumn size={18} />
            </span>
            <span className="learner-stat-value">{totalProgress}%</span>
          </div>
          <div className="progress-mini-bar">
            <div className="progress-mini-fill" style={{ width: `${totalProgress}%` }} />
          </div>
          <p className="learner-stat-sub">
            {totalCompletedNodes} of {totalNodesAllMaps} skills verified
          </p>
        </div>

        <div className="learner-stat-card">
          <h3>Verified Skills</h3>
          <div className="stat-main">
            <span className="stat-icon stat-verified">
              <BadgeCheck size={18} />
            </span>
            <span className="learner-stat-value">{totalCompletedNodes}</span>
          </div>
          <p className="learner-stat-sub">
            {Math.max(0, totalCompletedNodes - 2)} more than last month
          </p>
        </div>

        <div className="learner-stat-card">
          <h3>Learning Streak</h3>
          <div className="stat-main">
            <span className="stat-icon stat-streak">
              <Flame size={18} />
            </span>
            <span className="learner-stat-value">12</span>
          </div>
          <p className="learner-stat-sub">days in a row</p>
        </div>

        <div className="learner-stat-card">
          <h3>Mentorship Hours</h3>
          <div className="stat-main">
            <span className="stat-icon stat-mentorship">
              <CalendarClock size={18} />
            </span>
            <span className="learner-stat-value">8</span>
          </div>
          <p className="learner-stat-sub">hours this month</p>
        </div>
      </section>

      <div className="content-split">
        <div className="content-left">
          <div className="dashboard-panel">
            <h2 className="section-header">Continue Learning</h2>
            <span className="section-sub">Pick up where you left off</span>

            {safeRoadmaps.length === 0 ? (
              <div className="roadmap-card empty-state">
                <p>No active courses. Start one today!</p>
                <button onClick={() => navigate('/dashboard/explore')} className="btn-continue">Explore</button>
              </div>
            ) : (
              <>
                {paginatedRoadmaps.map((roadmap) => (
                  <div key={roadmap.id} className="roadmap-card">
                    <div className="roadmap-header">
                      <div className="roadmap-info">
                        <h4>{roadmap.title}</h4>
                        <p className="roadmap-desc">Master the fundamentals of {roadmap.title}</p>
                        {roadmap.progressPercent <= 0 && (
                          <p className="roadmap-prereq">Prerequisites: JavaScript Core, CSS Fundamentals</p>
                        )}
                      </div>
                      <span
                        className={`status-badge ${
                          roadmap.progressPercent >= 100
                            ? 'completed'
                            : roadmap.progressPercent > 0
                              ? 'in-progress'
                              : 'available'
                        }`}
                      >
                        {getStatusLabel(roadmap.progressPercent || 0)}
                      </span>
                    </div>

                    {roadmap.progressPercent > 0 ? (
                      <div className="roadmap-footer roadmap-footer-progress">
                        <div className="progress-inline">
                          <div className="progress-track">
                            <div
                              className="progress-bar-fill"
                              style={{ width: `${roadmap.progressPercent}%` }}
                            />
                          </div>
                          <span className="progress-text">{roadmap.progressPercent}% complete</span>
                        </div>

                        <button
                          className="btn-continue"
                          onClick={() =>
                            navigate(`/dashboard/roadmap/${roadmap.id}`, {
                              state: { roadmapTitle: roadmap.title },
                            })
                          }
                        >
                          Continue
                        </button>
                      </div>
                    ) : (
                      <div className="roadmap-footer roadmap-footer-available">
                        <button
                          className="btn-start-link"
                          onClick={() =>
                            navigate(`/dashboard/roadmap/${roadmap.id}`, {
                              state: { roadmapTitle: roadmap.title },
                            })
                          }
                        >
                          Start Learning 
                        </button>
                      </div>
                    )}
                  </div>
                ))}

                {safeRoadmaps.length > COURSES_PER_PAGE && (
                  <div className="dashboard-pagination" aria-label="Course pagination">
                    <button
                      type="button"
                      className="pagination-btn"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    >
                      <ChevronLeft size={14} />
                      Previous
                    </button>

                    <span className="pagination-page-current">{currentPage}</span>
                    <span className="pagination-page-total">of {totalPages}</span>

                    <button
                      type="button"
                      className="pagination-btn"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    >
                      Next
                      <ChevronRight size={14} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="dashboard-panel recent-achievements">
            <h2 className="section-header">Recent Achievements</h2>
            <span className="section-sub">Your verified skills</span>

            <div className="achievement-card">
              <span className="achievement-icon">
                <BadgeCheck size={16} />
              </span>
              <div>
                <strong>{safeRoadmaps[0]?.title || 'JavaScript Core'}</strong>
                <p>
                  {totalCompletedNodes > 0
                    ? `Verified ${totalCompletedNodes} skill${totalCompletedNodes > 1 ? 's' : ''}`
                    : 'Start a roadmap to unlock achievements'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="content-right">
          <div className="sidebar-widget">
            <h3 className="widget-title">Upcoming Sessions</h3>
            <div className="session-card">
              <span className="mentor-name">Sarah Chen</span>
              <p className="session-topic">React Best Practices</p>
              <span className="session-time">Dec 5, 2025 at 2:00 PM</span>
              <button className="btn-join">Join Meeting</button>
            </div>
          </div>

          <div className="sidebar-widget">
            <h3 className="widget-title">Recommended for You</h3>
            <p className="learner-stat-sub" style={{ marginBottom: '1rem' }}>Based on your progress</p>

            <div className="mentor-profile-card">
              <div className="mentor-avatar">SC</div>
              <div>
                <div className="mentor-display-name">Sarah Chen</div>
                <div className="mentor-role">React Expert</div>
              </div>
            </div>

            <button className="btn-view-profile">View Profile</button>

            <div className="browse-link-wrap">
              <a href="#" className="browse-link">
                Browse All Mentors <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}