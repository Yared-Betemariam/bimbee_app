import React, { useState } from "react";
import WordBar from "./WordBar";
import { RiAiGenerate } from "react-icons/ri";
import { getRandomWord } from "../../network/words_api";
import { Loading } from "../../components";

const WordOfTheDay = () => {
  const [word, setWord] = useState(null);
  const [errorMsg, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleWordClick = async (name) => {
    setLoading(true);
    setError("");
    try {
      const word = await getRandomWord();
      setWord(word);
    } catch (error) {
      const errorRes = await error.response;
      const errorData = errorRes.data;
      setError(errorData.error_message);
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <Loading />;
  if (errorMsg) return <h1>{errorMsg}</h1>;
  return (
    <section>
      <h1 className="text-3xl py-1 my-2 font-medium">Word</h1>
      <div>
        {word && <WordBar cWord={word} />}
        {!word && <p>No word to show. click below to get one!</p>}
      </div>
      <button
        className="flex gap-2 px-6 items-center py-2 bg-gradient-to-b from-orange-400 to-orange-600 rounded-md text-lg font-medium font-out shadow-md hover:opacity-90 active:scale-105 my-2 transition-all"
        onClick={handleWordClick}
      >
        <RiAiGenerate className="text-2xl" />
        Generate
      </button>
    </section>
  );
};

export default WordOfTheDay;
