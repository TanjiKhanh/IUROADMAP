import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { X } from 'lucide-react';

// 1. Define interface - Only mentor-specific fields
export interface MentorFormData {
  role: string;
  bio: string;
  cvUrl: string;
  linkedinUrl: string;
  industry: string;
  skills: string[];
}

// 2. Validation schema matching mentor fields only
const mentorSchema = yup.object().shape({
  role: yup.string()
    .required('Role is required'),
  bio: yup.string()
    .required('Bio is required')
    .min(10, 'Bio must be at least 10 characters'),
  cvUrl: yup.string()
    .matches(/^https?:\/\/.+/, 'Must be a valid URL')
    .required('CV URL is required'),
  linkedinUrl: yup.string()
    .matches(/^https:\/\/(www\.)?linkedin\.com\/.*$/, 'Must be a valid LinkedIn URL')
    .required('LinkedIn URL is required'),
  industry: yup.string()
    .required('Industry is required'),
  skills: yup.array()
    .of(yup.string().required('Skill cannot be empty'))
    .min(1, 'Add at least one skill')
    .required('Skills are required'),
});

// 3. Component Props
interface RegisterFormProps {
  isLoading: boolean;
  onSubmitSuccess: (data: MentorFormData) => Promise<void> | void;
  onBack: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ isLoading, onSubmitSuccess, onBack }) => {
  const [skillInput, setSkillInput] = useState('');
  const [apiError, setApiError] = useState<string | null>(null); // ✅ Added API error state

  const { register, handleSubmit, watch, setValue, formState: { errors, isValid } } = useForm<MentorFormData>({
    resolver: yupResolver(mentorSchema) as any,
    mode: 'onChange',
    defaultValues: {
      role: 'MENTOR',
      bio: '',
      cvUrl: '',
      linkedinUrl: '',
      industry: '',
      skills: [],
    },
  });

  const currentSkills = watch('skills');

  const handleAddSkill = () => {
    if (skillInput.trim() && !currentSkills.includes(skillInput.trim())) {
      setValue('skills', [...currentSkills, skillInput.trim()], { shouldValidate: true });
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (index: number) => {
    setValue('skills', currentSkills.filter((_, i) => i !== index), { shouldValidate: true });
  };

  // ✅ UPDATE: Wrap onSubmitSuccess to catch errors
  const handleFormSubmit = async (data: MentorFormData) => {
    setApiError(null);
    try {
      await onSubmitSuccess(data);
    } catch (err: any) {
      setApiError(err?.message || 'Failed to submit form');
      console.error('RegisterForm submission error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} style={{ animation: 'fadeIn 0.3s ease-in' }}>
      
      <div className="step-centered-header" style={{ marginBottom: '1.5rem' }}>
        <h2>Mentor Verification</h2>
        <p>Provide your professional details to join as an expert.</p>
      </div>

      {/* ✅ ADD ERROR MESSAGE DISPLAY */}
      {apiError && (
        <div style={{ backgroundColor: '#fee', border: '1px solid #fcc', color: '#c00', padding: '12px', borderRadius: '4px', marginBottom: '1rem' }}>
          ⚠️ {apiError}
        </div>
      )}

      <div className="reg-form">
        
        {/* Role (Hidden/Fixed) */}
        <input type="hidden" {...register('role')} value="MENTOR" />

        {/* LinkedIn URL Input */}
        <label className="reg-label">
          LinkedIn Profile URL
          <input 
            className="reg-input" 
            style={{ borderColor: errors.linkedinUrl ? '#ef4444' : '' }}
            placeholder="https://www.linkedin.com/in/yourprofile" 
            {...register('linkedinUrl')} 
          />
          {errors.linkedinUrl && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{errors.linkedinUrl.message}</span>}
        </label>

        {/* Industry Input */}
        <label className="reg-label" style={{ marginTop: '1rem' }}>
          Industry
          <input 
            className="reg-input" 
            style={{ borderColor: errors.industry ? '#ef4444' : '' }}
            placeholder="e.g. Software Engineering, Marketing" 
            {...register('industry')} 
          />
          {errors.industry && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{errors.industry.message}</span>}
        </label>

        {/* Skills Input */}
        <div style={{ marginTop: '1rem' }}>
          <label className="reg-label" style={{ display: 'block', marginBottom: '0.5rem' }}>
            Skills (Add at least 1)
          </label>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <input 
              type="text"
              className="reg-input" 
              style={{ flex: 1, borderColor: errors.skills ? '#ef4444' : '' }}
              placeholder="e.g. NestJS, Node.js, PostgreSQL, Docker" 
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
            />
            <button
              type="button"
              onClick={handleAddSkill}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                fontWeight: 500,
              }}
            >
              Add
            </button>
          </div>
          
          {/* Skills Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
            {currentSkills.map((skill, index) => (
              <div 
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: '#dbeafe',
                  color: '#1e40af',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                }}
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(index)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    color: '#1e40af',
                  }}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
          {errors.skills && <span style={{ color: '#ef4444', fontSize: '0.8rem', display: 'block' }}>{errors.skills.message}</span>}
        </div>

        {/* Bio Description */}
        <label className="reg-label" style={{ marginTop: '1rem', display: 'block' }}>
          Professional Bio
          <textarea 
            className="reg-input"
            placeholder="Tell us about your expertise and experience as a mentor..."
            style={{ minHeight: '120px', width: '100%', resize: 'vertical', borderColor: errors.bio ? '#ef4444' : '' }}
            {...register('bio')} 
          />
          {errors.bio && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{errors.bio.message}</span>}
        </label>

        {/* CV URL Input */}
        <label className="reg-label" style={{ marginTop: '1rem' }}>
          Resume / CV URL
          <input 
            className="reg-input" 
            style={{ borderColor: errors.cvUrl ? '#ef4444' : '' }}
            placeholder="https://example.com/your-cv.pdf" 
            {...register('cvUrl')} 
          />
          {errors.cvUrl && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{errors.cvUrl.message}</span>}
        </label>

      </div>

      <div className="action-footer" style={{ marginTop: '2rem' }}>
        <button type="button" className="btn-ghost" onClick={onBack} disabled={isLoading}>
          Back
        </button>
        <button 
          type="submit" 
          className="btn-primary-foot"
          disabled={!isValid || isLoading} 
          style={{ opacity: (!isValid || isLoading) ? 0.6 : 1, cursor: (!isValid || isLoading) ? 'not-allowed' : 'pointer' }}
        >
          {isLoading ? 'Processing...' : 'Submit Verification'}
        </button>
      </div>

    </form>
  );
};