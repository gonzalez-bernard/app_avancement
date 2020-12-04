/**
PRINCIPE
  Le programme choisit une question au hasard.
  Chaque question contient plusieurs variables qui peuvent être l'équation, les quantités de matière ou les masses.
  L'équation est piochée dans la base.
  A partir de la question, on extrait les variables à générer (quantités ou masses) et les données à chercher.
  Légende : 
  - équation : #eqn, n étant l'indice de l'équation  
  - réactifs : #r0, #r1, ...,
  - produits : #p0, #p1,...,
  - les quantités de matière sont préfixés par n : #nr0..., #np0...
  - les masses sont préfixées par m : #mr0..., #mp0...
  - les volumes sont préfixés par v : #vr0..., #vp0...
  - les coefficients obtenus grâce à l'équation : #cr0..., #cp0...
  - réponse à fournir #X

  Le format est de xml
  <problems>
    <problem>
      <id>1</id>
      <level>1</level>
      <context>.....</context>
      <question>....</question>
      <response>....</response>
      <feedback>....</feedback>
      <calcul>....</calcul>
    </problem>

  Les calculs s'effectuent grâce aux formules fournies dans la partie calcul 
  ex : #X=#nr0*#cr1/#cr0

FONCTIONS

  - get_problems : lit le fichier et enregistre les problémes
  - get_problem : extrait un problème
  - get_equation : extrait l'équation à partir de la lecture du problème
  - get_data : définit les variables de façon aléatoire
  - calcData : effectue les calculs définis dans l'item calcul
  - dspProblem : affiche le contexte et la question
  - dspResponse : affiche la saisie
  - verifResponse : vérifie la réponse
  - dspFeedback : affiche le feedback 

**/

import * as msg from "./msg.js"
import { form_valid_btn, math_arrondir, dsp_html_latex } from "./../modules/utils.js"

var indice // N° de l'équation
var valeur // valeur de retour à chercher
var precision // précision (retourné par get_problème)
var feedback
var n_essais = 0 // nombre d'essais
var nb_essais = 0
var feedback
var help
var solution
var xmax

var init_problem = function() {

  // Lance le process de récupération des problèmes
  var get_problem = function( event ) {
    // efface le conteneur
    $( "#pb_solution" ).html( '' )
    $( "#pb_help" ).html( '' )

    if ( event.data )
      socket.emit( "dspProblem", event.data.indice )
    else
      socket.emit( "dspProblem", {} )

    // Affiche le problème et enregistre les problèmes dans session
    socket.on( "dspProblem_ok", function( data ) {

      // Remplace les informations de formatage entre crochets [...] par <...>
      for ( let key in data ) {
        if ( typeof data[ key ] == 'string' ) {
          data[ key ] = data[ key ].replaceAll( '[', '<' )
          data[ key ] = data[ key ].replaceAll( ']', '>' )
        }
      }

      // récupère données équation
      let lst_equations = JSON.parse( sessionStorage.lst_equations )
      let mmol = ""
      let eq = JSON.parse( lst_equations[ data[ 'id_eq' ] ] )
      let indice = 0
      let r, m
      for ( let key in eq.reactifs ) {
        r = eq.reactifs[ key ][ 0 ].toString()
        m = eq.massesmolaires[ indice++ ]
        r = r.substring( 0, r.lastIndexOf( "(" ) )
        mmol += "<span class='mmol'>" + r + " : " + m.toString() + "</span>"
      }
      for ( let key in eq.produits ) {
        r = eq.produits[ key ][ 0 ].toString()
        m = eq.massesmolaires[ indice++ ]
        mmol += "<span class='mmol'>" + r.substring( 0, r.lastIndexOf( "(" ) ) + " : " + m.toString() + "</span>"
      }
      console.log( mmol )
        //mmol = mmol.substring( 0, mmol.length - 3 )

      // initialise l'affichage du problème
      let html = msg.PB_ENONCE( data[ 'id' ], data[ 'niveau' ],
        data[ 'context' ], data[ 'question' ], data[
          'img' ], mmol )
      $( "#pb_enonce" ).html( html )

      html = msg.PB_REPONSE( data[ 'unite' ] )
      $( "#pb_reponse" ).html( html )

      $( "#pb_container_buttons_problem" ).show()
      valeur = data[ 'valeur' ]

      sessionStorage.setItem( 'problem', JSON.stringify( data ) )
      feedback = data[ 'feedback' ]
      let help = data[ 'help' ]
      solution = data[ 'solution' ]
      nb_essais = feedback.length - 1
      precision = data[ 'precision' ]
      let xmax = data[ 'xmax' ]
      let lim = data[ 'lim' ]

      $( '#pb_bt_help' ).on( 'click', { html: help, target: '#pb_help' },
        dsp_info )
      $( '#pb_bt_solution' ).on( 'click', {
        html: solution,
        target: '#pb_solution'
      }, dsp_info )
      $( '#pb_zoom' ).on( 'click', zoom_in )
      $( "#pb_img" ).hover( zoom_img_on, zoom_img_out )

      $( "#pb_problem" ).on( 'input', {
        feedback: '#pb_problem_feedback',
        button: '#pb_bt_valid',
        pass: false
      }, form_valid_btn );
    } )
  }

  // Vérifie la saisie
  var valid_problem = function() {

    // On arrondit la valeur en tenant compte du nombre de CS (precision)
    let valeur_arrondi = math_arrondir( valeur, precision )
    let reponse = parseFloat( $( "#pb_problem_response" ).val() ).toFixed( 2 )
    let r = Math.abs( reponse - valeur_arrondi )
    if ( r < valeur / 100 ) {
      dsp_message( true )
    } else if ( r < valeur / 10 )
      dsp_message( false, 1 )
    else {
      n_essais++ // incrémente le nombre d'essais
      if ( n_essais == nb_essais ) {
        $( "#pb_bt_result_problem" ).attr( 'disabled', false )
      }
      dsp_message( false, 2 )
    }
  }

  // Affiche les messages en cas de succés ou d'erreur
  var dsp_message = function( result, mode = 0 ) {
    let id

    if ( result ) {
      id = "#pb_alert_success"
      let msg = feedback[ 0 ][ '#text' ]
      $( "#pb_success" ).html( msg )
    } else {
      id = "#pb_alert_error"
      let msg = feedback[ mode ][ '#text' ]
      $( "#pb_error" ).html( msg )
    }

    $( id ).show().alert()
  }

  // Affiche la solution ou l'aide
  var dsp_info = function( event ) {

    // Efface contenu précédent
    if ( event.data[ 'target' ] == "#pb_help" ) {
      $( "#pb_solution" ).html( '' )
    } else {
      $( "#pb_help" ).html( '' )
    }

    let html = event.data[ 'html' ] + "<hr/>"
    dsp_html_latex( html, event.data[ 'target' ] )
  }

  var zoom_in = function( event ) {
    let img = event.currentTarget.children[ 0 ]
    if ( img.src.indexOf( 'zoom-in' ) == -1 ) {
      img.src = 'src/resources/img/zoom-in.png'
      $( "#pb_img" ).css( "transform", "scale(1)" )
      $( '#pb_enonce' ).animate( { 'zoom': 1 }, 400 )
    } else {
      img.src = 'src/resources/img/zoom-out.png'
      $( "#pb_img" ).css( "transform", "scale(0.5)" )
      $( '#pb_enonce' ).animate( { 'zoom': 2 }, 100 )
    }
  }

  var zoom_img_on = function( event ) {
    $( "#pb_img" ).css( "transform", "scale(1.5)" )
  }

  var zoom_img_out = function( event ) {
    $( "#pb_img" ).css( "transform", "scale(1)" )
  }



  $( "#problem" ).html( msg.PB_INIT() )
  $( '#pb_bt_qetSimple' ).on( 'click', { indice: 1 }, get_problem )
  $( '#pb_bt_qetNormal' ).on( 'click', { indice: 2 }, get_problem )
  $( '#pb_bt_qetDifficult' ).on( 'click', { indice: 3 }, get_problem )
  $( '#pb_bt_valid' ).on( 'click', valid_problem )
}

export { init_problem }