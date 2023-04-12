// src/hooks/useChatGPT.js
import { useState, useCallback } from "react";
import axios from "axios";

const useChatGPT = (apiKey) => {
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

  const complexityDefinitions = [
    "At this level, the chord progressions are simple, mostly consisting of triads, primarily using the I, IV, and V chords in the given key. These progressions are suitable for beginners and are commonly found in popular and folk music.",
    "Chord progressions at this level include basic diatonic chords from the given key, such as ii and vi, in addition to the I, IV, and V chords. These progressions may also feature simple chord extensions like sus2 and sus4 chords, providing more variety while maintaining a relatively simple structure.",
    "This level introduces more advanced chord extensions, such as 7th and 9th chords, as well as secondary dominants and borrowed chords from parallel keys. Chord progressions at this level may also feature occasional modulations to closely related keys, offering a richer harmonic landscape for intermediate musicians.",
    "At this level, chord progressions become more intricate, featuring chromaticism, more frequent modulations, and advanced chord structures such as altered dominants, diminished chords, and augmented chords. These progressions are suitable for advanced musicians looking for more challenging harmonic progressions.",
    "The highest complexity level features the most advanced chord progressions, incorporating complex techniques such as extended chords (e.g., 11th and 13th chords), polytonality, and non-diatonic chord relationships. Chord progressions at this level are typically found in jazz, fusion, and experimental genres, and are suitable for advanced musicians looking to push their compositional boundaries.",
  ];

  const fetchResponse = useCallback(
    async (prompt) => {
      setIsLoading(true);
      setError(null);

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      };

      const data = {
        prompt: prompt,
        max_tokens: 100,
        n: 1,
        stop: null,
        temperature: 1,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      };

      try {
        const response = await axios.post(
          "https://api.openai.com/v1/engines/davinci-codex/completions",
          data,
          { headers: headers }
        );
        setIsLoading(false);
        return response.data.choices[0].text;
      } catch (err) {
        setIsLoading(false);
        setError(err.message);
        return null;
      }
    },
    [apiKey]
  );

  const generateChordProgression = useCallback(async () => {
    const promptTemplate = `Given the following song parameters:\nComplexity level: {complexity} ({complexity_definition})\nKey: {key}\nTempo: {tempo} BPM\nNumber of bars: {number_of_bars}\n\nAnd the user's input prompt:\n"{user_prompt}"\n\nPlease create a chord progression that matches these parameters. Present the chord progression in the format 'Bar 1: Chord1 | Bar 2: Chord2 | ... | Bar N: ChordN'.`;

    const filledPrompt = promptTemplate
      .replace("{complexity}", songParameters.complexity)
      .replace(
        "{complexity_definition}",
        complexityDefinitions[songParameters.complexity - 1]
      )
      .replace("{key}", songParameters.key)
      .replace("{tempo}", songParameters.tempo)
      .replace("{number_of_bars}", songParameters.number_of_bars)
      .replace("{user_prompt}", userPrompt);

    const response = await fetchResponse(filledPrompt);
    if (response) {
      setChordProgression(response.trim());
    }
  }, [songParameters, userPrompt, fetchResponse]);

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
