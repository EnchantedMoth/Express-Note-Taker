const router = require('express').Router()
const uuid = require('../helpers/uuid')
const { readFromFile, readAndAppend } = require('../helpers/fsUtils')
const fs = require('fs').promises

router.get('/', (req, res) => {
    readFromFile('./db/db.json')
    .then(data => res.json(JSON.parse(data)))
});

router.post('/', (req, res) => {
    const { title, text } = req.body

    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuid()
        };

        readAndAppend(newNote, './db/db.json')

        const response = {
            status: 'sucess',
            body: newNote,
        };

        res.json(response)
    } else {
        res.json('Error posting new note')
    }
});

router.delete('/', (req, res) => {
    
})


module.exports = router