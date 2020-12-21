"""
Récupération problème
"""
import json
import sys

from Problem import Problem

_pb = Problem()

args = sys.stdin.readlines()
data = json.loads(args[0])

html = _pb.getProblem(data)

print(json.dumps(html))
