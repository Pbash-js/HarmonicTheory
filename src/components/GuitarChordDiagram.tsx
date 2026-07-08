import React from "react";
import { motion } from "motion/react";

interface GuitarChordDiagramProps {
  guitar: number[];
  name: string;
}

export default function GuitarChordDiagram({ guitar, name }: GuitarChordDiagramProps) {
  // Find minimum and maximum fret values (excluding open 0 and muted -1)
  const pressedFrets = guitar.filter((f) => f > 0);
  const maxFret = pressedFrets.length > 0 ? Math.max(...pressedFrets) : 0;
  
  // Decide start fret. If maxFret <= 4, start at 1. Otherwise, start at min pressed fret.
  let startFret = 1;
  if (maxFret > 4) {
    startFret = Math.min(...pressedFrets);
  }

  const numFrets = 4; // We display a 4-fret window
  const strings = ["E", "A", "D", "G", "B", "e"];

  return (
    <div className="flex flex-col items-center bg-slate-950/60 p-5 rounded-2xl border border-slate-800 shadow-inner w-full max-w-[210px]" id="guitar-chord-container">
      <div className="text-xs font-bold text-indigo-400 mb-1 uppercase tracking-wider font-mono">Guitar</div>
      <div className="text-xl font-bold text-white mb-4 tracking-tight">{name}</div>

      <svg width="150" height="200" viewBox="0 0 150 200" className="overflow-visible" id="guitar-svg">
        {/* Nut (Thick line at top if startFret === 1) */}
        {startFret === 1 ? (
          <line
            x1="25"
            y1="30"
            x2="125"
            y2="30"
            stroke="#94a3b8"
            strokeWidth="4"
            strokeLinecap="round"
          />
        ) : (
          <line
            x1="25"
            y1="30"
            x2="125"
            y2="30"
            stroke="#475569"
            strokeWidth="1.5"
          />
        )}

        {/* Fret Label (e.g. 3fr) */}
        {startFret > 1 && (
          <text
            x="8"
            y="48"
            fill="#6366f1"
            fontSize="11"
            fontWeight="bold"
            className="font-mono"
            textAnchor="end"
          >
            {startFret}fr
          </text>
        )}

        {/* Horizontal Frets (Lines) */}
        {Array.from({ length: numFrets }).map((_, i) => {
          const y = 30 + (i + 1) * 35;
          return (
            <line
              key={`fret-${i}`}
              x1="25"
              y1={y}
              x2="125"
              y2={y}
              stroke="#475569"
              strokeWidth="1"
            />
          );
        })}

        {/* Vertical Strings */}
        {strings.map((_, s) => {
          const x = 25 + s * 20;
          return (
            <line
              key={`string-${s}`}
              x1={x}
              y1="30"
              x2={x}
              y2="170"
              stroke="#64748b"
              strokeWidth={1 + (5 - s) * 0.3} // Low strings are slightly thicker! Beautiful realism detail.
            />
          );
        })}

        {/* Open (O) / Muted (X) indicators above the fretboard */}
        {guitar.map((fret, s) => {
          const x = 25 + s * 20;
          if (fret === -1) {
            return (
              <g key={`indicator-${s}`}>
                <line
                  x1={x - 4}
                  y1="12"
                  x2={x + 4}
                  y2="20"
                  stroke="#94a3b8"
                  strokeWidth="1.5"
                />
                <line
                  x1={x + 4}
                  y1="12"
                  x2={x - 4}
                  y2="20"
                  stroke="#94a3b8"
                  strokeWidth="1.5"
                />
              </g>
            );
          } else if (fret === 0) {
            return (
              <circle
                key={`indicator-${s}`}
                cx={x}
                cy="16"
                r="3.5"
                fill="none"
                stroke="#10b981"
                strokeWidth="1.5"
              />
            );
          }
          return null;
        })}

        {/* Fret Markers (Dots) */}
        {guitar.map((fret, s) => {
          if (fret <= 0) return null;
          
          const x = 25 + s * 20;
          // Calculate relative position within the 4-fret display window
          const fretIndex = fret - startFret + 1;
          
          if (fretIndex < 1 || fretIndex > numFrets) return null;
          
          // Center of the fret space
          const y = 30 + (fretIndex - 0.5) * 35;

          return (
            <g key={`dot-${s}`}>
              <motion.circle
                cx={x}
                cy={y}
                r="7"
                fill="#6366f1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
              <text
                x={x}
                y={y + 3}
                fill="#ffffff"
                fontSize="8"
                fontWeight="bold"
                textAnchor="middle"
              >
                {/* Visual string finger placeholder (optional) or just simple dot */}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="flex justify-between w-full px-2 mt-2 text-[10px] text-slate-500 font-mono">
        {strings.map((str, idx) => (
          <span key={idx} className={guitar[idx] === 0 ? "text-emerald-500 font-bold" : guitar[idx] > 0 ? "text-indigo-400 font-bold" : ""}>
            {str}
          </span>
        ))}
      </div>
    </div>
  );
}
