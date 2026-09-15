import React, { useState, useEffect } from "react";
import { BookOpen, HelpCircle, Code, ChevronLeft, LogOut, Compass } from "lucide-react";
import { LessonStep } from "./LessonStep";
import { QuizStep } from "./QuizStep";
import { CodingStep } from "./CodingStep";
import { TopicCompleteModal } from "./TopicCompleteModal";
import { TopicIcon } from "../common/TopicIcons";

export function JourneyView({
  topic,
  nextTopic,
  onAwardXp,
  onTopicFinished,
  onContinueToTopic,
  onExitJourney
}) {
  // Step: "lesson" | "quiz" | "coding"
  const [currentStep, setCurrentStep] = useState("lesson");
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  // Fast theatrical entrance reveal (400ms)
  useEffect(() => {
    setIsRevealed(false);
    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 50);
    return () => clearTimeout(timer);
  }, [topic.id, currentStep]);

  // 1. Lesson Completed -> Award 10 XP -> Go to Quiz
  const handleLessonCompleted = () => {
    onAwardXp(10, `Completed Lesson ${topic.number}`);
    setCurrentStep("quiz");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 2. Question Correctly Answered -> Award 10 XP
  const handleQuestionAnswered = (qId) => {
    onAwardXp(10, `Quiz Question ${qId}`);
  };

  // 3. All 5 Questions Passed -> Go to Coding Challenge
  const handleQuizCompleted = () => {
    setCurrentStep("coding");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 4. Coding Challenge Passed -> Award 25 XP + 25 XP Bonus -> Show Modal
  const handleChallengeCompleted = () => {
    onAwardXp(50, `Topic ${topic.number} Challenge & Bonus`);
    onTopicFinished(topic.id);
    setShowCompletionModal(true);
  };

  const handleModalContinue = () => {
    setShowCompletionModal(false);
    if (nextTopic) {
      onContinueToTopic(nextTopic.id);
      setCurrentStep("lesson");
    } else {
      onExitJourney(true);
    }
  };

  return (
    <div className="editorial-journey-shell">
      {/* Top HUD Navigation Bar */}
      <div className="journey-top-hud">
        <div className="container hud-inner-flex">
          <div className="hud-left-nav">
            <button
              className="hud-back-link"
              onClick={() => onExitJourney(false)}
              title="Return to Expedition Route"
            >
              <ChevronLeft size={16} />
              <span>EXPEDITION MAP</span>
            </button>

            <span className="hud-sep">/</span>

            <div className="hud-current-dest">
              <span className="dest-num">{String(topic.number).padStart(2, "0")}</span>
              <span className="dest-title">{topic.title.toUpperCase()}</span>
            </div>
          </div>

          {/* Stepper indicators */}
          <div className="hud-stepper-stages">
            <button
              className={`stage-pill ${currentStep === "lesson" ? "active" : "done"}`}
              onClick={() => setCurrentStep("lesson")}
            >
              <BookOpen size={12} />
              <span>01. INTEL</span>
            </button>
            <div className="stage-connector-dot" />
            <button
              className={`stage-pill ${currentStep === "quiz" ? "active" : currentStep === "coding" ? "done" : ""}`}
              onClick={() => currentStep === "coding" && setCurrentStep("quiz")}
            >
              <HelpCircle size={12} />
              <span>02. VERIFY (5)</span>
            </button>
            <div className="stage-connector-dot" />
            <button
              className={`stage-pill ${currentStep === "coding" ? "active" : ""}`}
            >
              <Code size={12} />
              <span>03. CODE LAB</span>
            </button>
          </div>

          <div>
            <button
              className="hud-exit-btn"
              onClick={() => onExitJourney(false)}
              title="Exit and return to route (progress is saved)"
            >
              <LogOut size={13} />
              <span>EXIT</span>
            </button>
          </div>
        </div>
      </div>

      {/* Theatrical Header Marquee */}
      <div className="editorial-marquee-intro">
        <div className="container">
          <div className="intro-badge-row">
            <span className="intro-dot-radar" />
            <span className="intro-meta-coord">CHECKPOINT // {String(topic.number).padStart(2, "0")} OF 11</span>
            <span className="intro-meta-tag">PYTHON FOUNDATIONS</span>
          </div>

          <div className="intro-huge-title-lockup">
            <span className="huge-checkpoint-num">{String(topic.number).padStart(2, "0")}</span>
            <div className="huge-title-content">
              <h1 className="huge-topic-name">{topic.title}</h1>
              <p className="huge-topic-sub">{topic.shortDescription}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Step Container with Staged Transition */}
      <div className={`container journey-step-canvas ${isRevealed ? "revealed" : ""}`}>
        {currentStep === "lesson" && (
          <LessonStep
            topic={topic}
            onCompleteLesson={handleLessonCompleted}
          />
        )}

        {currentStep === "quiz" && (
          <QuizStep
            topic={topic}
            onQuestionAnsweredCorrectly={handleQuestionAnswered}
            onCompleteQuiz={handleQuizCompleted}
          />
        )}

        {currentStep === "coding" && (
          <CodingStep
            topic={topic}
            onCompleteChallenge={handleChallengeCompleted}
          />
        )}
      </div>

      {/* Topic Completion Celebration Modal */}
      {showCompletionModal && (
        <TopicCompleteModal
          topic={topic}
          nextTopic={nextTopic}
          onContinueNext={handleModalContinue}
          onBackToDashboard={() => {
            setShowCompletionModal(false);
            onExitJourney(false);
          }}
        />
      )}
    </div>
  );
}
