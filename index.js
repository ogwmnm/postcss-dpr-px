var postcss = require( "postcss" );

function round( type, unit, precision ) {
  var p = Math.pow( 10, precision );
  return Math[ type ]( unit * p ) / p;
}

function sign( x ) {
  if ( x > 0 ) {
    return 1;
  } else if ( x < 0 ) {
    return -1;
  } else {
    return 0;
  }
}

module.exports = postcss.plugin( "postcss-dpr-px", function( opts ) {
  var dpr, rounding, permitZero, ignoredProps;

  opts = opts || {};
  dpr = typeof opts.dpr === "number" ? opts.dpr : 1;
  permitZero = opts.permitZero === true;
  ignoredProps = opts.ignoredProps || [];

  switch( opts.rounding ) {
  case "round":
  case "ceil":
  case "floor":
    rounding = opts.rounding;
    break;
  default:
    rounding = "round";
    break;
  }

  return function( css ) {
    css.walkDecls( function( decl ) {
      var newValue,
          prop = decl.prop,
          value = decl.value;

      if ( value.indexOf( "px" ) === -1 ) {
        return;
      }
      if ( typeof ignoredProps === "object" && ignoredProps.indexOf( prop ) > -1 ) {
        return;
      }
      if ( typeof ignoredProps === "function" && ignoredProps( prop ) ) {
        return;
      }

      newValue = value.replace( /(\d*\.?\d+)px/ig, function( match, p1 ) {
        var result = round( rounding, p1 / dpr, 2 );
        if ( permitZero === false && result < 1 && result > -1 ) {
          result = sign( result ) * Math.ceil( Math.abs( result ));
        }
        return result + "px";
      });

      decl.value = newValue;
    });
  };
});
