import * as txt from "./lang_fr.js"

import { FOOTER } from "../environnement/constantes.js"

const PB_ALERT_ERROR =
  "<div id='pb_alert_error' class='alert alert-danger alert-dismissible' style='display:none'>" +
  "<a href='#'' class='close' aria-label='close' onclick=$(this).parent().hide()>&times;</a>" +
  "<div id = 'pb_error'></div></div>"

const PB_ALERT_SUCCESS =
  "<div id='pb_alert_success' class='alert alert-success alert-dismissible' style='display:none'>" +
  "<a href='#'' class='close' aria-label='close' onclick=$(this).parent().hide()>&times;</a>" +
  "<div id = 'pb_success'></div></div>"

const PB_INIT = function() {
  let html = "<div class = 'container-fluid'>"

  // titre et intro
  html += "<div class='title'><h3>" + txt.PB_TITRE + "</h3></div><br/><b>" + txt.PB_INTRO + "</b>"

  // boutons de lancement
  html += "<button class = 'btn btn-primary' id = 'pb_bt_qetSimple'>" + txt.PB_BT_ADD_PBS + "</button>"
  html += "<button class = 'btn btn-warning' id = 'pb_bt_qetNormal'>" + txt.PB_BT_ADD_PBM + "</button>"
  html += "<button class = 'btn btn-danger' id = 'pb_bt_qetDifficult'>" + txt.PB_BT_ADD_PBD + "</button><hr/>"

  // conteneur pour affichage problème
  html += "<div id='pb_content' class='container-fluid'><div id = 'pb_enonce' class='zoom'></div><div id='pb_reponse'></div></div>"

  // conteneur pour l'aide
  html += "<div class='cmath font-solution' id='pb_help' class='container-fluid'></div>"

  // conteneur pour la solution
  html += "<div class='cmath font-solution' id='pb_solution' class='container-fluid'></div>"

  // messages de feedback
  html += PB_ALERT_ERROR + PB_ALERT_SUCCESS

  // boutons
  html += "<div id = 'pb_container_buttons_problem' style='display:none'>"
  html += "<div class = 'form-group row'>"
  html += "<div class = 'col-sm-2'><button class = 'btn btn-success' id='pb_bt_valid' disabled>" + txt.PB_BT_VALID + "</button></div >"
  html += "<div class = 'col-sm-2'><button class = 'btn btn-info' id='pb_bt_solution' >" + txt.PB_BT_RESULT + "</button></div>"
  html += "<div class = 'col-sm-2'><button class = 'btn btn-warning' id='pb_bt_help'>" + txt.PB_BT_HELP + "</button></div>"
  html += "</div></div>" + FOOTER
  return html
}

const PB_REPONSE = function( unite ) {
  let html = "<form id = 'pb_problem' class='form-inline' action='#'><div class = 'form-group'>"
  html += "<label for='response_problem' class=''>" + txt.PB_LABEL_REPONSE + "</label>"
  html += "<input type='text' id='pb_problem_response' class='form-control col-sm-4' length='7' "
  html += "required pattern = '^\\s*(\\d*\\.[0-9]{0,3})\\s*$|^\\s*(\\d*)\\s*$'>"
  html += "<span>  " + unite + "</span></div>"
  html += "<div><small class='form-text text-muted'>" + txt.PB_PLACEHOLDER + "</small></div>"
  html += "<div id = 'pb_problem_feedback' class = 'invalid-feedback' >" + txt.PB_FEEDBACK + "</div></form><hr/>"
  return html
}

const PB_ENONCE = function( id, niveau, context, question, img, mmol ) {
  let html_img = ''
  if ( img != 'Null' ) {
    html_img = "<img id='pb_img' width = 'auto' style='max-width:200px' class='image-fluid rounded'" +
      " src = 'src/resources/img/" + img + "' / > "
  }
  let html = "<div class='container-fluid'><div class='row'><div class='col col-lg-9' style='min-width:70%'><h4>" +
    txt.PB_NUMBER + id + " ( niveau : " + niveau + " )</h4>"
  html += context + "<b><br/>" + question + "</b><br/><br/><hr/><p class='info1'>Masses Molaires (g/mol)</p>"
  html += "<div id='pb_massesmolaires'>" + mmol + "</div></div>"
  html += "<div class='col'><a href='#' id ='pb_zoom'><img src='src/resources/img/zoom-in.png' width='50px' alt='' /></a>"
  html += html_img + "</div></div></div><hr/>"
  return html
}


export { PB_ENONCE, PB_REPONSE, PB_INIT, PB_ALERT_SUCCESS, PB_ALERT_ERROR }