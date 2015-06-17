'use strict';

var grunt = require('grunt');
var fs = require("fs"); 
/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.centure_i18n = {
  setUp: function (done) {
    // setup here if necessary
    done();
  },
  default_options: function (test) {
    test.expect(2);
    var outputDir = 'tmp/';
    var testDir = 'test/expected/';
    fs.readdirSync(outputDir).forEach(function(file, b, c){
      var actual = grunt.file.read(outputDir+file);
      var expected = grunt.file.read(testDir+file);
      test.equal(actual, expected, 'should output translation file.');
    });

    test.done();
  }
};
