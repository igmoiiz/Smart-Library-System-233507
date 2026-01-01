import React from 'react';
import BookCard from './BookCard';

const BookList = ({ books, onDelete }) => {
  if (!books || books.length === 0) {
    return (
        <div className="empty-state">
            <h3>No books in the collection yet.</h3>
            <p>Start adding books using the form above.</p>
        </div>
    );
  }

  return (
    <div className="books-grid">
      {books.map((book) => (
        <BookCard 
          key={book.isbn || book._id} 
          book={book} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

export default BookList;
