import React from 'react';

// ==========================================
// 1. Form Wrapper
// ==========================================
interface FormProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  className?: string;
}

export const Form = ({ children, onSubmit, className = '' }: FormProps) => {
  return (
    <form onSubmit={onSubmit} className={`admin-form ${className}`}>
      {children}
    </form>
  );
};

// ==========================================
// 2. Input Component
// ==========================================
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = ({ label, className = '', ...props }: InputProps) => (
  <div className={`form-group ${className}`}>
    <label htmlFor={props.name}>{label}</label>
    <input id={props.name} {...props} />
  </div>
);

// ==========================================
// 3. Text Area Component
// ==========================================
interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const TextArea = ({ label, className = '', ...props }: TextAreaProps) => (
  <div className={`form-group ${className}`}>
    <label htmlFor={props.name}>{label}</label>
    <textarea id={props.name} {...props} />
  </div>
);

// ==========================================
// 4. Select Component
// ==========================================
interface Option {
  value: string | number;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
  placeholder?: string;
}

export const Select = ({ label, options, placeholder, className = '', ...props }: SelectProps) => (
  <div className={`form-group ${className}`}>
    <label htmlFor={props.name}>{label}</label>
    <select id={props.name} {...props}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

// ==========================================
// 5. Layout Helpers
// ==========================================
export const FormRow = ({ children }: { children: React.ReactNode }) => (
  <div className="form-row">
    {children}
  </div>
);

// ==========================================
// 6. Submit Button
// ==========================================
interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export const SubmitButton = ({ children, isLoading, ...props }: SubmitButtonProps) => (
  <button 
    type="submit" 
    className="btn-primary" 
    style={{ marginTop: '10px', opacity: isLoading ? 0.7 : 1 }} 
    disabled={isLoading || props.disabled}
    {...props}
  >
    {isLoading ? 'Processing...' : children}
  </button>
);