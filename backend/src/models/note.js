const mongoose = require('mongoose');

// 定義 Note Schema
const NoteSchema = new mongoose.Schema({
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
    isLinked:
    {
        type: Boolean,
        default: false,
    },
});

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;
