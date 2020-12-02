from bokeh.plotting import Figure
from bokeh.embed import json_item
from bokeh.layouts import column
from bokeh.models import ColumnDataSource, CustomJS, Button, Range1d
from bokeh.transform import linear_cmap
from bokeh.palettes import Spectral6
import json
import sys


# définition des données
data = json.loads(sys.argv[1])[0]

especes = data['especes']
data_x = [[x] for x in especes ]
quantites = data['quantites']
data_top = [[x] for x in quantites]
evolution = data['coeffs']
data_grow = [[x] for x in evolution]
labels = especes

color = ['red','blue','yellow','cyan','green']
bottom = 0
width = 0.5

# paramètres pour animation
# tags [debut, fin, pas, timer (en microseconde), type = "add, mul"]
anim=[1, 20, 1, 100, "add"]

# dessin
p = Figure(x_range = especes, title="Evolution", plot_width=400, plot_height=400,toolbar_location = None)
p.title.text_font_size = "25px"
p.xaxis[0].axis_label = 'Quantités'
p.yaxis[0].axis_label = 'Espèces'

#p.x_range = ['A','B']
p.y_range = Range1d(start=0, end=10)

# définition de la source
source = [ColumnDataSource(data=dict(x=data_x[i], top=data_top[i], grow = data_grow[i])) for i in range(len(especes))]

for i in range(len(especes)):
    p.vbar(x='x', top='top', width = width, bottom = bottom, color = color[i],
    source = source[i], legend_label= labels[i])

# création du bouton
container_buttons_problem = Button(label = "Lance", button_type = "success")

# fonction de callback
callback =  CustomJS(args=dict(source=source, anim = anim), code="""
    
    var data = new Array(source.length)
    var x = new Array(source.length)
    var top = new Array(source.length)
    var grow = new Array(source.length)
    var prev_top = new Array(source.length)
    var odata = new Array(source.length)

    function init(){
        for (var i = 0; i<source.length; i++){
            x[i] = source[i].data['x']
            top[i] = source[i].data['top']
            grow[i] = source[i].data['grow'][0]
            prev_top[i] = top[i]
            let oTop = [].concat(top[i])
            odata[i] = oTop            
        }

    }
    
    function app(f) {
        for (var i = 0; i < source.length; i++) {
            if (anim[4] == "add")
                top[i][0] = parseFloat(top[i][0]+grow[i],10)
            else if (anim[4] == "mul")
                top[i][0] = top[i][0]*grow[i]
            //source[i].data['top'] = top[i]
            source[i].change.emit();
        }
        console.log("top : "+top)
                        
        if (f >= anim[1]) {
            cb_obj.origin.disabled = false;
            for (var i = 0; i<source.length; i++){      // fait un reset
                source[i].data['top']=odata[i]
            }
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
