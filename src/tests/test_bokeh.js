const ipc = require( 'electron' ).ipcRenderer


ipc.on("test_bokeh_ok", function( event, data ){
  console.log('retour referer2')
  console.log(data)
  Bokeh.embed.embed_item(data);
})

console.log('Envoi')
data = [{especes:['CH4','CO2','H2O'], coeffs: [-0.1,-0.2,0.2], quantites:[4,6,0]}]
ipc.send("test_bokeh",data)

