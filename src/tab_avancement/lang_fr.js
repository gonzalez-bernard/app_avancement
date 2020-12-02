const TB_TITRE = "Tableau d'avancement"
const TB_TITRE_TABLE = "Equation"
const TB_INIT = "Le tableau permet de calculer l'avancment et les quantités de matière qui ont réagi et celles qui restent à la fin de la réaction."
const TB_ALERT_QI = "On indique les quantités de matières initiales"
const TB_ALERT_QC = "On retranche aux quantités de matières initiales le coefficient multiplié par l'avancement x"
const TB_ALERT_QFX = "On retranche aux quantités de matières initiales le coefficient multiplié par l'avancement maximal x<sub>max</sub>"
const TB_ALERT_QF = "On calcule les quantités en remplaçant x<sub>max</sub> par sa valeur"
const TB_LABEL_QI = "Quantités initiales (mol)"
const TB_LABEL_QC = "Quantités en cours (x)"
const TB_LABEL_QF = "Quantités finales (x<sub>max</sub>)"
const TB_BT_PROGRESS = " Avancer "
const TB_BT_HELPAVANCEMENT = " Comment trouver réactif limitant ?"

const TB_HTML_INFO = "<h3>Comment trouver le réactif limitant ?</h3>"+
"<p>Deux méthodes sont possibles :</p>"+
"<ul><li>en utilisant le <a href='#' id='tb_tab_avancement_help1'>tableau d'avancement</a></li>"+
"<li>en calculant les <a href='#' id='tb_tab_avancement_help2' >rapports</a> quantité de matière/coefficient</li></ul>"

const TB_LIMITANT_TEXT1 = "<p>Partons de l'équation</p>"+
"<h5>1 CaCl<sub>2</sub> + 2 AgNO<sub>3</sub> -> 2 AgCl + 1 Ca(NO<sub>3</sub>)</h5>"+
"<p>avec les quantités de matières suivantes <b>n(CaCl<sub>2</sub>) = 3 moles</b> et <b>n(AgNO<sub>3</sub>) = 5 moles</b><p>"+
"<p>Le tableau d'avancement donne sur la ligne x<sub>max</sub> : </p>"+
"<ul><li>n(CaCl<sub>2</sub>) - <span style='color:#FF0000'>1</span> x<sub>max</sub></li>"+
"<li>n(AgNO<sub>3</sub>) - <span style='color:#FF0000'>2</span> x<sub>max</sub></li></ul>"+
"<p>On cherche la valeur (l'avancement maximal) le plus petit qui annule une des 2 quantités de matière</p>"+
"<p>On a donc : </p>"+
"<ul><li>n(CaCl<sub>2</sub>) - 1 x<sub>max</sub> = 0 pour x<sub>max</sub> = 3 moles</li>"+
"<li>n(AgNO<sub>3</sub>) - 2 x<sub>max</sub> = 0 pour x<sub>max</sub> = 2,5 moles</li></ul>"+
"<p><p>L'avancement maximal est de 2,5 moles et le réactif limitant est AgNO<sub>3</sub></p></p>"


const TB_LIMITANT_TEXT2 = "<p>Partons de l'équation</p>"+
"<h5>1 CaCl<sub>2</sub> + 2 AgNO<sub>3</sub> -> 2 AgCl + 1 Ca(NO<sub>3</sub>)</h5>"+
"<p>avec les quantités de matières suivantes <b>n(CaCl<sub>2</sub>) = 3 moles</b> et <b>n(AgNO<sub>3</sub>) = 5 moles</b><p>"+
"<p>On calcule les rapports :</p>"+
"<ul><li> pour CaCl<sub>2</sub> : \\( \\large \\frac{n(CaCl_{2})}{1} = \\frac{3}{1} = \\normalsize 3 \\)</li><br/>"+
"<li> pour AgNO<sub>3</sub> : \\( \\large \\frac{n(AgNO_{3})}{2} = \\frac{5}{2} = \\normalsize 2,5 \\)</li>"+
"<p><p>L'avancement maximal est de 2,5 moles et le réactif limitant est AgNO<sub>3</<sub></p></p>"



const TB_LIMITANT = "Trouver le réactif limitant"
const TB_BT_LIMITANT_CLOSE = "Fermer"

export {TB_TITRE, TB_TITRE_TABLE, TB_INIT, TB_ALERT_QI, TB_ALERT_QC, TB_ALERT_QF, TB_ALERT_QFX, TB_LABEL_QC, 
    TB_LABEL_QI, TB_LABEL_QF, TB_BT_PROGRESS, TB_BT_HELPAVANCEMENT, TB_HTML_INFO, TB_LIMITANT_TEXT1, TB_LIMITANT_TEXT2, 
    TB_LIMITANT, TB_BT_LIMITANT_CLOSE}