// Web Audio API Synthesizer for playing chords with realistic envelope and strum effects

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    // Create audio context (compatible with all major browsers)
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx!;
}

// Convert MIDI number to Frequency
export function midiToFreq(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

interface PlayChordOptions {
  strum?: boolean;
  waveType?: OscillatorType;
}

export function playChord(midiNotes: number[], options: PlayChordOptions = {}) {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    const strum = options.strum ?? false;
    const waveType = options.waveType ?? "triangle"; // triangle sounds warmer and softer

    // Create a master gain node for the entire chord
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, now);
    
    // Master envelope
    const totalDuration = strum ? 1.5 + (midiNotes.length * 0.08) : 1.5;
    const attack = 0.04;
    const sustainLevel = 0.45;
    
    // Connect to destination
    masterGain.connect(ctx.destination);

    // Smooth envelope trigger
    masterGain.gain.linearRampToValueAtTime(0.3, now + attack);
    masterGain.gain.exponentialRampToValueAtTime(sustainLevel, now + 0.3);
    masterGain.gain.setValueAtTime(sustainLevel, now + totalDuration - 0.4);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + totalDuration);

    const oscillators: OscillatorNode[] = [];

    midiNotes.forEach((midiVal, idx) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = waveType;
      osc.frequency.setValueAtTime(midiToFreq(midiVal), now);

      // Connect oscillator to its local gain, then to master
      osc.connect(gainNode);
      gainNode.connect(masterGain);

      // Fine-tuned balance based on pitch (lower pitches louder, higher slightly softer)
      const relativeVolume = 1 - (idx * 0.08); 
      gainNode.gain.setValueAtTime(Math.max(0.6, relativeVolume), now);

      // Calculate start time (with strum delay if enabled)
      const delay = strum ? idx * 0.08 : 0;
      const startTime = now + delay;

      osc.start(startTime);
      osc.stop(now + totalDuration);
      
      oscillators.push(osc);
    });

    // Cleanup nodes after playing
    setTimeout(() => {
      oscillators.forEach(osc => {
        try { osc.disconnect(); } catch (e) {}
      });
      try { masterGain.disconnect(); } catch (e) {}
    }, totalDuration * 1000 + 100);

  } catch (err) {
    console.warn("Audio Context playback failed or not supported in this frame:", err);
  }
}
