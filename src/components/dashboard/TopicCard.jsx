import React from "react";
import { Check, Lock, ArrowRight, RotateCcw, Zap } from "lucide-react";
import { TopicIcon } from "../common/TopicIcons";

export function TopicCard({ topic, status, onSelectTopic }) {
  // status: "completed" | "current" | "locked"
  const isUnlocked = status === "completed" || status === "current";

  const handleClick = () => {
    if (isUnlocked) {
      onSelectTopic(topic.id);
    }
  };

  return (
    <div
      className={`topic-card ${status} ${isUnlocked ? "unlocked" : ""}`}
      onClick={handleClick}
      role={isUnlocked ? "button" : undefined}
      tabIndex={isUnlocked ? 0 : undefined}
      onKeyDown={(e) => {
        if (isUnlocked && (e.key === "Enter" || e.key === " ")) {
          handleClick();
        }
      }}
    >
      {/* Top Bar: Custom Icon + Node Number + Status */}
      <div className="topic-card-top">
        <div className="topic-icon-wrap">
          <TopicIcon topicNumber={topic.number} size={18} className="topic-card-icon" />
          <span className="topic-node-label">
            NODE // {String(topic.number).padStart(2, "0")}
          </span>
        </div>

        <div>
          {status === "completed" && (
            <span className="topic-status-badge completed">
              <Check size={12} strokeWidth={3} /> COMPLETED
            </span>
          )}
          {status === "current" && (
            <span className="topic-status-badge current">
              <span className="pulse-dot-inner" /> IN PROGRESS
            </span>
          )}
          {status === "locked" && (
            <span className="topic-status-badge locked">
              <Lock size={11} /> LOCKED
            </span>
          )}
        </div>
      </div>

      {/* Main Title & Description */}
      <div className="topic-card-body">
        <h3 className="topic-title">{topic.title}</h3>
        <p className="topic-desc">{topic.shortDescription}</p>
      </div>

      {/* Bottom Footer: XP and Action Trigger */}
      <div className="topic-footer">
        <span className="topic-xp-tag">
          <Zap size={13} fill="currentColor" /> +110 XP
        </span>

        <span className="topic-action-text">
          {status === "completed" && (
            <>
              <RotateCcw size={13} /> Review Topic
            </>
          )}
          {status === "current" && (
            <>
              <span>Continue</span>
              <ArrowRight size={14} />
            </>
          )}
          {status === "locked" && (
            <span className="locked-label">
              Topic {topic.number - 1} required
            </span>
          )}
        </span>
      </div>
    </div>
  );
}
