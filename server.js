const express = require('express')
const https = require('https')
const http = require('http')
const fs = require('fs')
const morgan = require('morgan')
const router = require('./router')
const cors = require('cors')

const app = express()

// Database setup

// App setup
// morgan and bodyParser are middlewares. any incoming requests will be passed through each
// morgan is a logging framework to see incoming requests. used mostly for debugging
app.use(morgan('tiny'));
// CORS middleware (cross origin resource sharing) to configure what domain & ips can talk to our server api
// CORS is used for user security on web browsers. Enable CORS on server to allow all I.P. addresses
app.use(cors());

// we instantiate the router function that defines all our HTTP route endpoints
router(app);

// Server setup
// if there is an environment variable of PORT already defined, use it. otherwise use port 3002
const port = process.env.PORT || 7801

// create a server with the native node https library
if (process.env.NODE_ENV === 'production') {
  // instantiate the SSL certificate necessary for HTTPS
  const options = {
      ca: fs.readFileSync('./credentials/production/rentheros_com.ca-bundle'),
      key: fs.readFileSync('./credentials/production/private-key.key'),
      cert: fs.readFileSync('./credentials/production/rentheros_com.crt'),
      requestCert: false,
      rejectUnauthorized: false
  }
  const server = https.createServer(options, app)
  // listen to the server on port
  server.listen(port, function(){
    console.log("Server listening on https: ", port)
  })
} else if (process.env.NODE_ENV === 'staging') {
  // instantiate the SSL certificate necessary for HTTPS
  const options = {
      ca: fs.readFileSync('./credentials/staging/renthero_host.ca-bundle'),
      key: fs.readFileSync('./credentials/staging/renthero_host.key'),
      cert: fs.readFileSync('./credentials/staging/renthero_host.crt'),
      requestCert: false,
      rejectUnauthorized: false
  }
  const server = https.createServer(options, app)
  // listen to the server on port
  server.listen(port, function(){
    console.log("Server listening on https: ", port)
  })
} else if (process.env.NODE_ENV === 'development') {
  // instantiate the SSL certificate necessary for HTTPS
  const options = {
      ca: fs.readFileSync('./credentials/development/renthero_host.ca-bundle'),
      key: fs.readFileSync('./credentials/development/renthero_host.key'),
      cert: fs.readFileSync('./credentials/development/renthero_host.crt'),
      requestCert: false,
      rejectUnauthorized: false
  }
  // const server = https.createServer(options, app)
  const server = http.createServer(app)

  // listen to the server on port
  server.listen(port, function(){
    console.log("Server listening on http: ", port)
  })
}
