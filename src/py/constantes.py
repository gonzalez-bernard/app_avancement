MSG_LIST_EQUATION = "Sélectionner une équation"
MSG_SAISIE_ERR = "Il y a une erreur de saisie, veuillez vérifier."
MSG_REACTIF_LIMITANT = "Le réactif limitant est : "
MSG_AVANCEMENT_MAX = "L'avancement maximal = "
MSG_IDENTIFICATION_OK = "Vous avez été identifié !"
MSG_IDENTIFICATION_ERR = "Pas d'utilisateur identifié ! Recommencez."
MSG_DECONNEXION_OK = "Déconnexion effectuée."
MSG_SAISIE_EQUATION_OK = "L'équation a bien été enregistrée !"
MSG_SAISIE_EQUATION_DOUBLON = "L'équation existe déjà dans la base !"
MSG_LOST_PASSWORD = "Vous avez oublié votre pot de passe !"
MSG_NEW_COMPTE = "Le compte a bien été créé !"
MSG_UPDATE_COMPTE = "Le mot de passe a été modifié !"
MSG_AIDE =  "<p>Cette application vous familarise avec la recherche des coefficients des réactifs et produits des "\
            "équations chimiques.</p>"\
            "<p>Une animation montre l'évolution des quantités de matières des espèces chimiques.</p> "\
            "<p>Cette animation se présente sous la forme de lignes ou de barres.</p>"\
            "<p>La partie question permet de s'entraîner sur des problèmes simples et de niveau progressif</p><\\br>"\
            "<p><br>B. Gonzalez - Loubet 2020</p>"

'''
QMessageBox = ""
DLG_UPD_NIVEAU = {
                    'type': QMessageBox.Information,
                    'msg': "Félicitations ! Vous avez atteint un niveau supplémentaire. "
                           "vous êtes au niveau : {}",
                    'buttons': QMessageBox.Ok,
                    'title': "Mon Profil"
                }
'''
AIDE_EQUATION = "<p>Vous devez sélectionner une équation dans la liste.</p>" \
                "<p>Ensuite il faudra trouver les coefficients corrects pour pouvoir accéder aux panneaux suivants.\
                </p>"\
                "<p>Saisissez les coefficients puis cliquez sur le bouton <u>vérifier</u></p>" \
                "<p>Si vous n'y arrivez pas, cliquez sur le bouton <u>solution</u> !</p></br>"\
                "<p>On rappelle qu'il faut assurer la conservation des éléments chimiques" \
                " ainsi que celle des charges électriques.</p> "

AIDE_AVANCEMENT = "<p>Ce panneau permet de saisir les quantités de matières initiales des réactifs " \
                "et des produits.</p>" \
                "<p>On peut laisser les quantités de matière des produits à zéro." \
                "<p>On peut alors suivre l'évolution des quantités de matière au cours de la réaction"\
                " en cliquant sur la bouton <u>Lancer</u></p>" \
                " <p>En cliquant sur le bouton <u>Evolution</u> on peut suivre l'évolution sous forme de graphe en \
                barre.</p> " \
                " <p>Le bouton <u>Réinitialise</u> remet les quantité de matière à zéro</p>"

AIDE_EVOLUTION = "<p>Ce panneau permet de suivre l'évolution des quantités de matière sous forme de graphe \
                en barre.</p>" \
                "Cliquez sur le bouton <u>Lancer</u> pour démarrer la simulation.</p> " \
                "<p>Le bouton <u>Arrêter</u> stoppe l'évolution.</p>" \
                "<p>Le bouton <u>Reprise</u> la relance.</p>"


AIDE_QUESTION = "<p>Cette fenêtre vous propose de courts exercices adaptés à votre niveau. </>" \
                " Une seule réponse numérique est attendue.</p>" \
                "<p>Le bouton <u>Vérifier</u> permet de tester votre réponse." \
                "<p>En cas de plusieurs bonnes réponses votre niveau augmentera ainsi que la difficulté des questions."\
                "<p>Si vous donnez 3 réponses fausses consécutives la question sera enregistrée en échec.</p>" \
                "<p>En cliquant sur le bouton <u>Explication</u> des pistes pour répondre à la question seront \
                fournies</p> "


COLOR = [(255, 0, 0), (0, 255, 0), (0, 0, 255), (255, 255, 40), (255, 0, 255), (0, 255, 255)]

FEEDBACK_EQUATION_ERR, FEEDBACK_EQUATION_OK = [], []

FEEDBACK_EQUATION_ERR.append("Il y a au moins une erreur !")
FEEDBACK_EQUATION_ERR.append("Ce n'est toujours pas correct.")
FEEDBACK_EQUATION_ERR.append("Pensez à équilibrer les charges éléctriques !")
FEEDBACK_EQUATION_OK.append("Bravo, c'est parfait !")

FILE_EQUATIONS = "equations.csv"
FILE_CONNEXION = "connexion.dat"
FILE_PROBLEMS = "problems.xml"
FILE_ROOT = "/home/speedy/developpement/electron/avancement/"

# Constantes pour fichier XML
IDQ = 0
NIVEAU = 1
QUESTION = 2
REPONSE = 3
FORMULE = 4
FEEDBACK = 5

# Type d'information à extraire des expressions @[indice formule, type]
TFORMULE = 0
TCOEFF = 1
TMOL = 2
TMASSE = 3

# Constantes pour structure self.current_equation
EQ_EQUATION = 0
EQ_REACTIF = 1
EQ_PRODUIT = 2
EQ_NOM_REACTIF = 3
EQ_NOM_PRODUIT = 4
EQ_COEFFICIENT = 5
EQ_STR = 6
EQ_MOLES = 7
EQ_UNITE = 8
EQ_XMAX = 9
EQ_MASSESMOLAIRES = 10


# constantes pour le détail des listes de current_equation reactif et produit
CE_FORMULE = 0
CE_CHARGE = 1
CE_ESPECES = 2

# constantes pour databases
# table user
DB_ID_USER = 0
DB_USER_NAME = 1
DB_USER_NIVEAU = 2

# tables session
DB_ID_SESSION = 0
DB_SESSION_IDUSER = 1
DB_SESSION_DATE = 2

# table questions
DB_QUESTION_IDQUESTION = 0
DB_QUESTION_IDSESSION = 1
DB_QUESTION_OK = 2


# Constantes pour les indices des pages
TAB_IDENTIF = 0
TAB_EQUATION = 1
TAB_REACTION = 2
TAB_EVOLUTION = 3
TAB_QUESTION = 4
TAB_SAISIE_EQUATION = 5
TAB_SAISIE_QUESTION = 6
TAB_AIDE = 7


# Masses molaires
MASSES_MOLAIRES = {'H': 1.00, 'C': 12.0, 'O': 16.0, 'N': 14.0, 'Cl': 35.5, 'Ca': 40.0, 'Al': 26.0,
                   'Ag': 107.9, 'Br': 79.9, 'Cr': 52.0, 'Cu': 63.5, 'Sn': 118.7, 'Fe': 55.8, 'F': 19.0, 'I': 126.9,
                   'Li': 6.9, 'Mg': 24.3, 'Mn': 54.9, 'Ni': 58.7, 'P': 31.0, 'Pb': 207.0, 'K': 39.1, 'Si': 28.1,
                   'Na': 23.0, 'S': 32.0, 'Zn': 65.4}

sup = ['\u2070', '\u00B9', '\u00B2', '\u00B3', '\u2074', '\u2075', '\u2076', '\u2077', '\u2078', '\u2079']
sub = ['\u2080', '\u2081', '\u2082', '\u2083', '\u2084', '\u2085', '\u2086', '\u2087', '\u2088', '\u2089']
sym = {'+': '\u207a', '-': '\u207b', 'rightarrow': '\u2192'}

DB_CONNEXION = {'host': 'localhost', 'database': 'avancement', 'user': 'bernard', 'password': 'Qjafcunuas3.14'}
DB_CONNEXION_FILE = "ressources/avancement.db"

REG_VALID_NAME = r'[a-zA-Z]{4,10}'
REG_VALID_PASSWORD = r'[a-zA-Z\.\:0-9]{4,10}'
REG_VALID_COEFF = r'[1-9]{1}'
REG_VALID_MOLES_REACTIFS = r'[1-9]{1}\.?[0-9]{,2}'
REG_VALID_MOLES_PRODUITS = r'[0-9]{1}\.?[0-9]{,2}'
REG_VALID_SAISIE = r'[a-zA-Z0-9\#\@\$\.,\[\]\(\)=\+-]*'


# Fichier de styles
CSS_FILE = "styles/design.css"

# Chaîne Interface
STR_ENREGISTRER = "Enregistrer"
STR_MODIFIER = "Modifier"
STR_TITLE_NEW_COMPTE = "Création d'un nouvel utilisateur"
STR_TITLE_UPDATE_COMPTE = "Modification du mot de passe"

#TYPEUSER = 'admin'
TYPEUSER = 'user'
ADMINPWD = '3f81c46b89c57bffa6e9ce7c32517317'