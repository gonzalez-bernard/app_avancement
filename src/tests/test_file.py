import os

FILE = 'equations.csv'
ROOT = '/home/speedy/developpement/electron/avancement'

print("OS : "+os.getcwd())
x = os.path.dirname(os.getcwd())
print(x)
x = os.path.dirname(x)
print(x)
print(os.path)
print(os.path.basename(ROOT))

def getFilePath(fichier, rep):
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

    # si pas trouvé, renvoie une chaine vide
    return None

chemin = getFilePath(FILE,ROOT)
if chemin:
    print(chemin)
    with open(chemin+"/"+FILE, 'r') as eqFile:
        pass

else:
    print("pas trouvé")

#self.FILE_EQUATIONS = os.path.dirname(os.getcwd())+Equation.FILE_EQUATIONS

import os


