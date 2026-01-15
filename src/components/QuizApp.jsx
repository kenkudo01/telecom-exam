import React, { useState, useEffect } from 'react';
import questionsData from '../data/questions.json';
import ModeSelection from './ModeSelection.jsx';
import QuestionCard from './QuestionCard.jsx';
import ResultScreen from './ResultScreen.jsx';
import '../styles/QuizApp.css';

function QuizApp() {
  const [mode, setMode] = useState(null); // 'exam' or 'practice' or null
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const checkAnswer = (question, answer) => {
    if (question.type === 'multiple' || question.type === 'single') {
      const correctIndices = question.correctAnswers;
      const userIndices = Array.isArray(answer) ? answer : [answer];
      return (
        userIndices.length === correctIndices.length &&
        userIndices.every(idx => correctIndices.includes(idx))
      );
    } else if (question.type === 'truefalse') {
      return answer === question.correctAnswer;
    } else if (question.type === 'numeric') {
      return Number(answer) === question.correctAnswer;
    }
    return false;
  };

  const shuffleOptions = (question) => {
    // 選択肢がない問題（True/False、数値入力）はそのまま返す
    if (!question.options || question.options.length === 0) {
      return question;
    }

    // 元のインデックス配列を作成
    const originalIndices = question.options.map((_, index) => index);
    
    // インデックスをシャッフル
    const shuffledIndices = [...originalIndices].sort(() => Math.random() - 0.5);
    
    // シャッフルされた選択肢を作成
    const shuffledOptions = shuffledIndices.map(index => question.options[index]);
    
    // 正解のインデックスを新しいインデックスにマッピング
    const newCorrectAnswers = question.correctAnswers.map(originalIndex => {
      return shuffledIndices.indexOf(originalIndex);
    });

    // 新しい問題オブジェクトを返す
    return {
      ...question,
      options: shuffledOptions,
      correctAnswers: newCorrectAnswers,
      originalOptions: question.options, // 結果表示用に元の選択肢も保持
      originalCorrectAnswers: question.correctAnswers // 結果表示用に元の正解も保持
    };
  };

  const initializeQuiz = () => {
    // 問題をシャッフル
    const shuffledQuestions = [...questionsData].sort(() => Math.random() - 0.5);
    
    // 各問題の選択肢をシャッフル
    const questionsWithShuffledOptions = shuffledQuestions.map(question => {
      if (question.type === 'multiple' || question.type === 'single') {
        return shuffleOptions(question);
      }
      return question;
    });
    
    setQuestions(questionsWithShuffledOptions);
    setUserAnswers(new Array(questionsWithShuffledOptions.length).fill(null));
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsFinished(false);
    setShowResult(false);
    setShowFeedback(false);
  };

  // 問題が変わった時にフィードバックをリセット
  useEffect(() => {
    setShowFeedback(false);
  }, [currentQuestionIndex]);

  const handleSelectMode = (selectedMode) => {
    setMode(selectedMode);
    initializeQuiz();
  };

  const handleAnswer = (answer) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newAnswers);
  };

  const handleCheckAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const currentAnswer = userAnswers[currentQuestionIndex];
    
    if (currentAnswer === null) return;

    // 正解チェック
    const isCorrect = checkAnswer(currentQuestion, currentAnswer);

    // スコアを更新（フィードバック表示時に一度だけカウント）
    if (isCorrect && !showFeedback) {
      setScore(prev => prev + 1);
    }

    // フィードバックを表示
    setShowFeedback(true);
  };

  const handleNext = () => {
    // 試験モード、または練習モードで答え合わせをせずに進んだ場合、スコアを計算
    const currentQuestion = questions[currentQuestionIndex];
    const currentAnswer = userAnswers[currentQuestionIndex];
    
    if (currentAnswer !== null) {
      const isCorrect = checkAnswer(currentQuestion, currentAnswer);
      
      // 試験モードでは常にスコアを計算
      // 練習モードでは、答え合わせをしていない場合のみスコアを計算
      if (mode === 'exam' || (mode === 'practice' && !showFeedback)) {
        if (isCorrect) {
          setScore(prev => prev + 1);
        }
      }
    }

    // フィードバックをリセット
    setShowFeedback(false);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setMode(null);
    initializeQuiz();
  };

  // モード選択画面
  if (mode === null) {
    return <ModeSelection onSelectMode={handleSelectMode} />;
  }

  if (questions.length === 0) {
    return <div className="loading">Loading...</div>;
  }

  if (showResult) {
    return (
      <ResultScreen
        score={score}
        totalQuestions={questions.length}
        questions={questions}
        userAnswers={userAnswers}
        onRestart={handleRestart}
      />
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const currentAnswer = userAnswers[currentQuestionIndex];
  const isCorrect = currentAnswer !== null ? checkAnswer(currentQuestion, currentAnswer) : null;

  return (
    <div className="quiz-app">
      <div className="quiz-header">
        <h1>telecom exam</h1>
        <div className="mode-badge">
          {mode === 'exam' ? '📝 Exam Mode' : '📚 Practice Mode'}
        </div>
        <div className="progress-info">
          <span>Question {currentQuestionIndex + 1} / {questions.length}</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <QuestionCard
        question={currentQuestion}
        questionNumber={currentQuestionIndex + 1}
        onAnswer={handleAnswer}
        userAnswer={currentAnswer}
        mode={mode}
        showFeedback={showFeedback}
        isCorrect={isCorrect}
      />

      <div className="quiz-footer">
        {mode === 'practice' ? (
          <div className="practice-buttons">
            <button
              className="check-button"
              onClick={handleCheckAnswer}
              disabled={userAnswers[currentQuestionIndex] === null || showFeedback}
            >
              Check Answer
            </button>
            <button
              className="next-button"
              onClick={handleNext}
              disabled={userAnswers[currentQuestionIndex] === null}
            >
              {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'View Results'}
            </button>
          </div>
        ) : (
          <button
            className="next-button"
            onClick={handleNext}
            disabled={userAnswers[currentQuestionIndex] === null}
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'View Results'}
          </button>
        )}
      </div>
    </div>
  );
}

export default QuizApp;
