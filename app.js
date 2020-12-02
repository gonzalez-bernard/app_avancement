const express = require( 'express' )
const app = express()
  //const port = 3000
  //const fs = require('fs')
const path = require( 'path' )
const jQuery = require( 'jquery' )
const http = require( 'http' )
var server = http.createServer( app )
var io = require( 'socket.io' )( server )

require( 'src/dispatcher.js' )
dispatcher( io )

app.use( express.static( __dirname + '/views' ) );
app.use( '/static', express.static( __dirname + '/static' ) )
app.use( '/src', express.static( __dirname + '/src' ) )
app.use( '/node', express.static( __dirname + '/node_modules' ) )


app.get( '/', ( req, res ) => {
  res.render( '/views/index.html' );
} );

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

server.listen( port, () => {
  console.log( `Example app listening at http://localhost:${port}` )
} )