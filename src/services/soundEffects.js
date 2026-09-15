/**
 * Subtle synthesized sound effects using the browser Web Audio API
 * No external sound files or network requests required.
 */

class SoundController {
  constructor() {
    this.audioCtx = null;
    this.enabled = true;
  }

  isMuted() {
    return !this.enabled;
  }

  toggleMute() {
    this.enabled = !this.enabled;
    return !this.enabled;
  }

  setMuted(muted) {
    this.enabled = !muted;
  }

  init() {
    if (!this.audioCtx && typeof window !== "undefined") {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
  }

  playTone(freq, duration, type = "sine", delay = 0) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.audioCtx) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + delay);

      gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + delay + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(this.audioCtx.currentTime + delay);
      osc.stop(this.audioCtx.currentTime + delay + duration);
    } catch (e) {
      // Audio context might be restricted before interaction
    }
  }

  playCorrect() {
    // Upbeat pleasant two-tone chime (E5 -> A5)
    this.playTone(659.25, 0.12, "sine", 0);
    this.playTone(880.00, 0.22, "sine", 0.09);
  }

  playIncorrect() {
    // Gentle warning tone (not harsh)
    this.playTone(280.00, 0.15, "triangle", 0);
    this.playTone(240.00, 0.25, "triangle", 0.1);
  }

  playComplete() {
    // Celebratory victory arpeggio: C5 -> E5 -> G5 -> C6
    this.playTone(523.25, 0.15, "sine", 0);
    this.playTone(659.25, 0.15, "sine", 0.1);
    this.playTone(783.99, 0.18, "sine", 0.2);
    this.playTone(1046.50, 0.40, "sine", 0.32);
  }
}

export const sounds = new SoundController();
