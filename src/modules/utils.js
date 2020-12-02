const INVALID_VERIF_PASSWORD = "Les mots de passe ne concordent pas"


var get_decimal = function(valeur){
    /**
     * calcul le décalage nécessaire pour qu'un nombre soit supérieur à 1
     * elle permet de définir la précision d'affichage
     */
    let offset = 0
    if (valeur == 0)
        return 0 
    while (valeur <= 1) {
        valeur *= 10
        offset++
    }
    return offset
}

var form_valid_class = function(obj, valid = true) {
    /**
        Met à jour les objets en fonction de la validité des champs
        @param obj : champ
        @param valid indique si on doit marquer valide ou pas
    */
    if (obj.value != "") {
        if (valid) {
            if (obj.validity.valid) {
                obj.classList.add("is-valid");
                obj.classList.remove("is-invalid");
            } else {
                obj.classList.add("is-invalid");
                obj.classList.remove("is-valid");
            }
        }

    } else {
        obj.classList.remove("is-valid")
        obj.classList.remove("is-invalid")
    }
}

var form_set_feedback = function(event, msg) {
    $(event.data.feedback).html(msg)
}

var form_verif_inputfield = function(field, mark = true) {
    /**
     * test la validité de chaque champ input
     * field : id du champ
     * mark : indique s'il faut marquer les champs
     */
    let valid = true

    let elt = $("#" + field);
    if (!elt.prop('disabled')) {
        form_valid_class(elt[0], false)

        if (elt[0].validity.valid == false) {
            if (mark)
                form_valid_class(elt[0])
            valid = false;
        }
        if (mark)
            form_valid_class(elt[0])
    }
    return valid;
}

var form_verif_all_inputfields = function(field, mark = true) {
    /**
     * test la validité de chaque champ input
     * field : id du formulaire
     * mark : indique s'il faut marquer les champs
     */
    let valid = true
    $(field + " :input").filter(':visible').each(function() {

        let elt = $(this);
        if (!elt.prop('disabled')) {
            form_valid_class(elt[0], false)

            if (elt[0].validity.valid == false) {
                if (mark)
                    form_valid_class(elt[0])
                valid = false;
            }
            if (mark)
                form_valid_class(elt[0])
        }
    })
    return valid;
}

var form_valid_passwords = function(event) {
    /**
     * vérifie l'égalité entre les mots de passe saisis
     * id : id du formulaire
     */
    let pwd = ""
    let valid = false

    $(":password").each(function() {
        if (pwd == "") {
            pwd = $(this).val()
        } else {
            if (pwd == $(this).val()) {
                valid = true
            }
            form_valid_class($(this)[0], valid)
            return false
        }
    })
    return valid
}

var form_valid_btn = function(event) {
    /*
     * fonction chargée de vérifier que tous les champs sont remplis
     * dans ce cas on teste aussi si les mots de passe concordent
     * event contient les champs suivants :
     * feedback : id du l'élément feedback
     * button : id du bouton à valider ou tableau des boutons
     * pass : true/false indique si on doit traiter les mots de passe
     * mark : true/false indique si on doit marquer les champs
     * callback : none/fct fonction si réussite
     */

    // test la validité de chaque champ input
    let field = "#" + event.currentTarget.closest('form').id
    let mark = (typeof(event.data.mark) != undefined ? event.data.mark : true)
    let isFieldsValid = form_verif_all_inputfields(field, mark)

    let pass = (typeof(event.data.pass) != 'undefined' ? event.data.pass : true)
    let isValidPasswords = true

    let callback = (typeof(event.data.callback) != 'undefined' ? event.data.callback : undefined)

    // actualise les champs
    if (isFieldsValid && pass) {
        isValidPasswords = form_valid_passwords(event)
        if (!isValidPasswords) {
            form_set_feedback(event, INVALID_VERIF_PASSWORD)
        }
    }
    if (typeof event.data.button == "object") {
        event.data.button.forEach(function(bt) {
            $(bt).attr("disabled", !isValidPasswords || !isFieldsValid);
        })
    } else {
        $(event.data.button).attr("disabled", !isValidPasswords || !isFieldsValid);
    }

    // Gestion du callback
    if (event.data.callback != undefined && !$(event.data.button).prop('disabled')) {
        callback = event.data.callback['fct']
        callback(event.data.callback['data'])
    }
}

var form_set_select_options = function(label, id_html, data) {
    /**
     * parcourt un tableau contenant les informations d'options d'une liste
     * retourne le contenu html modifié
     * params :
     * label : texte à afficher en en-tête
     * html : nom du code html contenant la liste et le mot <options>
     *    <select class = 'form-control' id='equation_select' ><option></select>
     * data : tableau avec la structure [{'value': valeur, 'label': texte à afficher},{...}]
     */
    let txt = "<option disabled selected value>" + label + "</option>"

    data.forEach(function(elt) {
        let x = elt;
        if (elt.value != undefined)
            txt += "<option value=" + elt.value + ">" + elt.label + "</option>"
        else
            txt += "<option>" + elt.label + "</option>"

    })
    let html = $("#" + id_html)[0].outerHTML
    html = html.replace(/<option>/g, txt)
    return html
}

var dsp_modal_info = function(event) {
    /**
     *   Affiche une fenêtre modal
     *   event.data : arguments
     *       - container : id du conteneur (div)
     *       - titre : titre de la fenêtre
     *       - info  : contenu à afficher
     *       - btclose : texte du bouton
     */
    let id_container = event.data.container
    let txt_titre = event.data.titre
    let txt_info = event.data.info
    let txt_bt_close = event.data.btclose
    let html = "<div data-dismiss = 'modal' class='modal fade' id='id_modal' tabindex='-1' role='dialog' " +
        "aria-hidden='true'><div class='modal-dialog modal-xlg' role='document'><div class='modal-content'>" +
        "<div class='modal-header'><h5 class='modal-title' >" + txt_titre + "</h5>" +
        "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>" +
        "<span aria-hidden='true'>&times;</span></button></div>" +
        "<div class='modal-body'>" + txt_info + "</div>" +
        "<div class='modal-footer'><button type='button' class='btn btn-secondary' data-dismiss='modal'> " +
        txt_bt_close + "</button></div></div></div></div>"

    if (event.data.math == true) {
        MathJax.typesetPromise().then(() => {
            $(id_container).html(html + "<hr/>")
            $(id_modal).modal()
            MathJax.typesetPromise();
        }).catch((err) => console.log(err.message));
    } else {
        $(id_container).html(html)
        $(id_modal).modal()
    }
}

var dsp_html_latex = function(html, target) {
    /**
     * Affiche un texte au format Latex
     * html : contenu html à afficher
     * target : id de la balise d'affichage
     */
    MathJax.typesetPromise().then(() => {
        $(target).html(html)
        MathJax.typesetPromise();
    }).catch((err) => console.log(err.message));
}

var math_arrondir = function(nombre, precision) {
    /**
     * Arrondit un nombre en tenant compte du nombre de CS
     * nombre : nombre à math_arrondir
     * precision : nombre de chiffres significatifs
     *
     * Si la partie entière a au moins autant de chiffres que precision on arrondit à l'entier
     * Sinon on garde un nombre de décimal égal à nombre de digits - precision
     */
    if (typeof nombre == "number")
        nombre = nombre.toString()
    let n_digits = nombre.replace('.', '').length;
    let n_entier = parseInt(nombre).toString().length
    if (n_entier >= precision)
        return parseFloat(nombre).toFixed(0)
    else
        return parseFloat(nombre).toFixed(precision - n_entier)
}


export {
    dsp_html_latex,
    dsp_modal_info,
    form_valid_class,
    form_verif_all_inputfields,
    form_valid_passwords,
    form_valid_btn,
    form_verif_inputfield,
    form_set_select_options,
    math_arrondir, get_decimal
}
