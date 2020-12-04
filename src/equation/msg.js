import { FOOTER } from "../constantes.js"
import * as txt from "./lang_fr.js"

const EQ_HTML_COEFFS_ERROR_FEEDBACK =
  "<br><div id='eq_alert_error_coeffs' class='alert alert-warning' style='display:none'>" +
  "<strong>" + txt.EQ_COEFFS_ERROR_FEEDBACK + "</strong></div>"

const EQ_HTML_COEFFS_SUCCESS_FEEDBACK =
  "<br><div id='eq_alert_success_coeffs' class='alert alert-success' style='display:none'>" +
  "<strong>" + txt.EQ_COEFFS_SUCCESS_FEEDBACK + "</strong></div>"

// Page principale
const EQ_HTML_EQUATION = "<div class='title'><h3>" + txt.EQ_EQUATION_TITRE + "</h3></div><br/>" +
  "<div class='container-fluid'><div class='row'><div class='col-lg-8'>" +
  "<p>" + txt.EQ_EQUATION_OBJECTIF + "</p>" +
  "<form id = 'eq_frm_equation' action = '#' class = 'form-horizontal' novalidate > " +
  "<div class='form-group'>" +
  "<label for='lst'>" + txt.EQ_EQUATION_ACTION + "</label>" +
  "<select class = 'form-control' id='eq_equation_select'><option></select></div></form><div id='eq_saisie_coeffs'></div>" +
  EQ_HTML_COEFFS_SUCCESS_FEEDBACK + EQ_HTML_COEFFS_ERROR_FEEDBACK +
  "</div><div class='col' id='eq_info_equation'>" + txt.EQ_IMAGE + "</div></div><div id = 'eq_exemples'></div></div>" + FOOTER



// Pages d'aide
const EQ_HTML_PRINCIPE = "<h3>" + txt.EQ_PRINCIPE_TITRE + "</h3><br/><p>" + txt.EQ_PRINCIPE_T1 + "</p>" +
  "<ul><li>" + txt.EQ_PRINCIPE_T2 + "</li><li>" + txt.EQ_PRINCIPE_T3 + "</li></ul>"

const EQ_HTML_METHODE = "<h3>" + txt.EQ_METHODE_TITRE + "</h3><br/><p>" + txt.EQ_METHODE_T1 + "</p>"

const EQ_HTML_EQUILIBRAGE = function( equilibrage_text, ) {
  return "<div data-dismiss = 'modal' class='modal fade' id='eq_equilibrage' tabindex='-1' role='dialog' aria-hidden='true'>" +
    "<div class='modal-dialog modal-lg' role='document'><div class='modal-content'><div class='modal-header'>" +
    "<h5 class='modal-title' >" + txt.EQ_EQUILIBRAGE + "</h5>" +
    "<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
    "</div><div class='modal-body'>" + equilibrage_text + "</div>" +
    "<div class='modal-footer'><button type='button' class='btn btn-secondary' data-dismiss='modal'>" + txt.EQ_BT_EQUILIBRAGE_CLOSE + "</button>" +
    "</div></div></div></div>"
}


const EQ_HTML_COEFFS = "<p>" + txt.EQ_COEFFS + "</p>"

const EQ_BT_HTML_VALIDER = "<button id='eq_bt_validEquation' type = 'button' class = 'btn btn-success' disabled >" + txt.EQ_BT_VALIDER + "</button>"

const EQ_BT_HTML_AFFICHER = "<button id='eq_bt_displayEquation' type = 'button' disabled class = 'btn btn-warning'>" + txt.EQ_BT_AFFICHER + "</button>"

const EQ_BT_HTML_PRINCIPE = "<button id='eq_bt_principeEquation' type = 'button' class = 'btn btn-info'>" + txt.EQ_BT_PRINCIPE + "</button>"

const EQ_BT_HTML_METHODE = "<button id='eq_bt_methodeEquation' type = 'button' class = 'btn btn-info'>" + txt.EQ_BT_METHODE + "</button>"

const EQ_HTML_FEEDBACK = "<div class='invalid-feedback'>" + txt.EQ_FEEDBACK + "</div>"

export {
  EQ_HTML_PRINCIPE,
  EQ_BT_HTML_AFFICHER,
  EQ_BT_HTML_METHODE,
  EQ_BT_HTML_VALIDER,
  EQ_BT_HTML_PRINCIPE,
  EQ_HTML_METHODE,
  EQ_HTML_FEEDBACK,
  EQ_HTML_EQUILIBRAGE,
  EQ_HTML_EQUATION,
  EQ_HTML_COEFFS,
  EQ_HTML_COEFFS_ERROR_FEEDBACK,
  EQ_HTML_COEFFS_SUCCESS_FEEDBACK
}