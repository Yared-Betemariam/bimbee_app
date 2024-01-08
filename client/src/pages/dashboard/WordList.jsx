import React, { useEffect, useState } from "react";
import { getWord, getWordList } from "../../network/words_api";
import WordBar from "./WordBar";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";
import { Loading, Word } from "../../components";

const WordList = () => {
  const [words, setWords] = useState();
  const [errorMsg, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [cWord, setCWord] = useState(null);
  const getQuery = () => {
    return `page=${page}`;
  };
  useEffect(() => {
    setLoading(true);
    setError("");
    const fetching = async () => {
      try {
        const data = await getWordList(getQuery());
        if (data.words.length <= 0) setPage(1);
        setWords(data.words);
      } catch (error) {
        const errorRes = await error.response;
        const errorData = errorRes.data;
        setError(errorData.error_message);
      } finally {
        setLoading(false);
      }
    };
    fetching();
  }, [page]);

  if (loading) return <Loading />;
  if (errorMsg) return <h1>{errorMsg}</h1>;

  const handleWordClick = async (name) => {
    try {
      const word = await getWord(name);
      setCWord(word.word);
    } catch (error) {
      const errorRes = await error.response;
      const errorData = errorRes.data;
      setError(errorData.error_message);
    }
  };

  return (
    <section className="flex gap-2">
      <div>
        <h1 className="text-3xl py-1 my-2 font-medium">Word List</h1>
        <div className="flex flex-col gap-2">
          {words &&
            words.map((word) => (
              <Word
                word={word}
                key={word._id}
                handleWordClick={handleWordClick}
              />
            ))}
        </div>
        <div className="text-xl flex justify-center items-center font-medium gap-2 mt-4 text-orange-400">
          <HiOutlineArrowLeft
            className="hover:opacity-90 active:scale-105 transition-all ease-in-out"
            onClick={() => setPage((prev) => (prev <= 1 ? prev : prev - 1))}
          />
          <p>Page: {page}</p>
          <HiOutlineArrowRight
            className="hover:opacity-90 active:scale-105 transition-all ease-in-out"
            onClick={() => setPage((prev) => (prev < 1 ? prev : prev + 1))}
          />
        </div>
      </div>
      {cWord && (
        <div className="px-4">
          <h2 className="text-3xl py-1 my-2 font-medium">Word</h2>
          <WordBar cWord={cWord} />
        </div>
      )}
    </section>
  );
};

export default WordList;
