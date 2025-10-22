const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    language: { type: String, required: true },
    content: { type: String, default: '' }
}, { _id: false });

const codespaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    isPublic: {
        type: Boolean,
        default: true,
    },
    passcode: {
        type: String,
        default: null, // We will store this as plain text for simplicity, but in production, HASH IT!
    },
    files: [fileSchema],
}, { timestamps: true });

module.exports = mongoose.model('Codespace', codespaceSchema);