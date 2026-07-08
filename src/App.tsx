import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Music,
  Volume2,
  Info,
  Play,
  Sparkles,
  HelpCircle,
  BookOpen
} from "lucide-react";
import {
  MINOR_HEADERS,
  MAJOR_HEADERS,
  MINOR_KEYS_GRID,
  MAJOR_KEYS_GRID,
  ChordData,
  ScaleHeader,
  KeyRow
} from "./data";
import GuitarChordDiagram from "./components/GuitarChordDiagram";
import PianoChordDiagram from "./components/PianoChordDiagram";
import { playChord } from "./lib/synth";

export default function App() {
  const [scaleMode, setScaleMode] = useState<"Minor" | "Major">("Minor");
  
  // Grid and headers based on active scale mode
  const currentGrid = scaleMode === "Minor" ? MINOR_KEYS_GRID : MAJOR_KEYS_GRID;
  const currentHeaders = scaleMode === "Minor" ? MINOR_HEADERS : MAJOR_HEADERS;

  // Track selected (pinned) chord and hovered chord
  const [selectedChord, setSelectedChord] = useState<ChordData>(currentGrid[0].chords[0]);
  const [hoveredChord, setHoveredChord] = useState<ChordData | null>(null);
  const [hoverPlay, setHoverPlay] = useState<boolean>(false);
  
  // The chord currently being displayed is the hovered one (if any) or falls back to the pinned one
  const activeChord = hoveredChord || selectedChord;

  // Determine scale degree index and roman numeral for the active chord
  const activeRow = currentGrid.find((row) =>
    row.chords.some((c) => c.name === activeChord.name)
  );
  
  const chordIndex = activeRow
    ? activeRow.chords.findIndex((c) => c.name === activeChord.name)
    : 0;

  const activeHeader = currentHeaders[chordIndex] || currentHeaders[0];

  // Function to handle chord activation
  const handleChordClick = (chord: ChordData) => {
    setSelectedChord(chord);
    playChord(chord.midi, { strum: false });
  };

  const handleChordHover = (chord: ChordData) => {
    setHoveredChord(chord);
    if (hoverPlay) {
      playChord(chord.midi, { strum: false });
    }
  };

  const handleSwitchScale = (mode: "Minor" | "Major") => {
    setScaleMode(mode);
    const targetGrid = mode === "Minor" ? MINOR_KEYS_GRID : MAJOR_KEYS_GRID;
    // Set to first chord of the new grid
    setSelectedChord(targetGrid[0].chords[0]);
  };

  return (
    <div className="min-h-screen bg-[#0c0d10] text-slate-200 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200" id="app-root">
      {/* Background ambient glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 w-full flex-grow flex flex-col z-10" id="main-content">
        
        {/* Header Section */}
        <header className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end md:justify-between gap-6" id="app-header">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2.5 text-indigo-400 font-mono text-xs tracking-widest uppercase mb-1">
              <Sparkles size={13} className="animate-pulse" />
              <span>Interactive Music Theory • Bento Suite</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black font-display tracking-tight text-white">
              HarmonicTheory <span className="text-indigo-500 font-bold">v2.0</span>
            </h1>
            <p className="text-slate-400 mt-2 max-w-xl text-sm md:text-base font-light">
              A comprehensive reference grid for scale-degree chords. Click on any chord to play it, view its finger placement on the fretboard, or see its key mapping on a piano keyboard.
            </p>
          </div>

          {/* Scale Mode Switcher & Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#16181d] p-2 rounded-2xl border border-slate-800 shadow-xl backdrop-blur-md" id="controls-panel">
            {/* Scale toggle pills */}
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800/60" id="mode-toggles">
              <button
                id="toggle-minor"
                onClick={() => handleSwitchScale("Minor")}
                className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-300 cursor-pointer ${
                  scaleMode === "Minor"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Minor Scale (i - vii°)
              </button>
              <button
                id="toggle-major"
                onClick={() => handleSwitchScale("Major")}
                className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-300 cursor-pointer ${
                  scaleMode === "Major"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Major Scale (I - vii°)
              </button>
            </div>

            {/* Hover Sound Toggle */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-850/40 transition-colors" id="hover-sound-toggle">
              <input
                type="checkbox"
                id="hover-play-checkbox"
                checked={hoverPlay}
                onChange={(e) => setHoverPlay(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-950 border-slate-700 cursor-pointer"
              />
              <label
                htmlFor="hover-play-checkbox"
                className="text-xs text-slate-300 cursor-pointer font-medium select-none flex items-center gap-1.5"
              >
                <Volume2 size={13} className="text-indigo-400" />
                Play on Hover
              </label>
            </div>
          </div>
        </header>

        {/* Outer Grid & Details Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full" id="workspace-layout">
          
          {/* LEFT: Interactive Chord Matrix Grid */}
          <section className="col-span-1 lg:col-span-8 flex flex-col" id="matrix-section">
            <div className="bg-[#16181d] rounded-3xl border border-slate-800 overflow-hidden shadow-xl p-1 md:p-4" id="grid-wrapper">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-center table-fixed min-w-[700px]" id="chord-matrix-table">
                  {/* Table Head: Scale Degrees (Columns i - vii) */}
                  <thead>
                    <tr className="border-b border-slate-800/80 bg-slate-900/20">
                      {/* Empty corner header for Key Roots */}
                      <th className="w-20 p-4 text-xs font-bold text-slate-500 uppercase tracking-widest border-r border-slate-800/80 text-left pl-4 font-mono">
                        Key
                      </th>
                      {currentHeaders.map((header, idx) => (
                        <th
                          key={idx}
                          className="p-4 border-r border-slate-800/80 last:border-r-0 relative"
                        >
                          {/* Color bar at the top of each column matching the quality (Red/Blue/Green) */}
                          <div
                            className="absolute top-0 left-0 right-0 h-1"
                            style={{ backgroundColor: header.color }}
                          />
                          <div className="pt-1">
                            <span
                              className="text-xl font-bold font-display tracking-wide block"
                              style={{ color: header.color }}
                            >
                              {header.numeral}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 block uppercase mt-0.5 tracking-wider">
                              {header.qualityName}
                            </span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  {/* Table Body: Key Rows (A to G) */}
                  <tbody className="divide-y divide-slate-800/60">
                    {currentGrid.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className="hover:bg-slate-900/30 transition-colors"
                      >
                        {/* Row Header: Key identifier */}
                        <td className="w-20 p-4 border-r border-slate-800/80 text-left pl-4 font-bold text-slate-300 text-sm font-mono bg-slate-900/10">
                          {row.root} <span className="text-[10px] text-slate-500 font-normal">{scaleMode === "Minor" ? "min" : "maj"}</span>
                        </td>

                        {/* Chord cells */}
                        {row.chords.map((chord, cIdx) => {
                          const isSelected = selectedChord.name === chord.name;
                          const isHovered = hoveredChord?.name === chord.name;
                          const headerColor = currentHeaders[cIdx].color;

                          return (
                            <td
                              key={cIdx}
                              className="p-1 border-r border-slate-800/60 last:border-r-0"
                            >
                              <button
                                id={`chord-btn-${row.root}-${chord.name}`}
                                onClick={() => handleChordClick(chord)}
                                onMouseEnter={() => handleChordHover(chord)}
                                onMouseLeave={() => setHoveredChord(null)}
                                className={`w-full py-4 px-2 rounded-2xl transition-all duration-300 flex flex-col items-center justify-center cursor-pointer ${
                                  isSelected
                                    ? "bg-indigo-950/20 border-2 text-white shadow-lg"
                                    : "bg-slate-900/30 text-slate-300 hover:bg-slate-800/50 hover:text-white"
                                }`}
                                style={{
                                  borderColor: isSelected ? headerColor : "transparent"
                                }}
                              >
                                {/* Display only the root letter as requested, matching the image! */}
                                <motion.span
                                  className="text-lg font-bold tracking-tight block"
                                  animate={{
                                    scale: isHovered || isSelected ? 1.15 : 1,
                                    color: isHovered || isSelected ? "#ffffff" : "#cbd5e1"
                                  }}
                                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                >
                                  {chord.root}
                                </motion.span>
                                
                                {/* Secondary subtitle showing complete chord name (e.g. Am, Bdim) */}
                                <span className="text-[10px] text-slate-500 font-mono mt-0.5 font-medium">
                                  {chord.name}
                                </span>
                              </button>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Scale degree explanation helper */}
            <div className="mt-4 bg-[#16181d] border border-slate-800 rounded-3xl p-5 flex gap-3 text-xs text-slate-400 shadow-lg" id="matrix-footer-guide">
              <Info size={16} className="text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-200 mb-0.5">Scale Degrees & Diatonic Qualities</p>
                <p>
                  Each column represents a degree of the {scaleMode} scale. 
                  <span className="text-blue-400 font-semibold ml-1 font-mono">Blue Columns</span> are Minor chords, 
                  <span className="text-red-400 font-semibold ml-1 font-mono">Red Columns</span> are Major chords, and the 
                  <span className="text-emerald-400 font-semibold ml-1 font-mono">Green Column</span> represents the Diminished chord.
                </p>
              </div>
            </div>
          </section>

          {/* RIGHT: Active Chord Diagrams & Interactive Playback */}
          <aside className="col-span-1 lg:col-span-4" id="diagrams-sidebar">
            <div className="bg-[#16181d] border border-slate-800 rounded-3xl p-8 shadow-xl backdrop-blur-md sticky top-6 overflow-hidden flex flex-col" id="chord-viewer-card">
              
              {/* Aesthetic Background Glow */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

              {/* Active Chord Title */}
              <div className="border-b border-slate-800 pb-5 mb-5 relative z-10" id="active-chord-header">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider uppercase mb-1" style={{ color: activeHeader.color }}>
                  <Music size={12} />
                  <span>Degree {activeHeader.numeral} • {activeHeader.qualityName}</span>
                </div>
                
                <h2 className="text-3xl font-extrabold text-white font-display tracking-tight flex items-center justify-between mt-1">
                  <span>{activeChord.name}</span>
                  <span className="text-xs font-normal px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 font-mono">
                    {activeChord.quality}
                  </span>
                </h2>

                <p className="text-xs text-slate-400 mt-2.5 font-mono flex items-center gap-1">
                  <span>In {activeRow?.root} {scaleMode}:</span>
                  <span className="font-semibold text-white">Degree {activeHeader.numeral} ({activeHeader.qualityName})</span>
                </p>
              </div>

              {/* Sound Playback Controls */}
              <div className="flex gap-2.5 mb-6 relative z-10" id="audio-controls">
                <button
                  onClick={() => playChord(activeChord.midi, { strum: false })}
                  className="flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-700 active:bg-slate-750 text-white text-xs font-semibold rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md"
                >
                  <Play size={13} fill="currentColor" />
                  Play Triad
                </button>
                <button
                  onClick={() => playChord(activeChord.midi, { strum: true })}
                  className="flex-1 py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-indigo-500/20 border border-indigo-500/30"
                >
                  <Volume2 size={13} />
                  Strum Chord
                </button>
              </div>

              {/* Chord diagrams container - Stacked beautifully */}
              <div className="grid grid-cols-1 gap-5 relative z-10" id="visualizers">
                <div className="flex flex-col sm:flex-row lg:flex-col gap-4 justify-center items-center w-full">
                  <GuitarChordDiagram
                    guitar={activeChord.guitar}
                    name={activeChord.name}
                  />
                  <PianoChordDiagram
                    notes={activeChord.notes}
                    name={activeChord.name}
                  />
                </div>
              </div>

              {/* Learning / Explainer card */}
              <div className="mt-6 pt-5 border-t border-slate-800 relative z-10" id="reading-guide">
                <h3 className="text-xs font-bold text-slate-300 flex items-center gap-1.5 mb-2.5 uppercase tracking-wider font-mono">
                  <BookOpen size={12} className="text-indigo-400" />
                  How to read the diagrams
                </h3>
                <div className="space-y-2 text-xs text-slate-400 leading-relaxed font-sans">
                  <p>
                    <strong className="text-slate-200">Guitar:</strong> Vertical lines are strings (Low E on left to High E on right). Solid blue dots are strings to fret. <code className="text-emerald-400">O</code> means open string; <code className="text-slate-500">X</code> means do not play.
                  </p>
                  <p>
                    <strong className="text-slate-200">Piano:</strong> Blue highlighted keys represent the triad notes. Black keys are positioned accurately in their standard piano physical layout.
                  </p>
                </div>
              </div>

            </div>
          </aside>

        </div>

        {/* Helpful Music Theory Guide Footer section */}
        <section className="mt-16 bg-[#16181d] border border-slate-800 rounded-3xl p-8 shadow-xl" id="theory-guide-section">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 font-display">
            <BookOpen className="text-indigo-400" size={18} />
            Understanding Scale-Degree Chords
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-400 leading-relaxed" id="theory-grid">
            <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800 hover:border-indigo-500/20 transition-all">
              <h3 className="font-bold text-slate-200 mb-2 font-display">Chord Qualities</h3>
              <p className="font-light">
                Within any natural major or minor scale, building a triad on each note generates a set of chords with distinct qualities (Major, Minor, or Diminished). This pattern is mathematically identical across all keys, making this grid a powerful transpose tool.
              </p>
            </div>
            
            <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800 hover:border-indigo-500/20 transition-all">
              <h3 className="font-bold text-slate-200 mb-2 font-display">Roman Numeral notation</h3>
              <p className="font-light">
                Musicians use Roman Numerals to represent these chord relationships. Capitalized letters (<span className="text-indigo-400 font-mono font-semibold">I, IV, V</span>) represent Major chords, while lowercase letters (<span className="text-indigo-400 font-mono font-semibold">i, iv, v</span>) represent Minor chords. The degree mark (<span className="text-emerald-400 font-mono font-semibold">°</span>) denotes a Diminished chord.
              </p>
            </div>

            <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800 hover:border-indigo-500/20 transition-all">
              <h3 className="font-bold text-slate-200 mb-2 font-display">Strumming & Audio</h3>
              <p className="font-light">
                Use the <strong className="text-slate-300">Strum Chord</strong> feature to hear notes articulated sequentially from lowest to highest. This mimics the physical sweep of a plectrum across the strings of a guitar, rendering chord diagrams acoustic as well as visual.
              </p>
            </div>
          </div>
        </section>

      </div>

      {/* Modern thin Footer */}
      <footer className="mt-8 flex flex-col sm:flex-row justify-between items-center px-6 py-6 border-t border-slate-900 gap-4" id="app-footer">
        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
          Session: Active • Mode: {scaleMode === "Minor" ? "Aeolian Minor" : "Ionian Major"} • Tempo: 120BPM
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Theory Engine Connected</span>
          </div>
          <span className="text-slate-700 hidden sm:inline">|</span>
          <span className="text-xs text-slate-500 font-mono">Interactive Chord Grid • Crafted with precision</span>
        </div>
      </footer>
    </div>
  );
}
