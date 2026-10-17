import { SupportedLanguage } from '../types';

export type SpeechState = 'idle' | 'listening' | 'processing' | 'success' | 'error';

export interface SpeechRecognitionHandlers {
  onStateChange: (state: SpeechState) => void;
  onTranscript: (transcript: string, isFinal: boolean) => void;
  onError: (errorMessage: string) => void;
}

const SPEECH_LANG_MAP: Record<SupportedLanguage, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
  gu: 'gu-IN',
  mr: 'mr-IN',
  ta: 'ta-IN',
  te: 'te-IN',
  bn: 'bn-IN',
  kn: 'kn-IN',
  ml: 'ml-IN'
};

class SpeechRecognitionService {
  private recognition: any = null;
  private isListening: boolean = false;
  private handlers: SpeechRecognitionHandlers | null = null;
  private currentLanguage: SupportedLanguage = 'hi';
  private latestTranscript: string = '';
  private isStarting: boolean = false;
  private activeMediaStream: MediaStream | null = null;

  public setLanguage(lang: SupportedLanguage) {
    this.currentLanguage = lang;
    if (this.recognition && this.isListening) {
      try {
        this.recognition.lang = SPEECH_LANG_MAP[lang] || 'en-IN';
      } catch (e) {}
    }
  }

  public isSupported(): boolean {
    return typeof window !== 'undefined' && Boolean((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
  }

  public async startListening(handlers: SpeechRecognitionHandlers) {
    if (this.isStarting) return;
    this.isStarting = true;

    this.stopListening();
    this.handlers = handlers;
    this.latestTranscript = '';

    const SpeechRec = typeof window !== 'undefined' ? ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition) : null;

    if (!SpeechRec) {
      this.isStarting = false;
      this.isListening = false;
      handlers.onError('Speech recognition is not supported in this browser. Please use Google Chrome, Microsoft Edge, or use text input.');
      handlers.onStateChange('error');
      return;
    }

    // Request microphone permission explicitly to ensure hardware availability & avoid premature socket drop
    try {
      if (typeof navigator !== 'undefined' && navigator?.mediaDevices?.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.activeMediaStream = stream;
      }
    } catch (micErr: any) {
      console.warn('[SpeechService] getUserMedia error:', micErr);
      this.isStarting = false;
      this.isListening = false;
      if (micErr.name === 'NotAllowedError' || micErr.name === 'PermissionDeniedError') {
        handlers.onError('Microphone access was blocked. Please click the lock icon in your browser address bar and allow Microphone access.');
      } else if (micErr.name === 'NotFoundError' || micErr.name === 'DevicesNotFoundError') {
        handlers.onError('No microphone found on this device. Please connect a microphone or use the text command bar.');
      } else {
        handlers.onError('Microphone setup error: ' + (micErr.message || micErr.name));
      }
      handlers.onStateChange('error');
      return;
    }

    try {
      const rec = new SpeechRec();
      // Single utterance recognition (continuous=false) is far more stable on Chromium/Windows and avoids network drops
      rec.continuous = false;
      rec.interimResults = true;
      rec.maxAlternatives = 1;
      rec.lang = SPEECH_LANG_MAP[this.currentLanguage] || 'hi-IN';

      this.recognition = rec;

      rec.onstart = () => {
        this.isStarting = false;
        this.isListening = true;
        if (this.handlers) {
          this.handlers.onStateChange('listening');
        }
      };

      rec.onresult = (event: any) => {
        if (!this.isListening) return;

        let fullText = '';
        let hasFinal = false;

        for (let i = 0; i < event.results.length; ++i) {
          const res = event.results[i];
          if (res && res[0] && res[0].transcript) {
            fullText += res[0].transcript + ' ';
            if (res.isFinal) {
              hasFinal = true;
            }
          }
        }

        const trimmed = fullText.trim();
        if (trimmed && this.handlers) {
          this.latestTranscript = trimmed;
          this.handlers.onTranscript(trimmed, hasFinal);
        }
      };

      rec.onerror = (event: any) => {
        console.warn('[SpeechService] API Event error:', event.error);
        this.isStarting = false;

        if (event.error === 'aborted') {
          return;
        }

        if (event.error === 'no-speech') {
          if (this.latestTranscript && this.latestTranscript.trim().length > 0) {
            this.isListening = false;
            if (this.handlers) {
              this.handlers.onTranscript(this.latestTranscript.trim(), true);
            }
          } else {
            this.isListening = false;
            if (this.handlers) {
              this.handlers.onStateChange('idle');
            }
          }
          return;
        }

        let errorMsg = 'Voice recognition error: ' + event.error;
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          errorMsg = 'Microphone access is blocked. Click the lock/site settings icon in your browser address bar and allow Microphone access.';
        } else if (event.error === 'network') {
          // Check for Brave browser or Google Speech API connection failure
          const isBrave = typeof navigator !== 'undefined' && Boolean((navigator as any).brave);
          if (isBrave) {
            errorMsg = 'Brave browser blocks Google Voice Recognition by default. Enable "Use Google services for push messaging / speech recognition" in Brave Settings, or use Chrome / Edge / text command below.';
          } else {
            errorMsg = 'Voice recognition network error (Google Speech Service could not be reached). Please check your internet, verify Chrome microphone permissions, or type below.';
          }
        } else if (event.error === 'audio-capture') {
          errorMsg = 'No microphone device was detected. Please connect or enable your microphone in Windows settings.';
        }

        this.isListening = false;
        if (this.handlers) {
          this.handlers.onError(errorMsg);
          this.handlers.onStateChange('error');
        }
      };

      rec.onend = () => {
        this.isStarting = false;
        if (this.isListening) {
          this.isListening = false;
          if (this.latestTranscript && this.latestTranscript.trim().length > 0) {
            this.handlers?.onTranscript(this.latestTranscript.trim(), true);
          } else {
            this.handlers?.onStateChange('idle');
          }
        }
        if (this.activeMediaStream) {
          try {
            this.activeMediaStream.getTracks().forEach(track => track.stop());
          } catch (e) {}
          this.activeMediaStream = null;
        }
      };

      rec.start();
    } catch (err: any) {
      console.warn('[SpeechService] Speech start exception:', err);
      this.isStarting = false;
      this.isListening = false;
      handlers.onError('Could not start voice recognition: ' + (err.message || err));
      handlers.onStateChange('error');
    }
  }

  public stopListening() {
    this.isStarting = false;
    this.isListening = false;
    if (this.activeMediaStream) {
      try {
        this.activeMediaStream.getTracks().forEach(track => track.stop());
      } catch (e) {}
      this.activeMediaStream = null;
    }
    if (this.recognition) {
      try {
        this.recognition.onstart = null;
        this.recognition.onresult = null;
        this.recognition.onerror = null;
        this.recognition.onend = null;
        this.recognition.stop();
      } catch (e) {
        try {
          this.recognition.abort();
        } catch (e2) {}
      }
      this.recognition = null;
    }
  }
}

export const speechService = new SpeechRecognitionService();

