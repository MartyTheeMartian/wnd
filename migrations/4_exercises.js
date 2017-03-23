
exports.up = function(knex, Promise) {

  return knex.schema.createTable('exercises', (table) => {
    table.increments();
    table.integer('users_id').references('id').inTable('users');
    table.string('name').notNullable();
    table.string('description').notNullable();
    table.integer('exercise_type').defaultTo(0).notNullable();
    table.integer('status').defaultTo(0).notNullable();
    // 0-2: 0 = dynamic, 1 = static, 2 = cardio
    table.timestamp("created_at").defaultTo(knex.raw('now()')).notNullable();
    table.timestamp("updated_at").defaultTo(knex.raw('now()')).notNullable();
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('exercises');
};
