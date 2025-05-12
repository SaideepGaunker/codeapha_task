# Random Quote Generator

A web app built with **React** and **TypeScript** using [Vite](https://vitejs.dev/). This app displays a random quote with the author's name, fetching from the [Quotable API](https://api.quotable.io/random) and falling back to a local list if the API fails. Users can generate new quotes, copy them, share on social media, and add their own quotes.

## Features

- ⚡ Built with React + TypeScript + Vite
- 🔄 Fetches quotes dynamically from the Quotable API
- 🔁 Uses fallback data if API fails
- 🎨 Clean, responsive, and user-friendly UI
- 🌙 Light/Dark theme toggle
- 📋 Copy quotes to clipboard
- 📱 Share quotes on Twitter, Facebook, and WhatsApp
- ➕ Add your own quotes

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd quote-generator
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

### Running the App

Start the development server:
```sh
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```sh
npm run build
```

### Linting

```sh
npm run lint
```

## Project Structure

```
├── public/
├── src/
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   ├── index.css
│   └── assets/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── ...
```

## License

This project is for educational/demo purposes.

---

Made with ❤️ using [React](https://react.dev/) and [Vite](https://vitejs.dev/)
