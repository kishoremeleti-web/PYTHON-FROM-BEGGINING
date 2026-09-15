import React from "react";
import { ArrowRight, Trophy, Sparkles, Terminal, Flame, Zap, Compass, CheckCircle2 } from "lucide-react";
import { SerpentineMap } from "./SerpentineMap";
import { TopicIcon } from "../common/TopicIcons";

export function Dashboard({
  topics,
  studentName,
  totalXp,
  streakDays,
  completedTopicIds,
  currentTopicId,
  onStartOrContinue,
  onSelectTopic,
  onViewCompletion
}) {
  const completedCount = completedTopicIds.length;
  const totalTopics = topics.length;
  const progressPercent = Math.round((completedCount / totalTopics) * 100);
  const isAllCompleted = completedCount === totalTopics;

  // Current active destination
  const currentTopic = topics.find((t) => t.id === currentTopicId) || topics[0];

  return (
    <main className="editorial-dashboard-canvas">
      {/* Editorial Hero Lockup */}
      <section className="editorial-hero-zone">
        <div className="container hero-editorial-inner">
          {/* Top Line Telemetry Strip */}
          <div className="hero-telemetry-strip">
            <div className="telemetry-tag-item">
              <span className="telemetry-indicator-pulse" />
              <span className="mono-tag">EXPEDITION // PHASE 01</span>
            </div>
            <div className="telemetry-tag-item">
              <span className="mono-muted">EXPLORER //</span>
              <span className="mono-highlight">{studentName.toUpperCase()}</span>
            </div>
            <div className="telemetry-tag-item">
              <span className="mono-muted">TELEMETRY //</span>
              <span className="mono-highlight">
                <Zap size={12} fill="currentColor" color="var(--accent-lime)" /> {totalXp.toLocaleString()} XP
              </span>
              <span className="mono-divider">|</span>
              <span className="mono-highlight">
                <Flame size={12} color="#f97316" /> {String(streakDays).padStart(2, "0")}D MOMENTUM
              </span>
            </div>
          </div>

          {/* Monumental Editorial Headline */}
          <div className="hero-editorial-headline">
            <div className="headline-eyebrow">
              <span>FOUNDATION LEVEL</span>
              <span className="eyebrow-line" />
              <span>11 CHECKPOINTS</span>
            </div>
            <h1 className="hero-monumental-title">
              PYTHON<br />
              <span className="title-hollow-accent">EXPEDITION</span>
            </h1>
          </div>

          {/* Integrated Editorial Action Panel */}
          <div className="hero-action-panel-integrated">
            <div className="action-panel-left">
              <div className="target-checkpoint-label">
                <span className="target-pin-dot" />
                <span>ACTIVE DESTINATION // CHECKPOINT {String(currentTopic.number).padStart(2, "0")}</span>
              </div>
              <h2 className="target-checkpoint-name">{currentTopic.title}</h2>
              <p className="target-checkpoint-summary">{currentTopic.shortDescription}</p>

              {/* Progress Line Bar */}
              <div className="editorial-progress-line-wrap">
                <div className="progress-labels-row">
                  <span className="progress-editorial-title">ROUTE PROGRESSION</span>
                  <span className="progress-editorial-val">{progressPercent}% COMPLETED</span>
                </div>
                <div className="editorial-track">
                  <div
                    className="editorial-fill"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="action-panel-right">
              {isAllCompleted ? (
                <button
                  className="editorial-primary-cta completed-state"
                  onClick={onViewCompletion}
                >
                  <Trophy size={20} />
                  <span>VIEW EXPEDITION FINALE</span>
                  <ArrowRight size={20} />
                </button>
              ) : completedCount === 0 ? (
                <button
                  className="editorial-primary-cta"
                  onClick={() => onStartOrContinue(1)}
                >
                  <span>COMMENCE EXPEDITION</span>
                  <ArrowRight size={20} />
                </button>
              ) : (
                <button
                  className="editorial-primary-cta"
                  onClick={() => onStartOrContinue(currentTopic.id)}
                >
                  <span>CONTINUE CHECKPOINT {currentTopic.number}</span>
                  <ArrowRight size={20} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* The Dynamic Learning Journey Map (Replacing the 11-Card Grid!) */}
      <section className="editorial-map-section">
        <div className="container">
          <div className="map-intro-heading">
            <div className="map-intro-tag">
              <Compass size={14} color="var(--accent-lime)" />
              <span>THE EXPEDITION ROUTE</span>
            </div>
            <h2 className="map-intro-title">11 Destinations Across Python Foundations</h2>
            <p className="map-intro-sub">
              Each destination is an interactive checkpoint. Click any cleared or active checkpoint to embark.
            </p>
          </div>

          <SerpentineMap
            topics={topics}
            completedTopicIds={completedTopicIds}
            currentTopicId={currentTopicId}
            onSelectTopic={onSelectTopic}
          />
        </div>
      </section>
    </main>
  );
}
