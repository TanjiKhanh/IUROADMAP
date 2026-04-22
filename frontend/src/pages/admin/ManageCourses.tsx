import React, { useState, useEffect } from 'react';
import { adminService, Course, Department } from '../../services/admin.service';
import Header from '../../components/layouts/Header';
import { Form, Input, Select, TextArea, FormRow, SubmitButton } from '../../components/ui/Forms';
import { useForm } from '../../hooks/useForm';

export default function ManageCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // 🆕 Track if we are editing
  const [editingId, setEditingId] = useState<number | null>(null);

  // Initialize Form Hook
  const { values, handleChange, resetForm, setValues } = useForm({
    title: '',
    slug: '',
    type: 'BASIC',
    departmentId: '', // Select inputs usually use strings
    description: ''
  });

  // Fetch Data
  const loadData = async () => {
    try {
      setLoading(true);
      const [courseData, deptData] = await Promise.all([
        adminService.getAllCourses(),
        adminService.getAllDepartments()
      ]);
      setCourses(Array.isArray(courseData) ? courseData : []);
      setDepartments(Array.isArray(deptData) ? deptData : []);
    } catch (err) {
      console.error('Failed to load data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // 🆕 Handle "Edit" Click
  const handleEditClick = (course: Course) => {
    setEditingId(course.id!);
    // Populate form with course data
    setValues({
      title: course.title,
      slug: course.slug,
      type: course.type,
      departmentId: String(course.departmentId), // Ensure it's a string for the <select>
      description: course.description || ''
    });
    // Scroll to top to see form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 🆕 Handle "Cancel" Click
  const handleCancelEdit = () => {
    setEditingId(null);
    resetForm();
  };

  // Handle Submit (Create OR Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.departmentId) return alert("Please select a department");

    setSubmitting(true);
    try {
      const payload: any = {
        ...values,
        departmentId: Number(values.departmentId)
      };

      if (editingId) {
        // 🆕 UPDATE Logic
        await adminService.updateCourse(editingId, payload);
        alert('✅ Course updated successfully!');
      } else {
        // CREATE Logic
        await adminService.createCourse(payload);
        alert('✅ Course created successfully!');
      }
      
      handleCancelEdit(); // Reset everything
      loadData(); // Refresh list
    } catch (err: any) {
      alert(`❌ Error: ${err.response?.data?.message || err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await adminService.deleteCourse(id);
      loadData();
      // If we deleted the course currently being edited, reset form
      if (editingId === id) handleCancelEdit();
    } catch (err) {
      console.error(err);
      alert("Failed to delete course");
    }
  };

  const deptOptions = departments.map(d => ({ value: d.id!, label: d.name }));
  const typeOptions = [
    { value: 'BASIC', label: 'Basic' },
    { value: 'JOB', label: 'Job Oriented' }
  ];

  return (
    <>
      <Header 
        title="Manage Courses 📚" 
        subtitle="Create, edit, and assign courses to departments"
      />

      <div className="admin-content-area">
        <div className="admin-grid">
          
          {/* --- FORM SECTION --- */}
          <div className="card">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px'}}>
              <h3>{editingId ? 'Edit Course' : 'Add New Course'}</h3>
              
              {/* 🆕 Cancel Button (Only visible when editing) */}
              {editingId && (
                <button 
                  type="button" 
                  onClick={handleCancelEdit}
                  style={{background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '0.9rem'}}
                >
                  Cancel ✕
                </button>
              )}
            </div>

            <Form onSubmit={handleSubmit}>
              <Input 
                label="Course Title"
                name="title"
                value={values.title}
                onChange={handleChange}
                placeholder="e.g. Intro to React"
                required
              />
              
              <Input 
                label="Slug"
                name="slug"
                value={values.slug}
                onChange={handleChange}
                placeholder="e.g. intro-to-react"
                required
              />

              <FormRow>
                <Select 
                  label="Type"
                  name="type"
                  value={values.type}
                  onChange={handleChange}
                  options={typeOptions}
                />

                <Select 
                  label="Department"
                  name="departmentId"
                  value={values.departmentId}
                  onChange={handleChange}
                  options={deptOptions}
                  placeholder="-- Select Dept --"
                  required
                />
              </FormRow>

              <TextArea 
                label="Description"
                name="description"
                value={values.description}
                onChange={handleChange}
                placeholder="What will students learn?"
              />

              <SubmitButton isLoading={submitting}>
                {editingId ? 'Update Course' : '+ Create Course'}
              </SubmitButton>
            </Form>
          </div>

          {/* --- LIST TABLE --- */}
          <div className="card">
            <h3>Course Library</h3>
            {loading ? <p>Loading...</p> : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Title / Slug</th>
                    <th>Type</th>
                    <th>Dept ID</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map(c => (
                    <tr key={c.id} style={{background: editingId === c.id ? '#f0f9ff' : 'transparent'}}>
                      <td>
                        <strong>{c.title}</strong><br/>
                        <code style={{fontSize:'0.8rem', color:'#666'}}>{c.slug}</code>
                      </td>
                      <td>
                        <span className={`badge ${c.type === 'JOB' ? 'job' : 'basic'}`}>
                          {c.type}
                        </span>
                      </td>
                      <td>{c.departmentId}</td>
                      <td>
                        <div style={{display: 'flex', gap: '8px'}}>
                          {/* 🆕 Edit Button */}
                          <button 
                            className="btn-icon"
                            onClick={() => handleEditClick(c)}
                            title="Edit"
                            style={{
                              background: '#e0e7ff', color: '#4338ca', border: 'none', 
                              borderRadius: '6px', width: '32px', height: '32px', cursor: 'pointer'
                            }}
                          >
                            ✏️
                          </button>

                          <button 
                            className="btn-danger-sm" 
                            onClick={() => handleDelete(c.id!)}
                            title="Delete"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {courses.length === 0 && (
                     <tr><td colSpan={4} style={{textAlign: 'center', padding: '20px'}}>No courses found.</td></tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

        </div>
      </div>
    </>
  );
}