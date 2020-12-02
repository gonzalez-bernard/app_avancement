import { FOOTER } from "../constantes.js"
import * as msg from "./msg.js"
import * as eq_msg from "./../equation/msg.js"
import * as eq_txt from "./../equation/lang_fr.js"
import { TB_HTML_INFO, TB_LIMITANT, TB_LIMITANT_TEXT1, TB_LIMITANT_TEXT2, TB_BT_LIMITANT_CLOSE } from "./../tab_avancement/lang_fr.js"
import { dsp_modal_info } from "../modules/utils.js"

function init_help() {

    // Affiche page
    $("#aide").html(msg.AI_HTML_PAGE)

    $("#ai_link_eq_principe").on('click', function() {
        $("#ai_info").html(eq_msg.EQ_HTML_PRINCIPE)
        $("#eq_equilibrage1").on('click', null, {
            titre: eq_txt.EQ_EQUILIBRAGE,
            info: eq_txt.EQ_EQUILIBRAGE_TEXT1,
            container: '#ai_exemples',
            btclose: eq_txt.EQ_BT_EQUILIBRAGE_CLOSE
        }, dsp_modal_info)
        $("#eq_equilibrage2").on('click', null, {
            titre: eq_txt.EQ_EQUILIBRAGE,
            info: eq_txt.EQ_EQUILIBRAGE_TEXT2,
            container: '#ai_exemples',
            btclose: eq_txt.EQ_BT_EQUILIBRAGE_CLOSE
        }, dsp_modal_info)
    })

    // Gestion des liens
    $("#ai_link_eq_methode").on('click', function() {
        $("#ai_info").html(eq_msg.EQ_HTML_METHODE)
        $("#eq_equilibrage1").on('click', null, {
            titre: eq_txt.EQ_EQUILIBRAGE,
            info: eq_txt.EQ_EQUILIBRAGE_TEXT1,
            container: '#ai_exemples',
            btclose: eq_txt.EQ_BT_EQUILIBRAGE_CLOSE
        }, dsp_modal_info)
        $("#eq_equilibrage2").on('click', null, {
            titre: eq_txt.EQ_EQUILIBRAGE,
            info: eq_txt.EQ_EQUILIBRAGE_TEXT2,
            container: '#ai_exemples',
            btclose: eq_txt.EQ_BT_EQUILIBRAGE_CLOSE
        }, dsp_modal_info)
    })

    $('#ai_link_avancement').on('click', function() {
        $("#ai_info").html(TB_HTML_INFO)
        $("#tb_tab_avancement_help1").on('click', null, {
            titre: TB_LIMITANT,
            info: TB_LIMITANT_TEXT1,
            container: '#ai_exemples',
            btclose: TB_BT_LIMITANT_CLOSE,
            math: true
        }, dsp_modal_info)
        $("#tb_tab_avancement_help2").on('click', null, {
            titre: TB_LIMITANT,
            info: TB_LIMITANT_TEXT2,
            container: '#ai_exemples',
            btclose: TB_BT_LIMITANT_CLOSE,
            math: true
        }, dsp_modal_info)
    })
}

init_help()
