require('dotenv').config({path: __dirname + '/.env'});
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host     : process.env.DB_HOST,
      user     : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_NAME,
      port     : process.env.DB_PORT,
      ssl      : process.env.DB_SSL
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },

  production: {
    client: 'postgresql',
    connection: 'postgres://qziieqzztighfc:028c0c7bb6e3d424514a73ff5affe221b7c03506ccc520a6516aa1708c57ac43@ec2-54-221-192-231.compute-1.amazonaws.com:5432/dfsd307ar1p3ed',
    pool: {
      min: 2,
      max: 50
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  }
};
