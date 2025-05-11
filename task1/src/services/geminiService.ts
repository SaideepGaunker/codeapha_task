import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from '../config';

// Log API key status and initialization
console.log('Initializing Gemini service...');
console.log('API Key status:', GEMINI_API_KEY ? `Present (length: ${GEMINI_API_KEY.length})` : 'Missing');

let genAI: GoogleGenerativeAI;
try {
    genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    console.log('Gemini AI client initialized successfully');
} catch (error) {
    console.error('Failed to initialize Gemini AI client:', error);
    throw new Error('Failed to initialize Gemini AI client');
}

export interface Question {
    question: string;
    answer: string;
}

// Fallback questions in case the API fails
const fallbackQuestions: Question[] = [
    {
        question: "What is React?",
        answer: "A JavaScript library for building user interfaces"
    },
    {
        question: "What is JSX?",
        answer: "A syntax extension for JavaScript that allows writing HTML-like code in JavaScript"
    },
    {
        question: "What is the virtual DOM?",
        answer: "A lightweight copy of the real DOM that React uses to optimize rendering performance"
    },
    {
        question: "What are React Hooks?",
        answer: "Functions that allow you to use state and other React features in functional components"
    },
    {
        question: "What is the useState Hook?",
        answer: "A Hook that lets you add state to functional components"
    }
];

// Test function to verify API connection
export const testGeminiConnection = async (): Promise<boolean> => {
    try {
        console.log('Testing Gemini API connection...');
        console.log('API Key starts with:', GEMINI_API_KEY.substring(0, 6) + '...');
        
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        
        const result = await model.generateContent("Respond with 'OK' if you can read this.");
        const response = await result.response;
        const text = response.text();
        
        console.log('Test response:', text);
        return text.includes('OK');
    } catch (error) {
        console.error('API Test Error:', error);
        return false;
    }
};

export const generateQuestions = async (topic: string, count: number): Promise<Question[]> => {
    try {
        // First test the API connection
        const isConnected = await testGeminiConnection();
        if (!isConnected) {
            console.warn('API connection test failed, using fallback questions');
            return fallbackQuestions;
        }

        console.log('API connection successful, generating questions...');
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `Generate exactly ${count} quiz questions about ${topic}.
Return them in this exact JSON format:
[
  {"question": "First question here?", "answer": "First answer here"},
  {"question": "Second question here?", "answer": "Second answer here"}
]
Important: Only return the JSON array, nothing else.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        console.log('Raw API response:', text);

        try {
            // Clean the response and parse JSON
            const cleanedText = text
                .replace(/```json\s*|\s*```/g, '')
                .replace(/^[\s\n]*\[/, '[')
                .replace(/\][\s\n]*$/, ']')
                .trim();

            const questions = JSON.parse(cleanedText);

            if (!Array.isArray(questions) || !questions.every(q => q.question && q.answer)) {
                throw new Error('Invalid response format');
            }

            return questions;
        } catch (error) {
            console.error('Failed to parse questions:', error);
            return fallbackQuestions;
        }
    } catch (error) {
        console.error('Error generating questions:', error);
        return fallbackQuestions;
    }
};

export const checkAnswer = async (question: string, userAnswer: string, correctAnswer: string): Promise<boolean> => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `Question: "${question}"
Correct Answer: "${correctAnswer}"
User Answer: "${userAnswer}"

Are these answers semantically equivalent? Reply with ONLY 'true' or 'false':`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().toLowerCase().trim();

        return text === 'true';
    } catch (error) {
        console.error('Error checking answer:', error);
        // Fallback to simple string comparison
        return userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
    }
}; 