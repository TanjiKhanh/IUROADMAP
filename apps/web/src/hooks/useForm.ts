import { useState, useCallback } from 'react';

export function useForm<T>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);

  // 1. Generic Change Handler
  // Works for <input>, <textarea>, and <select>
  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // 2. Manual Set Value (Useful for custom widgets or clearing specific fields)
  const setFieldValue = useCallback((name: keyof T, value: any) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // 3. Reset to Initial State
  const resetForm = useCallback(() => {
    setValues(initialValues);
  }, [initialValues]);

  return {
    values,
    handleChange,
    setFieldValue,
    resetForm,
    setValues, // Exposed in case you need to load data from an API (Edit Mode)
  };
}