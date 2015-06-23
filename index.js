var postcss = require( "postcss" );

function floor( unit, precision ) {
  var p = Math.pow( 10, precision );
  return Math.floor( unit * p ) / p;
}

module.exports = postcss.plugin( "postcss-dpr-px", function( opts ) {
  var dpr;

  opts = opts || {};
  dpr = typeof opts.dpr === "number" ? opts.dpr : 1;

  return function( css ) {
    css.eachDecl( function( decl ) {
      var newValue,
          value = decl.value;

      if ( value.indexOf( "px" ) === -1 ) {
        return;
      }

      newValue = value.replace( /(\d*\.?\d+)px/ig, function( match, p1 ) {
        return floor( p1 / dpr, 2 ) + "px";
      });

      decl.value = newValue;
    });
  };
});
