"""
Tests problem
"""
import json
#import settings
from src.problem.Problem import Problem


s = Problem()
s.html = s.getProblem(2)

print(json.dumps(s.html))