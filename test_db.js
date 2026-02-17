const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URI;

// Standard options for Atlas
const clientOptions = {
    tls: true,
    tlsAllowInvalidCertificates: true
};

console.log('Testing MongoDB connection to:', uri ? uri.substring(0, 20) + '...' : 'undefined');

if (!uri) {
    console.error('Error: MONGO_URI is not defined in .env');
    process.exit(1);
}

mongoose.connect(uri, clientOptions)
    .then(() => {
        console.log('✅ MongoDB Connected Successfully!');
        process.exit(0);
    })
    .catch(err => {
        console.error('❌ MongoDB Connection Failed:', err);
        process.exit(1);
    });
