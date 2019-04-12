'use strict';

const express = require('express');
const HomeService = require('./home-service');
const HomeRouter = express.Router();

HomeRouter
  .route('/')
  .get((req, res, next) => {
    HomeService.getAll(req.app.get('db'))
      .then(data => {
        return res.json(data);
      })
      .catch(next);
  });

module.exports = HomeRouter;