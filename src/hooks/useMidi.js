// src/hooks/useMidi.js
import { useState, useEffect } from "react";
import MidiWriter from "midi-writer-js";
import { saveAs } from "file-saver";
import teoria from "teoria";
import { Midi } from "@tonejs/midi";
import * as Tone from "tone";

const useMidi = (chordProgression, tempo) => {
  const [midiData, setMidiData] = useState(null);
  const [selectedInstrument, setSelectedInstrument] = useState("piano");
  const [isPlaying, setIsPlaying] = useState(false);

  const [metronomeBuffer, setMetronomeBuffer] = useState(null);
  const [sampler, setSampler] = useState(null);
  const [loop, setLoop] = useState(null);

  useEffect(() => {
    const loadMetronomeBuffer = async () => {
      const buffer = await Tone.Buffer.load("audio/metronome.mp3");
      setMetronomeBuffer(buffer);
    };

    loadMetronomeBuffer();
  }, []);

  // Function to convert chord names to pitch names
  const chordToPitch = (chordName) => {
    try {
      const chord = teoria.chord(chordName);
      return chord.notes().map((note) => note.toString());
    } catch (error) {
      console.error(
        `Error converting chord "${chordName}" to pitch names: ${error}`
      );
      return []; // Return an empty array if the chord name is not supported
    }
  };

  const getDurations = (length) => {
    switch (length) {
      case 1:
        return [1];
      case 2:
        return [2, 2];
      case 3:
        return [4, 4, 2];
      case 4:
        return [4, 4, 4, 4];
      case 5:
        return [8, 8, 8, 8, 2];
      case 6:
        return [8, 8, 8, 8, 4, 4];
      case 7:
        return [8, 8, 8, 8, 8, 8, 4];
      case 8:
        return [8, 8, 8, 8, 8, 8, 8, 8];
      case 9:
        return [16, 16, 16, 16, 16, 16, 16, 16, 2];
      case 10:
        return [16, 16, 16, 16, 16, 16, 16, 16, 4, 4];
      case 11:
        return [16, 16, 16, 16, 16, 16, 16, 16, 8, 8, 4];
      case 12:
        return [16, 16, 16, 16, 16, 16, 16, 16, 8, 8, 8, 8];
      case 13:
        return [16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 4];
      case 14:
        return [16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 8, 8];
      case 15:
        return [16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 8];
      default:
        return Array(length).fill(16);
    }
  };

  useEffect(() => {
    const handleAltChords = (chord) => {
      if (chord.includes("alt")) {
        const chordRoot = chord.slice(0, chord.indexOf("alt"));
        return `${chordRoot}#9#5`;
      }
      return chord;
    };

    // Function to convert the chord progression to MIDI data
    const generateMidiData = () => {
      if (!chordProgression) return;

      // Create a new MIDI track
      let track = new MidiWriter.Track();

      // Set the tempo
      track.addEvent(new MidiWriter.TempoEvent({ bpm: tempo }));

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
      const lines = chordProgression.split("\n");
      const bars = lines.flatMap((line) => line.split(" | "));
      bars.forEach((bar) => {
        if (!bar) return;
        if (!bar.includes(": ")) return;
        const chords = bar
          .split(": ")[1]
          .split(" ")
          .filter((chord) => chord.trim() !== "" && chord.trim() !== "|")
          .map(handleAltChords); // Add this line to handle 'alt' chords
        const durations = getDurations(chords.length);
        chords.forEach((chord, index) => {
          const pitches = chordToPitch(chord);
          if (pitches.length === 0) return;
          const note = new MidiWriter.NoteEvent({
            pitch: pitches,
            duration: durations[index].toString(),
          });
          track.addEvent(note);
        });
      });

      // Create a MIDI writer object and add the track
      const write = new MidiWriter.Writer(track);

      // Set the generated MIDI data
      setMidiData(write.dataUri());
    };

    generateMidiData();
  }, [chordProgression, selectedInstrument, tempo]);

  useEffect(() => {
    // Set the tempo using the Transport
    Tone.Transport.bpm.value = tempo;
  }, [tempo]);

  const playMidi = async () => {
    if (!midiData || !metronomeBuffer) return;

    if (isPlaying) {
      Tone.Transport.stop();
      if (sampler) {
        sampler.releaseAll();
        sampler.dispose();
      }
      if (loop) {
        loop.stop(0);
        loop.dispose();
      }
      setIsPlaying(false);
      return;
    }

    // Load the MIDI file
    const midi = await Midi.fromUrl(midiData);

    setIsPlaying(true);

    // Load the piano samples
    const newSampler = new Tone.Sampler(
      {
        A0: "A0.mp3",
        C1: "C1.mp3",
        "D#1": "Ds1.mp3",
        "F#1": "Fs1.mp3",
        A1: "A1.mp3",
        C2: "C2.mp3",
        "D#2": "Ds2.mp3",
        "F#2": "Fs2.mp3",
        A2: "A2.mp3",
        C3: "C3.mp3",
        "D#3": "Ds3.mp3",
        "F#3": "Fs3.mp3",
        A3: "A3.mp3",
        C4: "C4.mp3",
        "D#4": "Ds4.mp3",
        "F#4": "Fs4.mp3",
        A4: "A4.mp3",
        C5: "C5.mp3",
        "D#5": "Ds5.mp3",
        "F#5": "Fs5.mp3",
        A5: "A5.mp3",
        C6: "C6.mp3",
        "D#6": "Ds6.mp3",
        "F#6": "Fs6.mp3",
        A6: "A6.mp3",
        C7: "C7.mp3",
        "D#7": "Ds7.mp3",
        "F#7": "Fs7.mp3",
        A7: "A7.mp3",
        C8: "C8.mp3",
      },
      {
        release: 1,
        baseUrl: "https://tonejs.github.io/audio/salamander/",
      }
    ).toDestination();

    setSampler(newSampler);

    const metronome = new Tone.Player().toDestination();
    metronome.buffer = metronomeBuffer;

    // Wait for the samples to load
    await Tone.loaded();

    // Schedule the metronome
    const newLoop = new Tone.Loop((time) => {
      metronome.start(time);
    }, "4n"); // 1m stands for 1 measure

    setLoop(newLoop);

    // Start the loop and Transport
    newLoop.start(0);
    Tone.Transport.start();

    // Schedule the chords
    midi.tracks.forEach((track) => {
      track.notes.forEach((note) => {
        newSampler.triggerAttackRelease(
          note.name,
          note.duration,
          note.time + Tone.now(),
          note.velocity
        );
      });
    });

    // Stop the Transport and loop after the chord progression has played
    Tone.Transport.scheduleOnce((time) => {
      Tone.Transport.stop(time);
      newLoop.stop(time);
      newLoop.dispose();
      setIsPlaying(false);
    }, midi.duration);
  };

  const downloadMidi = () => {
    if (!midiData) return;

    saveAs(midiData, "chord-progression.mid");
  };

  const selectInstrument = (instrument) => {
    setSelectedInstrument(instrument);
  };

  return { midiData, playMidi, downloadMidi, selectInstrument, isPlaying };
};

export default useMidi;
