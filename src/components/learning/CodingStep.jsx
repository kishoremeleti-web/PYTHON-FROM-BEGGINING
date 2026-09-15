import React, { useState, useRef } from "react";
import { Play, CheckCircle2, AlertCircle, HelpCircle, Zap, Terminal as TerminalIcon, Send, ArrowRight } from "lucide-react";
import { CodeEditor } from "./CodeEditor";
import { Terminal } from "./Terminal";
import { PythonRuntime } from "../../services/pythonEngine";
import { sounds } from "../../services/soundEffects";
import { TopicIcon } from "../common/TopicIcons";

export function CodingStep({ topic, onCompleteChallenge }) {
  const { codingChallenge } = topic;

  const [code, setCode] = useState(codingChallenge.starterCode);
  const [stdout, setStdout] = useState("");
  const [stderr, setStderr] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [terminalStatus, setTerminalStatus] = useState("ready"); // "ready" | "running" | "success" | "error"

  // Input callback resolver for interactive terminal
  const [waitingInputPrompt, setWaitingInputPrompt] = useState(null);
  const inputResolverRef = useRef(null);

  // Validation State
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isPassed, setIsPassed] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackHint, setFeedbackHint] = useState("");

  const runtimeRef = useRef(new PythonRuntime());

  const handleReset = () => {
    setCode(codingChallenge.starterCode);
    setStdout("");
    setStderr("");
    setTerminalStatus("ready");
    setHasSubmitted(false);
    setIsPassed(false);
    setFeedbackMessage("");
    setFeedbackHint("");
    setWaitingInputPrompt(null);
  };

  const handleInputRequested = (promptText) => {
    setWaitingInputPrompt(promptText || "Enter input: ");
    return new Promise((resolve) => {
      inputResolverRef.current = resolve;
    });
  };

  const handleTerminalInputSubmit = (val) => {
    setWaitingInputPrompt(null);
    if (inputResolverRef.current) {
      inputResolverRef.current(val);
      inputResolverRef.current = null;
    }
  };

  // Run Code only (testing without final grading)
  const handleRunCode = async () => {
    setIsRunning(true);
    setTerminalStatus("running");
    setStderr("");
    try {
      const result = await runtimeRef.current.run(code, handleInputRequested);
      setStdout(result.stdout);
      setStderr(result.stderr);
      setTerminalStatus(result.success ? "ready" : "error");
    } catch (err) {
      setStderr(err.message || String(err));
      setTerminalStatus("error");
    } finally {
      setIsRunning(false);
    }
  };

  // Submit Code for Evaluation
  const handleSubmitCode = async () => {
    setIsRunning(true);
    setTerminalStatus("running");
    setStderr("");
    setHasSubmitted(true);

    try {
      const result = await runtimeRef.current.run(code, handleInputRequested);
      setStdout(result.stdout);
      setStderr(result.stderr);

      if (!result.success) {
        setIsPassed(false);
        setTerminalStatus("error");
        setFeedbackMessage("Not quite yet.");
        setFeedbackHint(`Syntax/Runtime error: ${result.stderr}`);
        sounds.playIncorrect();
        return;
      }

      // Run challenge validator
      const validation = codingChallenge.validate(code, result.stdout, result.env);

      if (validation.pass) {
        setIsPassed(true);
        setTerminalStatus("success");
        setFeedbackMessage(validation.message || "Correct! 🎉");
        setFeedbackHint("");
        sounds.playCorrect();
      } else {
        setIsPassed(false);
        setTerminalStatus("error");
        setFeedbackMessage("Not quite yet.");
        setFeedbackHint(validation.hint || "Review your program requirements and try again.");
        sounds.playIncorrect();
      }
    } catch (err) {
      setIsPassed(false);
      setTerminalStatus("error");
      setFeedbackMessage("Not quite yet.");
      setFeedbackHint(err.message || "Execution failed.");
      sounds.playIncorrect();
    } finally {
      setIsRunning(false);
    }
  };

  const handleFinalize = () => {
    if (isPassed) {
      onCompleteChallenge();
    }
  };

  return (
    <div className="developer-challenge-layout">
      {/* Top Header Card */}
      <div className="challenge-overview-card">
        <div className="challenge-overview-top">
          <div className="hud-badge-tag" style={{ margin: 0 }}>
            <TopicIcon topicNumber={topic.number} size={14} />
            <span>TOPIC {topic.number} // CODING CHALLENGE</span>
          </div>
          <span className="challenge-reward-badge">
            <Zap size={13} fill="currentColor" /> +25 XP REWARD
          </span>
        </div>

        <h1 className="challenge-main-heading">{codingChallenge.title}</h1>
        <div className="challenge-brief-box">
          <p className="brief-instruction">{codingChallenge.instruction}</p>
        </div>

        {/* Collapsible Hint Drawer */}
        {codingChallenge.hint && (
          <div className="hint-drawer">
            <button
              className="hint-toggle-trigger"
              onClick={() => setShowHint(!showHint)}
            >
              <HelpCircle size={14} />
              <span>{showHint ? "Hide Hint" : "Need a Hint?"}</span>
            </button>
            {showHint && (
              <div className="hint-content-box">
                💡 <strong>Hint:</strong> {codingChallenge.hint}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Editor & Terminal Workspace */}
      <div className={`developer-workspace-grid ${isPassed ? "workspace-success" : ""}`}>
        <div className="workspace-editor-col">
          <CodeEditor
            code={code}
            onChange={setCode}
            onReset={handleReset}
            readOnly={isPassed}
          />
        </div>

        <div className="workspace-terminal-col">
          <Terminal
            stdout={stdout}
            stderr={stderr}
            status={terminalStatus}
            waitingInputPrompt={waitingInputPrompt}
            onSubmitInput={handleTerminalInputSubmit}
          />
        </div>
      </div>

      {/* Evaluation Feedback Banner */}
      {hasSubmitted && (
        <div className={`challenge-feedback-panel ${isPassed ? "correct" : "incorrect"}`}>
          <div className="feedback-panel-header">
            {isPassed ? (
              <>
                <CheckCircle2 size={18} />
                <span>CHALLENGE VERIFIED // {feedbackMessage} (+25 XP)</span>
              </>
            ) : (
              <>
                <AlertCircle size={18} />
                <span>VERIFICATION FAILED // {feedbackMessage}</span>
              </>
            )}
          </div>
          <p className="feedback-panel-text">
            {isPassed
              ? `You demonstrated the expected Python concept for Topic ${topic.number} (${topic.title}).`
              : feedbackHint}
          </p>
        </div>
      )}

      {/* Bottom Action Controls */}
      <div className="challenge-actions-footer">
        <div className="actions-left-group">
          <button
            className="btn btn-secondary magnetic-btn"
            onClick={handleRunCode}
            disabled={isRunning || isPassed}
          >
            <Play size={14} fill="currentColor" />
            <span>Run Code</span>
          </button>
          <button
            className="btn btn-primary magnetic-btn"
            onClick={handleSubmitCode}
            disabled={isRunning || isPassed}
          >
            <Send size={14} />
            <span>Submit Solution</span>
          </button>
        </div>

        {isPassed && (
          <button
            className="editorial-primary-cta magnetic-btn pulse-glow-btn"
            onClick={handleFinalize}
          >
            <Zap size={16} fill="currentColor" />
            <span>CLEAR CHECKPOINT (+25 XP BONUS) →</span>
          </button>
        )}
      </div>
    </div>
  );
}
