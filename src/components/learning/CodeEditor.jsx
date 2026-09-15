import React, { useRef } from "react";
import { FileCode, RotateCcw } from "lucide-react";

export function CodeEditor({ code, onChange, onReset, readOnly = false }) {
  const textareaRef = useRef(null);

  // Compute line numbers
  const lines = code.split("\n");
  const lineNumbers = Array.from({ length: Math.max(lines.length, 7) }, (_, i) => i + 1);

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;

      // Insert 4 spaces
      const updated = code.substring(0, start) + "    " + code.substring(end);
      onChange(updated);

      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4;
        }
      }, 0);
    }
  };

  return (
    <div className="developer-editor-panel">
      {/* Editor Toolbar */}
      <div className="developer-editor-bar">
        <div className="editor-file-tab">
          <FileCode size={13} color="var(--accent-cyan)" />
          <span>solution.py</span>
          <span className="file-lang-pill">PYTHON 3.11</span>
        </div>

        <div className="editor-toolbar-actions">
          {onReset && (
            <button
              className="btn-ghost btn-sm reset-code-btn"
              onClick={onReset}
              title="Reset code to original starter template"
            >
              <RotateCcw size={11} />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Editor Main Canvas with Gutter Line Numbers */}
      <div className="developer-editor-canvas">
        <div className="developer-editor-gutter">
          {lineNumbers.map((num) => (
            <div key={num} className="gutter-num">{num}</div>
          ))}
        </div>

        <textarea
          ref={textareaRef}
          className="developer-code-area"
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          readOnly={readOnly}
          rows={Math.max(lines.length + 2, 8)}
          placeholder="# Write your Python code here..."
        />
      </div>
    </div>
  );
}
