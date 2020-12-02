import sqlite3
import os
import re

SELECT_ALL = 0
SELECT_ONE = 1


class User:

    def __init__(self, _id=0, _nom='', _email=''):
        self.id = _id
        self.nom = _nom
        self.email = _email
        self.password = ''
        self.niveau = 1
        self.droits = 1

    def set_password(self, _pwd):
        self.password = _pwd

        
    def set_fields(self, req):
        """
        Initialise les champs avec le retour de la requête
        :param req List liste des valeurs de retour
        """
        i = 0
        for id in ['id','nom','password','niveau','droits']:
            setattr(self,id,req[i])
            i += 1


class DbQuestion:

    def __init__(self, _question, _session):
        self.id_question = _question
        self.id_session = _session
        self.is_ok = False


class DbSession:
    def __init__(self, _session, _nom, _nombre_essais):
        self.id_session = _session
        self.nom = _nom
        self.nombre_essais = _nombre_essais


data = {'host': 'localhost', 'database': 'avancement', 'user': 'bernard', 'password': 'Qjafcunuas3.14'}


class DbError(sqlite3.Error):

    def __init__(self,arg):
        self.arg = arg


class DbMysql:
    def __init__(self, database):
        self.database = database
        self.connexion = None
        self.cursor = None

    def close(self):
        self.cursor.close()
        self.connexion.close()

    @staticmethod
    def debug(msg):
        f = open('database.log', 'a')
        f.write(msg)
        f.close()

    def connect(self):
        """
        Initie la connexion à la base de données
    
        Returns
        -------
        dict connexion et cursor
        """
        self.connexion = sqlite3.connect(self.database)
        self.cursor = self.connexion.cursor()

    def execute(self, query, close=True, mode=SELECT_ALL, **args):
        """
        Execute une requête
    
        :param query: requête avec les paramètres sous forme %s
        :type query: str
        :param args: arguments de la requête (tuple), si 1 seul élément il faut quand même un tuple args =(elt, )
        :type args: dict
        :param mode: précise lors d'une requête select_equation (SELECT_ALL) | SELECT_ONE
        :type mode: int
        :param close: précise si on doit fermer la connexion (True) | False
        :type close: bool
    
        :return: liste des enregistrements ou enregistrement unique | False
        :rtype: list | data
        """
        data = []
        if self.cursor:
            try:
                self.cursor.execute(query, args)
                motif = r'^\S*'
                r = re.compile(motif)
                v = r.findall(query)
                if v[0].lower() == 'select':
                    if mode == SELECT_ALL:
                        data = self.cursor.fetchall()
                    else:
                        data = self.cursor.fetchone()
                else:
                    self.connexion.commit()
                    if v[0].lower() == 'INSERT':
                        data = self.cursor.lastrowid
                    else:
                        data = True
            except sqlite3.Error as e:
                self.debug("Database error: %s \n" % e)
                s = DbError(e)
                raise s
            finally:
                if close:
                    self.close()
        return data


