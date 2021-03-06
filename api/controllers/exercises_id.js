'use strict';

var util = require('util');
const knex = require('../../knex');


module.exports = {
  getExercisesId: getExercisesId
};


function getExercisesId(req, res) {

  knex('exercises')
    .where('users_id', null)
    .andWhere('id', req.swagger.params.id.value)
    .select('*')
    .first()
    .then((result) => {
      if(result) {
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
