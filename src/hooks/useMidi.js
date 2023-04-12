// src/hooks/useMidi.js
import { useState, useEffect } from "react";
import MidiWriter from "midi-writer-js";
import { saveAs } from "file-saver";
import teoria from "teoria";

const useMidi = (chordProgression) => {
  const [midiData, setMidiData] = useState(null);
  const [selectedInstrument, setSelectedInstrument] = useState("piano");

  // Function to convert chord names to pitch names
  const chordToPitch = (chordName) => {
    const chord = teoria.chord(chordName);
    return chord.notes().map((note) => note.toString("midi"));
  };

  useEffect(() => {
    // Function to convert the chord progression to MIDI data
    const generateMidiData = () => {
      if (!chordProgression) return;

      // Create a new MIDI track
      let track = new MidiWriter.Track();

      // Instrument selection
      const instrument = {
        piano: 0,
        guitar: 24,
        strings: 48,
      };

      // Set the instrument
      track.addEvent(
        new MidiWriter.ProgramChangeEvent({
          instrument: instrument[selectedInstrument],
        })
      );

      // Convert chord progression to MIDI events
      const chords = chordProgression
        .split(" | ")
        .map((bar) => bar.split(": ")[1]);
      chords.forEach((chord) => {
        const pitches = chordToPitch(chord);
        const note = new MidiWriter.NoteEvent({
          pitch: pitches,
          duration: "1",
        });
        track.addEvent(note);
      });

      // Create a MIDI writer object and add the track
      const write = new MidiWriter.Writer(track);

      // Set the generated MIDI data
      setMidiData(write.dataUri());
    };

    generateMidiData();
  }, [chordProgression, selectedInstrument]);

  const playMidi = () => {
    if (!midiData) return;

    const audio = new Audio(midiData);
    audio.play();
  };

  const downloadMidi = () => {
    if (!midiData) return;

    saveAs(midiData, "chord-progression.mid");
  };

  const selectInstrument = (instrument) => {
    setSelectedInstrument(instrument);
  };

  return { midiData, playMidi, downloadMidi, selectInstrument };
};

export default useMidi;
