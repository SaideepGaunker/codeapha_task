# Flashcard Quiz App

## Overview
The Flashcard Quiz App is a web application that allows users to test their knowledge on any topic using interactive flashcards. The app generates quiz questions using the Gemini AI API (with fallback questions if the API is unavailable), provides instant feedback, and tracks your score.

## Features
- Generate quiz questions on any topic using Gemini AI
- Interactive flashcard interface
- Instant feedback on answers
- Progress tracking and scoring
- Responsive, user-friendly design
- Fallback to built-in questions if API is unavailable

## Project Structure
```
flashcard-quiz-app
├── public/
│   └── index.html
├── src/
│   ├── App.tsx
│   ├── config.ts
│   ├── index.tsx
│   ├── react-app-env.d.ts
│   ├── components/
│   │   ├── Flashcard.tsx
│   │   ├── Quiz.tsx
│   │   └── Scoreboard.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   └── QuizPage.tsx
│   ├── services/
│   │   └── geminiService.ts
│   ├── styles/
│   │   ├── App.css
│   │   ├── Flashcard.css
│   │   └── Home.css
│   └── types/
│       └── index.ts
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14 or newer recommended)
- npm

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/flashcard-quiz-app.git
   cd flashcard-quiz-app
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up your Gemini API key:**
   - Obtain a Gemini API key from Google.
   - Create a `.env` file in the project root (if not present) and add:
     ```
     REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here
     ```

### Running the App

Start the development server:
```sh
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Enter a topic (e.g., "React", "JavaScript", "History") on the home page.
2. Click "Start Quiz" to generate flashcards.
3. Answer each question. You'll receive instant feedback.
4. At the end, view your score and try again if you wish.

## Troubleshooting

- If you see a warning about the API key, ensure your `.env` file is set up correctly and the key is valid.
- If the Gemini API is unavailable, the app will use fallback questions.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for improvements or bug fixes.

