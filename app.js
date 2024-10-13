const express = require('express');
const app = express();
const port = 5000;
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const newsRoutes = require('./routes/newsRoutes'); // Assuming you saved the news route as newsRoutes
require('./tasks/periodicCacheUpdate'); // Start periodic cache updates

dotenv.config();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api', newsRoutes); // Use the news routes

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;