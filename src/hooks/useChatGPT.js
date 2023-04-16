// src/hooks/useChatGPT.js
import { useState, useCallback } from "react";
import axios from "axios";

const useChatGPT = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [songParameters, setSongParameters] = useState({
    complexity: 3,
    key: "C",
    tempo: 120,
    number_of_bars: 8,
  });
  const [userPrompt, setUserPrompt] = useState("");
  const [chordProgression, setChordProgression] = useState("");

  const generateChordProgression = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(process.env.REACT_APP_LAMBDA_API_URL, {
        complexity: songParameters.complexity,
        key: songParameters.key,
        tempo: songParameters.tempo,
        number_of_bars: songParameters.number_of_bars,
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
