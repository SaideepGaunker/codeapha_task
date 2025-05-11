import React, { useState } from 'react';
import '../styles/Flashcard.css';

interface FlashcardProps {
  question: string;
  answer: string;
  onAnswer: (answer: string) => void;
  currentIndex: number;
  totalQuestions: number;
  checkingAnswer: boolean;
}

const Flashcard: React.FC<FlashcardProps> = ({ 
  question, 
  answer, 
  onAnswer,
  currentIndex,
  totalQuestions,
  checkingAnswer
}) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correct = userAnswer.toLowerCase().trim() === answer.toLowerCase().trim();
    setIsCorrect(correct);
    onAnswer(userAnswer);
    setUserAnswer('');
    setShowAnswer(false);
  };

  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="flashcard">
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      
      <h3>{question}</h3>
      
      {showAnswer ? (
        <div className="answer-display">
          <p>Answer: {answer}</p>
          <div className="flashcard-buttons">
            <button 
              className="btn btn-secondary" 
              onClick={() => setShowAnswer(false)}
            >
              Hide Answer
            </button>
          </div>
        </div>
      ) : (
        <form className="flashcard-form" onSubmit={handleSubmit}>
          <input
            className="flashcard-input"
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type your answer here..."
            required
            disabled={checkingAnswer}
          />
          <div className="flashcard-buttons">
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={checkingAnswer}
            >
              {checkingAnswer ? 'Checking...' : 'Submit Answer'}
            </button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => setShowAnswer(true)}
              disabled={checkingAnswer}
            >
              Show Answer
            </button>
          </div>
        </form>
      )}
      
      {isCorrect !== null && (
        <div className={`answer-feedback ${isCorrect ? 'correct-answer' : 'incorrect-answer'}`}>
          {isCorrect ? 'Correct! 🎉' : 'Incorrect. Try again!'}
        </div>
      )}
    </div>
  );
};

export default Flashcard;