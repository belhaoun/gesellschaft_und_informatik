exports.up = function (knex, Promise) {
    return knex.schema.createTable('flightapi', (table) => {
      table.increments();
      table.text('observation').notNullable();
      table.text('idflight').notNullable();

      
      //table.timestamp('lng').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('flightapi');
  };
  