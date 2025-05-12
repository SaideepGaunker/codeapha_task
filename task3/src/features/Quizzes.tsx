import React, { useState } from 'react';
import '../styles/Quizzes.css';
import { useUser } from '../context/UserContext';
import { quizzes } from '../data/quizzes';
import { lessons } from '../data/lessons';

const Quizzes: React.FC = () => {
  const { completedLessons } = useUser();
  const [answered, setAnswered] = useState<{ [quizId: string]: number | null }>({});
  const [submitted, setSubmitted] = useState<{ [quizId: string]: boolean }>({});

  return (
    <div className="quiz-container">
      <h2>Quizzes</h2>
      {quizzes.map((quiz, idx) => {
        // Quiz is unlocked if its lesson is completed
        const unlocked = completedLessons.includes(quiz.lessonId);
        const isAnswered = answered[quiz.id] !== undefined;
        const isSubmitted = submitted[quiz.id];
        return (
          <div key={quiz.id} className={`quiz-list-item${unlocked ? '' : ' locked'}`} style={{marginBottom: '2rem', opacity: unlocked ? 1 : 0.5}}>
            <div className="quiz-question">{unlocked ? quiz.question : '🔒 Locked. Complete the lesson to unlock.'}</div>
            {unlocked && (
              <div className="quiz-options">
                {quiz.options.map((opt, optIdx) => (
                  <button
                    key={optIdx}
                    className={`quiz-option${answered[quiz.id] === optIdx ? ' selected' : ''}`}
                    onClick={() => setAnswered(a => ({ ...a, [quiz.id]: optIdx }))}
                    disabled={isSubmitted}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
            {unlocked && !isSubmitted && (
              <button
                className="quiz-submit"
                onClick={() => setSubmitted(s => ({ ...s, [quiz.id]: true }))}
                disabled={answered[quiz.id] === undefined}
              >
                Submit
              </button>
            )}
            {unlocked && isSubmitted && (
              <div className={`quiz-feedback ${answered[quiz.id] === quiz.answer ? 'correct' : 'incorrect'}`}>
                {answered[quiz.id] === quiz.answer ? 'Correct!' : `Incorrect. The answer is "${quiz.options[quiz.answer]}".`}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Quizzes; 