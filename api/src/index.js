const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bookRoutes = require('./routes/books.routes');

dotenv.config();
const app = express();

// Middleware
app.use(cors(
    {
        origin: 'http://localhost:3000',
    }
)); // Allow frontend access
app.use(express.json());

// Routes
app.use('/books', bookRoutes);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});