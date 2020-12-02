var cts = require( "../constantes.js" )
var msg = require( "./msg.js" )
var txt = require( "./lang_" + cts.SUFFIXE_LANG + ".js" )
var utils = require( "./../modules/utils.js" )
var md5 = require( "./../modules/md5.js" )


var connexion = function() {
  /*
   * Connexion 
   * Prépare les données et lance un appel à python pour traitement
   * Retourne un objet d'identification possédant les informations suivantes :
   * - nom
   * - niveau d'habilitation : 1 = visiteur, 2 = utilisateur, 3 = rédacteur, 4 = admin
   * - niveau de progression : 1, 2 ou 3 
   */
  let infos = {}
  infos[ 'func' ] = 'connexion'
  infos[ 'datas' ] = {}
  infos[ 'datas' ][ 'nom' ] = $( "#id_nom" ).val()
  infos[ 'datas' ][ 'pwd' ] = md5.calcMD5( $( "#id_pwd" ).val() )

  socket.emit( 'id_connexion', infos )
}

var inscription = function() {
  let infos = {}
  infos[ 'func' ] = 'inscription'
  infos[ 'datas' ] = {}
  infos[ 'datas' ][ 'nom' ] = $( "#id_nom" ).val()
  infos[ 'datas' ][ 'pwd' ] = md5.calcMD5( $( "#id_pwd" ).val() )
  infos[ 'datas' ][ 'email' ] = $( "#id_mail" ).val()

  socket.emit( 'id_inscription', infos )
}

var recover = function() {
  let infos = {}
  infos[ 'func' ] = 'recover'
  infos[ 'datas' ] = {}
  infos[ 'datas' ][ 'nom' ] = $( "#id_nom" ).val()
  infos[ 'datas' ][ 'email' ] = $( "#id_mail" ).val()
  infos[ 'datas' ][ 'cc' ] = ""
  infos[ 'datas' ][ 'bcc' ] = ""
  infos[ 'datas' ][ 'subject' ] = txt.ID_MAIL_SUBJECT
  infos[ 'datas' ][ 'message' ] = msg.ID_HTML_MAIL_MESSAGE

  socket.emit( 'id_recover', infos )
}

var _dsp_message = function( data, msg_success, msg_error ) {
  if ( typeof data == "string" ) {
    // si erreur
    let elt = $( "#id_alert_error" )
    elt.html( msg_error + "<br/>" + data )
    elt.fadeTo( 2000, 500 ).slideUp( 500, function() {
      elt.alert( 'hide' )
    } )
    return false
  } else {
    // si succes
    let elt = $( "#id_alert_success" )
    elt.html( msg_success )
    elt.fadeTo( 1000, 500 ).slideUp( 500, function() {
      elt.alert( 'hide' )
    } )
    return true
  }
}

var _init_session = function( user ) {
  // enregistrement user
  sessionStorage.setItem( 'user', JSON.stringify( user ) )

  // initialisation de la session
  let infos = {}
  infos[ 'func' ] = 'new_session'
  infos[ 'datas' ] = {}
  infos[ 'datas' ][ 'id_user' ] = user[ 'id' ]
  socket.emit( 'id_new_session', infos )
}

socket.on( 'id_connexion_ok', function( event, user ) {
  /**
   * Connexion
   * @param  {Object} user
   */
  console.log('id_connexion_ok')
  /*
  let result = _dsp_message( user, txt.ID_IDENT_SUCCESS_FEEDBACK, txt.ID_IDENT_ERROR_FEEDBACK )

  if ( result )
    _init_session( user )
  */
} )


socket.on( 'id_inscription_ok', function( event, user ) {
  /**
   * Inscription d'un nouvel utilisateur
   * @param  {Object} user
   */
  console.log('id_inscription_ok')
  /*
  let result = _dsp_message( user, txt.ID_INSC_SUCCESS_FEEDBACK, txt.ID_INSC_ERROR_FEEDBACK )

  if ( result )
    _init_session( user )
  */
} )

socket.on( 'id_new_session_ok', function( event, session ) {
  /**
   * Création d'une nouvelle session
   * @param {new Object} session informations stockées
   */
  console.log('id_new_session_ok')
  //console.log( session )
} )


socket.on( 'id_recover_ok', function( event, result ) {
  console.log('id_recover_ok')

  /*
  if ( result[ 'error' ] != undefined ) {
    if ( result[ 'error' ] == 0 )
      _dsp_message( txt.ID_RECOVER_ERR_ADDRESS, txt.ID_RECOVER_SUCCESS_FEEDBACK, txt.ID_RECOVER_ERROR_FEEDBACK )
    else
      _dsp_message( result[ 'error' ], txt.ID_RECOVER_SUCCESS_FEEDBACK, txt.ID_RECOVER_ERROR_FEEDBACK )
  } else {
    _dsp_message( result, txt.ID_RECOVER_SUCCESS_FEEDBACK, txt.ID_RECOVER_ERROR_FEEDBACK )
  }
  */
} )



var init_identif = function() {
  /**
   * Gère le formulaire d'identification ou inscription
   */

  // Affichage du formulaire
  $( "#identification" ).html( msg.HTML )

  // Gestion de la saisie
  $( "#id_form :input" ).on( 'input', {
      feedback: '#id_feedback_verif',
      button: [ '#id_bt_connexion', '#id_bt_recover' ],
      pass: false
    },
    utils.form_valid_btn );


  // Event
  $( "#id_bt_connexion" ).on( 'click', connexion )
  $( "#id_bt_inscription" ).on( 'click', inscription )
  $( "#id_bt_recover" ).on( 'click', recover )
  $( "#id_link_recover" ).on( 'click', function() {
    $( "#id_recover_label" ).toggle()
    $( "#id_bt_recover" ).toggle()
    $( "#id_bt_inscription" ).toggle()
    $( "#id_bt_connexion" ).toggle()
    $( "#id_div_mail" ).toggle()
    if ( $( this ).text() == txt.ID_RECOVER ) {
      $( this ).text( txt.ID_NO_RECOVER )
    } else {
      $( this ).text( txt.ID_RECOVER )
    }
  } )

  $( "input[name='choice_connexion']:radio" ).on( 'change', function() {
    // connexion
    if ( $( this ).val() == 1 ) {
      _set_fields( 1 )
        // inscription
    } else {
      _set_fields( 0 )
    }
  } )
}

var _set_fields = function( mode ) {

  $( "#id_bt_recover" ).hide()
  $( "#id_form :input" ).off( 'input' )
  let etat = ( mode == 1 ? true : false )
  $( "#id_bt_inscription" ).prop( 'disabled', etat )
  $( "#id_bt_connexion" ).prop( 'disabled', !etat )

  if ( mode == 1 ) {
    $( "#id_div_mail" ).hide()
    $( "#id_div_pwd" ).hide()
    $( "#id_link_recover" ).show()

    // Gestion de la saisie
    $( "#id_form :input" ).on( 'input', {
      feedback: '#id_feedback_verif',
      button: '#id_bt_connexion',
      pass: false
    }, utils.form_valid_btn );
  } else {
    $( "#id_div_mail" ).show()
    $( "#id_div_pwd" ).show()
    $( "#id_link_recover" ).hide()

    // Gestion de la saisie
    $( "#id_form :input" ).on( 'input', {
      feedback: '#id_feedback_verif',
      button: '#id_bt_inscription',
      pass: true
    }, utils.form_valid_btn );
  }
}

init_identif()