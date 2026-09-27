import React, { useState } from "react";
import { Check, Lock, Zap, ChevronRight, Trophy, Play } from "lucide-react";
import { TopicIcon } from "../common/TopicIcons";

/**
 * Gaming Skill-Tree Map
 * Renders the branching tree layout requested by the user:
 * 01 -------------- 02
 *                    \
 *                     03
 *                     |
 *               YOU ARE HERE
 *                     |
 *                     04 ----- 05 ...
 *
 * Supports Chapter 1 (Python Basics, 11 Topics)
 * and Chapter 2 (Making Decisions, 10 Topics + 3 Mini Projects Arena).
 */

const VB_W = 1000;
const VB_H = 1260;

// Tree layout coordinates for Chapter 1 (11 topics)
const CH1_NODES = [
  { num: 1,  cx: 200, cy: 140 },
  { num: 2,  cx: 800, cy: 140 },
  { num: 3,  cx: 600, cy: 310 },
  { num: 4,  cx: 380, cy: 490 },
  { num: 5,  cx: 780, cy: 490 },
  { num: 6,  cx: 220, cy: 680 },
  { num: 7,  cx: 520, cy: 680 },
  { num: 8,  cx: 800, cy: 680 },
  { num: 9,  cx: 800, cy: 870 },
  { num: 10, cx: 500, cy: 870 },
  { num: 11, cx: 200, cy: 870 },
];

// Tree layout coordinates for Chapter 2 (10 topics)
const CH2_NODES = [
  { num: 1,  cx: 200, cy: 140 }, // 01: What are Conditional Statements?
  { num: 2,  cx: 800, cy: 140 }, // 02: Comparison Operators
  { num: 3,  cx: 600, cy: 310 }, // 03: if Statement
  { num: 4,  cx: 380, cy: 490 }, // 04: else Statement
  { num: 5,  cx: 780, cy: 490 }, // 05: elif Statement
  { num: 6,  cx: 220, cy: 680 }, // 06: Multiple Conditions
  { num: 7,  cx: 520, cy: 680 }, // 07: Logical Operators with Conditions
  { num: 8,  cx: 800, cy: 680 }, // 08: Nested if Statements
  { num: 9,  cx: 800, cy: 870 }, // 09: Ternary Operator
  { num: 10, cx: 500, cy: 870 }, // 10: match-case Statement
];

function buildPathSegments(nodes) {
  const segments = [];
  for (let i = 0; i < nodes.length - 1; i++) {
    const a = nodes[i];
    const b = nodes[i + 1];
    segments.push({
      fromIndex: i,
      toIndex: i + 1,
      fromNum: a.num,
      toNum: b.num,
      d: `M ${a.cx} ${a.cy} L ${b.cx} ${b.cy}`,
      midX: (a.cx + b.cx) / 2,
      midY: (a.cy + b.cy) / 2,
    });
  }
  return segments;
}

const CH1_SEGMENTS = buildPathSegments(CH1_NODES);
const CH2_SEGMENTS = buildPathSegments(CH2_NODES);

export function SerpentineMap({
  topics,
  completedTopicIds,
  currentTopicId,
  onSelectTopic,
  miniProjects = [],
  onOpenMiniProject = null,
  activeChapter = null,
  onChangeChapter = null,
}) {
  // Determine if active chapter is 1 or 2 (default to chapter of current topic)
  const currentTopic = topics.find((t) => t.id === currentTopicId);
  const currentChapter = currentTopic?.chapterNumber || 1;
  const [selectedChapter, setSelectedChapter] = useState(activeChapter || currentChapter);

  const displayedChapter = activeChapter || selectedChapter;

  const handleChapterClick = (chNum) => {
    setSelectedChapter(chNum);
    if (onChangeChapter) onChangeChapter(chNum);
  };

  // Filter topics for the current chapter
  const chapterTopics = topics.filter((t) => (t.chapterNumber || 1) === displayedChapter);
  const nodes = displayedChapter === 2 ? CH2_NODES : CH1_NODES;
  const segments = displayedChapter === 2 ? CH2_SEGMENTS : CH1_SEGMENTS;

  const [hoveredId, setHoveredId] = useState(null);

  const getStatus = (topicId) => {
    if (completedTopicIds.includes(topicId)) return "completed";
    if (topicId === currentTopicId) return "current";
    return "locked";
  };

  // Chapter statistics
  const ch1Topics = topics.filter((t) => (t.chapterNumber || 1) === 1);
  const ch2Topics = topics.filter((t) => (t.chapterNumber || 1) === 2);
  const ch1Completed = ch1Topics.filter((t) => completedTopicIds.includes(t.id)).length;
  const ch2Completed = ch2Topics.filter((t) => completedTopicIds.includes(t.id)).length;

  return (
    <div className="gmap-root">
      {/* Chapter Selection Tab Bar */}
      <div className="chapter-nav-bar">
        <button
          className={`chapter-tab-btn ${displayedChapter === 1 ? "active" : ""}`}
          onClick={() => handleChapterClick(1)}
        >
          <div className="ch-tab-badge">WORLD 01</div>
          <div className="ch-tab-main">
            <span className="ch-tab-title">PYTHON BASICS</span>
            <span className="ch-tab-progress">
              {ch1Completed === ch1Topics.length ? "CLEARED" : `${ch1Completed}/${ch1Topics.length} COMPLETED`}
            </span>
          </div>
          {ch1Completed === ch1Topics.length && <Check size={16} className="ch-tab-check" />}
        </button>

        <button
          className={`chapter-tab-btn ${displayedChapter === 2 ? "active" : ""}`}
          onClick={() => handleChapterClick(2)}
        >
          <div className="ch-tab-badge ch2">WORLD 02</div>
          <div className="ch-tab-main">
            <span className="ch-tab-title">MAKING DECISIONS</span>
            <span className="ch-tab-progress">
              {ch2Completed === ch2Topics.length ? "CLEARED" : `${ch2Completed}/${ch2Topics.length} COMPLETED`}
            </span>
          </div>
          {ch2Completed === ch2Topics.length && <Check size={16} className="ch-tab-check" />}
        </button>
      </div>

      {/* Chapter Eyebrow / Banner */}
      <div className="gmap-eyebrow">
        <span className="gmap-eyebrow-dot" />
        <span className="gmap-eyebrow-text">
          {displayedChapter === 2
            ? "CHAPTER 2 - MAKING DECISIONS // 10 LEVELS + 3 MINI PROJECTS"
            : "CHAPTER 1 - PYTHON BASICS // 11 LEVELS"}
        </span>
        <span className="gmap-eyebrow-dot" />
      </div>

      {/* Canvas Area */}
      <div className="gmap-canvas-wrap">
        <div className="gmap-aspect" style={{ paddingTop: `${(VB_H / VB_W) * 100}%` }}>
          <div className="gmap-inner">
            {/* SVG Highway & Connectors */}
            <svg
              className="gmap-svg"
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <filter id="glow-lime" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="glow-cyan" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur stdDeviation="12" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="glow-halo" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="22" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Cyber grid pattern */}
                <pattern id="circuit-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.015)" strokeWidth="1" />
                  <circle cx="0" cy="0" r="1.5" fill="rgba(0,216,246,0.12)" />
                </pattern>
              </defs>

              {/* Background ambient grid */}
              <rect width={VB_W} height={VB_H} fill="url(#circuit-grid)" />

              {/* 1. Base Dark Pipeline Shadow */}
              {segments.map((seg, idx) => (
                <path
                  key={`base-shadow-${idx}`}
                  d={seg.d}
                  fill="none"
                  stroke="#050914"
                  strokeWidth="38"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}

              {/* 2. Pipeline Steel Housing */}
              {segments.map((seg, idx) => (
                <path
                  key={`housing-${idx}`}
                  d={seg.d}
                  fill="none"
                  stroke="#10192e"
                  strokeWidth="24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}

              {/* 3. Center Guide Laser Wire */}
              {segments.map((seg, idx) => (
                <path
                  key={`wire-${idx}`}
                  d={seg.d}
                  fill="none"
                  stroke="#1c2d52"
                  strokeWidth="3"
                  strokeDasharray="12 16"
                  strokeLinecap="round"
                />
              ))}

              {/* 4. Active & Completed Conduits */}
              {segments.map((seg, idx) => {
                const fromTopic = chapterTopics[seg.fromIndex];
                const toTopic = chapterTopics[seg.toIndex];
                if (!fromTopic || !toTopic) return null;

                const fromStatus = getStatus(fromTopic.id);
                const toStatus = getStatus(toTopic.id);

                if (fromStatus === "completed" && toStatus === "completed") {
                  return (
                    <g key={`completed-seg-${idx}`}>
                      <path
                        d={seg.d}
                        fill="none"
                        stroke="#d4ff00"
                        strokeWidth="10"
                        strokeLinecap="round"
                        filter="url(#glow-lime)"
                        opacity="0.85"
                      />
                      <path
                        d={seg.d}
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        opacity="0.9"
                      />
                    </g>
                  );
                }

                if (fromStatus === "completed" && toStatus === "current") {
                  return (
                    <g key={`active-seg-${idx}`}>
                      <path
                        d={seg.d}
                        fill="none"
                        stroke="#00d8f6"
                        strokeWidth="10"
                        strokeLinecap="round"
                        filter="url(#glow-cyan)"
                        opacity="0.9"
                      />
                      <path
                        d={seg.d}
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray="16 12"
                        className="pulse-flow-dash"
                      />
                    </g>
                  );
                }

                return null;
              })}

              {/* 5. SVG Node Halos */}
              {nodes.map((n, idx) => {
                const topic = chapterTopics[idx];
                if (!topic) return null;
                const status = getStatus(topic.id);

                if (status === "completed") {
                  return (
                    <g key={`halo-${topic.id}`}>
                      <circle cx={n.cx} cy={n.cy} r={65} fill="rgba(212,255,0,0.12)" filter="url(#glow-halo)" />
                    </g>
                  );
                }

                if (status === "current") {
                  return (
                    <g key={`halo-${topic.id}`}>
                      <circle cx={n.cx} cy={n.cy} r={80} fill="rgba(0,216,246,0.15)" filter="url(#glow-halo)" />
                      <circle
                        cx={n.cx}
                        cy={n.cy}
                        r={58}
                        fill="none"
                        stroke="rgba(0,216,246,0.5)"
                        strokeWidth="2.5"
                        strokeDasharray="8 6"
                        className="radar-scan-svg"
                      />
                    </g>
                  );
                }

                return null;
              })}

              {/* Chapter 2 Conduit to Mini Projects Arena */}
              {displayedChapter === 2 && (
                <g>
                  <path
                    d="M 500 870 L 500 1020"
                    fill="none"
                    stroke="#1a2542"
                    strokeWidth="18"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 500 870 L 500 1020"
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="4"
                    strokeDasharray="10 8"
                    className="pulse-flow-dash"
                    opacity="0.8"
                  />
                  <path
                    d="M 240 1060 L 500 1020 L 760 1060"
                    fill="none"
                    stroke="#271a48"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 240 1060 L 500 1020 L 760 1060"
                    fill="none"
                    stroke="#c084fc"
                    strokeWidth="3"
                    strokeDasharray="12 10"
                    opacity="0.7"
                  />
                </g>
              )}
            </svg>

            {/* DOM Level Nodes */}
            {nodes.map((n, idx) => {
              const topic = chapterTopics[idx];
              if (!topic) return null;

              const status = getStatus(topic.id);
              const isUnlocked = status !== "locked";
              const isDone = status === "completed";
              const isHere = status === "current";
              const isHov = hoveredId === topic.id;

              const leftPct = (n.cx / VB_W) * 100;
              const topPct = (n.cy / VB_H) * 100;

              return (
                <div
                  key={topic.id}
                  className={`gmap-node ${status}${isUnlocked ? " unlocked" : ""}${isHov ? " hov" : ""}`}
                  style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                  onClick={() => isUnlocked && onSelectTopic(topic.id)}
                  onMouseEnter={() => setHoveredId(topic.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  role={isUnlocked ? "button" : "img"}
                  aria-label={`${topic.title} - ${status}`}
                  tabIndex={isUnlocked ? 0 : undefined}
                  onKeyDown={(e) => {
                    if (isUnlocked && (e.key === "Enter" || e.key === " ")) {
                      onSelectTopic(topic.id);
                    }
                  }}
                >
                  {/* Outer Radar Rings (Current level only) */}
                  {isHere && <span className="gmap-pulse-ring" />}
                  {isHere && <span className="gmap-pulse-ring delay" />}

                  {/* Main Circular Node Badge */}
                  <div className={`gmap-circle ${status}`}>
                    {/* Level Number Pill */}
                    <span className={`gmap-num ${status}`}>
                      {String(topic.number).padStart(2, "0")}
                    </span>

                    {/* Tech Glyph Icon */}
                    <div className="gmap-icon">
                      {isDone ? (
                        <Check size={28} strokeWidth={2.8} />
                      ) : isHere ? (
                        <TopicIcon
                          topicNumber={topic.number}
                          chapterNumber={topic.chapterNumber || 1}
                          size={26}
                        />
                      ) : (
                        <Lock size={20} strokeWidth={2} />
                      )}
                    </div>
                  </div>

                  {/* Labels Below Node */}
                  <div className="gmap-below">
                    {isHere && (
                      <div className="gmap-yah">
                        <span className="gmap-yah-dot" />
                        YOU ARE HERE
                      </div>
                    )}
                    <span className={`gmap-title ${status}`}>{topic.title}</span>
                    {isDone && (
                      <span className="gmap-cleared">
                        <Check size={10} strokeWidth={3} /> CLEARED
                      </span>
                    )}
                    <span className={`gmap-xp ${status}`}>
                      <Zap size={9} fill="currentColor" /> +110 XP
                    </span>
                  </div>

                  {/* Hover Popup Detail Card */}
                  {isUnlocked && isHov && (
                    <div className={`gmap-popup ${n.cx > 500 ? "pop-left" : "pop-right"}`}>
                      <div className="pop-header">
                        <span className="pop-level-badge">LEVEL {String(topic.number).padStart(2, "0")}</span>
                        <span className="pop-xp">
                          <Zap size={10} fill="currentColor" /> +110 XP
                        </span>
                      </div>
                      <p className="pop-title">{topic.title}</p>
                      <p className="pop-desc">{topic.shortDescription}</p>
                      <div className="pop-footer">
                        <span className="pop-action">
                          {isDone ? "REPLAY LESSON" : "ENTER MISSION"}
                          <ChevronRight size={13} />
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Chapter 2: Interactive Mini Projects Boss Arena */}
      {displayedChapter === 2 && miniProjects.length > 0 && (
        <div className="boss-arena-wrap">
          <div className="boss-arena-header">
            <div className="boss-badge">
              <Trophy size={14} />
              <span>CHAPTER 2 BOSS ARENA</span>
            </div>
            <h2 className="boss-title">Mini Projects & Decision Engines</h2>
            <p className="boss-desc">
              Test your mastery of conditional logic, operators, and decision branches with real-world mini-applications.
            </p>
          </div>

          <div className="boss-projects-grid">
            {miniProjects.map((proj) => (
              <div
                key={proj.id}
                className="boss-project-card"
                onClick={() => onOpenMiniProject && onOpenMiniProject(proj)}
              >
                <div className="proj-card-top">
                  <div className="proj-emoji-badge">{proj.emoji || "💻"}</div>
                  <span className="proj-difficulty-pill">{proj.difficulty}</span>
                </div>

                <div className="proj-card-body">
                  <h3 className="proj-card-title">{proj.title}</h3>
                  <p className="proj-card-desc">{proj.description}</p>
                </div>

                <div className="proj-card-concepts">
                  {proj.requiredConcepts?.map((c, ci) => (
                    <span key={ci} className="proj-concept-tag">
                      {c}
                    </span>
                  ))}
                </div>

                <div className="proj-card-footer">
                  <div className="proj-reward">
                    <Zap size={12} fill="currentColor" color="var(--accent-gold)" />
                    <span>+{proj.xpReward} XP</span>
                  </div>
                  <button className="proj-launch-btn">
                    <Play size={12} fill="currentColor" />
                    <span>BUILD & RUN</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ height: "4rem" }} />
    </div>
  );
}
