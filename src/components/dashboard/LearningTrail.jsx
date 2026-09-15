import React from "react";
import { Check, Lock, Play } from "lucide-react";
import { TopicIcon } from "../common/TopicIcons";

export function LearningTrail({ topics, completedTopicIds, currentTopicId, onSelectTopic }) {
  return (
    <div className="learning-trail-panel">
      <div className="trail-panel-header">
        <div className="trail-header-title">
          <span className="trail-pulse-dot" />
          <span>JOURNEY MAP // 11 CHECKPOINTS</span>
        </div>
        <span className="trail-counter">
          {completedTopicIds.length} / {topics.length} CLEARED
        </span>
      </div>

      <div className="trail-timeline">
        {topics.map((topic, idx) => {
          const isCompleted = completedTopicIds.includes(topic.id);
          const isCurrent = topic.id === currentTopicId && !isCompleted;
          const isLocked = !isCompleted && !isCurrent;
          const isClickable = isCompleted || isCurrent;

          let statusClass = "locked";
          if (isCompleted) statusClass = "completed";
          else if (isCurrent) statusClass = "current";

          return (
            <div
              key={topic.id}
              className={`trail-item ${statusClass} ${isClickable ? "clickable" : ""}`}
              onClick={() => isClickable && onSelectTopic(topic.id)}
              role={isClickable ? "button" : undefined}
              tabIndex={isClickable ? 0 : undefined}
              onKeyDown={(e) => {
                if (isClickable && (e.key === "Enter" || e.key === " ")) {
                  onSelectTopic(topic.id);
                }
              }}
            >
              {/* Connector line between nodes */}
              {idx < topics.length - 1 && (
                <div
                  className={`trail-connector-segment ${
                    completedTopicIds.includes(topics[idx + 1].id) || isCompleted ? "active" : ""
                  }`}
                />
              )}

              {/* Node Beacon */}
              <div className="trail-node-beacon">
                {isCompleted ? (
                  <div className="node-icon-inner completed" title="Completed">
                    <Check size={13} strokeWidth={3} />
                  </div>
                ) : isCurrent ? (
                  <div className="node-icon-inner current" title="Current Topic">
                    <span className="beacon-radar-ping" />
                    <Play size={11} fill="currentColor" />
                  </div>
                ) : (
                  <div className="node-icon-inner locked" title="Locked">
                    <Lock size={11} />
                  </div>
                )}
              </div>

              {/* Node Details */}
              <div className="trail-node-content">
                <div className="trail-node-meta">
                  <span className="node-num">
                    {String(topic.number).padStart(2, "0")}
                  </span>
                  <TopicIcon topicNumber={topic.number} size={14} className="node-custom-icon" />
                  <span className="node-title">{topic.title}</span>
                </div>
                {isCurrent && (
                  <span className="node-status-tag current">ACTIVE</span>
                )}
                {isCompleted && (
                  <span className="node-status-tag completed">DONE</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
