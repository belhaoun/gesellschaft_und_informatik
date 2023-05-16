// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://postgres:postgres@localhost/informatik',
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL + '?ssl-true',
  },
};
