const mongoose = require("mongoose");
const WordModel = require("../models/word");
const PerfModel = require("../models/userPerformance");
const createHttpError = require("create-http-error");
const { getNoFromSeed } = require("./utils");

const getAllWords = async (req, res) => {
  const { sort } = req.query;
  let rawWords = WordModel.find({}).select("-example");
  console.log(sort);
  if (sort) {
    rawWords = rawWords.sort(sort);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  rawWords = rawWords.skip(skip).limit(limit);
  const words = await rawWords;
  res.status(200).json({ words, nbHits: words.length });
};
const getWord = async (req, res) => {
  const { name } = req.params;
  const word = await WordModel.findOne({ name: name });
  if (word) res.status(200).json({ word });
  else createHttpError(404, "Word not found");
};

const getRandomWord = async (req, res) => {
  const count = await WordModel.countDocuments();
  const randomIndex = Math.floor(Math.random() * count);
  const randomWord = await WordModel.findOne().skip(randomIndex);
  if (randomWord) res.status(200).json(randomWord);
  else throw createHttpError(500, "Server Error try again later");
};

const postUserPerf = async (req, res) => {
  const { focusList } = req.body;
  if (!focusList || focusList?.length <= 0)
    throw createHttpError(401, "Bad Request: Parameters Missing");
  // check if exists
  const id = req.user.userId;
  const ePerf = await PerfModel.findOne({ userId: id });

  const objectIdFocusList = focusList.map(
    (id) => new mongoose.Types.ObjectId(id)
  );

  if (ePerf) {
    const perf = await PerfModel.findOneAndUpdate(
      { userId: id },
      { focusList: objectIdFocusList },
      { new: true, runValidators: true }
    );
    res.status(200).json(perf);
  } else {
    const perf = await PerfModel.create({
      userId: id,
      focusList: objectIdFocusList,
    });
    res.status(200).json(perf);
  }
};
const getFocusPointWords = async (req, res) => {
  // const { focusList } = req.body;

  // if (!focusList || focusList?.length <= 0)
  //   throw createHttpError(401, "Bad Request: Parameters Missing");
  // // check if exists
  const id = req.user.userId;
  const ePerf = await PerfModel.findOne({ userId: id });
  if (!ePerf)
    throw createHttpError(404, `Performace of user id ${id} not Found`);

  const theFocusList = ePerf.focusList;
  let wordList = [];

  for (let i = 0; i < theFocusList.length; i++) {
    const word = await WordModel.findById(theFocusList[i]);
    if (!word) continue;
    wordList.push(word);
  }
  res.status(200).json({ wordList, nbHits: wordList.length });
};

const getTestData = async (req, res) => {
  const { type, words: wordD, seed, wordNo } = req.body;
  if (!type) throw createHttpError(401, "Bad Request: Parameters Missing");
  let words;
  if (type === "s") {
    if (!seed || !wordNo)
      throw createHttpError(401, "Bad Request: Parameters Missing");
    const count = await WordModel.countDocuments();
    const index = getNoFromSeed(seed, count);
    console.log(index);
    words = await WordModel.find().skip(index).limit(wordNo);
  } else {
    // if (!wordD) throw createHttpError(401, "Bad Request: Parameters Miss");
    words = await WordModel.find();
  }
  res.status(200).json({ words, nbHits: words.length });
};

const getWordNumber = async (req, res) => {
  const count = await WordModel.countDocuments();
  res.status(200).send({ count });
};

module.exports = {
  getAllWords,
  getWord,
  postUserPerf,
  getFocusPointWords,
  getRandomWord,
  getTestData,
  getWordNumber,
};
