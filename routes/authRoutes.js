const express = require('express');
const { register, login} = require('../controllers/authController');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const preferencesController = require('../controllers/preferencesController');
const { body, validationResult } = require('express-validator');
// Validation rules for preferences
const validatePreferences = [
    body('category')
        .isString()
        .withMessage('Category must be a string')
        .isIn(['general', 'business', 'technology', 'sports', 'health', 'science', 'entertainment'])
        .withMessage('Invalid news category'),

    body('language')
        .isString()
        .withMessage('Language must be a string')
        .isLength({ min: 2, max: 2 })
        .withMessage('Language must be a 2-letter ISO code (e.g., "en", "fr")'),
];
// Define validation rules for registration
const validateUserRegistration = [
 
    body('username')
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('email')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/\d/).withMessage('Password must contain at least one number')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter'),
];


// Apply the validation middleware in your registration route
router.post('/register', validateUserRegistration, register);
router.post('/login', login);
// GET /preferences - Retrieve the user's preferences
router.get('/preferences', authenticateToken, preferencesController.getPreferences);


// PUT /preferences - Update the user's preferences
router.put('/preferences', authenticateToken, validatePreferences, (req, res, next) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({ errors: errors.array() });
    }

    // If validation passes, call the controller method
    preferencesController.updatePreferences(req, res, next);
});

module.exports = router;