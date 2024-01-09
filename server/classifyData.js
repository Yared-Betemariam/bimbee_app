const fsPromises = require("fs/promises");

const getClassifiedWordLists = async (num) => {
  try {
    const splitArray = (arr, n) => {
      const sublists = Array.from({ length: n }, (_, i) =>
        arr.slice(
          Math.floor((i * arr.length) / n),
          Math.floor(((i + 1) * arr.length) / n)
        )
      );
      return sublists;
    };
    const res = await fsPromises.readFile("./Fullpage.txt", "utf-8");
    let wordList = res.replace(/[\r\n]/g, ",").split(",");
    wordList = wordList.filter((word) => word.trim().length > 1);
    wordList = wordList.map((word) => word.trim().toLowerCase());
    const dividedList = splitArray(wordList, num);
    return dividedList;
  } catch (error) {
    console.log(error);
  }
};

module.exports = getClassifiedWordLists;
