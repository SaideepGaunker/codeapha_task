import React from 'react';

interface ScoreboardProps {
    score: number;
    totalQuestions: number;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ score, totalQuestions }) => {
    return (
        <div className="scoreboard">
            <h2>Your Score</h2>
            <p>
                {score} out of {totalQuestions}
            </p>
        </div>
    );
};

export default Scoreboard;