// Mock database (replace this with your actual data store, e.g., MongoDB, PostgreSQL)
let userPreferences = {};

// Function to retrieve user preferences
exports.getPreferences = async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from the token
        const preferences = userPreferences[userId] || { // Return default if no preferences exist
            categories: ['technology'], // Default category
            languages: ['en'] // Default language
        };
        res.status(200).json(preferences);
    } catch (error) {
        console.error('Error retrieving preferences:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to update user preferences
// Function to update user preferences
exports.updatePreferences = async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from the token
        const { categories, languages } = req.body;

        // Update preferences in the mock database
        userPreferences[userId] = { categories, languages };
        res.status(200).json({
            message: 'Preferences updated successfully',
            preferences: userPreferences[userId],
        });
    } catch (error) {
        console.error('Error updating preferences:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
