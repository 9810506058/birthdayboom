/**
 * Romantic Ambient Audio Synth
 * Uses the Web Audio API to create gentle, relaxing romantic chord progressions,
 * sweet celesta/rhodes chimes, and soft background lo-fi ambience when no external MP3 is loaded,
 * or handles playing real audio tracks smoothly.
 */

class RomanticAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private intervalId: any = null;
  private gainNode: GainNode | null = null;
  private volume: number = 0.4;
  private currentNoteIndex: number = 0;
  private customAudio: HTMLAudioElement | null = null;
  private listeners: Set<(playing: boolean) => void> = new Set();

  private chordProgressions = [
    // Beautiful romantic progression: Cmaj9 -> Am9 -> Fmaj7 -> Gsus4
    [261.63, 329.63, 392.00, 493.88, 587.33], // Cmaj9 (C4, E4, G4, B4, D5)
    [220.00, 261.63, 329.63, 392.00, 493.88], // Am9 (A3, C4, E4, G4, B4)
    [174.61, 261.63, 329.63, 349.23, 440.00], // Fmaj7 (F3, C4, E4, F4, A4)
    [196.00, 293.66, 392.00, 440.00, 587.33], // Gsus (G3, D4, G4, A4, D5)
    [261.63, 329.63, 392.00, 523.25, 659.25], // Cmaj (C4, E4, G4, C5, E5)
    [220.00, 329.63, 392.00, 440.00, 523.25], // Am7 (A3, E4, G4, A4, C5)
  ];

  constructor() {
    // Initialized on first user interaction
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public subscribe(fn: (playing: boolean) => void) {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.isPlaying));
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
    if (this.customAudio) {
      this.customAudio.volume = this.volume;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public playCustomUrl(url: string) {
    this.stopSynth();
    if (!this.customAudio) {
      this.customAudio = new Audio();
      this.customAudio.loop = true;
    }
    this.customAudio.src = url;
    this.customAudio.volume = this.volume;
    this.customAudio.play().then(() => {
      this.isPlaying = true;
      this.notify();
    }).catch(() => {
      // Fallback to synth if url playback fails
      this.playSynth();
    });
  }

  private playTone(freq: number, duration: number, delay: number = 0, type: OscillatorType = 'sine') {
    if (!this.ctx || !this.gainNode) return;
    const now = this.ctx.currentTime + delay;

    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    // Warm envelope: soft attack, gentle decay
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.exponentialRampToValueAtTime(0.12, now + 0.15);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(noteGain);
    noteGain.connect(this.gainNode);

    osc.start(now);
    osc.stop(now + duration + 0.1);
  }

  private playArpeggiatedChord(chord: number[]) {
    if (!this.isPlaying) return;
    chord.forEach((freq, idx) => {
      // Arpeggiate notes with subtle organic delays
      const delay = idx * 0.35 + (Math.random() * 0.05);
      const duration = 3.2;
      this.playTone(freq, duration, delay, 'sine');
      
      // Add subtle higher harmonic sparkle
      if (idx % 2 === 0) {
        this.playTone(freq * 2, duration * 0.7, delay + 0.1, 'triangle');
      }
    });
  }

  private stepProgression() {
    const chord = this.chordProgressions[this.currentNoteIndex];
    this.playArpeggiatedChord(chord);
    this.currentNoteIndex = (this.currentNoteIndex + 1) % this.chordProgressions.length;
  }

  public playSynth() {
    this.initContext();
    if (this.customAudio) {
      this.customAudio.pause();
    }
    this.isPlaying = true;
    this.notify();

    this.stepProgression();
    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      if (this.isPlaying) {
        this.stepProgression();
      }
    }, 2800);
  }

  private stopSynth() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public play() {
    this.initContext();
    this.playSynth();
  }

  public pause() {
    this.stopSynth();
    if (this.customAudio) {
      this.customAudio.pause();
    }
    this.isPlaying = false;
    this.notify();
  }
}

export const romanticAudio = new RomanticAudioEngine();
