import React from 'react';
import { FaMedal, FaStar, FaTrophy, FaGamepad, FaQuestionCircle } from 'react-icons/fa';
import '../styles/Achievements.css';
import { useUser } from '../context/UserContext';

const allAchievements = [
  {
    id: 'first-lesson',
    icon: <FaMedal color="#FFD700" size={32} />,
    name: 'First Lesson',
    description: 'Completed your first lesson!'
  },
  {
    id: 'five-lessons',
    icon: <FaStar color="#00BFFF" size={32} />,
    name: 'Five Lessons',
    description: 'Completed five lessons!'
  },
  {
    id: 'spanish-star',
    icon: <FaTrophy color="#FF6347" size={32} />,
    name: 'Spanish Star',
    description: 'Completed all lessons!'
  },
  {
    id: 'game-master',
    icon: <FaGamepad color="#32CD32" size={32} />,
    name: 'Game Master',
    description: 'Completed all games!'
  },
  {
    id: 'quiz-champion',
    icon: <FaQuestionCircle color="#8A2BE2" size={32} />,
    name: 'Quiz Champion',
    description: 'Completed all quizzes!'
  },
];

const Achievements: React.FC = () => {
  const { achievements } = useUser();
  const unlocked = allAchievements.filter(a => achievements.includes(a.id));

  return (
    <div className="achievements-container">
      <h2>Your Achievements</h2>
      {unlocked.length === 0 && <p>No achievements yet. Start learning!</p>}
      <div className="achievements-list">
        {unlocked.map((ach, idx) => (
          <div className="achievement-card" key={idx}>
            <div className="achievement-icon">{ach.icon}</div>
            <div className="achievement-info">
              <h3>{ach.name}</h3>
              <p>{ach.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements; 