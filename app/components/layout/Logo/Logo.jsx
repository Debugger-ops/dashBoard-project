"use client";
import "./Logo.css"; // ✅ Import the CSS file

export default function Logo() {
  return (
    <div className="logo-wrapper">
      <svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg" className="logo-svg">
        <rect x="10" y="10" width="40" height="40" rx="8" fill="#3498db" />
        <path
          d="M20 35 L25 25 L35 30 L40 15"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="20" cy="35" r="3" fill="white" />
        <circle cx="25" cy="25" r="3" fill="white" />
        <circle cx="35" cy="30" r="3" fill="white" />
        <circle cx="40" cy="15" r="3" fill="white" />
        <text
          x="60"
          y="30"
          fontFamily="Arial, sans-serif"
          fontWeight="700"
          fontSize="16"
          fill="#2c3e50"
        >
          Analytics
        </text>
        <text
          x="60"
          y="48"
          fontFamily="Arial, sans-serif"
          fontWeight="400"
          fontSize="16"
          fill="#3498db"
        >
          Dashboard
        </text>
      </svg>
    </div>
  );
}
