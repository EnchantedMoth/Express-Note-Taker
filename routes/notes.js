const router = require('express').Router()
const uuid = require('../helpers/uuid')
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils')
const fs = require('fs').promises

router.get('/', (req, res) => {
    readFromFile('./db/db.json')
    .then(notes => res.json(JSON.parse(notes)))
});

router.post('/', (req, res) => {
    const { title, text } = req.body

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid()
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

router.delete('/:id', (req, res) => {
    readFromFile('./db/db.json')
    .then(notes => {
        const parsedNotes = JSON.parse(notes)

        const filteredNotes = parsedNotes.filter((parsedNotes) => {
            return parsedNotes.id !== req.params.id;
        });
        console.log('filtered:', filteredNotes)

        writeToFile('./db/db.json', filteredNotes);
        res.json(filteredNotes)
    });

});


module.exports = router