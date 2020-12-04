const ipc = require( 'electron' ).ipcRenderer



ipc.on("test1_ok", function( event, data ){
  console.log('retour referer1')
  console.log(data)
})


//ipc.send("test2")

ipc.on("test2_ok", function( event, data ){
  console.log('retour referer2')
  console.log(data)
})

console.log('Envoi')
ipc.send("test2")