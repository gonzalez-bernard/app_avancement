const EQ_COEFFS_ERROR_FEEDBACK = "Les coefficients ne sont pas corrects, veuillez corriger l'équation !"
const EQ_COEFFS_SUCCESS_FEEDBACK = "Félicitations l'équation est correctement équilibrée."
const EQ_COEFFS_SUCCESS_FEEDBACK_ = "L'équation est maintenant correctement équilibrée."

const EQ_PRINCIPE_TITRE = "Pourquoi équilibrer ?"
const EQ_PRINCIPE_T1 = "Il est nécessaire d'équilibrer une équation (mettre des coefficients) "+
  "devant les réactifs et les produits pour satisfaire 2 règles :"
const EQ_PRINCIPE_T2 = "la conservation des éléments chimiques (on retrouve dans les produits les éléments présents dans les réactifs)"
const EQ_PRINCIPE_T3 = "la conservation des charges électriques (uniquement quand il y a des ions)."
const EQ_METHODE_TITRE = "La méthode"

const EQ_EQUILIBRAGE_TEXT1 = "<p>Prenons l'exemple de la réaction décrite par l'équation : </p>" +
  "<h4>CaCl\u2082(s) + AgNO\u2083(l) \u2192 AgCl + Ceq_a(NO\u2083)\u2082</h4>" +
  "<p>Plaçons devant chaque espèce un coefficient sous forme de lettre/</p>" +
  "<h4>a CaCl\u2082 + b AgNO\u2083 \u2192 c AgCl + d Ca(NO\u2083)\u2082</h4>" +
  "<p>On va comptabiliser le nombre de chaque élément et on va écrire qu'il y a conservation.</p>" +
  "<table class='table'><thead><tr><th> Eléments </th><th> Conservation </th><th> Numéro </th></tr></thead>" +
  "<tr><th>Ca</th><td>a = d</td><td>1</td></tr>" +
  "<tbody><tr><th>Cl</th><td>2a = c</td><td>2</td></tr>" +
  "<tr><th>Ag</th><td>b = c</td><td>3</td></tr>" +
  "<tr><th>N</th><td>b = 2d</td><td>4</td></tr>" +
  "<tr><th>O</th><td>3b = 6d</td><td>5</td></tr></tbody></table>" +
  "<p>On va simplifier les équations obtenues</p><p>L'équation N°5 devient b = 2d.</p>" +
  "<p>Maintenant on cherche <b>le plus petit coefficient</b> en éliminant les coefficients les plus grands.</p>" +
  "<p>L'équation N°1 permet d'éliminer <b>d</b>, l'équation N°2 élimine <b>c</b> enfin l'équation N°4 supprime le <b>b</b>.</p>" +
  "<p>Il reste donc le <b>a</b> que l'on fixe à 1, il ne reste plus qu'à remplacer a par sa valeur et on retrouve tous les coefficients.</p>" +
  "<h4>1 CaCl\u2082(s) + 2 AgNO\u2083(l) \u2192 2 AgCl + 1 Ca(NO\u2083)\u2082</h4>"

const EQ_METHODE_T1 = "<p>Il y a deux méthodes, la première consiste à parcourir chaque élement chimique "+
  " et à mettre des coefficients ,de façon empirique, pour assurer la conservation." +
  "Cette méthode fonctionne bien pour les équations simples.</p>"+
  "<p>L'autre méthode est plus technique mais fonctionne même pour les équations complexes.</p>" +
  "<ul><li><a data-dismiss='modal' data-toggle='modal' href='#' id='eq_equilibrage1'>Un exemple simple</a></li>"+
  "<li><a data-dismiss='modal' data-toggle='modal' href='#' id='eq_equilibrage2'>Un autre plus complexe</a></li></ul>"

const EQ_EQUATION_TITRE = "Equation"  
const EQ_EQUATION_OBJECTIF = "<p>Dans cette page on doit choisir <b>l'équation d'une réaction</b>.</p><p>Votre travail consiste à trouver\
 les coefficients pour l'équilibrer.</p><p>Rassurez-vous, la solution sera disponible au bout de trois échecs.</p>"
const EQ_EQUATION_ACTION = "Choisissez maintenant une équation dans la liste ci-dessous !"
const EQ_COEFFS = "Il faut maintenant <b>équilibrer</b> cette équation.<br/>"+
        "Pour cela il faut trouver les <b>coefficients</b> devant chaque réactif et chaque produit.<br/>"+
        "Les coefficients sont nécessairement des entiers compris entre 1 et 9."
const EQ_BT_VALIDER = " Valider "
const EQ_BT_AFFICHER = " Afficher les coefficients "
const EQ_BT_PRINCIPE = " Pourquoi équilibrer ? "
const EQ_BT_METHODE = " Comment équilibrer ? "
const EQ_FEEDBACK = "Seul un chiffre est accepté"
const EQ_EQUILIBRAGE = "Méthode pour équilibrer une équation"
const EQ_IMAGE = "<img src='./src/resources/img/hydrogen_stars.jpg' width='400px' height = '300px' alt=''>"

const EQ_EQUILIBRAGE_TEXT2 = "<p>On cherche à équilibrer cette équation : </p>" +
  "<h4>H\u2082SO\u2084(l) + H\u2082O(l) \u2192 H\u2083O<sup>+</sup>(aq) + SO\u2084<sup>2-</sup>(aq)</h4>" +
  "<p>Comptabilisons les éléments :</p>" +
  "<table class='table'><thead><tr><th> Eléments </th><th> Conservation </th><th> Numéro </th></tr></thead>" +
  "<tr><th>H</th><td>2a+2b = 3c</td><td>1</td></tr>" +
  "<tbody><tr><th>S</th><td>a = d</td><td>2</td></tr>" +
  "<tr><th>O</th><td>4a +b = c + 4d</td><td>3</td></tr>" +
  "<tr><th>e</th><td>0 = c - 2d</td><td>4</td></tr></tbody></table>" +
  "<p>La dernière équation correspond aux charges électriques</p>" +
  "<p>L'équation N°2 permet d'éliminer <b>d</b>, quand on remplace <b>d</b> par <b>a</b> dans l'équation N°3, on obtient " +
  "<b>b = c</b>. Enfin l'équation N°4 donne <b>c = 2d = 2a</b></p>" +
  "On pose <b>a = 1</b> et on obtient tous les autres coefficients</p><ul><li>a = 1</li><li>c = 2a = 2</li><li>b = c = 2</li><li>d = c/2 = 1</li></ul>" +
  "<h4>1 H\u2082SO\u2084(l) + 2 H\u2082O(l) \u2192 2 H\u2083O<sup>+</sup>(aq) + 1 SO\u2084<sup>2-</sup>(aq)</h4>"
  
const EQ_LABEL_SELECT = "-- sélectionnez une équation --"
const EQ_BT_EQUILIBRAGE_CLOSE = "Fermer"


export {EQ_COEFFS_ERROR_FEEDBACK, EQ_COEFFS_SUCCESS_FEEDBACK, EQ_PRINCIPE_TITRE, EQ_PRINCIPE_T1, EQ_PRINCIPE_T2, EQ_PRINCIPE_T3,
EQ_METHODE_TITRE, EQ_METHODE_T1, EQ_EQUATION_TITRE, EQ_EQUATION_OBJECTIF, EQ_EQUATION_ACTION, EQ_COEFFS, EQ_BT_VALIDER, EQ_BT_AFFICHER, 
EQ_BT_PRINCIPE, EQ_BT_METHODE, EQ_FEEDBACK, EQ_EQUILIBRAGE, EQ_EQUILIBRAGE_TEXT1, EQ_EQUILIBRAGE_TEXT2, EQ_BT_EQUILIBRAGE_CLOSE, 
EQ_LABEL_SELECT, EQ_IMAGE, EQ_COEFFS_SUCCESS_FEEDBACK_}