// src/hooks/useChatGPT.js
import { useState, useCallback } from "react";
import axios from "axios";

const useChatGPT = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [songParameters, setSongParameters] = useState({
    complexity: 3,
    key: "C Major",
    tempo: 120,
    number_of_bars: 8,
    firstChord: "Random Diatonic",
  });
  const [userPrompt, setUserPrompt] = useState("");
  const [chordProgression, setChordProgression] = useState("");

  const generateChordProgression = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    let firstChord = songParameters.firstChord;
    if (songParameters.firstChord === "Random Diatonic") {
      const diatonicChords = songParameters.key.includes("Major")
        ? ["I", "II", "III", "IV", "V", "VI"]
        : ["I", "II", "bIII", "IV", "V", "bVI", "bVII"];
      firstChord =
        diatonicChords[Math.floor(Math.random() * diatonicChords.length)];
    } else if (songParameters.firstChord === "Random All") {
      const allChords = [
        "I",
        "bII",
        "II",
        "bIII",
        "III",
        "IV",
        "#IV",
        "V",
        "bVI",
        "VI",
        "bVII",
        "VII",
      ];
      firstChord = allChords[Math.floor(Math.random() * allChords.length)];
    }

    try {
      const response = await axios.post(process.env.REACT_APP_LAMBDA_API_URL, {
        complexity: songParameters.complexity,
        key: songParameters.key,
        tempo: songParameters.tempo,
        number_of_bars: songParameters.number_of_bars,
        firstChord,
        userPrompt,
      });
      if (response.data && response.data.chordProgression) {
        setChordProgression(response.data.chordProgression);
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while generating the chord progression.");
    } finally {
      setIsLoading(false);
    }
  }, [songParameters, userPrompt]);

  return {
    songParameters,
    setSongParameters,
    userPrompt,
    setUserPrompt,
    chordProgression,
    setChordProgression,
    generateChordProgression,
    isLoading,
    error,
  };
};

export default useChatGPT;
