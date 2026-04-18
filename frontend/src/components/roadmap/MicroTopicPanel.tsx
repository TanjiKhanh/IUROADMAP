import React from 'react';
import { CheckCircle2, ExternalLink, FileText, PlayCircle, X } from 'lucide-react';
import { MicroTopicNode } from '../../services/roadmap.service';

interface MicroTopicPanelProps {
  topic: MicroTopicNode | null;
  isOpen: boolean;
  onClose: () => void;
  continueTopicCount: number;
}

const parseObjectives = (value?: string | null) => {
  if (!value) return [] as string[];
  return value
    .split(/\r?\n/)
    .map((item) => item.replace(/^[-*\d.\s]+/, '').trim())
    .filter(Boolean);
};

const getEmbedUrl = (url?: string | null) => {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace('www.', '');

    if (host === 'youtu.be') {
      const videoId = parsed.pathname.slice(1);
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

    if (host.includes('youtube.com')) {
      const videoId = parsed.searchParams.get('v');
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

    if (host.includes('vimeo.com')) {
      const videoId = parsed.pathname.split('/').filter(Boolean).pop();
      return videoId ? `https://player.vimeo.com/video/${videoId}` : null;
    }

    return null;
  } catch {
    return null;
  }
};

const isDirectVideo = (url?: string | null) => {
  if (!url) return false;
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);
};

const getResourceHost = (url?: string | null) => {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    return parsed.hostname.replace('www.', '');
  } catch {
    return null;
  }
};

export default function MicroTopicPanel({
  topic,
  isOpen,
  onClose,
  continueTopicCount,
}: MicroTopicPanelProps) {
  if (!topic) {
    return null;
  }

  const objectives = parseObjectives(topic.learning_objectives);
  const embedUrl = getEmbedUrl(topic.resources_url);
  const hasDirectVideo = isDirectVideo(topic.resources_url);
  const resourceHost = getResourceHost(topic.resources_url);
  const continueLabel = continueTopicCount === 1 ? 'topic' : 'topics';

  return (
    <aside className={`micro-topic-panel ${isOpen ? 'is-open' : 'is-closed'}`} aria-hidden={!isOpen}>
      <div className="panel-hero">
        <div className="panel-head">
          <div className="panel-head-main">
            <div className="panel-meta-row">
              <span className="panel-meta-time">Topic</span>
            </div>
            <h2>{topic.title}</h2>
          </div>
          <button
            type="button"
            className="panel-close-btn"
            onClick={onClose}
            aria-label="Close topic panel"
          >
            <X size={18} />
          </button>
        </div>

        <p className="panel-description">
          {topic.description || 'No description provided for this topic yet.'}
        </p>
      </div>

      <div className="panel-block">
        <h3>Learning Objectives</h3>
        {objectives.length > 0 ? (
          <ul className="panel-objectives-list">
            {objectives.map((objective, index) => (
              <li key={`${objective}-${index}`}>
                <CheckCircle2 size={16} />
                <span>{objective}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="panel-muted">No learning objectives available.</p>
        )}
      </div>

      <div className="panel-block">
        <h3>Resources</h3>
        {!topic.resources_url && <p className="panel-muted">No resource URL available.</p>}

        {embedUrl && (
          <div className="resource-card">
            <div className="resource-video-wrap">
              <iframe
                src={embedUrl}
                title={`Video resource for ${topic.title}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className="resource-card-foot">
              <div className="resource-card-copy">
                <strong>{topic.title}</strong>
                <span>{resourceHost ? `Video • ${resourceHost}` : 'Video resource'}</span>
              </div>
              <a
                href={topic.resources_url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="resource-card-link"
                aria-label="Open video resource"
              >
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        )}

        {!embedUrl && hasDirectVideo && topic.resources_url && (
          <div className="resource-card">
            <video className="resource-video-wrap" controls>
              <source src={topic.resources_url} />
              Your browser does not support the video tag.
            </video>
            <div className="resource-card-foot">
              <div className="resource-card-copy">
                <strong>{topic.title}</strong>
                <span>{resourceHost ? `Video • ${resourceHost}` : 'Video resource'}</span>
              </div>
              <a
                href={topic.resources_url}
                target="_blank"
                rel="noopener noreferrer"
                className="resource-card-link"
                aria-label="Open video resource"
              >
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        )}

        {topic.resources_url && !embedUrl && !hasDirectVideo && (
          <a
            href={topic.resources_url}
            target="_blank"
            rel="noopener noreferrer"
            className="resource-card resource-card-inline"
          >
            <span className="resource-icon-wrap">
              <FileText size={18} />
            </span>
            <span className="resource-inline-copy">
              <strong>Open Resource</strong>
              <span>{resourceHost || 'Article / Documentation'}</span>
            </span>
            <ExternalLink size={16} />
          </a>
        )}

        {topic.resources_url && (embedUrl || hasDirectVideo) && (
          <a
            href={topic.resources_url}
            target="_blank"
            rel="noopener noreferrer"
            className="resource-card resource-card-inline"
          >
            <span className="resource-icon-wrap">
              <PlayCircle size={18} />
            </span>
            <span className="resource-inline-copy">
              <strong>Open Resource</strong>
              <span>{resourceHost || 'Video'}</span>
            </span>
            <ExternalLink size={16} />
          </a>
        )}
      </div>

      <div className="panel-continue-footer" role="status" aria-live="polite">
        {continueTopicCount > 0
          ? `Continue to explore ${continueTopicCount} new ${continueLabel}`
          : 'Finish All Topics!'}
      </div>
    </aside>
  );
}
