import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminService } from '../../services/admin.service'; // Adjust path

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    roadmaps: 0,
    courses: 0,
    departments: 0,
    users: 0 
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [deptData, courseData, roadmapData] = await Promise.all([
          adminService.getAllDepartments(),
          adminService.getAllCourses(),
          adminService.getAllRoadmaps(),
        ]);

        setStats({
          departments: deptData?.length || 0,
          courses: courseData?.length || 0,
          roadmaps: roadmapData?.length || 0,
          users: 1240 
        });
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  // ⚠️ NOTICE: We removed <AdminLayout> wrapper. 
  // We just return the Header and Content directly.
  return (
    <>
      <header className="dashboard-header">
        <div>
          <h1>Admin Overview 🛠️</h1>
          <p>Manage platform content and users</p>
        </div>
        <div className="user-profile">
          <div className="avatar admin-avatar">A</div>
        </div>
      </header>

      <div className="admin-content-area">
        {/* KPI Stats */}
        <section className="stats-grid">
          <div className="stat-card">
            <h3>Total Roadmaps</h3>
            <div className="stat-value">{loading ? '...' : stats.roadmaps}</div>
          </div>
          <div className="stat-card">
            <h3>Total Courses</h3>
            <div className="stat-value">{loading ? '...' : stats.courses}</div>
          </div>
          <div className="stat-card">
            <h3>Departments</h3>
            <div className="stat-value">{loading ? '...' : stats.departments}</div>
          </div>
          <div className="stat-card">
            <h3>Users</h3>
            <div className="stat-value">👥 {stats.users}</div>
          </div>
        </section>
      </div>
    </>
  );
}