// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import api from '../../services/api'; // Ensure this points to your axios instance
// import '../../styles/ManageUsers.css'; // We will create this next

// // --- Interfaces ---
// interface User {
//   id: number;
//   email: string;
//   name: string;
//   role: 'STUDENT' | 'MENTOR' | 'COMPANY' | 'ADMIN';
//   createdAt: string;
//   status?: 'ACTIVE' | 'BANNED'; // Optional if you have status
// }

// export default function ManageUsers() {
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [roleFilter, setRoleFilter] = useState('ALL');

//   // --- Fetch Users ---
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         // Adjust endpoint based on your backend (e.g., /admin/users or /users)
//         const res = await api.get('/admin/users'); 
//         setUsers(res.data);
//       } catch (err) {
//         console.error("Failed to load users", err);
//         // Fallback mock data for demo if API fails
//         setUsers([
//             { id: 1, name: "Nguyen Tan Khanh", email: "khanh@example.com", role: "ADMIN", createdAt: "2024-01-01" },
//             { id: 2, name: "John Doe", email: "student@example.com", role: "STUDENT", createdAt: "2024-02-15" },
//             { id: 3, name: "Jane Smith", email: "jane@company.com", role: "COMPANY", createdAt: "2024-03-10" },
//         ]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUsers();
//   }, []);

//   // --- Handlers ---
//   const handleDelete = async (id: number) => {
//     if (!window.confirm("Are you sure you want to delete this user?")) return;
//     try {
//       await api.delete(`/admin/users/${id}`);
//       setUsers(prev => prev.filter(u => u.id !== id));
//     } catch (err) {
//       alert("Failed to delete user");
//     }
//   };

//   // --- Filtering Logic ---
//   const filteredUsers = users.filter(user => {
//     const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesRole = roleFilter === 'ALL' || user.role === roleFilter;
//     return matchesSearch && matchesRole;
//   });

//   // --- Helper: Role Badge Color ---
//   const getRoleBadge = (role: string) => {
//     switch(role) {
//       case 'ADMIN': return <span className="badge badge-red">Admin</span>;
//       case 'MENTOR': return <span className="badge badge-purple">Mentor</span>;
//       case 'COMPANY': return <span className="badge badge-blue">Company</span>;
//       default: return <span className="badge badge-green">Student</span>;
//     }
//   };

//   return (
//     <div className="manage-users-container">
      
//       {/* Header Section */}
//       <div className="page-header">
//         <div>
//           <h1 className="page-title">User Management</h1>
//           <p className="page-subtitle">Manage system access and user roles.</p>
//         </div>
//         <button className="btn-primary" onClick={() => alert("Add User Feature")}>
//           + Add New User
//         </button>
//       </div>

//       {/* Filters Bar */}
//       <div className="filters-bar">
//         <div className="search-wrapper">
//           <span className="search-icon">🔍</span>
//           <input 
//             type="text" 
//             placeholder="Search users..." 
//             className="search-input"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
        
//         <select 
//           className="role-select" 
//           value={roleFilter} 
//           onChange={(e) => setRoleFilter(e.target.value)}
//         >
//           <option value="ALL">All Roles</option>
//           <option value="STUDENT">Students</option>
//           <option value="MENTOR">Mentors</option>
//           <option value="COMPANY">Companies</option>
//           <option value="ADMIN">Admins</option>
//         </select>
//       </div>

//       {/* Data Table */}
//       <div className="table-container">
//         {loading ? (
//           <div className="loading-state">Loading users...</div>
//         ) : (
//           <table className="data-table">
//             <thead>
//               <tr>
//                 <th style={{width: '50px'}}>#</th>
//                 <th>User Info</th>
//                 <th>Role</th>
//                 <th>Joined Date</th>
//                 <th className="text-right">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredUsers.length > 0 ? (
//                 filteredUsers.map((user) => (
//                   <tr key={user.id}>
//                     <td>{user.id}</td>
//                     <td>
//                       <div className="user-cell">
//                         <div className="user-avatar">{user.name.charAt(0)}</div>
//                         <div>
//                           <div className="user-name">{user.name}</div>
//                           <div className="user-email">{user.email}</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td>{getRoleBadge(user.role)}</td>
//                     <td className="text-gray">{new Date(user.createdAt).toLocaleDateString()}</td>
//                     <td className="text-right">
//                       <button className="btn-icon" onClick={() => alert(`Edit ${user.id}`)}>✏️</button>
//                       <button className="btn-icon danger" onClick={() => handleDelete(user.id)}>🗑️</button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={5} className="empty-state">No users found.</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }