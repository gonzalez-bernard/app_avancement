import sys
import json
import py.classes.Database as DB
import py.classes.Session as SESSION
from datetime import datetime
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from py.utils import get_random_pwd

ID_HTML_MAIL_MESSAGE = "<p>Ceci est un message</p><p>Le mot de passe est : <b>"



def send_mail():

    FROM = "bgspeedy2@gmail.com"
    to = datas['dest']  ##  Spécification des destinataires
    cc = datas['cc']  ## Spécification des destinataires en copie carbone (cas de plusieurs destinataires)
    bcc = datas['bcc']  ## Spécification du destinataire en copie cachée (en copie cachée)

    message = MIMEMultipart()  ## Création de l'objet "message"
    message['From'] = FROM  ## Spécification de l'expéditeur
    message['To'] = to  ## Attache du destinataire à l'objet "message"
    message['CC'] = cc
    message['BCC'] = bcc  ## Attache du destinataire en copie cachée à l'objet "message"
    message['Subject'] = datas['subject']  ## Spécification de l'objet de votre mail
    msg = ID_HTML_MAIL_MESSAGE  ## Message à envoyer
    msg = msg + get_random_pwd(10) +"</b></p>"

    message.attach(MIMEText(msg.encode('utf-8'), 'html', 'utf-8'))


    texte = message.as_string().encode('utf-8')
    Toadds = [to] + [cc] + [bcc]  ## Rassemblement des destinataires

    try:
        serveur = smtplib.SMTP('smtp.gmail.com',587)
        serveur.starttls()
        serveur.login(FROM, "celmdpdmdtg1")
        serveur.sendmail(FROM, Toadds, texte)  ## Envoi du mail
        serveur.quit()  ## Déconnexion du serveur
        print(json.dumps("Message envoyé"))
    except smtplib.SMTPException as e:
        print(e)

datas = {}
datas['dest'] = "gonzalez.b@free.fr"
datas['cc'] = ""
datas['bcc'] = ""
datas['subject'] = "TEST"
datas['message'] = "C'est OK"

send_mail()