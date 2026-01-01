import React, { useState } from 'react';

const BookForm = ({ onAddBook }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    publishedDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.author && formData.isbn && formData.publishedDate) {
      onAddBook(formData);
      setFormData({ title: '', author: '', isbn: '', publishedDate: '' });
    }
  };

  return (
    <div className="form-section">
      <h3>Add New Book</h3>
      <form onSubmit={handleSubmit} className="form-grid">
        <div className="input-group">
          <label className="input-label">Book Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-input"
            placeholder="XYZ"
            required
          />
        </div>

        <div className="input-group">
          <label className="input-label">Author Name</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="form-input"
            placeholder="John Doe"
            required
          />
        </div>

        <div className="input-group">
          <label className="input-label">ISBN Number</label>
          <input
            type="text"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            className="form-input"
            placeholder="1234567890"
            required
          />
        </div>

        <div className="input-group">
          <label className="input-label">Publication Year</label>
          <input
            type="date"
            name="publishedDate"
            value={formData.publishedDate}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Add to Library
        </button>
      </form>
    </div>
  );
};

export default BookForm;
