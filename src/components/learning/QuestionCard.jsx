import React, { useState, useEffect } from "react";
import { CheckCircle2, AlertCircle, ArrowRight, RotateCcw, Zap, HelpCircle } from "lucide-react";
import { sounds } from "../../services/soundEffects";

const OPTION_LETTERS = ["A", "B", "C", "D", "E"];

export function QuestionCard({
  question,
  questionIndex,
  totalQuestions,
  onQuestionPassed
}) {
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [hasAwardedThisQuestion, setHasAwardedThisQuestion] = useState(false);

  // Reset local state when moving to a new question
  useEffect(() => {
    setSelectedIdx(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setIsShaking(false);
    setHasAwardedThisQuestion(false);
  }, [question.id]);

  const handleSelectOption = (idx) => {
    if (isCorrect) return;

    setSelectedIdx(idx);
    setIsAnswered(true);

    const correct = idx === question.correctIndex;
    setIsCorrect(correct);

    if (correct) {
      sounds.playCorrect();
      if (!hasAwardedThisQuestion) {
        setHasAwardedThisQuestion(true);
      }
    } else {
      sounds.playIncorrect();
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  const handleTryAgain = () => {
    setSelectedIdx(null);
    setIsAnswered(false);
    setIsCorrect(false);
  };

  const handleNext = () => {
    onQuestionPassed(question.id);
  };

  return (
    <div className={`tactical-quiz-card ${isShaking ? "shake-animation" : ""}`}>
      {/* Top Header: Tag + Question Number */}
      <div className="quiz-card-header">
        <div className="quiz-category-tag">
          <HelpCircle size={13} />
          <span>{question.tag.toUpperCase()}</span>
        </div>
        <div className="quiz-counter-tag">
          QUESTION // {String(questionIndex + 1).padStart(2, "0")} OF {String(totalQuestions).padStart(2, "0")}
        </div>
      </div>

      {/* Main Question Prompt */}
      <h2 className="quiz-prompt-heading">{question.prompt}</h2>

      {/* Code Snippet if applicable */}
      {question.codeSnippet && (
        <div className="quiz-snippet-box">
          <div className="snippet-bar">
            <span>snippet.py</span>
          </div>
          <pre className="snippet-content">{question.codeSnippet}</pre>
        </div>
      )}

      {/* Option Buttons Grid */}
      <div className="quiz-options-list">
        {question.options.map((option, idx) => {
          let stateClass = "option-card";
          if (isAnswered) {
            if (idx === selectedIdx) {
              stateClass += isCorrect ? " correct" : " incorrect";
            }
          }

          return (
            <button
              key={idx}
              className={stateClass}
              onClick={() => handleSelectOption(idx)}
              disabled={isCorrect}
            >
              <div className="option-key-badge">
                {OPTION_LETTERS[idx]}
              </div>
              <div className="option-label-text">{option}</div>
              {isAnswered && idx === selectedIdx && (
                <div className="option-status-glyph">
                  {isCorrect ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback Banner */}
      {isAnswered && (
        <div className={`quiz-feedback-banner ${isCorrect ? "correct" : "incorrect"}`}>
          <div className="feedback-banner-header">
            {isCorrect ? (
              <>
                <CheckCircle2 size={18} />
                <span>EXCELLENT // CORRECT ANSWER (+10 XP)</span>
              </>
            ) : (
              <>
                <AlertCircle size={18} />
                <span>NOT QUITE // LET'S UNDERSTAND WHY:</span>
              </>
            )}
          </div>
          <p className="feedback-banner-text">
            {isCorrect ? question.explanationCorrect : question.explanationIncorrect}
          </p>
        </div>
      )}

      {/* Action Controls */}
      <div className="quiz-card-footer">
        {isAnswered && !isCorrect && (
          <button className="btn btn-secondary" onClick={handleTryAgain}>
            <RotateCcw size={15} /> Try Again
          </button>
        )}

        {isCorrect && (
          <button className="editorial-primary-cta magnetic-btn" onClick={handleNext}>
            <span>
              {questionIndex + 1 === totalQuestions
                ? "PROCEED TO CODING LAB →"
                : "NEXT QUESTION →"}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
