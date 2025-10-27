import React, { useState, useEffect } from "react";
import Orb from "../Orb/Orb";
import ThreeDCardDemo from "../ThreeDCard/ThreeDCardDemo";

export default function Assistant() {
  const [message, setMessage] = useState("System booting up...");
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [voices, setVoices] = useState([]);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speak = (text) => {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find(v => v.lang.startsWith("en")) || voices[0];
    if (voice) utterance.voice = voice;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
  };

  const startIntro = () => {
    const intro = "Hello, I am S.A.I., welcome to Shreyas's Portfolio.";
    setMessage(intro);
    speak(intro);
    setTimeout(() => setButtonsVisible(true), 4000);
  };

  const handleClick = (section) => {
    const responses = {
      About: "Showing profile details...",
      Achievements: "Showing achievements...",
      Projects: "Showing projects...",
      Contact: "Opening contact info...",
    };
    setMessage(responses[section]);
    speak(responses[section]);
  };

  return (
    <div className="flex flex-col items-center justify-center text-center text-white space-y-8 px-4">
      <Orb speaking={speaking} />
      <h1 className="text-lg w-3/4 sm:w-1/2 max-w-2xl">{message}</h1>

      {!buttonsVisible ? (
        <button
          onClick={startIntro}
          className="mt-6 px-6 py-3 bg-cyan-500 text-white rounded-lg hover:scale-105 hover:bg-cyan-400 transition-all font-semibold shadow-lg"
        >
          Initialize Assistant
        </button>
      ) : (
        <div className="flex gap-6 flex-wrap justify-center mt-8">
          {["About", "Achievements", "Projects", "Contact"].map(section => (
            <ThreeDCardDemo
              key={section}
              sectionName={section}
              title={section}
              description={`Explore ${section.toLowerCase()} section`}
              primaryLabel="Open"
              primaryAction={() => handleClick(section)}
            />
          ))}
        </div>
      )}
    </div>
  );
}