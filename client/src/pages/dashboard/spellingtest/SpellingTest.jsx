import React, { useEffect, useState } from "react";
import { FaPlus, FaSearch, FaPlay } from "react-icons/fa";
import { MdClose, MdDelete } from "react-icons/md";
import { Loading } from "../../../components";
import { IoMdPlay } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import { appear } from "../../../animations";
import { getWordAmout } from "../../../network/words_api";
import { useNavigate } from "react-router-dom";

const SpellingTest = () => {
  const [testList, setTestList] = useState(
    JSON.parse(localStorage.getItem("sTest")) || []
  );

  const [createPage, setCreatePage] = useState(false);

  const [errorMsg, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [wordNo, setWordNo] = useState();

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    const fetching = async () => {
      try {
        const wordNO = await getWordAmout();
        setWordNo(wordNO.count);
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

  useEffect(() => {
    localStorage.setItem("sTest", JSON.stringify(testList));
  }, [testList]);

  if (loading) return <Loading />;
  if (errorMsg) return <h1>{errorMsg}</h1>;

  const deleteTest = (name) => {
    setTestList((prev) => {
      return prev.filter((item) => item.name !== name);
    });
  };

  const startSimulation = (test) => {
    navigate(`/test?name=${test.name}`);
  };

  return (
    <>
      <section className="max-w-7xl px-6 py-4 mx-auto w-full flex h-full flex-col relative">
        <div>
          <h1 className="font-out text-2xl font-medium py-2">Spelling test</h1>
          <Top
            createPage={createPage}
            setCreatePage={setCreatePage}
            setSearch={setSearch}
            search={search}
          />
          <div className="my-4 flex flex-col gap-4">
            {!testList.length ? (
              <>
                <p className="text-lg font-medium tracking-tight my-2 mx-6">
                  Seems that you have no any test records.{" "}
                  <span
                    className="text-orange-500 underline"
                    onClick={() => setCreatePage(!createPage)}
                  >
                    Create One
                  </span>
                </p>
              </>
            ) : (
              testList
                .filter((item) => item.name.includes(search))
                .map((test) => (
                  <TestBox
                    test={test}
                    key={test.name}
                    deleteTest={deleteTest}
                    wordNo={wordNo}
                    startSimulation={startSimulation}
                  />
                ))
            )}
          </div>
        </div>
      </section>
      {createPage && (
        <AnimatePresence>
          <CreatePage setCreatePage={setCreatePage} setTestList={setTestList} />
        </AnimatePresence>
      )}
    </>
  );
};

const Top = ({ createPage, setCreatePage, search, setSearch }) => {
  return (
    <div className="flex gap-2">
      <div className="flex-1 relative flex shadow-md">
        <input
          type="text"
          className="flex-1 rounded-l-full bg-black bg-opacity-30 text-white px-6 py-3 pr-12"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FaSearch className=" absolute right-4 text-xl opacity-50 my-auto bottom-0 top-0" />
      </div>
      <div
        className="flex gap-2 rounded-r-full font-medium px-4 py-2 items-center bg-gradient-to-br from-orange-500 to-yellow-600 shadow-md hover:opacity-90 transition-all active:scale-95"
        onClick={() => setCreatePage(!createPage)}
      >
        <FaPlus className="text-lg" />
        <p className="hidden sm:flex">Create Test</p>
      </div>
    </div>
  );
};

const TestBox = ({ test, wordNo, deleteTest, startSimulation }) => {
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formatNumber = (num) => (num < 10 ? `0${num}` : num);

    return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(
      remainingSeconds
    )}`;
  };
  return (
    <div className="flex flex-col px-6 py-4 rounded-md bg-black bg-opacity-30">
      <h1 className="text-3xl font-semibold">{test.name}</h1>
      <div className="opacity-60 flex flex-col my-1">
        {test.type === "s" ? (
          <div>
            <p>Time: {formatTime(test.time)}</p>
            <p>Seed: {test.seed}</p>
          </div>
        ) : (
          <div className="mr-auto">
            <p>Time: {formatTime(test.time)}</p>
            <p>Words Completed:</p>
            <p
              className={`bg-orange-600 rounded-full mr-auto h-full text-white my-1 px-3 font-medium`}
            >
              {test.words} Done. you are{" "}
              {`${String(
                Math.floor((test.words * 100) / wordNo)
              )}% (${wordNo})`}{" "}
              There.
            </p>
          </div>
        )}
      </div>
      <div className="flex gap-4 my-2 items-center">
        <div
          className="flex items-center gap-1"
          onClick={() => startSimulation(test)}
        >
          <IoMdPlay className="p-[0.3rem] rounded-full bg-gradient-to-bl from-orange-500 pr-1 to-yellow-700 text-[2rem] hover:opacity-90 active:scale-95 transition-all" />
          <p className="text-lg">Start</p>
        </div>
        <div
          className="flex items-center"
          onClick={() => deleteTest(test.name)}
        >
          <MdDelete className="text-2xl rounded-full  hover:opacity-90 active:scale-95 transition-all" />
          <p>Delete</p>
        </div>
      </div>
    </div>
  );
};

const CreatePage = ({ setTestList, setCreatePage, setError }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "p",
    time: 0,
    words: 0,
    wordNo: 10,
    seed: "2k1010",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setCreatePage((prev) => !prev);
    try {
      setTestList((prev) => {
        const neww = [...prev, formData];

        return neww;
      });
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className=" absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-30 overflow-y-hidden">
      <motion.div
        {...appear}
        className="bg-gray-800 px-6 py-4 rounded-md flex-col min-w-96"
      >
        <div className="flex items-center gap-2">
          <h1 className="font-out text-2xl font-medium py-2 flex-1">
            Spelling test
          </h1>
          <MdClose
            onClick={() => setCreatePage((prev) => !prev)}
            className="text-2xl hover:scale-95 active:opaicity-70 transition-all"
          />
        </div>
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <fieldset className="flex flex-col text-lg">
              <p>You test name</p>
              <input
                type="text"
                className="text-base px-4 py-2 rounded-md bg-black bg-opacity-25"
                placeholder="My First Test"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
            </fieldset>
            <fieldset className="flex justify-between text-lg">
              <div className="flex flex-row-reverse gap-2">
                <label htmlFor="proper_learning">Proper Learning</label>
                <input
                  type="radio"
                  name="type"
                  required
                  defaultChecked
                  id="proper_learning"
                  className="text-base px-4 py-2 rounded-md bg-black bg-opacity-25"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      type: "p",
                    }))
                  }
                />
              </div>
              <div className="flex flex-row-reverse gap-2">
                <label htmlFor="seed_based">Seed Based</label>
                <input
                  type="radio"
                  name="type"
                  id="seed_based"
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, type: "s" }))
                  }
                />
              </div>
            </fieldset>
            {formData.type === "s" && (
              <>
                {" "}
                <fieldset className="flex flex-col text-lg">
                  <p>You Seed</p>
                  <input
                    type="text"
                    className="text-base px-4 py-2 rounded-md bg-black bg-opacity-25"
                    placeholder="2k10k10"
                    value={formData.seed}
                    maxLength={6}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, seed: e.target.value }))
                    }
                  />
                </fieldset>
                <fieldset className="flex flex-col text-lg">
                  <p>Word Amout</p>
                  <input
                    type="number"
                    min={5}
                    max={40}
                    className="text-base px-4 py-2 rounded-md mr-auto bg-black bg-opacity-25"
                    placeholder="10"
                    value={formData.wordNo}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        wordNo: e.target.value,
                      }))
                    }
                  />
                </fieldset>{" "}
              </>
            )}

            <button className="flex gap-2 rounded-full mx-auto font-medium px-4 py-2 items-center bg-gradient-to-br from-orange-500 to-yellow-600 shadow-md hover:opacity-90 transition-all mr-auto active:scale-95 my-1">
              Create Test
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default SpellingTest;
