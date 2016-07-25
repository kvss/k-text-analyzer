/// <reference path="../src/typings/tsd.d.ts" />
import {Analyzer} from "../src/analyzer";
import {BaseConfig} from "../src/configs/config.base";
import * as mocha from "mocha";
import assert = require("assert");

describe("Test analyzer", () => {
  let customConfig: BaseConfig.Config = {
    words: [
      {word: "kill", score: 10},
      {word: "hurt you*", score: 20}
    ]
  };
  let safeText = "This is a safe, clean text that should not generate severe warnings";
  let notSafeText = "You should kill yourself and I will murder your family and hurt your family";

  describe("Test the components", () => {
    it("should test the removeGeneric function", (done) => {
      let an: Analyzer = new Analyzer();
      let str = (an as any).removeGeneric("this is a sample post that should have a few, words in it");
      assert.equal(str, "sample post should have few words in");
      done();
    });
    it("should test the processArray", (done) => {
      let an: Analyzer = new Analyzer();
      let array = "we test that the method removes dupes and is sorted and dupes are gone".split(" ");      
      let result = (an as any).processArray(array).join(" ");
      //we expect the array to be sorted and unique
      assert.equal(result, "and are dupes gone is method removes sorted test that the we");
      done();
    });
    it("should test the phrasify", (done) => {
      let an: Analyzer = new Analyzer();
      let message = "1 2 1 2 1 2 1 2 1 2";

      let expectedResult = [ '1', '2 1', '2 1', '2 1', '2 1' ];
      let result = (an as any).phrasify(message, 0);
      assert.deepEqual(result, expectedResult);

      let expectedResult2 = [ '1 2', '1 2', '1 2', '1 2', '1 2' ];
      let result2 = (an as any).phrasify(message, 1);
      assert.deepEqual(result2, expectedResult2);
      
      done();
    });
    it("should test the compare", (done) => {
      let an: Analyzer = new Analyzer();
      
      let result = (an as any).compare("kill you", {word: "kill yo*", score: 10});
      assert.equal(result, 10);

      let result2 = (an as any).compare("kill y", {word: "kill yo*", score: 10});
      assert.equal(result2, 0);

      let result3 = (an as any).compare("killing it!", {word: "kill yo*", score: 10});
      assert.equal(result3, 0);

      let result4 = (an as any).compare("kill yourself", {word: "kill you", score: 10});
      assert.equal(result4, 0);

      done();
    });
  });

  describe("Test the default", () => {    
    it("should test the default config", (done) => {
      let an: Analyzer = new Analyzer();
      let safeScore = an.analyze(safeText);
      let notSafeScore = an.analyze(notSafeText);

      //since the numbers can be tweaked, we simply check to see if there is a difference      
      assert.notEqual(safeScore, notSafeScore);
      done();
    });
  });

  describe("Test the custom", () => {
    it("should test the passed in custom config", (done) => {
      let an: Analyzer = new Analyzer(customConfig);
      let safeScore = an.analyze(safeText);
      let notSafeScore = an.analyze(notSafeText);

      //since the numbers can be tweaked, we simply check to see if there is a difference    
      assert.notEqual(safeScore, notSafeScore);
      done();
    });
  });
});