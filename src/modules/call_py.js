// Fonction chargée de lancer le script Python et de gérer le retour
var call_python = function( event, url, msg, mode, data ) {
  /**
   * Fait la liaison entre javascript et python
   * A la fin du processus un événement identifié par la chaîne 'msg' et le résultat est déclenché
   * Celui sera intercepté par le script (.js) appelant pour traitement des résultats.
   * 
   * @param {event} event événement déclencheur
   * @param {url} url adresse du script relatif à la racine
   * @param {string} msg identifiant pour identifier le retour
   * @param {string} mode type de passage des arguments (text ou json)
   * @param {object} data structure des données
   */

  var { PythonShell } = require( 'python-shell' );

  if ( mode == 'json' ) {
    data = JSON.stringify( data )
  }

  // Appel python et met à jour le DOM
  let options = {
    mode: mode,
    pythonOptions: [ '-u' ],
    args: data
  }

  PythonShell.run( url, options, function( err, results ) {
    if ( err ) throw err;

    var result = results[ 0 ]

    if ( options.mode == 'json' ) {
      try {
        for ( var i = 0; i < result.length; i++ ) {
          result[ i ] = JSON.parse( result[ i ] )
        }
      } catch ( e ) {
        // statements
      }
    }
    event.sender.send( msg, result )
  } );
}

var path = require( 'path' )

exports.calcAvancement = function( event, data ) {
  call_python( event, path.join( __dirname, '../avancement/avancement.py' ), 'calcAvancement_ok', 'json', data )
}

exports.getEquations = function( event ) {
    console.log( path.join( __dirname, '../equation/get_equations.py' ) )
    call_python( event, path.join( __dirname, '../equation/get_equations.py', 'getEquations_ok', 'text' )
    }

    exports.dspEvolution = function( event, data ) {
      call_python( event, './evolution/evolution.py', 'dspEvolution_ok', 'json', data )
    }

    exports.getProblem = function( event, data ) {
      call_python( event, './problem/get_problem.py', 'getProblem_ok', 'json', data )
    }

    exports.id_connexion = function( event, data ) {
      call_python( event, './identification/identification.py', 'id_connexion_ok', 'json', data )
    }

    exports.id_inscription = function( event, data ) {
      call_python( event, './identification/identification.py', 'id_inscription_ok', 'json', data )
    }

    exports.id_new_session = function( event, data ) {
      call_python( event, './identification/identification.py', 'id_new_session_ok', 'json', data )
    }

    exports.id_recover = function( event, data ) {
      call_python( event, './identification/identification.py', 'id_recover_ok', 'json', data )
    }