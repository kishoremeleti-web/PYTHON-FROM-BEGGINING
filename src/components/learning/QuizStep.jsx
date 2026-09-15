import React, { useState } from "react";
import { Check, HelpCircle } from "lucide-react";
import { QuestionCard } from "./QuestionCard";

export function QuizStep({ topic, onQuestionAnsweredCorrectly, onCompleteQuiz }) {
  const { questions } = topic;
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [passedQuestionIds, setPassedQuestionIds] = useState([]);

  const currentQuestion = questions[currentQIndex];

  const handleQuestionPassed = (qId) => {
    let nextPassed = passedQuestionIds;
    if (!passedQuestionIds.includes(qId)) {
      nextPassed = [...passedQuestionIds, qId];
      setPassedQuestionIds(nextPassed);
      onQuestionAnsweredCorrectly(qId);
    }

    if (currentQIndex + 1 < questions.length) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      onCompleteQuiz();
    }
  };

  return (
    <div className="quiz-experience-container">
      {/* Quiz Progress Bar & Checkpoints */}
      <div className="quiz-hud-tracker">
        <div className="hud-tracker-left">
          <div className="hud-badge-tag" style={{ margin: 0 }}>
            <HelpCircle size={13} />
            <span>TOPIC {topic.number} QUIZ</span>
          </div>
          <span className="hud-tracker-title">5 Verification Checkpoints</span>
        </div>

        <div className="quiz-segmented-track">
          {questions.map((q, idx) => {
            const isPassed = passedQuestionIds.includes(q.id);
            const isActive = idx === currentQIndex;

            let segmentClass = "track-segment";
            if (isPassed) segmentClass += " passed";
            else if (isActive) segmentClass += " active";

            return (
              <div key={q.id} className={segmentClass} title={`Question ${idx + 1}`}>
                <div className="segment-bar" />
                <span className="segment-label">
                  {isPassed ? <Check size={11} strokeWidth={3} /> : idx + 1}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Question */}
      {currentQuestion && (
        <QuestionCard
          key={currentQuestion.id}
          question={currentQuestion}
          questionIndex={currentQIndex}
          totalQuestions={questions.length}
          onQuestionPassed={handleQuestionPassed}
        />
      )}
    </div>
  );
}
