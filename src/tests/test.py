import sys
import json
#from py.classes.Equation import *

def return_text():
  print(sys.argv[1:]+"\n")
  sys.stdout.flush()

def return_json():
  #s="4,6,7"
  #z = s.strip('][').split(',') 

  for i in range(1,len(sys.argv)):
    e = (json.loads(sys.argv[i]))
    if isinstance(e,list):
      if isinstance(e[1],list):
        pass

  # construction et envoi des données
  t = [8,{'s':3},{'e':5}]
  t = [json.dumps(x) for x in t]

  # envoi des données
  print(json.dumps(t))
  sys.stdout.flush()

return_json()


