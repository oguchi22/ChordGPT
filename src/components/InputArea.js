// src/components/InputArea.js
import React from "react";
import { FaDice } from "react-icons/fa";

const keys = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const minorKeys = keys.map((key) => `${key}m`);
const allKeys = keys.concat(minorKeys);

const promptSuggestions = [
  "Dreamy and uplifting for a rainy day",
  "Mysterious and haunting for a suspenseful story",
  "Groovy and energetic for a dance party",
  "Nostalgic and emotional for reminiscing",
  "Soothing and calming for a meditation session",
  "Quirky and playful for a children's show theme",
  "Powerful and dramatic for a heroic adventure",
  "Warm and inviting for a cozy evening",
  "Futuristic and innovativen for a sci-fi setting",
  "Exotic and mesmerizing for a world music fusion",
];

const InputArea = ({
  songParameters,
  setSongParameters,
  userPrompt,
  setUserPrompt,
  generateChordProgression,
}) => {
  const handleInputChange = (event, parameter) => {
    setSongParameters({
      ...songParameters,
      [parameter]: event.target.value,
    });
  };

  const handleUserPromptChange = (event) => {
    setUserPrompt(event.target.value);
  };

  const handleButtonClick = () => {
    generateChordProgression();
  };

  const handleDiceClick = () => {
    const randomIndex = Math.floor(Math.random() * promptSuggestions.length);
    setUserPrompt(promptSuggestions[randomIndex]);
  };

  return (
    <div className="input-container">
      <div className="user-prompt-container">
        <input
          className="text-input user-prompt-input"
          id="user-prompt"
          type="text"
          value={userPrompt}
          onChange={handleUserPromptChange}
          placeholder="Enter a creative description for your chord progression"
        />
        <FaDice className="dice-icon" onClick={handleDiceClick} />
      </div>
      <div className="input-row">
        <div className="control-group">
          <label className="input-label" htmlFor="complexity">
            Complexity: {songParameters.complexity}
          </label>
          <input
            className="slider-input"
            id="complexity"
            type="range"
            min="1"
            max="5"
            value={songParameters.complexity}
            onChange={(e) => handleInputChange(e, "complexity")}
          />
        </div>
        <div className="control-group">
          <label className="input-label" htmlFor="tempo">
            Tempo: {songParameters.tempo} BPM
          </label>
          <input
            className="slider-input"
            id="tempo"
            type="range"
            min="40"
            max="240"
            value={songParameters.tempo}
            onChange={(e) => handleInputChange(e, "tempo")}
          />
        </div>
      </div>
      <div className="input-row">
        <div className="control-group">
          <label className="input-label" htmlFor="key">
            Key
          </label>
          <select
            className="dropdown-input"
            id="key"
            value={songParameters.key}
            onChange={(e) => handleInputChange(e, "key")}
          >
            {allKeys.map((key, index) => (
              <option key={index} value={key}>
                {key}
              </option>
            ))}
          </select>
        </div>
        <div className="control-group">
          <label className="input-label" htmlFor="number-of-bars">
            Number of bars
          </label>
          <input
            className="text-input"
            id="number-of-bars"
            type="number"
            min="1"
            max="64"
            value={songParameters.number_of_bars}
            onChange={(e) => handleInputChange(e, "number_of_bars")}
          />
        </div>
      </div>
      <button className="generate-btn" onClick={handleButtonClick}>
        Generate Chords
      </button>
    </div>
  );
};

export default InputArea;
