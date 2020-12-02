import os
import re
import math

def getFilePath(fichier, rep):
    """
    Recherche le chemin d'un fichier
    :param fichier: {str} nom du fichier
    :param rep: {url} chemin du dossier de base
    :return: {str}
    """
    # recherche du contenu du répertoire rep (fichiers et sous-répertoires)
    entrees = os.listdir(rep)

    # traitement des fichiers du répertoire
    for entree in entrees:
        if (not os.path.isdir(os.path.join(rep, entree))) and (entree == fichier):
            return rep

    # traitement récursif des sous-répertoires de rep
    for entree in entrees:
        rep2 = os.path.join(rep, entree)
        if os.path.isdir(rep2):
            chemin = getFilePath(fichier, rep2)
            if chemin:
                return chemin

def formatSignificatif(number, precision):
    """
    formate un nombre avec un nombre de chiffres significatifs    
    
    Arguments:
        nombre {float} -- nombre à formater
        precision {int} -- nombre de chiffres significatifs
    """

    def _get_digits(valeur , precision, sup):
        """
       Formate une nombre en tenant compte du nombre de chiffres significatifs.
       Le nombre ne comporte pas de zéros à gauche.
       Le programme se charge d'math_arrondir si le chiffre après la précision est supérieur ou égal à 5
       Si la précision est supérieur au nombre de chiffres significatifs le programme complète avec des zéros
       :param valeur: (str) nombre à formater
       :param precision: (int) nombre de chiffres significatifs
       :param sup: (bool) indique si le nombre à gauche est nul (False) ou > 0 (True)
       :return: (str) chaîne formatée
        """

        l = len(valeur)
        # si longueur identique
        if precision == l:
            return valeur
        # si précision supérieur on complète avec des zéros à droite
        elif precision > l:
            f = '{:0<' + precision + 'd}'
            return f.format(valeur)
        # on va tronquer valeur
        else:
            # on doit découper la chaine pour exclure les zéros en début
            motif = re.compile(r'(0*)(\d*)')
            x = motif.findall(valeur)[0]

            # si le nombre est < 1 (sup = False), on ne compte pas les zéros à gauche
            if not sup:
                # on travaille sur x[1]
                # on vérifie longueur de chaîne
                if precision > len(x[1]):
                    # on complète avec des zéros
                    f = '{:0<' + precision + 'd}'
                    return f.format(valeur)
                elif precision == len(x[1]):
                    # on retourne la valeur
                    return valeur
                else:
                    # on cherche si dernier digit >= 5
                    d = int(x[1][precision])
                    v = str(int(x[1][:precision]) + 1) if d >= 5 else str(int(x[1][:precision]))

                    # on retourne le résultat
                    return x[0]+v

            # nombre supérieur à 1
            else:
                # les zéros de la partie décimale compte, la precision a été réduite du nombre de digits avant virgule
                # precision peut être nul
                # On calcule le nombre de chiffres non nuls à conserver
                p = precision - len(x[0])

                # si p < 0 on retourne uniquement les zéros
                if p <= 0:
                    return x[0][:precision]
                else:
                    d = int(x[1][:precision])
                    v = str(int(x[1][:p]) + 1) if d >= 5 else x[1][:p]
                    return x[0] + v

    if precision <= 0:
        return number
    nombre = format(number,'.10f')
    s = str(nombre).split('.')

    # si le nombre est inférieur à 1, donc commence par zéro
    if s[0] == '0':
        return '0.' + _get_digits(s[1], precision, False)
    # Le nombre à gauche n'est pas nul
    else:
        p = precision - len(s[0])
        if p < 0:
            # notation scientifique
            f = "{:." + str(precision - 1) + "E}"
            x = f.format(number)
            return scinotation2latex(x)
        elif p == 0:
            f = '{:' + str(precision) + '.0f}'
            return f.format(number)
        else:
            # on doit vérifier si la première décimale est > 5
            return s[0] + "." + _get_digits(s[1], p, True)

def get_digits(nombre):
    """
    Compte le nombre de chiffres significatifs.
    Malheureusement les zéros à droite ne sont pas comptabilisé
    :param {float} nombre:
    :return: {int} nombre de CS
    """
    s = str(nombre).split(".")
    x = len(s[0].rstrip('0')+s[1]) if len(s) == 2 else len(s[0].rstrip('0'))
    return  x

def scinotation2latex(nombre):
    """
    transforme l'écriture scientifique x.xxEyyy (ex 1.34E+05) et notation scientifique x.xx10y

    :param {str} nombre:
    :return: {str} nombre formaté
    """
    if 'E' in nombre:
        x = nombre.split('E')
    elif 'e' in nombre:
        x = nombre.split('e')
    else:
        return nombre
    x[1] = x[1].replace('+','')
    x[1] = x[1].lstrip('0')
    return x[0] + "\\text{ x }10^{" + x[1] + "}"

def get_random_pwd(size = 12):
    import random
    element = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-*/~$%&.:?!"
    passwd = ""
 
    for i in range(size): 
        passwd = passwd + element[random.randint(0, len(element) - 1)]

    return passwd
