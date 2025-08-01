import React from 'react';
import './PlanoraLogo.css';

const PlanoraLogo = ({ size = 60, animated = true }) => {
  return (
    <div className={`planora-logo ${animated ? 'animated' : ''}`} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Earth Globe */}
        <defs>
          <radialGradient id="earthGradient" cx="0.3" cy="0.3" r="0.7">
            <stop offset="0%" stopColor="#87CEEB" />
            <stop offset="30%" stopColor="#4682B4" />
            <stop offset="70%" stopColor="#2E8B57" />
            <stop offset="100%" stopColor="#1B4332" />
          </radialGradient>
          
          <linearGradient id="planeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="50%" stopColor="#FFA500" />
            <stop offset="100%" stopColor="#FF6347" />
          </linearGradient>
        </defs>
        
        {/* Earth sphere */}
        <circle
          cx="50"
          cy="50"
          r="28"
          fill="url(#earthGradient)"
          stroke="#2C5F2D"
          strokeWidth="1"
        />
        
        {/* Continents on Earth */}
        <path
          d="M35 45 Q40 40 45 45 L50 43 Q55 40 60 45 L65 50 Q60 55 55 52 L45 55 Q40 52 35 45 Z"
          fill="#228B22"
          opacity="0.8"
        />
        
        <path
          d="M30 55 Q35 50 40 55 L45 60 Q40 65 35 60 L30 55 Z"
          fill="#228B22"
          opacity="0.8"
        />
        
        <path
          d="M55 30 Q60 25 65 30 L70 35 Q65 40 60 35 L55 30 Z"
          fill="#228B22"
          opacity="0.8"
        />
        
        {/* Flight path orbit */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#87CEEB"
          strokeWidth="1"
          strokeDasharray="2,3"
          opacity="0.4"
          className="orbit-path"
        />
        
        {/* Airplane */}
        <g className="airplane" transform-origin="50 50">
          {/* Airplane body */}
          <path
            d="M85 45 L92 47 L90 50 L92 53 L85 55 L82 50 Z"
            fill="url(#planeGradient)"
            stroke="#FF4500"
            strokeWidth="0.5"
          />
          
          {/* Wings */}
          <path
            d="M82 48 L86 46 L88 50 L86 54 L82 52 Z"
            fill="url(#planeGradient)"
            stroke="#FF4500"
            strokeWidth="0.5"
          />
          
          {/* Tail */}
          <path
            d="M85 47 L87 45 L88 47 L87 50 L85 48 Z"
            fill="#FFD700"
          />
          
          {/* Contrail */}
          <path
            d="M82 50 L75 50 Q70 49 65 50 Q70 51 75 50 Z"
            fill="#E6F3FF"
            opacity="0.6"
            className="contrail"
          />
        </g>
        
        {/* Stars */}
        <circle cx="15" cy="20" r="1" fill="#FFD700" opacity="0.8" />
        <circle cx="85" cy="25" r="0.8" fill="#FFD700" opacity="0.6" />
        <circle cx="20" cy="80" r="0.9" fill="#FFD700" opacity="0.7" />
        <circle cx="90" cy="75" r="1.2" fill="#FFD700" opacity="0.8" />
      </svg>
    </div>
  );
};

export default PlanoraLogo;
