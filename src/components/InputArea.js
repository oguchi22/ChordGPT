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
      "ボサノヴァ調のコード進行",
      "ドリーミーなポップバラードに適したコード進行",
      "エモーショナルなロックバラード風の進行",
      "アコースティックギターの伴奏にふさわしいコード進行",
      "ジャズ風で複雑なコード進行",
      "ファンキーでグルーヴィーなコード進行",
      "ビーチでリラックスした気分を呼び起こすコード進行",
      "哀愁漂う映画のサウンドトラック風なコード進行",
      "エネルギッシュでポジティブなロックのコード進行",
      "テクノポップのようなエレクトロニックなコード進行",
      "カントリースタイルでアップビートなコード進行",
      "ヒップホップやR&Bに適したソウルフルなコード進行",
      "哀愁漂う古典的な邦楽風のコード進行",
      "浮遊感あるコード進行",
      "疾走感のあるパワフルなメタルのコード進行",
      "昭和歌謡風の懐かしいコード進行",
      "ピアノを弾くときに美しい和音が感じられるコード進行",
      "ゴスペル風の感動的で心地よいコード進行",
      "瞑想にふさわしいアンビエントなコード進行",
      "サーカスやカーニバルを連想させる楽しいコード進行",
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
            max="16"
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
