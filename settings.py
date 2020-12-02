# SECURITY WARNING: don't run with debug turned on in production!
import os

if os.environ.get('ENV') == 'PRODUCTION':
    DEBUG = False
else:
    DEBUG = True

SECRET_KEY = os.environ.get('SECRET_KEY', 'c@n%u@91tum=@j392g20b8znh7dqfo-v%81))gxbbmu$=dy_*)') # development key for the moment

ALLOWED_HOSTS = ['avancement.herokuapp.com']