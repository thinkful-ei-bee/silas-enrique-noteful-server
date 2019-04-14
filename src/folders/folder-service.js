'use strict';

const FolderService = {
  getAllFolders(knex) {
    return knex.select('*').from('folders');
  },
  getFolder(knex, id) {
    return knex
      .from('folders')
      .innerJoin('notes', 'notes.folderid', 'folders.id')
      .where('id', '=', id);
  },
  insertFolder(knex, newFolder) {
    return knex
      .insert(newFolder)
      .into('folders')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },
  deleteFolder(knex, id) {
    return knex('folders')
      .where({ id })
      .delete();
  },
  updateFolder(knex, id, updateInfo) {
    return knex('folders')
      .where({ id })
      .update(updateInfo);
  }
};
module.exports = FolderService;