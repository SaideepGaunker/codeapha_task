import { useState, useEffect } from 'react'
import './App.css'

const initialQuotes = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "Success is not the key to happiness. Happiness is the key to success.",
    author: "Albert Schweitzer"
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon"
  },
  {
    text: "You miss 100% of the shots you don't take.",
    author: "Wayne Gretzky"
  },
  {
    text: "The best way to predict the future is to invent it.",
    author: "Alan Kay"
  },
  {
    text: "In the middle of every difficulty lies opportunity.",
    author: "Albert Einstein"
  },
  {
    text: "What you get by achieving your goals is not as important as what you become by achieving your goals.",
    author: "Zig Ziglar"
  },
  {
    text: "Happiness is not something ready made. It comes from your own actions.",
    author: "Dalai Lama"
  },
  {
    text: "If you want to lift yourself up, lift up someone else.",
    author: "Booker T. Washington"
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
  // Additional fallback quotes
  {
    text: "Do not wait to strike till the iron is hot; but make it hot by striking.",
    author: "William Butler Yeats"
  },
  {
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius"
  },
  {
    text: "Everything you've ever wanted is on the other side of fear.",
    author: "George Addair"
  },
  {
    text: "Opportunities don't happen, you create them.",
    author: "Chris Grosser"
  },
  {
    text: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson"
  },
  {
    text: "The only limit to our realization of tomorrow will be our doubts of today.",
    author: "Franklin D. Roosevelt"
  },
  {
    text: "Act as if what you do makes a difference. It does.",
    author: "William James"
  },
  {
    text: "Quality is not an act, it is a habit.",
    author: "Aristotle"
  },
  {
    text: "The harder you work for something, the greater you'll feel when you achieve it.",
    author: "Unknown"
  },
  {
    text: "Dream bigger. Do bigger.",
    author: "Unknown"
  }
];

function getRandomQuote(quotesArr: { text: string; author: string }[]) {
  return quotesArr[Math.floor(Math.random() * quotesArr.length)];
}

async function fetchQuotableQuote(): Promise<{ text: string; author: string } | null> {
  try {
    const res = await fetch("https://api.quotable.io/random");
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    return { text: data.content, author: data.author };
  } catch (error) {
    return null;
  }
}

function App() {
  const [fallbackQuotes, setFallbackQuotes] = useState(initialQuotes);
  const [quote, setQuote] = useState(getRandomQuote(initialQuotes));
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newQuote, setNewQuote] = useState({ text: '', author: '' });
  const [theme, setTheme] = useState<'light' | 'dark'>(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );

  const getNewQuote = async () => {
    setLoading(true);
    const apiQuote = await fetchQuotableQuote();
    if (apiQuote) {
      setQuote(apiQuote);
    } else {
      let newQuoteObj;
      do {
        newQuoteObj = getRandomQuote(fallbackQuotes);
      } while (newQuoteObj.text === quote.text);
      setQuote(newQuoteObj);
    }
    setLoading(false);
    setCopied(false);
  };

  useEffect(() => {
    getNewQuote();
    document.body.classList.toggle('dark', theme === 'dark');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote.text}" - ${quote.author}`)}`;
    window.open(url, '_blank');
  };

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(`"${quote.text}" - ${quote.author}`)}`;
    window.open(url, '_blank');
  };

  const shareOnWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(`"${quote.text}" - ${quote.author}`)}`;
    window.open(url, '_blank');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`"${quote.text}" - ${quote.author}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewQuote({ ...newQuote, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newQuote.text.trim() && newQuote.author.trim()) {
      setFallbackQuotes([{ text: newQuote.text, author: newQuote.author }, ...fallbackQuotes]);
      setNewQuote({ text: '', author: '' });
      setShowForm(false);
    }
  };

  return (
    <div className="quote-app">
      <button
        aria-label="Toggle theme"
        style={{
          position: 'absolute',
          top: 24,
          right: 24,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: 24,
          zIndex: 10
        }}
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        {theme === 'light' ? (
          // Moon icon
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 12.79A9 9 0 0 1 12.21 3a1 1 0 0 0-1.13 1.32A7 7 0 1 1 4.28 14.92a1 1 0 0 0-1.32 1.13A9 9 0 1 0 21 12.79z" fill="#6366f1"/></svg>
        ) : (
          // Sun icon
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="5" fill="#facc15"/><g stroke="#facc15" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></g></svg>
        )}
      </button>
      <div className="quote-box">
        {loading ? (
          <p className="quote-text">Loading...</p>
        ) : (
          <>
            <h1 className="quote-text">"{quote.text}"</h1>
            <p className="quote-author">- {quote.author}</p>
          </>
        )}
        <div className="buttons">
          <button onClick={getNewQuote} disabled={loading}>New Quote</button>
          <button onClick={copyToClipboard} disabled={loading}>{copied ? 'Copied!' : 'Copy to Clipboard'}</button>
          <button onClick={() => setShowForm(!showForm)} disabled={loading}>{showForm ? 'Cancel' : 'Add Your Own Quote'}</button>
          <div className="share-buttons">
            <button onClick={shareOnTwitter} disabled={loading} style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.46 5.924c-.793.352-1.645.59-2.54.698a4.48 4.48 0 0 0 1.965-2.475 8.94 8.94 0 0 1-2.828 1.082A4.48 4.48 0 0 0 16.11 4c-2.485 0-4.5 2.015-4.5 4.5 0 .353.04.697.116 1.027C7.728 9.37 4.1 7.6 1.67 4.905a4.48 4.48 0 0 0-.61 2.264c0 1.563.796 2.942 2.008 3.75a4.48 4.48 0 0 1-2.037-.563v.057c0 2.183 1.553 4.004 3.617 4.42a4.48 4.48 0 0 1-2.03.077c.573 1.79 2.24 3.09 4.215 3.125A8.98 8.98 0 0 1 2 19.54a12.7 12.7 0 0 0 6.88 2.017c8.26 0 12.78-6.84 12.78-12.78 0-.195-.004-.39-.013-.583A9.14 9.14 0 0 0 24 4.59a8.98 8.98 0 0 1-2.54.697z" fill="#000"/></svg>
              X
            </button>
            <button onClick={shareOnFacebook} disabled={loading} style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" fill="#1877F3"/><path d="M16.671 24v-9.294h3.12l.467-3.622h-3.587V8.771c0-1.048.293-1.763 1.797-1.763l1.918-.001v-3.24c-.334-.044-1.472-.143-2.797-.143-2.766 0-4.659 1.688-4.659 4.788v2.127H9.692v3.622h3.128V24h3.851z" fill="#fff"/></svg>
              Facebook
            </button>
            <button onClick={shareOnWhatsApp} disabled={loading} style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.832 4.584 2.236 6.393L4 29l7.824-2.05A12.94 12.94 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22.917c-2.13 0-4.19-.624-5.93-1.8l-.423-.267-4.646 1.217 1.24-4.522-.276-.438A9.93 9.93 0 0 1 6.083 15c0-5.478 4.44-9.917 9.917-9.917S25.917 9.522 25.917 15 21.478 24.917 16 24.917zm5.36-7.13c-.294-.147-1.74-.857-2.01-.954-.27-.098-.466-.147-.662.147-.196.294-.757.954-.928 1.15-.17.196-.342.221-.636.074-.294-.147-1.242-.457-2.367-1.457-.875-.78-1.465-1.74-1.637-2.034-.171-.294-.018-.453.13-.6.134-.133.294-.343.44-.514.147-.171.196-.294.294-.489.098-.196.049-.367-.025-.514-.074-.147-.662-1.6-.907-2.19-.239-.574-.482-.497-.662-.507l-.564-.01c-.196 0-.514.074-.784.367-.27.294-1.03 1.007-1.03 2.455 0 1.448 1.055 2.85 1.202 3.048.147.196 2.08 3.18 5.04 4.334.705.242 1.255.386 1.684.494.707.18 1.35.155 1.86.094.567-.067 1.74-.711 1.987-1.398.245-.687.245-1.276.171-1.398-.073-.122-.268-.196-.562-.343z" fill="#25D366"/></svg>
              WhatsApp
            </button>
          </div>
        </div>
        {showForm && (
          <form className="add-quote-form" onSubmit={handleFormSubmit}>
            <textarea
              name="text"
              placeholder="Your quote..."
              value={newQuote.text}
              onChange={handleFormChange}
              required
              rows={3}
              style={{ width: '100%', marginBottom: '0.5rem', resize: 'vertical' }}
            />
            <input
              name="author"
              placeholder="Author"
              value={newQuote.author}
              onChange={handleFormChange}
              required
              style={{ width: '100%', marginBottom: '0.5rem' }}
            />
            <button type="submit" style={{ width: '100%' }}>Add Quote</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default App
