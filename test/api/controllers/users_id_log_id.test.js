'use strict';

process.env.NODE_ENV = 'test';

const request = require('supertest');
const knex = require('../../../knex');
const expect = require('chai').expect;
const app = require('../../../app');

describe('controllers', () => {

    before((done) => {
      knex.migrate.latest()
      .then(() => {
        return knex.seed.run();
      })
      .then(() => {
          done();
      })
      .catch((err) => {
          done(err);
      });
    });

    after(function(done) {
      knex.migrate.rollback()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
    });

    describe('log of given id of routines for users', () => {

      describe('GET /users/:id/log/:id', () => {

        it('should respond with a single past log of users routine history', done => {
          request(app)
          .get('/users/1/log/1')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200, {
            id: 1,
            users_id: 1,
            routines_id: 1,
            rating: 4,
            notes: 'Workout was intense. I made sweat.',
            date: '2016-06-29T07:00:00.000Z',
            created_at: '2016-06-29T14:26:16.000Z',
            updated_at: '2016-06-29T14:26:16.000Z'
          }, done)
        })

        it('should respond with 404 Not Found for an invalid user id', done => {
          request(app)
          .get('/users/-1/log/1')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(404, {status: 404, ErrorMessage: 'Not Found'}, done)
        })

        it('should respond with 404 Not Found for an invalid user id', done => {
          request(app)
          .get('/users/1/log/-1')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(404, {status: 404, ErrorMessage: 'Not Found'}, done)
        })
      });
    });

    describe('PATCH /users/:id/log/:id', () => {

      it('should post a user routine to log if valid user id is provided', done => {
        request(app)
        .patch('/users/1/log/1')
        .send({
          users_id: 1,
          routines_id: 2,
          rating: 5,
          notes: 'Phew, stinky workout.',
          date: "2017-03-24"
        })
        .expect((res) => {
          delete res.body.created_at;
          delete res.body.updated_at;
        })
        .expect('Content-Type', /json/)
        .expect({
          id: 1,
          users_id: 1,
          routines_id: 2,
          rating: 5,
          notes: 'Phew, stinky workout.',
          date: '2017-03-24T07:00:00.000Z'
        }, done)
      })

      it('should respond with 400 Bad Request if invalid user id is provided', done => {
        request(app)
        .patch('/users/-1/log/1')
        .send([{
          users_id: 1,
          routines_id: 2,
          rating: 5,
          notes: 'Phew, stinky workout.',
          date: "2017-03-24"
        }])
        .expect('Content-Type', /json/)
        .expect({status: 400, ErrorMessage: 'Bad Request. Invalid Inputs.'}, done)
      })

      it('should respond with 400 Bad Request if invalid user id is provided', done => {
        request(app)
        .patch('/users/1/log/-1')
        .send([{
          users_id: 1,
          routines_id: 2,
          rating: 5,
          notes: 'Phew, stinky workout.',
          date: "2017-03-24"
        }])
        .expect('Content-Type', /json/)
        .expect({status: 400, ErrorMessage: 'Bad Request. Invalid Inputs.'}, done)
      })
    });

    describe('DELETE /users/:id/log/:id', () => {

      it('should delete and respond with a specific log entry for a user', done => {
        request(app)
        .del('/users/1/log/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(res => {
          delete res.body.created_at;
          delete res.body.updated_at;
        })
        .expect(200, {
          id: 1,
          users_id: 1,
          routines_id: 2,
          rating: 5,
          notes: 'Phew, stinky workout.',
          date: '2017-03-24T07:00:00.000Z'
        }, done);
      });

      it('should respond with 404 Not Found if invalid user id is provided', done => {
        request(app)
        .del('/users/-1/log/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(res => {
          delete res.body.created_at;
          delete res.body.updated_at;
        })
        .expect(404, {status: 404, ErrorMessage: 'Not Found.'}, done)
      })

      it('should respond with 404 Not Found if invalid log id is provided', done => {
        request(app)
        .del('/users/1/log/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(res => {
          delete res.body.created_at;
          delete res.body.updated_at;
        })
        .expect(404, {status: 404, ErrorMessage: 'Not Found.'}, done)
      })
  });

  });
