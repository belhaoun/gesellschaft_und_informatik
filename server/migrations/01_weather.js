exports.up = function (knex, Promise) {
  return knex.schema.createTable('weather', (table) => {
    table.increments();
    table.text('location').notNullable();
    table.text('humidity').notNullable();
    table.text('latitude').notNullable();
    table.text('longitude').notNullable();
    table.text('pressure').notNullable();
    table.text('temperature').notNullable();
    table.text('weatherdiscription').notNullable();
    table.text('wind').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('weather');
};
