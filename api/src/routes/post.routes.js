const express = require('express');
const router = express.Router();

//  Model Import
const Book = require('../models/book.model.js');

//  Post Route for creating book record
router.post('/create-record', (req, res) => {
    const {title, author, isbn, publishedDate} = req.body;
    const book = new Book({title, author, isbn, publishedDate});
    if(!title || !author || !isbn || !publishedDate){
        return res.status(400).send('All fields are required');
    }
    book.save().then(() => {
        res.send(book);
    }).catch((error) => {
        res.send(error);
    });
});

module.exports = router;