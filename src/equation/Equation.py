"""
Module Equation
"""

import csv
import math
import numpy as np
import os
import sys

sys.path.append(os.getcwd())

import src.py.constantes as cst
from src.py.utils import getFilePath


class Equations:
    """Classe Equations

    Fonctions:
        get_massesmolaires : Calcul des masses molaires
        get_equation : Analyse l'équation et retourne l'équation ainsi qu'une liste des réactifs \
            et des produits
        get_equations : Récupère liste des équations à partir du fichier
        get_coeffs : Extrait les coefficients de la structure équation

    Raises:
        OSError: [description]
        ValueError: [description]

    Returns:
        None:
    """

    
    FILE_EQUATIONS = getFilePath(cst.FILE_EQUATIONS, os.path.abspath(os.getcwd())) + "/" + cst.FILE_EQUATIONS

    def __init__(self):
        pass

    @staticmethod
    def get_equation(equation):
        """Analyse l'équation et retourne l'équation ainsi qu'une liste des réactifs et des produits

        Args:
            equation (equation): chaine structurée contenant les formules et les noms
            chaque formule est séparé par une virgule, les exposants (charges) sont encadrés par %...%
            les indices sont encadrés par _..._ 
            les réactifs et les produits sont séparés par une chaine vide.
            les formules et les noms sont séparés par 2 chaines vides
            ex : 'Fe%2+%','H_3_O%+%','','Fe%3+%,'H_2_O','','','ion ferreux',hydronium','',ion ferrique','eau'


        Returns:
            string:  chaine formatée, (list) structure réactifs, (list) structure produits
        """

        equa = Equation()
        #reactifs, produits,nom_reactifs, nom_produits = [], [], [], []
        mode = 0
        s_equ = ''

        def _get_molecule(chaine):
            """Analyse une chaine pour extraire les informations d'une molecule

            Args:
                chaine (str): chaine a analyser

            Returns:
                list: [chaine formatée, charge, dictionnaire {'atome':nombre,...}]
            """

            structure = []
            charge_formate = ''
            lst_char = {}
            last_char = []
            indice = 0
            charge = 0

            def _get_bloc(chaine, indice):
                """Analyse les caractères situés entre les parentheses

                Args:
                    chaine (str): chaine à traiter
                    indice (int): indice à partir duquel on analyse

                Returns:
                    list: [chaine formatée, bloc caractères, {elt1:nombre,...}]
                """

                indice += 1

                car = chaine[indice]
                if not car.isalpha():
                    return False

                last_indice = chaine.find(")", indice)

                return _get_molecule(chaine[indice:last_indice])

            def _get_indice(chaine, indice):
                """Analyse la chaine à partir du caractère "_"

                Args:
                    chaine (str): chaine a traiter
                    indice (int): indice du caractère "_"

                Returns:
                    str: chaine formatée, valeur, indice du caractère "_" terminal
                """

                indice += 1
                _valeur, charge_formate = '', ''
                car = chaine[indice]
                if not car.isdigit():
                    return False
                while car.isdigit():
                    _valeur += car
                    charge_formate += cst.sub[int(car)]
                    indice += 1
                    if indice == len(chaine):
                        break
                    car = chaine[indice]
                valeur = int(_valeur)
                return charge_formate, valeur, indice

            def _get_charge(chaine, indice):
                """Analyse chaine pour déterminer la charge

                Args:
                chaine (str): chaine a analyser
                indice (int): indice du caractère "'"

                Returns:
                str: chaine formatée, valeur, indice du caractère suivant la fin
                """
                indice += 1
                charge, charge_formate = '', ''
                char = "%"
                car = chaine[indice]
                if car == '+' or car == "-":
                    charge_formate = cst.sym[car]
                    charge = 1 - 2 * (car == "-")
                    indice += 1
                    if indice < len(chaine) and chaine[indice] == char:
                        indice += 1
                    return charge_formate, charge, indice

                while chaine[indice].isdigit():
                    charge += car
                    charge_formate += cst.sup[int(car)]
                    indice += 1
                    car = chaine[indice]
                charge = int(charge)

                if car == "+" or car == "-":
                    charge_formate += cst.sym[car]
                    charge = charge * (1 - 2 * (car == "-"))
                    indice += 1
                    if indice < len(chaine) - 1 and chaine[indice] == char:
                        indice += 1
                    return charge_formate, charge, indice

                return False

            def _set_lst_char(lst_char, lst, nombre):
                """Met à jour la liste des caractères

                Args:
                    lst_char (list): liste à compléter
                    lst (list|dictionnary): liste des caractères
                    nombre (int): nombre

                Returns:
                    None
                """
                if isinstance(lst, list):
                    for _car in lst:
                        if _car in lst_char:
                            lst_char[_car] += nombre
                        else:
                            lst_char.update({_car: nombre})
                else:
                    for _car in lst:
                        if _car in lst_char:
                            lst_char[_car] += nombre * lst[_car]
                        else:
                            lst_char.update({_car: nombre * lst[_car]})

            etat = chaine[-3:].lower()
            if etat == '(s)' or etat == '(l)' or etat == '(g)':
                chaine = chaine[:-3]
            elif etat == 'aq)':
                etat = chaine[-4:].lower()
                chaine = chaine[:-4]
            else:
                etat = ''

            while indice < len(chaine):

                car = chaine[indice]
                char = "%"

                # fin
                if indice == len(chaine) - 1:
                    charge_formate += car
                    _set_lst_char(lst_char, [car], 1)
                    break

                if car.isalpha():

                    car_suivant = chaine[indice + 1]

                    # on enregistre le caractère en cours dans tous les cas sauf si \
                    # suivi d'une minuscule
                    if not car_suivant.islower():
                        charge_formate += car
                        last_char = [car]
                        _set_lst_char(lst_char, last_char, 1)

                    # on enregistre les deux caractères
                    elif car_suivant.isalpha() and car_suivant.islower():
                        last_char = [car + car_suivant]
                        charge_formate += car + car_suivant
                        _set_lst_char(lst_char, last_char, 1)
                        indice += 1

                    else:
                        last_char = [car]

                elif car == char:
                    _sf, charge, indice = _get_charge(chaine, indice)
                    charge_formate += _sf

                elif car == "_":
                    _sf, nombre, indice = _get_indice(chaine, indice)
                    charge_formate += _sf
                    _set_lst_char(lst_char, last_char, nombre - 1)

                elif car == "(":
                    struct = _get_bloc(chaine, indice)
                    charge_formate += "(" + struct[0] + ")"
                    last_char = struct[2]
                    _set_lst_char(lst_char, last_char, 1)
                    last_indice = chaine.find(")", indice)
                    indice += last_indice - indice

                indice += 1

            structure.append(charge_formate + etat)
            structure.append(charge)
            structure.append(lst_char)
            return structure

        equation = ','.join(equation)
        # sépare l'équation des noms
        eqt = equation.split(",,,")

        # traite l'équation
        equ = eqt[0].split(",")
        for espece in equ:
            if espece != '':
                espece = _get_molecule(espece)
                if mode == 0:
                    equa.reactifs.append(espece)
                    s_equ += espece[0] + " + "
                else:
                    equa.produits.append(espece)
                    s_equ += espece[0] + " + "
            else:
                mode = 1
                s_equ = s_equ[:-3] + " " + cst.sym['rightarrow'] + " "
        equa.equation_non_equilibree = s_equ[:-3]

        # traite les noms
        equ = eqt[1].split(",")
        type_espece = 0
        for espece in equ:
            if espece == "":
                type_espece = 1
            else:
                if type_espece == 0:
                    equa.nom_reactifs.append(espece)
                else:
                    equa.nom_produits.append(espece)

        # calcul des coefficients
        equa.get_coeffs()

        # calcul des masses molaires
        equa.get_massesmolaires()

        # construction équation équilibrée
        equa.get_equation_equilibree()

        return equa

    @staticmethod
    def get_equations() -> list:
        """Récupère liste des équations à partir du fichier

        Crée la structure pour chaque équation présente dans le fichier csv
        """
        equations = []
        # Ouverture et lecture du fichier
        try:
            with open(Equations.FILE_EQUATIONS, 'r') as eq_file:
                reader = csv.reader(eq_file, delimiter=",")
                for row in reader:
                    # récupère structure
                    equa = Equations.get_equation(row)

                    # récupère les coefficients
                    equa.get_coeffs()

                    # ajoute l'équation avec les coefficients
                    equa.get_equation_equilibree()

                    equations.append(equa)
        
            return equations

        except OSError:
            raise OSError
        except ValueError:
            raise ValueError

        


class Equation:
    """Classe Equation

        Structure des équations
        Tableau avec les différentes informations fournies ou calculées
        0: str - equation non équilibrée
        1: [] - réactifs
        2: [] - produits
        3: [] - nom des réactifs
        4: [] - nom des produits
        5: [] - coefficients
        6: str - équation avec coefficients
        7: [] _ quantités (mol ou g)
        8: int - unité 0 = mol, 1 = g
        9: [] - avancement 0 = stoechio 0 = Non, 1 = xmax, 2 = réactif limitant, 3 = reste (mol) , \
                4 = reste (g)
        10: [] - masses molaires

    """
    def __init__(self):

        self.reactifs = []
        self.produits = []
        self.nom_reactifs = []
        self.nom_produits = []
        self.equation_non_equilibree = ""
        self.equation_equilibree = ""
        self.coeffs = []
        self.massesmolaires = []
        self.quantites = []
        self.unite = None
        self.reponse = []

    def get_especes(self, att: str):
        """Récupère espèces

        Args:
            att (str): attributs ex : r0, p1

        Returns:
            str: espèce
        """
        if att[0] == 'r':
            return self.get_frm_reactifs()[att[1]]
        elif att[0] == 'p':
            return self.get_frm_produits()[att[1]]
        elif att[0] == 's':
            if att[1] == 'r':
                return self.get_txt_reactifs()[att[2]]
            else:
                return self.get_txt_produits()[att[2]]

    def get_equation_equilibree(self):
        """Retourne équation équilibrée

        Returns
            str: équation
        """
        equ = ""
        for i in range(len(self.reactifs)):
            equ += str(self.coeffs[i]) + " " + self.reactifs[i][0] + " + "
        equ = equ[0:-3] + " " + cst.sym['rightarrow'] + " "
        _num_reactifs = len(self.reactifs)
        for i in range(len(self.produits)):
            equ += str(self.coeffs[i + _num_reactifs]) + " " + self.produits[i][0] + " + "
        self.equation_equilibree = equ[0:-3]
        return self.equation_equilibree

    def get_coeffs(self):
        """Extrait les coefficients de la structure équation

        construit les matrices. La matrice doit être carrée.
        Le nombre de colonne correspond au nombre d'espèces
        Le nombre de lignes correspond au nombre d'éléments plus la charge
        On ajoute une ligne pour fixer la valeur du premier coefficients
        Si le nombre d'éléments est supérieur ou égal à celui des espèces, il y a une ou des \
            équations redondantes.

        Args:
            equation (tuple): équation

        Returns:
            tuple: retourne un tuple des matrices des coefficients
        """

        def _get_matrix_charge():
            """Analyse l'équation et retourne Vrai ou Faux selon la charge

            Args:
                None

            Returns:
                bool: Vrai si charge non nulle
            """
            charge = False
            for reactifs in self.reactifs:
                if reactifs[1] != 0:
                    charge = True
                    break

            return charge

        def _get_matrix(elts, mat_a, mat_c):
            """Retourne les matrices des coefficients

            Args:
                elts (str): chaine des éléments
                mat_a (ndarray): tableau des coefficients
                mat_c (ndarray): tableau des charges

            Returns:
            list : mat_a, mat_c
            """
            n_col = 0
            signe = 1

            for reactifs in self.reactifs:
                elements = reactifs[2]
                charge = reactifs[1]
                for element in elements:
                    n_row = elts.index(element) + 1
                    mat_a[n_row][n_col] = signe * elements[element]
                    mat_c[n_col] = signe * charge
                n_col += 1
            signe = -signe
            for produits in self.produits:
                elements = produits[2]
                charge = produits[1]
                for element in elements:
                    n_row = elts.index(element) + 1
                    mat_a[n_row][n_col] = signe * elements[element]
                    mat_c[n_col] = signe * charge
                n_col += 1
            signe = -signe

            return mat_a, mat_c

        def _get_lst_elements():
            """Retourne la liste des éléments

            Returns:
                str: elts
            """
            elts = []
            for reactifs in self.reactifs:
                elements = reactifs[2]
                for element in elements:
                    if element not in elts:
                        elts.append(element)

            return elts

        def _normalize(lst):
            """Normalise la matrice en mettant tous les coefficients sous forme d'entiers

            Args:
                lst (list): liste des coefficients

            Returns:
                list: liste des coefficients
            """

            def is_int(lst, pos):
                for elt in lst:
                    if not math.isclose(round(pos * elt), pos * elt, rel_tol=0.01):
                        return False
                return True

            _pos = 1
            while not is_int(lst, _pos):
                _pos += 1

            return [int(round(_pos * elt)) for elt in lst]

        # extrait liste elements
        elts = _get_lst_elements()

        # calcul de la charge
        charge = _get_matrix_charge()

        nb_molecules = len(self.reactifs) + len(self.produits)
        nb_elements = len(elts) + (charge is True) + 1
        mat_a = np.zeros((nb_elements, nb_molecules))
        mat_b = np.zeros((nb_elements,))
        mat_c = np.zeros((nb_molecules,))
        mat_b[0] = 1
        mat_a[0][0] = 1

        _get_matrix(elts, mat_a, mat_c)

        if charge:
            mat_a[nb_elements - 1] = mat_c

        dim = mat_a.shape

        # si matrice carré (autant d'éléments que de coefficients)
        if dim[0] == dim[1]:
            coeffs = np.linalg.solve(mat_a, mat_b)
        else:
            coeffs = np.linalg.lstsq(mat_a, mat_b, rcond=None)[0]

        # cherche les valeurs entières
        self.coeffs = _normalize(coeffs)
        return self.coeffs

    def get_massesmolaires(self):
        """Calcul des masses molaires

        Returns:
            list: liste des masses
        """

        def _get_massemolaire(formule):
            """Calcule la masse molaire

            Args:
                formule (dict): structure issu de self.current_equation

            Returns:
                int: masse molaire
            """
            _masse = 0
            for k in formule.keys():
                _masse += formule[k] * cst.MASSES_MOLAIRES[k]

            return round(_masse,1)

        reac = self.reactifs
        prod = self.produits

        # Calcul des masses molaires
        m_reactifs = [_get_massemolaire(reac[i][2]) for i in range(len(reac))]
        m_produits = [_get_massemolaire(prod[i][2]) for i in range(len(prod))]
        masses_molaires = m_reactifs + m_produits
        self.massesmolaires = masses_molaires


    def get_txt_equilibre(self):
        """Retourne l'équation équilibrée

        Returns:
            str
        """
        return self.equation_equilibree if self.equation_equilibree != '' else \
            self.get_equation_equilibree()

    def get_txt_brut(self):
        """Retourne l'équation non équilibrée

        Returns:
            str
        """
        return self.equation_non_equilibree

    def get_frm_reactifs(self):
        """Retourne la liste des formules des réactifs

        Returns:
            list
        """
        liste = []
        for elt in self.reactifs:
            liste.append(elt[0])
        return  liste

    def get_frm_produits(self):
        """Retourne la liste des formules des produits

        Returns:
            list
        """
        liste = []
        for elt in self.produits:
            liste.append(elt[0])
        return  liste

    def get_txt_reactifs(self):
        """Retourne la liste des noms des réactifs

        Returns:
            list
        """
        return self.nom_reactifs

    def get_txt_produits(self):
        """Retourne la liste des noms des produits

        Returns:
            list
        """
        return self.nom_produits

    def get_lst_coeffs(self):
        """Retourne la liste des coefficients

        Return:
            list
        """
        if len(self.coeffs) == 0:
            self.get_coeffs()
        return self.coeffs

    def get_lst_massesmolaires(self):
        """Retourne la liste des masses molaires

        Return:
            list
        """
        if len(self.massesmolaires) == 0:
            self.get_massesmolaires()
        return self.massesmolaires

    @staticmethod
    def dict2equation(dic):
        """Initialise les attributs de l'équation avec les valeurs du dictionnaire

        Link: calc_avancement(avancement.py)
        
        Args:
            dic (dict): valeurs à àinsérer

        Returns:
            Equation: équation
        """
        equ = Equation()
        for key, value in dic.items():
            setattr(equ,key,value)
        return equ
