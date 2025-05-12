import React from 'react';
import '../styles/Lessons.css';
import { useUser } from '../context/UserContext';
import { lessons } from '../data/lessons';

const Lessons: React.FC = () => {
  const { completedLessons, addLesson } = useUser();

  return (
    <div className="lesson-container">
      <h2>Lessons</h2>
      {lessons.map((lesson, idx) => {
        const completed = completedLessons.includes(lesson.id);
        const unlocked = idx === 0 || completedLessons.includes(lessons[idx - 1].id);
        return (
          <div key={lesson.id} className={`lesson-list-item${unlocked ? '' : ' locked'}`} style={{marginBottom: '2rem', opacity: unlocked ? 1 : 0.5}}>
            <h3>{lesson.title}</h3>
            <pre className="lesson-content">{unlocked ? lesson.content : '🔒 Locked. Complete the previous lesson to unlock.'}</pre>
            {unlocked && (
              <button
                className="lesson-complete-btn"
                onClick={() => addLesson(lesson.id)}
                disabled={completed}
              >
                {completed ? 'Completed!' : 'Mark as Complete'}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Lessons; 