class SoundEngine {
  private ctx: AudioContext | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private droneOscs: OscillatorNode[] = [];
  private isMusicPlaying: boolean = false;
  private musicEnabled: boolean = true;
  private sfxEnabled: boolean = true;

  private init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.value = 0.12;
      this.musicGain.connect(this.ctx.destination);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.value = 0.28;
      this.sfxGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMusicEnabled(enabled: boolean) {
    this.musicEnabled = enabled;
    if (!enabled && this.isMusicPlaying) {
      this.stopAmbientDrone();
    } else if (enabled && !this.isMusicPlaying) {
      this.startAmbientDrone();
    }
  }

  public setSfxEnabled(enabled: boolean) {
    this.sfxEnabled = enabled;
  }

  // Soft Indian temple brass bell (Ghanti) with harmonic overtones
  public playTempleBell() {
    if (!this.sfxEnabled) return;
    try {
      this.init();
      if (!this.ctx || !this.sfxGain) return;

      const now = this.ctx.currentTime;
      const baseFreq = 880; // A5 metallic ring
      const harmonics = [1, 2.76, 5.4, 8.9];
      const gains = [0.4, 0.2, 0.1, 0.05];

      harmonics.forEach((h, index) => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();

        osc.type = index === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(baseFreq * h, now);

        g.gain.setValueAtTime(gains[index] * 0.7, now);
        g.gain.exponentialRampToValueAtTime(0.0001, now + (2.5 - index * 0.4));

        osc.connect(g);
        g.connect(this.sfxGain);

        osc.start(now);
        osc.stop(now + 2.5);
      });
    } catch {
      // Audio fallback silent
    }
  }

  // Modak / item collection sparkle
  public playCollectSound() {
    if (!this.sfxEnabled) return;
    try {
      this.init();
      if (!this.ctx || !this.sfxGain) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(1174.66, now + 0.18); // D6

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch {
      // Audio fallback silent
    }
  }

  // Button click / subtle wooden tactile click
  public playClick() {
    if (!this.sfxEnabled) return;
    try {
      this.init();
      if (!this.ctx || !this.sfxGain) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.05);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // Audio fallback silent
    }
  }

  // Correct choice / auspicious chime
  public playCorrect() {
    if (!this.sfxEnabled) return;
    try {
      this.init();
      if (!this.ctx || !this.sfxGain) return;

      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio

      notes.forEach((freq, idx) => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.25, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.4);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.45);
      });
    } catch {
      // Audio fallback silent
    }
  }

  // Gentle informative guidance chime (no harsh buzzer)
  public playHint() {
    if (!this.sfxEnabled) return;
    try {
      this.init();
      if (!this.ctx || !this.sfxGain) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(329.63, now); // E4
      osc.frequency.setValueAtTime(293.66, now + 0.12); // D4

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch {
      // Audio fallback silent
    }
  }

  // Level completion fanfare & conch-like resonant blessing
  public playLevelComplete() {
    if (!this.sfxEnabled) return;
    try {
      this.init();
      if (!this.ctx || !this.sfxGain) return;

      const now = this.ctx.currentTime;
      // Traditional Raag Bhupali ascending notes (Sa, Re, Ga, Pa, Dha, Sa')
      const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];

      notes.forEach((freq, idx) => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.14);

        gain.gain.setValueAtTime(0.28, now + idx * 0.14);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.14 + 0.8);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now + idx * 0.14);
        osc.stop(now + idx * 0.14 + 0.85);
      });
      // Ring bell at peak
      setTimeout(() => this.playTempleBell(), 700);
    } catch {
      // Audio fallback silent
    }
  }

  // Soft meditative Tanpura drone for background atmosphere
  public startAmbientDrone() {
    if (!this.musicEnabled || this.isMusicPlaying) return;
    try {
      this.init();
      if (!this.ctx || !this.musicGain) return;

      const base = 130.81; // C3
      const freqs = [base, base * 1.5, base * 2]; // Sa - Pa - Sa'

      this.droneOscs = freqs.map((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = i === 1 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);

        // LFO for slow breathing wave
        const lfo = this.ctx!.createOscillator();
        const lfoGain = this.ctx!.createGain();
        lfo.frequency.value = 0.2 + i * 0.1;
        lfoGain.gain.value = 0.04;
        lfo.connect(lfoGain);
        lfoGain.connect(gain.gain);
        lfo.start();

        gain.gain.setValueAtTime(0.08, this.ctx!.currentTime);
        osc.connect(gain);
        gain.connect(this.musicGain!);
        osc.start();

        return osc;
      });

      this.isMusicPlaying = true;
    } catch {
      // Audio fallback silent
    }
  }

  public stopAmbientDrone() {
    this.droneOscs.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // ignore
      }
    });
    this.droneOscs = [];
    this.isMusicPlaying = false;
  }
}

export const soundService = new SoundEngine();
