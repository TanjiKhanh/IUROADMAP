import React, { useState, useEffect } from 'react';
import { adminService, Department } from '../../services/admin.service';
import Header from '../../components/layouts/Header';
import { Form, Input, TextArea, SubmitButton } from '../../components/ui/Forms';
import { useForm } from '../../hooks/useForm';

export default function ManageDepartments() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [notice, setNotice] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Department | null>(null);
  
  // 🆕 Track Edit Mode
  const [editingId, setEditingId] = useState<number | null>(null);

  // 1. Initialize Form Hook (Get 'setValues' to populate form manually)
  const { values, handleChange, resetForm, setValues } = useForm({
    name: '',
    slug: '',
    description: ''
  });

  // 2. Fetch Data
  const loadDepartments = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAllDepartments();
      setDepartments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load departments', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  // 🆕 Handle "Edit" Click
  const handleEditClick = (dept: Department) => {
    setEditingId(dept.id!);
    setValues({
      name: dept.name,
      slug: dept.slug,
      description: dept.description || ''
    });
    // Scroll up to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 🆕 Handle "Cancel" Click
  const handleCancelEdit = () => {
    setEditingId(null);
    resetForm();
  };

  const showNotice = (type: 'success' | 'error', message: string) => {
    setNotice({ type, message });
    window.setTimeout(() => setNotice((current) => (current?.message === message ? null : current)), 3500);
  };

  const getFriendlyErrorMessage = (err: any, action: string) => {
    const backendMessage = err?.response?.data?.message;
    if (backendMessage) {
      return Array.isArray(backendMessage) ? backendMessage.join(', ') : backendMessage;
    }

    if (err?.response?.status === 502) {
      return `The department service is unavailable right now, so ${action} could not be completed.`;
    }

    return `Something went wrong while trying to ${action}. Please try again.`;
  };

  // 3. Handle Submit (Create OR Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingId !== null) {
        // UPDATE
        await adminService.updateDepartment(editingId, values);
        showNotice('success', 'Department updated successfully.');
      } else {
        // CREATE
        await adminService.createDepartment(values);
        showNotice('success', 'Department created successfully.');
      }
      
      handleCancelEdit(); // Reset form and mode
      loadDepartments(); // Refresh list
    } catch (err: any) {
      showNotice(
        'error',
        getFriendlyErrorMessage(err, editingId !== null ? 'update this department' : 'create this department'),
      );
    } finally {
      setSubmitting(false);
    }
  };

  // 4. Handle Delete
  const handleDelete = async (id: number) => {
    try {
      setDeleting(true);
      await adminService.deleteDepartment(id);
      showNotice('success', 'Department deleted successfully.');
      loadDepartments();
      // If deleting the item currently being edited, cancel edit mode
      if (editingId === id) handleCancelEdit();
      setPendingDelete(null);
    } catch (err: any) {
      showNotice('error', getFriendlyErrorMessage(err, 'delete this department'));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <Header 
        title="Manage Departments 📂" 
        subtitle="Create and configure your learning domains"
      />

          {notice && (
            <div
              style={{
                marginBottom: '16px',
                padding: '14px 16px',
                borderRadius: '12px',
                border: notice.type === 'success' ? '1px solid #bbf7d0' : '1px solid #fecaca',
                background: notice.type === 'success' ? '#f0fdf4' : '#fef2f2',
                color: notice.type === 'success' ? '#166534' : '#991b1b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.1rem' }}>
                  {notice.type === 'success' ? '✅' : '⚠️'}
                </span>
                <span>{notice.message}</span>
              </div>
              <button
                type="button"
                onClick={() => setNotice(null)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: 'inherit',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  lineHeight: 1,
                }}
                aria-label="Dismiss notification"
              >
                ✕
              </button>
            </div>
          )}

      <div className="admin-content-area">
        <div className="admin-grid">
          
          {/* --- FORM SECTION --- */}
          <div className="card">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px'}}>
              <h3>{editingId ? 'Edit Department' : 'Add New Department'}</h3>
              
              {/* 🆕 Cancel Button */}
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
                label="Department Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="e.g. Computer Science"
                required
              />

              <Input 
                label="Slug"
                name="slug"
                value={values.slug}
                onChange={handleChange}
                placeholder="e.g. computer-science"
                required
              />

              <TextArea 
                label="Description"
                name="description"
                value={values.description}
                onChange={handleChange}
                placeholder="Short description..."
              />

              <SubmitButton isLoading={submitting}>
                {editingId ? 'Update Department' : '+ Create Department'}
              </SubmitButton>
            </Form>
          </div>

          {/* --- LIST TABLE --- */}
          <div className="card">
            <h3>Existing Departments</h3>
            {loading ? <p>Loading...</p> : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Slug</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map(dept => (
                    <tr key={dept.id} style={{background: editingId === dept.id ? '#f0f9ff' : 'transparent'}}>
                      <td>{dept.id}</td>
                      <td><strong>{dept.name}</strong></td>
                      <td><code>{dept.slug}</code></td>
                      <td>
                        <div style={{display: 'flex', gap: '8px'}}>
                          {/* 🆕 Edit Button */}
                          <button 
                            className="btn-icon"
                            onClick={() => handleEditClick(dept)}
                            title="Edit"
                            style={{
                              background: '#e0e7ff', color: '#4338ca', border: 'none', 
                              borderRadius: '6px', width: '32px', height: '32px', cursor: 'pointer',
                              display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}
                          >
                            ✏️
                          </button>

                          <button 
                            className="btn-danger-sm" 
                            onClick={() => setPendingDelete(dept)}
                            title="Delete"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {departments.length === 0 && (
                    <tr><td colSpan={4}>No departments found.</td></tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

        </div>
      </div>

      {pendingDelete && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '16px',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '460px',
              background: '#ffffff',
              borderRadius: '14px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 12px 28px rgba(15, 23, 42, 0.2)',
              padding: '20px',
            }}
          >
            <h3 style={{ margin: '0 0 8px', color: '#0f172a' }}>Delete Department?</h3>
            <p style={{ margin: 0, color: '#475569', lineHeight: 1.5 }}>
              You are about to delete <strong>{pendingDelete.name}</strong>. This may affect linked courses and roadmaps.
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '18px' }}>
              <button
                type="button"
                onClick={() => setPendingDelete(null)}
                disabled={deleting}
                style={{
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  color: '#334155',
                  borderRadius: '8px',
                  padding: '8px 14px',
                  cursor: deleting ? 'not-allowed' : 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(pendingDelete.id!)}
                disabled={deleting}
                style={{
                  border: 'none',
                  background: '#dc2626',
                  color: '#ffffff',
                  borderRadius: '8px',
                  padding: '8px 14px',
                  cursor: deleting ? 'not-allowed' : 'pointer',
                  opacity: deleting ? 0.7 : 1,
                }}
              >
                {deleting ? 'Deleting...' : 'Delete Department'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}