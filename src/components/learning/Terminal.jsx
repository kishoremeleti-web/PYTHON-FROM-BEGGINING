import React, { useState } from "react";
import { CornerDownLeft, Terminal as TerminalIcon } from "lucide-react";

export function Terminal({ stdout, stderr, status = "ready", waitingInputPrompt, onSubmitInput }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (onSubmitInput) {
      onSubmitInput(inputValue);
      setInputValue("");
    }
  };

  const hasOutput = Boolean(stdout || stderr || waitingInputPrompt);

  return (
    <div className="terminal-panel-developer">
      {/* Terminal Top Bar */}
      <div className="terminal-bar-developer">
        <div className="terminal-bar-left">
          <div className="terminal-traffic-lights">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
          </div>
          <div className="terminal-label">
            <TerminalIcon size={12} />
            <span>CONSOLE // STDOUT</span>
          </div>
        </div>

        {/* Live Status Pill */}
        <div className={`terminal-status-pill ${status}`}>
          <span className="status-indicator-dot" />
          <span>STATUS // {status.toUpperCase()}</span>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="terminal-body-developer">
        {!hasOutput && (
          <div className="terminal-idle-message">
            <span>$ python3 solution.py</span>
            <p className="idle-hint">Click 'Run Code' or 'Submit Solution' to execute in this terminal.</p>
          </div>
        )}

        {stdout && <div className="term-stream-stdout">{stdout}</div>}

        {/* Live interactive input prompt if code requested input() */}
        {waitingInputPrompt !== null && waitingInputPrompt !== undefined && (
          <form onSubmit={handleInputSubmit} className="term-interactive-prompt">
            <span className="prompt-label">
              {waitingInputPrompt || "Enter input:"}
            </span>
            <input
              type="text"
              className="term-input-field"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your answer and press Enter..."
              autoFocus
            />
            <button
              type="submit"
              className="btn btn-primary btn-sm send-input-btn"
            >
              <CornerDownLeft size={13} />
            </button>
          </form>
        )}

        {stderr && <div className="term-stream-stderr">{stderr}</div>}
      </div>
    </div>
  );
}
