/*
Fonctions :
- getEquations : Appel à Python pour récupérer liste des équations
- selectEquation : Action sur selection d'une equation
- verif_coeffs : Vérifications des coefficients 
- display_coeffs : Affiche les coefficients : 
- dsp_equilibrage : Affiche les méthodes d'équilibrage des équations dans une fenêtre modale
- set_lstEquations : remplit la liste de sélection
 */

//const ipc = require( 'electron' ).ipcRenderer
import {dsp_modal_info, form_valid_btn, form_set_select_options} from "./../modules/utils.js"

import * as msg from "./msg.js"

import {EQ_HTML_PRINCIPE, EQ_BT_HTML_AFFICHER, EQ_BT_HTML_METHODE, EQ_BT_HTML_VALIDER, EQ_BT_HTML_PRINCIPE, EQ_HTML_METHODE, 
  EQ_HTML_FEEDBACK, EQ_HTML_EQUILIBRAGE, EQ_HTML_EQUATION, EQ_HTML_COEFFS, EQ_HTML_COEFFS_ERROR_FEEDBACK, 
  EQ_HTML_COEFFS_SUCCESS_FEEDBACK} from "./msg.js"

import {FOOTER} from "../environnement/constantes.js"
import {EQ_COEFFS_SUCCESS_FEEDBACK, EQ_COEFFS, EQ_FEEDBACK, EQ_EQUILIBRAGE, EQ_EQUILIBRAGE_TEXT1, EQ_EQUILIBRAGE_TEXT2, 
  EQ_BT_EQUILIBRAGE_CLOSE, EQ_LABEL_SELECT, EQ_COEFFS_SUCCESS_FEEDBACK_} from "./lang_fr.js"

import {init_avancement} from  '../avancement/avancement_ui.js'

//var socket = io();
var current_equation
var eq_num_test = 0 // nombre de test
var socket = io()

// Appel au serveur pour récupérer liste des équations
let getEquations = function() {
  socket.emit('getEquations', '')
}

// Action sur selection d'une equation
let selectEquation = function() {

  // enregistrement équation
  let id = this.selectedOptions[ 0 ].value
  sessionStorage.setItem( "equation_id", id )
  sessionStorage.setItem( "equation_text", this.selectedOptions[ 0 ].text )

  function _saisie_coeffs_ui( id ) {

    current_equation = JSON.parse( JSON.parse( sessionStorage.lst_equations )[ id ] )
    let reactifs = current_equation.reactifs
    let produits = current_equation.produits
    let html = msg.EQ_HTML_COEFFS + "<form id='eq_get_coeffs' class = 'form-inline'>"

    // affiche saisie coefficients
    for ( let i = 0; i < reactifs.length; i++ ) {
      html += "<div><input type='number' id = 'eq_react" + i + "'  min=1 max=9  maxlength=1 class = 'form-control form-coeffs' " +
        "required pattern = '[1-9]{1}'>"
      html += msg.EQ_HTML_FEEDBACK + "</div>"
      html += reactifs[ i ][ 0 ] + " + "
    }
    html = html.substring( 0, html.length - 2 ) + "  \u2192  "
    for ( let i = 0; i < produits.length; i++ ) {
      html += "<div><input type='number' id = 'eq_prod" + i + "' min=1 max=9  maxlength=1 class = 'form-control form-coeffs' " +
        "required pattern = '[1-9]{1}'>"
      html += msg.EQ_HTML_FEEDBACK + "</div>"
      html += produits[ i ][ 0 ] + " + "
    }
    html = html.substring( 0, html.length - 2 )
    html += "</div><hr/></form>"

    // affiche boutons
    html += "<div><hr/>" + EQ_BT_HTML_VALIDER + EQ_BT_HTML_AFFICHER + EQ_BT_HTML_PRINCIPE + EQ_BT_HTML_METHODE
    html += "</div></div></div></div>"

    // affichage de l'équation de saisie
    $( "#eq_saisie_coeffs" ).html( html )

    $( "#eq_get_coeffs input[type=number]" ).on( 'input', {
        feedback: '#eq_feedback_verif',
        button: '#eq_bt_validEquation',
        mark: false,
        pass: false
      },
      form_valid_btn );

    // Déclarations des events
    $( "#eq_bt_validEquation" ).on( 'click', verif_coeffs )
    $( "#eq_bt_displayEquation" ).on( 'click', display_coeffs )
    $( "#eq_bt_principeEquation" ).on( 'click', function() {
      $( "#eq_info_equation" ).html( msg.EQ_HTML_PRINCIPE )
    } )
    $( "#eq_bt_methodeEquation" ).on( 'click', function() {
      $( "#eq_info_equation" ).html( msg.EQ_HTML_METHODE )
      $( "#eq_equilibrage1" ).on( 'click', null, {
        titre: EQ_EQUILIBRAGE,
        info: EQ_EQUILIBRAGE_TEXT1,
        container: '#eq_exemples',
        btclose: EQ_BT_EQUILIBRAGE_CLOSE
      }, dsp_modal_info )

      $( "#eq_equilibrage2" ).on( 'click', null, {
        titre: EQ_EQUILIBRAGE,
        info: EQ_EQUILIBRAGE_TEXT2,
        container: '#eq_exemples',
        btclose: EQ_BT_EQUILIBRAGE_CLOSE
      }, dsp_modal_info )
    } )

  }
  // creation interface saisie coeffs
  _saisie_coeffs_ui( id )

  // donne le focus
  $( "#eq_react0" ).focus()
}

// Vérifications des coefficients
let verif_coeffs = function() {

  // appel fonction de vérification
  let r = _verif_coeffs()

  if ( !r ) {
    // si erreur
    let elt = $( "#eq_alert_error_coeffs" )
    elt.fadeTo( 2000, 500 ).slideUp( 500, function() {
      elt.alert( 'hide' )
    } )
    eq_num_test += 1
    $( "#eq_react0" ).focus()
    if ( eq_num_test == 3 ) {
      $( "#eq_bt_displayEquation" ).prop( 'disabled', false )
    }

  } else {
    // si succes
    let elt = $( "#eq_alert_success_coeffs" )
    if ( eq_num_test == 3 ) {
      elt.html( EQ_COEFFS_SUCCESS_FEEDBACK_ )
      eq_num_test = 0
    } else
      elt.html( EQ_COEFFS_SUCCESS_FEEDBACK )

    elt.fadeTo( 1000, 500 ).slideUp( 500, function() {
      elt.alert( 'hide' )
      $( "#equation" ).removeClass( 'active show' )
      $( "#mnu_equation" ).removeClass( 'active' )
      $( "#avancement" ).addClass( 'active show' )
      $( "#mnu_avancement" ).removeClass( 'disabled disabledTab' )
      $( "#mnu_avancement" ).addClass( 'active' )

      // Initialise fenêtre avancement
      init_avancement()
    } )
  }

  // Vérifie les coefficients
  function _verif_coeffs() {
    let r = true
    $( "#eq_get_coeffs input[type=number]" ).each( function( index ) {
      if ( $( this )[ 0 ].value != current_equation.coeffs[ index ] )
        r = false
    } )
    return r
  }
}

// Affiche les coefficients
let display_coeffs = function() {
  let coeffs = current_equation.coeffs
  $( "#eq_get_coeffs input[type=number]" ).each( function( index ) {
    $( this )[ 0 ].value = coeffs[ index ]
  } )

  // active le bouton de validation
  $( "#eq_bt_validEquation" ).attr( 'disabled', false )
}

// Remplit la liste de sélection des équations
let set_lstEquations = function( data ) {
  let lst_equations = data
  sessionStorage.setItem( "lst_equations", JSON.stringify( lst_equations ) )

  // construit la liste d'options
  let lst = []
  let counter = 0
  lst_equations.forEach( function( item ) {
    let eq = JSON.parse( item )
    let x = { 'label': eq[ 'equation_non_equilibree' ], 'value': counter }
    lst.push( x )
    counter++
  } )

  // ajoute les options à la liste
  let list = form_set_select_options( EQ_LABEL_SELECT, 'eq_equation_select', lst )

  // insère dans le DOM
  $( "#eq_equation_select" ).html( list )
}

// Initialisation de la liste des équations
socket.on( 'getEspeces_ok', function(data ) {
  set_lstEquations( data )
} )


var init_equation = function() {
  // Affiche contenu
  $( "#equation" ).html( msg.EQ_HTML_EQUATION )

  // remplit la liste
  getEquations()

  // event sur selection d'une équation
  $( "#eq_equation_select" ).on( 'change', selectEquation )
}

export {init_equation}