import React, { useState } from 'react';
import '../styles/Gamification.css';
import { useUser } from '../context/UserContext';
import { games } from '../data/games';

const Gamification: React.FC = () => {
  const { completedLessons } = useUser();
  const [answered, setAnswered] = useState<{ [gameId: string]: number | number[] | null }>({});
  const [submitted, setSubmitted] = useState<{ [gameId: string]: boolean }>({});

  return (
    <div className="gamification-container">
      <h2>Games</h2>
      {games.map((game, idx) => {
        // Game is unlocked if its lesson is completed
        const unlocked = completedLessons.includes(game.lessonId);
        const isAnswered = answered[game.id] !== undefined;
        const isSubmitted = submitted[game.id];
        return (
          <div key={game.id} className={`game-list-item${unlocked ? '' : ' locked'}`} style={{marginBottom: '2rem', opacity: unlocked ? 1 : 0.5}}>
            <div className="game-prompt">{unlocked ? game.prompt : '🔒 Locked. Complete the lesson to unlock.'}</div>
            {unlocked && game.type === 'missing-word' && (
              <div className="game-options">
                {game.options.map((opt: string, optIdx: number) => (
                  <button
                    key={optIdx}
                    className={`game-option${answered[game.id] === optIdx ? ' selected' : ''}`}
                    onClick={() => setAnswered(a => ({ ...a, [game.id]: optIdx }))}
                    disabled={isSubmitted}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
            {unlocked && game.type === 'multi-choice' && (
              <div className="game-options">
                {game.options.map((opt: string, optIdx: number) => (
                  <button
                    key={optIdx}
                    className={`game-option${Array.isArray(answered[game.id]) && (answered[game.id] as number[]).includes(optIdx) ? ' selected' : ''}`}
                    onClick={() => {
                      setAnswered(a => {
                        const prev = Array.isArray(a[game.id]) ? (a[game.id] as number[]) : [];
                        if (prev.includes(optIdx)) {
                          return { ...a, [game.id]: prev.filter(i => i !== optIdx) };
                        } else {
                          return { ...a, [game.id]: [...prev, optIdx] };
                        }
                      });
                    }}
                    disabled={isSubmitted}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
            {unlocked && !isSubmitted && (
              <button
                className="game-submit"
                onClick={() => setSubmitted(s => ({ ...s, [game.id]: true }))}
                disabled={answered[game.id] === undefined || (game.type === 'multi-choice' && (!Array.isArray(answered[game.id]) || (answered[game.id] as number[]).length === 0))}
              >
                Submit
              </button>
            )}
            {unlocked && isSubmitted && (
              <div className={`game-feedback ${
                (game.type === 'missing-word' && answered[game.id] === game.answer) ||
                (game.type === 'multi-choice' && Array.isArray(answered[game.id]) && Array.isArray(game.answer) && (answered[game.id] as number[]).sort().join(',') === (game.answer as number[]).sort().join(','))
                  ? 'correct' : 'incorrect'
              }`}>
                {((game.type === 'missing-word' && answered[game.id] === game.answer) ||
                  (game.type === 'multi-choice' && Array.isArray(answered[game.id]) && Array.isArray(game.answer) && (answered[game.id] as number[]).sort().join(',') === (game.answer as number[]).sort().join(',')))
                  ? 'Correct!' : 'Incorrect.'}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Gamification; 