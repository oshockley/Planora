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
        
        {/* Airplane - positioned to orbit around Earth */}
        <g className="airplane-orbit">
          <g className="airplane">
            {/* Airplane body */}
            <path
              d="M88 48 L95 49.5 L93 52 L95 54.5 L88 56 L85 52 Z"
              fill="url(#planeGradient)"
              stroke="#FF4500"
              strokeWidth="0.5"
            />
            
            {/* Wings */}
            <path
              d="M85 50 L89 48 L91 52 L89 56 L85 54 Z"
              fill="url(#planeGradient)"
              stroke="#FF4500"
              strokeWidth="0.5"
            />
            
            {/* Tail */}
            <path
              d="M88 49.5 L90 47.5 L91 49.5 L90 52 L88 50.5 Z"
              fill="#FFD700"
            />
            
            {/* Contrail */}
            <path
              d="M85 52 L78 52 Q73 51 68 52 Q73 53 78 52 Z"
              fill="#E6F3FF"
              opacity="0.6"
              className="contrail"
            />
          </g>
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
