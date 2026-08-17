import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import '../../styles/roadmapDrawer.css';

interface RoadmapDrawerProps {
  isOpen: boolean;
  loading: boolean;
  nodeDetail: any | null; 
  onClose: () => void;
  onStatusChange: (newStatus: string) => void;
}

export default function RoadmapDrawer({ isOpen, loading, nodeDetail, onClose, onStatusChange }: RoadmapDrawerProps) {
  const [activeTab, setActiveTab] = useState<'resources' | 'ai'>('resources');

  // Status Logic (Keep existing)
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return '#10b981';
      case 'IN_PROGRESS': return '#eab308';
      case 'SKIPPED': return '#94a3b8';
      default: return '#cbd5e1';
    }
  };
  const statusColor = getStatusColor(nodeDetail?.status || 'AVAILABLE');

  // 🎨 CUSTOM MARKDOWN RENDERERS (The Magic Logic)
  const MarkdownComponents = {
    // 1. Headers with Colored Lines
    h3: ({ node, children }: any) => {
      const text = String(children);
      let className = 'md-header';
      // Detect keywords to assign colors
      if (text.includes('Free') || text.includes('Green')) className += ' header-green';
      else if (text.includes('Premium') || text.includes('Purple')) className += ' header-purple';
      else if (text.includes('AI') || text.includes('Blue')) className += ' header-blue';
      
      return <h3 className={className}><span>{children}</span></h3>;
    },

    // 2. Bold Text as "Badges" (Article, Video, etc.)
    strong: ({ node, children }: any) => {
      const text = String(children).trim();
      let className = 'md-badge';
      
      // Match specific keywords
      if (text === 'Article') className += ' badge-yellow';
      else if (text === 'Video') className += ' badge-purple';
      else if (text === 'Course') className += ' badge-green';
      else if (text === 'Book') className += ' badge-orange';
      else if (text === 'Roadmap') className += ' badge-dark';
      else className += ' badge-gray'; // Default

      return <span className={className}>{children}</span>;
    },

    // 3. Links (Clean up styling)
    a: ({ node, href, children }: any) => {
      return <a href={href} target="_blank" rel="noopener noreferrer" className="md-link">{children}</a>
    },

    // 4. List Items (Remove bullets, add spacing)
    li: ({ node, children }: any) => {
      return <li className="md-list-item">{children}</li>;
    }
  };

  return (
    <>
      {isOpen && <div className="drawer-backdrop" onClick={onClose} />}

      <aside className={`drawer-panel ${isOpen ? 'open' : ''}`}>
        {loading || !nodeDetail ? (
           <div className="drawer-loading">Loading...</div>
        ) : (
          <>
            <div className="drawer-header">
              <div className="drawer-tabs">
                <button 
                  className={`tab-btn ${activeTab === 'resources' ? 'active' : ''}`}
                  onClick={() => setActiveTab('resources')}
                >
                  Resources
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'ai' ? 'active' : ''}`}
                  onClick={() => setActiveTab('ai')}
                >
                  ✨ AI Tutor
                </button>
              </div>

              <div className="drawer-controls">
                <div className="status-pill-wrapper">
                  <span className="status-dot" style={{ background: statusColor }} />
                  <select 
                    className="status-select"
                    value={nodeDetail.status || 'AVAILABLE'} 
                    onChange={(e) => onStatusChange(e.target.value)}
                  >
                    <option value="AVAILABLE">Pending</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Done</option>
                    <option value="SKIPPED">Skipped</option>
                  </select>
                  <span className="chevron-icon">▼</span>
                </div>
                <button className="btn-close" onClick={onClose}>&times;</button>
              </div>
            </div>

            <div className="drawer-body">
              <h1 className="drawer-title">{nodeDetail.title}</h1>
              <p className="drawer-summary-text">{nodeDetail.summary || "No summary available."}</p>

              <div className="markdown-content">
                {/* 🟢 PASS THE CUSTOM COMPONENTS HERE */}
                <ReactMarkdown components={MarkdownComponents}>
                  {nodeDetail.contentMd || '### No resources added yet.'}
                </ReactMarkdown>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
}