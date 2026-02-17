const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Entry = require('../models/Entry');

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

// Middleware to verify token
const auth = (req, res, next) => {
    const token = req.header('x-auth-token') || req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

// @route   GET /api/entries
// @desc    Get all entries for user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const entries = await Entry.find({ user: req.user.id }).sort({ date: -1 });

        // Format entries to match frontend expectation (optional, but good for consistency)
        const formattedEntries = entries.map(entry => ({
            id: entry._id, // Map _id to id
            user: entry.user,
            content: entry.content,
            date: entry.date,
            dateFormatted: new Date(entry.date).toLocaleDateString('en-US', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                hour: '2-digit', minute: '2-digit'
            }),
            mood: entry.mood,
            lastEdited: entry.lastEdited
        }));

        res.json(formattedEntries);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/entries
// @desc    Create a new entry
// @access  Private

router.post('/', auth, async (req, res) => {
    try {
        console.log(`📝 Saving new entry for user: ${req.user.id}`);
        const newEntry = new Entry({
            content: req.body.content,
            mood: req.body.mood,
            user: req.user.id,
            date: req.body.date || Date.now()
        });

        const entry = await newEntry.save();
        console.log(`✅ Entry saved successfully with ID: ${entry._id}`);

        // Return formatted
        res.json({
            id: entry._id,
            content: entry.content,
            date: entry.date,
            dateFormatted: new Date(entry.date).toLocaleDateString('en-US', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                hour: '2-digit', minute: '2-digit'
            }),
            mood: entry.mood,
            lastEdited: entry.lastEdited
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/entries/:id
// @desc    Update an entry
// @access  Private
router.put('/:id', auth, async (req, res) => {
    const { content, mood } = req.body;

    try {
        let entry = await Entry.findById(req.params.id);

        if (!entry) return res.status(404).json({ msg: 'Entry not found' });

        // Ensure user owns entry
        if (entry.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        console.log(`🔄 Updating entry ${req.params.id} for user ${req.user.id}`);
        entry.content = content || entry.content;
        entry.mood = mood || entry.mood;
        entry.lastEdited = Date.now();

        await entry.save();
        console.log(`✅ Entry updated successfully: ${entry._id}`);
        res.json(entry);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/entries/:id
// @desc    Delete an entry
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let entry = await Entry.findById(req.params.id);

        if (!entry) return res.status(404).json({ msg: 'Entry not found' });

        // Ensure user owns entry
        if (entry.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        console.log(`🗑️ Deleting entry ${req.params.id} for user ${req.user.id}`);
        await Entry.deleteOne({ _id: req.params.id });

        console.log(`✅ Entry removed: ${req.params.id}`);
        res.json({ msg: 'Entry removed' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
