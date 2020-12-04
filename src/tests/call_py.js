exec_python = function(event,url, msg, options) {
  var {
    PythonShell
  } = require('python-shell');
  
  
  if (options.mode == 'json') {
    /*
    for (var i = 0; i<options.args.length; i++){
        options.args[i]=JSON.stringify(options.args[i])
    }
  */
    options.args = JSON.stringify(options.args)

  }


  // Appel python et met à jour le DOM
  PythonShell.run(url, options, function(err, results) {
    if (err) throw err;
    
    var result = results[0]
    if (options.mode == 'json'){
        for (var i=0; i< result.length; i++) {
            result[i] = JSON.parse(result[i])
        }
    }

    event.sender.send(msg, result)
  });
  
}

exports.test1 = function(event) {
  let options = {
    mode: 'text',
    args: [3,5,'toto']
  };
  exec_python(event, './tests/test.py', 'test1_ok', options)
}

exports.test2 = function(event, data) {
  let options = {
    mode: 'json',
    pythonOptions: ['-u'],
    args: data
  }
  exec_python(event, './tests/test.py', 'test2_ok', options)
}

exports.test_bokeh = function(event, data) {
  let options = {
    mode: 'json',
    pythonOptions: ['-u'],
    args: data
  }
  exec_python(event, './py/graphs/bokeh_bar.py', 'test_bokeh_ok', options)
}

exports.test_getProblems = function(event, data) {
  let options = {
    mode: 'json',
    pythonOptions: ['-u'],
    args: data
  }
  exec_python(event, './tests/test_getProblems.py', 'test_getProblems_ok', options)
}

