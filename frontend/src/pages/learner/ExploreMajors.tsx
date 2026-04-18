import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { exploreService, Department, MajorCard } from '../../services/explore.service';
import { roadmapService } from '../../services/roadmap.service';
import '../../styles/exploreMajors.css';

type DepartmentFilter = 'all' | string;

export default function ExploreMajors() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [majors, setMajors] = useState<MajorCard[]>([]);
  const [selectedDept, setSelectedDept] = useState<DepartmentFilter>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enrollingSlug, setEnrollingSlug] = useState<string | null>(null);
  const [viewingSlug, setViewingSlug] = useState<string | null>(null);
  const [enrollNotice, setEnrollNotice] = useState<{
    type: 'success' | 'already' | 'error';
    title: string;
    message: string;
    allowRoadmapNav: boolean;
  } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await exploreService.getExploreMajors();
        setDepartments(data.departments || []);
        setMajors(data.majors || []);
      } catch (err: any) {
        console.error('Failed to load explore majors:', err);
        setError(err?.message || 'Failed to load majors.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filteredMajors = useMemo(() => {
    let result = [...majors];

    if (selectedDept !== 'all') {
      result = result.filter(
        (m) => m.department?.slug === selectedDept
      );
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          (m.description || '').toLowerCase().includes(q)
      );
    }

    return result;
  }, [majors, selectedDept, searchTerm]);

  const majorsByDepartment = useMemo(() => {
    const map = new Map<string, { department: Department; majors: MajorCard[] }>();

    for (const dept of departments) {
      map.set(dept.slug, { department: dept, majors: [] });
    }

    for (const major of filteredMajors) {
      const deptSlug = major.department?.slug;
      if (!deptSlug || !major.department) continue;
      const entry = map.get(deptSlug);
      if (entry) {
        entry.majors.push(major);
      } else {
        map.set(deptSlug, {
          department: {
            id: major.department.id,
            slug: major.department.slug,
            name: major.department.name,
            description: '',
          },
          majors: [major],
        });
      }
    }

    let entries = Array.from(map.values()).filter((e) => e.majors.length > 0);
    if (selectedDept !== 'all') {
      entries = entries.filter((e) => e.department.slug === selectedDept);
    }

    return entries;
  }, [departments, filteredMajors, selectedDept]);

  useEffect(() => {
    if (!enrollNotice || enrollNotice.type !== 'error') return;

    const timer = window.setTimeout(() => {
      setEnrollNotice(null);
    }, 3200);

    return () => window.clearTimeout(timer);
  }, [enrollNotice]);

  const handleGoMyRoadmaps = () => {
    setEnrollNotice(null);
    navigate('/dashboard/my-courses');
  };

  const handleCloneMajor = async (major: MajorCard) => {
    try {
      setEnrollNotice(null);
      setEnrollingSlug(major.slug);
      await roadmapService.enrollToRoadmap(major.slug);
      setEnrollNotice({
        type: 'success',
        title: 'Success!',
        message: `The ${major.name} major has been successfully added to your roadmaps.`,
        allowRoadmapNav: true,
      });
    } catch (err: any) {
      console.error('Failed to clone major:', err);

      const status = err?.response?.status;
      const errorPayload = err?.response?.data?.data ?? err?.response?.data ?? {};
      const code = errorPayload?.code;
      const backendMessage = errorPayload?.message;

      if (status === 409 && code === 'ALREADY_ENROLLED') {
        setEnrollNotice({
          type: 'already',
          title: 'Already Enrolled',
          message: backendMessage || 'You are already enrolled in this roadmap',
          allowRoadmapNav: true,
        });
        return;
      }

      setEnrollNotice({
        type: 'error',
        title: 'Enroll Failed',
        message: backendMessage || 'Enroll failed. Please try again.',
        allowRoadmapNav: false,
      });
    } finally {
      setEnrollingSlug(null);
    }
  };

  const handleViewMajor = async (major: MajorCard) => {
    try {
      setEnrollNotice(null);
      setViewingSlug(major.slug);

      navigate(`/dashboard/roadmap-preview/${major.slug}`, {
        state: {
          roadmapTitle: major.name,
          roadmapDescription: major.description || '',
          previewMode: true,
        },
      });
    } catch (err: any) {
      const backendMessage = err?.response?.data?.data?.message ?? err?.response?.data?.message;
      setEnrollNotice({
        type: 'error',
        title: 'Open Failed',
        message: backendMessage || 'Unable to open roadmap. Please try again.',
        allowRoadmapNav: false,
      });
    } finally {
      setViewingSlug(null);
    }
  };

  const getMajorBadge = (major: MajorCard) => {
    const words = major.name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() || '');

    return words.join('') || 'MJ';
  };

  const renderDepartmentFilters = () => (
    <div className="explore-filter-row">
      <button
        className={`explore-chip ${selectedDept === 'all' ? 'explore-chip-active' : ''}`}
        onClick={() => setSelectedDept('all')}
      >
        All Programs
      </button>
      {departments.map((dept) => (
        <button
          key={dept.id}
          className={`explore-chip ${
            selectedDept === dept.slug ? 'explore-chip-active' : ''
          }`}
          onClick={() => setSelectedDept(dept.slug)}
        >
          {dept.name}
        </button>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="explore-page">
        <div className="explore-topbar">
          <div className="explore-search-wrap">
            <span className="explore-search-icon">Search</span>
            <input
              type="text"
              className="explore-search-input"
              placeholder="Search courses..."
              disabled
            />
          </div>
        </div>
        <div className="explore-loading-card">Loading majors...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="explore-page">
        <div className="explore-error-card">
          <p>{error}</p>
          <button className="explore-retry-button" onClick={() => window.location.reload()}>
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="explore-page">
      {enrollNotice && (
        <div className="explore-notice-overlay" role="status" aria-live="polite">
          <div className={`explore-notice-modal explore-notice-${enrollNotice.type}`}>
            <div className={`explore-notice-icon explore-notice-icon-${enrollNotice.type}`} aria-hidden="true" />
            <h3 className="explore-notice-title">{enrollNotice.title}</h3>
            <p className="explore-notice-message">{enrollNotice.message}</p>

            <div className="explore-notice-actions">
              {enrollNotice.allowRoadmapNav ? (
                <button className="explore-notice-link" onClick={handleGoMyRoadmaps}>
                  See My Roadmap
                </button>
              ) : null}

              <button className="explore-notice-close" onClick={() => setEnrollNotice(null)}>
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="explore-topbar">
        <div className="explore-search-wrap">
          <span className="explore-search-icon">Search</span>
          <input
            type="text"
            className="explore-search-input"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

      </header>

      <div className="explore-filter-section">
        <span className="filter-label">Filter By Department</span>
        {renderDepartmentFilters()}
      </div>

      <div className="explore-content">
        {majorsByDepartment.length === 0 && (
          <div className="explore-empty">
            <p>No majors found. Try changing filters or search term.</p>
          </div>
        )}

        {majorsByDepartment.map(({ department, majors: deptMajors }) => (
          <section key={department.id} className="explore-section">
            <header className="explore-section-header">
              <div className="explore-section-title-block">
                <h2>{department.name}</h2>
                {department.description && (
                  <p className="section-subtitle">{department.description}</p>
                )}
              </div>
            </header>

            <div className="major-grid">
              {deptMajors.map((major) => (
                <article key={major.id} className="major-card">
                  <div className="major-card-icon">{getMajorBadge(major)}</div>

                  <div className="major-card-main">
                    <h3>{major.name}</h3>
                    <p className="major-description">
                      {major.description ||
                        'Comprehensive curriculum to build your expertise.'}
                    </p>
                  </div>

                  <div className="major-card-meta">
                    <div>
                      <span className="meta-label">Credits</span>
                      <span className="meta-value">
                        {major.totalCreditsRequired} units
                      </span>
                    </div>
                    <div>
                      <span className="meta-label">Courses</span>
                      <span className="meta-value">
                        {major.totalCourses} total
                      </span>
                    </div>
                  </div>

                  <div className="major-card-actions">
                    <button
                      className="btn-view"
                      onClick={() => handleViewMajor(major)}
                      disabled={viewingSlug === major.slug}
                    >
                      {viewingSlug === major.slug ? 'Opening...' : 'View'}
                    </button>
                    <button
                      className="btn-clone"
                      onClick={() => handleCloneMajor(major)}
                      disabled={enrollingSlug === major.slug}
                    >
                      {enrollingSlug === major.slug ? 'Cloning...' : 'Clone Major'}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}