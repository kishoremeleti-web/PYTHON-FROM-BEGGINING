import React from "react";
import { Terminal, Flame, Zap, LogOut, User, Volume2, VolumeX, Compass } from "lucide-react";

export function Navbar({
  studentName,
  totalXp,
  streakDays,
  recentXpReward,
  inJourney,
  isMuted,
  onToggleSound,
  onExitJourney,
  onOpenProfile,
  onLogoClick
}) {
  return (
    <header className="editorial-navbar">
      <div className="container editorial-navbar-inner">
        {/* Brand */}
        <div className="editorial-brand" onClick={onLogoClick} role="button" tabIndex={0}>
          <div className="brand-dot-beacon" />
          <div className="brand-editorial-lockup">
            <span className="brand-title-bold">PYTHONQUEST</span>
            <span className="brand-sub-coord">EXPEDITION // P01</span>
          </div>
        </div>

        {/* HUD Center Telemetry */}
        <div className="navbar-telemetry-hud">
          {/* Daily Streak */}
          <div className="hud-telemetry-chip streak">
            <Flame size={13} className="hud-glyph-flame" />
            <span className="chip-label">STREAK //</span>
            <span className="chip-value">{String(streakDays).padStart(2, "0")}D</span>
          </div>

          {/* XP Pill with animated floating reward */}
          <div className="hud-telemetry-chip xp">
            <Zap size={13} fill="currentColor" className="hud-glyph-xp" />
            <span className="chip-label">XP //</span>
            <span className="chip-value">{totalXp.toLocaleString()}</span>
            {recentXpReward > 0 && (
              <div className="xp-float-notification" key={Date.now()}>
                +{recentXpReward} XP
              </div>
            )}
          </div>

          {/* Sound Toggle Button */}
          <button
            className={`hud-telemetry-chip sound-toggle ${isMuted ? "muted" : ""}`}
            onClick={onToggleSound}
            title={isMuted ? "Unmute Audio Chimes" : "Mute Audio Chimes"}
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            <span className="chip-label">{isMuted ? "MUTED" : "AUDIO"}</span>
          </button>

          {/* Explorer Profile Pill */}
          <button
            className="hud-telemetry-chip explorer-btn"
            onClick={onOpenProfile}
            title="Shared College Machine & Profile Settings"
          >
            <User size={13} />
            <span className="chip-value">{studentName.toUpperCase()}</span>
          </button>

          {/* Exit Journey Action (when inside active topic) */}
          {inJourney && (
            <button
              className="exit-expedition-btn"
              onClick={onExitJourney}
              title="Save progress and return to journey map"
            >
              <LogOut size={13} />
              <span>EXIT EXPEDITION</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
