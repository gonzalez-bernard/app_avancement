var cts = require( "../constantes.js" )
var txt = require( "./lang_" + cts.SUFFIXE_LANG + ".js" )

const ID_HTML_ERROR_FEEDBACK = "<br><div id='id_alert_error' class='alert alert-danger' style='display:none'>" +
  "<strong>" + txt.ID_ERROR_FEEDBACK + "</strong></div>"

const ID_HTML_SUCCESS_FEEDBACK = "<br><div id='id_alert_success' class='alert alert-success' style='display:none'>" +
  "<strong>" + txt.ID_SUCCESS_FEEDBACK + "</strong></div>"

const ID_HTML_CONNEXION = "<fieldset class='unite-border'><legend class='unite-border'>" + txt.ID_CONN_TITRE + "</legend>" +
  "<label class='radio-inline'><input type='radio'  name='choice_connexion' value=1 checked>" +
  txt.ID_CONN_LABEL_IDENT + "</label>" +
  "<label class='radio-inline'><input type='radio' name='choice_connexion' value=2>" +
  txt.ID_CONN_LABEL_INSC + "</label></fieldset><br/>"

const ID_HTML_MAIL_MESSAGE = "<h4>" + txt.ID_MAIL_TITLE + "</h4><br/><p>" + txt.ID_MAIL_MESSAGE_1 + "</p><p>" +
  txt.ID_MAIL_MESSAGE_2 + "</p><p>" + txt.ID_MAIL_MESSAGE_3 + "</p><p>" + txt.ID_MAIL_MESSAGE_4

const ID_REG_PWD = "^(\\S{6,15})$" // n'importe quel caractères
  //const ID_REG_PWD_AN = "^(?=.{4,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$" // lettre et chiffre

let HTML = "<div class='title'><h3>" + txt.ID_TITRE + "</h3></div><br/>" +
  "<p>" + txt.ID_INFO + "</p>" + ID_HTML_CONNEXION +
  "<form id = 'id_form' action = '#' class = 'form-horizontal' novalidate ><div class = 'form-group row' >" +

  "<label for = 'id_nom' class = 'control-label col-sm-3 col-form-label' >" + txt.ID_LABEL_NOM + "</label>" +
  "<div class = 'col-sm-3' >" +
  "<input type = 'text' value='tototo' id = 'id_nom' class = 'form-control' placeholder = " + txt.ID_HOLDER_NOM +
  " required pattern = '[A-Za-z ]{6,}' >" +
  "<div class = 'invalid-feedback' >" + txt.ID_FEEDBACK_NOM + "</div > </div > </div >" +

  "<div class = 'form-group row' >" +
  "<label for = 'id_pwd' class = 'control-label col-sm-3 col-form-label' >" + txt.ID_LABEL_PASS + "</label>" +
  "<div class = 'col-sm-3'>" +
  "<input type = 'password' value='Aazer1' id = 'id_pwd' class = 'form-control' placeholder = " + txt.ID_HOLDER_PWD +
  " required pattern = " + ID_REG_PWD + " >" +
  "<div id = 'id_feedback' class = 'invalid-feedback' >" + txt.ID_FEEDBACK_PASS + "</div > </div > </div>" +

  "<div class = 'form-group row' ><div class = 'col-sm-4'>" +
  "<p><a href='#' id='id_link_recover'>" + txt.ID_RECOVER + "</a></p></div></div>" +

  "<div id='id_recover_label' class = 'form-group row' style='display:none'><div class = 'col-sm-5'>" +
  "<p>" + txt.ID_RECOVER_LABEL + "</p></div></div>" +

  "<div id='id_div_pwd' class = 'form-group row' style='display:none'>" +
  "<label for = 'id_verif_pwd_' class = 'control-label col-sm-3 col-form-label'>" + txt.ID_LABEL_VERIF_PASS + " </label>" +
  "<div class = 'col-sm-3' >" +
  "<input type = 'password' value='Aazer1' id = 'id_verif_pwd_' class = 'form-control' " +
  " required pattern = " + ID_REG_PWD + " >" +
  "<div id = 'id_feedback_verif' class = 'invalid-feedback' >" + txt.ID_FEEDBACK_PASS + "</div> </div> </div>" +

  "<div id = 'id_div_mail' class = 'form-group row' style='display:none'>" +
  "<label for = 'id_mail' class = 'control-label col-sm-3 col-form-label'>" + txt.ID_MAIL_LABEL + " </label>" +
  "<div class = 'col-sm-3' >" +
  "<input type = 'text' value='gonzalez.b@free.fr' id = 'id_mail' class = 'form-control' " +
  "required pattern = '^([\\w\\.-]+)@((?:[\\w]+\\.)+)([a-zA-Z]{2,4})$' >" +
  "<div id = 'id_mail_feedback' class = 'invalid-feedback' >" + txt.ID_MAIL_FEEDBACK + "</div> </div> </div>" +

  "<button id = 'id_bt_connexion' type = 'button' class = 'btn btn-success'  >" + txt.ID_BT_VALID + "</button>" +
  "<button id = 'id_bt_inscription' type = 'button' class = 'btn btn-primary' disabled>" + txt.ID_BT_INSCRIPTION + "</button>" +
  "<button id = 'id_bt_recover' type = 'button' class = 'btn btn-primary' style='display:none' disabled>" + txt.ID_BT_RECOVER + "</button>" +

  ID_HTML_SUCCESS_FEEDBACK + ID_HTML_ERROR_FEEDBACK + "</form>" + cts.FOOTER

module.exports = { HTML, ID_HTML_MAIL_MESSAGE }