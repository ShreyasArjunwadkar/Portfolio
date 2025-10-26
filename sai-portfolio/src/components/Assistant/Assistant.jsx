import React, { useState, useEffect } from "react";
import Orb from "../Orb/Orb"; // Make sure path is correct
import ThreeDCardDemo from "../ThreeDCard/ThreeDCardDemo";
import { motion } from "framer-motion";

export default function Assistant() {
  const [message, setMessage] = useState("System booting up...");
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [voices, setVoices] = useState([]);
  const [speaking, setSpeaking] = useState(false);

  // Load available voices
  useEffect(() => {
    const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speak = (text) => {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 1.1;
    utterance.rate = 1;
    utterance.volume = 1;

    // Prefer Microsoft male/neutral English voices
    const voice =
      voices.find(
        (v) => v.name.includes("Microsoft") && v.lang.startsWith("en")
      ) || voices.find((v) => v.lang.startsWith("en"));

    if (voice) utterance.voice = voice;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);

    utterance.onend = () => setSpeaking(false);
  };

  const startIntro = () => {
    const intro =
      "Hello, I am S.A.I. — Shreyas’s Autonomous Interface. Welcome to Shreyas’s Portfolio.";
    setMessage(intro);
    speak(intro);
    setTimeout(() => setButtonsVisible(true), 5000);
  };

  const handleClick = (section) => {
    let response = "";
    if (section === "About")
      response = "Accessing profile data... Displaying information about Shreyas.";
    else if (section === "Achievements")
      response = "Fetching achievements archive... Displaying milestones.";
    else if (section === "Projects")
      response = "Accessing recent innovations... Displaying projects.";
    else if (section === "Contact")
      response = "Opening communication channels... Contact details below.";

    setMessage(response);
    speak(response);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-8 text-white">
      <Orb speaking={speaking} />
      <motion.h1
        className="text-lg w-3/4 sm:w-1/2"
        animate={{ opacity: [0, 1] }}
        transition={{ duration: 1 }}
      >
        {message}
      </motion.h1>

      {!buttonsVisible ? (
        <button
          onClick={startIntro}
          className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:scale-105 transition-transform font-semibold"
        >
          Initialize Assistant
        </button>
      ) : (
        // Render one 3D card per previous action (About, Achievements, Projects, Contact)
        <div className="w-full mt-8 px-4 overflow-x-auto">
          <div className="flex flex-row gap-6 items-start justify-center flex-nowrap">
            {[
              {
                key: "About",
                section: "About",
                title: "About",
                description: "Access profile details and background information.",
                image:
                  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3",
                link: "#about",
              },
              {
                key: "Achievements",
                section: "Achievements",
                title: "Achievements",
                description: "Explore milestones, awards and recognitions.",
                image:
                  "https://images.unsplash.com/photo-1545235617-9465d0d2b9c6?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3",
                link: "#achievements",
              },
              {
                key: "Projects",
                section: "Projects",
                title: "Projects",
                description: "View recent projects, demos and code samples.",
                image:
                  "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3",
                link: "#projects",
              },
              {
                key: "Contact",
                section: "Contact",
                title: "Contact",
                description: "Get in touch — email, social links and more.",
                image:
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3",
                link: "#contact",
              },
            ].map((c) => (
              <ThreeDCardDemo
                key={c.key}
                sectionName={c.section}
                title={c.title}
                description={c.description}
                image={c.image}
                link={c.link}
                primaryLabel="Open"
                primaryAction={(section) => handleClick(section)}
                className="w-56 sm:w-64 flex-shrink-0"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
