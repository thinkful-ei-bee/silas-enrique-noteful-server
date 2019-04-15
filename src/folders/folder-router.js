'use strict';

/*
  Here express is used to set the endponts when handling folders.
  Every endpoint here begins with '/folders'

  Express Router is used to set the enpoints.

  For all functionality dealing with the database,
  look in ./folder.service.js
 */

const express = require('express');
const FolderService = require('./folder-service');
const FolderRouter= express.Router();
const bodyParser = express.json();


const serializeFolder = folder => ({
  id: folder.id,
  name: folder.folder_name,
});

FolderRouter
  .route('/')
  // GET
  .get((req, res, next) => {
    FolderService.getAllFolders(req.app.get('db'))
      .then(folders => {
        return res.json(folders.map(serializeFolder));
      })
      .catch(next);

  })
  // POST
  .post(bodyParser, (req, res, next) => {
    const { name } = req.body;

    if (!name || typeof name !== 'string') {
      return res.status(404).send('Folder is an invalid name');
    }

    const newFolder = { name };

    FolderService.insertFolder(req.app.get('db'), newFolder)
      .then(folder => {
        return res.json(serializeFolder(folder));
      })
      .catch(next);
  });

FolderRouter
  .route('/:folderId')
  .get((req, res, next) => {
    const { folderId } = req.params;
    FolderService.getFolder(req.app.get('db'), folderId)
      .then(data => {
        return res.json(data);
      })
      .catch(next);
  });

module.exports = FolderRouter;