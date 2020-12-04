var {
  PythonShell
} = require( 'python-shell' )
var options = {
  scriptPath: './src/',
  mode: 'json'
}

dispatcher = function( io ) {

  io.on( 'connection', function( socket ) {

    // Message initialisation du serveur et connexion
    welcome = { 'titre': 'Welcome' }
    socket.emit( 'welcome', JSON.stringify( welcome ) );

    socket.on( 'welcome_ok', function( msg ) {
      console.log( msg );
    } );

    // Récupération des équations
    socket.on( 'getEquations', function( msg ) {
      pyshell = new PythonShell( './equation/get_equations.py', options );
      pyshell.send( JSON.stringify( {} ) );
      pyshell.on( 'message', function( message ) {
        socket.emit( 'getEquations_ok', message )
      } )

      pyshell.end( function( err, code, signal ) {
        if ( err ) console.log( err );
      } )
    } )


    // calcul avancement
    socket.on( 'calcAvancement', function( data ) {
      pyshell = new PythonShell( './avancement/avancement.py', options );
      pyshell.send( data );
      pyshell.on( 'message', function( message ) {
        socket.emit( 'calc_avancement_ok', message )
      } )
      pyshell.end( function( err, code, signal ) {
        if ( err ) console.log( err );
      } )
    } )


    // affichage graphe
    socket.on( 'dspEvolution', function( data ) {
      pyshell = new PythonShell( './evolution/evolution.py', options );
      pyshell.send( data );
      pyshell.on( 'message', function( data ) {
        socket.emit( 'dspEvolution_ok', data )
      } );
      pyshell.end( function( err, code, signal ) {
        if ( err ) console.log( err );
      } )
    } )

    // problèmes
    socket.on( 'dspProblem', function( data ) {
      pyshell = new PythonShell( './problem/get_problem.py', options );
      pyshell.send( data );
      pyshell.on( 'message', function( data ) {
        socket.emit( 'dspProblem_ok', data )
      } );
      pyshell.end( function( err, code, signal ) {
        if ( err ) console.log( err );
      } )
    } )
  } )
}

//module.exports = {dispatcher}