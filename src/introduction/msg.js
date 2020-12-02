import {FOOTER, SUFFIXE_LANG} from "../constantes.js"

var path_lang = "./lang_" + SUFFIXE_LANG + ".js";
import * as txt from "./lang_fr.js"


let HTML = "<div class='title'><h3>" + txt.IN_TITRE + "</h3></div><br/>"
HTML += "<div class = 'container-fluid'><div class = 'row'><div class = 'col-8'>"
HTML += "<p>" + txt.IN_INTRO + "</p><p>" + txt.IN_INTRO_1 + "</p><ul>"
HTML += "<li>" + txt.IN_ITEM_2 + "</li><li>" + txt.IN_ITEM_4 + "</li></ul>"
HTML += "<p>" + txt.IN_INTRO_2 + "</p><ul><li>" + txt.IN_ITEM_1 + "</li><li>" + txt.IN_ITEM_3 + "</li></ul><hr/>"

HTML += "<button class = 'btn btn-primary' id='in_bt_run'>" + txt.IN_BT_RUN + "</button><hr/>"

HTML += "</div><div class='col'><img width = '100%' style='max-height:300px' class='image-fluid rounded'" + 
    "src='./src/resources/img/combustion.jpg' alt=''></div></div></div>"
HTML += FOOTER

export {HTML}