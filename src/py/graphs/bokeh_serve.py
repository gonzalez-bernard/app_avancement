import time

from bokeh.io import curdoc
from bokeh.layouts import column
from bokeh.models import Button, CustomJS
from bokeh.plotting import figure
import json
from bokeh.embed import file_html, json_item

p = figure()
p.circle([1,2,3,4,5], [2,6,3,1,6])

dummy = p.circle([1], [2], alpha=0)
dummy.glyph.js_on_change('size', CustomJS(code="""
alert(cb_obj.size.value)
"""))

b = Button()
def cb():
    dummy.glyph.size = 10
    time.sleep(5)
    dummy.glyph.size = 20

b.on_click(cb)

layout = column(p, b)
curdoc().add_root(column(b, p))

#show the results
#item_text = json.dumps(json_item(layout, "myplot"))
#print(item_text)
