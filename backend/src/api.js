const express = require('express')
const router = express.Router()
const fakeData = require('./utils/fakeData')
const mongoose = require('mongoose')
const NoteSchema = require('./models/note');
const ArticleSchema = require('./models/article');
const openAIChat = require('./utils/openai');
const getMessageUntilSuccess = require('./utils/retry')
// Test Routing
router.get("/test", (req, res) => {
    res.send({ msg: "Fight TO THE END!" })
})
/* Note Part */
// POST note
router.post('/user/:userId/note', (req, res) => {
    try {
        // 從 request 中獲取 'userId' 參數
        const { userId } = req.params
        const { title, content, isLinked } = req.body
        // 檢查 'userId' 參數是否存在
        if (!userId) {
            res.status(400).send({
                "error": "User ID is required"
            })
            return
        }
        if (!title || !content) {
            res.status(400).send({
                "error": "Something is missing in request body"
            })
            return
        }

        // create new note
        const newNote = new NoteSchema({
            title,
            content,
            isLinked: false,
            createdAt: new Date(),
            userId
        })

        // add Note to MongoDB
        newNote.save().then(async (note) => {
            const filteredNote = await NoteSchema.findById(note._id).select("_id userId title createdAt");
            // 201 for Resource Creation
            res.status(201).send(filteredNote)
        })
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send({ "error": "Internal Server Error" })
    }
})
// GET note
router.get('/note/:noteId', async (req, res) => {
    try {
        const { noteId } = req.params
        if (!noteId) {
            res.status(400).send({
                "error": "Note ID is required"
            })
            return
        }
        if (!mongoose.isValidObjectId(noteId)) {
            res.status(400).send({
                "error": "The _Id format is not valid"
            })
            return
        }
        const note = await NoteSchema.findById(noteId)
        res.status(200).send(note)
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send({ "error": "Internal Server Error" })
    }
})
// GET notes
router.get('/user/:userId/notes', async (req, res) => {
    try {
        const { userId } = req.params
        const { isLinked } = req.query
        if (!userId) {
            res.status(400).send({
                "error": "User ID is required"
            })
            return
        }
        if (typeof isLinked === 'undefined') {
            // get all notes
            const notes = await NoteSchema.find({ userId })
            res.status(200).send(notes)
        }
        else {
            // get notes according to isLinked
            const notes = await NoteSchema.find({ userId, isLinked })
            res.status(200).send(notes)
        }
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send({ "error": "Internal Server Error" })
    }
})
// DELETE note
router.delete('/note/:noteId', async (req, res) => {
    try {
        const { noteId } = req.params
        if (!noteId) {
            res.status(400).send({
                "error": "Note ID is required"
            })
            return
        }
        if (!mongoose.isValidObjectId(noteId)) {
            res.status(400).send({
                "error": "The _Id format is not valid"
            })
            return
        }
        const note = await NoteSchema.findById(noteId)
        // 404 for Not Found
        if (!note) {
            res.status(404).send({
                "error": "Note not found"
            })
        }
        // 200 for Success
        else {
            // block delete Note if its isLinked is true
            if (note.isLinked) {
                res.status(403).send({
                    "error": "Note is linked to some Article, cannot delete"
                })
                return
            }
            // safely delete Note
            await NoteSchema.findByIdAndDelete(noteId)
            res.status(200).send({ 'msg': 'Note deleted' })
        }
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send({ "error": "Internal Server Error" })
    }
})
// PUT note title
router.put('/note/:noteId/', async (req, res) => {
    try {
        const { noteId } = req.params
        const { title } = req.query

        if (!noteId || !title) {
            res.status(400).send({
                "error": "Note ID and title are required"
            })
            return
        }
        if (!mongoose.isValidObjectId(noteId)) {
            res.status(400).send({
                "error": "The _Id format is not valid"
            })
            return
        }
        // Update Note
        const note = await NoteSchema.findByIdAndUpdate(noteId, { title }, { new: true })
        // 404 for Not Found
        if (!note) {
            res.status(404).send({
                "error": "Note not found"
            })
        }
        // 200 for Success
        else {
            res.status(200).send({ userId: note.userId, title: note.title })
        }
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send({ "error": "Internal Server Error" })
    }
})
// PUT note isLinked
router.put('/note/:noteId/', async (req, res) => {
    try {
        const { noteId } = req.params
        const { isLinked } = req.query
        if (!noteId || !isLinked) {
            res.status(400).send({
                "error": "Note ID and isLinked are required"
            })
            return
        }
        if (!mongoose.isValidObjectId(noteId)) {
            res.status(400).send({
                "error": "The _Id format is not valid"
            })
            return
        }
        // Update Note
        const note = await NoteSchema.findByIdAndUpdate(noteId, { isLinked }, { new: true })
        // 404 for Not Found
        if (!note) {
            res.status(404).send({
                "error": "Note not found"
            })
        }
        // 200 for Success
        else {
            res.status(200).send({ userId: note.userId, isLinked: note.isLinked })
        }
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send({ "error": "Internal Server Error" })
    }
})
// PUT note content
router.put('/note/:noteId/content', async (req, res) => {
    try {
        const { noteId } = req.params
        const { content } = req.body

        if (!noteId || !content) {
            res.status(400).send({
                "error": "Note ID and content are required"
            })
            return
        }
        if (!mongoose.isValidObjectId(noteId)) {
            res.status(400).send({
                "error": "The _Id format is not valid"
            })
            return
        }
        // Update Note
        const note = await NoteSchema.findByIdAndUpdate(noteId, { content }, { new: true })
        // 404 for Not Found
        if (!note) {
            res.status(404).send({
                "error": "Note not found"
            })
        }
        // 200 for Success
        else {
            res.status(200).send({ userId: note.userId, content: note.content })
        }
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send({ "error": "Internal Server Error" })
    }
})
/* Article Part */
// POST article
router.post('/user/:userId/article', (req, res) => {
    try {
        // 從 request 中獲取 'userId' 參數
        const { userId } = req.params
        const { title, content, category, linkedNotes } = req.body
        // 檢查 'userId' 參數是否存在
        if (!userId) {
            res.status(400).send({
                "error": "User ID is required"
            })
            return
        }
        if (!title || !content || !category || !linkedNotes) {
            res.status(400).send({
                "error": "Something is missing in request body"
            })
            return
        }

        // create new article
        const newArticle = new ArticleSchema({
            title,
            content,
            category,
            linkedNotes,
            createdAt: new Date(),
            userId
        })

        // add Article to MongoDB
        newArticle.save().then(async (article) => {
            const filterArticle = await ArticleSchema.findById(article._id).select("_id userId title createdAt");
            // set linkedNotes isLinked to true
            for (let i = 0; i < linkedNotes.length; i++) {
                const note = await NoteSchema.findByIdAndUpdate(linkedNotes[i], { isLinked: true }, { new: true })
                // 404 for Not Found
                if (!note) {
                    res.status(404).send({
                        "error": "Linked Notes not found"
                    })
                }
            }
            // 201 for Resource Creation
            res.status(201).send(filterArticle)
        })
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send({ "error": "Internal Server Error" })
    }
})
// GET article
router.get('/article/:articleId', async (req, res) => {
    try {
        const { articleId } = req.params
        if (!articleId) {
            res.status(400).send({
                "error": "Article ID is required"
            })
            return
        }
        if (!mongoose.isValidObjectId(articleId)) {
            res.status(400).send({
                "error": "The _Id format is not valid"
            })
            return
        }
        const article = await ArticleSchema.findById(articleId)
        res.status(200).send(article)
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send({ "error": "Internal Server Error" })
    }
})
// GET article's linkedNotes
router.get('/article/:articleId/linkedNotes', async (req, res) => {
    try {
        const { articleId } = req.params
        if (!articleId) {
            res.status(400).send({
                "error": "Article ID is required"
            })
            return
        }
        if (!mongoose.isValidObjectId(articleId)) {
            res.status(400).send({
                "error": "The _Id format is not valid"
            })
            return
        }
        const article = await ArticleSchema.findById(articleId).select("linkedNotes")
        // 404 for Not Found
        if (!article) {
            res.status(404).send({
                "error": "Article not found"
            })
        }
        // 200 for Success
        else {
            // get linkedNotes
            const linkedNotes = await NoteSchema.find({ _id: { $in: article.linkedNotes } })
            res.status(200).send(linkedNotes)
        }
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send({ "error": "Internal Server Error" })

    }
})
// GET articles
router.get('/user/:userId/articles', async (req, res) => {
    try {
        const { userId } = req.params
        if (!userId) {
            res.status(400).send({
                "error": "User ID is required"
            })
            return
        }
        const articles = await ArticleSchema.find({ userId })
        res.status(200).send(articles)
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send({ "error": "Internal Server Error" })
    }
})
// DELETE article
router.delete('/article/:articleId', async (req, res) => {
    try {
        const { articleId } = req.params
        if (!articleId) {
            res.status(400).send({
                "error": "Article ID is required"
            })
            return
        }
        if (!mongoose.isValidObjectId(articleId)) {
            res.status(400).send({
                "error": "The _Id format is not valid"
            })
            return
        }
        const article = await ArticleSchema.findByIdAndDelete(articleId)
        // 404 for Not Found
        if (!article) {
            res.status(404).send({
                "error": "Article not found"
            })
        }
        // 200 for Success
        else {
            // set isLinked property of linkedNotes to false
            for (let i = 0; i < article.linkedNotes.length; i++) {
                const note = await NoteSchema.findByIdAndUpdate(article.linkedNotes[i], { isLinked: false }, { new: true })
                // 404 for Not Found
                if (!note) {
                    res.status(404).send({
                        "error": "Linked Notes not found"
                    })
                }
            }
            res.status(200).send({ 'msg': 'Article deleted' })
        }
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send({ "error": "Internal Server Error" })
    }
})
// PUT article title
router.put('/article/:articleId/', async (req, res) => {
    try {
        const { articleId } = req.params
        const { title } = req.query

        if (!articleId || !title) {
            res.status(400).send({
                "error": "Article ID and title are required"
            })
            return
        }
        if (!mongoose.isValidObjectId(articleId)) {
            res.status(400).send({
                "error": "The _Id format is not valid"
            })
            return
        }
        // Update Article
        const article = await ArticleSchema.findByIdAndUpdate(articleId, { title }, { new: true })
        // 404 for Not Found
        if (!article) {
            res.status(404).send({
                "error": "Article not found"
            })
        }
        // 200 for Success
        else {
            res.status(200).send({ userId: article.userId, title: article.title })
        }
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send({ "error": "Internal Server Error" })
    }
})
// PUT article category
router.put('/article/:articleId/', async (req, res) => {
    try {
        const { articleId } = req.params
        const { category } = req.query
        if (!articleId || !category) {
            res.status(400).send({
                "error": "Article ID and category are required"
            })
            return
        }
        if (!mongoose.isValidObjectId(articleId)) {
            res.status(400).send({
                "error": "The _Id format is not valid"
            })
            return
        }
        // Update Article
        const article = await ArticleSchema.findByIdAndUpdate(articleId, { category }, { new: true })
        // 404 for Not Found
        if (!article) {
            res.status(404).send({
                "error": "Article not found"
            })
        }
        // 200 for Success
        else {
            res.status(200).send({ userId: article.userId, category: article.category })
        }
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send({ "error": "Internal Server Error" })
    }

})
// PUT article content
router.put('/article/:articleId/content', async (req, res) => {
    try {
        const { articleId } = req.params
        const { content } = req.body

        if (!articleId || !content) {
            res.status(400).send({
                "error": "Article ID and content are required"
            })
            return
        }
        if (!mongoose.isValidObjectId(articleId)) {
            res.status(400).send({
                "error": "The _Id format is not valid"
            })
            return
        }
        // Update Article
        const article = await ArticleSchema.findByIdAndUpdate(articleId, { content }, { new: true })
        // 404 for Not Found
        if (!article) {
            res.status(404).send({
                "error": "Article not found"
            })
        }
        // 200 for Success
        else {
            res.status(200).send({ userId: article.userId, content: article.content })
        }
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send({ "error": "Internal Server Error" })
    }
})
// PUT article linkedNotes
router.put('/article/:articleId/linkedNotes', async (req, res) => {
    try {
        const { articleId } = req.params
        const { linkedNotes } = req.body

        if (!articleId || !linkedNotes) {
            res.status(400).send({
                "error": "Article ID and linkedNotes are required"
            })
            return
        }
        if (!mongoose.isValidObjectId(articleId)) {
            res.status(400).send({
                "error": "The _Id format is not valid"
            })
            return
        }
        // set isLinked property of original linkedNotes to false
        const originalLinkedNotes = await ArticleSchema.findById(articleId).select("linkedNotes")
        for (let i = 0; i < originalLinkedNotes.linkedNotes.length; i++) {
            const note = await NoteSchema.findByIdAndUpdate(originalLinkedNotes.linkedNotes[i], { isLinked: false }, { new: true })
            // 404 for Not Found
            if (!note) {
                res.status(404).send({
                    "error": "Original Linked Notes not found"
                })
            }
        }
        // Update Article
        const article = await ArticleSchema.findByIdAndUpdate(articleId, { linkedNotes }, { new: true })
        // set isLinked property of new linkedNotes to true
        for (let i = 0; i < linkedNotes.length; i++) {
            const note = await NoteSchema.findByIdAndUpdate(linkedNotes[i], { isLinked: true }, { new: true })
            // 404 for Not Found
            if (!note) {
                res.status(404).send({
                    "error": "target Linked Notes not found"
                })
            }
        }
        // 404 for Not Found
        if (!article) {
            res.status(404).send({
                "error": "Article not found"
            })
        }
        // 200 for Success
        else {
            res.status(200).send({ userId: article.userId, linkedNotes: article.linkedNotes })
        }
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send({ "error": "Internal Server Error" })

    }
})
// Danger Zone
// DELETE all notes and articles of a user with userId
router.delete('/user/:userId/danger/clear-all', async (req, res) => {
    try {
        const { userId } = req.params
        if (!userId) {
            res.status(400).send({
                "error": "User ID is required"
            })
            return
        }
        // delete all notes
        await NoteSchema.deleteMany({ userId })
        // delete all articles
        await ArticleSchema.deleteMany({ userId })
        res.status(200).send({ 'msg': `All notes and articles of user:${userId} deleted` })
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send({ "error": "Internal Server Error" })

    }
})
// AI API
// GET question for article
router.post('/user/article/label', async (req, res) => {
    try {
        //console.log('AI backend')
        const { note } = req.body
        if (note == null) {
            res.send("Please add your notes first")
            return
        }
        const jsonObject = await getMessageUntilSuccess(note)
        if(!jsonObject){
            console.error("Unable to fetch from OpenAI server")
        }
        res.send({ 'ans': jsonObject})
        // res.send({ 'ans': openAIResponse.message.content })
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send({ "error": "Internal Server Error" })
    }
})
module.exports = router