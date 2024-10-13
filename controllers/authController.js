const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// Mock database (replace this with your actual data store)
let userPreferences = {
    'user-id-example': { categories: ['technology', 'science'], languages: ['en'] }
  };

// Register a new user
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the user already exists by username
        const existingUserByUsername = await User.findOne({ username });
        if (existingUserByUsername) {
            return res.status(200).json({ message: 'Username already exists' });
        }

        // Check if the user already exists by email
        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(200).json({ message: 'Email already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


// Login user
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Check if the user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(200).json({ message: 'Invalid username or password' });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(200).json({ message: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Function to retrieve user preferences
exports.getPreferences = async (req, res) => {
    const userId = req.user.id; // Get user ID from token
    const preferences = userPreferences[userId] || {};
    res.json(preferences);
};

// Function to update user preferences
exports.updatePreferences = async (req, res) => {
    const userId = req.user.id; // Get user ID from token
    const { categories, languages } = req.body;

    // Update preferences in the mock database
    userPreferences[userId] = { categories, languages };
    res.json({ message: 'Preferences updated successfully', preferences: userPreferences[userId] });
};

