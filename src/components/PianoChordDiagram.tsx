import React from "react";
import { motion } from "motion/react";

interface PianoChordDiagramProps {
  notes: string[];
  name: string;
}

export default function PianoChordDiagram({ notes, name }: PianoChordDiagramProps) {
  // Helper to check if a semitone (0-23, corresponding to 2 octaves) matches any note in the chord
  const isSemitoneInChord = (semitone: number): boolean => {
    const pitchClass = semitone % 12;
    const pitchNames: Record<number, string[]> = {
      0: ["C"],
      1: ["C#", "Db"],
      2: ["D"],
      3: ["D#", "Eb"],
      4: ["E"],
      5: ["F"],
      6: ["F#", "Gb"],
      7: ["G"],
      8: ["G#", "Ab"],
      9: ["A"],
      10: ["A#", "Bb"],
      11: ["B"]
    };
    const names = pitchNames[pitchClass] || [];
    return names.some((n) => notes.includes(n));
  };

  // White keys mappings (Index is the position 0 to 13 on the keyboard, semitone is the pitch offset)
  const whiteKeys = [
    { label: "C", semitone: 0 },
    { label: "D", semitone: 2 },
    { label: "E", semitone: 4 },
    { label: "F", semitone: 5 },
    { label: "G", semitone: 7 },
    { label: "A", semitone: 9 },
    { label: "B", semitone: 11 },
    { label: "C", semitone: 12 },
    { label: "D", semitone: 14 },
    { label: "E", semitone: 16 },
    { label: "F", semitone: 17 },
    { label: "G", semitone: 19 },
    { label: "A", semitone: 21 },
    { label: "B", semitone: 23 },
  ];

  // Black keys mappings (Offset relative to parent white key, semitone is pitch offset)
  const blackKeys = [
    { label: "C#", semitone: 1, left: 12 },
    { label: "D#", semitone: 3, left: 31 },
    { label: "F#", semitone: 6, left: 68 },
    { label: "G#", semitone: 8, left: 87 },
    { label: "A#", semitone: 10, left: 106 },
    { label: "C#", semitone: 13, left: 138 },
    { label: "D#", semitone: 15, left: 157 },
    { label: "F#", semitone: 18, left: 194 },
    { label: "G#", semitone: 20, left: 213 },
    { label: "A#", semitone: 22, left: 232 },
  ];

  const keyWidth = 18;
  const keyboardWidth = 14 * keyWidth; // 252px

  return (
    <div className="flex flex-col items-center bg-slate-950/60 p-5 rounded-2xl border border-slate-800 shadow-inner w-full max-w-[290px]" id="piano-chord-container">
      <div className="text-xs font-bold text-indigo-400 mb-1 uppercase tracking-wider font-mono">Piano Keyboard</div>
      <div className="text-xl font-bold text-white mb-4 tracking-tight">{name} Notes</div>

      <div className="relative h-[85px]" style={{ width: `${keyboardWidth}px` }} id="piano-keyboard-wrapper">
        {/* White Keys */}
        <div className="absolute top-0 left-0 flex w-full h-full z-10" id="piano-white-keys">
          {whiteKeys.map((key, idx) => {
            const active = isSemitoneInChord(key.semitone);
            return (
              <div
                key={`white-${idx}`}
                className={`relative border-r border-b border-slate-800 rounded-b-sm cursor-pointer transition-colors duration-200 ${
                  active
                    ? "bg-gradient-to-b from-indigo-500/90 to-indigo-600 shadow-[inset_0_-4px_0_#4f46e5]"
                    : "bg-white hover:bg-slate-100"
                }`}
                style={{
                  width: `${keyWidth}px`,
                  height: "80px",
                }}
              >
                {/* Note name display for highlighted keys */}
                {active && (
                  <div className="absolute bottom-1 left-0 right-0 text-[8px] font-bold text-white text-center font-mono">
                    {key.label}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Black Keys */}
        <div className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none" id="piano-black-keys">
          {blackKeys.map((key, idx) => {
            const active = isSemitoneInChord(key.semitone);
            return (
              <div
                key={`black-${idx}`}
                className={`absolute border border-slate-950 rounded-b-[2px] transition-colors duration-200 ${
                  active
                    ? "bg-gradient-to-b from-indigo-400 to-indigo-500 shadow-[inset_0_-3px_0_#6366f1]"
                    : "bg-slate-900 hover:bg-slate-800"
                }`}
                style={{
                  left: `${key.left}px`,
                  width: "11px",
                  height: "48px",
                  pointerEvents: "auto",
                  cursor: "pointer",
                }}
              >
                {/* Visual marker */}
                {active && (
                  <div className="absolute bottom-1 left-0 right-0 flex justify-center">
                    <span className="w-1 h-1 rounded-full bg-white opacity-80" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5 justify-center">
        {notes.map((note, idx) => (
          <span
            key={idx}
            className="px-2 py-0.5 text-xs font-semibold rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono"
          >
            {note}
          </span>
        ))}
      </div>
    </div>
  );
}
