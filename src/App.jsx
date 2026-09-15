import React, { useState, useEffect } from "react";
import { Navbar } from "./components/common/Navbar";
import { Dashboard } from "./components/dashboard/Dashboard";
import { JourneyView } from "./components/learning/JourneyView";
import { PhaseComplete } from "./components/completion/PhaseComplete";
import { StudentModal } from "./components/common/StudentModal";
import { CustomCursor } from "./components/common/CustomCursor";
import { TOPICS } from "./data/pythonBasics";
import { storageService } from "./services/storageService";
import { sounds } from "./services/soundEffects";

export function App() {
  // Application view state: "dashboard" | "journey" | "completion"
  const [view, setView] = useState("dashboard");

  // Active topic when in journey
  const [activeTopicId, setActiveTopicId] = useState(1);

  // Student progress state
  const [studentData, setStudentData] = useState(() => storageService.loadProgress());
  const [recentXpReward, setRecentXpReward] = useState(0);

  // Sound muting state
  const [isMuted, setIsMuted] = useState(sounds.isMuted());

  // Profile modal toggle
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Save changes to localStorage whenever studentData updates
  useEffect(() => {
    storageService.saveProgress(studentData);
  }, [studentData]);

  const handleToggleSound = () => {
    const nextMuted = sounds.toggleMute();
    setIsMuted(nextMuted);
  };

  // Award XP with floating animation
  const handleAwardXp = (amount) => {
    setRecentXpReward(amount);
    setStudentData((prev) => ({
      ...prev,
      totalXp: prev.totalXp + amount
    }));

    // Clear floating notification after animation completes
    setTimeout(() => {
      setRecentXpReward(0);
    }, 1800);
  };

  // Start or Continue learning
  const handleStartOrContinue = (topicId) => {
    setActiveTopicId(topicId);
    setView("journey");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Select a specific topic card from the dashboard
  const handleSelectTopic = (topicId) => {
    setActiveTopicId(topicId);
    setView("journey");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Topic finished handler
  const handleTopicFinished = (finishedTopicId) => {
    setStudentData((prev) => {
      const isAlreadyCompleted = prev.completedTopicIds.includes(finishedTopicId);
      const newCompleted = isAlreadyCompleted
        ? prev.completedTopicIds
        : [...prev.completedTopicIds, finishedTopicId];

      // If this was the current topic, advance to next if available
      let nextCurrent = prev.currentTopicId;
      if (finishedTopicId === prev.currentTopicId && finishedTopicId < TOPICS.length) {
        nextCurrent = finishedTopicId + 1;
      }

      return {
        ...prev,
        completedTopicIds: newCompleted,
        currentTopicId: nextCurrent
      };
    });
  };

  // Exit Journey handler (safely saves and returns to dashboard)
  const handleExitJourney = (triggerPhaseComplete = false) => {
    if (triggerPhaseComplete || studentData.completedTopicIds.length === TOPICS.length) {
      setView("completion");
    } else {
      setView("dashboard");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Save student name
  const handleSaveStudentName = (name) => {
    setStudentData((prev) => ({ ...prev, studentName: name }));
  };

  // Reset progress for new student (college computer support)
  const handleResetProgress = (newName) => {
    const fresh = storageService.resetProgress(newName);
    setStudentData(fresh);
    setView("dashboard");
  };

  const activeTopic = TOPICS.find((t) => t.id === activeTopicId) || TOPICS[0];
  const nextTopic = TOPICS.find((t) => t.id === activeTopicId + 1) || null;

  return (
    <div className="app-layout">
      {/* Desktop Custom Precision Cursor */}
      <CustomCursor />

      {/* Top HUD Navbar */}
      <Navbar
        studentName={studentData.studentName}
        totalXp={studentData.totalXp}
        streakDays={studentData.streakDays}
        recentXpReward={recentXpReward}
        inJourney={view === "journey"}
        isMuted={isMuted}
        onToggleSound={handleToggleSound}
        onExitJourney={() => handleExitJourney(false)}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onLogoClick={() => setView("dashboard")}
      />

      {/* Main View Router */}
      {view === "dashboard" && (
        <Dashboard
          topics={TOPICS}
          studentName={studentData.studentName}
          totalXp={studentData.totalXp}
          streakDays={studentData.streakDays}
          completedTopicIds={studentData.completedTopicIds}
          currentTopicId={studentData.currentTopicId}
          onStartOrContinue={handleStartOrContinue}
          onSelectTopic={handleSelectTopic}
          onViewCompletion={() => setView("completion")}
        />
      )}

      {view === "journey" && (
        <JourneyView
          key={activeTopic.id}
          topic={activeTopic}
          nextTopic={nextTopic}
          onAwardXp={handleAwardXp}
          onTopicFinished={handleTopicFinished}
          onContinueToTopic={(id) => {
            setActiveTopicId(id);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onExitJourney={handleExitJourney}
        />
      )}

      {view === "completion" && (
        <PhaseComplete
          totalXp={studentData.totalXp}
          streakDays={studentData.streakDays}
          onBackToDashboard={() => {
            setView("dashboard");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      )}

      {/* Student Profile / Computer Sharing Modal */}
      <StudentModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentName={studentData.studentName}
        onSaveName={handleSaveStudentName}
        onResetProgress={handleResetProgress}
      />
    </div>
  );
}

export default App;
