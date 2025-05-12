import React, { useState } from 'react';
import '../styles/Forum.css';

const initialPosts = [
  { user: 'Alice', content: 'How do I remember new vocabulary?' },
  { user: 'Bob', content: 'Practice makes perfect! Try using flashcards.' },
];

const Forum: React.FC = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [newPost, setNewPost] = useState('');

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPost.trim()) {
      setPosts([...posts, { user: 'You', content: newPost }]);
      setNewPost('');
    }
  };

  return (
    <div className="forum-container">
      <h2>Community Forum</h2>
      <form className="forum-form" onSubmit={handleAddPost}>
        <input
          type="text"
          value={newPost}
          onChange={e => setNewPost(e.target.value)}
          placeholder="Share something..."
        />
        <button type="submit">Post</button>
      </form>
      <div className="forum-posts">
        {posts.map((post, idx) => (
          <div className="forum-post" key={idx}>
            <strong>{post.user}:</strong> {post.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forum; 