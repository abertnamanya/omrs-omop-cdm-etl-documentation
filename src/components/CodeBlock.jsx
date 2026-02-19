import React from 'react'

export function CodeBlock({ children, lang }) {
  return (
    <div style={{ position: 'relative', margin: '14px 0' }}>
      {lang && (
        <div style={{
          position: 'absolute', top: '10px', right: '14px',
          color: '#3A4250', fontSize: '10px', fontFamily: 'monospace',
          letterSpacing: '1px', textTransform: 'uppercase',
        }}>
          {lang}
        </div>
      )}
      <pre style={{
        background: '#080A0D',
        border: '1px solid #222731',
        borderRadius: '10px',
        padding: '18px 20px',
        fontSize: '13px',
        lineHeight: '2',
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        overflowX: 'auto',
        margin: 0,
        color: '#6B7A8D',
      }}>
        <code>{children}</code>
      </pre>
    </div>
  )
}
