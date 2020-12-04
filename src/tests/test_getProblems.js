const ipc = require( 'electron' ).ipcRenderer


ipc.on("test_getProblems_ok", function( event, data ){
  lst_problems = data['problem']
  lst_problems.forEach( function(element, index) {
    console.log(element['question'])
  });
})

ipc.send("test_getProblems")