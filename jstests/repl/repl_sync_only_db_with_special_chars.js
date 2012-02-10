(function() {

// SERVER-3702

var baseName = "jstests_repl_repl9";
var rt = new ReplTest( "repl13tests" );
var normalDB = "abc";
var specialDB = "[a-z]+";
var master = rt.start( true );
var slave = rt.start( false, { only: specialDB } );

master.getDB( normalDB ).data.save( { a: 1 } );
master.getDB( specialDB ).data.save( { z: 1 } );

assert.soon( function() {
  var normalDocs = slave.getDB( normalDB ).data.find().count();
  var specialDocs = slave.getDB( specialDB ).data.find().count();

  return normalDocs == 0 && specialDocs == 1;
}, "Failed to only sync to " + specialDB );

})();
