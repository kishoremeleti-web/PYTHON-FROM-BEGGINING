import React, { useState, useRef } from "react";
import { X, Play, RotateCcw, CheckCircle2, AlertCircle, HelpCircle, Zap, Terminal as TermIcon, Trophy } from "lucide-react";
import confetti from "canvas-confetti";
import { CodeEditor } from "../learning/CodeEditor";
import { Terminal } from "../learning/Terminal";
import { PythonRuntime } from "../../services/pythonEngine";
import { sounds } from "../../services/soundEffects";

export function MiniProjectModal({ project, isOpen, onClose, onAwardXp }) {
  if (!isOpen || !project) return null;

  const [code, setCode] = useState(project.starterCode || "");
  const [stdout, setStdout] = useState("");
  const [stderr, setStderr] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [terminalStatus, setTerminalStatus] = useState("ready"); // "ready" | "running" | "success" | "error"

  const [validationResult, setValidationResult] = useState(null); // null | { pass: boolean, message?: string, hint?: string }
  const [isCompleted, setIsCompleted] = useState(false);

  const runtimeRef = useRef(new PythonRuntime());

  const handleReset = () => {
    setCode(project.starterCode || "");
    setStdout("");
    setStderr("");
    setTerminalStatus("ready");
    setValidationResult(null);
  };

  const handleRunAndValidate = async () => {
    setIsRunning(true);
    setTerminalStatus("running");
    setStderr("");

    sounds.playClick();

    try {
      const result = await runtimeRef.current.run(code);
      setStdout(result.stdout || "");
      if (result.stderr) {
        setStderr(result.stderr);
        setTerminalStatus("error");
      } else {
        setTerminalStatus("ready");
      }

      // Run project validation function
      if (project.validate) {
        const val = project.validate(code, result.stdout || "");
        setValidationResult(val);

        if (val.pass) {
          setTerminalStatus("success");
          sounds.playSuccess();
          if (!isCompleted) {
            setIsCompleted(true);
            if (onAwardXp) {
              onAwardXp(project.xpReward || 75, `Completed Mini Project: ${project.title}`);
            }
            try {
              confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.6 }
              });
            } catch {
              // ignore confetti errors
            }
          }
        } else {
          sounds.playError();
        }
      }
    } catch (err) {
      setStderr(err.message || String(err));
      setTerminalStatus("error");
      sounds.playError();
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="mini-modal-overlay" onClick={onClose}>
      <div className="mini-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="mini-modal-header">
          <div className="mini-modal-title-group">
            <span className="mini-modal-emoji">{project.emoji || "🚀"}</span>
            <div>
              <div className="mini-modal-badge-row">
                <span className="mini-modal-tag">MINI PROJECT</span>
                <span className="mini-modal-diff">{project.difficulty || "Beginner"}</span>
              </div>
              <h2 className="mini-modal-title">{project.title}</h2>
            </div>
          </div>

          <div className="mini-modal-header-actions">
            <div className="mini-modal-xp-pill">
              <Zap size={14} fill="currentColor" color="var(--accent-gold)" />
              <span>+{project.xpReward || 75} XP</span>
            </div>
            <button className="mini-modal-close-btn" onClick={onClose} aria-label="Close modal">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content Body: 2 Columns */}
        <div className="mini-modal-body">
          {/* Left Column: Mission Briefing */}
          <div className="mini-modal-left">
            <div className="mini-brief-section">
              <h4 className="mini-section-label">MISSION BRIEF</h4>
              <p className="mini-brief-desc">{project.description}</p>
            </div>

            <div className="mini-brief-section">
              <h4 className="mini-section-label">SPECIFICATIONS</h4>
              <div className="mini-instructions-box">
                <pre>{project.instruction}</pre>
              </div>
            </div>

            <div className="mini-brief-section">
              <h4 className="mini-section-label">CORE CONCEPTS</h4>
              <div className="mini-concepts-list">
                {project.requiredConcepts?.map((concept, idx) => (
                  <span key={idx} className="mini-concept-pill">
                    {concept}
                  </span>
                ))}
              </div>
            </div>

            {/* Hint Dropdown */}
            {project.hint && (
              <div className="mini-hint-section">
                <button
                  className="mini-hint-toggle"
                  onClick={() => setShowHint((prev) => !prev)}
                >
                  <HelpCircle size={15} />
                  <span>{showHint ? "Hide Blueprint Hint" : "Need a Hint / Blueprint?"}</span>
                </button>

                {showHint && (
                  <div className="mini-hint-content">
                    <pre>{project.hint}</pre>
                  </div>
                )}
              </div>
            )}

            {/* Validation Feedback Banner */}
            {validationResult && (
              <div className={`mini-feedback-banner ${validationResult.pass ? "pass" : "fail"}`}>
                {validationResult.pass ? (
                  <>
                    <CheckCircle2 size={18} color="var(--accent-lime)" />
                    <div>
                      <strong>Mission Accomplished!</strong>
                      <p>{validationResult.message}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <AlertCircle size={18} color="#ef4444" />
                    <div>
                      <strong>Keep Going:</strong>
                      <p>{validationResult.hint || "Review your output and requirements."}</p>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Code Editor & Live Terminal */}
          <div className="mini-modal-right">
            <div className="mini-editor-wrapper">
              <CodeEditor
                code={code}
                onChange={setCode}
                onReset={handleReset}
              />
            </div>

            {/* Controls Bar */}
            <div className="mini-controls-bar">
              <button
                className="mini-reset-btn"
                onClick={handleReset}
                disabled={isRunning}
              >
                <RotateCcw size={14} />
                <span>Reset</span>
              </button>

              <button
                className={`mini-run-btn ${isRunning ? "running" : ""} ${isCompleted ? "completed" : ""}`}
                onClick={handleRunAndValidate}
                disabled={isRunning}
              >
                {isRunning ? (
                  <span>RUNNING PYTHON...</span>
                ) : isCompleted ? (
                  <>
                    <CheckCircle2 size={15} />
                    <span>PASSED (+{project.xpReward || 75} XP)</span>
                  </>
                ) : (
                  <>
                    <Play size={15} fill="currentColor" />
                    <span>RUN & VALIDATE</span>
                  </>
                )}
              </button>
            </div>

            {/* Terminal Output */}
            <div className="mini-terminal-wrapper">
              <Terminal
                stdout={stdout}
                stderr={stderr}
                status={terminalStatus}
                waitingInputPrompt={null}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
