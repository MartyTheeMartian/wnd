'use strict';

var util = require('util');
const knex = require('../../knex');


module.exports = {
  getUsersIdFavoritesId: getUsersIdFavoritesId,
  deleteUsersIdFavoritesId: deleteUsersIdFavoritesId
};

function getUsersIdFavoritesId(req, res) {

  knex('favorites')
    .where('users_id', req.swagger.params.users_id.value)
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



function deleteUsersIdFavoritesId(req, res) {

  knex('favorites')
    .where('users_id', req.swagger.params.users_id.value)
    .andWhere('id', req.swagger.params.id.value)
    .select('*')
    .first()
    .then((result) => {
      knex('favorites')
        .where('users_id', req.swagger.params.users_id.value)
        .andWhere('id', req.swagger.params.id.value)
        .select('*')
        .first()
        .del();
      res.send(result);
    })
    .catch((err) => {
      next();
    });

}
