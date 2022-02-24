require('dotenv').config()
const express = require('express')
const { dockStart } = require('@nlpjs/basic');

const app = express()
app.use(express.json())

dockStart().then(dock => (nlp = dock.get('nlp')))

app.get('/ask', async (req, res) => {
    try {
        const { answer } = await nlp.process('en', req.query.prompt);
        res.json({ answer })
    } catch(error) {
        res.json({ error })
    }
})


const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Started on *:${PORT} at ${new Date().toISOString()}`))
