'use strict';

const express = require('express');
const HomeService = require('./home-service');
const HomeRouter = express.Router();
const FolderService = require('./folders/folder-service');
const NoteService = require('./notes/note-service');

const serializeFolder = folder => ({
  id: folder.id,
  name: folder.folder_name,
});

const serializeNote = note => ({
  id: note.note_id,
  name: note.note_name,
  folderId: note.folderid,
  content: note.content
});

HomeRouter
  .route('/')
  .get((req, res, next) => {
    HomeService.getAll(req.app.get('db'))
      .then(data => {
        return res.json(data);
      })
      .catch(next);
  });

HomeRouter
  .route('/all')
  .get(async (req, res, next) => {
    let notes = await NoteService.getAllNotes(req.app.get('db'));
    let folders = await FolderService.getAllFolders(req.app.get('db'));
    notes = notes.map(serializeNote);
    folders = folders.map(serializeFolder);

    const data = { notes, folders };
    res.json(data);
  });
  

module.exports = HomeRouter;