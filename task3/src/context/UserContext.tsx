import React, { createContext, useContext, useState } from 'react';
import { lessons } from '../data/lessons';
import { games } from '../data/games';
import { quizzes } from '../data/quizzes';

// Example achievement rules
const achievementRules = [
  { id: 'first-lesson', name: 'First Lesson', condition: (_games: string[], _quizzes: string[], lessons: string[]) => lessons.length >= 1 },
  { id: 'five-lessons', name: 'Five Lessons', condition: (_games: string[], _quizzes: string[], lessons: string[]) => lessons.length >= 5 },
  { id: 'spanish-star', name: 'Spanish Star', condition: (_games: string[], _quizzes: string[], lessons: string[]) => lessons.length === lessonsData.length },
  { id: 'game-master', name: 'Game Master', condition: (games: string[], _quizzes: string[], _lessons: string[]) =>
    gamesData.every(g => games.includes(g.id))
  },
  { id: 'quiz-champion', name: 'Quiz Champion', condition: (_games: string[], quizzes: string[], _lessons: string[]) =>
    quizzesData.every(q => quizzes.includes(q.id))
  },
];

const lessonsData = lessons;
const gamesData = games;
const quizzesData = quizzes;

const defaultState = {
  completedLessons: [] as string[],
  completedGames: [] as string[],
  completedQuizzes: [] as string[],
  points: 0,
  achievements: [] as string[],
  addLesson: (id: string) => {},
  addGame: (id: string) => {},
  addQuiz: (id: string) => {},
};

const UserContext = createContext(defaultState);
export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [completedGames, setCompletedGames] = useState<string[]>([]);
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([]);
  const [points, setPoints] = useState(0);
  const [achievements, setAchievements] = useState<string[]>([]);

  const checkAchievements = (newLessons: string[], newGames: string[], newQuizzes: string[]) => {
    achievementRules.forEach(rule => {
      if (!achievements.includes(rule.id) && rule.condition(newGames, newQuizzes, newLessons)) {
        setAchievements(a => [...a, rule.id]);
      }
    });
  };

  const addLesson = (id: string) => {
    if (!completedLessons.includes(id)) {
      const newLessons = [...completedLessons, id];
      setCompletedLessons(newLessons);
      setPoints(points + 10); // 10 points per lesson
      checkAchievements(newLessons, completedGames, completedQuizzes);
    }
  };

  const addGame = (id: string) => {
    if (!completedGames.includes(id)) {
      const newGames = [...completedGames, id];
      setCompletedGames(newGames);
      setPoints(points + 5);
      checkAchievements(completedLessons, newGames, completedQuizzes);
    }
  };

  const addQuiz = (id: string) => {
    if (!completedQuizzes.includes(id)) {
      const newQuizzes = [...completedQuizzes, id];
      setCompletedQuizzes(newQuizzes);
      setPoints(points + 7); // 7 points per quiz
      checkAchievements(completedLessons, completedGames, newQuizzes);
    }
  };

  return (
    <UserContext.Provider value={{ completedLessons, completedGames, completedQuizzes, points, achievements, addLesson, addGame, addQuiz }}>
      {children}
    </UserContext.Provider>
  );
}; 