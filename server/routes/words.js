const express = require("express");
const {
  getAllWords,
  getWord,
  postUserPerf,
  getFocusPointWords,
  getRandomWord,
  getTestData,
  getWordNumber,
} = require("../controllers/words");
const router = express.Router();

router.route("/").get(getAllWords);
router.route("/perf").post(postUserPerf).get(getFocusPointWords);
router.route("/random").get(getRandomWord);
router.route("/word/:name").get(getWord);
router.route("/test").post(getTestData);
router.route("/no").get(getWordNumber);

module.exports = router;
