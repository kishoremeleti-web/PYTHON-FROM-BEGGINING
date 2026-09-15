import React, { useState } from "react";
import { Coffee, Code, CheckCircle, Zap, ArrowRight, BookOpen, Copy, Check, Lightbulb } from "lucide-react";
import { TopicIcon } from "../common/TopicIcons";

export function LessonStep({ topic, onCompleteLesson }) {
  const { lesson } = topic;
  const [copied, setCopied] = useState(false);
  const [thinkChoice, setThinkChoice] = useState(null);

  const handleCopy = () => {
    if (lesson.codeExample) {
      navigator.clipboard.writeText(lesson.codeExample);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Quick contextual "Think about this" reflection question based on topic
  const thinkPrompts = {
    1: {
      question: "If you tell a robot to make tea without boiling the water first, what happens?",
      choices: ["The robot boils water automatically", "Cold tea leaves in cold water!", "The robot says an error"],
      answerIndex: 1,
      insight: "Exactly! Computers execute strictly what you write, not what you intended."
    },
    2: {
      question: "Why do programmers use Python instead of writing raw computer binary (0s and 1s)?",
      choices: ["Binary is deleted every hour", "Python is human-readable and translates to binary for us", "Computers don't support binary anymore"],
      answerIndex: 1,
      insight: "Spot on! Python is a high-level bridge between human ideas and computer hardware."
    },
    3: {
      question: "What makes `print(\"Hello\")` different from `print(Hello)` without quotes?",
      choices: ["Quotes tell Python it's literal text, not a variable name", "No difference at all", "Quotes make the text blue"],
      answerIndex: 0,
      insight: "Correct! Without quotes, Python looks for a variable called 'Hello'."
    },
    4: {
      question: "Will adding 100 comments slow down how fast your Python program runs?",
      choices: ["Yes, every comment adds 1 second", "No, Python completely ignores comments at runtime", "Only on Sundays"],
      answerIndex: 1,
      insight: "Exactly! Comments are 100% ignored by the Python interpreter."
    },
    5: {
      question: "If you assign `score = 10` and then `score = 25`, what is inside `score`?",
      choices: ["10", "25 (the most recent value)", "Both 10 and 25 together"],
      answerIndex: 1,
      insight: "Yes! Variables hold whatever value was most recently assigned."
    },
    6: {
      question: "Can you do math addition directly between text `\"10\"` and number `5`?",
      choices: ["Yes, gives 15", "No, text and numbers cannot be added without conversion", "Gives 105"],
      answerIndex: 1,
      insight: "Right! Python keeps types separate to prevent accidental math bugs."
    },
    7: {
      question: "What is `type(3.14)`?",
      choices: ["<class 'int'>", "<class 'float'>", "<class 'str'>"],
      answerIndex: 1,
      insight: "Spot on! Any number with a decimal fraction is a float."
    },
    8: {
      question: "What does `int(3.9)` produce?",
      choices: ["4 (rounds up)", "3 (chops off decimals)", "3.9"],
      answerIndex: 1,
      insight: "Correct! int() truncates (cuts off) decimals without rounding."
    },
    9: {
      question: "What data type does `input()` return even if the user types `100`?",
      choices: ["int", "float", "str (string of text)"],
      answerIndex: 2,
      insight: "Spot on! input() always yields text; convert with int() if needed."
    },
    10: {
      question: "What is the difference between `=` and `==`?",
      choices: ["They are identical", "`=` assigns a value, `==` tests equality", "`==` is only for math"],
      answerIndex: 1,
      insight: "Crucial concept! Single `=` stores; double `==` checks if equal."
    },
    11: {
      question: "In Python string indexing, what index corresponds to the very first letter?",
      choices: ["Index 1", "Index 0", "Index -1"],
      answerIndex: 1,
      insight: "Zero-based indexing! The first character is always at index 0."
    }
  };

  const think = thinkPrompts[topic.number] || thinkPrompts[1];

  return (
    <div className="editorial-lesson-card">
      {/* Editorial Header */}
      <div className="editorial-header">
        <div className="editorial-meta-tag">
          <TopicIcon topicNumber={topic.number} size={15} />
          <span>CHECKPOINT // TOPIC {String(topic.number).padStart(2, "0")}</span>
        </div>
        <h1 className="editorial-title">{topic.title}</h1>
        <p className="editorial-lead">{lesson.easyDefinition}</p>
      </div>

      {/* Real-Life Analogy (Step tiles) */}
      {lesson.realLifeExample && (
        <section className="editorial-section">
          <div className="section-label">
            <Coffee size={16} color="var(--accent-amber)" />
            <span>REAL-LIFE ANALOGY // {lesson.realLifeExample.title.toUpperCase()}</span>
          </div>

          <div className="analogy-card-editorial">
            <p className="analogy-premise">{lesson.realLifeExample.analogy}</p>

            {lesson.realLifeExample.steps && (
              <div className="analogy-steps-grid">
                {lesson.realLifeExample.steps.map((step, idx) => (
                  <div key={idx} className="analogy-step-tile">
                    <span className="step-num">{String(idx + 1).padStart(2, "0")}</span>
                    <span className="step-text">{step.replace(/^\d+\.\s*/, "")}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="analogy-takeaway-bar">
              <span className="takeaway-badge">KEY INSIGHT</span>
              <p className="takeaway-text">{lesson.realLifeExample.takeaway}</p>
            </div>
          </div>
        </section>
      )}

      {/* Connecting to Programming Bridge */}
      <section className="editorial-section">
        <div className="section-label">
          <CheckCircle size={16} color="var(--accent-mint)" />
          <span>CONNECTING TO PROGRAMMING</span>
        </div>
        <div className="connection-editorial-box">
          <p>{lesson.integratedExplanation}</p>
        </div>
      </section>

      {/* Real Developer Code Block with Copy & Syntax Styling */}
      {lesson.codeExample && (
        <section className="editorial-section">
          <div className="section-label">
            <Code size={16} color="var(--accent-cyan)" />
            <span>PYTHON 3 CODE ENVIRONMENT</span>
          </div>

          <div className="code-block-editorial">
            <div className="code-block-bar">
              <div className="code-block-file">
                <span className="code-dot red" />
                <span className="code-dot yellow" />
                <span className="code-dot green" />
                <span className="code-filename">demo.py</span>
              </div>
              <button
                className="copy-btn"
                onClick={handleCopy}
                title="Copy code to clipboard"
              >
                {copied ? (
                  <>
                    <Check size={13} color="var(--accent-mint)" />
                    <span style={{ color: "var(--accent-mint)" }}>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <div className="code-content-wrapper">
              <div className="code-gutter">
                {lesson.codeExample.split("\n").map((_, i) => (
                  <span key={i}>{i + 1}</span>
                ))}
              </div>
              <pre className="code-pre">{lesson.codeExample}</pre>
            </div>
          </div>
        </section>
      )}

      {/* Interactive "Think About This" Moment */}
      <section className="editorial-section">
        <div className="think-box-card">
          <div className="think-header">
            <Lightbulb size={16} color="var(--accent-amber)" />
            <span>THINK ABOUT THIS // QUICK INTUITION CHECK</span>
          </div>
          <p className="think-question">{think.question}</p>

          <div className="think-choices-row">
            {think.choices.map((choice, idx) => {
              const isSelected = thinkChoice === idx;
              const isCorrect = idx === think.answerIndex;
              let choiceClass = "think-choice-btn";
              if (isSelected) {
                choiceClass += isCorrect ? " correct" : " incorrect";
              }

              return (
                <button
                  key={idx}
                  className={choiceClass}
                  onClick={() => setThinkChoice(idx)}
                >
                  <span className="choice-indicator">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{choice}</span>
                </button>
              );
            })}
          </div>

          {thinkChoice !== null && (
            <div className="think-insight-banner">
              <strong>💡 Reflection:</strong> {think.insight}
            </div>
          )}
        </div>
      </section>

      {/* Key Takeaways */}
      {lesson.keyTakeaways && (
        <div className="takeaways-chip-row">
          {lesson.keyTakeaways.map((item, idx) => (
            <div key={idx} className="takeaway-chip">
              <span className="chip-bullet">✦</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      )}

      {/* Action Footer */}
      <div className="editorial-footer-bar">
        <div className="reward-hint">
          <Zap size={15} fill="currentColor" color="var(--accent-lime)" />
          <span>+10 XP rewarded for completing this lesson</span>
        </div>
        <button
          className="editorial-primary-cta magnetic-btn"
          onClick={onCompleteLesson}
        >
          <span>I UNDERSTAND — COMMENCE 5 VERIFICATIONS</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
