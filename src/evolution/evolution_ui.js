import {EV_GET_HTML} from "./msg.js" 

var init_evolution = function() {

  var eq = JSON.parse( sessionStorage.equation )

  // Affichage
  var html = EV_GET_HTML( eq.equation_equilibree )
  $( "#evolution" ).html( html )
  $("#ev_myplot").empty()
  
  // Mise en forme des données
  let especes = []
  let r = eq.reactifs.map( x => x[ 0 ] )
  let p = eq.produits.map( x => x[ 0 ] )
  especes = r.concat( p )


  // Calcul des coeffs de telle façon quand 20 pas on obtienne xmax
  if (eq.unite==1){
    let xmax = eq.avancement.xmax
  } else {
    let rl = eq.avancement.reactif_limitant // nom réactif reactif_limitant
    for (var indice in eq.reactifs){
      if (eq.reactifs[indice][0] == rl){
        break;
      }
    }
    let xmax = eq.quantites[indice]
  }
  let coeff = []
  let rl = eq.reactifs.length
  for ( var i = 0; i < rl; i++ ) {
    coeff.push( -eq.coeffs[ i ] * xmax / 20 )
  }
  for ( let i = rl; i < rl + eq.produits.length; i++ ) {
    coeff.push( eq.coeffs[ i ] * xmax / 20 )
  }

  // quantité restante
  let reste = eq.avancement.reste_mol

  // gestion du clic sur bouton pour afficher l'aide
  $( "#ev_bt_aide" ).on( "click", function() {
    $( "#ev_info" ).show()
  } )

  // Appel du fichier evolution.py chargé de l'affichage du graphe
  
  let data = [ {
    especes: especes,
    coeffs: coeff,
    quantites: eq.quantites,
    unite: eq.unite,
    reste: reste
  } ]

  socket.emit( "dspEvolution", data )

  // Place le graphe dans le container prévu
  socket.once( 'dspEvolution_ok', function(data ) {
    Bokeh.embed.embed_item( data, "ev_myplot" );
  })
  
}

export {init_evolution}