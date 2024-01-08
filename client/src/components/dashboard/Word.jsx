import React from "react";
import { BiSolidRightArrow } from "react-icons/bi";

const Word = ({ word, handleWordClick }) => {
  return (
    <div
      className="bg-black bg-opacity-40 rounded-md px-6 py-3 capitalize overflow-hidden"
      onClick={() => handleWordClick(word.name)}
    >
      <div className="flex items-center gap-2 font-medium text-lg">
        <BiSolidRightArrow />
        <p>{word.name}</p>
      </div>
      <p className="opacity-60">{word.meaning}</p>
    </div>
  );
};

export default Word;
