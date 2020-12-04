import py.constantes as cts
import py.classes.Database as DB
import py.classes.Session as S
import json
from datetime import datetime
from hashlib import md5

import sqlite3

GET_USER = "select * from dbuser where nom = '{0}' and password = '{1}'"
ADD_USER = "insert into dbuser (nom, password) values ('{0}','{1}') "
GET_LAST_INDEX = "select last_insert_rowid()"
ADD_SESSION = "insert into dbsession (id_user, date) values ('{0}', '{1}')"
GET_MAIL = "select * from dbuser where nom = '{0}' and email = '{1}'"
UPDATE_PWD = "update dbuser set password = '{0}' where id = {1}"
ERR_DATABASE = "Une erreur inconnue s'est produite  lors de l'accès à la base de données"

dbase = DB.DbMysql("./../identification/avancement.db")
dbase.connect()

def update_pwd(user, pwd):
    try:
        pwd = md5(pwd.encode('utf-8')).hexdigest()
        user = dbase.execute(GET_USER.format(datas['nom'], datas['pwd']), False)
        result = dbase.execute(UPDATE_PWD.format(pwd, user[0][0]), False)
        if result:
            return {"success": 'update_pwd'}
        else:
            return {"error": 'update_pwd'}
    except DB.DbError as err:
        return {"error": ERR_DATABASE}

def compare_mail():
    """
    Compare le mail saisi avec celui présent dans la base
    Si concordance on envoie le mail sinon message d'erreur
    :return: bool
    """

    try:
        result = dbase.execute(GET_MAIL.format(datas['nom'], datas['email']), False)
        if result:
            user_id = dbase.execute(GET_LAST_INDEX)[0][0]
            user = DB.User(_id=user_id, _nom=datas['nom'], _email=datas['email'])
            return True
        return False
    except DB.DbError as err:
        return False

def add_session():
    try:
        date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        result = dbase.execute(ADD_SESSION.format(3, date), False)
        if result:
            id = dbase.execute(GET_LAST_INDEX)[0][0]
            session = S.Session(_id=id, _id_user=3, _date = date )
            print(json.dumps(session.__dict__))
    except DB.DbError as err:
        print(json.dumps(str(err)))

    '''
    #users = dbase.execute(GET_USER.format('tototo','ca1eb00c94f48847c54db3e8f435a33b'))
    #sql = ADD_USER.format('tototo', 'ca1eb00c94f48847c54db3e8f435a33b')
    result = dbase.execute(sql, False)
    if result:
        id = dbase.execute(GET_LAST_INDEX)[0][0]
        user = DB.User(_id=id, _nom='tototo')
        user.set_password('ca1eb00c94f48847c54db3e8f435a33b')
    #print(users)
    print(user.__dict__)
#   print(err)
except DB.DbError as err:
    x = json.dumps(str(err))
    print(x)
    '''

datas = {}
datas['nom'] = 'tototo'
datas['pwd'] = '3grh&*B1uz'
datas['email'] = 'gonzalez.b@freee.fr'
user = [(1,'tototo',1,1)]
pwd = "654321"
#compare_mail()
update_pwd(user, pwd)