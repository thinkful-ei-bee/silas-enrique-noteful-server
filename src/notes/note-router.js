'use strict';

const express = require('express');
const NoteService = require('./note-service');
const NoteRouter= express.Router();
const bodyParser = express.json();

const serializeNote = note => ({
  id: note.id,
  name: note.name,
  folderId: note.folderId,
  content: note.content
});


NoteRouter
  .route('/')
  .get((req, res, next) => {
    NoteService.getAllNotes(req.app.get('db'))
      .then(notes => {
        return res.json(notes.map(serializeNote));
      })
      .catch(next);
  
  });

module.exports = NoteRouter;