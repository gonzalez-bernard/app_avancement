"""
Récupération problème
"""
import json
import sys
import src.settings
from src.problem.Problem import Problem

_pb = Problem()

args = sys.stdin.readlines()
data = json.loads(args[0])

html = _pb.getProblem(data)
'''
else:
    html = _pb.getProblem()
'''
print(json.dumps(html))
