/**
 * Procedural Vintage Sound Synthesizer via Web Audio API
 * Generates tactile audio micro-interactions (typewriter clicks, paper rustle, stamp thud, paper tear)
 * Zero external media dependencies.
 */

let audioCtx = null;
let soundEnabled = true; // Default enabled for authentic tactile experience

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
  const bufferSize = ctx.sampleRate * 0.12;
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
  gain.gain.setValueAtTime(0.12, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

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
  osc.frequency.exponentialRampToValueAtTime(45, now + 0.14);

  gain.gain.setValueAtTime(0.28, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.17);
}

/**
 * Realistic Sustained Paper Tear / Rip effect (ripping heavy parchment fibers)
 * Duration: 1.6 to 1.8 seconds with multi-frequency fiber crackles
 */
export function playPaperTear(duration = 1.7) {
  const ctx = getContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const bufferSize = Math.floor(ctx.sampleRate * duration);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  // Generate continuous tearing parchment noise with micro-snapping fiber bursts
  for (let i = 0; i < bufferSize; i++) {
    const t = i / bufferSize;
    // Friction base
    let base = (Math.random() * 2 - 1) * 0.35;
    // Layered fiber snaps that bunch up during the tear
    if (Math.random() < 0.06 + 0.05 * Math.sin(t * Math.PI)) {
      base += (Math.random() * 2 - 1) * (1.9 + Math.random() * 1.4);
    }
    // Envelope: ramps up smoothly, stays intense during the mid-tear, then settles
    const envelope = Math.sin(Math.pow(t, 0.8) * Math.PI);
    data[i] = base * envelope;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  // Sweeping dynamic bandpass simulating acoustic tearing opening up
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(800, now);
  filter.frequency.exponentialRampToValueAtTime(3200, now + duration * 0.45);
  filter.frequency.exponentialRampToValueAtTime(1050, now + duration);
  filter.Q.setValueAtTime(2.2, now);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.01, now);
  gain.gain.linearRampToValueAtTime(0.28, now + 0.18);
  gain.gain.setValueAtTime(0.28, now + duration * 0.65);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start(now);
  noise.stop(now + duration + 0.05);
}
