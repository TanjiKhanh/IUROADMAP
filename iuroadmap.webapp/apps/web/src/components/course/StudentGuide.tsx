import ReactMarkdown from 'react-markdown';

/**
 * Markdown notes for students of an offering (FR-RDM.08.1). react-markdown does not render raw HTML
 * by default, so the text written by admins cannot inject scripts.
 */
export function StudentGuide({ markdown }: { markdown?: string | null }) {
  if (!markdown?.trim()) return null;
  return (
    <div className="student-guide" style={{ lineHeight: 1.6, color: '#1e293b' }}>
      <ReactMarkdown
        components={{
          a: ({ node: _node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" />,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
