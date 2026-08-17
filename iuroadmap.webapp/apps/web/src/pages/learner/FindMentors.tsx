import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mentorService, PaginatedResponse, MentorProfile, MentorStats } from '../../services/mentor.service';
import '../../styles/findMentors.css';

export default function FindMentors() {
  const [mentors, setMentors] = useState<MentorProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // 🔧 Filters State
  const [filters, setFilters] = useState({
    industry: '',
    search: '',
    limit: 12,
    offset: 0,
  });

  // 📊 Available Options
  const [industries, setIndustries] = useState<string[]>([]);
  const [stats, setStats] = useState<MentorStats | null>(null);

  // 📈 Pagination
  const [totalMentors, setTotalMentors] = useState(0);
  const itemsPerPage = filters.limit;
  const totalPages = Math.ceil(totalMentors / itemsPerPage);

  // ✅ Fetch Stats & Industries (Once on mount)
  useEffect(() => {
    const fetchStats = async () => {
      try {
        console.log('📊 Loading stats...');
        
        const data = await mentorService.getMentorStats();
        
        console.log('✅ Stats loaded:', data);
        
        if (!data?.byIndustry) {
          console.error('❌ Invalid stats structure:', data);
          setIndustries([]);
          return;
        }
        
        setStats(data);
        const uniqueIndustries = data.byIndustry.map((item) => item.industry);
        
        console.log('📈 Industries:', uniqueIndustries);
        
        setIndustries(uniqueIndustries);
      } catch (error) {
        console.error('❌ Failed to load stats:', error);
        setIndustries([]);
        setStats(null);
      }
    };
    
    fetchStats();
  }, []);

  // 🔍 Fetch Mentors (When filters change)
  useEffect(() => {
    const fetchMentors = async () => {
      setLoading(true);
      try {
        console.log('🔍 Loading mentors with filters:', filters);
        
        const response = await mentorService.searchMentors(filters);
        
        console.log('✅ Mentors loaded:', response);
        
        if (!response?.data) {
          console.error('❌ Invalid mentors structure:', response);
          setMentors([]);
          setTotalMentors(0);
          return;
        }
        
        setMentors(response.data);
        setTotalMentors(response.meta?.total || 0);
        
        console.log('📊 Total mentors:', response.meta?.total);
        console.log('👥 Mentors count:', response.data?.length);
        
      } catch (error) {
        console.error('❌ Failed to load mentors:', error);
        setMentors([]);
        setTotalMentors(0);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMentors();
  }, [filters]);

  // 🎯 Handle Filter Change
  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      offset: 0,
    }));
    setCurrentPage(1);
  };

  // 📄 Handle Pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setFilters((prev) => ({
      ...prev,
      offset: (page - 1) * itemsPerPage,
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 🔄 Reset Filters
  const handleReset = () => {
    setFilters({
      industry: '',
      search: '',
      limit: 12,
      offset: 0,
    });
    setCurrentPage(1);
  };

  return (
    <div className="find-mentors-container">
      
      {/* ==================== LEFT SIDEBAR ==================== */}
      <aside className="mentors-sidebar">
        <h3 className="filter-title">Filters</h3>

        {/* --- Industry Filter --- */}
        <div className="filter-group">
          <label className="filter-label">Industry</label>
          <div className="filter-options">
            {industries.length > 0 ? (
              <>
                {industries.map((industry) => (
                  <div key={industry} className="filter-checkbox">
                    <input
                      type="radio"
                      id={`industry-${industry}`}
                      name="industry"
                      value={industry}
                      checked={filters.industry === industry}
                      onChange={(e) => handleFilterChange('industry', e.target.value)}
                    />
                    <label htmlFor={`industry-${industry}`}>{industry}</label>
                  </div>
                ))}
                <div className="filter-checkbox">
                  <input
                    type="radio"
                    id="industry-all"
                    name="industry"
                    value=""
                    checked={filters.industry === ''}
                    onChange={(e) => handleFilterChange('industry', '')}
                  />
                  <label htmlFor="industry-all">All Industries</label>
                </div>
              </>
            ) : (
              <p style={{ fontSize: '0.875rem', color: '#64748b' }}>Loading industries...</p>
            )}
          </div>
        </div>

        {/* --- Skills Filter (Future) --- */}
        <div className="filter-group">
          <label className="filter-label">Skills</label>
          <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.5rem' }}>
            Coming soon...
          </p>
        </div>

        {/* --- Buttons --- */}
        <button className="btn-apply-filters">Apply Filters</button>
        <button className="btn-reset" onClick={handleReset}>
          Reset
        </button>
      </aside>

      {/* ==================== MAIN CONTENT ==================== */}
      <main className="mentors-main">
        
        {/* --- TOP SECTION: HEADER + SEARCH --- */}
        <div className="mentors-header">
          <div>
            <h1 className="page-title">Find Your Mentor</h1>
            <p className="page-subtitle">
              Connect with industry experts and accelerate your learning journey
            </p>
          </div>

          {/* Search Bar */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by name, keyword, or skill..."
              className="search-input"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
            <button className="btn-search">🔍</button>
          </div>
        </div>

        {/* --- RECOMMENDED SECTION --- */}
        {!filters.industry && !filters.search && mentors.length > 0 && (
          <section className="recommended-section">
            <h2 className="section-title">Recommended for You</h2>
            <p className="section-subtitle">Based on your learning progress</p>

            <div className="mentors-carousel">
              {mentors.slice(0, 4).map((mentor) => (
                <div key={mentor.userId} className="mentor-card-carousel">
                  <div className="mentor-avatar-large">
                    {mentor.bio?.charAt(0) || 'M'}
                  </div>
                  <h3 className="mentor-name">Mentor #{mentor.userId}</h3>
                  <p className="mentor-title">{mentor.industry || 'Tech'}</p>
                  
                  <div className="mentor-skills">
                    {mentor.skills?.slice(0, 3).map((skill) => (
                      <span key={skill} className="skill-badge">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="mentor-rating">
                    ⭐ 4.8 (120 reviews)
                  </div>

                  <button
                    className="btn-book-session"
                    onClick={() => navigate(`/mentor/${mentor.userId}`)}
                  >
                    View Profile
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* --- ALL MENTORS SECTION --- */}
        <section className="all-mentors-section">
          <h2 className="section-title">All Mentors</h2>

          {loading ? (
            <div className="loading-state">⏳ Loading mentors...</div>
          ) : mentors.length === 0 ? (
            <div className="empty-state">
              <p>No mentors found matching your criteria.</p>
              <button className="btn-primary" onClick={handleReset}>
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              {/* Mentor Grid */}
              <div className="mentors-grid">
                {mentors.map((mentor) => (
                  <div key={mentor.userId} className="mentor-card">
                    <div className="mentor-header">
                      <div className="mentor-avatar">
                        {mentor.bio?.charAt(0) || 'M'}
                      </div>
                      <div className="mentor-info">
                        <h3>Mentor #{mentor.userId}</h3>
                        <p className="mentor-title">{mentor.industry || 'Tech'}</p>
                      </div>
                    </div>

                    <div className="mentor-bio">
                      {mentor.bio?.substring(0, 100) || 'No bio available'}...
                    </div>

                    <div className="mentor-skills">
                      {mentor.skills?.slice(0, 4).map((skill) => (
                        <span key={skill} className="skill-tag">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="mentor-footer">
                      <span className="mentor-rating">⭐ 4.5 (95 reviews)</span>
                      <button
                        className="btn-view-profile"
                        onClick={() => navigate(`/mentor/${mentor.userId}`)}
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="btn-pagination"
                  >
                    ← Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`btn-page ${page === currentPage ? 'active' : ''}`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="btn-pagination"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </main>
    </div>
  );
}