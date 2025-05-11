export interface Flashcard {
    question: string;
    answer: string;
    id: number;
}

export interface QuizResult {
    score: number;
    totalQuestions: number;
}