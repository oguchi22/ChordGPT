// src/components/InputArea.js
import React from "react";
import { FaDice } from "react-icons/fa";

const keys = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const majorKeys = keys.map((key) => `${key} Major`);
const minorKeys = keys.map((key) => `${key} Minor`);
const allKeys = majorKeys.concat(minorKeys);

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
  isPlaying,
  isLoading,
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
          style={{
            opacity: isPlaying | isLoading ? 0.5 : 1,
            cursor: isPlaying | isLoading ? "not-allowed" : "text",
          }}
          readOnly={isPlaying | isLoading}
        />
        <FaDice
          className="dice-icon"
          onClick={handleDiceClick}
          style={{
            opacity: isPlaying | isLoading ? 0.5 : 1,
            cursor: isPlaying | isLoading ? "not-allowed" : "pointer",
          }}
        />
      </div>
      <div className="input-row">
        <div className="control-group">
          <label
            className="input-label"
            htmlFor="complexity"
            style={{
              opacity: isPlaying | isLoading ? 0.5 : 1,
              cursor: isPlaying | isLoading ? "not-allowed" : "pointer",
            }}
          >
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
            style={{
              opacity: isPlaying | isLoading ? 0.5 : 1,
              cursor: isPlaying | isLoading ? "not-allowed" : "pointer",
            }}
            disabled={isPlaying | isLoading}
          />
        </div>
        <div className="control-group">
          <label
            className="input-label"
            htmlFor="tempo"
            style={{
              opacity: isPlaying | isLoading ? 0.5 : 1,
              cursor: isPlaying | isLoading ? "not-allowed" : "pointer",
            }}
          >
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
            style={{
              opacity: isPlaying | isLoading ? 0.5 : 1,
              cursor: isPlaying | isLoading ? "not-allowed" : "pointer",
            }}
            disabled={isPlaying | isLoading}
          />
        </div>
      </div>
      <div className="input-row">
        <div className="control-group">
          <label
            className="input-label"
            htmlFor="key"
            style={{
              opacity: isPlaying | isLoading ? 0.5 : 1,
              cursor: isPlaying | isLoading ? "not-allowed" : "pointer",
            }}
          >
            Key
          </label>
          <select
            className="dropdown-input"
            id="key"
            value={songParameters.key}
            onChange={(e) => handleInputChange(e, "key")}
            style={{
              opacity: isPlaying | isLoading ? 0.5 : 1,
              cursor: isPlaying | isLoading ? "not-allowed" : "auto",
            }}
            disabled={isPlaying | isLoading}
          >
            {allKeys.map((key, index) => (
              <option key={index} value={key}>
                {key}
              </option>
            ))}
          </select>
        </div>
        <div className="control-group">
          <label
            className="input-label"
            htmlFor="number-of-bars"
            style={{
              opacity: isPlaying | isLoading ? 0.5 : 1,
              cursor: isPlaying | isLoading ? "not-allowed" : "pointer",
            }}
          >
            Number of bars
          </label>
          <input
            className="text-input"
            id="number-of-bars"
            type="number"
            min="4"
            max="32"
            value={songParameters.number_of_bars}
            onChange={(e) => handleInputChange(e, "number_of_bars")}
            style={{
              opacity: isPlaying | isLoading ? 0.5 : 1,
              cursor: isPlaying | isLoading ? "not-allowed" : "text",
            }}
            readOnly={isPlaying | isLoading}
            disabled={isPlaying | isLoading}
          />
        </div>
      </div>
      <button
        className="generate-btn"
        onClick={handleButtonClick}
        style={{
          opacity: isPlaying | isLoading ? 0.5 : 1,
          cursor: isPlaying | isLoading ? "not-allowed" : "pointer",
        }}
        disabled={isPlaying | isLoading}
      >
        Generate Chords
      </button>
    </div>
  );
};

export default InputArea;
