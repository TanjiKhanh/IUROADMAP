import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // 👈 Needed for the Visual Designer link
import { adminService, Roadmap, Course } from '../../services/admin.service';
import Header from '../../components/layouts/Header';
import { Form, Input, Select, TextArea, FormRow, SubmitButton } from '../../components/ui/Forms';
import { useForm } from '../../hooks/useForm';

export default function ManageRoadmaps() {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [courses, setCourses] = useState<Course[]>([]); 
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // Track Edit Mode (if null, we are creating)
  const [editingId, setEditingId] = useState<number | null>(null);

  // 1. Initialize Form Hook
  const { values, handleChange, resetForm, setValues } = useForm({
    title: '',
    slug: '',
    description: '',
    courseId: '', // Select inputs work best with strings initially
    nodes: '[]',  // Keep as string for form handling
    edges: '[]'   // Keep as string for form handling
  });

  // 2. Fetch Data (Roadmaps + Courses for dropdown)
  const loadData = async () => {
    try {
      setLoading(true);
      const [roadmapData, courseData] = await Promise.all([
        adminService.getAllRoadmaps(),
        adminService.getAllCourses()
      ]);
      
      setRoadmaps(Array.isArray(roadmapData) ? roadmapData : []);
      setCourses(Array.isArray(courseData) ? courseData : []);
    } catch (err) {
      console.error('Failed to load data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // 3. Handle "Edit" Click
  const handleEditClick = (roadmap: Roadmap) => {
    setEditingId(roadmap.id!);
    setValues({
      title: roadmap.title,
      slug: roadmap.slug,
      description: roadmap.description || '',
      courseId: String(roadmap.courseId), // Convert number to string for <select>
      // Pretty print JSON for easier text editing if needed
      nodes: JSON.stringify(roadmap.nodes || [], null, 2),
      edges: JSON.stringify(roadmap.edges || [], null, 2),
    });
    // Scroll to top to see the form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 4. Handle "Cancel" Click
  const handleCancelEdit = () => {
    setEditingId(null);
    resetForm();
  };

  // 5. Handle Submit (Create or Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.courseId) return alert("Please select a Linked Course");

    setSubmitting(true);
    try {
      // Safely parse JSON fields (nodes/edges)
      let parsedNodes = [];
      let parsedEdges = [];
      try {
        parsedNodes = JSON.parse(values.nodes || '[]');
        parsedEdges = JSON.parse(values.edges || '[]');
      } catch (jsonErr) {
        alert("Invalid JSON in Nodes or Edges field. Please check format.");
        setSubmitting(false);
        return;
      }

      // Construct Payload
      const payload: any = {
        title: values.title,
        slug: values.slug,
        description: values.description,
        courseId: Number(values.courseId),
        nodes: parsedNodes,
        edges: parsedEdges
      };

      if (editingId) {
        // UPDATE Mode
        await adminService.updateRoadmap(editingId, payload);
        alert('✅ Roadmap updated successfully!');
      } else {
        // CREATE Mode
        await adminService.createRoadmap(payload);
        alert('✅ Roadmap created successfully!');
      }
      
      handleCancelEdit(); // Reset form and mode
      loadData();         // Refresh list
    } catch (err: any) {
      alert(`❌ Error: ${err.response?.data?.message || err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  // 6. Handle Delete
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure? This action cannot be undone.")) return;
    try {
      await adminService.deleteRoadmap(id);
      loadData();
      // If we deleted the roadmap currently being edited, clear the form
      if (editingId === id) handleCancelEdit();
    } catch (err) {
      console.error(err);
      alert("Failed to delete roadmap");
    }
  };

  // Prepare Options for Select
  const courseOptions = courses.map(c => ({ value: c.id!, label: c.title }));

  return (
    <>
      <Header 
        title="Manage Roadmaps 🗺️" 
        subtitle="Design learning paths and link them to courses"
      />

      <div className="admin-content-area">
        <div className="admin-grid">
          
          {/* --- FORM SECTION (Left Side) --- */}
          <div className="card">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px'}}>
              <h3>{editingId ? 'Edit Roadmap Details' : 'Create New Roadmap'}</h3>
              
              {/* Cancel Button (Visible only when editing) */}
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
                label="Roadmap Title"
                name="title"
                value={values.title}
                onChange={handleChange}
                placeholder="e.g. Frontend Master Path"
                required
              />
              
              <FormRow>
                <Input 
                  label="Slug"
                  name="slug"
                  value={values.slug}
                  onChange={handleChange}
                  placeholder="e.g. frontend-mastery"
                  required
                />

                <Select 
                  label="Linked Course"
                  name="courseId"
                  value={values.courseId}
                  onChange={handleChange}
                  options={courseOptions}
                  placeholder="-- Select Course --"
                  required
                />
              </FormRow>

              <TextArea 
                label="Description"
                name="description"
                value={values.description}
                onChange={handleChange}
                placeholder="Brief overview of this path..."
                style={{minHeight: '80px'}}
              />

              {/* Advanced JSON Fields (Hidden by default, used for raw data checks) */}
              <details style={{marginBottom: '15px', fontSize: '0.85rem', color: '#666', border: '1px dashed #e2e8f0', padding: '10px', borderRadius: '6px'}}>
                <summary style={{cursor:'pointer', fontWeight: 600}}>Advanced: Raw Graph Data (JSON)</summary>
                <div style={{marginTop: '10px'}}>
                  <TextArea 
                    label="Nodes JSON"
                    name="nodes"
                    value={values.nodes}
                    onChange={handleChange}
                    placeholder="[]"
                    style={{fontFamily: 'monospace', fontSize: '0.8rem', minHeight: '60px'}}
                  />
                  <TextArea 
                    label="Edges JSON"
                    name="edges"
                    value={values.edges}
                    onChange={handleChange}
                    placeholder="[]"
                    style={{fontFamily: 'monospace', fontSize: '0.8rem', minHeight: '60px'}}
                  />
                </div>
              </details>

              <SubmitButton isLoading={submitting}>
                {editingId ? 'Update Details' : '+ Create Roadmap'}
              </SubmitButton>
            </Form>
          </div>

          {/* --- LIST TABLE (Right Side) --- */}
          <div className="card">
            <h3>Roadmap Library</h3>
            {loading ? <p>Loading...</p> : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Title / Slug</th>
                    <th>Linked Course</th>
                    <th>Nodes</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {roadmaps.map(rmap => {
                    // Find linked course name for display
                    const linkedCourse = courses.find(c => c.id === rmap.courseId);
                    
                    return (
                      <tr key={rmap.id} style={{background: editingId === rmap.id ? '#f0f9ff' : 'transparent'}}>
                        <td>
                          <strong>{rmap.title}</strong><br/>
                          <code style={{fontSize:'0.8rem', color:'#666'}}>{rmap.slug}</code>
                        </td>
                        <td>
                          <span className="badge basic">
                            {linkedCourse ? `📚 ${linkedCourse.title}` : `ID: ${rmap.courseId}`}
                          </span>
                        </td>
                        <td>
                          {/* Display simple node count */}
                          {Array.isArray(rmap.nodes) ? rmap.nodes.length : 0} nodes
                        </td>
                        <td>
                          <div style={{display: 'flex', gap: '8px'}}>
                            
                            {/* 🎨 DESIGN BUTTON: Link to Visual Editor */}
                            <Link 
                              to={`/admin/roadmaps/design/${rmap.slug}`}
                              title="Open Visual Designer"
                              style={{
                                background: '#ecfdf5', color: '#059669', border: 'none', 
                                borderRadius: '6px', width: '32px', height: '32px', 
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                textDecoration: 'none', transition: 'background 0.2s'
                              }}
                            >
                              🎨
                            </Link>

                            {/* ✏️ EDIT BUTTON: Populate Form */}
                            <button 
                              className="btn-icon"
                              onClick={() => handleEditClick(rmap)}
                              title="Edit Details"
                              style={{
                                background: '#e0e7ff', color: '#4338ca', border: 'none', 
                                borderRadius: '6px', width: '32px', height: '32px', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                              }}
                            >
                              ✏️
                            </button>

                            {/* 🗑️ DELETE BUTTON */}
                            <button 
                              className="btn-danger-sm" 
                              onClick={() => handleDelete(rmap.id!)}
                              title="Delete"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {roadmaps.length === 0 && (
                     <tr><td colSpan={4} style={{textAlign: 'center', padding: '20px'}}>No roadmaps found.</td></tr>
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