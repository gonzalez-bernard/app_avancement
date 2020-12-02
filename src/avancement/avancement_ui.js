/*
FONCTIONS :
- init_avancement : affichage équation
- set_quantite : met à jour les quantités. Appel du script python
- 
 */
//const ipc = require( 'electron' ).ipcRenderer
import { form_valid_btn, get_decimal} from "./../modules/utils.js"

import * as msg from "./msg.js"

import { FOOTER } from '../constantes.js'

import { AV_BT_TAB, AV_TITRE, AV_TXT_LIMITANT, AV_TXT_XMAX, AV_TXT_RESTE } from "./lang_fr.js"

import { init_tableau} from "./../tab_avancement/tab_ui.js"

import { init_evolution} from "./../evolution/evolution_ui.js"

var current_equation


// affichage équation et les champs de saisie
// calcul les masses molaires
// met à jour les quantités
var init_avancement = function() {

    // récupère l'équation
    current_equation = JSON.parse(JSON.parse(sessionStorage.lst_equations)[
        sessionStorage.equation_id])

    // Enregistre pour la première fois l'équation
    sessionStorage.setItem('equation', JSON.stringify(current_equation))

    // Contenu html
    let html = msg.AV_HTML_INTRO + "<div class='equation'>"

    // affiche l'équation avec les coefficients
    html += current_equation.equation_equilibree + "</div>"

    // affiche des informations
    html += msg.AV_HTML_INFO

    html += "<div><form  id='av_get_quantite'><div class='form-group'>"

    // Affiche bouton radio pour choix de l'unité
    html += msg.AV_HTML_UNITE

    // affiche l'équation avec des champs de saisie
    let html_table = "<table class='table'><thead class='thead-light'><tr>"
    html_table += msg.AV_HTML_TITRE

    for (let i = 0; i < current_equation.reactifs.length; i++) {
        html_table += msg.AV_INIT_TAB_REACTIF(current_equation, i)
    }

    for (let i = 0; i < current_equation.produits.length; i++) {
        html_table += msg.AV_INIT_TAB_PRODUIT(current_equation, i)
    }
    html_table += "</table></div></form></div>" + msg.AV_HTML_BUTTONS +
        "<div id='info'></div>"

    html += html_table + FOOTER

    // Affichage global
    $("#avancement").html(html);

    // donne focus
    $("#av_reac0").focus()

    // gestion de la saisie, met à jour les masses
    $("#av_get_quantite input[type=text]").on('input', {
            feedback: '#av_feedback_verif',
            button: '#av_bt_quantite',
            mark: true,
            pass: false,
            callback: {
                fct: set_masses,
                data: JSON.stringify({
                    id: "#av_get_quantite input[type=text]",
                    id_unite: "input[type=radio]:checked"
                })
            }
        },
        form_valid_btn);

    // Choix de l'unité
    $("input[name='choice_unites']:radio").on('change', function() {
        let val = $(this).val() == 2
        for (var i = 0; i < current_equation.reactifs.length; i++) {
            $("#av_reac" + i).prop('disabled', val)
            $("#av_reacg" + i).prop('disabled', !val)
        }
        for (let i = 0; i < current_equation.produits.length; i++) {
            $("#av_prod" + i).prop('disabled', val)
            $("#av_prodg" + i).prop('disabled', !val)
        }
    })

    // Lance le calcul des quantités
    $("#av_bt_quantite").on("click", set_quantite);

    // lance l'initialisation du tableau d'avancement et du graph
    $("#av_bt_tab_avancement").on("click", function() {

        // tableau avancement
        init_tableau()

        // graph
        init_evolution()
    })
}

// met à jour les quantités. Appel du script python
let set_quantite = function() {

    // met à jour les quantités avec les valeurs choisies
    let quantite = Array()
    if ($('input[name="choice_unites"]:checked').val() == 1) {
        $("#av_get_quantite input[name=mol]").each(function() {
            quantite.push(parseFloat($(this).val()))
        })
    } else {
        $("#av_get_quantite input[name=gramme]").each(function() {
            quantite.push(parseFloat($(this).val()))
        })
    }

    current_equation.quantites = quantite

    // unité 1 : mol 2 : gramme
    let unite = $('input[name=choice_unites]:checked').val();
    current_equation.unite = parseInt(unite)

    // enregistre l'équation
    sessionStorage.setItem('equation', JSON.stringify(current_equation))

    // Appel de la fonction python pour calcul avancement
    let infos = {}
    infos['func'] = "calc_avancement"
    infos['datas'] = {}
    infos['datas']['equation'] = current_equation
    socket.emit("calcAvancement", infos)

    // Active le bouton bt_tab
    $("#av_bt_tab_avancement").attr('disabled', false)
}

// met à jour les champs en tenant compte des masses molaires
let set_masses = function(data) {
    data = JSON.parse(data)
    // récupère données
    let reacs = current_equation.reactifs
    let masses = current_equation.massesmolaires
    let unite = $(data['id_unite']).val()

    // si quantité en mol
    if (unite == 1) {
        _set_masses(masses, "#av_reac", "#av_reacg", unite, 0)
        _set_masses(masses, "#av_prod", "#av_prodg", unite, reacs.length)
    } else {
        _set_masses(masses, "#av_reacg", "#av_reac", unite, 0)
        _set_masses(masses, "#av_prodg", "#av_prod", unite, reacs.length)
    }

    function _set_masses(masses, rs, rd, unite, offset) {
        let precision
        if (unite == 1) {
            for (let i = 0; i < rs.length; i++) {
                let value = parseFloat($(rs + i).val())*masses[i + offset]
                precision = get_decimal(value)
                value = value.toFixed(precision)
                $(rd + i).val(value)
            }
        } else {
            for (let i = 0; i < rs.length; i++) {
                let value = parseFloat($(rs + i).val()) / masses[i + offset]
                precision = get_decimal(value)
                value = value.toFixed(precision)
                $(rd + i).val(value)
            }
        }
    }
}

// enregistrement masses molaire dans session
let store_masses_molaires = function(data) {
    current_equation.massesmolaires = data
    sessionStorage.setItem('equation', JSON.stringify(current_equation))
}

// Affichage
let dsp_avancement = function(data) {
    let av = data.avancement
    let info = "<ul><li class='info'>" + AV_TXT_LIMITANT + av.reactif_limitant +
        "</li>"
    info += "<li class='info'>" + AV_TXT_XMAX + av.xmax + "</li>"
    info += "<li class='info'>" + AV_TXT_RESTE + "</li></ul>"
    let qm = av.reste_mol

    //equation = JSON.parse(sessionStorage.equation)
    let reactifs = current_equation.reactifs
    let produits = current_equation.produits
    let masses = current_equation.massesmolaires
    let precision
    for (let i = 0; i < reactifs.length; i++) {
        precision = get_decimal(qm[i])
        $("#qr" + i).html(qm[i].toFixed(precision))
        precision = get_decimal(qm[i]* masses[i])
        $("#qrg" + i).html((qm[i] * masses[i]).toFixed(precision))
    }
    for (let i = 0; i < produits.length; i++) {
        precision = get_decimal(qm[i + reactifs.length])
        $("#qp" + i).html(qm[i + reactifs.length].toFixed(precision))
        precision = get_decimal(qm[i + reactifs.length] * masses[i + reactifs.length])
        $("#qpg" + i).html((qm[i + reactifs.length] * masses[i + reactifs.length])
            .toFixed(precision))
    }
    $("#info").html(info)
}

// avancement calculé, affichage des infos et prépare l'interface tableau avancement
socket.on('calc_avancement_ok', function(data) {
    dsp_avancement(data)
    sessionStorage.setItem('equation', JSON.stringify(data))
})


// Enregistre les masses molaires
socket.on('calc_masses_molaires_ok', function(event, data) {
    store_masses_molaires(data)
})

export {
    init_avancement
}
