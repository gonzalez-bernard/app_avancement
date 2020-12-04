"""
Avancement
"""
import sys
import json
import src.settings

import src.py.constantes as cts
from src.equation.Equation import Equation


def calc_avancement(equ: dict):
    """Calcule tous les paramètres concernant l'avancement

    Args:
        equ (dict): Equation cf. classe Equation

    Returns:
        Equation: equation
    """

    # Récupération des données
    equ = Equation.dict2equation(equ)

    reac = equ.reactifs
    prod = equ.produits

    # construction et envoi des données
    # calcul reactif limitant
    coeff = equ.coeffs
    quantites = equ.quantites
    unite = equ.unite
    masses_molaires = equ.massesmolaires

    # si unite est en gramme, il faut convertir en mol.
    if unite == 2:
        moles = []
        # parcours réactifs
        for i in range(len(reac)):
            # on récupère tableau des structures moléculaires
            moles.append(round(quantites[i]/masses_molaires[i],3))

        # parcours produits
        for i in range(len(prod)):
            # on récupère tableau des structures moléculaires
            moles.append(round(quantites[i+len(reac)]/masses_molaires[i+len(reac)],3))

    else:
        moles = quantites

    # calcul indice espèce limitante
    lim_indice = [moles[i] / coeff[i] for i in range(len(reac))]
    index = lim_indice.index(min(lim_indice))

    # xmax
    xmax = lim_indice[int(index)]

    # quantité restante en moles
    qtr = [round(moles[i] - xmax * coeff[i],3) for i in range(len(reac))]
    qtp = [round(moles[i] + xmax * coeff[i],3) for i in range(len(reac), len(reac) + len(prod))]
    qtm = qtr + qtp

    # quantité restante en gramme
    qtg = [round(qtm[i] * masses_molaires[i],3) for i in range(len(qtm))]

    # recherche des réactifs epuisés
    qlim = [int(v) for v in qtr if v == 0]

    # réactifs en proportions stoechimoétriques
    if qlim == qtr:
        stoechio = 1
        reactif_limitant = "Aucun"
    else:
        stoechio = 0
        # espece limitante
        reactif_limitant = reac[index][0]

    equ.avancement = {"stoechio": stoechio, "xmax": xmax,
        "reactif_limitant": reactif_limitant, "reste_mol": qtm, "reste_gramme": qtg}

    # envoi des données
    print(json.dumps(equ.__dict__))
    sys.stdout.flush()


args = sys.stdin.readlines()
arg = json.loads(args[0])
func = arg['func'] if 'func' in arg else None
equation = arg['datas']['equation']

if func == "calc_avancement":
    calc_avancement(equation)
