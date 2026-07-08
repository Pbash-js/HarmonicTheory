export interface ChordData {
  root: string;
  name: string;
  quality: "Major" | "Minor" | "Diminished";
  notes: string[];
  midi: number[];
  guitar: number[]; // -1 for X, 0 for open, >0 for fret
}

export interface ScaleHeader {
  numeral: string;
  qualityName: string;
  color: string; // Tailwind class or hex
}

export interface KeyRow {
  root: string;
  chords: ChordData[];
}

export const MINOR_HEADERS: ScaleHeader[] = [
  { numeral: "i", qualityName: "Minor", color: "#3b82f6" },       // Blue
  { numeral: "ii°", qualityName: "Diminished", color: "#10b981" }, // Green
  { numeral: "III", qualityName: "Major", color: "#ef4444" },      // Red
  { numeral: "iv", qualityName: "Minor", color: "#3b82f6" },       // Blue
  { numeral: "v", qualityName: "Minor", color: "#3b82f6" },        // Blue
  { numeral: "VI", qualityName: "Major", color: "#ef4444" },       // Red
  { numeral: "VII", qualityName: "Major", color: "#ef4444" },      // Red
];

export const MAJOR_HEADERS: ScaleHeader[] = [
  { numeral: "I", qualityName: "Major", color: "#ef4444" },        // Red
  { numeral: "ii", qualityName: "Minor", color: "#3b82f6" },       // Blue
  { numeral: "iii", qualityName: "Minor", color: "#3b82f6" },      // Blue
  { numeral: "IV", qualityName: "Major", color: "#ef4444" },       // Red
  { numeral: "V", qualityName: "Major", color: "#ef4444" },        // Red
  { numeral: "vi", qualityName: "Minor", color: "#3b82f6" },       // Blue
  { numeral: "vii°", qualityName: "Diminished", color: "#10b981" }, // Green
];

// Chord dictionary mapping chord name to its detail
export const CHORD_DICTIONARY: Record<string, { notes: string[]; midi: number[]; guitar: number[] }> = {
  // Major Chords
  "A": { notes: ["A", "C#", "E"], midi: [57, 61, 64], guitar: [-1, 0, 2, 2, 2, 0] },
  "B": { notes: ["B", "D#", "F#"], midi: [59, 63, 66], guitar: [-1, 2, 4, 4, 4, 2] },
  "C": { notes: ["C", "E", "G"], midi: [60, 64, 67], guitar: [-1, 3, 2, 0, 1, 0] },
  "D": { notes: ["D", "F#", "A"], midi: [50, 54, 57], guitar: [-1, -1, 0, 2, 3, 2] },
  "E": { notes: ["E", "G#", "B"], midi: [52, 56, 59], guitar: [0, 2, 2, 1, 0, 0] },
  "F": { notes: ["F", "A", "C"], midi: [53, 57, 60], guitar: [1, 3, 3, 2, 1, 1] },
  "G": { notes: ["G", "B", "D"], midi: [55, 59, 62], guitar: [3, 2, 0, 0, 0, 3] },
  "Bb": { notes: ["Bb", "D", "F"], midi: [58, 62, 65], guitar: [-1, 1, 3, 3, 3, 1] },
  "Eb": { notes: ["Eb", "G", "Bb"], midi: [51, 55, 58], guitar: [-1, -1, 1, 3, 4, 3] },
  "Ab": { notes: ["Ab", "C", "Eb"], midi: [56, 60, 63], guitar: [4, 6, 6, 5, 4, 4] },
  "Db": { notes: ["Db", "F", "Ab"], midi: [49, 53, 56], guitar: [-1, 4, 6, 6, 6, 4] },
  "F#": { notes: ["F#", "A#", "C#"], midi: [54, 58, 61], guitar: [2, 4, 4, 3, 2, 2] },

  // Minor Chords
  "Am": { notes: ["A", "C", "E"], midi: [57, 60, 64], guitar: [-1, 0, 2, 2, 1, 0] },
  "Bm": { notes: ["B", "D", "F#"], midi: [59, 62, 66], guitar: [-1, 2, 4, 4, 3, 2] },
  "Cm": { notes: ["C", "Eb", "G"], midi: [48, 51, 55], guitar: [-1, 3, 5, 5, 4, 3] },
  "Dm": { notes: ["D", "F", "A"], midi: [50, 53, 57], guitar: [-1, -1, 0, 2, 3, 1] },
  "Em": { notes: ["E", "G", "B"], midi: [52, 55, 59], guitar: [0, 2, 2, 0, 0, 0] },
  "Fm": { notes: ["F", "Ab", "C"], midi: [53, 56, 60], guitar: [1, 3, 3, 1, 1, 1] },
  "Gm": { notes: ["G", "Bb", "D"], midi: [55, 58, 62], guitar: [3, 5, 5, 3, 3, 3] },
  "C#m": { notes: ["C#", "E", "G#"], midi: [49, 52, 56], guitar: [-1, 4, 6, 6, 5, 4] },
  "D#m": { notes: ["D#", "F#", "A#"], midi: [51, 54, 58], guitar: [-1, 6, 8, 8, 7, 6] },
  "F#m": { notes: ["F#", "A", "C#"], midi: [54, 57, 61], guitar: [2, 4, 4, 2, 2, 2] },
  "G#m": { notes: ["G#", "B", "D#"], midi: [56, 59, 63], guitar: [4, 6, 6, 4, 4, 4] },
  "Bbm": { notes: ["Bb", "Db", "F"], midi: [58, 61, 65], guitar: [-1, 1, 3, 3, 2, 1] },

  // Diminished Chords
  "Adim": { notes: ["A", "C", "Eb"], midi: [57, 60, 63], guitar: [-1, -1, 1, 2, 1, 2] },
  "Bdim": { notes: ["B", "D", "F"], midi: [59, 62, 65], guitar: [-1, 2, 3, 4, 3, -1] },
  "C#dim": { notes: ["C#", "E", "G"], midi: [49, 52, 55], guitar: [-1, 4, 5, 6, 5, -1] },
  "Ddim": { notes: ["D", "F", "Ab"], midi: [50, 53, 56], guitar: [-1, -1, 0, 1, 3, 1] },
  "D#dim": { notes: ["D#", "F#", "A"], midi: [51, 54, 57], guitar: [-1, -1, 1, 2, 1, 2] },
  "Edim": { notes: ["E", "G", "Bb"], midi: [52, 55, 58], guitar: [-1, -1, 2, 3, 2, 3] },
  "F#dim": { notes: ["F#", "A", "C"], midi: [54, 57, 60], guitar: [2, -1, 4, 2, 1, -1] },
  "Gdim": { notes: ["G", "Bb", "Db"], midi: [55, 58, 61], guitar: [-1, -1, 5, 6, 5, 6] },
  "G#dim": { notes: ["G#", "B", "D"], midi: [56, 59, 62], guitar: [4, -1, 6, 4, 3, -1] },
  "A#dim": { notes: ["A#", "C#", "E"], midi: [58, 61, 64], guitar: [-1, 1, 2, 3, 2, -1] },
};

// Helper to fully populate chord details based on root and quality
export function getChord(root: string, quality: "Major" | "Minor" | "Diminished"): ChordData {
  let suffix = "";
  if (quality === "Minor") suffix = "m";
  else if (quality === "Diminished") suffix = "dim";

  const name = `${root}${suffix}`;
  const details = CHORD_DICTIONARY[name];

  if (!details) {
    // Fail-safe default
    return {
      root,
      name,
      quality,
      notes: [root],
      midi: [60],
      guitar: [-1, -1, -1, -1, -1, -1]
    };
  }

  return {
    root,
    name,
    quality,
    notes: details.notes,
    midi: details.midi,
    guitar: details.guitar
  };
}

// Full row definitions matching the exact image grid (Roots: A, B, C, D, E, F, G)
export const MINOR_KEYS_GRID: KeyRow[] = [
  // A minor: Am, Bdim, C, Dm, Em, F, G
  {
    root: "A",
    chords: [
      getChord("A", "Minor"),
      getChord("B", "Diminished"),
      getChord("C", "Major"),
      getChord("D", "Minor"),
      getChord("E", "Minor"),
      getChord("F", "Major"),
      getChord("G", "Major"),
    ]
  },
  // B minor: Bm, C#dim, D, Em, F#m, G, A
  {
    root: "B",
    chords: [
      getChord("B", "Minor"),
      getChord("C#", "Diminished"),
      getChord("D", "Major"),
      getChord("E", "Minor"),
      getChord("F#", "Minor"),
      getChord("G", "Major"),
      getChord("A", "Major"),
    ]
  },
  // C minor: Cm, Ddim, Eb, Fm, Gm, Ab, Bb
  {
    root: "C",
    chords: [
      getChord("C", "Minor"),
      getChord("D", "Diminished"),
      getChord("Eb", "Major"),
      getChord("F", "Minor"),
      getChord("G", "Minor"),
      getChord("Ab", "Major"),
      getChord("Bb", "Major"),
    ]
  },
  // D minor: Dm, Edim, F, Gm, Am, Bb, C
  {
    root: "D",
    chords: [
      getChord("D", "Minor"),
      getChord("E", "Diminished"),
      getChord("F", "Major"),
      getChord("G", "Minor"),
      getChord("A", "Minor"),
      getChord("Bb", "Major"),
      getChord("C", "Major"),
    ]
  },
  // E minor: Em, F#dim, G, Am, Bm, C, D
  {
    root: "E",
    chords: [
      getChord("E", "Minor"),
      getChord("F#", "Diminished"),
      getChord("G", "Major"),
      getChord("A", "Minor"),
      getChord("B", "Minor"),
      getChord("C", "Major"),
      getChord("D", "Major"),
    ]
  },
  // F minor: Fm, Gdim, Ab, Bbm, Cm, Db, Eb
  {
    root: "F",
    chords: [
      getChord("F", "Minor"),
      getChord("G", "Diminished"),
      getChord("Ab", "Major"),
      getChord("Bb", "Minor"),
      getChord("C", "Minor"),
      getChord("Db", "Major"),
      getChord("Eb", "Major"),
    ]
  },
  // G minor: Gm, Adim, Bb, Cm, Dm, Eb, F
  {
    root: "G",
    chords: [
      getChord("G", "Minor"),
      getChord("A", "Diminished"),
      getChord("Bb", "Major"),
      getChord("C", "Minor"),
      getChord("D", "Minor"),
      getChord("Eb", "Major"),
      getChord("F", "Major"),
    ]
  },
];

export const MAJOR_KEYS_GRID: KeyRow[] = [
  // A Major: A, Bm, C#m, D, E, F#m, G#dim
  {
    root: "A",
    chords: [
      getChord("A", "Major"),
      getChord("B", "Minor"),
      getChord("C#", "Minor"),
      getChord("D", "Major"),
      getChord("E", "Major"),
      getChord("F#", "Minor"),
      getChord("G#", "Diminished"),
    ]
  },
  // B Major: B, C#m, D#m, E, F#, G#m, A#dim
  {
    root: "B",
    chords: [
      getChord("B", "Major"),
      getChord("C#", "Minor"),
      getChord("D#", "Minor"),
      getChord("E", "Major"),
      getChord("F#", "Major"),
      getChord("G#", "Minor"),
      getChord("A#", "Diminished"),
    ]
  },
  // C Major: C, Dm, Em, F, G, Am, Bdim
  {
    root: "C",
    chords: [
      getChord("C", "Major"),
      getChord("D", "Minor"),
      getChord("E", "Minor"),
      getChord("F", "Major"),
      getChord("G", "Major"),
      getChord("A", "Minor"),
      getChord("B", "Diminished"),
    ]
  },
  // D Major: D, Em, F#m, G, A, Bm, C#dim
  {
    root: "D",
    chords: [
      getChord("D", "Major"),
      getChord("E", "Minor"),
      getChord("F#", "Minor"),
      getChord("G", "Major"),
      getChord("A", "Major"),
      getChord("B", "Minor"),
      getChord("C#", "Diminished"),
    ]
  },
  // E Major: E, F#m, G#m, A, B, C#m, D#dim
  {
    root: "E",
    chords: [
      getChord("E", "Major"),
      getChord("F#", "Minor"),
      getChord("G#", "Minor"),
      getChord("A", "Major"),
      getChord("B", "Major"),
      getChord("C#", "Minor"),
      getChord("D#", "Diminished"),
    ]
  },
  // F Major: F, Gm, Am, Bb, C, Dm, Edim
  {
    root: "F",
    chords: [
      getChord("F", "Major"),
      getChord("G", "Minor"),
      getChord("A", "Minor"),
      getChord("Bb", "Major"),
      getChord("C", "Major"),
      getChord("D", "Minor"),
      getChord("E", "Diminished"),
    ]
  },
  // G Major: G, Am, Bm, C, D, Em, F#dim
  {
    root: "G",
    chords: [
      getChord("G", "Major"),
      getChord("A", "Minor"),
      getChord("B", "Minor"),
      getChord("C", "Major"),
      getChord("D", "Major"),
      getChord("E", "Minor"),
      getChord("F#", "Diminished"),
    ]
  },
];
