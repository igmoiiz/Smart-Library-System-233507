import React, { useState, useEffect } from 'react';

import BookForm from './components/BookForm';
import BookList from './components/BookList';

const API_BASE_URL = 'http://localhost:5000';

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch books on mount
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/books`);
      if (!response.ok) throw new Error('Failed to fetch books');
      const data = await response.json();
      setBooks(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBook = async (newBook) => {
    try {
      const response = await fetch(`${API_BASE_URL}/books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add book');
      }

      const savedBook = await response.json();
      setBooks(prev => [...prev, savedBook]);
      alert('Book added successfully!');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleDeleteBook = async (isbn) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/books/${isbn}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
         const errorData = await response.json();
         throw new Error(errorData.message || 'Failed to delete book');
      }

      setBooks(prev => prev.filter(book => book.isbn !== isbn));
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="container">
      <header className="app-header">
        <h1 className="app-title">Smart Library</h1>
        <p className="app-subtitle">Manage your book collection efficiently</p>
      </header>

      <main>
        <BookForm onAddBook={handleAddBook} />
        
        {loading ? (
          <div className="loading-spinner"></div>
        ) : error ? (
           <div style={{color: 'red', textAlign: 'center'}}>{error}</div> 
        ) : (
          <BookList books={books} onDelete={handleDeleteBook} />
        )}
      </main>
    </div>
  );
}

export default App;
