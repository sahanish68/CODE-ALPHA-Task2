/**
 * Web Audio API synthesizer for tactile mechanical feedback
 */
let audioCtx = null;

export function playKeyClick(type = 'default', enabled = true) {
  if (!enabled) return;

  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;
    let freq = 600;
    let duration = 0.04;

    if (type === 'operator') freq = 820;
    else if (type === 'equals') freq = 1040;
    else if (type === 'action') freq = 440;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq / 2, now + duration);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.start(now);
    osc.stop(now + duration);
  } catch {
    // Graceful fallback if autoplay policy or audio is disabled
  }
}
