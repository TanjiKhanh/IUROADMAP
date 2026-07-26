import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService, UserRoadmapSummary } from '../../services/user.service';
import { roadmapService, UserRoadmapProgressDetail } from '../../services/roadmap.service';
import '../../styles/myCourse.css'; // Ensure you have the CSS file from the previous step

type RoadmapCourseCard = UserRoadmapSummary & {
  completionPercentage: number;
  creditsEarned: number;
  creditsRequired: number;
  totalNodes: number;
  completedNodes: number;
};

export default function MyCourses() {
  const [roadmaps, setRoadmaps] = useState<RoadmapCourseCard[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const summaryData = await userService.getMyRoadmaps();
        if (!Array.isArray(summaryData)) {
          setRoadmaps([]);
          return;
        }

        const detailResults = await Promise.allSettled(
          summaryData.map((roadmap) => roadmapService.getUserRoadmapDetail(roadmap.id))
        );

        const detailById = new Map<number, UserRoadmapProgressDetail>();

        detailResults.forEach((result, index) => {
          if (result.status === 'fulfilled') {
            detailById.set(summaryData[index].id, result.value);
          }
        });

        const mergedRoadmaps: RoadmapCourseCard[] = summaryData.map((roadmap) => {
          const detail = detailById.get(roadmap.id);

          if (!detail) {
            return {
              ...roadmap,
              completionPercentage: roadmap.progressPercent,
              creditsEarned: 0,
              creditsRequired: 0,
              totalNodes: roadmap.totalNodes,
              completedNodes: roadmap.completedNodes,
            };
          }

          const completedNodes = detail.nodes.filter((node) => node.status === 'COMPLETED').length;
          return {
            ...roadmap,
            completionPercentage: detail.completion_percentage,
            creditsEarned: detail.total_credits_earned,
            creditsRequired: detail.total_credits_required,
            totalNodes: detail.nodes.length,
            completedNodes,
          };
        });

        const sortedRoadmaps = [...mergedRoadmaps].sort(
          (a, b) => (b.completionPercentage || 0) - (a.completionPercentage || 0)
        );

        setRoadmaps(sortedRoadmaps);
      } catch (error) {
        console.error("Failed to load courses:", error);
        setRoadmaps([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) {
    return <div className="p-4 text-center text-gray-500">Loading courses...</div>;
  }

  // Helper to determine status color/text
  const getStatus = (percent: number) => {
    if (percent >= 100) return { type: 'completed', text: 'Completed', label: 'View Certificate' };
    if (percent > 0) return { type: 'in-progress', text: `${percent}%`, label: 'Continue Learning →' };
    return { type: 'not-started', text: 'Not Started', label: 'Start Course →' };
  };

  return (
    <div className="courses-container">
      
      {/* Page Header (Rendered inside the page now) */}
      <div className="page-header">
        <h1 className="page-title">My Courses</h1>
        <p className="page-subtitle">Your learning journey in Fullstack Web Development.</p>
      </div>

      {/* --- SECTION 1: FIELD-SPECIFIC COURSES (Real Data) --- */}
      <section className="course-section">
        <h2 className="section-title">Field-Specific Courses</h2>
        
        <div className="courses-grid">
          {roadmaps.length === 0 ? (
            <div className="empty-state-card" style={{ padding: '2rem', textAlign: 'center', gridColumn: '1 / -1', background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <p style={{ marginBottom: '1rem', color: '#64748b' }}>No active courses found.</p>
              <button 
                onClick={() => navigate('/dashboard/explore')} 
                style={{ background: '#0f172a', color: 'white', padding: '0.5rem 1rem', borderRadius: '6px', border: 'none', cursor: 'pointer' }}
              >
                Explore Catalog →
              </button>
            </div>
          ) : (
            roadmaps.map((course) => {
              const status = getStatus(course.completionPercentage);
              const metricLabel = status.type === 'not-started' ? 'Status' : 'Progress';
              
              return (
                <div key={course.id} className={`course-grid-card ${status.type}`}>
                  <div className="card-top">
                    <h3>{course.title}</h3>
                    <p className="card-desc">
                      Master the art of {course.title}. Build real-world projects and verify your skills on the blockchain.
                    </p>
                  </div>

                  <div className="card-progress-section">
                    <div className="progress-labels">
                      <span className="label-text">{metricLabel}</span>
                      <span className="label-percent">{status.text}</span>
                    </div>
                    
                    <div className="progress-track">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${course.completionPercentage}%` }}
                      ></div>
                    </div>

                    <div className="course-meta-line">
                      Credits {course.creditsEarned}/{course.creditsRequired || 0} · Courses {course.completedNodes}/{course.totalNodes || 0}
                    </div>

                    <div 
                      className="action-link"
                      onClick={() => navigate(`/dashboard/roadmap/${course.id}`, {
                        state: { roadmapTitle: course.title }
                      })}
                    >
                      {status.label}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* --- SECTION 2: OPTIONAL COURSES (Static Mock) --- */}
      <section className="course-section">
        <h2 className="section-title">Optional Courses</h2>
        
        <div className="courses-grid">
          
          {/* Mock Card 1: IELTS */}
          <div className="course-grid-card not-started">
            <div className="card-top">
              <h3>IELTS Preparation</h3>
              <p className="card-desc">
                Prepare for the International English Language Testing System exam to certify your English proficiency.
              </p>
            </div>
            <div className="card-progress-section">
              <span className="badge-tag" style={{backgroundColor: '#dbeafe', color: '#1e40af'}}>Available</span>
            </div>
          </div>

          {/* Mock Card 2: MOS */}
          <div className="course-grid-card not-started">
            <div className="card-top">
              <h3>MOS Certification</h3>
              <p className="card-desc">
                Become a certified Microsoft Office Specialist to validate your skills in Word, Excel, and PowerPoint.
              </p>
            </div>
            <div className="card-progress-section">
              <span className="badge-tag">Not Enrolled</span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}