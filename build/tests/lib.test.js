"use strict";
/// <reference path="../src/typings/tsd.d.ts" />
var analyzer_1 = require("../src/analyzer");
var assert = require("assert");
describe("Test analyzer", function () {
    var customConfig = {
        words: [
            { word: "kill", score: 10 },
            { word: "hurt you*", score: 20 }
        ]
    };
    var safeText = "This is a safe, clean text that should not generate severe warnings";
    var notSafeText = "You should kill yourself and I will murder your family and hurt your family";
    describe("Test the components", function () {
        it("should test the removeGeneric function", function (done) {
            var an = new analyzer_1.Analyzer();
            var str = an.removeGeneric("this is a sample post that should have a few, words in it");
            assert.equal(str, "sample post should have few words in");
            done();
        });
        it("should test the processArray", function (done) {
            var an = new analyzer_1.Analyzer();
            var array = "we test that the method removes dupes and is sorted and dupes are gone".split(" ");
            var result = an.processArray(array).join(" ");
            //we expect the array to be sorted and unique
            assert.equal(result, "and are dupes gone is method removes sorted test that the we");
            done();
        });
        it("should test the phrasify", function (done) {
            var an = new analyzer_1.Analyzer();
            var message = "1 2 1 2 1 2 1 2 1 2";
            var expectedResult = ['1', '2 1', '2 1', '2 1', '2 1'];
            var result = an.phrasify(message, 0);
            assert.deepEqual(result, expectedResult);
            var expectedResult2 = ['1 2', '1 2', '1 2', '1 2', '1 2'];
            var result2 = an.phrasify(message, 1);
            assert.deepEqual(result2, expectedResult2);
            done();
        });
        it("should test the compare", function (done) {
            var an = new analyzer_1.Analyzer();
            var result = an.compare("kill you", { word: "kill yo*", score: 10 });
            assert.equal(result, 10);
            var result2 = an.compare("kill y", { word: "kill yo*", score: 10 });
            assert.equal(result2, 0);
            var result3 = an.compare("killing it!", { word: "kill yo*", score: 10 });
            assert.equal(result3, 0);
            var result4 = an.compare("kill yourself", { word: "kill you", score: 10 });
            assert.equal(result4, 0);
            done();
        });
    });
    describe("Test the default", function () {
        it("should test the default config", function (done) {
            var an = new analyzer_1.Analyzer();
            var safeScore = an.analyze(safeText);
            var notSafeScore = an.analyze(notSafeText);
            //since the numbers can be tweaked, we simply check to see if there is a difference      
            assert.notEqual(safeScore, notSafeScore);
            done();
        });
    });
    describe("Test the custom", function () {
        it("should test the passed in custom config", function (done) {
            var an = new analyzer_1.Analyzer(customConfig);
            var safeScore = an.analyze(safeText);
            var notSafeScore = an.analyze(notSafeText);
            //since the numbers can be tweaked, we simply check to see if there is a difference    
            assert.notEqual(safeScore, notSafeScore);
            done();
        });
    });
});
//# sourceMappingURL=lib.test.js.map