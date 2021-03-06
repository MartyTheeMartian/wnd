'use strict';

var util = require('util');
const knex = require('../../knex');


module.exports = {
  getRoutinesIdExercises: getRoutinesIdExercises
};


function getRoutinesIdExercises(req, res) {

  knex('routines_exercises')
    .where('users_id', null)
    .andWhere('routines_id', req.swagger.params.id.value)
    .select('exercises_id')
    .then((result) => {
      if(result.length != 0 ) {
        res.send(result);
      }
      else {
        throw new Error();
      }
    })
    .catch((err) => {
      res.status(404);
      res.send({status: 404, ErrorMessage: 'Not Found'});
    });

}
