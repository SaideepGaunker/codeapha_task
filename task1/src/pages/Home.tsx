import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [topic, setTopic] = useState('');

    const handleStartQuiz = () => {
        if (!topic.trim()) {
            alert('Please enter a topic for the quiz');
            return;
        }
        navigate('/quiz', { state: { topic } });
    };

    return (
        <div className="container">
            <div className="home-content">
                <h1>Welcome to Flashcard Quiz</h1>
                <p className="description">
                    Test your knowledge with our interactive flashcard quiz!
                    Answer questions, learn new things, and track your progress.
                </p>
                <div className="features">
                    <div className="feature">
                        <h3>📚 Learn Effectively</h3>
                        <p>Study with interactive flashcards</p>
                    </div>
                    <div className="feature">
                        <h3>🎯 Track Progress</h3>
                        <p>Monitor your learning journey</p>
                    </div>
                    <div className="feature">
                        <h3>💡 Instant Feedback</h3>
                        <p>Get immediate results</p>
                    </div>
                    <div className="feature">
                        <h3>🎓 Custom Topics</h3>
                        <p>Choose what you want to learn</p>
                    </div> 
                </div>
                <div className="topic-input">
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="Enter quiz topic (e.g., React, JavaScript, History)"
                        className="topic-field"
                    />
                    <button className="btn btn-primary start-button" onClick={handleStartQuiz}>
                    Start Quiz
                </button>
                </div>
                
            </div>
        </div>
    );
};

export default Home; 