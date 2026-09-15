import React, { useEffect } from "react";
import { Trophy, Zap, BookOpen, CheckCircle2, Flame, ArrowLeft, Terminal, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { sounds } from "../../services/soundEffects";

export function PhaseComplete({ totalXp, streakDays, onBackToDashboard }) {
  useEffect(() => {
    sounds.playComplete();

    // Elegant, tasteful multi-burst celebration
    const count = 180;
    const defaults = { origin: { y: 0.65 } };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
        colors: ["#00f5a0", "#38bdf8", "#f59e0b", "#6366f1"]
      });
    }

    fire(0.25, { spread: 30, startVelocity: 55 });
    fire(0.2, { spread: 65 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  }, []);

  return (
    <div className="phase-complete-view">
      <div className="phase-complete-card-technical">
        {/* Milestone Trophy Badge */}
        <div className="trophy-tech-aura">
          <Trophy size={46} color="#fbbf24" />
        </div>

        <div className="hud-badge-tag" style={{ margin: "0 auto 1rem", display: "inline-flex" }}>
          <Sparkles size={13} />
          <span>PHASE 1 MILESTONE REACHED</span>
        </div>

        <h1 className="phase-title-tech">PYTHON BASICS COMPLETE</h1>
        <p className="phase-desc-tech">
          You have successfully cleared all 11 foundational checkpoints of the Python curriculum. 
          You've built real mental models, answered 55 verification questions, and written genuine Python code.
        </p>

        {/* 4 Stats Grid */}
        <div className="stats-hud-grid">
          <div className="stat-hud-box">
            <span className="stat-hud-icon">
              <Zap size={16} fill="currentColor" color="var(--accent-amber)" />
            </span>
            <span className="stat-hud-val">{totalXp.toLocaleString()}</span>
            <span className="stat-hud-lbl">TOTAL XP EARNED</span>
          </div>

          <div className="stat-hud-box">
            <span className="stat-hud-icon">
              <BookOpen size={16} color="var(--accent-mint)" />
            </span>
            <span className="stat-hud-val">11 / 11</span>
            <span className="stat-hud-lbl">TOPICS CLEARED</span>
          </div>

          <div className="stat-hud-box">
            <span className="stat-hud-icon">
              <CheckCircle2 size={16} color="var(--accent-cyan)" />
            </span>
            <span className="stat-hud-val">55 / 55</span>
            <span className="stat-hud-lbl">QUESTIONS SOLVED</span>
          </div>

          <div className="stat-hud-box">
            <span className="stat-hud-icon">
              <Flame size={16} color="#f97316" />
            </span>
            <span className="stat-hud-val">{streakDays} DAYS</span>
            <span className="stat-hud-lbl">ACTIVE STREAK</span>
          </div>
        </div>

        {/* Future Levels Notice */}
        <div className="future-tech-banner">
          <div className="future-banner-title">
            <Terminal size={15} />
            <span>MORE PYTHON LEVELS COMING NEXT</span>
          </div>
          <p className="future-banner-sub">
            Phase 1 is officially complete. Upcoming phases will introduce Control Flow, Data Structures, Functions, and Object-Oriented Programming.
          </p>
        </div>

        {/* Return to Dashboard CTA */}
        <div>
          <button className="editorial-primary-cta magnetic-btn" onClick={onBackToDashboard}>
            <ArrowLeft size={17} />
            <span>RETURN TO EXPEDITION MAP</span>
          </button>
        </div>
      </div>
    </div>
  );
}
