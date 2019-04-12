'use strict';

const express = require('express');
const FolderService = require('./folder-service');
const FolderRouter= express.Router();
const bodyParser = express.json();


const serializeFolder = folder => ({
  id: folder.id,
  name: folder.name,
});

FolderRouter
  .route('/folders')
  .get((req, res, next) => {
   
    FolderService.getAllFolders(req.app.get('db'))
      .then(folders => {
        return res.json(folders.map(serializeFolder));
      })
      .catch(next);

  })
  .post(bodyParser, (req, res, next) => {

    const { id, name } = req.body;

    const newFolder = { id, name };



    FolderService.insertFolder(req.app.get('db'), newFolder)
      .then(folder => {
        return res.json(serializeFolder(folder));
      })
      .catch(next);
  });

module.exports = FolderRouter;