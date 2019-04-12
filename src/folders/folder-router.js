const express = require('express')
const FolderService = require('./folder-service')
const FolderRouter= express.Router()
const bodyParser = express.json()


const serializeFolder = folder => ({
    id: folder.id,
    name: folder.name,
  })

FolderRouter
.route('/')
.get((req, res, next) => {
   
    FolderService.getAllFolders(req.app.get('db'))
        .then(folders => {
           return res.json(folders.map(serializeFolder))
        })
        .catch(next)

})

module.exports = FolderRouter