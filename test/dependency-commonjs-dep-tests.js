'use strict';
require('../'); // Load the module
var nodePath = require('path');
var chai = require('chai');
chai.Assertion.includeStack = true;
require('chai').should();
var expect = require('chai').expect;
var fs = require('fs');

require('../'); // Load this module just to make sure it works

describe('raptor-optimizer-require/dependency-commonjs-dep' , function() {

    beforeEach(function(done) {
        for (var k in require.cache) {
            if (require.cache.hasOwnProperty(k)) {
                delete require.cache[k];
            }
        }
        done();
    });

    it('should generate the correct main for an installed module', function(done) {

        var defDependency = require('../lib/dependency-commonjs-dep');
        defDependency.parentPath = "/$/foo";
        defDependency.childName = "baz";
        defDependency.childVersion = "3.0.0";
        var code = '';
        defDependency.read()
            .on('data', function(data) {
                code += data;
            })
            .on('end', function() {
                expect(code).to.equal('$rmod.dep("/$/foo", "baz", "3.0.0");');
                done();
            })
            .on('error', done);
    });


});
