import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminService, Major } from '../../services/admin.service';
import Header from '../../components/layouts/Header';
import { Form, Input, TextArea, SubmitButton } from '../../components/ui/Forms';
import { useForm } from '../../hooks/useForm';

export default function ManageRoadmaps() {
  const navigate = useNavigate();
  const [majors, setMajors] = useState<Major[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingMajor, setEditingMajor] = useState<Major | null>(null);

  const { values, handleChange, resetForm, setValues } = useForm({
    name: '',
    description: '',
    totalCreditsRequired: '',
  });

  const loadMajors = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAdminMajors();
      setMajors(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load majors', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMajors();
  }, []);

  const handleEditClick = (major: Major) => {
    setEditingMajor(major);
    setValues({
      name: major.name,
      description: major.description || '',
      totalCreditsRequired: String(major.totalCreditsRequired ?? ''),
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingMajor(null);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMajor) {
      alert('Please choose a major to edit.');
      return;
    }

    const credits = Number(values.totalCreditsRequired);
    if (!Number.isFinite(credits) || credits < 0) {
      alert('Total credits required must be a valid non-negative number.');
      return;
    }

    setSubmitting(true);
    try {
      await adminService.updateAdminMajor(editingMajor.slug, {
        name: values.name,
        description: values.description,
        totalCreditsRequired: credits,
      });

      alert('Major updated successfully.');
      handleCancelEdit();
      loadMajors();
    } catch (err: any) {
      alert(`Error: ${err.response?.data?.message || err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header 
        title="Manage Majors" 
        subtitle="Select a major, update its metadata, then open the roadmap canvas"
      />

      <div className="admin-content-area">
        <div className="admin-grid">

          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3>{editingMajor ? `Edit Major: ${editingMajor.slug}` : 'Select a Major to Edit'}</h3>

              {editingMajor && (
                <button 
                  type="button" 
                  onClick={handleCancelEdit}
                  style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '0.9rem' }}
                >
                  Cancel
                </button>
              )}
            </div>

            {!editingMajor && (
              <p style={{ marginTop: 0, marginBottom: '16px', color: '#64748b' }}>
                Choose a major from the list on the right to edit basic information.
              </p>
            )}

            <Form onSubmit={handleSubmit}>
              <Input 
                label="Major Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="e.g. Computer Science"
                required
                disabled={!editingMajor}
              />

              <Input
                label="Total Credits Required"
                name="totalCreditsRequired"
                type="number"
                min={0}
                value={values.totalCreditsRequired}
                onChange={handleChange}
                required
                disabled={!editingMajor}
              />

              <TextArea 
                label="Description"
                name="description"
                value={values.description}
                onChange={handleChange}
                placeholder="Brief overview of this major"
                style={{ minHeight: '100px' }}
                disabled={!editingMajor}
              />

              <SubmitButton isLoading={submitting} disabled={!editingMajor}>
                Update Major
              </SubmitButton>
            </Form>
          </div>

          <div className="card">
            <h3>Majors</h3>
            {loading ? <p>Loading...</p> : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name / Slug</th>
                    <th>Credits Required</th>
                    <th>Total Courses</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {majors.map((major) => {
                    return (
                      <tr key={major.id} style={{ background: editingMajor?.id === major.id ? '#f0f9ff' : 'transparent' }}>
                        <td>
                          <strong>{major.name}</strong><br />
                          <code style={{ fontSize: '0.8rem', color: '#666' }}>{major.slug}</code>
                        </td>
                        <td>{major.totalCreditsRequired ?? '-'}</td>
                        <td>{major.totalCourses ?? '-'}</td>
                        <td>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                              type="button"
                              title="Open roadmap designer"
                              onClick={() => navigate(`/admin/roadmaps/design/${major.slug}`)}
                              style={{
                                background: '#ecfdf5',
                                color: '#059669',
                                border: 'none',
                                borderRadius: '6px',
                                width: '32px',
                                height: '32px',
                                cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                              }}
                            >
                              C
                            </button>

                            <button 
                              type="button"
                              onClick={() => handleEditClick(major)}
                              title="Edit major"
                              style={{
                                background: '#e0e7ff',
                                color: '#4338ca',
                                border: 'none',
                                borderRadius: '6px',
                                width: '32px',
                                height: '32px',
                                cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                              }}
                            >
                              E
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {majors.length === 0 && (
                    <tr>
                      <td colSpan={4} style={{ textAlign: 'center', padding: '20px' }}>
                        No majors found.
                      </td>
                    </tr>
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