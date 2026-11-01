/**
 * Procedural Vintage Sound Synthesizer via Web Audio API
 * Generates tactile audio micro-interactions (typewriter clicks, paper rustle, stamp thud)
 * Zero external media dependencies.
 */

let audioCtx = null;
let soundEnabled = false;

export function toggleSound(state) {
  if (state !== undefined) {
    soundEnabled = state;
  } else {
    soundEnabled = !soundEnabled;
  }
  if (soundEnabled && !audioCtx) {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    } catch {
      // AudioContext not supported
    }
  }
  return soundEnabled;
}

export function isSoundEnabled() {
  return soundEnabled;
}

function getContext() {
  if (!soundEnabled) return null;
  if (!audioCtx) {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    } catch {
      return null;
    }
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Typewriter key click (crisp mechanical high-frequency transient)
 */
export function playTypewriterClick() {
  const ctx = getContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(800, now);
  osc.frequency.exponentialRampToValueAtTime(120, now + 0.04);

  gain.gain.setValueAtTime(0.12, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.045);
}

/**
 * Subtle tactile paper rustle (filtered noise burst)
 */
export function playPaperRustle() {
  const ctx = getContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const bufferSize = ctx.sampleRate * 0.08;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(1400, now);
  filter.Q.setValueAtTime(2.0, now);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start(now);
}

/**
 * Vintage Rubber Stamp thud (deep acoustic body impact)
 */
export function playStampThud() {
  const ctx = getContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(140, now);
  osc.frequency.exponentialRampToValueAtTime(45, now + 0.12);

  gain.gain.setValueAtTime(0.25, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.15);
}

/**
 * Realistic Paper Tear / Rip effect (ripping parchment paper fibers)
 */
export function playPaperTear() {
  const ctx = getContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const duration = 0.42; // 420ms ripping sound
  const bufferSize = Math.floor(ctx.sampleRate * duration);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  // Generate tearing fiber noise with random crackle impulses
  for (let i = 0; i < bufferSize; i++) {
    const t = i / bufferSize;
    let val = (Math.random() * 2 - 1) * Math.sin(t * Math.PI);
    if (Math.random() < 0.08) {
      val += (Math.random() * 2 - 1) * 2.2;
    }
    data[i] = val * (1 - t * 0.3);
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(1200, now);
  filter.frequency.exponentialRampToValueAtTime(3400, now + 0.18);
  filter.frequency.exponentialRampToValueAtTime(950, now + duration);
  filter.Q.setValueAtTime(3.5, now);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.01, now);
  gain.gain.linearRampToValueAtTime(0.25, now + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start(now);
  noise.stop(now + duration + 0.02);
}

