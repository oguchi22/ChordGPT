// src/components/InputArea.js
import React, { useEffect, useState } from "react";
import { FaDice, FaChevronUp, FaChevronDown } from "react-icons/fa";

const keys = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const majorKeys = keys.map((key) => `${key} Major`);
const minorKeys = keys.map((key) => `${key} Minor`);
const allKeys = majorKeys.concat(minorKeys);

const firstChords = [
  "Random Diatonic",
  "Random All",
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

const translations = {
  en: {
    placeholder: "Craft Your Unique Chord Progression",
    showAdvanced: "Show Advanced Settings",
    hideAdvanced: "Hide Advanced Settings",
    complexity: "Complexity",
    tempo: "Tempo",
    progressionLength: "Progression Length",
    key: "Key",
    startingChord: "Starting Chord",
    generateChords: "Generate Chords",
    promptSuggestions: [
      "Dreamy and uplifting for a rainy day",
      "Mysterious and haunting for a suspenseful story",
      "Groovy and energetic for a dance party",
      "Nostalgic and emotional for reminiscing",
      "Soothing and calming for a meditation session",
      "Quirky and playful for a children's show theme",
      "Powerful and dramatic for a heroic adventure",
      "Warm and inviting for a cozy evening",
      "Futuristic and innovative for a sci-fi setting",
      "Exotic and mesmerizing for a world music fusion",
    ],
  },
  ja: {
    placeholder: "ユニークなコード進行を作成する",
    showAdvanced: "詳細設定を表示",
    hideAdvanced: "詳細設定を非表示",
    complexity: "複雑さ",
    tempo: "テンポ",
    progressionLength: "進行の長さ",
    key: "キー",
    startingChord: "開始コード",
    generateChords: "コード進行を生成",
    promptSuggestions: [
      "雨の日の夢見心地で上昇気分",
      "サスペンス映画にふさわしい神秘的で幽霊のような",
      "ダンスパーティーに適したグルーヴィでエネルギッシュ",
      "懐かしくて感動的な思い出話",
      "瞑想セッションに心地よくリラックス",
      "子供番組のテーマにふさわしい奇抜で遊び心がある",
      "勇敢な冒険に力強くドラマチック",
      "暖かく居心地の良い夕暮れ時",
      "未来的で革新的なSFの設定",
      "エキゾチックで魅惑的な世界音楽フュージョン",
    ],
  },
};

const InputArea = ({
  songParameters,
  setSongParameters,
  userPrompt,
  setUserPrompt,
  generateChordProgression,
  isPlaying,
  isLoading,
}) => {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const userLanguage = navigator.language.startsWith("ja") ? "ja" : "en";
    setLanguage(userLanguage);
  }, []);

  const [showAdvanced, setShowAdvanced] = useState(false);

  const toggleAdvancedSettings = () => {
    setShowAdvanced((prevShowAdvanced) => !prevShowAdvanced);
  };

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
    const randomIndex = Math.floor(
      Math.random() * translations[language].promptSuggestions.length
    );
    setUserPrompt(translations[language].promptSuggestions[randomIndex]);
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
          placeholder={translations[language].placeholder}
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
      <button
        className="show-settings-btn"
        onClick={toggleAdvancedSettings}
        style={{
          opacity: isPlaying | isLoading ? 0.2 : 0.5,
          cursor: isPlaying | isLoading ? "not-allowed" : "pointer",
        }}
        disabled={isPlaying | isLoading}
        title={
          showAdvanced
            ? translations[language].hideAdvanced
            : translations[language].showAdvanced
        }
      >
        {showAdvanced ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      <div className={`input-grid${showAdvanced ? " input-grid-open" : ""}`}>
        <div className="control-group">
          <label
            className="input-label"
            htmlFor="complexity"
            style={{
              opacity: isPlaying | isLoading ? 0.5 : 1,
              cursor: isPlaying | isLoading ? "not-allowed" : "pointer",
            }}
          >
            {translations[language].complexity}: {songParameters.complexity}
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
            {translations[language].tempo}: {songParameters.tempo} BPM
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
        <div className="control-group">
          <label
            className="input-label"
            htmlFor="number-of-bars"
            style={{
              opacity: isPlaying | isLoading ? 0.5 : 1,
              cursor: isPlaying | isLoading ? "not-allowed" : "pointer",
            }}
          >
            {translations[language].progressionLength}:{" "}
            {songParameters.number_of_bars}
          </label>
          <input
            className="slider-input"
            id="number-of-bars"
            type="range"
            min="4"
            max="32"
            step="4"
            value={songParameters.number_of_bars}
            onChange={(e) => handleInputChange(e, "number_of_bars")}
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
            htmlFor="key"
            style={{
              opacity: isPlaying | isLoading ? 0.5 : 1,
              cursor: isPlaying | isLoading ? "not-allowed" : "pointer",
            }}
          >
            {translations[language].key}
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
            htmlFor="firstChord"
            style={{
              opacity: isPlaying | isLoading ? 0.5 : 1,
              cursor: isPlaying | isLoading ? "not-allowed" : "pointer",
            }}
          >
            {translations[language].startingChord}
          </label>
          <select
            className="dropdown-input"
            id="firstChord"
            value={songParameters.firstChord}
            onChange={(e) => handleInputChange(e, "firstChord")}
            style={{
              opacity: isPlaying | isLoading ? 0.5 : 1,
              cursor: isPlaying | isLoading ? "not-allowed" : "auto",
            }}
            disabled={isPlaying | isLoading}
          >
            {firstChords.map((chord, index) => (
              <option key={index} value={chord}>
                {chord}
              </option>
            ))}
          </select>
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
        {translations[language].generateChords}
      </button>
    </div>
  );
};

export default InputArea;
