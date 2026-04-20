import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/layouts/Header';
import Notification from '../../components/ui/Notification';
import { Form, Input, TextArea, SubmitButton } from '../../components/ui/Forms';
import { useForm } from '../../hooks/useForm';
import { adminService, Course } from '../../services/admin.service';
import '../../styles/ManageCourse.css';

const SCROLLBAR_AUTO_HIDE_MS = 2500;

export default function ManageCourse() {
  const navigate = useNavigate();
  const hideScrollbarTimer = useRef<number | null>(null);

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [showScrollbar, setShowScrollbar] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    title: string;
    message?: string;
  } | null>(null);

  const { values, handleChange, resetForm, setValues } = useForm({
    slug: '',
    name: '',
    credits: '',
    description: '',
  });

  const clearScrollTimer = () => {
    if (hideScrollbarTimer.current) {
      window.clearTimeout(hideScrollbarTimer.current);
      hideScrollbarTimer.current = null;
    }
  };

  const revealScrollbar = () => {
    setShowScrollbar(true);
    clearScrollTimer();
    hideScrollbarTimer.current = window.setTimeout(() => {
      setShowScrollbar(false);
    }, SCROLLBAR_AUTO_HIDE_MS);
  };

  useEffect(() => {
    return () => {
      clearScrollTimer();
    };
  }, []);

  const closeNotification = () => setNotification(null);

  const handleFailure = (message: string) => {
    setNotification({
      type: 'error',
      title: 'Error',
      message,
    });
  };

  const handleSuccess = (message: string) => {
    setNotification({
      type: 'success',
      title: 'Success',
      message,
    });
  };

  const loadCourses = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAllCourses();
      setCourses(Array.isArray(data) ? data : []);
    } catch (error: any) {
      handleFailure(error?.response?.data?.message || 'Failed to load courses.');
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleEditClick = (course: Course) => {
    setEditingCourse(course);
    setValues({
      slug: course.slug,
      name: course.name,
      credits: String(course.credits),
      description: course.description || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingCourse(null);
    resetForm();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!editingCourse) {
      handleFailure('Please choose a course to edit.');
      return;
    }

    const credits = Number(values.credits);
    if (!Number.isFinite(credits) || credits < 0) {
      handleFailure('Credits must be a valid non-negative number.');
      return;
    }

    setSubmitting(true);
    try {
      await adminService.updateCourseNodeMeta(editingCourse.id, {
        slug: values.slug.trim(),
        name: values.name.trim(),
        credits,
        description: values.description.trim() || undefined,
      });

      handleSuccess('Course updated successfully.');
      handleCancelEdit();
      await loadCourses();
    } catch (error: any) {
      handleFailure(error?.response?.data?.message || 'Failed to update course.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header
        title="Manage Courses"
        subtitle="Edit course metadata and open topic roadmap editor"
      />

      {notification && (
        <Notification
          type={notification.type}
          title={notification.title}
          message={notification.message}
          duration={4000}
          onClose={closeNotification}
        />
      )}

      <div className="admin-content-area">
        <div className="admin-grid">
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
              <h3>{editingCourse ? `Edit Course: ${editingCourse.slug}` : 'Select a Course to Edit'}</h3>
              {editingCourse && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '0.9rem' }}
                >
                  Cancel
                </button>
              )}
            </div>

            {!editingCourse && (
              <p style={{ marginTop: 0, marginBottom: 16, color: '#64748b' }}>
                Choose a course from the list to edit basic metadata.
              </p>
            )}

            <Form onSubmit={handleSubmit}>
              <Input
                label="Course Slug"
                name="slug"
                value={values.slug}
                onChange={handleChange}
                placeholder="e.g. oop"
                required
                disabled={!editingCourse}
              />

              <Input
                label="Course Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="e.g. Object-Oriented Programming"
                required
                disabled={!editingCourse}
              />

              <Input
                label="Credits"
                name="credits"
                type="number"
                min={0}
                value={values.credits}
                onChange={handleChange}
                required
                disabled={!editingCourse}
              />

              <TextArea
                label="Description"
                name="description"
                value={values.description}
                onChange={handleChange}
                placeholder="Brief description of the course"
                disabled={!editingCourse}
                style={{ minHeight: 100 }}
              />

              <SubmitButton isLoading={submitting} disabled={!editingCourse}>
                Update Course
              </SubmitButton>
            </Form>
          </div>

          <div className="card">
            <h3>Courses</h3>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div
                className={`course-list-scroll-wrap ${showScrollbar ? 'show-scrollbar' : ''}`}
                onScroll={revealScrollbar}
                onMouseEnter={revealScrollbar}
              >
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Course</th>
                      <th>Roadmap</th>
                      <th>Credits</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course) => (
                      <tr key={course.id} style={{ background: editingCourse?.id === course.id ? '#f0f9ff' : 'transparent' }}>
                        <td>
                          <strong>{course.name}</strong>
                          <br />
                          <code style={{ fontSize: '0.8rem', color: '#64748b' }}>{course.slug}</code>
                        </td>
                        <td>
                          <strong>{course.roadmapName}</strong>
                          <br />
                          <code style={{ fontSize: '0.8rem', color: '#64748b' }}>{course.roadmapSlug}</code>
                        </td>
                        <td>{course.credits}</td>
                        <td>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <button
                              type="button"
                              title="Open topic roadmap designer"
                              onClick={() => navigate(`/admin/courses/${course.id}/topics`)}
                              style={{
                                background: '#ecfdf5',
                                color: '#059669',
                                border: 'none',
                                borderRadius: 6,
                                width: 32,
                                height: 32,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              T
                            </button>

                            <button
                              type="button"
                              title="Edit course"
                              onClick={() => handleEditClick(course)}
                              style={{
                                background: '#e0e7ff',
                                color: '#4338ca',
                                border: 'none',
                                borderRadius: 6,
                                width: 32,
                                height: 32,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              E
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {courses.length === 0 && (
                      <tr>
                        <td colSpan={4} style={{ textAlign: 'center', padding: 20 }}>
                          No courses found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
