import { SupportedLanguage } from '../types';

/**
 * Text-to-Speech service using native Web Speech API Synthesis.
 * Guaranteed 1-time playback without repeating.
 */

// Native language voice codes
const NATIVE_LANG_CODES: Record<SupportedLanguage, string[]> = {
  hi: ['hi-IN', 'hi_IN', 'hi'],
  gu: ['gu-IN', 'gu_IN', 'gu'],
  mr: ['mr-IN', 'mr_IN', 'mr'],
  ta: ['ta-IN', 'ta_IN', 'ta'],
  te: ['te-IN', 'te_IN', 'te'],
  bn: ['bn-IN', 'bn_IN', 'bn', 'bn-BD'],
  kn: ['kn-IN', 'kn_IN', 'kn'],
  ml: ['ml-IN', 'ml_IN', 'ml'],
  en: ['en-IN', 'en-GB', 'en-US', 'en']
};

function isNativeVoice(voice: SpeechSynthesisVoice, language: SupportedLanguage): boolean {
  const codes = NATIVE_LANG_CODES[language] || [];
  const voiceLang = (voice.lang || '').toLowerCase().replace('_', '-');
  return codes.some(code => voiceLang === code.toLowerCase() || voiceLang.startsWith(code.toLowerCase()));
}

class TextToSpeechService {
  private synth: SpeechSynthesis | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private isEnabled: boolean = true;
  private rate: number = 0.95;
  private audioCtx: AudioContext | null = null;
  private isSpeaking: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  public setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
    if (!enabled && this.synth) {
      this.synth.cancel();
    }
  }

  public setRate(rate: number) {
    this.rate = Math.max(0.5, Math.min(2, rate));
  }

  public playCashRegisterSound() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(987.77, now);
      osc1.frequency.exponentialRampToValueAtTime(1318.51, now + 0.08);
      gain1.gain.setValueAtTime(0.2, now);
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.25);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(1318.51, now + 0.08);
      osc2.frequency.exponentialRampToValueAtTime(1975.53, now + 0.15);
      gain2.gain.setValueAtTime(0.25, now + 0.08);
      gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.08);
      osc2.stop(now + 0.45);
    } catch (err) {
      // Non-fatal
    }
  }

  public playStockSound() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.08);
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.16);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } catch (err) {
      // Non-fatal
    }
  }

  public playFeedbackChime(type: 'start' | 'success' | 'error' = 'success') {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'start') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'error') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(330, now + 0.2);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      }
    } catch (err) {
      // Non-fatal
    }
  }

  /**
   * Speak speech text aloud exactly ONE time.
   */
  public speak(text: string, language: SupportedLanguage = 'en', phoneticFallback?: string): Promise<void> {
    return new Promise((resolve) => {
      if (!this.isEnabled || !this.synth || !text) {
        resolve();
        return;
      }

      try {
        // Cancel any pending utterance so it never speaks multiple times
        this.synth.cancel();
        if (this.synth.paused) {
          this.synth.resume();
        }

        if (this.voices.length === 0) {
          this.loadVoices();
        }

        const nativeVoice = this.voices.find(v => isNativeVoice(v, language));

        let textToUtter = text;
        let chosenVoice: SpeechSynthesisVoice | null = null;
        let langTag = 'en-IN';

        if (nativeVoice) {
          chosenVoice = nativeVoice;
          langTag = nativeVoice.lang;
          textToUtter = text;
        } else {
          const indianVoice = this.voices.find(v => 
            (v.lang && (v.lang.startsWith('hi') || v.lang.includes('IN'))) ||
            (v.name && (v.name.toLowerCase().includes('india') || v.name.toLowerCase().includes('hindi')))
          );

          chosenVoice = indianVoice || this.voices.find(v => v.default) || this.voices[0] || null;
          langTag = chosenVoice ? chosenVoice.lang : 'en-US';
          textToUtter = phoneticFallback || text;
        }

        const utterance = new SpeechSynthesisUtterance(textToUtter);
        utterance.rate = this.rate;
        utterance.pitch = 1.0;
        utterance.lang = langTag;

        if (chosenVoice) {
          utterance.voice = chosenVoice;
        }

        utterance.onend = () => {
          this.isSpeaking = false;
          resolve();
        };

        utterance.onerror = () => {
          this.isSpeaking = false;
          resolve();
        };

        this.isSpeaking = true;
        this.synth.speak(utterance);
      } catch (err) {
        this.isSpeaking = false;
        resolve();
      }
    });
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
    this.isSpeaking = false;
  }
}

export const ttsService = new TextToSpeechService();
