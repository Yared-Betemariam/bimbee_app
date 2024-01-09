// populator variable
const popAmout = 3;
const popNo = 1;

require("dotenv").config();
const getClassifiedWordLists = require("./classifyData");
const BottleNeck = require("bottleneck");
const apiKeys = require("./apikeys");

const WordModel = require("./models/word");
const mongoose = require("mongoose");

const { Configuration, OpenAIApi } = require("openai");
const limiter = new BottleNeck({
  maxConcurrent: 1,
  minTime: 60000 / 60,
});
const config = new Configuration({
  apiKey: apiKeys[popNo - 1],
});
const openai = new OpenAIApi(config);

const getWordFormat = async (word) => {
  return limiter.schedule(async () => {
    const res = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `give me a just a json string that that has a name value of the word ${word} and another value called meaning with the meaning of the word in one sentence and also an example on the word that is one sentece don't start with certainly i just need the code and make sure to separate each value with a comma 
      i am going to parse this with JSON.parse() so make sure to give me the right json string make sure to wrap it with {}. make sure you don't give me unterminated strings, and don't forget , and :`,
      temperature: 0.7,
      max_tokens: 50,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    return res.data.choices[0].text;
  });
};

const generateWord = async (word) => {
  try {
    // if word exists
    console.log(word);
    const eWord = await WordModel.findOne({ name: word.toLowerCase() });
    const exists = eWord && !(Object.keys(eWord) <= 0);
    if (exists) {
      console.log("already exists");
      return true;
    }
    if (!exists) {
      const getWord = await getWordFormat(word);
      let wordObj = JSON.parse(getWord.toString());

      const theWord = {
        name: String(wordObj.name).toLowerCase(),
        meaning: String(wordObj.meaning).toLowerCase(),
        example: String(wordObj.example).toLowerCase(),
      };
      console.log(theWord);

      // add the word
      const wordC = await WordModel.create(theWord);
      console.log(wordC);
      return false;
    }
  } catch (error) {
    console.log("Error occured");
    console.log(error);
    return false;
  }
};

const generateWordWithDelay = async (word) => {
  const res = await generateWord(word);
  if (res) return new Promise((resolve) => setTimeout(resolve, 1));
  else return new Promise((resolve) => setTimeout(resolve, 20000));
};

const startPopulation = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("db connected");

    let wordList = await getClassifiedWordLists(popAmout);
    wordList = wordList[String(popNo) - 1];
    // createing a poper form for all the words
    // geting the meaing of each word from chatgpt
    for (const word of wordList) {
      await generateWordWithDelay(word);
    }
  } catch (error) {
    console.log(error);
  }
};
startPopulation();
