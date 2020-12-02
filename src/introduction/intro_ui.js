import {HTML} from "./msg.js"

import {init_equation} from "../equation/equation_ui.js"
import {init_problem} from "../problem/problem_ui.js"

//var init_equation = require( "../equation/equation_ui" ).init_equation

$( "#introduction" ).html( HTML )

var run = function() {
  $( "#mnu_introduction" ).removeClass( "active" )
  $( "#introduction" ).removeClass( "show active" )
  $( "#mnu_equation" ).addClass( "active" )
  $( "#equation" ).addClass( "show active" )
  $( "#mnu_equation" ).removeClass( "disabled disabledTab" )
  $( "#mnu_problem" ).removeClass( "disabled disabledTab" )
  init_equation()
  init_problem()
}


$( "#in_bt_run" ).on( "click", run )