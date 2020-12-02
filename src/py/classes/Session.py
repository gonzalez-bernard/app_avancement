# coding: utf-8
# from hashlib import md5
from constantes import *


ID = 0
NAME = 1
PASS = 2
NIVEAU = 3
TYPE = 4

# états
ETAT_USER_IDENTIFIE = 1
ETAT_EQUATION_VALIDE = 2
ETAT_AVANCEMENT_VALIDE = 4


class Session:
    """
    Une session enregistre les différents paramètres lorsqu'un utilisateur s'identifie
    On enregistre :
    - le numéro de session
    - l'identifiant de l'utilisateur
    - la date de connexion
    - le nombre de tentative de réponse
    """

    def __init__(self, _id, _id_user, _date):
        self.id = _id          # id session
        self.id_user= _id_user      # id utilisateur
        self.date = _date

    def exit(self):
        """
        Sortie du programme

        :return: None
        """
        self.id_user = 0

