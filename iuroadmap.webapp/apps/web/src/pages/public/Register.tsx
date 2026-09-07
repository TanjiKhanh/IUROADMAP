import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useTranslation } from '../../hooks/useTranslation';
import { features, RoutePaths } from '@iuroadmap/core';
import logo from '../../assets/images/logo-gupjob-primary.png';
import gitHub from '../../assets/images/icon-github.png';
import linkedIn from '../../assets/images/icon-linkedin.png';
import { RegisterForm, MentorFormData } from '../../components/auth/RegisterForm';
import { publicService, PublicCourse } from '../../services/public.service';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  UiForm, 
  UiInputField, 
  UiButton, 
  UiCard, 
  useToast
} from '../../uikit';
import { authenticationControllerRegister, authenticationControllerRegisterMentor } from '@iuroadmap/api-gen';

const authKeys = features.auth.keys;

const registerSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(2),
  password: z.string().min(6),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast, toastContextHolder } = useToast();
  
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<'learner' | 'mentor' | ''>('');
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  
  const [availableCourses, setAvailableCourses] = useState<PublicCourse[]>([]);
  const [isCourseLoading, setIsCourseLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, trigger, getValues, formState: { errors } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', fullName: '', password: '' },
    mode: 'onTouched'
  });

  useEffect(() => {
    if (step === 3 && selectedRole === 'learner') {
      const loadCourses = async () => {
        setIsCourseLoading(true);
        try {
          const courses = await publicService.getJobCourses('general');
          if (Array.isArray(courses)) setAvailableCourses(courses);
        } catch (err) {
          toast.error('Failed to load recommended courses');
        } finally {
          setIsCourseLoading(false);
        }
      };
      loadCourses();
    }
  }, [step, selectedRole, toast]);

  const submitToServer = async (extraData: any = {}) => {
    setIsLoading(true);
    try {
      const values = getValues();
      const backendRole = selectedRole === 'mentor' ? 'MENTOR' : 'STUDENT';

      const basePayload = {
        email: values.email,
        password: values.password,
        name: values.fullName,
        role: backendRole as any,
      };

      if (backendRole === 'MENTOR') {
        await authenticationControllerRegisterMentor({ ...basePayload, ...extraData } as any);
        localStorage.setItem('mentorName', values.fullName);
        localStorage.setItem('mentorEmail', values.email);
        navigate(RoutePaths.web.mentor.applicationPending);
      } else {
        await authenticationControllerRegister(basePayload);
        navigate(RoutePaths.web.public.login, { state: { message: 'Registration successful! Please sign in.' } });
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = async () => {
    if (step === 1) {
      const isValid = await trigger();
      if (!isValid) return;
    }
    if (step === 2 && !selectedRole) {
      toast.error('Please select a role.');
      return;
    }
    if (step === 2 && selectedRole === 'mentor') {
      setStep(4);
      return;
    }
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (step === 4) setStep(2);
    else setStep(prev => Math.max(prev - 1, 1));
  };

  const handleMentorSubmit = async (mentorData: MentorFormData) => {
    toast.info('Mentor registration feature is coming soon.');
    // await submitToServer(mentorData); // Implement when ready
  };

  const currentDisplayStep = selectedRole === 'mentor' && step === 4 ? 3 : step;
  const totalDisplaySteps = 3;

  return (
    <div className="auth-page" style={{ padding: '2rem 1rem' }}>
      {toastContextHolder}
      <UiCard className={`auth-card ${step > 1 ? 'wide' : ''}`} bordered={false} style={{ maxWidth: step > 1 ? 700 : 440, margin: '0 auto', transition: 'max-width 0.3s' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <Link to="/">
            <img src={logo} alt="Logo" className="auth-logo" style={{ marginBottom: 0 }} />
          </Link>
        </div>

        {step > 1 && (
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
                Step {currentDisplayStep} of {totalDisplaySteps}
              </span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {Array.from({ length: totalDisplaySteps }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: 8, height: 8, borderRadius: '50%',
                      backgroundColor: i < currentDisplayStep ? '#4f46e5' : '#e2e8f0',
                      transition: 'all 0.3s',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <UiForm layout="vertical">
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Create Account</h2>
            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Join our community today.</p>

            <div style={{ display: 'flex', gap: 12, marginBottom: '1.5rem' }}>
              <UiButton block icon={<img src={gitHub} width={18} alt="GitHub" />}>GitHub</UiButton>
              <UiButton block icon={<img src={linkedIn} width={18} alt="LinkedIn" />}>LinkedIn</UiButton>
            </div>
            
            <div style={{ textAlign: 'center', margin: '1rem 0', color: '#94a3b8', fontSize: '0.875rem' }}>OR</div>

            <UiInputField control={control} name="email" label="Email" placeholder="name@company.com" />
            <UiInputField control={control} name="fullName" label="Full Name" placeholder="John Doe" />
            <UiInputField control={control} name="password" type="password" label="Password" placeholder="Create a password" />

            <UiButton type="primary" block size="large" onClick={nextStep} style={{ marginTop: '1rem' }}>
              Continue &rarr;
            </UiButton>

            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              {t(authKeys.register.hasAccount)}{' '}
              <Link to={RoutePaths.web.public.login}>{t(authKeys.register.login)}</Link>
            </div>
          </UiForm>
        )}

        {step === 2 && (
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>How will you be joining us?</h2>
            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Choose your primary role.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                { id: 'learner', icon: '🎓', title: "I'm a Learner", desc: "Gain skills & land jobs." },
                { id: 'mentor', icon: '💡', title: "I'm a Mentor", desc: "Guide & share expertise." }
              ].map(item => (
                <div 
                  key={item.id} 
                  onClick={() => setSelectedRole(item.id as any)}
                  style={{
                    padding: '1.5rem', borderRadius: 12, border: `2px solid ${selectedRole === item.id ? '#4f46e5' : '#e2e8f0'}`,
                    cursor: 'pointer', backgroundColor: selectedRole === item.id ? '#eff6ff' : '#fff', transition: 'all 0.2s'
                  }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{item.icon}</div>
                  <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.125rem' }}>{item.title}</h3>
                  <p style={{ margin: 0, color: '#64748b', fontSize: '0.875rem' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && selectedRole === 'learner' && (
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Confirm & Create Account</h2>
            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Select a recommended course (optional).</p>

            {isCourseLoading && <div style={{ padding: '2rem', textAlign: 'center' }}>Loading courses...</div>}

            {!isCourseLoading && availableCourses.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                {availableCourses.map(course => (
                  <div 
                    key={course.id} 
                    onClick={() => setSelectedCourseId(course.id === selectedCourseId ? null : course.id)}
                    style={{
                      padding: '1rem', borderRadius: 12, border: `2px solid ${selectedCourseId === course.id ? '#4f46e5' : '#e2e8f0'}`,
                      cursor: 'pointer', backgroundColor: selectedCourseId === course.id ? '#eff6ff' : '#fff'
                    }}
                  >
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📚</div>
                    <h3 style={{ margin: '0 0 0.25rem', fontSize: '1rem' }}>{course.title}</h3>
                  </div>
                ))}
              </div>
            )}
            
            {(!isCourseLoading && availableCourses.length === 0) && (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b', background: '#f8fafc', borderRadius: 8 }}>
                No recommended courses right now.
              </div>
            )}
          </div>
        )}

        {step === 4 && selectedRole === 'mentor' && (
          <RegisterForm isLoading={isLoading} onSubmitSuccess={handleMentorSubmit} onBack={prevStep} />
        )}

        {step > 1 && step !== 4 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
            <UiButton onClick={prevStep} disabled={isLoading}>&larr; Back</UiButton>
            
            {step === 2 && (
              <UiButton type="primary" onClick={nextStep} disabled={!selectedRole}>Next &rarr;</UiButton>
            )}

            {step === 3 && selectedRole === 'learner' && (
              <UiButton type="primary" onClick={() => submitToServer()} loading={isLoading}>
                Complete Registration
              </UiButton>
            )}
          </div>
        )}
      </UiCard>
    </div>
  );
}