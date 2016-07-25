"use strict";
var _ = require("lodash");
var defaultConfig = require("./configs/default");
/**
 * The Analyzer class handles the textual analysis. It requires a configuration file, but will use the configs/default config if
 * one is not provided.
 */
var Analyzer = (function () {
    /**
     * Constructs the analyzer with either a supplied config or a config in the format of the BaseConfig interface
     *
     * @param suppliedConfig A supplied configuration; if not supplied will use the default config
     */
    function Analyzer(suppliedConfig) {
        //if a config is not passed in, we need to load the default
        if (suppliedConfig) {
            this.config = suppliedConfig;
        }
        else {
            this.config = defaultConfig;
        }
    }
    /**
     * The entrypoint for the library after the class is constructed. It will take in the text, lowercase it, and then analyze it.
     *
     * @return score  The score should not be used to compare between configurations, as there is no guranteed base scores
     */
    Analyzer.prototype.analyze = function (input) {
        //first, lowercase the text
        input = input.toLocaleLowerCase();
        input = this.removeGeneric(input);
        var score = this.analyzeWords(input);
        score += this.analyzePhrases(input);
        return score;
    };
    /**
     * Analyzes the words as separate entities; not as robust as analyzing phrases but quicker as we don't have as many groupings
     *
     */
    Analyzer.prototype.analyzeWords = function (input) {
        var words = input.split(" ");
        words = this.processArray(words);
        var score = this.checkArray(words);
        return score;
    };
    /**
     * Analyzes the phrases of the passed in text in groups of two. Eventually, this could be expanded to larger groupings
     */
    Analyzer.prototype.analyzePhrases = function (input) {
        var phrases = this.phrasify(input, 0);
        var score = this.checkArray(phrases);
        //repeat with an offset of 1
        var phrasesOffset = this.phrasify(input, 1);
        var score2 = this.checkArray(phrasesOffset);
        return score + score2;
    };
    /**
     * Removes generic words and phrases from the text so as to better analyze the material
     *
     * @todo Move the generics into the config files
     */
    Analyzer.prototype.removeGeneric = function (input) {
        var toRemove = ["a", "it", "ah", "its", "is", "it's", "this", "that"];
        input = input.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
        var processed = input.split(" ");
        _.remove(processed, function (el) {
            var ret = _.indexOf(toRemove, el);
            return ret >= 0;
        });
        var ret = _.join(processed, " ");
        return ret;
    };
    /**
     * Breaks the string down into an array of phrases, offset by either 0 or 1
     *
     * @param offset  Determines if the groups should be split at the first pair or offset by 1
     */
    Analyzer.prototype.phrasify = function (input, offset) {
        var phrases = [];
        var split = input.split(" ");
        for (var i = 0; i < split.length; i++) {
            if ((offset === 0 && i % 2 === 0) || (offset !== 0 && i % 2 !== 0)) {
                var phrase = [];
                phrase.push(split[i - 1]);
                phrase.push(split[i]);
                phrases.push(phrase.join(" ").trim());
            }
        }
        //if it is an odd length, we just throw the last one in
        if (split.length % 2 !== 0) {
            phrases.push(split[-1]);
        }
        return phrases;
    };
    /**
     * Processes an array by making the elements unique and sorting them; should only be used for
     * the single word analysis as phrases would lose context
     */
    Analyzer.prototype.processArray = function (input) {
        var processed = _.uniq(input);
        processed = processed.sort();
        return processed;
    };
    /**
     * Compare the input string (either a word or a phrase) with a specific Word from the config
     */
    Analyzer.prototype.compare = function (input, check) {
        var word = check.word;
        var score = 0;
        if (word.charAt(word.length - 1) === "*") {
            //we only compare the characters up to the end in both
            input = input.substr(0, word.length - 1);
            word = word.substr(0, word.length - 1);
        }
        if (word === input) {
            score = check.score;
        }
        return score;
    };
    /**
     * Performs the actual analysis by looping over each input array (either of single words or of phrases)
     * and then loops over the config comparing them
     *
     * This is where most of the performance will be drained for large input string and large configuration files
     */
    Analyzer.prototype.checkArray = function (input) {
        var score = 0;
        for (var w = 0; w < input.length; w++) {
            for (var i = 0; i < this.config.words.length; i++) {
                score += this.compare(input[w], this.config.words[i]);
            }
        }
        return score;
    };
    return Analyzer;
}());
exports.Analyzer = Analyzer;
//# sourceMappingURL=analyzer.js.map