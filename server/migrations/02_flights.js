exports.up = function (knex, Promise) {
    return knex.schema.createTable('flights', (table) => {
      table.increments();
      table.text('hex').notNullable();
      table.text('lng').notNullable();
      table.text('lat').notNullable();
      table.text('speed').notNullable();
      table.text('updated').notNullable();
      table.text('dir').notNullable();
      table.text('idflight').notNullable();

      //table.timestamp('lng').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('flights');
  };
  