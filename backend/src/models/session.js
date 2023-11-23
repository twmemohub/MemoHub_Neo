const mongoose = require('mongoose');

// 定義 Session Schema
const SessionSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    messages: {
        type: [String],
        default: [],
    },
});

// 創建 Session Model
const Session = mongoose.model('Session', SessionSchema);

// 匯出 Session Model
module.exports = Session;
