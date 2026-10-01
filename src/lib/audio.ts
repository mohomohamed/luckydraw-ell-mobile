// Web Audio API Synthesis Engine for Apple Haptic Clicks and Chimes

class SoundEngine {
  private audioCtx: AudioContext | null = null;
  private isEnabled: boolean = true;

  public setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
  }

  public getEnabled(): boolean {
    return this.isEnabled;
  }

  private initContext() {
    if (typeof window === "undefined") return;
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
  }

  public playTick(pitchMultiplier: number = 1) {
    if (!this.isEnabled) return;
    try {
      this.initContext();
      if (!this.audioCtx) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(1400 * pitchMultiplier, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(110, this.audioCtx.currentTime + 0.032);

      gain.gain.setValueAtTime(0.12, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.032);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.033);
    } catch {
      // Ignore audio context autoplay errors
    }
  }

  public playCelebrationChime() {
    if (!this.isEnabled) return;
    try {
      this.initContext();
      if (!this.audioCtx) return;

      const chord = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
      chord.forEach((freq, idx) => {
        setTimeout(() => {
          if (!this.audioCtx) return;
          try {
            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();

            osc.type = "sine";
            osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

            gain.gain.setValueAtTime(0.15, this.audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 1.9);

            osc.connect(gain);
            gain.connect(this.audioCtx.destination);

            osc.start();
            osc.stop(this.audioCtx.currentTime + 1.95);
          } catch {
            // Ignore context shutdown
          }
        }, idx * 85);
      });
    } catch {
      // Audio errors silenced
    }
  }
}

export const soundEngine = new SoundEngine();
