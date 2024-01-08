import React, { useEffect, useState } from "react";
import { MdClose, MdNavigateNext, MdSpeaker } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getTestQ, postPerf } from "../../../network/words_api";
import { HiSpeakerWave } from "react-icons/hi2";
import { Loading } from "../../../components";

const TestSimulation = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [test, setTest] = useState(
    JSON.parse(localStorage.getItem("sTest")).find(
      (item) => item.name === searchParams.get("name")
    )
  );
  const [time, setTime] = useState(test.time);

  const [errorMsg, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [testWords, setTestWords] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const fetching = async () => {
      try {
        if (test) {
          const res = await getTestQ(test);
          setTestWords(res.words);
        }
      } catch (error) {
        console.log(error);
        const errorRes = await error.response;
        const errorData = errorRes.data;
        setError(errorData.error_message);
      } finally {
        setLoading(false);
      }
    };
    fetching();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  let timeInterval;
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
    timeInterval = interval;

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formatNumber = (num) => (num < 10 ? `0${num}` : num);

    return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(
      remainingSeconds
    )}`;
  };
  const [focusList, setFocusList] = useState([]);
  const [wordStop, setWordStop] = useState(test.words);
  const handleClose = () => {
    const newTest = {
      ...test,
      words: wordStop,
      time: time,
    };
    const testList = JSON.parse(localStorage.getItem("sTest"));
    const newTestList = testList.map((item) => {
      if (item.name === test.name) return newTest;
      else return item;
    });
    localStorage.setItem("sTest", JSON.stringify(newTestList));
    setLoading(true);
    setError(null);
    const fetching = async () => {
      try {
        if (test) {
          const res = await postPerf({ focusList });
        }
      } catch (error) {
        console.log(error);
        const errorRes = await error.response;
        const errorData = errorRes.data;
        setError(errorData.error_message);
      } finally {
        setLoading(false);
        navigate("/tests");
      }
    };
    fetching();
  };

  const [clientWord, setClientWord] = useState("");

  const [retry, setRetry] = useState(false);
  const [retryTimes, setRetryTimes] = useState(0);

  const next = () => {
    if (clientWord.toLowerCase() === testWords[wordStop].name) {
      setWordStop(wordStop + 1);
    } else {
      setRetry(true);
      if (retryTimes === 3) {
        setFocusList((prev) => [...prev, testWords[wordStop]._id]);
      }
      setRetryTimes(retryTimes + 1);
    }
  };
  if (loading) return <Loading />;
  if (testWords[wordStop] === undefined) clearInterval(timeInterval);

  return (
    <div className="max-w-7xl px-6 py-4 mx-auto w-full flex h-full flex-col relative">
      <div className="flex justify-between">
        <h1 className="font-out text-2xl font-medium py-2 flex-1">Test</h1>
        <div
          className="flex flex-row-reverse gap-2 items-center hover:opacity-90 transition-all active:scale-105"
          onClick={handleClose}
        >
          <MdClose className="text-3xl p-1 border-2 rounded-full text-orange-400 border-orange-500" />
          <p>Close</p>
        </div>
      </div>

      <div>
        {testWords && testWords[wordStop] !== undefined ? (
          <>
            <div>
              <p className="text-xl font-medium">{test?.name}</p>
              {time && <p className="text-xl opacity-60">{formatTime(time)}</p>}
            </div>
            <WordBox cWord={testWords[wordStop]} />
            {retry && (
              <p className="font-medium text-lg text-red-500 px-4 my-1">
                Wrong try again
              </p>
            )}
            <div>
              <form onSubmit={handleSubmit} className="flex my-2">
                <input
                  type="text"
                  className="flex-1 bg-black bg-opacity-25 px-6 py-3 rounded-l-full shadow-md"
                  required
                  value={clientWord}
                  onChange={(e) => setClientWord(e.target.value)}
                />
                <button
                  className="bg-gradient-to-b from-orange-500 to-yellow-800 px-4 rounded-r-full shadow-md flex gap-1 items-center"
                  onClick={next}
                >
                  <p>Next</p>
                  <MdNavigateNext className="text-2xl" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <EndScreen />
        )}
      </div>
    </div>
  );
};

const WordBox = ({ cWord }) => {
  const handleSpeak = () => {
    if ("speechSynthesis" in window) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(cWord.name);
      utterance.volume = 1; // 0 to 1
      utterance.rate = 1; // 0.1 to 10
      utterance.pitch = 1;

      const voices = synth.getVoices();
      const selectedVoice = voices.find(
        (voice) => voice.name === "Google UK English Male"
      );
      utterance.voice = selectedVoice;

      // Speak the utterance
      synth.speak(utterance);
    } else {
      alert("Speech synthesis is not supported in your browser.");
    }
  };
  return (
    <section className=" capitalize py-4 font-medium flex flex-col text-xl gap-4">
      <div>
        <div className="flex items-center gap-4 mb-2 font-out">
          <HiSpeakerWave
            className="bg-orange-400 p-4 rounded-full active:opacity-80 mx-auto hover:p-[0.6rem] transition-all text-gray-900 text-[4rem]"
            onClick={handleSpeak}
          />
        </div>
        <h4>{cWord?.meaning}</h4>
      </div>
    </section>
  );
};

const EndScreen = () => {
  return (
    <div className="text-lg">
      <h1>The word list has ended</h1>
      <div className="underline text-orange-400 font-medium">
        Go back to list
      </div>
    </div>
  );
};

export default TestSimulation;
