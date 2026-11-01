import React, { useState } from 'react';
import { playStampThud } from '../utils/sound';

export function RotatingSeal({ 
  text = "✦ MYSURU, IN ✦ ARCH GUY ✦ FULL-STACK ARTISAN ✦ SPRING BOOT ",
  size = 110,
  centerIcon = "★" 
}) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    playStampThud();
    setClicked(true);
    setTimeout(() => setClicked(false), 500);
  };

  return (
    <div
      onClick={handleClick}
      className={`relative inline-flex items-center justify-center cursor-pointer select-none transition-transform duration-300 ${
        clicked ? 'animate-stamp-impact scale-95' : 'hover:scale-105'
      }`}
      style={{ width: size, height: size }}
      title="Official Certification Seal • Click for tactile stamp thud"
    >
      {/* Outer Rotating SVG with circular text */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full animate-spin-slow"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <path
            id="sealCirclePath"
            d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
          />
        </defs>

        {/* Outer concentric stamp rings */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="#1d1d1b"
          strokeWidth="1.2"
          strokeDasharray="3 2"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#1d1d1b"
          strokeWidth="0.8"
        />
        <circle
          cx="50"
          cy="50"
          r="26"
          fill="none"
          stroke="#d35230"
          strokeWidth="1"
        />

        {/* Curved Circular Text */}
        <text
          fontSize="7.8"
          fill="#1d1d1b"
          fontFamily="Space Mono, monospace"
          fontWeight="bold"
          letterSpacing="0.08em"
        >
          <textPath href="#sealCirclePath" startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>

      {/* Center Static Badge / Star Emblem */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-10 h-10 rounded-full bg-[#1d1d1b] text-[#cfc4ba] flex items-center justify-center font-serif text-sm font-black shadow-[2px_2px_0px_#d35230]">
          {centerIcon}
        </div>
      </div>
    </div>
  );
}

export default RotatingSeal;
