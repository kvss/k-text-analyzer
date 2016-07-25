# Text Risk Analysis

This module will aid in determining the risk of a post based upon a supplied configuration. Configurations can be customized depending on context. For example, one configuraiton could be used to analyze a risk level for self harm while another configuration could be created to measure if there is a threat to another person. 

The text will be passed in and phrases and words will be analyzed to determine a score. The score is not to be compared with other configurations, as the score exists simply to compare to a baseline of 0. In some configurations, a score of 100 would be a definitive warning while in others it would be just a caution. How each application handles the score will depend on the application.

## Goal

This module was created for use in a few applications created by [KVSS Technologies](https://www.kvsstechnologies.com). After being used in production, the logic was separated and open sourced. It is hoped that the community will improve the algorithms and generate improved configurations to be used.

## Installation

The library is written in [TypeScript](http://www.typescriptlang.org/) and is distributed in ES5. In a NodeJS project, usage should be as simple as

`var analyzer = require("k-text-analyzer");`

`var a = new analyzer.Analyzer();`

`var score = a.analyze("YOUR TEXT");`

## Building

We have attempted to make building and testing be as self-contained as possible. Therefore, the node_modules directory will be heavy as we will make local copies of TypeScript and Mocha available and referenced.

To build, you should clone the repository and then run

`npm install`

`npm run build`

This will create a `./build` directory with the generated JS files from the `./src` directory.

## Testing

To test the code, run

`npm run test`

This will build the project and then use Mocha to test the generated Javascript. The tests can be found in `./src/tests` or `./build/tests`

## Documentation

The code has attempted to be as clear as possible while also having clear comments. We use [TypeDoc](http://typedoc.io/) to generate HTML documentation. At build time, we generate the documentation for you, but you may also generate the documentation by running

`npm run doc`

This will create a `./documentation` directory you may browse with your favorite browser. 

