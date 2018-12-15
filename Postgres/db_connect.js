const pg = require('pg')
const config = require('../credentials/'+process.env.NODE_ENV+'/postgres_config')[process.env.NODE_ENV]

// create a config to configure both pooling behavior
// and client options
// note: all config is optional and the environment variables
// will be read if the config is not present
const configurations = {
  user: config.postgres.user, //env var: PGUSER
  database: config.postgres.database, //env var: PGDATABASE
  password: config.postgres.password, //env var: PGPASSWORD
  host: config.postgres.host, // Server hosting the postgres database
  port: config.postgres.port, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
}

//this initializes a connection pool
//it will keep idle connections open for 30 seconds
//and set a limit of maximum 10 idle clients
const pool = new pg.Pool(configurations)

pool.on('error', (err, client) => {
  // if an error is encountered by a client while it sits idle in the pool
  // the pool itself will emit an error event with both the error and
  // the client which emitted the original error
  // this is a rare occurrence but can happen if there is a network partition
  // between your application and the database, the database restarts, etc.
  // and so you might want to handle it and at least log it out
  console.error('idle client error', err.message, err.stack)
})

//export the query method for passing queries to the pool
module.exports.query = (text, values, callback) => {
  // console.log('query:', text, values)
  return pool.query(text, values, callback)
}

// the pool also supports checking out a client for
// multiple operations, such as a transaction
module.exports.connect = (callback) => {
  console.log("CONNECTED")
  return pool.connect(callback)
}
