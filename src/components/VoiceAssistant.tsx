import React, { useState, useRef, useEffect } from 'react';
import { Mic, Volume2, CheckCircle2, Copy, Check, ChevronDown, AlertCircle, Send, X, Radio, ArrowRight } from 'lucide-react';
import { SupportedLanguage, SpeechState, ExecutionResult } from '../types/index';
import { speechService } from '../services/speechRecognition';
import { ttsService } from '../services/textToSpeech';
import { TRANSLATIONS, SUPPORTED_LANGUAGES } from '../services/translations';

interface VoiceAssistantProps {
  language: SupportedLanguage;
  onExecuteCommand: (commandText: string) => Promise<ExecutionResult>;
  lastResult: ExecutionResult | null;
  onQuickAction: (actionType: 'add' | 'sale' | 'stock' | 'earnings' | 'low_stock') => void;
  onOpenWholesaleOrder?: () => void;
  onLanguageChange?: (lang: SupportedLanguage) => void;
}

// Localized "Replay Voice" button text across all 9 languages
const REPLAY_VOICE_LABELS: Record<SupportedLanguage, string> = {
  hi: 'आवाज दोबारा सुनें',
  gu: 'ફરીથી સાંભળો',
  mr: 'पुन्हा ऐका',
  ta: 'மீண்டும் கேட்கவும்',
  te: 'మళ్ళీ వినండి',
  bn: 'আবার শুনুন',
  kn: 'ಮತ್ತೊಮ್ಮೆ ಕೇಳಿ',
  ml: 'വീണ്ടും കേൾക്കുക',
  en: 'Replay Voice'
};

// Curated "Try saying..." prompt suggestions
const TRY_SAYING_SUGGESTIONS: Record<SupportedLanguage, Array<{ text: string; label: string }>> = {
  en: [
    { text: 'Add 5 kg rice to inventory', label: 'Add 5 kg rice to inventory' },
    { text: 'Sold 3 bottles of water for 90', label: 'Sold 3 bottles of water for 90' },
    { text: 'How much did I earn today?', label: 'How much did I earn today?' },
    { text: 'Show me low stock items', label: 'Show me low stock items' }
  ],
  hi: [
    { text: '5 किलो चावल का स्टॉक जोड़ो', label: '5 किलो चावल का स्टॉक जोड़ो' },
    { text: '3 बोतल पानी 90 रुपये में बेचा', label: '3 बोतल पानी 90 रुपये में बेचा' },
    { text: 'आज की कमाई दिखाओ', label: 'आज की कमाई दिखाओ' },
    { text: 'कौन सा सामान कम है?', label: 'कौन सा सामान कम है?' }
  ],
  gu: [
    { text: '5 કિલો ચોખાનો સ્ટોક ઉમેરો', label: '5 કિલો ચોખાનો સ્ટોક ઉમેરો' },
    { text: '3 બોટલ પાણી 90 રૂપિયામાં વેચ્યું', label: '3 બોટલ પાણી 90 રૂપિયામાં વેચ્યું' },
    { text: 'આજની કમાણી કેટલી છે?', label: 'આજની કમાણી કેટલી છે?' },
    { text: 'ઓછો સ્ટોક કયો છે?', label: 'ઓછો સ્ટોક કયો છે?' }
  ],
  mr: [
    { text: '5 किलो तांदूळ साठा जोडा', label: '5 किलो तांदूळ साठा जोडा' },
    { text: '3 बाटल्या पाणी 90 रुपयात विकले', label: '3 बाटल्या पाणी 90 रुपयात विकले' },
    { text: 'आजची कमाई किती आहे?', label: 'आजची कमाई किती आहे?' },
    { text: 'कमी साठा कोणता आहे?', label: 'कमी साठा कोणता आहे?' }
  ],
  ta: [
    { text: '5 கிலோ அரிசி இருப்பு சேர்க்கவும்', label: '5 கிலோ அரிசி இருப்பு சேர்க்கவும்' },
    { text: '3 பாட்டில் தண்ணீர் 90 ரூபாய்க்கு விற்றேன்', label: '3 பாட்டில் தண்ணீர் 90 ரூபாய்க்கு விற்றேன்' },
    { text: 'இன்றைய வருமானம் என்ன?', label: 'இன்றைய வருமானம் என்ன?' },
    { text: 'குறைந்த இருப்பு பொருட்கள் எவை?', label: 'குறைந்த இருப்பு பொருட்கள் எவை?' }
  ],
  te: [
    { text: '5 కిలోల బియ్యం స్టాక్ జోడించు', label: '5 కిలోల బియ్యం స్టాక్ జోడించు' },
    { text: '3 బాటిల్స్ నీళ్లు 90 రూపాయలకు అమ్మాను', label: '3 బాటిల్స్ నీళ్లు 90 రూపాయలకు అమ్మాను' },
    { text: 'ఈరోజు సంపాదన ఎంత?', label: 'ఈరోజు సంపాదన ఎంత?' },
    { text: 'తక్కువ స్టాక్ ఏముంది?', label: 'తక్కువ స్టాక్ ఏముంది?' }
  ],
  bn: [
    { text: '5 কেজি চাল স্টক যোগ করুন', label: '5 কেজি চাল স্টক যোগ করুন' },
    { text: '3 বোতল জল 90 টাকায় বিক্রি হয়েছে', label: '3 বোতল জল 90 টাকায় বিক্রি হয়েছে' },
    { text: 'আজকের আয় কত?', label: 'আজকের আয় কত?' },
    { text: 'কম স্টক কোনটি?', label: 'কম স্টক কোনটি?' }
  ],
  kn: [
    { text: '5 ಕೆಜಿ ಅಕ್ಕಿ ದಾಸ್ತಾನು ಸೇರಿಸಿ', label: '5 ಕೆಜಿ ಅಕ್ಕಿ ದಾಸ್ತಾನು ಸೇರಿಸಿ' },
    { text: '3 ಬಾಟಲ್ ನೀರು 90 ರೂಪಾಯಿಗೆ ಮಾರಾಟವಾಯಿತು', label: '3 ಬಾಟಲ್ ನೀರು 90 ರೂಪಾಯಿಗೆ ಮಾರಾಟವಾಯಿತು' },
    { text: 'ಇಂದಿನ ಗಳಿಕೆ ಎಷ್ಟು?', label: 'ಇಂದಿನ ಗಳಿಕೆ ಎಷ್ಟು?' },
    { text: 'ಕಡಿಮೆ ದಾಸ್ತಾನು ಯಾವುದು?', label: 'ಕಡಿಮೆ ದಾಸ್ತಾನು ಯಾವುದು?' }
  ],
  ml: [
    { text: '5 കിലോ അരി സ്റ്റോക്ക് ചേർക്കുക', label: '5 കിലോ അരി സ്റ്റോക്ക് ചേർക്കുക' },
    { text: '3 കുപ്പി വെള്ളം 90 രൂപയ്ക്ക് വിറ്റു', label: '3 കുപ്പി വെള്ളം 90 രൂപയ്ക്ക് വിറ്റു' },
    { text: 'ഇന്നത്തെ വരുമാനം എത്രയാണ്?', label: 'ഇന്നത്തെ വരുമാനം എത്രയാണ്?' },
    { text: 'കുറഞ്ഞ സ്റ്റോക്ക് ഏതാണ്?', label: 'കുറഞ്ഞ സ്റ്റോക്ക് ഏതാണ്?' }
  ]
};

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({
  language,
  onExecuteCommand,
  lastResult,
  onQuickAction,
  onLanguageChange
}) => {
  const [speechState, setSpeechState] = useState<SpeechState>('idle');
  const [transcript, setTranscript] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [textCommand, setTextCommand] = useState<string>('');
  
  // Header controls inside card
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [voiceModeActive, setVoiceModeActive] = useState<boolean>(true);
  
  const isExecutingRef = useRef<boolean>(false);
  const silenceTimerRef = useRef<any>(null);
  const activeTranscriptRef = useRef<string>('');

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const currentLangMeta = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];
  const trySayingList = TRY_SAYING_SUGGESTIONS[language] || TRY_SAYING_SUGGESTIONS.en;
  const replayVoiceText = REPLAY_VOICE_LABELS[language] || 'Replay Voice';

  // Sync language with speechService
  useEffect(() => {
    speechService.setLanguage(language);
  }, [language]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
      }
      speechService.stopListening();
    };
  }, []);

  const executeVoiceText = async (textToExecute: string) => {
    if (!textToExecute || !textToExecute.trim()) return;
    if (isExecutingRef.current) return;

    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }

    isExecutingRef.current = true;
    setIsProcessing(true);
    setSpeechState('processing');
    speechService.stopListening();
    setErrorMessage(null);

    try {
      await onExecuteCommand(textToExecute.trim());
      setSpeechState('success');

      setTimeout(() => {
        setSpeechState('idle');
        isExecutingRef.current = false;
        activeTranscriptRef.current = '';
      }, 2200);
    } catch (err) {
      setSpeechState('error');
      setErrorMessage('Could not process command. Please try again.');
      isExecutingRef.current = false;
    } finally {
      setIsProcessing(false);
    }
  };

  const handleMicClick = async () => {
    if (speechState === 'listening') {
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = null;
      }
      speechService.stopListening();
      const currentSpoken = transcript.trim() || activeTranscriptRef.current.trim();
      if (currentSpoken.length > 0) {
        executeVoiceText(currentSpoken);
      } else {
        setSpeechState('idle');
      }
      return;
    }

    setErrorMessage(null);
    setTranscript('');
    activeTranscriptRef.current = '';
    isExecutingRef.current = false;
    setSpeechState('listening');

    if (soundEnabled) {
      ttsService.playFeedbackChime('start');
    }

    speechService.setLanguage(language);
    await speechService.startListening({
      onStateChange: (state) => {
        if (!isExecutingRef.current) {
          setSpeechState(state);
        }
      },
      onTranscript: (text, hasFinal) => {
        setTranscript(text);
        activeTranscriptRef.current = text;

        if (silenceTimerRef.current) {
          clearTimeout(silenceTimerRef.current);
        }

        // Wait 1.8s of silence after speech before automatically executing
        silenceTimerRef.current = setTimeout(() => {
          if (activeTranscriptRef.current && activeTranscriptRef.current.trim().length > 0 && !isExecutingRef.current) {
            executeVoiceText(activeTranscriptRef.current.trim());
          }
        }, 1800);
      },
      onError: (err) => {
        console.warn('[VoiceAssistant] Speech error event:', err);
        const currentSpoken = activeTranscriptRef.current.trim();
        if (currentSpoken.length > 0) {
          executeVoiceText(currentSpoken);
        } else {
          setSpeechState('error');
          setErrorMessage(err || 'Could not capture microphone audio. Click allow in your browser or type below.');
        }
      }
    });
  };

  const handleCopyText = () => {
    const textToCopy = transcript || (lastResult ? lastResult.spokenResponse || lastResult.message : '');
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const displayReceiptText = lastResult ? (lastResult.spokenResponse || lastResult.message) : '';

  return (
    <div className="space-y-4 select-none">
      {/* Small Header Title */}
      <div>
        <div className="text-xs text-gray-500 font-medium">Sahayak</div>
        <h1 className="text-2xl font-bold text-gray-900 leading-tight">Voice Assistant</h1>
      </div>

      {/* Main Grid: Left Big Voice Card + Right Quick Actions Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Left 2 Cols: Main Voice Assistant Card */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 shadow-2xs space-y-6">
          
          {/* Top Row: Local Voice Mode + Sound & Language Info */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wide">
                VOICE MODE: {currentLangMeta.name.toUpperCase()} ({currentLangMeta.nativeName})
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => {
                  const nextSound = !soundEnabled;
                  setSoundEnabled(nextSound);
                  ttsService.setEnabled(nextSound);
                }}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                  soundEnabled ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-gray-100 text-gray-400 border-gray-200'
                }`}
              >
                <Volume2 className={`w-3.5 h-3.5 ${soundEnabled ? 'text-indigo-600' : 'text-gray-400'}`} />
                <span>{soundEnabled ? 'Sound On' : 'Sound Off'}</span>
              </button>

              <button
                type="button"
                onClick={() => setVoiceModeActive(!voiceModeActive)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                  voiceModeActive ? 'bg-white text-gray-800 border-gray-300 hover:bg-gray-50' : 'bg-gray-100 text-gray-500 border-gray-200'
                }`}
              >
                {voiceModeActive ? 'Voice Active' : 'Voice Paused'}
              </button>
            </div>
          </div>

          {/* Centerpiece: Mic Button + Listening Indicator */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2 bg-gradient-to-r from-gray-50/80 to-indigo-50/30 p-4 rounded-2xl border border-gray-100">
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={handleMicClick}
                disabled={isProcessing}
                aria-label={speechState === 'listening' ? 'Listening - Tap to finish' : 'Tap to speak'}
                className={`w-20 h-20 sm:w-22 sm:h-22 rounded-full flex items-center justify-center text-white transition-all transform active:scale-95 cursor-pointer shadow-lg flex-shrink-0 relative ${
                  speechState === 'listening'
                    ? 'bg-red-500 ring-8 ring-red-100 shadow-red-500/40 animate-pulse'
                    : speechState === 'processing'
                    ? 'bg-yellow-500 ring-8 ring-yellow-100'
                    : speechState === 'success'
                    ? 'bg-emerald-600 ring-8 ring-emerald-100'
                    : speechState === 'error'
                    ? 'bg-amber-600 ring-8 ring-amber-100'
                    : 'bg-[#6366f1] hover:bg-[#4f46e5] ring-8 ring-purple-100/70 shadow-indigo-500/30'
                }`}
              >
                {speechState === 'listening' ? (
                  <div className="flex flex-col items-center">
                    <Radio className="w-8 h-8 animate-spin" />
                  </div>
                ) : speechState === 'processing' ? (
                  <div className="w-7 h-7 border-3 border-white border-t-transparent rounded-full animate-spin" />
                ) : speechState === 'success' ? (
                  <CheckCircle2 className="w-8 h-8" />
                ) : (
                  <Mic className="w-7 h-7 sm:w-8 sm:h-8" />
                )}
              </button>

              <div>
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-1 ${
                  speechState === 'listening'
                    ? 'bg-red-100 text-red-700 font-extrabold animate-pulse'
                    : speechState === 'processing'
                    ? 'bg-yellow-100 text-yellow-800'
                    : speechState === 'success'
                    ? 'bg-emerald-100 text-emerald-800'
                    : speechState === 'error'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-indigo-100 text-indigo-700'
                }`}>
                  {speechState === 'listening' ? '● LISTENING' : speechState === 'processing' ? 'PROCESSING...' : speechState === 'success' ? 'EXECUTED' : speechState === 'error' ? 'ATTENTION' : 'READY TO LISTEN'}
                </span>
                
                <div className="text-xl font-bold text-gray-900 leading-tight">
                  {speechState === 'listening' ? 'Listening... Speak now' : speechState === 'processing' ? 'Processing transaction...' : 'Tap mic to speak'}
                </div>
                
                <div className="text-xs text-gray-500 mt-0.5">
                  {speechState === 'listening' ? 'Speak naturally in ' + currentLangMeta.name + ' — auto-detects sales & stock' : 'Tap the microphone or type any command below'}
                </div>
              </div>
            </div>

            {/* Quick Action when listening: Complete & Send button */}
            {speechState === 'listening' && (
              <div className="flex items-center space-x-2 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => {
                    const currentSpoken = transcript.trim() || activeTranscriptRef.current.trim();
                    if (currentSpoken.length > 0) {
                      executeVoiceText(currentSpoken);
                    } else {
                      setSpeechState('idle');
                      speechService.stopListening();
                    }
                  }}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <span>Done Speaking</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Error Message Notification Banner */}
          {errorMessage && (
            <div className="flex items-start justify-between bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900">
              <div className="flex items-start space-x-2.5">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">{errorMessage}</p>
                  <p className="text-[11px] text-gray-600 mt-0.5">
                    If microphone access is blocked, click the site permissions icon in your browser address bar and enable Microphone, or use the instant input box below.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setErrorMessage(null)}
                className="text-gray-400 hover:text-gray-700 p-1"
                aria-label="Dismiss error"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Transcript / Output Receipt Box */}
          {(transcript || lastResult) && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3.5 space-y-2.5 text-xs">
              {transcript && (
                <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-3 py-2">
                  <div className="flex items-center space-x-2 truncate">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">Heard</span>
                    <span className="text-gray-900 font-medium truncate">"{transcript}"</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyText}
                    className="text-gray-500 hover:text-gray-900 text-[11px] ml-2 flex-shrink-0 cursor-pointer"
                  >
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              )}

              {lastResult && (
                <div className={`p-3 rounded-lg border ${
                  lastResult.success ? 'bg-white border-green-300 text-gray-900' : 'bg-white border-yellow-300 text-gray-900'
                }`}>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <p className="font-bold text-xs text-gray-900">{displayReceiptText}</p>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                    <span className="text-gray-600 text-[11px] truncate">
                      {displayReceiptText}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const text = lastResult.spokenResponse || lastResult.spokenResponseEn || lastResult.message;
                        ttsService.speak(text, language, lastResult.phoneticSpoken);
                      }}
                      className="text-indigo-600 hover:text-indigo-800 text-[11px] font-bold ml-2 flex items-center space-x-1 cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{replayVoiceText}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Quick Text Command Input Fallback */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (textCommand.trim()) {
                executeVoiceText(textCommand.trim());
                setTextCommand('');
              }
            }}
            className="flex items-center space-x-2 pt-1"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={textCommand}
                onChange={(e) => setTextCommand(e.target.value)}
                placeholder="Type command: 'Add 5 kg rice', '5 packet biscuit becha', 'today earnings'..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs bg-gray-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900 placeholder:text-gray-400"
              />
            </div>
            <button
              type="submit"
              disabled={!textCommand.trim() || isProcessing}
              className="px-4 py-2.5 rounded-xl bg-[#6366f1] hover:bg-[#4f46e5] disabled:bg-gray-200 disabled:text-gray-400 text-white text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Run</span>
            </button>
          </form>

          {/* Try saying... Section */}
          <div className="pt-2">
            <div className="text-xs font-medium text-gray-500 mb-2.5 flex items-center justify-between">
              <span>Try saying or click to test:</span>
              <span className="text-[11px] text-indigo-600 font-medium">Click any chip to run instantly</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {trySayingList.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => executeVoiceText(item.text)}
                  className="text-left px-3.5 py-2.5 rounded-xl bg-gray-50/80 hover:bg-indigo-50 hover:border-indigo-200 border border-gray-200/80 text-xs font-medium text-gray-800 transition-all cursor-pointer shadow-2xs hover:shadow-xs"
                >
                  "{item.label}"
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Quick Actions Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-2xs h-fit space-y-3">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Quick actions</h3>
          
          <button
            type="button"
            onClick={() => onQuickAction('sale')}
            className="w-full py-2.5 px-4 rounded-xl bg-[#6366f1] hover:bg-[#4f46e5] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer text-center"
          >
            Add Sale
          </button>

          <button
            type="button"
            onClick={() => onQuickAction('earnings')}
            className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 text-xs font-semibold transition-colors cursor-pointer text-center"
          >
            Check Earnings
          </button>

          <button
            type="button"
            onClick={() => onQuickAction('add')}
            className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 text-xs font-semibold transition-colors cursor-pointer text-center"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};


