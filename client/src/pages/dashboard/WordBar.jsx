import React from "react";
import { HiSpeakerWave } from "react-icons/hi2";

const WordBar = ({ cWord }) => {
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
        <div className="flex items-center border-b-2 border-orange-400 gap-4 mb-2 font-out">
          <HiSpeakerWave
            className="bg-orange-400 p-2 rounded-t-full active:opacity-80 hover:p-[0.6rem] transition-all text-gray-900 text-[2.5rem]"
            onClick={handleSpeak}
          />
          <h3 className="text-2xl ">{cWord.name}</h3>
        </div>
        <h4>{cWord.meaning}</h4>
      </div>
      <p className="text-lg opacity-60">Example: {cWord.example}</p>
    </section>
  );
};

export default WordBar;
