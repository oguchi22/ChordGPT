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
  const {
    songParameters,
    setSongParameters,
    userPrompt,
    setUserPrompt,
    chordProgression,
    setChordProgression,
    generateChordProgression,
    isLoading,
  } = useChatGPT();

  const { playMidi, downloadMidi, selectInstrument, isPlaying } = useMidi(
    chordProgression,
    songParameters.tempo
  );

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
        isPlaying={isPlaying}
        isLoading={isLoading}
      />
      <OutputArea
        chordProgression={chordProgression}
        setChordProgression={setChordProgression}
        playMidi={playMidi}
        downloadMidi={downloadMidi}
        selectInstrument={selectInstrument}
        isPlaying={isPlaying}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;
