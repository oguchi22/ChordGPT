// src/components/OutputArea.js
import React from "react";
import { FaPlay, FaStop, FaDownload, FaMusic } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";

const OutputArea = ({
  chordProgression,
  setChordProgression,
  playMidi,
  downloadMidi,
  selectInstrument,
  isPlaying,
  isLoading,
}) => {
  //   const handleChordEdit = (index, newChord) => {
  //     const chords = chordProgression.split(" | ");
  //     chords[index] = newChord;
  //     setChordProgression(chords.join(" | "));
  //   };

  const renderChords = () => {
    if (isLoading) {
      return <ClipLoader color="#4A90E2" />;
    }
    if (!chordProgression) return null;
    const chords = chordProgression.split(" | ");
    return chords.map((chord, index) => (
      //   <span key={index} onClick={() => handleChordEdit(index, "NewChord")}>
      <span key={index}>
        {chord}
        {index < chords.length - 1 && " | "}
      </span>
    ));
  };

  return (
    <div className="output-area">
      <div className="chord-progression-container">
        <div className="chord-progression">{renderChords()}</div>
      </div>
      <div className="controls">
        <button className="control-button" onClick={playMidi}>
          {isPlaying ? <FaStop /> : <FaPlay />}
        </button>
        <button className="control-button" onClick={downloadMidi}>
          <FaDownload />
        </button>
        <div className="instrument-select-container">
          <FaMusic />
          <select
            className="instrument-select"
            onChange={(e) => selectInstrument(e.target.value)}
          >
            <option value="piano">Piano</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default OutputArea;
