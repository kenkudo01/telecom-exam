import React from 'react';
import '../styles/ModeSelection.css';

function ModeSelection({ onSelectMode }) {
  return (
    <div className="mode-selection">
      <div className="mode-selection-card">
        <h1>Telecom Exam Quiz</h1>
        <p className="mode-description">Please select a mode</p>
        <div className="mode-buttons">
          <button
            className="mode-button exam-mode"
            onClick={() => onSelectMode('exam')}
          >
            <div className="mode-icon">📝</div>
            <div className="mode-title">Exam Mode</div>
            <div className="mode-detail">
              View results after completing all questions
            </div>
          </button>
          <button
            className="mode-button practice-mode"
            onClick={() => onSelectMode('practice')}
          >
            <div className="mode-icon">📚</div>
            <div className="mode-title">Practice Mode</div>
            <div className="mode-detail">
              Check answers after each question
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModeSelection;
