from bokeh.plotting import Figure
from bokeh.embed import json_item
from bokeh.layouts import column
from bokeh.models import ColumnDataSource, CustomJS, Button, Range1d
from bokeh.transform import linear_cmap
from bokeh.palettes import Spectral6
import json
import sys
import numpy as np

# définition des données

# abscisses et ordonnées des 2 points des 2 courbes
data_x = [[0,10],[0,20],[0,10]]
data_y = [[2*x for x in data_x[0]],[3*x for x in data_x[1]], [60,50]]

color = ['red','blue','yellow','cyan','green']

# paramètres pour animation
# tags [debut, fin, pas, timer (en microseconde)]
anim=[1, 10, 0.5, 100]

# définition de la source
def init_source():
    source1 = ColumnDataSource(data=dict(x=data_x[0], y=data_y[0]))
    source2 = ColumnDataSource(data=dict(x=data_x[1], y=data_y[1]))
    source3 = ColumnDataSource(data=dict(x=data_x[2], y=data_y[2]))

    return [source1, source2, source3]

source = init_source()
oSource = list(source)

# dessin
p = Figure(plot_width=400, plot_height=400)

# Axes
p.y_range = Range1d(start=0, end=100)
p.x_range = Range1d(start=0, end=50)

# dessin
for i in range(3):
    p.line(x='x', y='y', line_width = 2, line_color = color[i],source = source[i])

# création du bouton
bt = Button(label = "Lance", button_type = "success")

# fonction de callback
callback = CustomJS(args=dict(source=source, p = p, anim = anim), code="""
    
    var x = new Array(source.length)
    var y = new Array(source.length)
    var c = new Array(source.length)        // coefficient de la droite
    var odata = new Array(source.length)    // sert à faire un reset des données
        
    function init(){
        for (var i = 0; i<source.length; i++){
            x[i] = source[i].data['x']
            y[i] = source[i].data['y']
            c[i] = (y[i][1]-y[i][0])/(x[i][1]-x[i][0])
            let ox = [].concat(x[i])
            let oy = [].concat(y[i])
            odata[i]=[ox,oy]
        }
    }
        

    function app(f) {
        for (var i = 0; i < source.length; i++) {
            x[i][1] = x[i][1]+1
            y[i][1] = x[i][1]*c[i] + y[i][0]    // calcul coordonnées
            source[i].change.emit();
        }

        if (f >= anim[1]) {
            cb_obj.origin.disabled = false;
            for (var i = 0; i<source.length; i++){      // fait un reset
                source[i].data['y']=odata[i][1]
                source[i].data['x']=odata[i][0]
            }
            return;
        }
        
        setTimeout(function()
        {
            app(f+anim[2]);
        }, anim[3])
    }
    
    init()
    var f = anim[0];
    cb_obj.origin.disabled = true
    app(f);

    """ )

bt.js_on_click(callback)
layout = column(p, bt)

#show the results
item_text = json.dumps(json_item(layout, "myplot"))
print(item_text)
sys.stdout.flush()
