import React, { useEffect } from "react";
import { CheckCircle2, ArrowRight, Home, Zap } from "lucide-react";
import { sounds } from "../../services/soundEffects";
import { TopicIcon } from "../common/TopicIcons";

export function TopicCompleteModal({
  topic,
  nextTopic,
  onContinueNext,
  onBackToDashboard
}) {
  useEffect(() => {
    sounds.playComplete();
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal-card-technical">
        {/* Celebration Glyph */}
        <div className="modal-glyph-aura">
          <TopicIcon topicNumber={topic.number} size={32} />
        </div>

        <div className="hud-badge-tag" style={{ margin: "0 auto 0.75rem", display: "inline-flex" }}>
          <span>CHECKPOINT CLEARED</span>
        </div>

        <h2 className="modal-technical-title">Topic {topic.number} Complete!</h2>
        <p className="modal-technical-sub">
          You mastered <strong>{topic.title}</strong> and earned all associated experience points.
        </p>

        {/* Technical XP Breakdown Card */}
        <div className="technical-xp-ledger">
          <div className="ledger-row">
            <span className="ledger-label">Lesson Understanding</span>
            <span className="ledger-val">+10 XP</span>
          </div>
          <div className="ledger-row">
            <span className="ledger-label">5 Quiz Verifications (5 × 10)</span>
            <span className="ledger-val">+50 XP</span>
          </div>
          <div className="ledger-row">
            <span className="ledger-label">Code Lab Execution</span>
            <span className="ledger-val">+25 XP</span>
          </div>
          <div className="ledger-row">
            <span className="ledger-label">Checkpoint Completion Bonus</span>
            <span className="ledger-val">+25 XP</span>
          </div>
          <div className="ledger-row total">
            <span className="ledger-label">TOTAL CHECKPOINT REWARD</span>
            <span className="ledger-val-total">
              <Zap size={14} fill="currentColor" /> +110 XP
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="modal-actions-group">
          {nextTopic ? (
            <button className="editorial-primary-cta magnetic-btn" onClick={onContinueNext}>
              <span>UNLOCK CHECKPOINT {String(nextTopic.number).padStart(2, "0")}: {nextTopic.title.toUpperCase()}</span>
              <ArrowRight size={17} />
            </button>
          ) : (
            <button className="editorial-primary-cta magnetic-btn pulse-glow-btn" onClick={onContinueNext}>
              <span>🎉 VIEW PHASE 1 FINALE & CELEBRATION</span>
              <ArrowRight size={17} />
            </button>
          )}

          <button className="btn btn-ghost btn-sm" onClick={onBackToDashboard}>
            <Home size={14} />
            <span>Return to Expedition Map</span>
          </button>
        </div>
      </div>
    </div>
  );
}
