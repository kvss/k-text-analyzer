import {BaseConfig} from "./config.base";

let config: BaseConfig.Config = {
  words: [
    {word: "kill", score: 10},
    {word: "suicide", score: 10},
    {word: "murder", score: 10},
    {word: "rape", score: 10},

    {word: "kill you*", score: 10},
    {word: "murder you*", score: 10},
  ]
};

export = config;