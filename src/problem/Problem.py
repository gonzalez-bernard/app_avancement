"""
Class Problem
"""
import re
import os
from random import randrange, uniform
import xmltodict

#import settings
import src.py.constantes as cst
from src.equation.Equation import Equations
from src.py.utils import getFilePath, formatSignificatif, get_digits, scinotation2latex



class Problem:
    """Gestion des problèmes
    Description du fichier 'problem.xml'
        Utilise le fichier 'problems.xml' structuré de la façon suivante :
            <problem id='...'>
            <level>...</level>
            <context>...</context>
            <question>...</question>
            <calcul>...</calcul>
            <solution>...</solution>
            <unite>mol</unite>
            <feedback>
            <feedback id="1" type="true">...</feedback>
            <feedback id="2" type="false">...</feedback>
            <feedback id="3" type="false">...</feedback>
            <feedback id="4" type="false">...</feedback>
            </feedback>
            <help>...</help>
        </problem>

        Les variables sont entourées de '#...#'
        On dispose de :
            - #r...# et #p...# pour les formules des réactifs et produits
            - #nr...# et #np...# pour les quantités de matières
            - #mr...# et #mp...# pour les masses
            - #cr...# et #cp...# pour les coefficients
            - #sr...# et #sp...# pour les noms des espèces
            - #ex...# et #exe...# pour les équations non/oui équilibrées
            - #xmax# pour l'avancement
            - #X# pour la réponse
            - #lim# pour le réactif limitant

        L'item calcul permet le calcul de toues les grandeurs avec la syntaxe :
            - grandeur = ! : calcul automatique ou grandeurs en mémoire
            - grandeur = formule, par ex : round(uniform(1,2),1)

        Les items "solution" et "aide" utilise MathJax. La syntaxe pour les formules est :
            - inline : \\(...\\)
            - block : $$...$$
            - les balises de formatage html sont encadrées par des crochets [...]

    Fonctions:
        - get_problems : récupère la liste des problèmes
        - get_problem : Choisit un problème aléatoire ou identifié par son indice.
        - get_indice_equation : Récupère l'indice de l'équation
        - get_equation : Récupère une équation aléatoire ou définit par #eqX#
        - get_attributes : Récupère les attributs qui sont définis dans les différentes rubriques \
            encadrés par #...#
        - get_values : Définit les valeurs à partir de l'équation ou les calcule grâce aux infos \
            précisées dans <calcul>
        - calc_xmax : Effectue le calcul de xmax avec les données disponibles dans le dict 'values'
        - replace_attributes : Remplace les attributs #...# par leur valeur
        - set_data : Construit le dict des données
        - getProblem : programme principal

    """
    # FILE_PROBLEMS = os.path.dirname(os.getcwd()) + "/avancement/problem/problems.xml"
    R_GET_EQUATION = re.compile(r'#eqe?(\d{1,2})#')
    R_GET_ATTRIBUTES = re.compile(r'#([mnrpcstvzXMs]{0,1}[^eq][0-9]+)#')
    R_ANALYSE = re.compile(r'#([mnrpctxalivszXM]{1,4}\d?)#\s?=\s?([a-zA-Z0-9\s*\/\+\-\?\!\(\,.)]*\d?)')
    R_REPLACE = re.compile(r'#([mnrpcXxstavzMeqli]{1,5}\d*)#')
    R_PRECISION = re.compile(r'([nmtvM][r,p]\d?)|(xmax)|(X)|(z\d?)')

    def __init__(self):
        self.lst_problems = []  # liste des problèmes
        self.level = 0
        self.problem = None
        self.context = None
        self.question = None
        self.solution = None
        self.id = None
        self.unite = None
        self.feedback = {}
        self.help = None
        self.equation = None  # structure équation
        self.id_equation = None  # indice de l'équation
        self.id_problem = 0  # numéro du problème
        self.attributes = []  # liste des attributs
        self.values = {}  # attributs avec valeurs
        self.precision = None

    def get_problems(self, level: int = None) -> None:
        """Récupère la liste des problèmes

        On enregistre la liste dans la structure lst_problems, on accède à un élément problème\
             par son indice

        Args:
            level (int, optional): niveau de difficulté
        """
        with open(getFilePath(cst.FILE_PROBLEMS, os.path.abspath(os.getcwd())) + "/" + cst.FILE_PROBLEMS, 'r') as fd:
            data = xmltodict.parse(fd.read())
            lst = data['problems']['problem']
            tab = []
            if level:
                for e in lst:
                    if int(e['level']) == level:
                        tab.append(e)
                self.lst_problems = tab
            else:
                self.lst_problems = lst

    def get_problem(self, indice: int = None) -> None:
        """Choisit un problème aléatoire ou identifié par son indice.

        fixe les attributs (context, question,...)
        l'indice prime sur le niveau
        Ainsi self.context contiendra le contexte en cours

        Args:
            indice (int, optional): indice du problème (default: {None})
        """
        if indice is None:
            self.id_problem = randrange(len(self.lst_problems))
            self.problem = self.lst_problems[self.id_problem]
        else:
            self.id_problem = indice
            self.problem = self.lst_problems[indice]
        for tag in self.problem:
            _tag = tag[1:] if tag[0] == '@' else tag
            setattr(self, _tag, self.problem[tag])

    def get_indice_equation(self) -> int:
        """Récupère l'indice de l'équation

        Returns:
            int: indice
        """
        for tag in ['context', 'question']:
            if isinstance(self.problem[tag], str):
                equation = Problem.R_GET_EQUATION.findall(self.problem[tag])
                if len(equation) > 0:
                    return int(equation[0])
        return False

    def get_equation(self, _id: int = None) -> None:
        """Récupère une équation aléatoire ou définit par #eqX#

        Initialise self.equation

        Args:
            id (int, optional): indice de l'équation (default: {None})
        """
        eq = Equations()
        lst_equations = eq.get_equations()
        if _id is None:  # mode par défaut on utilise une équation aléatoire
            self.equation = lst_equations[randrange(len(lst_equations))]
        else:
            self.equation = lst_equations[_id]

    def get_attributes(self) -> None:
        """Récupère les attributs qui sont définis dans les différentes rubriques encadrés par #...#

        Remplit le tableau self.attributes
        """
        for tag in ['context', 'question', 'solution', 'help', 'calcul']:
            if isinstance(self.problem[tag], str):
                form = Problem.R_GET_ATTRIBUTES.findall(self.problem[tag])
                for e in form:
                    if e not in self.attributes:
                        self.attributes.append(e)

    def get_precision(self, formule: str, value: float = None) -> int:
        """Retourne le nombre de CS

        Args:
            formule (str): formule utilisée pour le calcul
            value (float, optional): valeur

        Returns:
            int: nombre de chiffres significatifs
        """
        if not isinstance(formule, str):
            formule = str(formule)

        attrs = Problem.R_PRECISION.findall(formule)
        tab = []
        for attr in attrs:
            for e in attr:
                if e:
                    if 'o' + e in self.values:
                        tab.append(self.values['o'+e]['precision'])
                    elif 's' + e in self.values:
                        tab.append(get_digits(self.values['s' + e]))
                    else:
                        tab.append(self.values[e]['precision'])
        if len(tab) > 0:
            self.precision = min(tab)
            return self.precision
        elif value:
            return get_digits(value)
        else:
            return 0

    def get_values(self):
        """Définit les valeurs à partir de l'équation ou précisées dans <calcul>

            Initialise self.values
        """

        def _get_especes(e: str) -> str:
            """Récupère les formules des réactifs et des produits

            Args:
                e (str): nom de l'attribut (ex : r1)

            Returns:
                str: valeur de l'attribut
            """
            # réactifs et produits
            if e[0] == 'r':
                return self.equation.reactifs[int(e[1])][0]
            elif e[0] == 'p':
                return self.equation.produits[int(e[1])][0]
            elif e[0:2] == 'sr':
                return self.equation.nom_reactifs[int(e[2])]
            elif e[0:2] == 'sp':
                return self.equation.nom_produits[int(e[2])]

        def _analyse_calcul():
            """Effectue les calculs à partir des informations stockées dans <calcul>

            Initialise la structure self.calcul {'identifiant': valeur,...}

            """
            attributes = Problem.R_ANALYSE.findall(self.problem['calcul'])
            precision = None

            # On parcourt chaque attribut #xxx# et on renvoie un tuple avec la \
            # valeur et la precision
            for elt in attributes:
                grandeur = {}
                nom = elt[0]
                if nom[0] == 'M':  # masses molaires
                    indice = int(nom[2]) if nom[1] == 'r' else int(nom[2]) + \
                        len(self.equation.reactifs)
                    grandeur['valeur'] = self.equation.massesmolaires[indice]
                    grandeur['precision'] = 3
                    grandeur['valeur_app'] = formatSignificatif(grandeur['valeur'],3)
                elif nom[0] == 'c':  # coefficients
                    indice = int(nom[2]) if nom[1] == 'r' else int(nom[2]) + \
                        len(self.equation.reactifs)
                    grandeur['valeur'] = self.equation.coeffs[indice]
                    grandeur['precision'] = 0
                    grandeur['valeur_app'] = str(grandeur['valeur'])
                elif nom == 'xmax':
                    grandeur['valeur'], grandeur['lim'], grandeur['slim'], \
                        grandeur['precision'] = self.calc_xmax()
                    grandeur['valeur_app'] = formatSignificatif(grandeur['valeur'], precision)

                elif nom[0] == 's':
                    pass
                else:
                    if elt[1] == '?':  # valeurs aléatoires
                        if nom[0] == 'n':
                            grandeur['valeur'] = round(uniform(0.1, 5), 3)
                        else:
                            grandeur['valeur'] = round(uniform(1, 50), 2)
                    else:
                        grandeur['valeur'] = eval(elt[1])
                        precision = self.get_precision(elt[1], grandeur['valeur'])
                        grandeur['precision'] = precision
                        if precision > 0:
                            grandeur['valeur_app'] = \
                                formatSignificatif(grandeur['valeur'], precision)
                        else:
                            grandeur['valeur_app'] = str(round(grandeur['valeur'],0))

                if nom[0] != 's':
                    self.values['o' + nom] = grandeur
                    self.values[nom] = grandeur['valeur']
                    self.values['s' + nom] = grandeur['valeur_app']
                    if 'lim' in grandeur.keys():
                        self.values['lim'] = grandeur['lim']
                        self.values['slim'] = grandeur['slim']
                    locals()[nom] = grandeur['valeur']

        for e in self.attributes:
            self.values[e] = _get_especes(e)

        _analyse_calcul()

    def calc_xmax(self) -> tuple:
        """Effectue le calcul de xmax avec les données disponibles dans le dict 'values'

        Returns:
            tuple: avancement, réactif limitant, précision
        """
        # calcul de xmax
        nb_produits = len(self.equation.produits)
        rapports = []

        tab = []
        precision  = 15

        for key in self.values.keys():
            if key[0] in ['n', 'm']:
                tab.append(key)
                _type = key[1]  # 'r' ou 'p'
                indice = int(key[2]) if key[1] == 'r' else int(key[2]) + nb_produits  # 0,1,...
                coeff = 'c' + key[1:]

                if self.values[key]:
                    if key[0] == 'n':
                        rapports.append(self.values[key] / self.values[coeff])
                    elif key[0] == 'm':
                        rapports.append(self.values[key]*self.values[coeff] / \
                            (self.equation.massesmolaires[indice]))
                    precision = min(precision, self.values['o'+key]['precision'])

        xmax = min(rapports)
        index = rapports.index(xmax)
        limitant = tab[index][1:]
        if limitant[0] == 'r':
            lim = self.equation.reactifs[int(limitant[1])][0]
            slim = self.equation.nom_reactifs[int(limitant[1])]
        else:
            lim = self.equation.produits[int(limitant[1])][0]
            slim = self.equation.nom_produits[int(limitant[1])]
        return xmax, lim, slim, precision

    def replace_attributes(self, text: str) -> str:
        """Remplace les attributs #...# par leur valeur

        Args:
            text (str): texte extrait du fichier problem.csv

        Returns:
            str: text modifié
        """
        attributes = Problem.R_REPLACE.findall(text)
        for elt in attributes:
            if elt[0:3] == 'eqe':
                text = text.replace('#' + elt + '#', str(self.equation.equation_equilibree))
            elif elt[0:2] == 'eq':
                text = text.replace('#' + elt + '#', str(self.equation.equation_non_equilibree))
            else:
                if isinstance(self.values[elt], dict):
                    text = text.replace('#' + elt + '#', str(self.values[elt]['valeur'] ))
                else:
                    text = text.replace('#' + elt + '#', str(self.values[elt]))
        return text

    def set_data(self) -> dict:
        """Construit le dict des données

        Returns:
            dict: ensemble des données du problème
        """
        dic = {}
        context = self.replace_attributes(self.context)
        question = self.replace_attributes(self.question)
        solution = self.replace_attributes(self.solution)
        _help = self.replace_attributes(self.help)

        dic['id'] = int(self.id)
        dic['id_eq'] = self.id_equation
        dic['niveau'] = self.level
        dic['context'] = context
        dic['question'] = question
        dic['unite'] = self.unite
        dic['valeur'] = self.values['X']
        dic['feedback'] = self.feedback['feedback']
        dic['help'] = _help
        dic['solution'] = solution
        dic['precision'] = self.precision
        dic['img']=self.problem['img'] if 'img' in self.problem else 'Null'
        if 'xmax' in self.values:
            dic['xmax'] = self.values['xmax']
            dic['sxmax'] = self.values['sxmax']
            dic['lim'] = self.values['oxmax']['lim']
            dic['slim'] = self.values['oxmax']['slim']
        return dic

    # Programme Principal
    def getProblem(self, level=None):
        """Programme principal

        Args:
            level (int, optional): niveau de difficulté. Defaults to None.

        Returns:
            None:
        """
        self.get_problems(level)
        self.get_problem()
        self.id_equation = self.get_indice_equation()
        self.get_equation(self.id_equation)
        self.get_attributes()
        self.get_values()
        return self.set_data()
