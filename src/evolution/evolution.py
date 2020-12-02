from bokeh.plotting import Figure
from bokeh.embed import json_item
from bokeh.layouts import column, row
from bokeh.models import ColumnDataSource, CustomJS, Button, Range1d
from bokeh.transform import linear_cmap
from bokeh.palettes import Spectral6
import json
import sys
import settings

# définition des données
args = sys.stdin.readlines()
data = json.loads(args[0])[0]

especes = data['especes']

data_x = [[x] for x in especes ]
quantites = data['quantites']
data_top = [[x] for x in quantites]
evolution = data['coeffs']
data_grow = [[x] for x in evolution]
reste = data['reste']
labels = especes

color = ['red','blue','yellow','cyan','green']
bottom = 0
width = 0.5

# constantes pour anim
PAS_DEBUT = 0
PAS_FIN = 1
PAS = 2
TIMER = 3
FONCTION = 4
PAS_COURANT = 5

# paramètres pour animation
# tags [debut, fin, pas, timer (en microseconde), type = "add, mul"]

anim=[1, 40, 1, 300, "add", 1]

# dessin
p = Figure(x_range = especes, title="Evolution", plot_width=800, plot_height=500,toolbar_location = None)
p.title.text_font_size = "25px"
p.xaxis[0].axis_label = 'Espèces'
if data['unite'] == 1:
    p.yaxis[0].axis_label = 'Quantités (mol)'
else:
    p.yaxis[0].axis_label = 'Masses (g)'

# Calcul longueur axe
max = max(max(quantites), max(reste))*1.2
p.y_range = Range1d(start=0, end=max)

# définition de la source
source = [ColumnDataSource(data=dict(x=data_x[i], top=data_top[i], grow = data_grow[i])) for i in range(len(especes))]

for i in range(len(especes)):
    p.vbar(x='x', top='top', width = width, bottom = bottom, color = color[i],
    source = source[i], legend_label = labels[i])

p.legend.orientation = "horizontal"
p.legend.location = "top_center"
p.legend.click_policy = "hide"
p.legend.glyph_width = 60

# création du bouton
bt = Button(label = "Lance", id = '1', button_type = "success")
btp = Button(label = "Pause", id = '2', button_type = "warning")


# fonction de callback
callback = CustomJS(args=dict(source=source, anim = anim), code="""
    
    let data = new Array(source.length)
    let top = new Array(source.length)
    let grow = new Array(source.length)
    let init_top = new Array(source.length)
    let odata = new Array(source.length)

    let pas = 1;
    let timer;

    // Constantes pour anim
    const PAS_DEBUT = 0
    const PAS_FIN = 1
    const PAS = 2
    const TIMER = 3
    const FONCTION = 4
    const ETAT = 5

    let current_button = cb_obj.origin

    function init(pas){
        for (let i = 0; i<source.length; i++){
            top[i] = source[i].data['top']
            grow[i] = source[i].data['grow'][0]
            init_top[i] = top[i].slice()
            odata[i] = [].concat(top[i])           
        }

        timer = setInterval(function()  {app();}, anim[3])
        anim[ETAT] = 1 
    }
    
    function app() {
        
        pas = anim[PAS_DEBUT]
        
        if (anim[ETAT] != 0) {

            // pour chaque élément
            for (var i = 0; i < source.length; i++) {
                if (anim[FONCTION] == "add") {
                    top[i][0] = parseFloat(init_top[i][0]+pas*grow[i],10)
                }
                else if (anim[FONCTION] == "mul")
                    top[i][0] = init_top[i][0]*pas*grow[i]
                if (top[i][0] <= 0)
                    anim[ETAT] = 0     // arrêt
                source[i].change.emit();
            }
        }
                        
        if (pas >= anim[PAS_FIN] || anim[ETAT]==0) {
            current_button.disabled = false;
            for (var i = 0; i<source.length; i++){      // fait un reset
                source[i].data['top']=odata[i]
            }
            clearInterval(timer)
            return;
        }

        pas += anim[PAS]
        anim[PAS_DEBUT] = pas
    }

    
    current_button.disabled = true    
    if (current_button.properties.id.spec.value == 1){
        anim[PAS_DEBUT] = 1
        init(1)
    } else {
        if (anim[ETAT] == 1) {
            current_button.properties.label.spec.value = "Reprise"
            anim[ETAT] = 0
            clearInterval(timer)
        } else {
            current_button.properties.label.spec.value = "Pause"
            init(anim[0])
        }
        current_button.disabled = false;
    }
    
    """ )


def run(event, op):
    anim[5] = op
    event.target.js_on_click(callback)


bt.js_on_click(callback)
btp.js_on_click(callback)

buttons = row(bt,btp)
layout = column(p, buttons)


#show the results
item_text = json.dumps(json_item(layout))

print(item_text)
sys.stdout.flush()