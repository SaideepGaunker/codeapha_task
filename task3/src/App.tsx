import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
// Feature components (to be created)
import Lessons from './features/Lessons';
import Quizzes from './features/Quizzes';
import Gamification from './features/Gamification';
import Progress from './features/Progress';
import Achievements from './features/Achievements';
import Forum from './features/Forum';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <nav className="App-nav">
            <Link to="/lessons">Lessons</Link>
            <Link to="/quizzes">Quizzes</Link>
            <Link to="/gamification">Gamified Experience</Link>
            <Link to="/progress">Progress</Link>
            <Link to="/achievements">Achievements</Link>
            <Link to="/forum">Community Forum</Link>
          </nav>
          <div className="App-content">
            <Routes>
              <Route path="/lessons" element={<Lessons />} />
              <Route path="/quizzes" element={<Quizzes />} />
              <Route path="/gamification" element={<Gamification />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="*" element={<Lessons />} />
            </Routes>
          </div>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
