import React from 'react';
import '../styles/ResultScreen.css';

function ResultScreen({ score, totalQuestions, questions, userAnswers, onRestart }) {
  const checkAnswer = (question, userAnswer) => {
    if (question.type === 'multiple' || question.type === 'single') {
      const correctIndices = question.correctAnswers;
      const userIndices = Array.isArray(userAnswer) ? userAnswer : [userAnswer];
      return (
        userIndices.length === correctIndices.length &&
        userIndices.every(idx => correctIndices.includes(idx))
      );
    } else if (question.type === 'truefalse') {
      return userAnswer === question.correctAnswer;
    } else if (question.type === 'numeric') {
      return Number(userAnswer) === question.correctAnswer;
    }
    return false;
  };

  // スコアを再計算（正確性を保証するため）
  const calculatedScore = questions.reduce((acc, question, index) => {
    const userAnswer = userAnswers[index];
    if (userAnswer !== null && checkAnswer(question, userAnswer)) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const percentage = Math.round((calculatedScore / totalQuestions) * 100);

  return (
    <div className="result-screen">
      <div className="result-header">
        <h1>Results</h1>
        <div className="score-display">
          <div className="score-circle">
            <span className="score-number">{calculatedScore}</span>
            <span className="score-total">/ {totalQuestions}</span>
          </div>
          <div className="score-percentage">{percentage}%</div>
        </div>
      </div>

      <div className="result-details">
        <h2>Question Review</h2>
        <div className="questions-review">
          {questions.map((question, index) => {
            const isCorrect = checkAnswer(question, userAnswers[index]);
            return (
              <div key={question.id} className={`review-item ${isCorrect ? 'correct' : 'incorrect'}`}>
                <div className="review-header">
                  <span className="review-number">Question {index + 1}</span>
                  <span className={`review-status ${isCorrect ? 'correct' : 'incorrect'}`}>
                    {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                  </span>
                </div>
                <div className="review-question">{question.question}</div>
                <div className="review-answers">
                  <div className="review-user-answer">
                    <strong>Your Answer:</strong>{' '}
                    {question.type === 'multiple' || question.type === 'single' ? (
                      Array.isArray(userAnswers[index]) ? (
                        userAnswers[index].map(idx => question.options[idx]).join(', ')
                      ) : (
                        question.options[userAnswers[index]]
                      )
                    ) : question.type === 'truefalse' ? (
                      userAnswers[index] ? 'True' : 'False'
                    ) : (
                      userAnswers[index]
                    )}
                  </div>
                  <div className="review-correct-answer">
                    <strong>Correct Answer:</strong>{' '}
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
            );
          })}
        </div>
      </div>

      <div className="result-footer">
        <button className="restart-button" onClick={onRestart}>
          Try Again
        </button>
      </div>
    </div>
  );
}

export default ResultScreen;
