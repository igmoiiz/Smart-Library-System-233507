import React from 'react';

const BookCard = ({ book, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="book-card">
      <div>
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">by {book.author}</p>
        <div className="book-details">
            <span className="detail-badge">ISBN: {book.isbn}</span>
            <span className="detail-badge">{formatDate(book.publishedDate)}</span>
        </div>
      </div>
      <button 
        className="delete-btn"
        onClick={() => onDelete(book.isbn)}
      >
        <span>Delete Book</span>
      </button>
    </div>
  );
};

export default BookCard;
