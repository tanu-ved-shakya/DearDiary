require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Database Connection
const connectDB = async () => {
    try {
        const connString = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/deardiary';
        await mongoose.connect(connString, { tls: true, tlsAllowInvalidCertificates: true });
        console.log(`✅ MongoDB Connected Successfully: ${connString.includes('127.0.0.1') ? 'Local' : 'Atlas Cloud'}`);
    } catch (err) {
        console.error('❌ MongoDB Connection Error:', err.message);
        console.log('\n⚠️  POSSIBLE CAUSE: MongoDB is not running.');
        console.log('👉 ACTION REQUIRED: Start the MongoDB server (mongod) and restart this server.\n');
    }
};
connectDB();

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/entries', require('./routes/entries'));

// Fallback: If no other route matched and it's not an API call, serve index.html
app.use((req, res) => {
    if (!req.url.startsWith('/api')) {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    } else {
        res.status(404).json({ msg: 'API route not found' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📂 Serving static files from: ${path.join(__dirname, 'public')}`);
});
