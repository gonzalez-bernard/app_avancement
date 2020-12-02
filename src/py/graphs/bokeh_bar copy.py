from bokeh.plotting import Figure
from bokeh.embed import json_item
from bokeh.layouts import column
from bokeh.models import ColumnDataSource, CustomJS, Button, Range1d
from bokeh.transform import linear_cmap
from bokeh.palettes import Spectral6
import json
import sys

# définition des données

data_x = ['A','B']
data_top = [10,80]
data_grow = [1.1,0.9]
labels = ["courbe 1", "courbe 2"]

#data_x = [x1,x2]
#data_top = [top1,top2]

color = ['red','blue']
bottom = 0
width = 0.5

# paramètres pour animation
# tags [debut, fin, pas, timer (en microseconde), type = "add, mul"]
anim=[1, 10, 1, 50, "mul"]

# définition de la source
source = ColumnDataSource(data=dict(x=data_x, top=data_top, color = color, grow = data_grow))

# dessin
p = Figure(title="graph bar", x_range=data_x, y_range=(0,100), plot_height=400,toolbar_location = None)
p.title.text_font_size = "25px"
p.yaxis[0].axis_label = 'Quantité'
p.xaxis[0].axis_label = 'Espèces'

p.y_range = Range1d(start=0, end=100)

p.vbar(x='x', top='top', width = width, bottom = bottom, color = 'color', source = source, legend_field = 'x')
p.legend.orientation = "horizontal"
p.legend.location = "top_center"

# création du bouton
bt = Button(label = "Lance", button_type = "success")

# fonction de callback
callback =  CustomJS(args=dict(source=source, anim = anim), code="""
    
    var data = new Array(source.length)
    var x = new Array(source.length)
    var top = new Array(source.length)
    var grow = new Array(source.length)
    var prev_top = new Array(source.length)
    var odata = new Array(source.length)

    function init(){
        x = source.data['x']
        top = source.data['top']
        grow = source.data['grow']
        prev_top = top
        let oTop = [].concat(top)
        odata = oTop
    }
    
    function app(f) {
        for (var i = 0; i < x.length; i++) {
            if (anim[4] == "add")
                top[i] = parseInt(top[i]+grow[i],10)
            else if (anim[4] == "mul")
                top[i] = top[i]*grow[i]
        }
        source.change.emit();
        console.log(top)
                        
        if (f >= anim[1]) {
            cb_obj.origin.disabled = false;
            source.data['top']=odata
            return;
        }
        setTimeout(function()
        {
            app(f+anim[2]);
        }, anim[3])
    }

    var f = anim[0];        
    cb_obj.origin.disabled = true    
    init()
    app(f);
    
    """ )

bt.js_on_click(callback)
layout = column(p, bt)

#show the results
item_text = json.dumps(json_item(layout, "myplot"))
print(item_text)
sys.stdout.flush()
