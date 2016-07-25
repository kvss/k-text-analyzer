import {BaseConfig} from "./config.base";

let config: BaseConfig.Config = {
  words: [
    {word: "kill", score: 10},
    {word: "suicide", score: 10},
    {word: "murder", score: 10},
    {word: "rape", score: 10},

    {word: "kill you*", score: 20},
    {word: "murder you*", score: 20},
    {word: "rape y*", score: 20},
    {word: "kill m*", score: 20},
    {word: "murder m*", score: 20},
    {word: "hurt m*", score: 20},
    
  ]
};

export = config;