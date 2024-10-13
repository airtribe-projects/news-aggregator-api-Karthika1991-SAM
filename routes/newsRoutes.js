const express = require('express');
const axios = require('axios');
const authenticateToken = require('../middleware/authMiddleware');
const newsController = require('../controllers/newsController');
const router = express.Router();

router.get('/news', authenticateToken, async (req, res) => {
    try {
        // Check if the user data is attached to the request
        if (!req.user) {
            console.error('No user data found in request object');
            return res.status(500).json({ error: 'User data not available' });
        }

        // Log the user data to ensure it is properly populated
        console.log('User data:', req.user);

        // Use optional chaining to safely access userPreferences
        const userPreferences = req.user.preferences || {}; // Fallback to an empty object if preferences are not set
        console.log('User Preferences:', userPreferences);

        // Use default values in case category and language are not set
        const category = userPreferences.category || 'general';
        const language = userPreferences.language || 'en';

        // Fetch news articles using the external API (e.g., NewsAPI)
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
            params: {
                apiKey: process.env.NEWS_API_KEY, // Ensure your API key is stored in the environment variable
                category: category,
                language: language,
                country: 'us'
            }
        });

        // Send the fetched news articles as the response
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching news:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to fetch news articles' });
    }
});

router.post('/news/:id/read', newsController.markAsRead);
router.post('/news/:id/favorite', newsController.markAsFavorite);
router.get('/news/read', newsController.getReadArticles);
router.get('/news/favorites', newsController.getFavoriteArticles);
router.get('/news/search/:keyword', newsController.searchArticles);


module.exports = router;
