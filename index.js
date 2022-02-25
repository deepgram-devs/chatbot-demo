require('dotenv').config()
const express = require('express')
const { Deepgram } = require('@deepgram/sdk')
const { dockStart } = require('@nlpjs/basic')

const app = express()
app.use(express.json())
app.use(express.static('public'))

const deepgram = new Deepgram(process.env.DEEPGRAM_API_KEY)
dockStart().then(dock => (nlp = dock.get('nlp')))

app.get('/ask', async (req, res) => {
    try {
        const { prompt } = req.query
        const { intent, answer } = await nlp.process('en', prompt)
        console.log({ prompt, intent, answer })
        res.json({ prompt, intent, answer })
    } catch(error) {
        res.json({ error })
    }
})

app.get('/token', async (req, res) => {
    try {
        const { key } = await deepgram.keys.create(
            process.env.DEEPGRAM_PROJECT_ID,
            'Chatbot Europe temp key',
            [ 'usage:write' ],
            { timeToLive: 10 }
        )
        res.send({ key })
    } catch(error) {
        res.json({ error })
    }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Started on *:${PORT} at ${new Date().toISOString()}`))
