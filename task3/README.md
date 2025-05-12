##**📚 Overview**
This application is a gamified learning platform designed to make language learning engaging and interactive. It features lessons, quizzes, games, achievements, and a progress tracker, all seamlessly integrated to motivate users and track their advancement.

##**🚀 How It Works**

**1. Lessons**
Lessons are the core learning units.
The first lesson is always unlocked.
Each subsequent lesson unlocks only after the previous one is completed.
Users mark lessons as complete to progress.

**2. Games & Quizzes**
Each game and quiz is tied to a specific lesson.
Games and quizzes remain locked until their associated lesson is completed.
Once unlocked, users can interact, submit answers, and receive instant feedback.

**3. Achievements**
The app rewards users with achievements for reaching milestones, such as:
Completing the first lesson
Completing five lessons
Completing all lessons, games, or quizzes
Achievements are displayed in a dedicated section.

**4. Progress Tracking**
The app tracks completed lessons, games, quizzes, points, and achievements.
A progress bar and stats are shown to visualize advancement.

**5. State Management**
All user progress is managed globally using React Context.
Completing any activity (lesson, game, quiz) updates the context, which automatically updates the UI and unlocks new content.

**6. User Experience**
Locked content is visually dimmed and displays a lock message.
The interface is clean, modern, and responsive.
Navigation is intuitive, with dedicated sections for each feature.

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/flashcard-quiz-app.git
   ```
2. Navigate to the project directory:
   ```
   cd flashcard-quiz-app
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage
1. Start the development server:
   ```
   npm start
   ```
2. Open your browser and go to `http://localhost:3000` to access the app.


##**🛠️ Technical Details**
Frontend: React with functional components and hooks.
State Management: React Context API for global user progress.
Routing: React Router for navigation between features.
Styling: Custom CSS for a modern, gamified look.
Data: Lessons, games, and quizzes are defined in separate data files for easy extension.

##**🗝️ Unlocking System Summary**
Lessons: Unlocked sequentially.
Games/Quizzes: Unlocked by completing their linked lesson.
Achievements: Unlocked by reaching specific milestones.
Progress: Instantly updated and reflected across the app.
Start with the first lesson, progress through the content, unlock games and quizzes, and collect achievements as you learn!
