var postcss = require( "postcss" );

function round( type, unit, precision ) {
  var p = Math.pow( 10, precision );
  return Math[ type ]( unit * p ) / p;
}

module.exports = postcss.plugin( "postcss-dpr-px", function( opts ) {
  var dpr, rounding;

  opts = opts || {};
  dpr = typeof opts.dpr === "number" ? opts.dpr : 1;

  switch( opts.rounding ) {
  case "round":
  case "ceil":
  case "floor":
    rounding = opts.rounding;
    break;
  default:
    rounding = "round";
  }

  return function( css ) {
    css.eachDecl( function( decl ) {
      var newValue,
          value = decl.value;

      if ( value.indexOf( "px" ) === -1 ) {
        return;
      }

      newValue = value.replace( /(\d*\.?\d+)px/ig, function( match, p1 ) {
        return round( rounding, p1 / dpr, 2 ) + "px";
      });

      decl.value = newValue;
    });
  };
});
