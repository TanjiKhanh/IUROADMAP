import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages - Public
import Landing from './pages/public/Landing';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import ForgotPassword from './pages/public/ForgotPassword';

// Pages - Learner
import LearnerDashboard from './pages/learner/LearnerDashboard';
import MyCourses from './pages/learner/MyCourse';
import RoadmapDetail from './pages/learner/RoadmapDetail';

// Pages - Mentor
import ApplicationPending from './pages/mentor/ApplicationPending';
import MentorDashboard from './pages/mentor/MentorDashboard';

// Pages - Admin
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageCourses from './pages/admin/ManageCourses';
import ManageDepartments from './pages/admin/ManageDepartments';
import ManageRoadmaps from './pages/admin/ManageRoadmap';
import RoadmapDesigner from './pages/admin/RoadmapDesign';

// Auth Components
import { AuthProvider } from './auth/AuthProvider';
import RequireAuth from './auth/RequireAuth';
import PublicOnly from './auth/PublicOnly';
import RequireRole from './auth/RequireRole';

// Layouts
import MainLayout from './components/layouts/MainLayout'; 
import FindMentors from './pages/learner/FindMentors';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <main style={{ minHeight: '100vh' }}>
          <Routes>
            {/* =========================================
                1. PUBLIC ROUTES
               ========================================= */}
            <Route path="/" element={<Landing />} />
            
            <Route 
              path="/login" 
              element={<PublicOnly><Login /></PublicOnly>} 
            />
            <Route 
              path="/register" 
              element={<PublicOnly><Register /></PublicOnly>} 
            />
            <Route 
              path="/forgot-password" 
              element={<PublicOnly><ForgotPassword /></PublicOnly>} 
            />

            {/* =========================================
                2. LEARNER DASHBOARD (With Sidebar Layout)
               ========================================= */}
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <RequireRole allowedRoles={['STUDENT', 'ADMIN']}>
                    <MainLayout />
                  </RequireRole>
                </RequireAuth>
              }
            >
              <Route index element={<LearnerDashboard />} />
              <Route path="my-courses" element={<MyCourses />} />
            </Route>

            {/* =========================================
                3. LEARNER FULLSCREEN TOOLS (No Sidebar)
               ========================================= */}
            <Route 
              path="/dashboard/roadmap/:id" 
              element={
                <RequireAuth>
                  <RequireRole allowedRoles={['STUDENT', 'ADMIN']}>
                    <RoadmapDetail />
                  </RequireRole>
                </RequireAuth>
              } 
            />
            
            {/* =========================================
                4. ADMIN ROUTES (With Sidebar Layout)
               ========================================= */}
            <Route
              path="/admin"
              element={
                <RequireAuth>
                  <RequireRole allowedRoles={['ADMIN']}>
                    <MainLayout />
                  </RequireRole>
                </RequireAuth>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="roadmaps" element={<ManageRoadmaps />} />
              <Route path="courses" element={<ManageCourses />} />
              <Route path="departments" element={<ManageDepartments />} />
            </Route>

            {/* =========================================
                5. ADMIN FULLSCREEN TOOLS (No Sidebar)
               ========================================= */}
            <Route 
              path="/admin/roadmaps/design/:slug" 
              element={
                <RequireAuth>
                  <RequireRole allowedRoles={['ADMIN']}>
                    <RoadmapDesigner />
                  </RequireRole>
                </RequireAuth>
              } 
            />

            {/* =========================================
                6. MENTOR ROUTES 
               ========================================= */}
            <Route 
              path="/application-pending" 
              element={<ApplicationPending />} 
            />
            <Route 
              path="/mentor-dashboard" 
              element={
                <RequireAuth>
                  <RequireRole allowedRoles={['MENTOR']}>
                    <MentorDashboard />
                  </RequireRole>
                </RequireAuth>
              } 
            />

            {/* Fallback */}
            <Route path="*" element={<div>Page Not Found</div>} />

          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}