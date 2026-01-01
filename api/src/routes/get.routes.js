const express = require('express');
const router = express.Router();

//  Model Import
const Book = require('../models/book.model');

//  Get Route for getting all book records
router.get('/get-all', (req, res) => {
    Book.find().then((books) => {
        res.send(books);
    }).catch((error) => {
        res.send(error);
    });
});

module.exports = router;