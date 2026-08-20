import React, { useEffect, useState } from 'react';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface NotificationProps {
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number; // milliseconds, 0 = manual close
  onClose?: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  type,
  title,
  message,
  duration = 4000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration === 0) return; // Don't auto-close

    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const typeStyles = {
    success: {
      background: '#ecfdf5',
      border: '1px solid #6ee7b7',
      iconColor: '#059669',
      textColor: '#065f46',
    },
    error: {
      background: '#fef2f2',
      border: '1px solid #fecaca',
      iconColor: '#dc2626',
      textColor: '#7f1d1d',
    },
    info: {
      background: '#eff6ff',
      border: '1px solid #bfdbfe',
      iconColor: '#2563eb',
      textColor: '#1e40af',
    },
    warning: {
      background: '#fffbeb',
      border: '1px solid #fde68a',
      iconColor: '#d97706',
      textColor: '#92400e',
    },
  };

  const style = typeStyles[type];

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
    warning: '⚠',
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 20,
        right: 20,
        background: style.background,
        border: style.border,
        borderRadius: 8,
        padding: '16px 20px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        zIndex: 9999,
        maxWidth: 400,
        animation: 'slideIn 0.3s ease-out',
      }}
    >
      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateX(400px);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>

      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <div
          style={{
            fontSize: 20,
            color: style.iconColor,
            fontWeight: 'bold',
            flexShrink: 0,
          }}
        >
          {icons[type]}
        </div>

        <div style={{ flex: 1 }}>
          <div
            style={{
              fontWeight: 600,
              color: style.textColor,
              fontSize: 14,
              marginBottom: message ? 4 : 0,
            }}
          >
            {title}
          </div>
          {message && (
            <div
              style={{
                color: style.textColor,
                fontSize: 13,
                opacity: 0.9,
                lineHeight: 1.4,
              }}
            >
              {message}
            </div>
          )}
        </div>

        <button
          onClick={() => {
            setIsVisible(false);
            onClose?.();
          }}
          style={{
            background: 'none',
            border: 'none',
            color: style.textColor,
            cursor: 'pointer',
            fontSize: 20,
            padding: 0,
            opacity: 0.6,
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.opacity = '1';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.opacity = '0.6';
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Notification;
