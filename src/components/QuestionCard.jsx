import React, { useState, useEffect } from 'react';
import '../styles/QuestionCard.css';

function QuestionCard({ question, questionNumber, onAnswer, userAnswer, mode, showFeedback, isCorrect }) {
  const [selectedOptions, setSelectedOptions] = useState(
    userAnswer !== null ? (Array.isArray(userAnswer) ? userAnswer : [userAnswer]) : []
  );
  const [trueFalseAnswer, setTrueFalseAnswer] = useState(
    userAnswer !== null && (question.type === 'truefalse') ? userAnswer : null
  );
  const [numericAnswer, setNumericAnswer] = useState(
    userAnswer !== null && (question.type === 'numeric') ? userAnswer : ''
  );

  useEffect(() => {
    // 問題が変わった時、またはuserAnswerがnullの時に状態をリセット
    if (userAnswer === null) {
      if (question.type === 'multiple' || question.type === 'single') {
        setSelectedOptions([]);
      } else if (question.type === 'truefalse') {
        setTrueFalseAnswer(null);
      } else if (question.type === 'numeric') {
        setNumericAnswer('');
      }
    } else {
      // userAnswerがある場合は、その値で状態を更新
      if (question.type === 'multiple' || question.type === 'single') {
        setSelectedOptions(Array.isArray(userAnswer) ? userAnswer : [userAnswer]);
      } else if (question.type === 'truefalse') {
        setTrueFalseAnswer(userAnswer);
      } else if (question.type === 'numeric') {
        setNumericAnswer(userAnswer);
      }
    }
  }, [userAnswer, question.id, question.type]);

  const handleOptionChange = (index) => {
    if (question.type === 'multiple') {
      const newSelected = selectedOptions.includes(index)
        ? selectedOptions.filter(i => i !== index)
        : [...selectedOptions, index];
      setSelectedOptions(newSelected);
      onAnswer(newSelected);
    } else if (question.type === 'single') {
      setSelectedOptions([index]);
      onAnswer(index);
    }
  };

  const handleTrueFalse = (value) => {
    setTrueFalseAnswer(value);
    onAnswer(value);
  };

  const handleNumericChange = (e) => {
    const value = e.target.value;
    setNumericAnswer(value);
    if (value !== '') {
      onAnswer(Number(value));
    } else {
      onAnswer(null);
    }
  };

  return (
    <div className="question-card">
      <div className="question-header">
        <span className="question-number">Question {questionNumber}</span>
      </div>
      <div className="question-text">{question.question}</div>

      {question.type === 'multiple' || question.type === 'single' ? (
        <div className="options-container">
          {question.options.map((option, index) => {
            const isCorrectOption = question.correctAnswers.includes(index);
            const isSelected = selectedOptions.includes(index);
            return (
              <label
                key={index}
                className={`option-label ${
                  selectedOptions.includes(index) ? 'selected' : ''
                } ${
                  mode === 'practice' && showFeedback
                    ? isCorrectOption
                      ? 'correct-answer'
                      : isSelected && !isCorrectOption
                      ? 'incorrect-answer'
                      : ''
                    : ''
                } ${mode === 'practice' && showFeedback ? 'disabled' : ''}`}
              >
                <input
                  type={question.type === 'multiple' ? 'checkbox' : 'radio'}
                  name={`question-${question.id}`}
                  checked={selectedOptions.includes(index)}
                  onChange={() => handleOptionChange(index)}
                  disabled={mode === 'practice' && showFeedback}
                />
                <span className="option-text">{option}</span>
                {mode === 'practice' && showFeedback && isCorrectOption && (
                  <span className="correct-mark">✓</span>
                )}
              </label>
            );
          })}
        </div>
      ) : question.type === 'truefalse' ? (
        <div className="truefalse-container">
          <button
            className={`truefalse-button ${trueFalseAnswer === true ? 'selected' : ''} ${
              mode === 'practice' && showFeedback && question.correctAnswer === true
                ? 'correct-answer'
                : mode === 'practice' && showFeedback && trueFalseAnswer === true && !question.correctAnswer
                ? 'incorrect-answer'
                : ''
            }`}
            onClick={() => handleTrueFalse(true)}
            disabled={mode === 'practice' && showFeedback}
          >
            True
            {mode === 'practice' && showFeedback && question.correctAnswer === true && (
              <span className="correct-mark">✓</span>
            )}
          </button>
          <button
            className={`truefalse-button ${trueFalseAnswer === false ? 'selected' : ''} ${
              mode === 'practice' && showFeedback && question.correctAnswer === false
                ? 'correct-answer'
                : mode === 'practice' && showFeedback && trueFalseAnswer === false && !question.correctAnswer
                ? 'incorrect-answer'
                : ''
            }`}
            onClick={() => handleTrueFalse(false)}
            disabled={mode === 'practice' && showFeedback}
          >
            False
            {mode === 'practice' && showFeedback && question.correctAnswer === false && (
              <span className="correct-mark">✓</span>
            )}
          </button>
        </div>
      ) : question.type === 'numeric' ? (
        <div className="numeric-container">
          <input
            type="number"
            className="numeric-input"
            value={numericAnswer}
            onChange={handleNumericChange}
            placeholder="Enter a number"
            disabled={mode === 'practice' && showFeedback}
          />
        </div>
      ) : null}

      {/* 練習モードのフィードバック表示 */}
      {mode === 'practice' && showFeedback && userAnswer !== null && (
        <div className={`feedback-container ${isCorrect ? 'correct' : 'incorrect'}`}>
          <div className="feedback-header">
            <span className="feedback-icon">{isCorrect ? '✓' : '✗'}</span>
            <span className="feedback-text">
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </span>
          </div>
          <div className="feedback-answer">
            <div className="feedback-label">Correct Answer:</div>
            <div className="feedback-value">
              {question.type === 'multiple' || question.type === 'single' ? (
                question.correctAnswers.map(idx => question.options[idx]).join(', ')
              ) : question.type === 'truefalse' ? (
                question.correctAnswer ? 'True' : 'False'
              ) : (
                question.correctAnswer
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuestionCard;
