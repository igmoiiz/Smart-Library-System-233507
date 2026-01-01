const express = require('express');
const router = express.Router();
const Book = require('../models/book.model');

// GET / - Get all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST / - Add a new book
router.post('/', async (req, res) => {
    try {
        const { title, author, isbn, publishedDate } = req.body;

        // Basic validation
        if (!title || !author || !isbn || !publishedDate) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if ISBN already exists
        const existingBook = await Book.findOne({ isbn });
        if (existingBook) {
            return res.status(400).json({ message: 'Book with this ISBN already exists' });
        }

        const book = new Book({ title, author, isbn, publishedDate });
        const savedBook = await book.save();
        res.status(201).json(savedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE /:isbn - Delete a book by ISBN
router.delete('/:isbn', async (req, res) => {
    try {
        const { isbn } = req.params;
        const deletedBook = await Book.findOneAndDelete({ isbn });

        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
