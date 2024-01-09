const getNoFromSeed = (seed, max) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let noSeed = "";
  for (let i of seed) {
    if (typeof Number(i) === "number" && !isNaN(i)) {
      noSeed += i;
    } else {
      i = i.toUpperCase();
      if (alphabet.indexOf(i) !== null) {
        noSeed += String(alphabet.indexOf(i) + 1);
      } else noSeed += "1";
    }
  }
  console.log(noSeed);
  noSeed = Number(noSeed);
  while (noSeed >= max) {
    noSeed = noSeed * 0.75;
  }
  noSeed = Math.floor(noSeed);
  console.log(noSeed);
  return noSeed;
};

module.exports = { getNoFromSeed };
