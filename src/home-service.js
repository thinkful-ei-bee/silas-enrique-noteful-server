'use strict';

const HomeService = {
  getAll(knex) {
    return knex.from('notes')
      .innerJoin('folders', 'notes.folderid', 'folders.id');
  },
};

module.exports = HomeService;