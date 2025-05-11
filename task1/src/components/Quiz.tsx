import React, { useState } from 'react';
import Flashcard from './Flashcard';
import '../styles/App.css';

interface Flashcard {
    question: string;
    answer: string;
}

interface QuizProps {
    flashcards: Flashcard[];
    onAnswerCheck: (question: string, userAnswer: string, correctAnswer: string) => Promise<boolean>;
    onQuizComplete: (score: number, totalQuestions: number) => void;
}

const Quiz: React.FC<QuizProps> = ({ flashcards, onAnswerCheck, onQuizComplete }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<string[]>([]);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [score, setScore] = useState(0);
    const [checkingAnswer, setCheckingAnswer] = useState(false);

    const handleAnswer = async (answer: string) => {
        setCheckingAnswer(true);
        try {
            const isCorrect = await onAnswerCheck(
                flashcards[currentIndex].question,
                answer,
                flashcards[currentIndex].answer
            );
            
            setUserAnswers([...userAnswers, answer]);
            if (isCorrect) {
                setScore(score + 1);
            }

            if (currentIndex < flashcards.length - 1) {
                setCurrentIndex(currentIndex + 1);
            } else {
                setQuizCompleted(true);
                onQuizComplete(score + (isCorrect ? 1 : 0), flashcards.length);
            }
        } catch (error) {
            console.error('Error checking answer:', error);
        } finally {
            setCheckingAnswer(false);
        }
    };

    const resetQuiz = () => {
        setCurrentIndex(0);
        setUserAnswers([]);
        setQuizCompleted(false);
        setScore(0);
    };

    if (quizCompleted) {
        return (
            <div className="container">
                <div className="quiz-completed">
                    <h2>Quiz Completed! 🎉</h2>
                    <p className="score">
                        Your score: {score} out of {flashcards.length}
                    </p>
                    <p className="percentage">
                        {Math.round((score / flashcards.length) * 100)}% correct
                    </p>
                    <button className="btn btn-primary" onClick={resetQuiz}>
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <Flashcard 
                question={flashcards[currentIndex].question} 
                answer={flashcards[currentIndex].answer} 
                onAnswer={handleAnswer}
                currentIndex={currentIndex}
                totalQuestions={flashcards.length}
                checkingAnswer={checkingAnswer}
            />
        </div>
    );
};

export default Quiz;