from bokeh.plotting import Figure
from bokeh.embed import json_item
from bokeh.layouts import column
from bokeh.models import ColumnDataSource, CustomJS, Button
import json
import sys

# définition des données
x = [x*0.005 for x in range(0, 200)]
y = x

# paramètres pour animation
# tags [debut, fin, pas, timer (en microseconde)]
tags=[1, 10, 0.01, 1]

# définition de la source
source = ColumnDataSource(data=dict(x=x, y=y), tags=tags)

# dessin
p = Figure(plot_width=400, plot_height=400)
p.line('x', 'y', source=source, line_width=3, line_alpha=0.6)

# création du bouton
bt = Button(label = "Lance", button_type = "success")

# fonction de callback
callback =  CustomJS(args=dict(source=source, anim = tags), code="""
        var data = source.data;
        var x = data['x']
        var y = data['y']
        var f = anim[0];
        
        cb_obj.origin.disabled = true

        function app(f) {
            for (var i = 0; i < x.length; i++) {
                y[i] = Math.pow(x[i], f)
            }
            source.change.emit();
            
            if (f >= anim[1]) {
                cb_obj.origin.disabled = false;
                return;
            }
            setTimeout(function()
            {
                app(f+anim[2]);
            }, anim[3])
        }
        
        app(f);
    """ )

bt.js_on_click(callback)
layout = column(p, bt)

#show the results
item_text = json.dumps(json_item(layout, "myplot"))
print(item_text)
sys.stdout.flush()
