export const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY || '';

// Add detailed logging for troubleshooting
console.log('Available environment variables:', 
    Object.keys(process.env)
        .filter(key => key.startsWith('REACT_APP_'))
        .join(', ')
);

console.log('API Key validation:', {
    exists: Boolean(GEMINI_API_KEY),
    length: GEMINI_API_KEY?.length || 0,
    startsWithAI: GEMINI_API_KEY?.startsWith('AI'),
    firstFewChars: GEMINI_API_KEY ? `${GEMINI_API_KEY.substring(0, 4)}...` : 'none'
});

if (!GEMINI_API_KEY) {
    console.error('Gemini API key is not set. Please set REACT_APP_GEMINI_API_KEY in your .env file.');
} else if (!GEMINI_API_KEY.startsWith('AI')) {
    console.error('Invalid API key format. Gemini API keys should start with "AI"');
} 