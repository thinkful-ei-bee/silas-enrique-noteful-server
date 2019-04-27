'use strict';

const { API_TOKEN } = require('../src/config');
const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../src/app');

describe('App', () => {
  it('GET / responds with 200 containing "Hello, world!"', () => {
    return supertest(app)
      .get('/')
      .set('Authorization', `${API_TOKEN}`)
      .expect(200);
  });
});