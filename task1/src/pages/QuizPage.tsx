import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Quiz from '../components/Quiz';
import { generateQuestions, checkAnswer, Question, testGeminiConnection } from '../services/geminiService';
import { GEMINI_API_KEY } from '../config';
import '../styles/App.css';

const QuizPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [flashcards, setFlashcards] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [usingFallback, setUsingFallback] = useState(false);
    const topic = location.state?.topic || 'General Knowledge';

    useEffect(() => {
        const initializeQuiz = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Test API connection first
                console.log('Testing API connection...');
                const isConnected = await testGeminiConnection();
                
                if (!isConnected) {
                    console.warn('API connection failed, using fallback questions');
                    setUsingFallback(true);
                    const questions = await generateQuestions(topic, 5);
                    setFlashcards(questions);
                    return;
                }

                console.log('API connection successful, fetching questions...');
                const questions = await generateQuestions(topic, 5);
                setFlashcards(questions);
            } catch (err) {
                console.error('Error details:', err);
                setUsingFallback(true);
                const questions = await generateQuestions(topic, 5);
                setFlashcards(questions);
            } finally {
                setLoading(false);
            }
        };

        initializeQuiz();
    }, [topic]);

    const handleQuizCompletion = async (score: number, totalQuestions: number) => {
        navigate('/', { state: { score, totalQuestions } });
    };

    if (loading) {
        return (
            <div className="container">
                <div className="loading">
                    <p>Initializing quiz...</p>
                    <p className="loading-subtitle">Generating questions about {topic}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="quiz-header">
                <h2>Quiz Topic: {topic}</h2>
                {usingFallback && (
                    <p className="fallback-notice">
                        Using fallback questions (API unavailable)
                    </p>
                )}
            </div>
            <Quiz 
                flashcards={flashcards} 
                onAnswerCheck={checkAnswer}
                onQuizComplete={handleQuizCompletion}
            />
        </div>
    );
};

export default QuizPage; 