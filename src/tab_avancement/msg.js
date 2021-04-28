import {FOOTER} from '../environnement/constantes.js'
import * as txt from "./lang_fr.js"

import {TB_TITRE, TB_TITRE_TABLE, TB_INIT, TB_ALERT_QI, TB_ALERT_QC, TB_ALERT_QF, TB_ALERT_QFX, TB_LABEL_QC, 
    TB_LABEL_QI, TB_LABEL_QF, TB_BT_PROGRESS, TB_BT_HELPAVANCEMENT, TB_LIMITANT, TB_BT_LIMITANT_CLOSE} from "./lang_fr.js"

const TB_HTML_INIT = "<div class='title'><h3>" + txt.TB_TITRE + "</h3></div><br/><p>" + txt.TB_INIT + "</p>"

const TB_HTML_TABLE = "<table class='table'><tr><th>"+txt.TB_TITRE_TABLE+"</th>"

const TB_HTML_ALERT_QI = "<div id='tb_alert_tab_quantite_initiale' class='alert alert-info alert-dismissible' style='display:none'>"+
    "<a href='#'' class='lclose data-hide' aria-label='close' onclick=$(this).parent().hide()>&times;</a><span class='alert'>" +
    txt.TB_ALERT_QI + "</span></div>"

const TB_HTML_ALERT_QC = 
  "<div id='tb_alert_tab_quantite_cours' class='alert alert-info alert-dismissible' style='display:none'>"+
    "<a href='#'' class='lclose' aria-label='close' onclick=$(this).parent().hide()>&times;</a><span class='alert'>" + 
    txt.TB_ALERT_QC +"</span></div>"

const TB_HTML_ALERT_QFX = 
  "<div id='tb_alert_tab_quantite_finale_x' class='alert alert-info alert-dismissible' style='display:none'>"+
    "<a href='#'' class='lclose' aria-label='close' onclick=$(this).parent().hide()>&times;</a><span class='alert'>" + 
    txt.TB_ALERT_QFX+"</span></div>"

const TB_HTML_ALERT_QF = 
  "<div id='tb_alert_tab_quantite_finale' class='alert alert-info alert-dismissible' style='display:none'>"+
    "<a href='#'' class='lclose' aria-label='close' onclick=$(this).parent().hide()>&times;</a><span class='alert'>" + 
    txt.TB_ALERT_QF +"</span></div>"

const TB_HTML_LABEL_QI = "<tr><th scope='row'>"+ txt.TB_LABEL_QI+"</th>"

const TB_HTML_LABEL_QC = "<tr><th scope='row'>"+ txt.TB_LABEL_QC+"</th>"

const TB_HTML_LABEL_QFX = "<tr><th scope='row'>"+ txt.TB_LABEL_QF+"</th>"

const TB_HTML_LABEL_QF = "<tr><th scope='row'>"+ txt.TB_LABEL_QF +"</th>"

const TB_HTML_BT_PROGRESS = "<hr><button id='tb_bt_progressAvancement' type = 'button' class = 'btn btn-success' >"+
txt.TB_BT_PROGRESS+"</button>"

const TB_HTML_BT_HELPAVANCEMENT = "<button id='tb_bt_helpAvancement' type = 'button' class = 'btn btn-info' >"+
txt.TB_BT_HELPAVANCEMENT+"</button>"


const TB_HTML_DIVINFO = "<div class='col' id='tb_info_avancement'></div></div></div><div id ='tb_limitant_exemple'></div>"

const TB_HTML_LIMITANT = function(limitant_text) {
  return "<div data-dismiss = 'modal' class='modal fade' id='tb_limitant' tabindex='-1' role='dialog' aria-hidden='true'>" +
  "<div class='modal-dialog modal-lg' role='document'><div class='modal-content'><div class='modal-header'>" +
  "<h5 class='modal-title' >" + txt.TB_LIMITANT + "</h5>" +
  "<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
  "</div><div class='modal-body'>" + limitant_text + "</div>" +
  "<div class='modal-footer'><button type='button' class='btn btn-secondary' data-dismiss='modal'>" + txt.TB_BT_LIMITANT_CLOSE+"</button>"+
  "</div></div></div></div>"}

export {TB_HTML_DIVINFO, TB_HTML_INIT, TB_HTML_LIMITANT, TB_HTML_BT_HELPAVANCEMENT,
TB_HTML_BT_PROGRESS, TB_HTML_LABEL_QI, TB_HTML_LABEL_QC, TB_HTML_LABEL_QF, TB_HTML_LABEL_QFX, TB_HTML_ALERT_QF, TB_HTML_ALERT_QFX,
TB_HTML_ALERT_QI, TB_HTML_ALERT_QC, TB_HTML_TABLE}
