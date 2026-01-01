const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bookRoutes = require('./routes/books.routes');

dotenv.config();
const app = express();

// CORS Middleware to enable cross-origin requests from frontend
app.use(cors(
    {
        origin: "https://smart-library-system-git-main-moiz-balochs-projects.vercel.app?_vercel_share=JCOwe2xHHUzfzJdhVW2zdjjGqDbS70cg"
    }
));

//  EXPRESS JSON Middleware to parse JSON request bodies
app.use(express.json());

// Health Check Route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'api running' });
});

// Root Route
app.get('/', (req, res) => {
    res.send('Smart Library API');
});

// Routes
app.use('/books', bookRoutes);

//  Database Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;
