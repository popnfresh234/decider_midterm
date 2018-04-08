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
    connection: 'postgres://enilnmsbppurxn:439c2cddf37fc7a640c5dc7d61829cff7d26a843434e15c838d0f9a561e8258a@ec2-54-221-192-231.compute-1.amazonaws.com:5432/d5rhf4p0dj9als',


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
