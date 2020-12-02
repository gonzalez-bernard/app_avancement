"""
Module identification
"""
from datetime import datetime
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from hashlib import md5

import sys
import smtplib
import json
from py.utils import get_random_pwd
import py.classes.Database as DB
import py.classes.Session as SESSION

ERR_MAIL = "Une erreur inconnue s'est produite  lors de l'envoi du message"
ERR_DATABASE = "Une erreur inconnue s'est produite  lors de l'accès à la base de données"
GET_USER = "select * from dbuser where nom = '{0}' and password = '{1}'"
ADD_SESSION = "insert into dbsession (id_user, date) values ('{0}', '{1}')"
GET_LAST_INDEX = "select last_insert_rowid()"
GET_MAIL = "select * from dbuser where nom = '{0}' and email = '{1}'"


def connexion(nom: str, pwd: str) -> str(dict):
    """Gère la connexion d'un utilisateur

    Args:
        nom (str): nom
        pwd (str): mot de passe

    Returns:
        dbuser
    """
    try:
        users = dbase.execute(GET_USER.format(nom, pwd))
        if len(users) > 0:
            _user = DB.User()
            _user.set_fields(users[0])
            data.append({'id': users[0][0], 'nom': users[0][1]})
            print(json.dumps(_user.__dict__))
        else:
            print(json.dumps([]))

    except DB.DbError as err:
        print("OS error : {0}".format(err.arg))

    sys.stdout.flush()


def inscription(nom: str, pwd: str, email: str) -> str(dict):
    """Gère l'inscription d'un nouvel utilisateur

    Args:
        nom (str): nom
        pwd (str): mot de passe
        email (str): adresse mail

    Returns:
        dbuser
    """
    ADD_USER = "insert into dbuser (nom, password, email) values ('{0}','{1}','{2}') "

    try:
        result = dbase.execute(ADD_USER.format(nom, pwd, email), False)
        if result:
            id_user = dbase.execute(GET_LAST_INDEX)[0][0]
            _user = DB.User(_id=id_user, _nom=nom, _email=email)
            _user.set_password(pwd)
            print(json.dumps(_user.__dict__))
    except DB.DbError as err:
        print(json.dumps(str(err)))

    #f.close()
    sys.stdout.flush()


def new_session(id_user: str) -> str(dict):
    """Enregistre une nouvelle session

    Args:
        id_user (str): id de l'utilisateur

    Returns:
        dbsession
    """
    try:
        date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        result = dbase.execute(ADD_SESSION.format(datas['id_user'], date), False)
        if result:
            id_session = dbase.execute(GET_LAST_INDEX)[0][0]
            session = SESSION.Session(_id=id_session, _id_user=id_user, _date=date)
            print(json.dumps(session.__dict__))
    except DB.DbError:
        print(json.dumps({'error': 'new_session'}))


def compare_mail(nom: str,email: str) -> list(tuple):
    """Cherche l'existence d'un utilisateur dans la base

   Args:
       nom (str): nom
       email (str): email

   Returns:
       bool: si existe renvoie user sous la forme [(id:...,...)]
    """
    try:
        result = dbase.execute(GET_MAIL.format(nom, email), False)
        if result:
            return result
        return False
    except DB.DbError:
        return False


def send_mail(email: str, subject: str, message: str, cc_adr: str = '', bcc_adr: str = '') -> dict:
    """Envoi un mail à l'adresse indiquée avec un nouveau mot de passe

    Args:
        email (str): email destinataire
        cc_adr (str, optional): copie
        bcc_adr (str, optional): copie cachée
        subject (str): sujet
        message (str): message

    Returns:
        dict:  message d'erreur ou password
    """
    FROM = "bgspeedy1@gmail.com"

    message = MIMEMultipart()
    message['From'] = FROM
    message['To'] = email
    message['CC'] = cc_adr
    message['BCC'] = bcc_adr
    message['Subject'] = subject
    pwd = get_random_pwd(10)
    msg = message + "<b>" + pwd + "</b>"

    message.attach(MIMEText(msg.encode('utf-8'), 'html', 'utf-8'))

    texte = message.as_string().encode('utf-8')
    to_adds = [email] + [cc_adr] + [bcc_adr]

    try:
        serveur = smtplib.SMTP('smtp.gmail.com', 587)
        serveur.starttls()
        serveur.login(FROM, "celmdpdmdtg1")
        serveur.sendmail(FROM, to_adds, texte)
        serveur.quit()
        return {"success": pwd}

    except smtplib.SMTPException:
        return {"error": ERR_MAIL}


def update_pwd(user_id: str, pwd: str) -> dict:
    """Met à jour le mot de passe dans la base

    Args:
        user (str): id user
        pwd (str): pass

    Returns:
        dict: message ou password
    """
    UPDATE_PWD = "update dbuser set password = '{0}' where id = {1}"
    pwd = md5(pwd.encode('utf-8')).hexdigest()
    try:
        result = dbase.execute(UPDATE_PWD.format(pwd, user_id), False)
        if result:
            return {"success": pwd}
        else:
            return {"error": 'update_pwd'}
    except DB.DbError:
        return {"error": ERR_DATABASE}


arg = json.loads(sys.argv[1])
func = arg['func'] if 'func' in arg else None
datas = arg['datas']
data = []
dbase = DB.DbMysql("./identification/avancement.db")
dbase.connect()

if func == 'connexion':
    connexion(datas['nom'], datas['pwd'])
elif func == 'inscription':
    inscription(datas['nom'], datas['pwd'], datas['email'])
elif func == 'new_session':
    new_session(datas['id_user'])
elif func == 'recover':
    user = compare_mail(datas['nom'], datas['email'])
    if user:
        r = send_mail(email = datas['email'], subject = datas['subject'], \
        message = datas['message'])
        if 'success' in r:
            r = update_pwd(user[0][0], r['success'])
        print(json.dumps(r))
    else:
        print(json.dumps({'error': 0}))
