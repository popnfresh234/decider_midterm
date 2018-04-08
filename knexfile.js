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
    connection: 'postgres://zwgfsijwvewcft:7d3542f7a96ce4ab2b9d448c0e16153e5829b5bd991d89d694a43ba410e515d8@ec2-54-204-21-226.compute-1.amazonaws.com:5432/dac62kb5j0j6gi',
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
