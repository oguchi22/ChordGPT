// src/components/OutputArea.js
import React from "react";
import { FaPlay, FaDownload, FaMusic } from "react-icons/fa";

const OutputArea = ({
  chordProgression,
  setChordProgression,
  playMidi,
  downloadMidi,
  selectInstrument,
}) => {
  const handleChordEdit = (index, newChord) => {
    const chords = chordProgression.split(" | ");
    chords[index] = newChord;
    setChordProgression(chords.join(" | "));
  };

  const renderChords = () => {
    if (!chordProgression) return null;
    const chords = chordProgression.split(" | ");
    return chords.map((chord, index) => (
      <span key={index} onClick={() => handleChordEdit(index, "NewChord")}>
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
          <FaPlay />
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
            <option value="guitar">Guitar</option>
            <option value="strings">Strings</option>
            {/* Add more instruments as needed */}
          </select>
        </div>
      </div>
    </div>
  );
};

export default OutputArea;
