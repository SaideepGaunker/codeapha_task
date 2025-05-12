import React from 'react';
import '../styles/Progress.css';
import { useUser } from '../context/UserContext';

const totalLessons = 10; // Example total

const Progress: React.FC = () => {
  const { completedLessons, points } = useUser();
  const lessonsCompleted = completedLessons.length;
  const percent = Math.round((lessonsCompleted / totalLessons) * 100);

  return (
    <div className="progress-container">
      <h2>Your Progress</h2>
      <div className="progress-bar-bg">
        <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
      </div>
      <div className="progress-stats">
        <div><strong>Lessons:</strong> {lessonsCompleted} / {totalLessons}</div>
        <div><strong>Points:</strong> {points}</div>
      </div>
      <div className="progress-percent">{percent}% Complete</div>
    </div>
  );
};

export default Progress; 