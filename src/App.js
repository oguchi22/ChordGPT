// src/App.js
import React from "react";
import { Global, css } from "@emotion/react";
import "./App.css";
import InputArea from "./components/InputArea";
import OutputArea from "./components/OutputArea";
import useChatGPT from "./hooks/useChatGPT";
import useMidi from "./hooks/useMidi";

const globalStyles = css`
  body {
    background-color: #2c2c2c;
    font-family: "Arial", sans-serif;
    color: #ffffff;
    margin: 0;
    padding: 0;
  }
`;

function App() {
  const apiKey = process.env.REACT_APP_CHATGPT_API_KEY;
  const {
    songParameters,
    setSongParameters,
    userPrompt,
    setUserPrompt,
    chordProgression,
    setChordProgression,
    generateChordProgression,
    isLoading,
    error,
  } = useChatGPT(apiKey);

  const { playMidi, downloadMidi, selectInstrument } =
    useMidi(chordProgression);

  return (
    <div>
      <Global styles={globalStyles} />
      <header>
        <h1 className="app-name">ChordGPT</h1>
      </header>
      <InputArea
        songParameters={songParameters}
        setSongParameters={setSongParameters}
        userPrompt={userPrompt}
        setUserPrompt={setUserPrompt}
        generateChordProgression={generateChordProgression}
      />
      <OutputArea
        chordProgression={chordProgression}
        setChordProgression={setChordProgression}
        playMidi={playMidi}
        downloadMidi={downloadMidi}
        selectInstrument={selectInstrument}
      />
    </div>
  );
}

export default App;
