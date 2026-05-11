import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  adminService,
  Course,
  Department,
  Major,
  Roadmap,
} from '../../services/admin.service';

export default function AdminDashboard() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [majors, setMajors] = useState<Major[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setError(null);
        const [deptResult, courseResult, roadmapResult, majorResult] = await Promise.allSettled([
          adminService.getAllDepartments(),
          adminService.getAllCourses(),
          adminService.getAllRoadmaps(),
          adminService.getAdminMajors(),
        ]);

        const deptData = deptResult.status === 'fulfilled' ? deptResult.value : [];
        const courseData = courseResult.status === 'fulfilled' ? courseResult.value : [];
        const roadmapData = roadmapResult.status === 'fulfilled' ? roadmapResult.value : [];
        const majorData = majorResult.status === 'fulfilled' ? majorResult.value : [];

        setDepartments(Array.isArray(deptData) ? deptData : []);
        setCourses(Array.isArray(courseData) ? courseData : []);
        setRoadmaps(Array.isArray(roadmapData) ? roadmapData : []);
        setMajors(Array.isArray(majorData) ? majorData : []);

        const hasFailure =
          deptResult.status === 'rejected' ||
          courseResult.status === 'rejected' ||
          roadmapResult.status === 'rejected' ||
          majorResult.status === 'rejected';

        if (hasFailure) {
          setError('Some dashboard data could not be loaded. Displaying available information.');
        }
      } catch (err) {
        console.error('Failed to load admin dashboard data', err);
        setError('Unable to load dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const totalCredits = useMemo(
    () => courses.reduce((sum, course) => sum + (Number(course.credits) || 0), 0),
    [courses],
  );

  const averageCredits = useMemo(
    () => (courses.length ? totalCredits / courses.length : 0),
    [courses.length, totalCredits],
  );

  const coursesPerRoadmap = useMemo(
    () => (roadmaps.length ? courses.length / roadmaps.length : 0),
    [courses.length, roadmaps.length],
  );

  const latestCourses = useMemo(() => {
    return [...courses]
      .sort((a, b) => b.id - a.id)
      .slice(0, 5);
  }, [courses]);

  const latestRoadmaps = useMemo(() => {
    return [...roadmaps]
      .sort((a, b) => (Number(b.id || 0) - Number(a.id || 0)))
      .slice(0, 5);
  }, [roadmaps]);

  const topMajorsByCredits = useMemo(() => {
    return [...majors]
      .sort((a, b) => (b.totalCreditsRequired || 0) - (a.totalCreditsRequired || 0))
      .slice(0, 4);
  }, [majors]);

  const statCards = [
    {
      label: 'Departments',
      value: departments.length,
      hint: 'Academic units configured',
      tone: 'indigo',
    },
    {
      label: 'Majors',
      value: majors.length,
      hint: 'Major roadmaps published',
      tone: 'green',
    },
    {
      label: 'Courses',
      value: courses.length,
      hint: `${averageCredits.toFixed(1)} avg credits per course`,
      tone: 'violet',
    },
    {
      label: 'Roadmaps',
      value: roadmaps.length,
      hint: `${coursesPerRoadmap.toFixed(1)} courses per roadmap`,
      tone: 'amber',
    },
  ] as const;

  return (
    <div className="admin-overview-page">
      <header className="dashboard-header">
        <div>
          <h1>Admin Overview</h1>
          <p>Live operational view based on Admin Service data</p>
        </div>
        <div className="admin-overview-live-pill">Synced with API</div>
      </header>

      {error && (
        <div className="admin-overview-alert">
          {error}
        </div>
      )}

      <div className="admin-overview-stats-grid">
        {statCards.map((card) => (
          <article key={card.label} className={`admin-overview-stat-card tone-${card.tone}`}>
            <div className="admin-overview-stat-label">{card.label}</div>
            <div className="admin-overview-stat-value">{loading ? '...' : card.value}</div>
            <div className="admin-overview-stat-hint">{loading ? 'Loading data...' : card.hint}</div>
          </article>
        ))}
      </div>

      <section className="admin-overview-main-grid">
        <div className="card admin-overview-card">
          <h3>Quick Actions</h3>
          <div className="admin-overview-actions-grid">
            <Link className="admin-overview-action-link" to="/admin/roadmaps">
              <span className="admin-overview-action-title">Manage Roadmaps</span>
              <span className="admin-overview-action-sub">Build graph and prerequisite structure</span>
            </Link>
            <Link className="admin-overview-action-link" to="/admin/courses">
              <span className="admin-overview-action-title">Manage Courses</span>
              <span className="admin-overview-action-sub">Update course metadata and topic flows</span>
            </Link>
            <Link className="admin-overview-action-link" to="/admin/departments">
              <span className="admin-overview-action-title">Manage Departments</span>
              <span className="admin-overview-action-sub">Maintain department and ownership data</span>
            </Link>
            <Link className="admin-overview-action-link" to="/admin/users">
              <span className="admin-overview-action-title">Review Users</span>
              <span className="admin-overview-action-sub">Approve mentors and inspect role assignments</span>
            </Link>
          </div>
        </div>

        <div className="card admin-overview-card">
          <h3>Major Credit Highlights</h3>
          {loading ? (
            <p className="admin-overview-muted">Loading major credits...</p>
          ) : topMajorsByCredits.length === 0 ? (
            <p className="admin-overview-muted">No majors available yet.</p>
          ) : (
            <div className="admin-overview-list">
              {topMajorsByCredits.map((major) => (
                <div key={major.id} className="admin-overview-list-row">
                  <div>
                    <div className="admin-overview-row-title">{major.name}</div>
                    <div className="admin-overview-row-sub">/{major.slug}</div>
                  </div>
                  <span className="admin-overview-chip">{major.totalCreditsRequired} credits</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="admin-overview-main-grid">
        <div className="card admin-overview-card">
          <h3>Latest Courses</h3>
          {loading ? (
            <p className="admin-overview-muted">Loading courses...</p>
          ) : latestCourses.length === 0 ? (
            <p className="admin-overview-muted">No courses found.</p>
          ) : (
            <div className="admin-overview-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Roadmap</th>
                    <th>Credits</th>
                  </tr>
                </thead>
                <tbody>
                  {latestCourses.map((course) => (
                    <tr key={course.id}>
                      <td>
                        <strong>{course.name}</strong>
                        <br />
                        <span className="admin-overview-row-sub">/{course.slug}</span>
                      </td>
                      <td>{course.roadmapName}</td>
                      <td>{course.credits}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="card admin-overview-card">
          <h3>Latest Roadmaps</h3>
          {loading ? (
            <p className="admin-overview-muted">Loading roadmaps...</p>
          ) : latestRoadmaps.length === 0 ? (
            <p className="admin-overview-muted">No roadmaps found.</p>
          ) : (
            <div className="admin-overview-list">
              {latestRoadmaps.map((roadmap) => (
                <div key={roadmap.id || roadmap.slug} className="admin-overview-list-row">
                  <div>
                    <div className="admin-overview-row-title">
                      {roadmap.title || roadmap.name || 'Untitled roadmap'}
                    </div>
                    <div className="admin-overview-row-sub">
                      {roadmap.slug ? `/${roadmap.slug}` : 'No slug'}
                    </div>
                  </div>
                  <span className="admin-overview-chip">
                    {roadmap.courseId ? `Course #${roadmap.courseId}` : 'Roadmap'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}