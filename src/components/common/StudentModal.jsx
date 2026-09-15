import React, { useState } from "react";
import { User, RefreshCw, X, Check } from "lucide-react";

export function StudentModal({ isOpen, onClose, currentName, onSaveName, onResetProgress }) {
  const [nameInput, setNameInput] = useState(currentName || "Alex");
  const [confirmReset, setConfirmReset] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    if (nameInput.trim()) {
      onSaveName(nameInput.trim());
      onClose();
    }
  };

  const handleReset = () => {
    if (confirmReset) {
      onResetProgress(nameInput.trim() || "Student");
      setConfirmReset(false);
      onClose();
    } else {
      setConfirmReset(true);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          className="btn-ghost"
          style={{ position: "absolute", top: "1rem", right: "1rem", padding: "0.25rem" }}
          onClick={onClose}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="modal-celebration-icon" style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)" }}>
          <User size={34} />
        </div>

        <h2 className="modal-title">Student Profile</h2>
        <p className="modal-subtitle">
          Using a shared college lab computer? Personalize your profile or start fresh.
        </p>

        <form onSubmit={handleSave} style={{ marginBottom: "1.5rem", textAlign: "left" }}>
          <label style={{ display: "block", fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "0.4rem" }}>
            Your Name
          </label>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="e.g. Kishore"
              style={{
                flex: 1,
                background: "var(--bg-surface)",
                border: "1px solid var(--border-card)",
                borderRadius: "var(--radius-md)",
                padding: "0.65rem 1rem",
                color: "var(--text-primary)",
                fontFamily: "var(--font-sans)",
                fontSize: "0.95rem",
                outline: "none"
              }}
            />
            <button type="submit" className="btn btn-primary btn-sm">
              <Check size={16} /> Save
            </button>
          </div>
        </form>

        <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "1.25rem", textAlign: "left" }}>
          <h4 style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
            Reset Machine Progress
          </h4>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.85rem" }}>
            Clear completed topics and reset XP to 0 so the next student can learn from Topic 1.
          </p>

          <button
            type="button"
            className="btn btn-danger-ghost btn-sm"
            onClick={handleReset}
            style={{ width: "100%" }}
          >
            <RefreshCw size={15} />
            {confirmReset ? "Click again to confirm reset" : "Reset Progress for New Student"}
          </button>
        </div>
      </div>
    </div>
  );
}
