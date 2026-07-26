import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { authService } from '../../services/auth.service';
import '../../styles/Register.css';
import { MentorRegisterPayload } from '../../services/auth.service';

// Asset Import
import logo from '../../assets/images/logo-gupjob-primary.png';
import gitHub from '../../assets/images/icon-github.png';
import linkedIn from '../../assets/images/icon-linkedin.png';

import { PublicCourse, publicService } from '../../services/public.service';
import { RegisterForm, MentorFormData } from '../../components/auth/RegisterForm';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    password: '',
    role: '',
    priorityJob: '',
    selectedCourseId: null as number | null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // --- LOAD RECOMMENDED COURSES ---
  const [availableCourses, setAvailableCourses] = useState<PublicCourse[]>([]);
  const [isCourseLoading, setIsCourseLoading] = useState(false);

  useEffect(() => {
    // Load courses for learners at step 3
    if (step === 3 && formData.role === 'learner') {
      const loadCourses = async () => {
        setIsCourseLoading(true);
        try {
          const courses = await publicService.getJobCourses('general');
          if (Array.isArray(courses)) {
            setAvailableCourses(courses);
          }
        } catch (err) {
          console.error('Error loading courses', err);
        } finally {
          setIsCourseLoading(false);
        }
      };
      loadCourses();
    }
  }, [step, formData.role]);

  // --- CORE API SUBMIT LOGIC ---
  const submitToServer = async (extraData: any) => {
    setIsLoading(true);
    setError(null);
    try {
      // Map frontend roles to backend expected enums
      let backendRole = 'STUDENT';
      if (formData.role === 'mentor') backendRole = 'MENTOR';

      const basePayload = {
        email: formData.email,
        password: formData.password,
        name: formData.fullName,
        role: backendRole,
      };

      let payload: any;

      if (backendRole === 'MENTOR') {
            payload = { ...basePayload, ...extraData } as MentorRegisterPayload;
            console.log('🚀 Calling MENTOR API with payload:', payload);
            const response = await authService.registerMentor(payload);
            console.log('✅ Mentor registration successful:', response);
          } else {
            payload = basePayload;
            console.log('🚀 Calling LEARNER API with payload:', payload);
            const response = await authService.register(payload);
            console.log('✅ Learner registration successful:', response);
          }

          // ROUTING BRANCH:
          if (backendRole === 'MENTOR') {
            localStorage.setItem('mentorName', formData.fullName);
            localStorage.setItem('mentorEmail', formData.email);
            console.log('📍 Navigating to /application-pending');
            navigate('/application-pending');
          } else {
            navigate('/login', { state: { message: 'Registration successful! Please login with your credentials.' } });
          }

        } catch (err: any) {
          const errorMsg = err.response?.data?.message || err.message || 'Registration failed';
          setError(errorMsg);
          console.error('❌ Registration error:', {
            status: err.response?.status,
            message: err.message,
            data: err.response?.data,
            fullError: err
          });
    } finally {
      setIsLoading(false);
    }
  };
  
  // --- HANDLERS ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSelect = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCourseSelect = (course: PublicCourse) => {
    setFormData((prev) => {
      if (prev.selectedCourseId === course.id) {
        return { ...prev, selectedCourseId: null, priorityJob: '' };
      }
      return {
        ...prev,
        selectedCourseId: course.id,
        priorityJob: course.slug,
      };
    });
  };

  // --- STEP NAVIGATION ---
  const nextStep = () => {
    if (step === 1 && (!formData.email || !formData.fullName || !formData.password)) {
      setError('Please fill in all fields.');
      return;
    }
    if (step === 2) {
      if (!formData.role) {
        setError('Please select a role.');
        return;
      }
      if (formData.role === 'mentor') {
        setError(null);
        setStep(4);
        return;
      }
    }
    setError(null);
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (step === 4) {
      setStep(2);
    } else {
      setStep((prev) => Math.max(prev - 1, 1));
    }
  };

  // --- SPECIFIC SUBMIT HANDLERS ---
  const handleSubmit = async () => {
    await submitToServer({});
  };

  const handleMentorSubmit = async (mentorData: MentorFormData) => {
    // Mentor registration is an upcoming feature in this flow.
    setError('This is an upcoming feature.');
    return;
  };

  // --- DYNAMIC PROGRESS BAR LOGIC ---
  const getProgressInfo = () => {
    // Mentor path: Auth -> Role -> Mentor Form (3 steps total)
    if (formData.role === 'mentor') {
      const displayStep = step === 4 ? 3 : step; // Map internal step 4 to display step 3
      return { currentDisplayStep: displayStep, totalDisplaySteps: 3 };
    }
    // Learner/default path: 3 steps
    return { currentDisplayStep: step, totalDisplaySteps: 3 };
  };

  const { currentDisplayStep, totalDisplaySteps } = getProgressInfo();

  // --- RENDER FUNCTIONS ---
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
          { id: 'mentor', icon: '💡', title: "I'm a Mentor", desc: "Guide & share expertise." }
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

  

  return (
    <div className="register-container">
      {/* Container is wide if we are past step 1 */}
      <div className={`register-card ${step > 1 ? 'wide' : ''}`}>
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <Link to="/">
            <img src={logo} alt="Logo" className="register-logo" />
          </Link>
        </div>

        {/* Dynamic Progress Bar (Visible for Steps > 1) */}
        {step > 1 && (
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
                Step {currentDisplayStep} of {totalDisplaySteps}
              </span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {Array.from({ length: totalDisplaySteps }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: i < currentDisplayStep ? '#2563eb' : '#e2e8f0',
                      transition: 'all 0.3s',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 4 && error && <div className="error-msg" style={{ marginBottom: '1rem' }}>{error}</div>}

          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && formData.role === 'learner' && (
            <>
              <h2 style={{fontSize: '1.25rem', marginBottom: '0.5rem'}}>Confirm & Create Account</h2>
              <p style={{color:'#64748b'}}>Select a recommended course (optional) and complete your registration.</p>

              {isCourseLoading && <div style={{padding:'1rem'}}>Loading courses...</div>}

              {!isCourseLoading && availableCourses.length > 0 && (
                <div className="grid-cards" style={{marginTop:'1rem'}}>
                  {availableCourses.map(course => (
                    <div key={course.id} className={`card-select ${formData.selectedCourseId === course.id ? 'active' : ''}`} onClick={() => handleCourseSelect(course)}>
                      <div className="card-icon-box">📚</div>
                      <div className="card-info">
                        <h3>{course.title}</h3>
                        <p style={{fontSize:'0.9rem', color:'#64748b'}}>{course.slug || course.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {(!isCourseLoading && availableCourses.length === 0) && (
                <div style={{padding:'1rem', color:'#64748b'}}>No recommended courses available right now.</div>
              )}
            </>
          )}

          {step === 4 && (
            <RegisterForm isLoading={isLoading} onSubmitSuccess={handleMentorSubmit} onBack={prevStep} />
          )}

        {/* Navigation Buttons */}
        {step > 1 && (
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', justifyContent: 'space-between' }}>
            
            {/* Back Button (Hidden on Step 4 since RegisterForm handles it) */}
            {step !== 4 && (
               <button className="btn-ghost" onClick={prevStep} disabled={isLoading}>
                 ← Back
               </button>
            )}

            {/* Next Button */}
            {step === 2 && (
              <button className="btn-primary" onClick={nextStep}>
                Next →
              </button>
            )}

            {/* Submit Button: Show on Step 3 for Learners */}
            {(step === 3 && formData.role === 'learner') && (
              <button
                className="btn-primary"
                onClick={handleSubmit}
                disabled={isLoading || isCourseLoading}
                style={{ opacity: isLoading || isCourseLoading ? 0.6 : 1 }}
              >
                {isLoading ? 'Creating Account...' : 'Complete Registration'}
              </button>
            )}
            
          </div>
        )}
      </div>
    </div>
  );
}