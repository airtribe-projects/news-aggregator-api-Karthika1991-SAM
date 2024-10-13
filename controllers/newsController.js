const { getFromCache } = require('../services/cacheService');
let readArticles = [];
let favoriteArticles = [];

exports.markAsRead = (req, res) => {
    const articleId = req.params.id;
    if (!readArticles.includes(articleId)) {
        readArticles.push(articleId);
    }
    res.status(200).json({ message: `Article ${articleId} marked as read` });
};

exports.markAsFavorite = (req, res) => {
    const articleId = req.params.id;
    if (!favoriteArticles.includes(articleId)) {
        favoriteArticles.push(articleId);
    }
    res.status(200).json({ message: `Article ${articleId} marked as favorite` });
};

exports.getReadArticles = (req, res) => {
    res.status(200).json({ readArticles });
};

exports.getFavoriteArticles = (req, res) => {
    res.status(200).json({ favoriteArticles });
};

exports.searchArticles = (req, res) => {
    const keyword = req.params.keyword.toLowerCase();
    const allArticles = getFromCache('news') || []; // assuming the news articles are stored under the 'news' key
    const filteredArticles = allArticles.filter(article => 
        article.title.toLowerCase().includes(keyword) || 
        article.content.toLowerCase().includes(keyword)
    );
    res.status(200).json({ articles: filteredArticles });
};
