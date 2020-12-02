/*
FONCTIONS :
-init_tableau : initialisation
 */
import {FOOTER} from '../constantes.js'

import {TB_TITRE, TB_ALERT_QF, TB_ALERT_QFX, TB_BT_PROGRESS, TB_BT_HELPAVANCEMENT, TB_HTML_INFO, TB_LIMITANT_TEXT1, 
  TB_LIMITANT_TEXT2, TB_LIMITANT, TB_BT_LIMITANT_CLOSE} from "./lang_fr.js"

import * as msg from "./msg.js"

import {dsp_modal_info} from "./../modules/utils.js"

// Initialise le tableau
var init_tableau = function() {
  let eq = JSON.parse( sessionStorage.equation )

  // Activation des onglets
  $( "#tab_avancement" ).addClass( 'active show' )
  $( "#mnu_tab_avancement" ).removeClass( 'disabled disabledTab' )
  $( "#mnu_tab_avancement" ).addClass( 'nav-link active' )
  $( "#mnu_avancement" ).removeClass( 'active' )

  $( "#avancement" ).removeClass( 'active show' )
  $( "#mnu_evolution" ).removeClass( 'disabled disabledTab' )

  // Construction et affichage
  _dsp_tab()

  // events
  var show_index = 0
  $( "#tb_bt_progressAvancement" ).on( 'click', _show_tab )
  $( '#tb_bt_helpAvancement' ).on( 'click', function() {
    $( "#tb_info_avancement" ).html( TB_HTML_INFO )
    $( "#tb_tab_avancement_help1" ).on( 'click', null, {
      titre: TB_LIMITANT,
      info: TB_LIMITANT_TEXT1,
      container: '#tb_limitant_exemple',
      btclose: TB_BT_LIMITANT_CLOSE,
      math: true
    }, dsp_modal_info )
    $( "#tb_tab_avancement_help2" ).on( 'click', null, {
      titre: TB_LIMITANT,
      info: TB_LIMITANT_TEXT2,
      container: '#tb_limitant_exemple',
      btclose: TB_BT_LIMITANT_CLOSE,
      math: true
    }, dsp_modal_info )
  } )

  function _dsp_tab() {
    // affiche intro et titre équation
    let html = "<div class='container-fluid'><div class='row'><div class='col-lg-auto'>" + msg.TB_HTML_INIT + msg.TB_HTML_TABLE

    // affiche équation
    for ( let i = 0; i < eq.reactifs.length; i++ ) {
      html += "<th scope='col' >" + eq.coeffs[ i ] + " " + eq.reactifs[ i ][ 0 ] + "</th><th>+</th>"
    }
    html = html.substring( 0, html.length - 6 ) + "</th><th>\u2192  </th><th>"

    for ( let i = 0; i < eq.produits.length; i++ ) {
      html += "<th scope = 'col'>" + eq.coeffs[ i + eq.reactifs.length ] + " " + eq.produits[ i ][ 0 ] + "</th><th>+</th>"
    }
    html = html.substring( 0, html.length - 6 )

    // affiche en-tête ligne
    html += msg.TB_HTML_LABEL_QI + _set_html( 'tab_q' ) + "</tr>" + msg.TB_HTML_LABEL_QC + _set_html( 'tab_qc' ) + "</tr>"
    html += msg.TB_HTML_LABEL_QFX + _set_html( 'tab_qfx' ) + "</tr>" + msg.TB_HTML_LABEL_QF + _set_html( 'tab_qf' ) + "</tr></table>"

    html += msg.TB_HTML_BT_PROGRESS + msg.TB_HTML_BT_HELPAVANCEMENT + msg.TB_HTML_ALERT_QI + msg.TB_HTML_ALERT_QC +
      msg.TB_HTML_ALERT_QFX + msg.TB_HTML_ALERT_QF + "</div><div class='col' id='tb_info_avancement'>" +
      "</div></div><div id ='tb_limitant_exemple'></div>" + FOOTER

    $( '#tab_avancement' ).html( html )

    // crée les lignes du tableau
    function _set_html( id ) {
      let _html = ""
      for ( let i = 0; i < eq.reactifs.length; i++ ) {
        _html += "<td id='" + id + i + "'></td><td></td>"
      }
      _html += "<td></td><td></td>"
      for ( let i = eq.reactifs.length; i < eq.reactifs.length + eq.produits.length; i++ ) {
        _html += "<td id='" + id + i + "'></td><td></td>"
      }
      return _html
    }
  }

  // affiche les valeurs et les messages d'alerte
  function _show_tab() {

    switch ( show_index ) {
      case 0:
        // affiche ligne quantité initiales
        $( "#tb_alert_tab_quantite_initiale" ).show().alert()
        for ( let i = 0; i < eq.coeffs.length; i++ ) {
          $( "#tab_q" + i ).html( eq.quantites[ i ] )
        }
        show_index++
        break;

      case 1:
        // affiche ligne quantité en cours
        $( "#tb_alert_tab_quantite_cours" ).show().alert()

        for ( let i = 0; i < eq.reactifs.length; i++ ) {
          $( "#tab_qc" + i ).html( eq.quantites[ i ].toString() + "- <span class='red'>" + eq.coeffs[ i ] + "</span>x" )
        }
        for ( let i = 0; i < eq.produits.length; i++ ) {
          let j = i + eq.reactifs.length
          $( "#tab_qc" + j ).html( eq.quantites[ j ].toString() + "+ <span class='red'>" + eq.coeffs[ j ] + "</span>x" )
        }
        show_index++
        break;

      case 2:
        // affiche ligne quantité finales
        $( "#tb_alert_tab_quantite_finale_x" ).show().alert()
        for ( let i = 0; i < eq.reactifs.length; i++ ) {
          $( "#tab_qfx" + i ).html( eq.quantites[ i ].toString() + "- <span class='red'>" + eq.coeffs[ i ] + "</span>x<sub>max</sub>" )
        }
        for ( let i = 0; i < eq.produits.length; i++ ) {
          let j = i + eq.reactifs.length
          $( "#tab_qfx" + j ).html( eq.quantites[ j ].toString() + "+ <span class='red'>" + eq.coeffs[ j ] + "</span>x<sub>max</sub>" )
        }
        show_index++
        break;

      case 3:
        $( "#tb_alert_tab_quantite_finale" ).show().alert()
        for ( let i = 0; i < eq.coeffs.length; i++ ) {
          $( "#tab_qf" + i ).html( eq.avancement.reste_mol[ i ] )
        }
        show_index = 0
    }
  }
}

export {init_tableau}
