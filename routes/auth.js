const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

// Register
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    console.log(`👤 New registration request for: ${email}`);

    try {
        let user = await User.findOne({ email });
        if (user) {
            console.log(`⚠️ User already exists: ${email}`);
            return res.status(400).json({ msg: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
            if (err) throw err;
            console.log(`✅ User registered successfully: ${user.email} (ID: ${user.id})`);
            res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
        });

    } catch (err) {
        console.error('Registration Error:', err.message);
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(`🔑 Login request for: ${email}`);

    try {
        let user = await User.findOne({ email });
        if (!user) {
            console.log(`❌ Login failed: User not found (${email})`);
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
            if (err) throw err;
            console.log(`✅ User logged in successfully: ${user.email}`);
            res.json({
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    profilePic: user.profilePic,
                    quote: user.quote,
                    writingTime: user.writingTime,
                    goal: user.goal
                }
            });
        });

    } catch (err) {
        console.error('Login Error:', err.message);
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// Get User (Me) - Protected Route Placeholder (if needed later)
// ...

module.exports = router;
