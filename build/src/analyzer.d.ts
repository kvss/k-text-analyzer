/**
 * The Analyzer class handles the textual analysis. It requires a configuration file, but will use the configs/default config if
 * one is not provided.
 */
export declare class Analyzer {
    private config;
    /**
     * Constructs the analyzer with either a supplied config or a config in the format of the BaseConfig interface
     *
     * @param suppliedConfig A supplied configuration; if not supplied will use the default config
     */
    constructor(suppliedConfig?: any);
    /**
     * The entrypoint for the library after the class is constructed. It will take in the text, lowercase it, and then analyze it.
     *
     * @return score  The score should not be used to compare between configurations, as there is no guranteed base scores
     */
    analyze(input: string): number;
    /**
     * Analyzes the words as separate entities; not as robust as analyzing phrases but quicker as we don't have as many groupings
     *
     */
    private analyzeWords(input);
    /**
     * Analyzes the phrases of the passed in text in groups of two. Eventually, this could be expanded to larger groupings
     */
    private analyzePhrases(input);
    /**
     * Removes generic words and phrases from the text so as to better analyze the material
     *
     * @todo Move the generics into the config files
     */
    private removeGeneric(input);
    /**
     * Breaks the string down into an array of phrases, offset by either 0 or 1
     *
     * @param offset  Determines if the groups should be split at the first pair or offset by 1
     */
    private phrasify(input, offset);
    /**
     * Processes an array by making the elements unique and sorting them; should only be used for
     * the single word analysis as phrases would lose context
     */
    private processArray(input);
    /**
     * Compare the input string (either a word or a phrase) with a specific Word from the config
     */
    private compare(input, check);
    /**
     * Performs the actual analysis by looping over each input array (either of single words or of phrases)
     * and then loops over the config comparing them
     *
     * This is where most of the performance will be drained for large input string and large configuration files
     */
    private checkArray(input);
}
