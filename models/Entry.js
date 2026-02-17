const mongoose = require('mongoose');

const EntrySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    mood: {
        type: String,
        default: null
    },
    lastEdited: {
        type: Date,
        default: null
    }
});

module.exports = mongoose.model('Entry', EntrySchema);
