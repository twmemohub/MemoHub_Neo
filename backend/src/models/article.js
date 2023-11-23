const mongoose = require('mongoose');

// 定義 Article Schema
const ArticleSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        default: "",
    },
    category:
    {
        type: String,
        default: "None",
    },
    linkedNotes: {
        type: [String],
        default: [],
    },
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
