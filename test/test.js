var postcss = require( "postcss" ),
    expect  = require( "chai" ).expect,
    plugin  = require( "../" );

var test = function( input, output, opts, done ) {
  postcss([ plugin( opts ) ]).process( input ).then( function( result ) {
    expect( result.css ).to.eql( output );
    expect( result.warnings() ).to.be.empty;
    done();
  }).catch( function( error ) {
    done( error );
  });
};

describe( "postcss-dpr-px", function () {
  it( "should replace value in px with valid dpr option.", function ( done ) {
    test( "a{ width: 24px; }", "a{ width: 16px; }", { dpr: 1.5 }, done );
  });

  it( "should round value which cannot be devided by dpr to the hundredth place without rounding option.", function( done ) {
    test( "a{ width: 28px; }", "a{ width: 18.67px; }", { dpr: 1.5 }, done );
  });

  it( "should floor value which cannot be devided by dpr to the hundredth place with floor option.", function( done ) {
    test( "a{ width: 28px; }", "a{ width: 18.66px; }", { dpr: 1.5, rounding: "floor" }, done );
  });

  it( "should ceil value which cannot be devided by dpr to the hundredth place with ceil option.", function( done ) {
    test( "a{ width: 28px; }", "a{ width: 18.67px; }", { dpr: 1.5, rounding: "ceil" }, done );
  });

  it( "should replace multiple values in px.", function( done ) {
    test( "a{ background-size: 24px 24px; }", "a{ background-size: 16px 16px; }", { dpr: 1.5 }, done );
  });

  it( "should do nothing without options.", function( done ) {
    test( "a{ width: 24px; }", "a{ width: 24px; }", {}, done );
  });

  it( "should do nothing with invalid dpr options.", function( done ) {
    test( "a{ width: 24px; }", "a{ width: 24px; }", { dpr: "foo" }, done );
  });
});
