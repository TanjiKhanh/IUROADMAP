import React from 'react';
import { Outlet } from 'react-router-dom';

const ROOT_STYLE: React.CSSProperties = {
  minHeight: '100vh',
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  background:
    'radial-gradient(ellipse 90% 60% at 50% -20%, rgba(45,212,191,0.45) 0%, transparent 60%),' +
    'radial-gradient(ellipse 60% 50% at 100% 100%, rgba(20,143,119,0.55) 0%, transparent 55%),' +
    'radial-gradient(ellipse 50% 40% at 0% 100%, rgba(212,160,23,0.28) 0%, transparent 60%),' +
    'linear-gradient(135deg, #0a3d36 0%, #082825 55%, #0a3d36 100%)',
  color: '#e2f5ef',
};

const GRID_OVERLAY: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  backgroundImage:
    'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),' +
    'linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
  backgroundSize: '44px 44px',
  maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 25%, transparent 90%)',
  WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 25%, transparent 90%)',
  pointerEvents: 'none',
};

const BLOB_TOP_RIGHT: React.CSSProperties = {
  position: 'absolute',
  top: -160,
  right: -140,
  width: 560,
  height: 560,
  borderRadius: '40% 60% 60% 40% / 50% 40% 60% 50%',
  background: 'linear-gradient(135deg, rgba(45,212,191,0.85) 0%, rgba(20,143,119,0.55) 100%)',
  filter: 'blur(90px)',
  pointerEvents: 'none',
};

const BLOB_BOTTOM_LEFT: React.CSSProperties = {
  position: 'absolute',
  bottom: -220,
  left: -180,
  width: 640,
  height: 640,
  borderRadius: '60% 40% 50% 50% / 40% 60% 40% 60%',
  background: 'linear-gradient(135deg, rgba(20,143,119,0.7) 0%, rgba(212,160,23,0.4) 100%)',
  filter: 'blur(100px)',
  pointerEvents: 'none',
};

const RING_OUTER: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 820,
  height: 820,
  borderRadius: '50%',
  border: '1px solid rgba(94,234,212,0.22)',
  pointerEvents: 'none',
};

const RING_INNER: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 560,
  height: 560,
  borderRadius: '50%',
  border: '1px dashed rgba(94,234,212,0.28)',
  pointerEvents: 'none',
};

const TOP_BAR: React.CSSProperties = {
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '20px 28px',
};

const BRAND_WRAP: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 10,
  padding: '6px 14px 6px 10px',
  borderRadius: 999,
  background: 'rgba(255,255,255,0.12)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  border: '1px solid rgba(255,255,255,0.18)',
  boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
};

const BRAND_DOT: React.CSSProperties = {
  width: 12,
  height: 12,
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #5eead4 0%, #34d3a3 100%)',
  boxShadow: '0 0 12px rgba(94,234,212,0.85)',
};

const BRAND: React.CSSProperties = {
  fontWeight: 700,
  fontSize: 16,
  letterSpacing: 1.4,
  color: '#ffffff',
};

const LANG_CHIP: React.CSSProperties = {
  background: 'rgba(255,255,255,0.12)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  border: '1px solid rgba(255,255,255,0.18)',
  borderRadius: 999,
  padding: '2px 6px',
  boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
};

const CONTENT: React.CSSProperties = {
  position: 'relative',
  zIndex: 1,
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px',
};

const FOOTER: React.CSSProperties = {
  position: 'relative',
  zIndex: 1,
  padding: '16px 28px',
  textAlign: 'center',
  color: 'rgba(226,245,239,0.65)',
  fontSize: 12,
};

export function AuthLayout() {
  return (
    <div style={ROOT_STYLE}>
      <div style={BLOB_TOP_RIGHT} aria-hidden />
      <div style={BLOB_BOTTOM_LEFT} aria-hidden />
      <div style={RING_OUTER} aria-hidden />
      <div style={RING_INNER} aria-hidden />
      <div style={GRID_OVERLAY} aria-hidden />

      <div style={TOP_BAR}>
        <span style={BRAND_WRAP}>
          <span style={BRAND_DOT} aria-hidden />
          <span style={BRAND}>IUROADMAP</span>
        </span>
        <div style={LANG_CHIP}>
        </div>
      </div>

      <div style={CONTENT}>
        <Outlet />
      </div>

      <div style={FOOTER}>© {new Date().getFullYear()} IUROADMAP Platform</div>
    </div>
  );
}
