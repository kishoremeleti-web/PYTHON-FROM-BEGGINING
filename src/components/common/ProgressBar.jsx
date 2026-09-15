import React from "react";

export function ProgressBar({ percent = 0, showLabel = false, label = "Progress", active = false }) {
  const clamped = Math.min(100, Math.max(0, Math.round(percent)));

  return (
    <div className="progress-bar-wrapper">
      {showLabel && (
        <div className="progress-header">
          <span className="progress-title">{label}</span>
          <span className="progress-percent">{clamped}%</span>
        </div>
      )}
      <div className="progress-bar-track">
        <div
          className={`progress-bar-fill ${active ? "active-stripes" : ""}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
