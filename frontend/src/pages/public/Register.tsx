import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext'; // Import useAuth hook
import '../../styles/Register.css';

// Asset Import (Logo)
import logo from '../../assets/images/logo-gupjob-primary.png';
import gitHub from '../../assets/images/icon-github.png';
import linkedIn from '../../assets/images/icon-linkedin.png';

import { PublicCourse , publicService } from '../../services/public.service';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth(); // Get register function from context
  const [step, setStep] = useState(1);
  const totalSteps = 6;

  // State control form data
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    password: '',
    role: '', 
    currentSituation: '', 
    careerGoals: [] as string[],
    interests: [] as string[],
    primaryGoalNextYear: '',
    priorityJob: '',
    selectedCourseId : null as number | null
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // --- LOAD RECOMMENDED COURSES BASED ON INTEREST ---
  const [availableCourses, setAvailableCourses] = useState<PublicCourse[]>([]);
  const [isCourseLoading, setIsCourseLoading] = useState(false);

  useEffect(() => {
    if (step === 6) {
      const loadCourses = async () => {
        setIsCourseLoading(true);
        try {
          const primaryInterest = formData.interests[0];
          const deptSlug = getDepartmentSlug(primaryInterest);

          // Use publicService to fetch JOB courses for the department
          const courses = await publicService.getJobCourses(deptSlug);
          
          if (Array.isArray(courses)) {
            setAvailableCourses(courses);
          }
        } catch (err) {
          console.error("Error loading courses", err);
        } finally {
          setIsCourseLoading(false);
        }
      };
      loadCourses();
    }
  }, [step, formData.interests]);

  // --- HANDLERS (Keep existing handlers) ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSelect = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMultiSelect = (field: 'careerGoals' | 'interests', value: string) => {
    setFormData(prev => {
      const list = prev[field];
      return list.includes(value) 
        ? { ...prev, [field]: list.filter(item => item !== value) }
        : { ...prev, [field]: [...list, value] };
    });
  };


  const handleCourseSelect = (course: PublicCourse) => {
    setFormData(prev => {
      if (prev.selectedCourseId === course.id) {
        return { ...prev, selectedCourseId: null, priorityJob: '' };
      }
      return { 
        ...prev, 
        selectedCourseId: course.id, 
        priorityJob: course.slug 
      };
    });
  };

// Helper to map UI Interest tags to Backend Department Slugs
const getDepartmentSlug = (interest: string) => {
  const map: Record<string, string> = {
    'IT': 'it',
    'Business - Marketing': 'business',
    'Design': 'design',
    'Other': 'general'
  };
  return map[interest] || 'general';
};

  const nextStep = () => {
    if (step === 1 && (!formData.email || !formData.fullName || !formData.password)) {
      setError("Please fill in all fields.");
      return;
    }
    if (step === 2 && !formData.role) {
      setError("Please select a role.");
      return;
    }
    setError(null);
    setStep(prev => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));




  // --- SUBMIT HANDLER ---
  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Map role logic
      const roleMap: { [key: string]: string } = {
        'learner': 'STUDENT',
        'mentor': 'MENTOR',
        'company': 'COMPANY',
        'admin': 'ADMIN'
      };
      
      const backendRole = roleMap[formData.role.toLowerCase()] || formData.role.toUpperCase();
      
      const departmentSlug = getDepartmentSlug(formData.interests[0]);
      
      const payload = {
        email: formData.email,
        password: formData.password,
        name: formData.fullName,
        role: backendRole,  
      };

      console.log("Submitting Payload:", payload); // 🔍 Debug Log

      // Call the context function instead of fetch
      await register(payload);

      // Success -> Navigate
      navigate('/login');
      
    } catch (err: any) {
      // API errors usually come as objects or strings depending on your api.ts interceptor
      const errorMessage = err.response?.data?.message || err.message || 'Registration failed';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // ... (Rest of your Render Functions: renderStep1, renderStep2, etc. remain exactly the same) ...
  
  // NOTE: Paste your existing render functions (renderStep1 - renderStep5) and return statement here.
  // The UI logic does not change, only the handleSubmit logic changed.
  
  // ... (Include renderStep1, renderStep2, renderStep3, renderStep4, renderStep5) ...

  const renderStep1 = () => (
    <>
      <h2 style={{fontSize: '1.75rem', marginBottom: '0.5rem'}}>Create Account</h2>
      <p style={{color:'#64748b', marginBottom:'1.5rem'}}>Join our community today.</p>

      {error && <div className="error-msg">{error}</div>}

      <div className="social-group">
        <button className="btn-social"><span><img src={gitHub} alt="GitHub" style={{width:'20px', height:'20px'}} /></span> Continue with GitHub</button>
        <button className="btn-social"><span><img src={linkedIn} alt="LinkedIn" style={{width:'20px', height:'20px'}} /></span> Continue with LinkedIn</button>
      </div>

      <div className="divider-or"><span>OR</span></div>

      <div className="reg-form">
        <label className="reg-label">
          Email
          <input className="reg-input" name="email" type="email" placeholder="name@company.com" required value={formData.email} onChange={handleChange} />
        </label>
        <label className="reg-label">
          Full Name
          <input className="reg-input" name="fullName" type="text" placeholder="John Doe" required value={formData.fullName} onChange={handleChange} />
        </label>
        <label className="reg-label">
          Password
          <div style={{position:'relative'}}>
            <input 
              className="reg-input" 
              style={{width:'100%'}}
              name="password" 
              type={showPassword ? "text" : "password"} 
              placeholder="Create a password" 
              required 
              value={formData.password} 
              onChange={handleChange} 
            />
            <span 
              onClick={() => setShowPassword(!showPassword)}
              style={{position:'absolute', right:'12px', top:'50%', transform:'translateY(-50%)', cursor:'pointer'}}
            >
              {showPassword ? "🔓" : "🔒"}
            </span>
          </div>
        </label>
      </div>
      
      <button className="btn-primary" style={{width:'100%', marginTop:'1.5rem'}} onClick={nextStep}>
        Create Account &rarr;
      </button>

      <div style={{marginTop:'1rem', textAlign:'center', fontSize:'0.9rem'}}>
        Already have an account? <Link to="/login" style={{color:'#2563eb', fontWeight:600}}>Log In</Link>
      </div>
    </>
  );

  const renderStep2 = () => (
    <>
      <h2 style={{fontSize: '1.5rem', marginBottom: '0.5rem'}}>How will you be joining us?</h2>
      <p style={{color:'#64748b'}}>Choose your primary role.</p>
      {error && <div className="error-msg">{error}</div>}

      <div className="grid-cards">
        {[
          { id: 'learner', icon: '🎓', title: "I'm a Learner", desc: "Gain skills & land jobs." },
          { id: 'mentor', icon: '💡', title: "I'm a Mentor", desc: "Guide & share expertise." },
          { id: 'company', icon: '💼', title: "I'm a Company", desc: "Hire skilled talent." }
        ].map(item => (
          <div 
            key={item.id} 
            className={`card-select ${formData.role === item.id ? 'active' : ''}`}
            onClick={() => handleSelect('role', item.id)}
          >
            <div className="card-icon-box">{item.icon}</div>
            <div className="card-info">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  const renderStep3 = () => (
    <>
      <h2 style={{fontSize: '1.5rem'}}>Current Situation?</h2>
      <div className="grid-cards two-col">
        {[
          { id: 'student', icon: '📚', label: 'Student' },
          { id: 'job-seeker', icon: '🚀', label: 'Job Seeker' },
          { id: 'employed', icon: '💼', label: 'Employed' },
          { id: 'other', icon: '➕', label: 'Other' }
        ].map(item => (
          <div 
            key={item.id}
            className={`card-select centered ${formData.currentSituation === item.id ? 'active' : ''}`}
            onClick={() => handleSelect('currentSituation', item.id)}
          >
            <div className="card-icon-box">{item.icon}</div>
            <div className="card-info"><h3>{item.label}</h3></div>
          </div>
        ))}
      </div>
    </>
  );

  const renderStep4 = () => (
    <>
      <h2 style={{fontSize: '1.5rem'}}>Primary Career Goals?</h2>
      <div className="grid-cards">
        {[
          { id: 'career_change', title: 'Career Change', desc: 'Transition to a new field.' },
          { id: 'skill_up', title: 'Skill Enhancement', desc: 'Deepen current skills.' },
          { id: 'new_job', title: 'Find a New Job', desc: 'Actively seeking opportunities.' },
          { id: 'personal', title: 'Personal Growth', desc: 'Learning for curiosity.' }
        ].map(item => (
          <div 
            key={item.id}
            className={`check-item ${formData.careerGoals.includes(item.id) ? 'active' : ''}`}
            onClick={() => handleMultiSelect('careerGoals', item.id)}
          >
            <div className="check-box-visual">{formData.careerGoals.includes(item.id) && '✓'}</div>
            <div className="card-info">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  const renderStep5 = () => (
    <>
      <div className="step-centered-header">
        <h2>Tell us about your interests & goals</h2>
        <p>This will help us personalize your learning journey.</p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <label className="section-label">What areas are you most interested in?</label>
        <span className="section-sub-label">Select all that apply</span>
        
        <div className="grid-cards two-col">
          {[
            { id: 'Business - Marketing', icon: '📢' }, 
            { id: 'IT', icon: '< >' }, 
            { id: 'Design', icon: '🎨' }, 
            { id: 'Other', icon: '•••' } 
          ].map(item => (
            <div 
              key={item.id} 
              className={`interest-card ${formData.interests.includes(item.id) ? 'active' : ''}`}
              onClick={() => handleMultiSelect('interests', item.id)}
            >
              <div className="interest-icon">{item.icon}</div>
              <span>{item.id}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="section-label">What is your primary goal for the next year?</label>
        <div style={{ marginTop: '0.75rem' }}>
          {[
            'Obtain a certification',
            'Find a suitable job',
            'Personal development',
            'Start my own business',
            'Other'
          ].map(goal => (
            <div 
              key={goal}
              className={`goal-card ${formData.primaryGoalNextYear === goal ? 'active' : ''}`}
              onClick={() => handleSelect('primaryGoalNextYear', goal)}
            >
              {goal}
            </div>
          ))}
        </div>
      </div>

      {error && <div className="error-msg" style={{ marginTop: '1rem' }}>{error}</div>}
    </>
  );

  //Load all JOB course corresponding to selected department 
  const renderStep6 = () => (
    <>
      <div className="step-centered-header">
        <h2>Choose Your Focus</h2>
        <p>Select a specific career path to enroll in.</p>
      </div>

      {isCourseLoading ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>Loading...</div>
      ) : availableCourses.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
          No courses found. You can skip this step.
        </div>
      ) : (
        <div className="grid-cards">
          {availableCourses.map(course => (
            <div 
              key={course.id} 
              className={`course-select-card ${formData.selectedCourseId === course.id ? 'active' : ''}`}
              onClick={() => handleCourseSelect(course)}
              style={{
                border: formData.selectedCourseId === course.id ? '2px solid #2563eb' : '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '1.2rem',
                cursor: 'pointer',
                backgroundColor: formData.selectedCourseId === course.id ? '#eff6ff' : 'white',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              {/* Only Title */}
              <span style={{ fontSize: '1rem', fontWeight: 600, color: '#1e293b' }}>
                {course.title}
              </span>

              {/* Selection Circle */}
              <div style={{
                width: '20px', height: '20px', borderRadius: '50%',
                border: formData.selectedCourseId === course.id ? '5px solid #2563eb' : '2px solid #cbd5e1',
                backgroundColor: 'white',
                transition: 'all 0.2s'
              }} />
            </div>
          ))}
        </div>
      )}
    </>
  );

  return (
    <div className="register-container">
      <div className={`register-card ${step > 1 ? 'wide' : ''}`}>
        <div style={{textAlign:'center', marginBottom:'1rem'}}>
          <Link to="/"><img src={logo} alt="Logo" style={{height:'40px'}} /></Link>
        </div>

        {/* Progress Bar */}
        {step > 1 && (
          <div className="step-header">
            <span className="step-count">Step {step} of {totalSteps}</span>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: `${(step / totalSteps) * 100}%` }}></div>
            </div>
          </div>
        )}

        {/* Render Steps */}
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
        {step === 5 && renderStep5()}
        {step === 6 && renderStep6()}

        {/* Footer */}
        {step > 1 && (
          <div className="action-footer">
            <button className="btn-ghost" onClick={prevStep}>Back</button>
            <button 
              className="btn-primary-foot" 
              onClick={step === totalSteps ? handleSubmit : nextStep}
              disabled={isLoading || (step === 6 && isCourseLoading)}
            >
              {isLoading ? 'Processing...' : (step === totalSteps ? 'Finish and go to Dashboard' : 'Continue')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}