import React from 'react';

export function ZenLogo({ size = 26, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ color: 'var(--coral-primary)' }}
    >
      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" opacity="0.4" />
      <circle cx="32" cy="32" r="18" stroke="currentColor" strokeWidth="4" opacity="0.75" />
      <circle cx="32" cy="32" r="8" fill="currentColor" />
    </svg>
  );
}
export default ZenLogo;
