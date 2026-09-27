import React from "react";
import { ArrowRight, Trophy, Flame, Zap } from "lucide-react";
import { SerpentineMap } from "./SerpentineMap";

export function Dashboard({
  topics,
  studentName,
  totalXp,
  streakDays,
  completedTopicIds,
  currentTopicId,
  miniProjects = [],
  onOpenMiniProject,
  onStartOrContinue,
  onSelectTopic,
  onViewCompletion,
}) {
  const completedCount = completedTopicIds.length;
  const totalTopics = topics.length;
  const progressPercent = Math.round((completedCount / totalTopics) * 100);
  const isAllCompleted = completedCount === totalTopics;
  const currentTopic = topics.find((t) => t.id === currentTopicId) || topics[0];

  return (
    <main className="gmap-dashboard">
      {/* -- Thin HUD strip below navbar -- */}
      <div className="gmap-hud">
        <div className="gmap-hud-left">
          <div className="gmap-hud-stat">
            <Flame size={13} className="hud-flame" />
            <span>{String(streakDays).padStart(2, "0")}D</span>
          </div>
          <div className="gmap-hud-stat">
            <Zap size={13} fill="currentColor" className="hud-zap" />
            <span>{totalXp.toLocaleString()} XP</span>
          </div>
        </div>

        <div className="gmap-hud-center">
          <div className="gmap-hud-bar-wrap">
            <div
              className="gmap-hud-bar-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="gmap-hud-bar-label">
            {completedCount} / {totalTopics}
          </span>
        </div>

        <div className="gmap-hud-right">
          {isAllCompleted ? (
            <button className="gmap-hud-cta done" onClick={onViewCompletion}>
              <Trophy size={13} />
              EXPEDITION COMPLETE
            </button>
          ) : completedCount === 0 ? (
            <button
              className="gmap-hud-cta"
              onClick={() => onStartOrContinue(currentTopic.id)}
            >
              BEGIN
              <ArrowRight size={13} />
            </button>
          ) : (
            <button
              className="gmap-hud-cta"
              onClick={() => onStartOrContinue(currentTopic.id)}
            >
              CONTINUE #{currentTopic.number}
              <ArrowRight size={13} />
            </button>
          )}
        </div>
      </div>

      {/* -- The path IS the page -- */}
      <SerpentineMap
        topics={topics}
        completedTopicIds={completedTopicIds}
        currentTopicId={currentTopicId}
        onSelectTopic={onSelectTopic}
        miniProjects={miniProjects}
        onOpenMiniProject={onOpenMiniProject}
      />
    </main>
  );
}
