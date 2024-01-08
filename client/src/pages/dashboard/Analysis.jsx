import React, { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { getFocusList } from "../../network/words_api";
import { MdQuiz } from "react-icons/md";
import { Loading, Word } from "../../components";

const Analysis = () => {
  const [focusList, setFocusList] = useState();
  const [errorMsg, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError("");
    const fetching = async () => {
      try {
        const data = await getFocusList();
        setFocusList(data.wordList);
      } catch (error) {
        const errorRes = await error.response;
        const errorData = errorRes.data;
        setError(errorData.error_message);
      } finally {
        setLoading(false);
      }
    };
    fetching();
  }, []);

  if (loading) return <Loading />;
  if (errorMsg) console.log(errorMsg);
  return (
    <div className="flex flex-col px-6 py-4 max-w-7xl mx-auto w-full">
      <h1 className="font-out text-2xl font-medium py-2">Test Analysis</h1>
      {!errorMsg && !loading && focusList && (
        <div className="flex flex-col">
          <p>
            An analysis was done based on the test you have taken and these are
            the words you need to focus on
          </p>
          <div className="flex flex-col gap-4 my-4">
            {focusList.map((word) => (
              <Word word={word} handleWordClick={() => {}} />
            ))}
          </div>
        </div>
      )}
      {!focusList && (
        <>
          <h3 className="text-lg">
            It seems that we can't find any analysis done with your tests
          </h3>
          <p className="text-base">
            Take a test and come back it will be fixed click below to take a
            test. if it doesn't contact us.
          </p>
          <button
            className="flex gap-2 px-6 items-center py-2 bg-gradient-to-b from-orange-400 to-orange-600 rounded-md text-lg font-medium font-out shadow-md hover:opacity-90 active:scale-105 my-2 transition-all mr-auto"
            onClick={() => navigate("/tests")}
          >
            <MdQuiz />
            Take a test
          </button>
        </>
      )}
    </div>
  );
};

export default Analysis;
