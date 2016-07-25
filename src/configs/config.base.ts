export module BaseConfig {

  export interface Word {
    word: string;
    score: number;
  };
  

  export interface Config {
    words: [Word];
  };  
}