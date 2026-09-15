import React, { useState } from "react";
import { Check, Lock, Play, ArrowRight, Zap, Eye } from "lucide-react";
import { TopicIcon } from "../common/TopicIcons";

/**
 * Serpentine Expedition Map (Phase 1)
 * Displays all 11 topics along a winding expedition trail:
 * Row 1 (L->R): 01 ── 02 ── 03 ──┐
 * Row 2 (R->L): 06 ── 05 ── 04 ──┘
 * Row 3 (L->R): 07 ── 08 ── 09 ──┐
 * Row 4 (R->L):       11 ── 10 ──┘
 */
export function SerpentineMap({ topics, completedTopicIds, currentTopicId, onSelectTopic }) {
  const [hoveredTopicId, setHoveredTopicId] = useState(null);

  // Group topics into serpentine rows of 3
  // Row 1: [1, 2, 3] (left-to-right)
  // Row 2: [6, 5, 4] (reversed right-to-left)
  // Row 3: [7, 8, 9] (left-to-right)
  // Row 4: [null, 11, 10] (reversed right-to-left)
  const rows = [
    {
      direction: "ltr",
      hasTurnDown: "right",
      items: [topics[0], topics[1], topics[2]]
    },
    {
      direction: "rtl",
      hasTurnDown: "left",
      items: [topics[5], topics[4], topics[3]] // displayed visually as 06, 05, 04
    },
    {
      direction: "ltr",
      hasTurnDown: "right",
      items: [topics[6], topics[7], topics[8]] // displayed visually as 07, 08, 09
    },
    {
      direction: "rtl",
      hasTurnDown: null,
      items: [null, topics[10], topics[9]] // displayed visually as [empty, 11, 10]
    }
  ];

  const getStatus = (topic) => {
    if (!topic) return null;
    if (completedTopicIds.includes(topic.id)) return "completed";
    if (topic.id === currentTopicId) return "current";
    return "locked";
  };

  return (
    <div className="serpentine-map-wrapper">
      {/* Map Telemetry Header */}
      <div className="map-telemetry-header">
        <div className="map-header-left">
          <span className="telemetry-radar-beacon" />
          <span className="telemetry-label">EXPEDITION ROUTE // 11 DESTINATIONS</span>
        </div>
        <div className="map-header-right">
          <span className="telemetry-counter">
            {completedTopicIds.length} / {topics.length} CHECKPOINTS CLEARED
          </span>
        </div>
      </div>

      {/* Serpentine Path Grid */}
      <div className="serpentine-track-layout">
        {rows.map((row, rowIdx) => (
          <div key={rowIdx} className={`serpentine-row ${row.direction}`}>
            {row.items.map((topic, colIdx) => {
              if (!topic) {
                return <div key={`empty-${colIdx}`} className="checkpoint-placeholder" />;
              }

              const status = getStatus(topic);
              const isUnlocked = status === "completed" || status === "current";
              const isCurrent = status === "current";
              const isCompleted = status === "completed";

              return (
                <div
                  key={topic.id}
                  className={`checkpoint-node ${status} ${isUnlocked ? "unlocked" : ""}`}
                  onClick={() => isUnlocked && onSelectTopic(topic.id)}
                  onMouseEnter={() => setHoveredTopicId(topic.id)}
                  onMouseLeave={() => setHoveredTopicId(null)}
                  role={isUnlocked ? "button" : undefined}
                  tabIndex={isUnlocked ? 0 : undefined}
                  onKeyDown={(e) => {
                    if (isUnlocked && (e.key === "Enter" || e.key === " ")) {
                      onSelectTopic(topic.id);
                    }
                  }}
                >
                  {/* Horizontal Segment Connector (within row) */}
                  {colIdx < 2 && row.items[colIdx + 1] && (
                    <div
                      className={`horizontal-path-link ${
                        isCompleted ? "active" : ""
                      }`}
                    />
                  )}

                  {/* Corner Turn Connector (to next row) */}
                  {colIdx === 2 && row.hasTurnDown === "right" && (
                    <div
                      className={`corner-turn-link turn-right ${
                        completedTopicIds.includes(topics[rowIdx * 3 + 3]?.id) || isCompleted
                          ? "active"
                          : ""
                      }`}
                    />
                  )}

                  {colIdx === 0 && row.hasTurnDown === "left" && (
                    <div
                      className={`corner-turn-link turn-left ${
                        completedTopicIds.includes(topics[rowIdx * 3 + 3]?.id) || isCompleted
                          ? "active"
                          : ""
                      }`}
                    />
                  )}

                  {/* Destination Station Box */}
                  <div className="checkpoint-station-card">
                    <div className="station-top-bar">
                      <div className="station-num-badge">
                        <span className="num-prefix">DEST //</span>
                        <span className="num-val">
                          {String(topic.number).padStart(2, "0")}
                        </span>
                      </div>

                      <div className="station-glyph-box">
                        <TopicIcon topicNumber={topic.number} size={16} />
                      </div>
                    </div>

                    <h3 className="station-title">{topic.title}</h3>
                    <p className="station-brief">{topic.shortDescription}</p>

                    <div className="station-footer-bar">
                      {isCompleted && (
                        <span className="station-status-pill completed">
                          <Check size={11} strokeWidth={3} /> CLEARED
                        </span>
                      )}

                      {isCurrent && (
                        <span className="station-status-pill current">
                          <span className="radar-ping-ring" /> YOU ARE HERE
                        </span>
                      )}

                      {status === "locked" && (
                        <span className="station-status-pill locked">
                          <Lock size={10} /> LOCKED
                        </span>
                      )}

                      <span className="station-reward">
                        <Zap size={11} fill="currentColor" /> +110 XP
                      </span>
                    </div>

                    {/* Interactive Prompt on Hover / Active */}
                    {isUnlocked && (
                      <div className="station-hover-prompt">
                        <span>{isCurrent ? "EMBARK →" : "REVIEW ↺"}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
