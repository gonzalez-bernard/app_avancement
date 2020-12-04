#!/usr/bin/env python
from pprint import pprint

from equation.Equation import *
data = []
counter = 0

e = Equations()
eqs = e.get_equations()
eq = eqs[5]
pprint(eq)
pprint(eq.coeffs)
pprint(eq.massesmolaires)
pprint(eq.get_equation_equilibree())
pprint(eq.get_coeffs())
