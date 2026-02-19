import React from 'react'

const config = {
  info:    { bg: '#0D1A2E', border: '#1D4ED833', icon: 'ℹ', color: '#60A5FA' },
  tip:     { bg: '#0D2E1A', border: '#15803D33', icon: '✓', color: '#4ADE80' },
  warning: { bg: '#2E1D0D', border: '#B4530933', icon: '⚠', color: '#FCD34D' },
}

export function Callout({ type = 'info', children }) {
  const cfg = config[type] || config.info
  return (
    <div style={{
      background: cfg.bg,
      border: `1px solid ${cfg.border}`,
      borderRadius: '8px',
      padding: '14px 16px',
      margin: '14px 0',
      display: 'flex',
      gap: '12px',
      alignItems: 'flex-start',
    }}>
      <span style={{ color: cfg.color, fontWeight: '700', flexShrink: 0, fontSize: '14px', marginTop: '1px' }}>
        {cfg.icon}
      </span>
      <span style={{ color: '#E2E8F4', fontSize: '14px', lineHeight: '1.65' }}>
        {children}
      </span>
    </div>
  )
}
