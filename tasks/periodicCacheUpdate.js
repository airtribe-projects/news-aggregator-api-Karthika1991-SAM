const { updateCache } = require('../services/cacheService');

// Simulate fetching news from an external API
const fetchLatestNews = async () => {
    // Mocked news fetch logic (replace with actual API call)
    return [
        { id: '1', title: 'Breaking News', content: 'Latest news update' },
        { id: '2', title: 'Tech News', content: 'New tech innovations' }
    ];
};

const refreshNewsCache = async () => {
    const newsArticles = await fetchLatestNews();
    updateCache('news', newsArticles);
    console.log('News cache updated:', new Date().toLocaleTimeString());
};

// Set the cache to update every 15 minutes
setInterval(refreshNewsCache, 15 * 60 * 1000);

module.exports = { refreshNewsCache };
