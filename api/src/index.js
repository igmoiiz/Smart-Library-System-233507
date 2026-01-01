const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();
const app = express();

//Middleware
app.use(express.json());


mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log(error);
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});